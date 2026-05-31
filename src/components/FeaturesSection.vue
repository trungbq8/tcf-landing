<template>
  <section id="features" class="section features" ref="sectionRef">
    <div class="section__inner">
      <h2 class="section__title">Everything you need to accept crypto</h2>
      <p class="section__sub">
        A complete payment infrastructure, from wallet generation to settlement.
      </p>

      <div class="features__grid">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="feature-card"
          @mousemove="onMouseMove($event, feature)"
          @mouseleave="onMouseLeave(feature)"
          :style="{ '--mx': feature._mx, '--my': feature._my }"
        >
          <div class="feature-card__spotlight" />
          <div class="feature-card__icon">
            <component :is="feature.icon" />
          </div>
          <h3 class="feature-card__title">{{ feature.title }}</h3>
          <p class="feature-card__desc">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import IconMultiChain from './icons/IconMultiChain.vue'
import IconConvert    from './icons/IconConvert.vue'
import IconRateLock   from './icons/IconRateLock.vue'
import IconWebhook    from './icons/IconWebhook.vue'
import IconKyc        from './icons/IconKyc.vue'
import IconRealtime   from './icons/IconRealtime.vue'

const sectionRef = ref(null)

const features = reactive([
  { icon: IconMultiChain, title: 'Multi-Chain Support',   _mx: '50%', _my: '50%',
    description: 'Accept payments across 30+ blockchains — EVM, Solana, Aptos, Cosmos, Bitcoin, and more. New chains are supported regularly.' },
  { icon: IconConvert,    title: 'Auto-Convert to USDT',  _mx: '50%', _my: '50%',
    description: 'Receive any crypto, settle in USDT automatically. You always receive stable value — no market volatility risk.' },
  { icon: IconRateLock,   title: 'Best-in-Class Security',          _mx: '50%', _my: '50%',
    description: 'Protect your revenue from frauds. Our system is designed for secure multi-chain payment processing at scale' },
  { icon: IconWebhook,    title: 'API-First with Webhooks', _mx: '50%', _my: '50%',
    description: 'Create payments and receive instant webhook notifications on every state change. Full REST API with API key authentication.' },
  { icon: IconKyc,        title: 'Fast onboarding', _mx: '50%', _my: '50%',
    description: 'Integrated Basic and Advanced KYC flows. Most verifications are completed within minutes.' },
  { icon: IconRealtime,   title: 'Real-Time Status',      _mx: '50%', _my: '50%',
    description: 'Track every payment in real time from creation to settlement.' },
])

function onMouseMove(e, feature) {
  const rect = e.currentTarget.getBoundingClientRect()
  feature._mx = `${((e.clientX - rect.left) / rect.width) * 100}%`
  feature._my = `${((e.clientY - rect.top) / rect.height) * 100}%`
}
function onMouseLeave(feature) {
  feature._mx = '50%'
  feature._my = '50%'
}

onMounted(() => useScrollReveal('.features .feature-card'))
</script>

<style scoped>
.features {
  padding: 7rem 1.5rem;
}

.section__inner {
  max-width: 1200px;
  margin: 0 auto;
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
  font-size: 1.05rem;
  margin: 0 0 4rem;
  line-height: 1.65;
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

/* Glassmorphism card */
.feature-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  cursor: default;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.feature-card:hover {
  border-color: rgba(124,58,237,0.45);
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.35), 0 0 0 1px rgba(124,58,237,0.15);
}

/* Spotlight overlay */
.feature-card__spotlight {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--mx, 50%) var(--my, 50%),
    rgba(124,58,237,0.14) 0%,
    transparent 55%
  );
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
}
.feature-card:hover .feature-card__spotlight { opacity: 1; }

.feature-card__icon {
  width: 44px;
  height: 44px;
  margin-bottom: 1.1rem;
}
.feature-card__icon svg {
  width: 100%;
  height: 100%;
}

.feature-card__title {
  font-size: 1.0rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.55rem;
  letter-spacing: -0.01em;
}

.feature-card__desc {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.52);
  line-height: 1.7;
  margin: 0;
}

@media (max-width: 900px) {
  .features__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .features__grid { grid-template-columns: 1fr; }
}
</style>
