// Hero: a photo shoot. A viewfinder hunts for focus, a long exposure draws
// light trails while the subject brightens, the shutter fires, the frame
// opens to full size and the name rises letter by letter.
//
// Scrolling on wide screens then pins the hero: the photo shrinks into a
// centred card, the name splits apart, and a two-line statement rises on
// either side of the card before the page moves on. Narrower screens stack
// everything and reveal the statement as it scrolls into view.
//
// Every step is skipped (and the final state shown) under
// prefers-reduced-motion, and any scroll, key press or tap ends the intro.
import { Fragment, useEffect, useRef } from 'react'
import { FaBehance, FaGithub, FaLinkedin } from 'react-icons/fa'
import { about } from '../portfolio'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../motion/motion'
import { Button } from '../components/ui/ui'
import { createLightTrails } from './lightTrails'
import subjectImg from '../assets/hero-subject.webp'
import './hero.css'

// The trails circle the head, as a fraction of the (square) photo
const HEAD = { x: 0.5, y: 0.24 }

// The statement that follows the photo (from the CV: design and front-end
// first, then AI engineering)
const STATEMENT = {
  then: 'I started in design and front-end.',
  now: 'Now I build AI systems end to end.',
  detail: 'Specialising in Agentic RAG architectures, multi-agent orchestration and end-to-end LLM integration.',
}

const pad = (n) => String(n).padStart(2, '0')

// Each letter in its own mask so it can rise into view
const Letters = ({ text, className }) => (
  <span className={`hero__name-part ${className}`} aria-hidden='true'>
    {[...text].map((ch, i) => <span key={i} className='hero__char'>{ch}</span>)}
  </span>
)

// Each word in its own mask so the statement can rise word by word. The space
// sits outside the mask: a trailing space inside an inline-block is dropped.
const Words = ({ text }) => text.split(' ').map((word, i) => (
  <Fragment key={i}>
    <span className='hero__mask'><span className='hero__word'>{word}</span></span>{' '}
  </Fragment>
))

