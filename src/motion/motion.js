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

/* Hero intro: the name rises out of its line masks, then the rest follows */
export const useHeroIntro = (scope) => {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('.hero__word', { yPercent: 110, duration: 1.1, stagger: 0.08 })
        .from('.hero__role, .hero__tagline', { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.6')
        .from('.hero__actions > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.06 }, '-=0.5')
        .from('.hero__stage', { opacity: 0, scale: 0.92, duration: 1.4, ease: 'power2.out' }, 0.2)
    }, scope)
    return () => ctx.revert()
  }, [scope])
}

/* Scroll reveals for anything marked data-reveal; cards arrive in batches */
export const useScrollReveals = () => {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 32, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
      ScrollTrigger.batch('[data-reveal-batch]', {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.from(batch, {
          y: 48, opacity: 0, rotateX: -8, duration: 0.9, ease: 'power3.out', stagger: 0.1,
        }),
      })
    })
    return () => ctx.revert()
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
