import { nextTick } from 'vue'

let gsap = null
let ScrollTrigger = null

async function loadGsap() {
  if (!gsap) {
    const mod = await import('gsap')
    const stMod = await import('gsap/ScrollTrigger')
    gsap = mod.gsap
    ScrollTrigger = stMod.ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)
  }
}

/**
 * Animate elements into view on scroll.
 * @param {string} selector  - CSS selector for animated elements
 * @param {object} [opts]    - GSAP overrides
 */
export async function useScrollReveal(selector, opts = {}) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  await loadGsap()
  await nextTick()
  const els = document.querySelectorAll(selector)
  if (!els.length) return
  gsap.from(els, {
    scrollTrigger: { trigger: els[0], start: 'top 88%', once: true },
    y: 36,
    opacity: 0,
    duration: 0.65,
    stagger: 0.1,
    ease: 'power3.out',
    ...opts,
  })
}

export async function useHeroReveal(selector) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  await loadGsap()
  await nextTick()
  const els = document.querySelectorAll(selector)
  if (!els.length) return
  gsap.from(els, {
    y: 60,
    opacity: 0,
    rotateX: -70,
    stagger: 0.03,
    duration: 0.55,
    ease: 'back.out(1.4)',
    delay: 0.25,
  })
}
