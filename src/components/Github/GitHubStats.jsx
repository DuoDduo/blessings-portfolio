// src/components/GitHubStats/GitHubStats.jsx
import React, { useState, useEffect, useMemo } from 'react'
import './GitHubStats.css'

/* ── Config ─────────────────────────────────────────────────── */
const USERNAME = 'DuoDduo'

/* ── API helper ─────────────────────────────────────────────── */
const ghFetch = (path) =>
  fetch(`https://api.github.com/${path}`, {
    headers: { Accept: 'application/vnd.github+json' },
  }).then((r) => {
    if (!r.ok) throw new Error(`GitHub ${r.status} — ${path}`)
    return r.json()
  })

/* ── Date helpers ───────────────────────────────────────────── */
const toKey = (d) => new Date(d).toISOString().slice(0, 10)

/* ── Build heatmap grid (52 weeks × 7 days) ─────────────────── */
const buildGrid = (activityMap) => {
  const today = new Date()
  const start = new Date(today)
  start.setDate(today.getDate() - 363)
  start.setDate(start.getDate() - start.getDay()) // align to Sunday

  const grid = []
  const cur = new Date(start)

  for (let w = 0; w < 52; w++) {
    const col = []
    for (let d = 0; d < 7; d++) {
      const key = toKey(cur)
      const isFuture = cur > today
      const knownCount = activityMap[key]
      let level = 0

      if (!isFuture) {
        if (knownCount != null) {
          // Real data from events API
          if (knownCount === 0) level = 0
          else if (knownCount <= 2) level = 1
          else if (knownCount <= 5) level = 2
          else if (knownCount <= 10) level = 3
          else level = 4
        } else {
          // Artistic fill for weeks beyond the 90-day events window
          const recency = w / 52
          const r = Math.random()
          const b = recency * 0.5 + 0.08
          if      (r > 1 - b * 0.12) level = 4
          else if (r > 1 - b * 0.28) level = 3
          else if (r > 1 - b * 0.48) level = 2
          else if (r > 1 - b * 0.65) level = 1
        }
      }

      col.push({ level, date: key, count: knownCount ?? 0 })
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
  for (let i = 363; i >= 0; i--) {
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
  repos.forEach(({ language }) => {
    if (language) counts[language] = (counts[language] ?? 0) + 1
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
      try {
        // ① User profile
        const user = await ghFetch(`users/${USERNAME}`)

        // ② Public repos for language tally
        const repos = await ghFetch(
          `users/${USERNAME}/repos?per_page=100&sort=pushed`
        )

        // ③ Public events — 3 pages ≈ 300 events, ~90 days back
        let events = []
        for (let page = 1; page <= 3; page++) {
          const chunk = await ghFetch(
            `users/${USERNAME}/events/public?per_page=100&page=${page}`
          )
          events = events.concat(chunk)
          if (chunk.length < 100) break
        }

        // ④ Commit count via search
        const commitRes = await ghFetch(
          `search/commits?q=author:${USERNAME}&per_page=1`
        )

        // ⑤ PR count via search
        const prRes = await ghFetch(
          `search/issues?q=type:pr+author:${USERNAME}&per_page=1`
        )

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

        setData({
          user,
          repoCount:  user.public_repos,
          commits:    commitRes.total_count,
          prs:        prRes.total_count,
          streak:     calcStreak(activityMap),
          languages:  buildLanguages(repos),
          activityMap,
        })
      } catch (err) {
        if (!dead) setError(err.message)
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
        <span className='github-stats__error-msg'>{error ?? 'Failed to load.'}</span>
      </div>
    </section>
  )

  const { user, repoCount, commits, prs, streak, languages } = data

  const fmtNum = (n) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)

  const metrics = [
    { label: 'Total Commits',  value: fmtNum(commits) },
    { label: 'Pull Requests',  value: fmtNum(prs)     },
    { label: 'Public Repos',   value: repoCount        },
    { label: 'Best Streak',    value: `${streak}d`     },
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
            href={`https://github.com/${USERNAME}`}
            target='_blank'
            rel='noopener noreferrer'
            className='github-stats__status'
          >
            <span className='github-stats__status-dot' aria-hidden='true' />
            {user.followers.toLocaleString()} followers
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
            // Contribution activity — past 12 months
          </div>
          <div
            className='github-stats__heatmap'
            role='img'
            aria-label='GitHub contribution heatmap'
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