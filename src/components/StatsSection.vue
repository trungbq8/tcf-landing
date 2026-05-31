<template>
  <section class="stats-section" ref="sectionRef">
    <div class="stats-inner">
      <div v-for="stat in stats" :key="stat.label" class="stat-item">
        <span class="stat-value">
          <span :ref="el => statEls[stat.label] = el" class="stat-num">0</span>{{ stat.suffix }}
        </span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref(null)
const statEls = reactive({})

const stats = [
  { label: 'Blockchains Supported', end: 30,  suffix: '+', decimals: 0 },
  { label: 'Platform Fee',          end: 0.5,  suffix: '%', decimals: 1 },
  { label: 'USDT Settlement',   end: 100,  suffix: '%', decimals: 0 },
  { label: 'API Uptime',            end: 99.9, suffix: '%', decimals: 1 },
]

let triggered = false

const { stop } = useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (!isIntersecting || triggered) return
  triggered = true
  stop()
  animateStats()
})

async function animateStats() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stats.forEach(s => {
      const el = statEls[s.label]
      if (el) el.textContent = s.end
    })
    return
  }
  const { CountUp } = await import('countup.js')
  stats.forEach(s => {
    const el = statEls[s.label]
    if (!el) return
    const cu = new CountUp(el, s.end, {
      duration: 2,
      decimalPlaces: s.decimals,
      useEasing: true,
    })
    cu.start()
  })
}

onMounted(() => {
  // Fallback: set initial displayed value immediately
  stats.forEach(s => {
    const el = statEls[s.label]
    if (el) el.textContent = '0'
  })
})
</script>

<style scoped>
.stats-section {
  padding: 3.5rem 1.5rem;
  background: rgba(124, 58, 237, 0.06);
  border-top: 1px solid rgba(124, 58, 237, 0.15);
  border-bottom: 1px solid rgba(124, 58, 237, 0.15);
}

.stats-inner {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
}

.stat-value {
  font-size: clamp(1.9rem, 4vw, 2.8rem);
  font-weight: 800;
  background: linear-gradient(135deg, #a78bfa, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.stat-num {
  display: inline;
}

.stat-label {
  font-size: 0.78rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

@media (max-width: 640px) {
  .stats-inner {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
