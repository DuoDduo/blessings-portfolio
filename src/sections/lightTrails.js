// Long-exposure light trails for the hero: concentric arcs of cyan, magenta
// and indigo light around the subject's head. `state.length` (0 to 1) is how
// far the exposure has run; `state.speed` slowly turns the trails afterwards.

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}

const cssVar = (name, fallback) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback

export const createLightTrails = (canvas, { count = 70 } = {}) => {
  const ctx = canvas.getContext('2d')
  const rand = seeded(11)
  const palette = [
    cssVar('--cyan-400', '#00e5ff'),
    cssVar('--magenta-500', '#ef0bef'),
    cssVar('--indigo-500', '#4f46e5'),
    '#eef2f8',
  ]
  const arcs = Array.from({ length: count }, () => ({
    radius: 0.12 + rand() * 0.85,
    start: rand() * Math.PI * 2,
    span: 0.4 + rand() * 1.6,
    width: 0.6 + rand() * 1.8,
    alpha: 0.18 + rand() * 0.55,
    spin: rand() > 0.5 ? 1 : -1,
    color: palette[Math.floor(rand() * palette.length)],
  }))

  const state = { length: 1, speed: 0, opacity: 1 }
  const center = { x: 0.5, y: 0.3 }
  let rotation = 0
  let dpr = 1

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(canvas.clientWidth * dpr)
    canvas.height = Math.round(canvas.clientHeight * dpr)
  }
  const observer = new ResizeObserver(() => { resize(); draw() })
  observer.observe(canvas)
  resize()

  function draw() {
    const { width: w, height: h } = canvas
    ctx.clearRect(0, 0, w, h)
    if (state.length <= 0 || state.opacity <= 0) return
    const cx = center.x * w
    const cy = center.y * h
    const maxR = Math.hypot(w, h) * 0.6
    ctx.globalCompositeOperation = 'lighter'
    ctx.lineCap = 'round'
    for (const arc of arcs) {
      const r = arc.radius * maxR
      const a0 = arc.start + rotation * arc.spin
      ctx.beginPath()
      ctx.arc(cx, cy, r, a0, a0 + arc.span * state.length)
      ctx.strokeStyle = arc.color
      ctx.globalAlpha = arc.alpha * state.opacity
      ctx.lineWidth = arc.width * dpr
      ctx.stroke()
    }
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
  }

  return {
    state,
    draw,
    // Where the trails circle, as a fraction of the canvas
    setCenter: (x, y) => { center.x = x; center.y = y },
    tick: (dt) => { rotation += dt * 0.04 * state.speed; draw() },
    dispose: () => observer.disconnect(),
  }
}
