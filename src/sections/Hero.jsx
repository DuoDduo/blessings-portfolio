// Hero: a photo shoot. A viewfinder hunts for focus, a long exposure draws
// light trails while the subject brightens, the shutter fires, the frame
// opens to full size and hand-drawn notes circle the photo. Every step is
// skipped (and the final state shown) under prefers-reduced-motion, and any
// scroll, key press or tap jumps straight to the end.
import { useEffect, useMemo, useRef } from 'react'
import { FaBehance, FaGithub, FaLinkedin } from 'react-icons/fa'
import { about } from '../portfolio'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../motion/motion'
import { Button } from '../components/ui/ui'
import { createLightTrails } from './lightTrails'
import subjectImg from '../assets/hero-subject.webp'
import './hero.css'

// Notes, positioned as fractions of the (square) photo. Wording follows the CV.
// box: area to circle [x1, y1, x2, y2]; label: where the text sits [x, y].
const NOTES = [
  { id: 'head', part: 'Head', title: 'I architect multi-agent systems', box: [0.38, 0.15, 0.62, 0.3], label: [0.8, 0.04], side: 'right' },
  { id: 'eyes', part: 'Eyes', title: 'Exploratory data analysis first', box: [0.43, 0.285, 0.61, 0.345], label: [0.17, 0.43], side: 'left' },
  { id: 'collar', part: 'Collar', title: 'Type-safe backends', box: [0.46, 0.47, 0.62, 0.7], label: [0.84, 0.47], side: 'right' },
  { id: 'buttons', part: 'Buttons', title: 'Production RAG pipelines', box: [0.47, 0.77, 0.76, 0.98], label: [0.8, 0.7], side: 'right' },
]

// The trails circle the head
const HEAD = { x: 0.5, y: 0.24 }

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}

// A loose, hand-drawn loop around a box (in a 1000 × 1000 view box). It runs a
// little past a full turn so the ends overlap, like a pen circling something.
const loopPath = ([x1, y1, x2, y2], seed) => {
  const rand = seeded(seed)
  const cx = ((x1 + x2) / 2) * 1000
  const cy = ((y1 + y2) / 2) * 1000
  const rx = ((x2 - x1) / 2) * 1000 * 1.15
  const ry = ((y2 - y1) / 2) * 1000 * 1.2
  const phase = rand() * Math.PI * 2
  const turns = Math.PI * 2 * 1.12
  const points = []
  for (let i = 0; i <= 60; i++) {
    const t = (i / 60) * turns
    const wobble = 1 + Math.sin(t * 3 + phase) * 0.04 + Math.sin(t * 5 + phase * 2) * 0.025
    const grow = 1 + (t / turns) * 0.06
    points.push([cx + Math.cos(t - Math.PI / 2) * rx * wobble * grow, cy + Math.sin(t - Math.PI / 2) * ry * wobble * grow])
  }
  return 'M' + points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L')
}

// A curved arrow from the label towards the edge of the loop
const arrowPath = ({ box: [x1, y1, x2, y2], label: [lx, ly], side }) => {
  const sx = lx * 1000 + (side === 'right' ? -16 : 16)
  const sy = ly * 1000 + 14
  const ex = (side === 'right' ? x2 : x1) * 1000 + (side === 'right' ? 18 : -18)
  const ey = ((y1 + y2) / 2) * 1000
  // Bow the curve sideways from the straight line, upwards, like a pen stroke
  const dx = ex - sx
  const dy = ey - sy
  const len = Math.hypot(dx, dy) || 1
  let px = -dy / len
  let py = dx / len
  if (py > 0) { px = -px; py = -py }
  const qx = (sx + ex) / 2 + px * len * 0.3
  const qy = (sy + ey) / 2 + py * len * 0.3
  const angle = Math.atan2(ey - qy, ex - qx)
  const head = (da) => `${(ex - Math.cos(angle + da) * 14).toFixed(1)} ${(ey - Math.sin(angle + da) * 14).toFixed(1)}`
  return `M${sx.toFixed(1)} ${sy.toFixed(1)}Q${qx.toFixed(1)} ${qy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}M${ex.toFixed(1)} ${ey.toFixed(1)}L${head(0.5)}M${ex.toFixed(1)} ${ey.toFixed(1)}L${head(-0.5)}`
}

const pad = (n) => String(n).padStart(2, '0')

