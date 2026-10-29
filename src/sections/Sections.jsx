// Page sections built on the "Blueprint" design system (components/ui).
import { useEffect, useRef, useState } from 'react'
import { about, contact, education, experience, pillars, projects } from '../portfolio'
import { GITHUB_PROFILE, useGitHubStats } from '../hooks/useGitHubStats'
import { gsap, prefersReducedMotion, useCountUp, useTilt } from '../motion/motion'
import profilePic from '../assets/profile.webp'
import {
  Button, Card, SectionHeader, Tag, ThemeToggle,
} from '../components/ui/ui'
import './sections.css'

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]
/* ── Header ─────────────────────────────────────────────────── */
export const SiteHeader = () => {
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)

  // Close the mobile menu on Escape or a tap outside the header
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    const onPointer = (e) => { if (!headerRef.current?.contains(e.target)) setOpen(false) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <header ref={headerRef} className='site-header' data-open={open}>
      <div className='site-header__inner'>
        <a href='#top' className='site-header__name'>{about.name}</a>
        <nav id='site-nav' aria-label='Sections' className='site-header__nav'>
          {NAV.map(({ href, label }) => (
            <a key={href} href={href} className='site-header__link' onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
        <ThemeToggle />
        <button
          type='button'
          className='site-header__menu'
          aria-expanded={open}
          aria-controls='site-nav'
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className='site-header__menu-bar' aria-hidden='true' />
          <span className='site-header__menu-bar' aria-hidden='true' />
        </button>
      </div>
    </header>
  )
}

/* The hero lives in Hero.jsx */

/* ── About ──────────────────────────────────────────────────── */
export const About = () => (
  <section id='about' className='section' aria-labelledby='about-title'>
    <div data-reveal><SectionHeader id='about-title' title='About' /></div>
    <div className='about' data-reveal>
      <img src={profilePic} alt='Blessing James' className='about__photo' width='320' height='400' loading='lazy' />
      <div className='about__bio'>
        {about.bio.map((p) => <p key={p}>{p}</p>)}
      </div>
    </div>
    <ul className='pillars'>
      {pillars.map(({ title, proof, tags }) => (
        <li key={title} data-reveal-batch>
          <Card as='div' className='pillar'>
            <h3 className='pillar__title'>{title}</h3>
            {proof && <p className='pillar__proof'>{proof}</p>}
            <div className='tag-row'>{tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
          </Card>
        </li>
      ))}
    </ul>
  </section>
)

/* ── Project links ──────────────────────────────────────────── */
const ProjectLinks = ({ project, hideSource }) => {
  const showSource = project.sourceCode && !hideSource
  if (!showSource && !project.livePreview) return null
  return (
    <div className='project-links'>
      {showSource && <Button variant='ghost' href={project.sourceCode} external>Source code</Button>}
      {project.livePreview && <Button variant='ghost' href={project.livePreview} external>Live site</Button>}
    </div>
  )
}

/* ── Selected work (AI/ML) ──────────────────────────────────── */
const WorkCard = ({ project }) => {
  const tiltRef = useTilt(5)
  return (
    <li data-reveal-batch className='work-grid__item'>
      <div ref={tiltRef} className='work-card__tilt'>
        <Card className='work-card'>
          <div className='work-card__media'>
            <img src={project.image} alt={`${project.name} preview`} className='work-card__img' width='640' height='360' loading='lazy' />
          </div>
          <div className='work-card__body'>
            <div className='work-card__heading'>
              <h3 className='work-card__name'>{project.name}</h3>
              <Tag>{project.team ? (project.role ? `Team · ${project.role}` : 'Team project') : 'Solo project'}</Tag>
            </div>
            <p className='work-card__desc'>{project.description}</p>
            <div className='tag-row'>{project.stack.map((s) => <Tag key={s}>{s}</Tag>)}</div>
            <ProjectLinks project={project} />
          </div>
        </Card>
      </div>
    </li>
  )
}

export const Work = () => {
  const featured = projects.filter((p) => p.category === 'AI/ML' || p.category === 'Full-Stack')
  return (
    <section id='work' className='section' aria-labelledby='work-title'>
      <div data-reveal>
        <SectionHeader id='work-title' title='Selected work'>
          AI, machine learning and full-stack projects.
        </SectionHeader>
      </div>
      <ul className='work-grid'>
        {featured.map((project) => <WorkCard key={project.name} project={project} />)}
      </ul>
    </section>
  )
}

/* ── Experience ─────────────────────────────────────────────── */
export const Experience = () => (
  <section id='experience' className='section' aria-labelledby='experience-title'>
    <div data-reveal>
      <SectionHeader id='experience-title' title='Experience' />
    </div>
    <ol className='timeline'>
      {experience.map(({ when, title, org, points }) => (
        <li key={`${title}-${org}`} className='timeline__item' data-reveal-batch>
          <span className='timeline__when'>{when}</span>
          <Card as='div' className='timeline__card'>
            <h3 className='timeline__title'>{title}</h3>
            <p className='timeline__org'>{org}</p>
            <ul className='timeline__points'>
              {points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </Card>
        </li>
      ))}
    </ol>

    <h3 className='education__title' data-reveal>Education</h3>
    <ul className='education'>
      {education.map(({ when, title, org }) => (
        <li key={title} data-reveal-batch>
          <Card as='div' className='education__card'>
            {when && <span className='timeline__when'>{when}</span>}
            <p className='timeline__title'>{title}</p>
            <p className='timeline__org'>{org}</p>
          </Card>
        </li>
      ))}
    </ul>
  </section>
)

/* ── More work (Web, UI/UX, Graphics) ───────────────────────── */
const MORE_CATEGORIES = [
  { id: 'Web', label: 'Websites' },
  { id: 'UI/UX', label: 'Interface design' },
  { id: 'Graphics', label: 'Graphics' },
]

export const MoreWork = () => {
  const [active, setActive] = useState('Web')
  const items = projects.filter((p) => p.category === active)
  const gridRef = useRef(null)
  const firstRender = useRef(true)

  // Answer a tab change by bringing the new set of projects in
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    if (prefersReducedMotion() || !gridRef.current) return
    const tween = gsap.from(gridRef.current.children, {
      y: 24, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.05,
    })
    return () => tween.kill()
  }, [active])

  return (
    <section id='more-work' className='section' aria-labelledby='more-title'>
      <div data-reveal>
        <SectionHeader id='more-title' title='Other work'>
          Websites, interface design and graphics.
        </SectionHeader>
      </div>
      <div className='tabs' role='tablist' aria-label='Project type'>
        {MORE_CATEGORIES.map(({ id, label }) => (
          <button
            key={id}
            type='button'
            role='tab'
            id={`tab-${id}`}
            aria-selected={active === id}
            aria-controls='more-panel'
            className='tabs__tab'
            onClick={() => setActive(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <ul ref={gridRef} id='more-panel' role='tabpanel' aria-labelledby={`tab-${active}`} className='more-grid'>
        {items.map((project) => (
          <li key={project.name} className='more-card'>
            <img src={project.image} alt='' className='more-card__img' loading='lazy' />
            <h3 className='more-card__name'>{project.name}</h3>
            <p className='more-card__desc'>{project.description}</p>
            <ProjectLinks project={project} hideSource={project.category === 'UI/UX'} />
          </li>
        ))}
      </ul>
      {active === 'Graphics' && (
        <p className='more-note'>
          More design work is on <a href={about.social.behance} target='_blank' rel='noopener noreferrer'>Behance</a>.
        </p>
      )}
    </section>
  )
}

/* ── GitHub ─────────────────────────────────────────────────── */
const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n))

const Stat = ({ label, value }) => {
  const ref = useCountUp(value, fmt)
  return (
    <div className='github__stat'>
      <dt>{label}</dt>
      <dd ref={ref}>{typeof value === 'number' ? fmt(value) : '…'}</dd>
    </div>
  )
}

export const GitHubSection = () => {
  const sectionRef = useRef(null)
  const [near, setNear] = useState(false)
  // Fetch stats only when the section is about a screen away
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); io.disconnect() }
    }, { rootMargin: '100% 0px' })
    io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])
  const { data, status } = useGitHubStats(near)
  return (
    <section ref={sectionRef} id='github' className='section' aria-labelledby='github-title'>
      <div data-reveal>
        <SectionHeader id='github-title' title='GitHub'>
          Public activity, excluding forks.
        </SectionHeader>
      </div>
      {status === 'error' && (
        <p className='github__fallback'>
          GitHub isn&apos;t responding right now. <a href={GITHUB_PROFILE} target='_blank' rel='noopener noreferrer'>See my profile on GitHub</a>.
        </p>
      )}
      {status !== 'error' && (
        <Card as='div' className='github' aria-busy={status === 'loading'}>
          <dl className='github__stats'>
            {[
              ['Public commits', data?.commits],
              ['Pull requests', data?.prs],
              ['Public repos', data?.repos],
              ['Followers', data?.followers],
            ].map(([label, value]) => <Stat key={label} label={label} value={value} />)}
          </dl>
          {data?.languages?.length > 0 && (
            <div className='github__langs'>
              <h3 className='github__langs-title'>Most-used languages across my repos</h3>
              <ul>
                {data.languages.map(({ name, percent }) => (
                  <li key={name} className='github__lang'>
                    <span className='github__lang-name'>{name}</span>
                    <span className='github__lang-bar' aria-hidden='true'><span style={{ width: `${percent}%` }} /></span>
                    <span className='github__lang-pct'>{percent}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Button variant='ghost' href={GITHUB_PROFILE} external>See my GitHub profile</Button>
        </Card>
      )}
    </section>
  )
}

/* ── Contact ────────────────────────────────────────────────── */
export const Contact = () => (
  <section id='contact' className='section contact' aria-labelledby='contact-title'>
    <div data-reveal>
      <SectionHeader id='contact-title' title='Contact'>
        Open to AI/ML and full-stack roles, and freelance projects.
      </SectionHeader>
    </div>
    <div className='contact__actions' data-reveal>
      <Button href={`mailto:${contact.email}`} data-magnetic>Email me</Button>
      <Button variant='secondary' href={about.social.linkedin} external>Message me on LinkedIn</Button>
    </div>
  </section>
)

/* ── Footer ─────────────────────────────────────────────────── */
export const SiteFooter = () => (
  <footer className='site-footer'>
    <p>© {new Date().getFullYear()} {about.name}. Designed and built by me.</p>
  </footer>
)
