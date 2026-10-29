// Core UI components for the "Blueprint" design system.
// Styling lives in ui.css and uses only semantic tokens from styles/tokens.css.
import { useTheme } from './useTheme'
import './ui.css'

const cx = (...classes) => classes.filter(Boolean).join(' ')

/* ── Button ─────────────────────────────────────────────────────
   Renders a link when given href, otherwise a button. */
export const Button = ({ variant = 'primary', href, external, className, children, ...rest }) => {
  const classes = cx('ui-button', `ui-button--${variant}`, className)
  if (href) {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return <a href={href} className={classes} {...externalProps} {...rest}>{children}</a>
  }
  return <button type='button' className={classes} {...rest}>{children}</button>
}

/* ── Tag ────────────────────────────────────────────────────────
   Stack items and statuses. Tone is for meaning, never decoration. */
export const Tag = ({ tone = 'neutral', children }) => (
  <span className={cx('ui-tag', tone !== 'neutral' && `ui-tag--${tone}`)}>{children}</span>
)

/* ── Card ───────────────────────────────────────────────────── */
export const Card = ({ as = 'article', className, children, ...rest }) => {
  const Element = as
  return <Element className={cx('ui-card', className)} {...rest}>{children}</Element>
}

/* ── SectionHeader ──────────────────────────────────────────── */
export const SectionHeader = ({ id, title, children }) => (
  <header className='ui-section-header'>
    <h2 id={id} className='ui-section-header__title'>{title}</h2>
    {children && <p className='ui-section-header__desc'>{children}</p>}
  </header>
)

/* ── Note ───────────────────────────────────────────────────────
   A reviewer's margin note: highlighted text with an annotation. */
export const Note = ({ note, children }) => (
  <span className='ui-note'>
    <mark className='ui-note__mark'>{children}</mark>
    <span className='ui-note__text'>{note}</span>
  </span>
)

/* ── DecisionTrace ──────────────────────────────────────────────
   The signature element: how a decision moved through the system,
   one layer per step. steps: [{ layer, title, detail?, status? }]
   status: 'passed' | 'flagged' | undefined */
const STATUS_LABEL = { passed: 'Passed', flagged: 'Flagged' }

export const DecisionTrace = ({ caption, steps }) => (
  <figure className='ui-trace'>
    {caption && <figcaption className='ui-trace__caption'>{caption}</figcaption>}
    <ol className='ui-trace__steps'>
      {steps.map(({ layer, title, detail, status }) => (
        <li key={layer} className='ui-trace__step'>
          <span className='ui-trace__layer'>{layer}</span>
          <div className='ui-trace__body'>
            <p className='ui-trace__title'>
              {title}
              {status && <Tag tone={status === 'passed' ? 'verified' : 'flagged'}>{STATUS_LABEL[status]}</Tag>}
            </p>
            {detail && <code className='ui-trace__detail'>{detail}</code>}
          </div>
        </li>
      ))}
    </ol>
  </figure>
)

/* ── ThemeToggle ────────────────────────────────────────────── */
export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      type='button'
      className='ui-theme-toggle'
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      {theme === 'dark' ? (
        <svg viewBox='0 0 24 24' width='18' height='18' aria-hidden='true'>
          <circle cx='12' cy='12' r='4.5' fill='none' stroke='currentColor' strokeWidth='1.8' />
          <path d='M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
        </svg>
      ) : (
        <svg viewBox='0 0 24 24' width='18' height='18' aria-hidden='true'>
          <path d='M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinejoin='round' />
        </svg>
      )}
    </button>
  )
}