const Hero = () => {
  const root = useRef(null)
  const trailsCanvas = useRef(null)
  const [first, ...rest] = about.name.split(' ')
  const last = rest.join(' ')

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
    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      trails.tick(Math.min((now - last) / 1000, 0.05))
      last = now
    }
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf)
      if (entry.isIntersecting) { last = performance.now(); raf = requestAnimationFrame(loop) }
    })
    io.observe(el)

    const ctx = gsap.context(() => {
      const header = document.querySelector('.site-header')
      const chars = q('.hero__char')

      // Before the shot: dark subject, frame pulled in, viewfinder up
      gsap.set(q('.hero__subject-img'), { filter: 'brightness(0.12) saturate(0.6)' })
      gsap.set(chars, { yPercent: 115 })
      gsap.set(q('.hero__frame'), { scale: 0.86 })
      gsap.set(q('.hero__copy > *, .hero__cue'), { opacity: 0, y: 20 })
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
        // The shutter
        .to(q('.hero__shutter'), { opacity: 1, duration: 0.07, ease: 'none' }, 2.65)
        .to(q('.hero__shutter'), { opacity: 0, duration: 0.25, ease: 'power1.out' }, 2.8)
        .to(q('.hero__frame'), { scale: 1, duration: 1.1, ease: 'expo.inOut', clearProps: 'transform' }, 2.8)
        .to(q('.hero__vf-frame'), { scale: 1.3, opacity: 0, duration: 0.9, ease: 'power2.in' }, 2.8)
        .to(q('.hero__vf-info'), { opacity: 0, duration: 0.3 }, 2.8)
        .set(q('.hero__viewfinder'), { display: 'none' }, 3.9)
        .to(trails.state, { opacity: 0.55, duration: 1.4, ease: 'sine.inOut' }, 3)
        .to(trails.state, { speed: 1, duration: 3, ease: 'sine.in' }, 2.7)
        // The name rises letter by letter, then the copy follows
        .to(chars, { yPercent: 0, duration: 1.25, ease: 'expo.out', stagger: 0.035 }, 3)
        .to(q('.hero__copy > *'), { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, 3.4)
        .to(q('.hero__cue'), { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 3.9)
      if (header) tl.to(header, { autoAlpha: 1, duration: 0.6, clearProps: 'opacity,visibility' }, 3.4)

      // Any scroll, key or tap ends the intro
      const skip = () => { if (tl.progress() < 1) tl.progress(1) }
      const events = ['wheel', 'touchstart', 'keydown', 'pointerdown']
      events.forEach((e) => window.addEventListener(e, skip, { once: true, passive: true }))

      // Start once the photo is ready (or after 4 s at most)
      const img = q('.hero__subject-img')[0]
      const timer = setTimeout(() => tl.play(), 4000)
      img.decode().catch(() => {}).then(() => { clearTimeout(timer); tl.play() })

      const words = q('.hero__word')
      const mm = gsap.matchMedia()

      // Wide screens: pin the hero and hand over to the statement
      mm.add('(min-width: 1024px)', () => {
        const headerHeight = () => header?.offsetHeight ?? 0
        gsap.set(q('.hero__frame'), { clipPath: 'inset(0% 0% 0% 0% round 0px)' })
        const handover = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: el,
            start: () => `top ${headerHeight()}px`,
            end: '+=160%',
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            onUpdate: (self) => {
              // The statement link only becomes clickable once it has arrived
              q('.hero__statement')[0].style.pointerEvents = self.progress > 0.8 ? 'auto' : 'none'
              q('.hero__copy')[0].style.pointerEvents = self.progress > 0.15 ? 'none' : ''
            },
          },
        })
        handover
          .to(q('.hero__frame'), { clipPath: 'inset(9% 34% 9% 34% round 28px)', duration: 1 }, 0)
          .fromTo(q('.hero__subject-img'), { scale: 1.1 }, { scale: 1, duration: 1 }, 0)
          .to(q('.hero__name-first'), { xPercent: -55, opacity: 0, duration: 0.6, ease: 'power2.in' }, 0)
          .to(q('.hero__name-last'), { xPercent: 55, opacity: 0, duration: 0.6, ease: 'power2.in' }, 0)
          .to(q('.hero__copy'), { y: -30, opacity: 0, duration: 0.3, ease: 'power1.in' }, 0)
          .to(q('.hero__cue'), { opacity: 0, duration: 0.15 }, 0)
          // fromTo (not from) so both ends stay fixed when ScrollTrigger refreshes
          .fromTo(words, { yPercent: 140 }, { yPercent: 0, duration: 0.3, stagger: 0.03, ease: 'power3.out' }, 0.62)
          .fromTo(q('.hero__statement-detail'), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.92)
          .to({}, { duration: 0.3 })
        return () => gsap.set(q('.hero__frame'), { clearProps: 'clipPath' })
      })

      // Narrower screens: no pin; the photo drifts and the statement rises in
      mm.add('(max-width: 1023px)', () => {
        gsap.to(q('.hero__subject'), { yPercent: 6, ease: 'none', scrollTrigger: { trigger: q('.hero__stage')[0], start: 'top top', end: 'bottom top', scrub: true } })
        gsap.from(words, {
          yPercent: 140, duration: 1, ease: 'expo.out', stagger: 0.04,
          scrollTrigger: { trigger: q('.hero__statement')[0], start: 'top 80%', toggleActions: 'play none none reverse' },
        })
      })

      // Pointer parallax: the name and the photo move against each other
      let onMove = null
      if (window.matchMedia('(pointer: fine)').matches) {
        const stage = q('.hero__stage')[0]
        const nx = gsap.quickTo(q('.hero__name')[0], 'x', { duration: 1.2, ease: 'power3.out' })
        const ny = gsap.quickTo(q('.hero__name')[0], 'y', { duration: 1.2, ease: 'power3.out' })
        const sx = gsap.quickTo(q('.hero__subject')[0], 'x', { duration: 1.4, ease: 'power3.out' })
        const sy = gsap.quickTo(q('.hero__subject')[0], 'y', { duration: 1.4, ease: 'power3.out' })
        onMove = (e) => {
          const r = stage.getBoundingClientRect()
          const fx = ((e.clientX - r.left) / r.width) * 2 - 1
          const fy = ((e.clientY - r.top) / r.height) * 2 - 1
          nx(fx * -20); ny(fy * -10)
          sx(fx * 9); sy(fy * 5)
        }
        stage.addEventListener('pointermove', onMove)
      }

      return () => {
        events.forEach((e) => window.removeEventListener(e, skip))
        if (onMove) q('.hero__stage')[0].removeEventListener('pointermove', onMove)
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
          <h1 id='hero-title' className='hero__name' aria-label={about.name}>
            <Letters text={first} className='hero__name-first' />
            <Letters text={last} className='hero__name-last' />
          </h1>
          <div className='hero__subject'>
            <img
              src={subjectImg}
              alt={`Portrait of ${about.name}`}
              className='hero__subject-img'
              width='941'
              height='940'
              fetchpriority='high'
            />
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

      <div className='hero__cue' aria-hidden='true'>
        <span>Scroll</span>
        <span className='hero__cue-line' />
      </div>

      {/* The statement the photo hands over to */}
      <div className='hero__statement'>
        <div className='hero__statement-then'>
          <h2 className='hero__statement-line'><Words text={STATEMENT.then} /></h2>
        </div>
        <div className='hero__statement-now'>
          <p className='hero__statement-line hero__statement-line--accent'><Words text={STATEMENT.now} /></p>
          <div className='hero__statement-detail'>
            <p>{STATEMENT.detail}</p>
            <a href='#work' className='hero__statement-link'>See my work</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
