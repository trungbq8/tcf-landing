<template>
  <section id="pricing" class="section pricing">
    <div class="section__inner">
      <h2 class="section__title">Simple, transparent fees</h2>
      <p class="section__sub">
        Simple, transparent pricing with no hidden costs. Pay only when you get paid.
      </p>

      <div class="pricing__grid">
        <div class="pricing-card pricing-card--highlight">
          <div class="pricing-card__glow" />
          <div class="pricing-card__label">Service Fee</div>
          <div class="pricing-card__value">0.5<span class="pct">%</span></div>
          <div class="pricing-card__desc">Base fee applied to every payment amount in USD.</div>
        </div>

        <div class="pricing-card">
          <div class="pricing-card__label">Stablecoin settlement fee → USDT</div>
          <div class="pricing-card__value">1.0<span class="pct">%</span></div>
          <div class="pricing-card__desc">Payer pays with stablecoins; merchant receives USDT.</div>
        </div>

        <div class="pricing-card">
          <div class="pricing-card__label">Crypto settlement fee → USDT</div>
          <div class="pricing-card__value">2.0<span class="pct">%</span></div>
          <div class="pricing-card__desc">Payer pays with any other crypto; merchant receives USDT.</div>
        </div>

        <div class="pricing-card">
          <div class="pricing-card__label">Withdrawal Fee</div>
          <div class="pricing-card__value pricing-card__value--sm">Per-chain</div>
          <div class="pricing-card__desc">Fixed fee per withdrawal, cover blockchain transaction costs entirely.</div>
        </div>
      </div>

      <p class="pricing__note">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style="display:inline;vertical-align:middle;margin-right:6px"><circle cx="12" cy="12" r="10" stroke="#a78bfa" stroke-width="1.5"/><path d="M12 7v6M12 16v1" stroke="#a78bfa" stroke-width="2" stroke-linecap="round"/></svg>
        Fee payer is configurable — merchants can pass fees on to the payer or absorb them.
      </p>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
onMounted(() => useScrollReveal('.pricing .pricing-card'))
</script>

<style scoped>
.pricing {
  padding: 6rem 1.5rem;
}

.section__inner {
  max-width: 1000px;
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
  font-size: 1rem;
  margin: 0 0 3rem;
  line-height: 1.65;
}

.pricing__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.pricing-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}
.pricing-card:hover {
  border-color: rgba(124,58,237,0.35);
  transform: translateY(-3px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.3);
}

.pricing-card--highlight {
  border-color: rgba(124,58,237,0.4);
  background: rgba(124,58,237,0.07);
}
.pricing-card--highlight:hover {
  border-color: rgba(167,139,250,0.6);
}

.pricing-card__glow {
  position: absolute;
  top: -40px; right: -40px;
  width: 150px; height: 150px;
  background: radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%);
  pointer-events: none;
}

.pricing-card__label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 0.6rem;
}

.pricing-card__value {
  font-size: 2.6rem;
  font-weight: 800;
  color: #fff;
  line-height: 1;
  margin-bottom: 0.65rem;
  letter-spacing: -0.03em;
}

.pricing-card__value--sm {
  font-size: 1.5rem;
}

.pct {
  font-size: 1.1rem;
  font-weight: 700;
  color: #a78bfa;
}

.pricing-card__desc {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.55;
}

.pricing__note {
  margin-top: 3.9rem;
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.45);
  position: relative;
  z-index: 1;
}

@media (max-width: 640px) {
  .pricing__grid {
    grid-template-columns: 1fr;
  }
}
</style>
