<template>
  <router-view />
</template>

<script setup>
import { watch } from 'vue'
import { useBrand } from '@/composables/useBrand'

const brand = useBrand()

function applyFavicon(url) {
  let link = document.querySelector("link[rel~='icon']")
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.href = url
}

watch(() => brand.faviconUrl, (url) => { if (url) applyFavicon(url) }, { immediate: true })
watch(() => brand.platformName, (name) => { if (name) document.title = name }, { immediate: true })
</script>
