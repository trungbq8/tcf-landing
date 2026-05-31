<template>
  <section id="chains" class="section chains">
    <div class="section__inner">
      <h2 class="section__title">30+ Supported Blockchains</h2>
      <p class="section__sub">
        We handle the complexity of multi-chain support, so you can focus on building your business.
      </p>
    </div>

    <!-- Marquee rows -->
    <div class="marquee-wrapper" aria-hidden="true">
      <div class="marquee-track marquee-track--fwd">
        <div class="marquee-inner" aria-hidden="true">
          <span v-for="chain in allChains" :key="chain.shortName + '_a'" class="chain-pill">
            <span class="chain-pill__abbr">{{ chain.nativeToken }}</span>
            <span class="chain-pill__name">{{ chain.name }}</span>
          </span>
          <!-- duplicate for seamless loop -->
          <span v-for="chain in allChains" :key="chain.shortName + '_b'" class="chain-pill">
            <span class="chain-pill__abbr">{{ chain.nativeToken }}</span>
            <span class="chain-pill__name">{{ chain.name }}</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { chainsByType } from '@/data/chains.js'
import { useScrollReveal } from '@/composables/useScrollReveal'

const allChains = computed(() => Object.values(chainsByType).flat())

onMounted(() => useScrollReveal('.chains .section__inner h2'))
</script>

<style scoped>
.chains {
  padding: 6rem 0;
  background: rgba(255,255,255,0.015);
  overflow: hidden;
}

.section__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section__title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  color: #fff;
  text-align: center;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
}

.section__sub {
  text-align: center;
  color: rgba(255,255,255,0.5);
  font-size: 1rem;
  margin: 0 0 3.5rem;
  line-height: 1.65;
}

/* Marquee */
.marquee-wrapper {
  position: relative;
}
.marquee-wrapper::before,
.marquee-wrapper::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  width: 120px;
  z-index: 2;
  pointer-events: none;
}
.marquee-wrapper::before {
  left: 0;
  background: linear-gradient(to right, #0a0a14 0%, transparent 100%);
}
.marquee-wrapper::after {
  right: 0;
  background: linear-gradient(to left, #0a0a14 0%, transparent 100%);
}

.marquee-track {
  overflow: hidden;
  padding: 0.5rem 0;
}

.marquee-inner {
  display: flex;
  gap: 0.65rem;
  width: max-content;
  animation: marquee-fwd 38s linear infinite;
}
.marquee-track:hover .marquee-inner { animation-play-state: paused; }

@keyframes marquee-fwd {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.chain-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  padding: 0.4rem 0.85rem;
  white-space: nowrap;
  flex-shrink: 0;
  transition: border-color 0.2s, background 0.2s;
}
.chain-pill:hover {
  border-color: rgba(124,58,237,0.45);
  background: rgba(124,58,237,0.08);
}

.chain-pill__abbr {
  font-size: 0.72rem;
  font-weight: 700;
  color: #a78bfa;
  font-family: 'JetBrains Mono', monospace;
}

.chain-pill__name {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.7);
}

@media (prefers-reduced-motion: reduce) {
  .marquee-inner { animation: none; }
}
</style>