const Hero = () => {
  const root = useRef(null)
  const trailsCanvas = useRef(null)
  const notes = useMemo(() => NOTES.map((n, i) => ({ ...n, loop: loopPath(n.box, i + 3), arrow: arrowPath(n) })), [])

  useEffect(() => {
    const el = root.current
    const trails = createLightTrails(trailsCanvas.current)
    const reduced = prefersReducedMotion()
    const q = gsap.utils.selector(el)

    // Keep the trails centred on the head as the photo resizes
    const placeTrails = () => {
      const stage = q('.hero__stage')[0].getBoundingClientRect()
      const subject = q('.hero__subject')[0].getBoundingClientRect()
      trails.setCenter(
        (subject.left - stage.left + subject.width * HEAD.x) / stage.width,
        (subject.top - stage.top + subject.height * HEAD.y) / stage.height,
      )
      trails.draw()
    }
    const resizeObserver = new ResizeObserver(placeTrails)
    resizeObserver.observe(el)
    placeTrails()

    if (reduced) {
      trails.state.length = 1
      trails.state.opacity = 0.5
      trails.draw()
      return () => { resizeObserver.disconnect(); trails.dispose() }
    }

    // Trails keep turning slowly while the hero is on screen
    let raf = 0
    let last = performance.now()
    let visible = true
    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      trails.tick(Math.min((now - last) / 1000, 0.05))
      last = now
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) { last = performance.now(); raf = requestAnimationFrame(loop) }
    })
    io.observe(el)

    const ctx = gsap.context(() => {
      const header = document.querySelector('.site-header')
      const loops = q('.hero__loop')
      const arrows = q('.hero__arrow')
      loops.concat(arrows).forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })

      // Before the shot: dark subject, frame pulled in, viewfinder up
      gsap.set(q('.hero__subject-img'), { filter: 'brightness(0.12) saturate(0.6)' })
      gsap.set(q('.hero__name'), { opacity: 0.15 })
      gsap.set(q('.hero__frame'), { scale: 0.86 })
      gsap.set(q('.hero__label'), { opacity: 0, y: 8 })
      gsap.set(q('.hero__copy > *'), { opacity: 0, y: 20 })
      gsap.set(q('.hero__viewfinder'), { display: 'block', opacity: 0 })
      gsap.to(q('.hero__viewfinder'), { opacity: 1, duration: 0.5, delay: 0.1 })
      if (header) gsap.set(header, { autoAlpha: 0 })
      trails.state.length = 0.004
      trails.state.speed = 0

      // Autofocus hunting until the photo has loaded
      const reticle = q('.hero__focus')[0]
      const hunt = gsap.to(reticle, {
        keyframes: [
          { x: '-40%', y: '18%', scale: 1.18, duration: 0.32 },
          { x: '22%', y: '-12%', scale: 0.94, duration: 0.28 },
          { x: '8%', y: '6%', scale: 1.08, duration: 0.26 },
          { x: '0%', y: '0%', scale: 1, duration: 0.3 },
        ],
        ease: 'power2.inOut',
        repeat: -1,
      })

      const counter = q('.hero__exposure')[0]
      const tl = gsap.timeline({ paused: true })
        .call(() => hunt.kill(), undefined, 0)
        .to(reticle, { x: 0, y: 0, scale: 1, color: '#6fd3a5', duration: 0.3, ease: 'back.out(2.5)' }, 0)
        .to(reticle, { opacity: 0, duration: 0.3 }, 0.6)
        // The exposure: trails draw while the subject brightens
        .to(trails.state, {
          length: 1, duration: 2.2, ease: 'power2.inOut',
          onUpdate: () => { counter.textContent = `00:00:${pad(Math.round(trails.state.length * 4))}`; trails.draw() },
        }, 0.45)
        .to(q('.hero__subject-img'), { filter: 'brightness(1) saturate(1)', duration: 2, ease: 'power1.inOut', clearProps: 'filter' }, 0.6)
        .to(q('.hero__name'), { opacity: 1, duration: 2, ease: 'power1.inOut' }, 0.6)
        // The shutter
        .to(q('.hero__shutter'), { opacity: 1, duration: 0.07, ease: 'none' }, 2.65)
        .to(q('.hero__shutter'), { opacity: 0, duration: 0.25, ease: 'power1.out' }, 2.8)
        .to(q('.hero__frame'), { scale: 1, duration: 1.1, ease: 'expo.inOut', clearProps: 'transform' }, 2.8)
        .to(q('.hero__vf-frame'), { scale: 1.3, opacity: 0, duration: 0.9, ease: 'power2.in' }, 2.8)
        .to(q('.hero__vf-info'), { opacity: 0, duration: 0.3 }, 2.8)
        .set(q('.hero__viewfinder'), { display: 'none' }, 3.9)
        .to(trails.state, { opacity: 0.55, duration: 1.4, ease: 'sine.inOut' }, 3)
        .to(trails.state, { speed: 1, duration: 3, ease: 'sine.in' }, 2.7)
        // The notes: each loop draws, then its arrow, then its label
        .to(loops, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut', stagger: 0.22 }, 3.1)
        .to(arrows, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out', stagger: 0.22 }, 3.5)
        .to(q('.hero__label'), { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.22 }, 3.6)
        .to(q('.hero__copy > *'), { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, 3.1)
      if (header) tl.to(header, { autoAlpha: 1, duration: 0.6, clearProps: 'opacity,visibility' }, 3.4)

      // Any scroll, key or tap skips the intro
      const skip = () => { if (tl.progress() < 1) tl.progress(1) }
      const events = ['wheel', 'touchstart', 'keydown', 'pointerdown']
      events.forEach((e) => window.addEventListener(e, skip, { once: true, passive: true }))

      // Start once the photo is ready (or after 4 s at most)
      const img = q('.hero__subject-img')[0]
      const start = () => tl.play()
      const timer = setTimeout(start, 4000)
      img.decode().catch(() => {}).then(() => { clearTimeout(timer); start() })

      // Scrolling away: the photo sinks and the name rises
      gsap.to(q('.hero__subject'), { yPercent: 8, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to(q('.hero__name'), { yPercent: -40, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } })

      // Pointer parallax: the name and the subject move against each other
      let onMove = null
      if (window.matchMedia('(pointer: fine)').matches) {
        const sx = gsap.quickTo(q('.hero__subject')[0], 'x', { duration: 0.8, ease: 'power3.out' })
        const nx = gsap.quickTo(q('.hero__name')[0], 'x', { duration: 0.8, ease: 'power3.out' })
        onMove = (e) => {
          const f = e.clientX / window.innerWidth - 0.5
          sx(f * 18)
          nx(f * -28)
        }
        window.addEventListener('pointermove', onMove, { passive: true })
      }
      return () => {
        events.forEach((e) => window.removeEventListener(e, skip))
        if (onMove) window.removeEventListener('pointermove', onMove)
        clearTimeout(timer)
      }
    }, el)

    return () => {
      ctx.revert()
      cancelAnimationFrame(raf)
      io.disconnect()
      resizeObserver.disconnect()
      trails.dispose()
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <section ref={root} className='hero' aria-labelledby='hero-title'>
      <div className='hero__stage'>
        <div className='hero__frame'>
          <canvas ref={trailsCanvas} className='hero__trails' aria-hidden='true' />
          <h1 id='hero-title' className='hero__name'>{about.name}</h1>
          <div className='hero__subject'>
            <img
              src={subjectImg}
              alt={`Portrait of ${about.name}`}
              className='hero__subject-img'
              width='941'
              height='940'
              fetchpriority='high'
            />
            <svg className='hero__notes' viewBox='0 0 1000 1000' aria-hidden='true'>
              {notes.map(({ id, loop, arrow }) => (
                <g key={id}>
                  <path className='hero__loop' d={loop} />
                  <path className='hero__arrow' d={arrow} />
                </g>
              ))}
            </svg>
            <ul className='hero__labels' aria-label='Notes about my work'>
              {notes.map(({ id, part, title, label: [x, y], side }) => (
                <li key={id} className={`hero__label hero__label--${side}`} style={{ left: `${x * 100}%`, top: `${y * 100}%` }}>
                  <span className='hero__label-part'>{part}</span>
                  <span className='hero__label-title'>{title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Camera viewfinder shown during the intro */}
        <div className='hero__viewfinder' aria-hidden='true'>
          <div className='hero__vf-frame' />
          <div className='hero__focus'>
            <svg viewBox='0 0 40 40'><path d='M0 11V0h11M29 0h11v11M40 29v11H29M11 40H0V29' /></svg>
          </div>
          <div className='hero__vf-info'>
            <span>ISO 400</span>
            <span>f/1.8</span>
            <span className='hero__exposure'>00:00:00</span>
          </div>
          <div className='hero__shutter' />
        </div>
      </div>

      <div className='hero__copy'>
        <p className='hero__role'>
          {about.title[0]} <span className='accent'>&amp; {about.title[1]}</span>
        </p>
        <p className='hero__tagline'>{about.summary}</p>
        <div className='hero__actions'>
          <Button href='#work' data-magnetic>View my work</Button>
          <Button variant='secondary' href={about.resume} download='Blessing_James_CV.pdf'>Download CV</Button>
          <ul className='socials'>
            <li><a href={about.social.github} target='_blank' rel='noopener noreferrer' aria-label='GitHub'><FaGithub /></a></li>
            <li><a href={about.social.linkedin} target='_blank' rel='noopener noreferrer' aria-label='LinkedIn'><FaLinkedin /></a></li>
            <li><a href={about.social.behance} target='_blank' rel='noopener noreferrer' aria-label='Behance'><FaBehance /></a></li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Hero
