// src/components/GitHubStats/GitHubStats.jsx
import React, { useState, useEffect, useMemo } from 'react'
import './GitHubStats.css'

/* ── Config ─────────────────────────────────────────────────── */
const USERNAME = 'DuoDduo'
const PROFILE_URL = `https://github.com/${USERNAME}`

// The public events API only reaches back ~90 days, so the heatmap
// covers exactly that window rather than inventing older activity.
const WEEKS = 13
const DAYS = WEEKS * 7

// Unauthenticated API calls are limited to 60/hour per visitor IP,
// so results are cached in the browser for an hour.
const CACHE_KEY = `gh-stats:${USERNAME}`
const CACHE_TTL = 60 * 60 * 1000

/* ── API helper ─────────────────────────────────────────────── */
const ghFetch = (path) =>
  fetch(`https://api.github.com/${path}`, {
    headers: { Accept: 'application/vnd.github+json' },
  }).then((r) => {
    if (!r.ok) throw new Error(`GitHub API responded ${r.status}`)
    return r.json()
  })

/* ── Cache helpers (storage can be unavailable or full) ────── */
const readCache = () => {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY))
    if (cached && Date.now() - cached.savedAt < CACHE_TTL) return cached.data
  } catch { /* ignore */ }
  return null
}

const writeCache = (data) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }))
  } catch { /* ignore */ }
}

/* ── Date helpers ───────────────────────────────────────────── */
const toKey = (d) => new Date(d).toISOString().slice(0, 10)

/* ── Build heatmap grid (WEEKS × 7 days) ────────────────────── */
const buildGrid = (activityMap) => {
  const today = new Date()
  const start = new Date(today)
  start.setDate(today.getDate() - (DAYS - 1))
  start.setDate(start.getDate() - start.getDay()) // align to Sunday

  const grid = []
  const cur = new Date(start)

  for (let w = 0; w < WEEKS; w++) {
    const col = []
    for (let d = 0; d < 7; d++) {
      const key = toKey(cur)
      const count = cur > today ? 0 : (activityMap[key] ?? 0)
      let level = 0
      if (count > 10) level = 4
      else if (count > 5) level = 3
      else if (count > 2) level = 2
      else if (count > 0) level = 1

      col.push({ level, date: key, count })
      cur.setDate(cur.getDate() + 1)
    }
    grid.push(col)
  }
  return grid
}

/* ── Longest streak from activityMap ───────────────────────── */
const calcStreak = (map) => {
  let best = 0, cur = 0
  const today = new Date()
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    if ((map[toKey(d)] ?? 0) > 0) { cur++; best = Math.max(best, cur) }
    else cur = 0
  }
  return best
}

/* ── Language colors ────────────────────────────────────────── */
const LANG_COLORS = {
  TypeScript: '#3178c6', JavaScript: '#f0db4f', Python: '#4b8bbe',
  Rust: '#dea584', Go: '#00acd7', CSS: '#ef0bef', HTML: '#e44b23',
  Java: '#b07219', 'C++': '#f34b7d', C: '#555555', Shell: '#89e051',
  Dart: '#00b4ab', Ruby: '#701516', Swift: '#ffac45', Kotlin: '#a97bff',
  PHP: '#4f5d95',
}

const buildLanguages = (repos) => {
  const counts = {}
  // Forks are other people's code, so they don't count toward my languages
  repos.forEach(({ language, fork }) => {
    if (language && !fork) counts[language] = (counts[language] ?? 0) + 1
  })
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({
      name,
      percent: Math.round((count / total) * 100),
      color: LANG_COLORS[name] ?? '#7a8ba6',
    }))
}

