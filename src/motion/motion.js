// Shared GSAP setup and motion hooks. Every animation is skipped when the
// visitor's system asks for reduced motion.
import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const finePointer = () => window.matchMedia('(pointer: fine)').matches

/* Wrap each word of a heading in a mask so it can rise into view.
   Returns a function that puts the plain text back. */
const splitWords = (el) => {
  const text = el.textContent
  el.setAttribute('aria-label', text)
  el.textContent = ''
  text.split(' ').forEach((word, i) => {
    if (i) el.append(' ')
    const mask = document.createElement('span')
    mask.className = 'reveal-mask'
    mask.setAttribute('aria-hidden', 'true')
    const inner = document.createElement('span')
    inner.className = 'reveal-word'
    inner.textContent = word
    mask.append(inner)
    el.append(mask)
  })
  return () => {
    el.textContent = text
    el.removeAttribute('aria-label')
  }
}

/* Scroll reveals: headings rise word by word, text fades up, images wipe
   open, cards arrive in batches and the timeline draws as you scroll */
export const useScrollReveals = () => {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const restores = []
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        const title = el.querySelector('.ui-section-header__title')
        const trigger = { trigger: el, start: 'top 85%', once: true }
        if (!title) {
          gsap.from(el, { y: 32, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: trigger })
          return
        }
        restores.push(splitWords(title))
        const tl = gsap.timeline({ scrollTrigger: trigger })
        tl.fromTo(title.querySelectorAll('.reveal-word'),
          { yPercent: 120 },
          { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.06 })
        const desc = el.querySelector('.ui-section-header__desc')
        if (desc) tl.from(desc, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.25)
      })

      ScrollTrigger.batch('[data-reveal-batch]', {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.from(batch, {
          y: 48, opacity: 0, rotateX: -8, duration: 0.9, ease: 'power3.out', stagger: 0.1,
        }),
      })

      // Images open from the bottom like a curtain
      ScrollTrigger.batch('.work-card__media, .more-card__img, .about__photo', {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => gsap.fromTo(batch,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut', stagger: 0.12, clearProps: 'clipPath' }),
      })

      // The timeline line draws with the scroll: across on desktop, down on
      // smaller screens (the CSS reads --line either way)
      gsap.utils.toArray('.timeline').forEach((line) => {
        gsap.fromTo(line, { '--line': 0 }, {
          '--line': 1,
          ease: 'none',
          scrollTrigger: { trigger: line, start: 'top 80%', end: 'bottom 70%', scrub: 0.6 },
        })
      })
    })

    return () => {
      ctx.revert()
      restores.forEach((restore) => restore())
    }
  }, [])
}

/* 3D tilt toward the pointer (mouse and trackpad only) */
export const useTilt = (max = 6) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !finePointer()) return
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' })
    gsap.set(el, { transformPerspective: 900 })
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      ry(((e.clientX - r.left) / r.width - 0.5) * max * 2)
      rx(-((e.clientY - r.top) / r.height - 0.5) * max * 2)
    }
    const onLeave = () => { rx(0); ry(0) }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [max])
  return ref
}

/* Ember glow that follows the pointer and fades when it rests; buttons marked
   data-magnetic lean toward the pointer */
export const useCursorGlow = () => {
  useEffect(() => {
    if (prefersReducedMotion() || !finePointer()) return
    const glow = document.createElement('div')
    glow.className = 'cursor-glow'
    glow.setAttribute('aria-hidden', 'true')
    document.body.appendChild(glow)
    const x = gsap.quickTo(glow, 'x', { duration: 0.45, ease: 'power3.out' })
    const y = gsap.quickTo(glow, 'y', { duration: 0.45, ease: 'power3.out' })
    let idle = 0
    const onMove = (e) => {
      x(e.clientX); y(e.clientY)
      gsap.to(glow, { opacity: 1, duration: 0.3, overwrite: 'auto' })
      clearTimeout(idle)
      idle = setTimeout(() => gsap.to(glow, { opacity: 0, duration: 0.8 }), 900)
    }
    const magnets = [...document.querySelectorAll('[data-magnetic]')].map((el) => {
      const mx = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
      const my = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })
      const move = (e) => {
        const r = el.getBoundingClientRect()
        mx((e.clientX - r.left - r.width / 2) * 0.25)
        my((e.clientY - r.top - r.height / 2) * 0.35)
      }
      const leave = () => { mx(0); my(0) }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
    })
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      clearTimeout(idle)
      magnets.forEach((off) => off())
      glow.remove()
    }
  }, [])
}

/* Count a number up from zero the first time it scrolls into view */
export const useCountUp = (value, format = String) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof value !== 'number') return
    if (prefersReducedMotion()) { el.textContent = format(value); return }
    const counter = { n: 0 }
    el.textContent = format(0)
    const tween = gsap.to(counter, {
      n: value,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => { el.textContent = format(Math.round(counter.n)) },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [value, format])
  return ref
}
