<template>
  <canvas ref="canvasEl" class="cta-canvas" aria-hidden="true" role="presentation" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasEl = ref(null)
let animId = null

/* Crypto tokens with brand colours */
const TOKENS = [
  { char: '₿', color: '#F7931A' }, // Bitcoin
  { char: 'Ξ',  color: '#627EEA' }, // Ethereum
  { char: '₮',  color: '#26A17B' }, // USDT
  { char: '◎',  color: '#9945FF' }, // Solana
  { char: '⬡',  color: '#F3BA2F' }, // BNB
  { char: '✕',  color: '#E84142' }, // Avalanche
  { char: '$',  color: '#2775CA' }, // USDC
]

function makeParticle(W, H, atBottom = true) {
  const tok = TOKENS[Math.floor(Math.random() * TOKENS.length)]
  return {
    x:     Math.random() * W,
    y:     atBottom ? H + 20 + Math.random() * H : Math.random() * H,
    size:  18 + Math.random() * 28,
    speed: 0.3 + Math.random() * 0.5,
    drift: (Math.random() - 0.5) * 0.4,
    alpha: 0.08 + Math.random() * 0.18,
    char:  tok.char,
    color: tok.color,
    rot:   (Math.random() - 0.5) * 0.3,
    angle: (Math.random() - 0.5) * 0.4,
  }
}

onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  const canvas = canvasEl.value
  let W = canvas.offsetWidth
  let H = canvas.offsetHeight
  canvas.width  = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  /* Spawn initial pool spread across full height */
  const COUNT = Math.round(W / 90)
  const particles = Array.from({ length: COUNT }, () => makeParticle(W, H, false))

  const ro = new ResizeObserver(() => {
    W = canvas.offsetWidth
    H = canvas.offsetHeight
    canvas.width  = W
    canvas.height = H
  })
  ro.observe(canvas)

  function tick() {
    animId = requestAnimationFrame(tick)
    ctx.clearRect(0, 0, W, H)

    for (const p of particles) {
      /* Move upward with gentle horizontal drift */
      p.y -= p.speed
      p.x += p.drift
      p.angle += p.rot * 0.01

      /* Fade in at bottom quarter, fade out at top quarter */
      const progress = 1 - p.y / H
      const fade = Math.min(progress / 0.15, (1 - progress) / 0.15, 1)
      const opacity = p.alpha * Math.max(0, Math.min(1, fade))

      ctx.save()
      ctx.globalAlpha = opacity
      ctx.translate(p.x, p.y)
      ctx.rotate(p.angle)
      ctx.font = `${p.size}px ui-sans-serif, system-ui, sans-serif`
      ctx.fillStyle = p.color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(p.char, 0, 0)
      ctx.restore()

      /* Respawn at bottom when exits top */
      if (p.y < -p.size) {
        Object.assign(p, makeParticle(W, H, true))
      }
    }
  }
  tick()

  onUnmounted(() => {
    cancelAnimationFrame(animId)
    ro.disconnect()
  })
})
</script>

<style scoped>
.cta-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>
