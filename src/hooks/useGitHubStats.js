import { useEffect, useState } from 'react'

const USERNAME = 'DuoDduo'

// Unauthenticated API calls are limited to 60/hour per visitor IP,
// so results are cached in the browser for an hour.
const CACHE_KEY = `gh-stats:v2:${USERNAME}`
const CACHE_TTL = 60 * 60 * 1000

const ghFetch = (path) =>
  fetch(`https://api.github.com/${path}`, {
    headers: { Accept: 'application/vnd.github+json' },
  }).then((r) => {
    if (!r.ok) throw new Error(`GitHub API responded ${r.status}`)
    return r.json()
  })

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

// Share of my own (non-fork) repos per primary language
const topLanguages = (repos) => {
  const counts = {}
  repos.forEach(({ language, fork }) => {
    if (language && !fork) counts[language] = (counts[language] ?? 0) + 1
  })
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, percent: Math.round((count / total) * 100) }))
}

export const GITHUB_PROFILE = `https://github.com/${USERNAME}`

export const useGitHubStats = () => {
  const [state, setState] = useState(() => {
    const cached = readCache()
    return { data: cached, status: cached ? 'ready' : 'loading' }
  })

  useEffect(() => {
    if (state.status !== 'loading') return
    let dead = false

    Promise.all([
      ghFetch(`users/${USERNAME}`),
      ghFetch(`users/${USERNAME}/repos?per_page=100`),
      ghFetch(`search/commits?q=author:${USERNAME}&per_page=1`),
      ghFetch(`search/issues?q=type:pr+author:${USERNAME}&per_page=1`),
    ])
      .then(([user, repos, commits, prs]) => {
        const data = {
          commits: commits.total_count,
          prs: prs.total_count,
          repos: user.public_repos,
          followers: user.followers,
          languages: topLanguages(repos),
        }
        writeCache(data)
        if (!dead) setState({ data, status: 'ready' })
      })
      .catch((err) => {
        console.warn('GitHub stats unavailable:', err)
        if (!dead) setState({ data: null, status: 'error' })
      })

    return () => { dead = true }
  }, [state.status])

  return state
}
