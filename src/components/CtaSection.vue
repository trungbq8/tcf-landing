<template>
  <section class="section cta" ref="sectionRef">
    <!-- Crypto transaction-rings canvas -->
    <CtaCanvas />

    <div class="cta__inner" ref="innerRef">
      <h2 class="cta__heading">Ready to accept crypto payments?</h2>
      <p class="cta__sub">
        Join merchants already using TokenCashFlow to create your first payment now.
      </p>
      <div class="cta__buttons">
        <a :href="`${portalUrl}/register`" class="btn btn--primary">Sign Up for Free</a>
        <a :href="docsUrl" target="_blank" rel="noopener" class="btn btn--outline">View Docs</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CtaCanvas from './CtaCanvas.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const portalUrl = import.meta.env.VITE_CLIENT_PORTAL_URL || ''
const docsUrl   = import.meta.env.VITE_DOCS_URL || ''

onMounted(() => useScrollReveal('.cta .cta__inner', { y: 24 }))
</script>

<style scoped>
.cta {
  padding: 8rem 1.5rem;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.cta__inner {
  max-width: 640px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.cta__heading {
  font-size: clamp(1.9rem, 4vw, 2.8rem);
  font-weight: 800;
  color: #fff;
  margin: 0 0 1.1rem;
  letter-spacing: -0.02em;
}

.cta__sub {
  font-size: 1.05rem;
  color: rgba(255,255,255,0.52);
  line-height: 1.7;
  margin: 0 0 2.75rem;
}

.cta__buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 0.85rem 2.2rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.22s ease;
}

.btn--primary {
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
  color: #fff;
  box-shadow: 0 4px 20px rgba(124,58,237,0.35);
}
.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 35px rgba(124,58,237,0.5);
}

.btn--outline {
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(167,139,250,0.3);
}
.btn--outline:hover {
  border-color: rgba(167,139,250,0.6);
  color: #fff;
  background: rgba(124,58,237,0.08);
}
</style>
