<template>
  <header class="navbar" :class="{ 'navbar--scrolled': scrolled }">
    <div class="navbar__inner">
      <a href="/" class="navbar__logo">
        <img v-if="brand.logoUrl || brand.darkLogoUrl" :src="brand.darkLogoUrl || brand.logoUrl" class="navbar__logo-img" alt="Logo" />
        <svg v-else class="navbar__logo-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="32" height="32" rx="7" fill="#6366f1"/>
          <text x="16" y="21.5" text-anchor="middle" fill="white" font-size="11" font-weight="800" font-family="ui-sans-serif,system-ui,sans-serif" letter-spacing="-0.3">TCF</text>
        </svg>
        <span class="navbar__logo-text">{{ brand.platformName }}</span>
      </a>

      <nav class="navbar__links" :class="{ 'navbar__links--open': menuOpen }">
        <a href="/#features" @click="closeMenu">Features</a>
        <a href="/#chains" @click="closeMenu">Chains</a>
        <a href="/#pricing" @click="closeMenu">Pricing</a>
        <a href="/#integration" @click="closeMenu">Integration</a>
        <a :href="docsUrl" target="_blank" rel="noopener" @click="closeMenu">Docs</a>
      </nav>

      <div class="navbar__actions">
        <a :href="`${portalUrl}/login`" class="btn btn--ghost">Sign In</a>
        <a :href="`${portalUrl}/register`" class="btn btn--primary">Get Started</a>
      </div>

      <button class="navbar__hamburger" :aria-expanded="menuOpen" @click="toggleMenu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useBrand } from '@/composables/useBrand'

const brand = useBrand()
const portalUrl = import.meta.env.VITE_CLIENT_PORTAL_URL || ''
const docsUrl   = import.meta.env.VITE_DOCS_URL || ''

const scrolled  = ref(false)
const menuOpen  = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  padding: 0 1.5rem;
  background: transparent;
  transition: background 0.25s, box-shadow 0.25s;
}

.navbar--scrolled {
  background: rgba(8, 8, 18, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 rgba(255,255,255,0.06);
}

.navbar__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 64px;
  gap: 2rem;
}

.navbar__logo-img {
  height: 1.75rem;
  width: auto;
  object-fit: contain;
  border-radius: 3px;
}

.navbar__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.1rem;
  color: #fff;
  flex-shrink: 0;
  letter-spacing: -0.01em;
}

.navbar__logo-svg {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 7px;
}

.navbar__links {
  display: flex;
  gap: 1.75rem;
  margin-left: auto;
}

.navbar__links a {
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  position: relative;
  padding-bottom: 3px;
  transition: color 0.2s;
}
.navbar__links a::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 0; height: 2px;
  background: linear-gradient(90deg, #7c3aed, #a78bfa);
  border-radius: 1px;
  transition: width 0.25s ease;
}
.navbar__links a:hover { color: #fff; }
.navbar__links a:hover::after { width: 100%; }

.navbar__actions {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
}

.btn {
  padding: 0.45rem 1.15rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn--ghost {
  color: rgba(255,255,255,0.8);
  border: 1px solid rgba(255,255,255,0.15);
}
.btn--ghost:hover {
  border-color: rgba(255,255,255,0.4);
  color: #fff;
  background: rgba(255,255,255,0.05);
}

.btn--primary {
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
  color: #fff;
  border: 1px solid rgba(124,58,237,0.4);
  box-shadow: 0 2px 12px rgba(124,58,237,0.25);
}
.btn--primary:hover {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  box-shadow: 0 4px 20px rgba(124,58,237,0.4);
  transform: translateY(-1px);
}

.navbar__hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  margin-left: auto;
}

.navbar__hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: 0.2s;
}

@media (max-width: 768px) {
  .navbar__links {
    display: none;
    position: fixed;
    inset: 64px 0 0 0;
    background: rgba(8, 8, 18, 0.97);
    backdrop-filter: blur(16px);
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem 0;
    gap: 2rem;
    font-size: 1.1rem;
    margin-left: 0;
  }

  .navbar__links--open {
    display: flex;
  }

  .navbar__actions {
    display: none;
  }

  .navbar__hamburger {
    display: flex;
  }
}
</style>
