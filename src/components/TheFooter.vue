<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <div class="footer__logo-row">
          <img v-if="brand.logoUrl || brand.darkLogoUrl" :src="brand.darkLogoUrl || brand.logoUrl" class="footer__logo-img" alt="Logo" />
          <svg v-else class="footer__logo-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="32" height="32" rx="7" fill="#6366f1"/>
            <text x="16" y="21.5" text-anchor="middle" fill="white" font-size="11" font-weight="800" font-family="ui-sans-serif,system-ui,sans-serif" letter-spacing="-0.3">TCF</text>
          </svg>
          <span class="footer__logo-text">{{ brand.platformName }}</span>
        </div>
        <p class="footer__tagline">Multi-chain crypto payments, simplified.</p>
      </div>

      <nav class="footer__links">
        <a :href="docsUrl" target="_blank" rel="noopener">Documentation</a>
        <a href="/health">Platform Status</a>
        <a :href="`${portalUrl}/register`">Sign Up</a>
        <a :href="`${portalUrl}/login`">Sign In</a>
      </nav>
    </div>

    <p class="footer__copyright">
      &copy; {{ year }} TokenCashFlow. All rights reserved.
    </p>
  </footer>
</template>

<script setup>
import { useBrand } from '@/composables/useBrand'
const brand = useBrand()
const portalUrl = import.meta.env.VITE_CLIENT_PORTAL_URL || ''
const docsUrl   = import.meta.env.VITE_DOCS_URL || ''
const year      = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: #0a0a14;
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 3rem 1.5rem 2rem;
  color: rgba(255,255,255,0.55);
}

.footer__inner {
  max-width: 1200px;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer__brand {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer__logo-row {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.footer__logo-img {
  height: 1.75rem;
  width: auto;
  object-fit: contain;
  border-radius: 3px;
}
.footer__logo-svg {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 7px;
  margin-right: 0.35rem;
}

.footer__logo-text {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
}

.footer__tagline {
  font-size: 0.85rem;
  margin: 0;
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer__links a {
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.footer__links a:hover {
  color: #fff;
}

.footer__copyright {
  max-width: 1200px;
  margin: 0 auto;
  font-size: 0.8rem;
  text-align: center;
}
</style>
