<template>
  <canvas ref="canvasEl" class="hero-canvas" aria-hidden="true" role="presentation" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasEl = ref(null)
let animId = null
let renderer = null

/* Crypto brand colour palette */
const CRYPTO_COLORS = [
  0xF7931A, // Bitcoin orange
  0x627EEA, // Ethereum blue
  0x26A17B, // USDT green
  0xF3BA2F, // BNB gold
  0x9945FF, // Solana purple
  0x2775CA, // USDC blue
  0xE84142, // Avalanche red
  0x00D4FF, // XRP cyan
]

onMounted(async () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  const THREE = await import('three')

  const canvas = canvasEl.value
  const W = canvas.offsetWidth
  const H = canvas.offsetHeight

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
  camera.position.set(0, 0, 200)

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setSize(W, H)
  renderer.setClearColor(0x000000, 0)

  /* ── Multi-colour crypto node particles ─────────────────────────────────── */
  const NODE_COUNT = 160
  const nodePos   = new Float32Array(NODE_COUNT * 3)
  const nodeColor = new Float32Array(NODE_COUNT * 3)
  const tmpCol = new THREE.Color()

  for (let i = 0; i < NODE_COUNT; i++) {
    nodePos[i * 3]     = (Math.random() - 0.5) * 360
    nodePos[i * 3 + 1] = (Math.random() - 0.5) * 200
    nodePos[i * 3 + 2] = (Math.random() - 0.5) * 140
    tmpCol.set(CRYPTO_COLORS[i % CRYPTO_COLORS.length])
    nodeColor[i * 3]     = tmpCol.r
    nodeColor[i * 3 + 1] = tmpCol.g
    nodeColor[i * 3 + 2] = tmpCol.b
  }

  const pointGeo = new THREE.BufferGeometry()
  pointGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3))
  pointGeo.setAttribute('color',    new THREE.BufferAttribute(nodeColor, 3))
  const pointMat = new THREE.PointsMaterial({
    size: 3.5,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.88,
  })
  scene.add(new THREE.Points(pointGeo, pointMat))

  /* ── Blockchain network edges ────────────────────────────────────────────── */
  const EDGE_THRESHOLD = 78
  const lineVerts = []
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      const dx = nodePos[i * 3]     - nodePos[j * 3]
      const dy = nodePos[i * 3 + 1] - nodePos[j * 3 + 1]
      const dz = nodePos[i * 3 + 2] - nodePos[j * 3 + 2]
      if (dx * dx + dy * dy + dz * dz < EDGE_THRESHOLD * EDGE_THRESHOLD) {
        lineVerts.push(
          nodePos[i * 3], nodePos[i * 3 + 1], nodePos[i * 3 + 2],
          nodePos[j * 3], nodePos[j * 3 + 1], nodePos[j * 3 + 2],
        )
      }
    }
  }
  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lineVerts), 3))
  const lineMat = new THREE.LineBasicMaterial({ color: 0x4338ca, transparent: true, opacity: 0.14 })
  scene.add(new THREE.LineSegments(lineGeo, lineMat))

  /* ── Prominent "coin" nodes — one per tracked crypto ────────────────────── */
  const coinGeo = new THREE.SphereGeometry(3.8, 8, 6)
  const coinMeshes = CRYPTO_COLORS.map((hex, i) => {
    const mat = new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.7 })
    const mesh = new THREE.Mesh(coinGeo, mat)
    mesh.position.set(
      (Math.random() - 0.5) * 300,
      (Math.random() - 0.5) * 170,
      (Math.random() - 0.5) * 110,
    )
    scene.add(mesh)
    return { mat, phase: (i / CRYPTO_COLORS.length) * Math.PI * 2 }
  })

  /* ── Resize ──────────────────────────────────────────────────────────────── */
  const ro = new ResizeObserver(() => {
    const w = canvas.offsetWidth, h = canvas.offsetHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  })
  ro.observe(canvas)

  /* ── Render loop ─────────────────────────────────────────────────────────── */
  let t = 0
  function tick() {
    animId = requestAnimationFrame(tick)
    t += 0.002

    /* Pulse coin nodes to simulate live on-chain activity */
    for (const { mat, phase } of coinMeshes) {
      mat.opacity = 0.4 + 0.35 * Math.sin(t * 1.8 + phase)
    }

    /* Slow camera drift */
    camera.position.x = Math.sin(t * 0.15) * 22
    camera.position.y = Math.cos(t * 0.10) * 11
    camera.lookAt(scene.position)

    renderer.render(scene, camera)
  }
  tick()

  onUnmounted(() => {
    cancelAnimationFrame(animId)
    ro.disconnect()
    pointGeo.dispose()
    lineGeo.dispose()
    pointMat.dispose()
    lineMat.dispose()
    coinGeo.dispose()
    coinMeshes.forEach(({ mat }) => mat.dispose())
    renderer.dispose()
  })
})
</script>

<style scoped>
.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.55;
  pointer-events: none;
}
</style>
