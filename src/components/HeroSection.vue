<template>
  <section id="top" class="hero">
    <!-- Three.js particle network -->
    <HeroCanvas />

    <!-- Radial glow -->
    <div class="hero__glow" aria-hidden="true" />

    <div class="hero__inner">
      <div class="hero__badge" ref="badgeRef">Multi-chain · API-first · Real-time</div>
      <h1 class="hero__heading" ref="headingRef">
        Accept any crypto.<br />
        <span class="hero__accent">Get paid in USDT.</span>
      </h1>
      <p class="hero__sub" ref="subRef">
        TokenCashFlow is a multi-chain crypto payment gateway — Over 100 cryptocurrencies are supported, across 30+ blockchains, with a single API.
      </p>
      <div class="hero__ctas" ref="ctasRef">
        <a :href="`${portalUrl}/register`" class="btn btn--primary">Start for Free</a>
        <a :href="docsUrl" target="_blank" rel="noopener" class="btn btn--outline">
          Read the Docs →
        </a>
      </div>
      <p class="hero__note" ref="noteRef">
        No KYC needed to explore the dashboard &mdash; verification required to go live.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeroCanvas from './HeroCanvas.vue'

const portalUrl = import.meta.env.VITE_CLIENT_PORTAL_URL || ''
const docsUrl   = import.meta.env.VITE_DOCS_URL || ''

const badgeRef   = ref(null)
const headingRef = ref(null)
const subRef     = ref(null)
const ctasRef    = ref(null)
const noteRef    = ref(null)

onMounted(async () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const { gsap } = await import('gsap')

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.from(badgeRef.value,   { y: 20, opacity: 0, duration: 0.5 })
    .from(headingRef.value, { y: 40, opacity: 0, duration: 0.6 }, '-=0.25')
    .from(subRef.value,     { y: 30, opacity: 0, duration: 0.55 }, '-=0.3')
    .from(ctasRef.value,    { y: 20, opacity: 0, duration: 0.45 }, '-=0.25')
    .from(noteRef.value,    { opacity: 0, duration: 0.4 }, '-=0.1')
})
</script>

<style scoped>
.hero {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 5rem 1.5rem 4rem;
  isolation: isolate;
}

.hero__glow {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 600px;
  background: radial-gradient(ellipse, rgba(124,58,237,0.22) 0%, transparent 68%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.hero__inner {
  max-width: 680px;
  position: relative;
  z-index: 1;
  text-align: center;
}

.hero__badge {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #c4b5fd;
  background: rgba(124,58,237,0.18);
  border: 1px solid rgba(167,139,250,0.35);
  border-radius: 999px;
  padding: 0.35rem 1.1rem;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(8px);
}

.hero__heading {
  font-size: clamp(2.4rem, 6vw, 3.8rem);
  font-weight: 800;
  line-height: 1.15;
  color: #fff;
  margin: 0 0 1.25rem;
  letter-spacing: -0.02em;
}

.hero__accent {
  background: linear-gradient(135deg, #a78bfa, #7c3aed, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__sub {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.62);
  line-height: 1.75;
  margin: 0 0 2rem;
}

.hero__ctas {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.22s ease;
  cursor: pointer;
}

.btn--primary {
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
  color: #fff;
  box-shadow: 0 4px 20px rgba(124,58,237,0.3);
}

.btn--primary:hover {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(124,58,237,0.45);
}

.btn--outline {
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(167,139,250,0.3);
  backdrop-filter: blur(8px);
}

.btn--outline:hover {
  border-color: rgba(167,139,250,0.65);
  color: #fff;
  background: rgba(124,58,237,0.1);
}

.hero__note {
  margin-top: 1.5rem;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.3);
}

@media (max-width: 480px) {
  .hero__ctas { flex-direction: column; align-items: center; }
  .btn { width: 100%; max-width: 280px; text-align: center; }
}
</style>
