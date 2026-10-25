// React wrapper for the Three.js hero scene. The scene module loads as its
// own chunk after the page text has rendered.
import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion, ScrollTrigger } from '../motion/motion'

const HeroCanvas = () => {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let disposed = false
    let trigger = null
    let themeObserver = null
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const recolor = () => sceneRef.current?.setTheme()

    import('../three/HeroScene.js')
      .then(({ createHeroScene }) => {
        if (disposed || !canvasRef.current) return
        const scene = createHeroScene(canvasRef.current, {
          reducedMotion: prefersReducedMotion(),
          compact: window.innerWidth < 700,
        })
        sceneRef.current = scene

        // Recolour when the theme toggle or the system setting changes
        themeObserver = new MutationObserver(recolor)
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
        media.addEventListener('change', recolor)

        // Scroll turns the network and pulls it away as the hero leaves
        trigger = ScrollTrigger.create({
          trigger: canvasRef.current.closest('.hero'),
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => scene.setProgress(self.progress),
        })
      })
      .catch((err) => {
        console.warn('3D scene unavailable:', err)
        if (!disposed) setFailed(true)
      })

    return () => {
      disposed = true
      trigger?.kill()
      themeObserver?.disconnect()
      media.removeEventListener('change', recolor)
      sceneRef.current?.dispose()
      sceneRef.current = null
    }
  }, [])

  if (failed) return null

  return (
    <div className='hero__stage'>
      <canvas
        ref={canvasRef}
        className='hero__canvas'
        role='img'
        aria-label='An interactive 3D network: data pulses move between layers of connected nodes'
        onClick={() => sceneRef.current?.wave()}
      />
      <p className='hero__hint' aria-hidden='true'>Move your pointer to tilt it. Click to send a signal.</p>
    </div>
  )
}

export default HeroCanvas