/* ── Skeleton block ─────────────────────────────────────────── */
const Skeleton = ({ className }) => (
  <div className={`github-stats__skeleton ${className ?? ''}`} />
)

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════ */
const GitHubStats = () => {
  const [data,    setData]    = useState(null)
  const [error,   setError]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [tooltip, setTooltip] = useState(null)

  useEffect(() => {
    let dead = false

    const load = async () => {
      const cached = readCache()
      if (cached) {
        setData(cached)
        setLoading(false)
        return
      }

      try {
        const [user, repos, commitRes, prRes] = await Promise.all([
          ghFetch(`users/${USERNAME}`),
          ghFetch(`users/${USERNAME}/repos?per_page=100&sort=pushed`),
          ghFetch(`search/commits?q=author:${USERNAME}&per_page=1`),
          ghFetch(`search/issues?q=type:pr+author:${USERNAME}&per_page=1`),
        ])

        // Public events — up to 3 pages ≈ 300 events, ~90 days back
        let events = []
        for (let page = 1; page <= 3; page++) {
          const chunk = await ghFetch(
            `users/${USERNAME}/events/public?per_page=100&page=${page}`
          )
          events = events.concat(chunk)
          if (chunk.length < 100) break
        }

        if (dead) return

        // Build activity map (date → count)
        const activityMap = {}
        const COUNTED_TYPES = new Set([
          'PushEvent', 'CreateEvent', 'PullRequestEvent',
          'IssuesEvent', 'PullRequestReviewEvent', 'CommitCommentEvent',
        ])
        events.forEach(({ type, created_at, payload }) => {
          if (!COUNTED_TYPES.has(type)) return
          const key = toKey(created_at)
          const weight = type === 'PushEvent'
            ? (payload?.commits?.length ?? 1)
            : 1
          activityMap[key] = (activityMap[key] ?? 0) + weight
        })

        const result = {
          followers:  user.followers,
          repoCount:  user.public_repos,
          commits:    commitRes.total_count,
          prs:        prRes.total_count,
          streak:     calcStreak(activityMap),
          languages:  buildLanguages(repos),
          activityMap,
        }
        writeCache(result)
        setData(result)
      } catch (err) {
        console.warn('GitHub stats unavailable:', err)
        if (!dead) setError(true)
      } finally {
        if (!dead) setLoading(false)
      }
    }

    load()
    return () => { dead = true }
  }, [])

  // Grid is stable once data arrives
  const grid = useMemo(
    () => data ? buildGrid(data.activityMap) : [],
    [data]
  )

  /* ── Loading skeleton ── */
  if (loading) return (
    <section id='github' className='section github-stats'>
      <h2 className='section__title'>GitHub Activity</h2>
      <div className='github-stats__shell'>
        <div className='github-stats__header'>
          <Skeleton className='github-stats__skeleton--prompt' />
          <Skeleton className='github-stats__skeleton--status' />
        </div>
        <div className='github-stats__metrics'>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className='github-stats__metric'>
              <Skeleton className='github-stats__skeleton--value' />
              <Skeleton className='github-stats__skeleton--label' />
            </div>
          ))}
        </div>
        <div className='github-stats__heatmap-wrap'>
          <Skeleton className='github-stats__skeleton--heatmap' />
        </div>
        <div className='github-stats__languages'>
          <Skeleton className='github-stats__skeleton--bar' />
        </div>
      </div>
    </section>
  )

  /* ── Error state ── */
  if (error || !data) return (
    <section id='github' className='section github-stats'>
      <h2 className='section__title'>GitHub Activity</h2>
      <div className='github-stats__shell github-stats__shell--error'>
        <span className='github-stats__prompt-caret'>❯</span>
        <span className='github-stats__error-msg'>
          Live stats are taking a break.{' '}
          <a href={PROFILE_URL} target='_blank' rel='noopener noreferrer' className='link'>
            See my activity on GitHub →
          </a>
        </span>
      </div>
    </section>
  )

  const { followers, repoCount, commits, prs, streak, languages } = data

  const fmtNum = (n) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)

  const metrics = [
    { label: 'Public Commits',   value: fmtNum(commits) },
    { label: 'Pull Requests',    value: fmtNum(prs)     },
    { label: 'Public Repos',     value: repoCount        },
    { label: 'Best Streak (90d)', value: `${streak}d`    },
  ]

  /* ── Main render ── */
  return (
    <section id='github' className='section github-stats'>
      <h2 className='section__title'>GitHub Activity</h2>

      <div className='github-stats__shell'>

        {/* ── Header bar ── */}
        <div className='github-stats__header'>
          <span className='github-stats__prompt'>
            <span className='github-stats__prompt-caret'>❯</span>
            gh stats --user {USERNAME}
          </span>
          <a
            href={PROFILE_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='github-stats__status'
          >
            <span className='github-stats__status-dot' aria-hidden='true' />
            {followers.toLocaleString()} followers
          </a>
        </div>

        {/* ── Metric counters ── */}
        <div className='github-stats__metrics'>
          {metrics.map(({ label, value }) => (
            <div key={label} className='github-stats__metric'>
              <span className='github-stats__metric-value'>{value}</span>
              <span className='github-stats__metric-label'>{label}</span>
            </div>
          ))}
        </div>

        {/* ── Contribution heatmap ── */}
        <div className='github-stats__heatmap-wrap'>
          <div className='github-stats__heatmap-label'>
            // Public activity — last 90 days
          </div>
          <div
            className='github-stats__heatmap'
            role='img'
            aria-label='GitHub public activity heatmap for the last 90 days'
          >
            {grid.map((col, wi) => (
              <div key={wi} className='github-stats__heatmap-col'>
                {col.map(({ level, date, count }, di) => (
                  <span
                    key={di}
                    className='github-stats__cell'
                    data-level={level}
                    aria-hidden='true'
                    onMouseEnter={(e) => {
                      const r = e.target.getBoundingClientRect()
                      setTooltip({ date, count, x: r.left, y: r.top })
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className='github-stats__legend'>
            <span className='github-stats__legend-label'>Less</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <span
                key={l}
                className='github-stats__cell github-stats__cell--legend'
                data-level={l}
              />
            ))}
            <span className='github-stats__legend-label'>More</span>
          </div>
        </div>

        {/* ── Language breakdown ── */}
        {languages.length > 0 && (
          <div className='github-stats__languages'>
            <div className='github-stats__lang-label'>// Top languages</div>
            <div className='github-stats__lang-bar' aria-hidden='true'>
              {languages.map(({ name, percent, color }) => (
                <div
                  key={name}
                  className='github-stats__lang-segment'
                  style={{ width: `${percent}%`, background: color }}
                  title={`${name} ${percent}%`}
                />
              ))}
            </div>
            <div className='github-stats__lang-list'>
              {languages.map(({ name, percent, color }) => (
                <div key={name} className='github-stats__lang-item'>
                  <span className='github-stats__lang-dot' style={{ background: color }} />
                  <span className='github-stats__lang-name'>{name}</span>
                  <span className='github-stats__lang-pct'>{percent}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── Cell tooltip (portals to window coords) ── */}
      {tooltip && (
        <div
          className='github-stats__tooltip'
          style={{ top: tooltip.y - 44, left: tooltip.x }}
        >
          <strong>{tooltip.count}</strong>{' '}
          contribution{tooltip.count !== 1 ? 's' : ''}
          <span className='github-stats__tooltip-date'>{tooltip.date}</span>
        </div>
      )}
    </section>
  )
}

export default GitHubStats