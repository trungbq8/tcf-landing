import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

const _api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
})

// Shared singleton state so all components share one fetch
const logoUrl = ref(null)
const darkLogoUrl = ref(null)
const faviconUrl = ref(null)
const platformName = ref('TokenCashFlow')
const _loaded = ref(false)

async function _load() {
  if (_loaded.value) return
  _loaded.value = true
  try {
    const res = await _api.get('/v1/brand')
    // Unwrap TCF response envelope if present
    const data = res.data?.data ?? res.data
    logoUrl.value = data.logo_url || null
    darkLogoUrl.value = data.dark_logo_url || null
    faviconUrl.value = data.favicon_url || null
    platformName.value = data.platform_name || 'TokenCashFlow'
  } catch {
    // Non-fatal — keep defaults
  }
}

export function useBrand() {
  onMounted(_load)
  // Use reactive() so nested refs auto-unwrap in templates (brand.logoUrl works without .value)
  return reactive({ logoUrl, darkLogoUrl, faviconUrl, platformName })
}
