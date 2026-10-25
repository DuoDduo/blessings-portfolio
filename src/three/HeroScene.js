// Page-wide backdrop scene: a layered network drawn like a blueprint.
// Pulses of data travel along the connections; the pointer tilts the
// network; a click sends a signal wave through every layer; scrolling
// carries the camera through it.
// Loaded lazily by sections/SceneBackdrop.jsx.
import {
  AdditiveBlending, BufferAttribute, BufferGeometry, CanvasTexture, Color, Group,
  IcosahedronGeometry, InstancedMesh, LineBasicMaterial, LineSegments, MeshBasicMaterial,
  Object3D, PerspectiveCamera, Points, PointsMaterial, Scene, Vector3, WebGLRenderer,
} from 'three'
import { gsap } from 'gsap'

const LAYERS_FULL = [4, 7, 8, 6, 2]
const LAYERS_COMPACT = [3, 5, 5, 4, 2]
const LAYER_GAP = 1.8
const CAMERA_Z = 13

// Deterministic random so the network looks the same on every visit
const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}

const cssColor = (name, fallback) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

const roundSprite = () => {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.4, 'rgba(255,255,255,0.6)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 64)
  return new CanvasTexture(c)
}

export const createHeroScene = (canvas, { reducedMotion = false, compact = false } = {}) => {
  const rand = seeded(7)
  const layers = compact ? LAYERS_COMPACT : LAYERS_FULL

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
  const scene = new Scene()
  const camera = new PerspectiveCamera(40, 1, 0.1, 100)
  camera.position.set(0, 0, CAMERA_Z)

  const network = new Group()
  scene.add(network)

  /* ── Nodes ───────────────────────────────────────────────── */
  const nodes = [] // { pos, layer, out: [edgeIndex] }
  const layerOf = []
  layers.forEach((count, li) => {
    const x = (li - (layers.length - 1) / 2) * LAYER_GAP
    const radius = count === 2 ? 0.9 : 1.1 + count * 0.12
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + li * 0.6
      nodes.push({ pos: new Vector3(x, Math.sin(a) * radius, Math.cos(a) * radius), layer: li, out: [] })
      layerOf.push(li)
    }
  })

  /* ── Edges: each node feeds 2–3 nodes in the next layer ───── */
  const edges = [] // [fromIndex, toIndex]
  let start = 0
  layers.forEach((count, li) => {
    if (li === layers.length - 1) return
    const nextStart = start + count
    const nextCount = layers[li + 1]
    for (let i = 0; i < count; i++) {
      const links = 2 + Math.floor(rand() * 2)
      const used = new Set()
      for (let k = 0; k < links; k++) {
        const j = nextStart + Math.floor(rand() * nextCount)
        if (used.has(j)) continue
        used.add(j)
        nodes[start + i].out.push(edges.length)
        edges.push([start + i, j])
      }
    }
    start = nextStart
  })

  const linePositions = new Float32Array(edges.length * 6)
  edges.forEach(([a, b], i) => {
    nodes[a].pos.toArray(linePositions, i * 6)
    nodes[b].pos.toArray(linePositions, i * 6 + 3)
  })
  const lineGeometry = new BufferGeometry()
  lineGeometry.setAttribute('position', new BufferAttribute(linePositions, 3))
  const lineMaterial = new LineBasicMaterial({ transparent: true, opacity: 0.35 })
  network.add(new LineSegments(lineGeometry, lineMaterial))

  const nodeGeometry = new IcosahedronGeometry(0.11, 2)
  const nodeMaterial = new MeshBasicMaterial()
  const nodeMesh = new InstancedMesh(nodeGeometry, nodeMaterial, nodes.length)
  network.add(nodeMesh)

  // The output layer is the decision: drawn in the annotation colour
  const outputMaterial = new MeshBasicMaterial()
  const outputMesh = new InstancedMesh(new IcosahedronGeometry(0.17, 2), outputMaterial, layers[layers.length - 1])
  network.add(outputMesh)

  // Per-layer scale, animated by the signal wave
  const layerScale = layers.map(() => ({ s: 1 }))
  const dummy = new Object3D()
  const firstOutput = nodes.length - layers[layers.length - 1]

  const writeNodeMatrices = () => {
    nodes.forEach((n, i) => {
      dummy.position.copy(n.pos)
      dummy.scale.setScalar(layerScale[n.layer].s)
      dummy.updateMatrix()
      if (i >= firstOutput) outputMesh.setMatrixAt(i - firstOutput, dummy.matrix)
      else nodeMesh.setMatrixAt(i, dummy.matrix)
    })
    nodeMesh.instanceMatrix.needsUpdate = true
    outputMesh.instanceMatrix.needsUpdate = true
  }
  writeNodeMatrices()

  /* ── Pulses travelling along edges ───────────────────────── */
  const MAX_PULSES = compact ? 40 : 90
  const pulses = []
  const pulsePositions = new Float32Array(MAX_PULSES * 3).fill(9999)
  const pulseGeometry = new BufferGeometry()
  pulseGeometry.setAttribute('position', new BufferAttribute(pulsePositions, 3))
  const pulseMaterial = new PointsMaterial({
    size: 0.32, map: roundSprite(), transparent: true, depthWrite: false, blending: AdditiveBlending,
  })
  network.add(new Points(pulseGeometry, pulseMaterial))

  const inputEdges = nodes.slice(0, layers[0]).flatMap((n) => n.out)
  const spawnPulse = () => {
    if (pulses.length >= MAX_PULSES) return
    pulses.push({ edge: inputEdges[Math.floor(rand() * inputEdges.length)], t: 0, speed: 0.5 + rand() * 0.5 })
  }
  for (let i = 0; i < (compact ? 10 : 18); i++) {
    spawnPulse()
    pulses[pulses.length - 1].edge = Math.floor(rand() * edges.length)
    pulses[pulses.length - 1].t = rand()
  }

  const tmp = new Vector3()
  const stepPulses = (dt) => {
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i]
      p.t += dt * p.speed
      if (p.t >= 1) {
        const next = nodes[edges[p.edge][1]].out
        if (next.length) { p.edge = next[Math.floor(rand() * next.length)]; p.t = 0 }
        else { pulses.splice(i, 1); continue }
      }
    }
    for (let i = 0; i < MAX_PULSES; i++) {
      const p = pulses[i]
      if (!p) { pulsePositions.fill(9999, i * 3, i * 3 + 3); continue }
      const [a, b] = edges[p.edge]
      tmp.lerpVectors(nodes[a].pos, nodes[b].pos, p.t).toArray(pulsePositions, i * 3)
    }
    pulseGeometry.attributes.position.needsUpdate = true
  }

  /* ── Theme ───────────────────────────────────────────────── */
  const setTheme = () => {
    const line = new Color(cssColor('--color-link', '#8db4f5'))
    lineMaterial.color.copy(line)
    nodeMaterial.color.set(cssColor('--color-text', '#ffffff'))
    outputMaterial.color.set(cssColor('--color-annotation', '#ffc93c'))
    pulseMaterial.color.copy(line)
  }
  setTheme()

  /* ── Interaction ─────────────────────────────────────────── */
  const pointer = { x: 0, y: 0 }
  const tilt = { x: 0, y: 0 }
  let progress = 0
  let smooth = 0
  let baseZ = CAMERA_Z
  let driftX = 2.4

  const onPointerMove = (e) => {
    const r = canvas.getBoundingClientRect()
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1
    pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1
  }
  const onPointerLeave = () => { pointer.x = 0; pointer.y = 0 }

  // Signal wave: each layer swells in turn while a burst of pulses leaves the input layer
  const wave = () => {
    if (reducedMotion) return
    const tl = gsap.timeline()
    layerScale.forEach((l, i) => {
      tl.to(l, { s: 1.9, duration: 0.18, ease: 'power2.out' }, i * 0.14)
        .to(l, { s: 1, duration: 0.5, ease: 'power2.inOut' }, i * 0.14 + 0.18)
    })
    for (let i = 0; i < 14; i++) spawnPulse()
  }

  if (!reducedMotion) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)
  }

  /* ── Size ────────────────────────────────────────────────── */
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas.parentElement
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    // Keep the whole network in frame on narrow screens, and drift less there
    baseZ = w / h < 1 ? CAMERA_Z / Math.max(w / h, 0.6) : CAMERA_Z
    driftX = w / h < 1 ? 0.6 : 2.4
    camera.position.z = baseZ
    camera.updateProjectionMatrix()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas.parentElement)
  resize()

  /* ── Loop (paused when hidden or off-screen) ─────────────── */
  let visible = true
  let raf = 0
  let last = performance.now()
  let spawnClock = 0

  const render = () => renderer.render(scene, camera)

  const tick = (now) => {
    raf = requestAnimationFrame(tick)
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now

    tilt.x += (pointer.y * 0.25 - tilt.x) * 0.06
    tilt.y += (pointer.x * 0.45 - tilt.y) * 0.06
    // Scrolling the page carries you through the network: it turns,
    // drifts from side to side between sections and flies closer mid-page
    smooth += (progress - smooth) * 0.08
    network.rotation.x = tilt.x + Math.sin(now / 4000) * 0.05 + smooth * 0.6
    network.rotation.y = tilt.y - 0.35 + smooth * Math.PI * 1.6 + Math.sin(now / 5000) * 0.08
    network.position.x = Math.sin(smooth * Math.PI * 3) * driftX
    camera.position.z = baseZ - Math.sin(smooth * Math.PI) * 3

    spawnClock += dt
    if (spawnClock > 0.12) { spawnClock = 0; spawnPulse() }
    stepPulses(dt)
    writeNodeMatrices()
    render()
  }

  const startLoop = () => {
    if (reducedMotion || raf || !visible || document.hidden) return
    last = performance.now()
    raf = requestAnimationFrame(tick)
  }
  const stopLoop = () => { cancelAnimationFrame(raf); raf = 0 }

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) startLoop(); else stopLoop()
  })
  io.observe(canvas)
  const onVisibility = () => (document.hidden ? stopLoop() : startLoop())
  document.addEventListener('visibilitychange', onVisibility)

  if (reducedMotion) {
    network.rotation.set(0.12, -0.35, 0)
    stepPulses(0)
    render()
  } else {
    startLoop()
  }

  return {
    wave,
    setTheme: () => { setTheme(); if (reducedMotion) render() },
    // 0 at the top of the page, 1 at the bottom
    setProgress: (p) => { progress = p },
    dispose: () => {
      stopLoop()
      io.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      lineGeometry.dispose(); nodeGeometry.dispose(); pulseGeometry.dispose()
      lineMaterial.dispose(); nodeMaterial.dispose(); outputMaterial.dispose()
      pulseMaterial.map?.dispose(); pulseMaterial.dispose()
      outputMesh.geometry.dispose()
      renderer.dispose()
    },
  }
}
