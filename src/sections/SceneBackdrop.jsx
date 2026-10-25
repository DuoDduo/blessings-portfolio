// Page-wide Three.js backdrop. The network sits fixed behind every section;
// scrolling the page carries the camera through it, glass cards blur it as it
// passes behind them, and a click on any empty part of the page sends a
// signal wave. The scene module loads as its own chunk after the text.
import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../motion/motion'

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="tab"]'

const SceneBackdrop = () => {
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let disposed = false
    let scene = null
    const triggers = []
    let themeObserver = null

    const onClick = (e) => {
      if (!e.target.closest(INTERACTIVE)) scene?.wave()
    }

    import('../three/HeroScene.js')
      .then(({ createHeroScene }) => {
        if (disposed || !canvasRef.current) return
        const reduced = prefersReducedMotion()
        scene = createHeroScene(canvasRef.current, {
          reducedMotion: reduced,
          compact: window.innerWidth < 700,
        })

        // Recolour when the theme toggle changes
        themeObserver = new MutationObserver(() => scene.setTheme())
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
        window.addEventListener('click', onClick)

        if (reduced) return
        // Whole-page scroll drives the flight through the network
        triggers.push(ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => scene.setProgress(self.progress),
        }))
        // Full strength behind the hero, quieter behind reading sections
        triggers.push(gsap.to(stageRef.current, {
          opacity: 0.28,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        }).scrollTrigger)
      })
      .catch((err) => {
        console.warn('3D scene unavailable:', err)
        if (!disposed) setFailed(true)
      })

    return () => {
      disposed = true
      triggers.forEach((t) => t?.kill())
      themeObserver?.disconnect()
      window.removeEventListener('click', onClick)
      scene?.dispose()
    }
  }, [])

  if (failed) return null

  return (
    <div ref={stageRef} className='scene-backdrop' aria-hidden='true'>
      <canvas ref={canvasRef} className='scene-backdrop__canvas' />
    </div>
  )
}

export default SceneBackdrop
