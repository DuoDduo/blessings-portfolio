import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'
const THEMES = ['light', 'dark']

const systemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

// The resolved theme: an explicit choice (set by public/theme-init.js) or the system setting
const currentTheme = () => {
  const attr = document.documentElement.getAttribute('data-theme')
  return THEMES.includes(attr) ? attr : systemTheme()
}

export const useTheme = () => {
  const [theme, setTheme] = useState(currentTheme)

  // Follow system changes until the visitor picks a theme themselves
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (!document.documentElement.hasAttribute('data-theme')) setTheme(systemTheme())
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem(STORAGE_KEY, next) } catch { /* ignore */ }
    setTheme(next)
  }

  return { theme, toggleTheme }
}
