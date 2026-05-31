/**
 * useHealthStatus — composable for fetching and polling GET /health.
 *
 * Exposes:
 *   data          Ref<HealthResponse|null>  — last successful response
 *   loading       Ref<boolean>              — true during a fetch in-flight
 *   error         Ref<string|null>          — error message from last failed fetch
 *   lastCheckedAt Ref<Date|null>            — timestamp of last successful fetch
 *   refresh()     function                  — trigger immediate re-fetch
 */

import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

const POLL_INTERVAL_MS = 30_000
const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

export function useHealthStatus() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const lastCheckedAt = ref(null)

  let pollTimer = null

  async function fetchHealth() {
    loading.value = true
    error.value = null
    try {
      const resp = await axios.get(`${API_BASE}/health`, { timeout: 8000 })
      // /health is excluded from the envelope middleware, so data is raw
      data.value = resp.data
      lastCheckedAt.value = new Date()
    } catch (err) {
      const errData = err?.response?.data
      const msg = errData?.error?.message || errData?.detail || err?.message || 'Unknown error'
      error.value = `Unable to reach API: ${msg}`
    } finally {
      loading.value = false
    }
  }

  function refresh() {
    clearInterval(pollTimer)
    fetchHealth()
    pollTimer = setInterval(fetchHealth, POLL_INTERVAL_MS)
  }

  onMounted(() => {
    fetchHealth()
    pollTimer = setInterval(fetchHealth, POLL_INTERVAL_MS)
  })

  onUnmounted(() => {
    clearInterval(pollTimer)
  })

  return { data, loading, error, lastCheckedAt, refresh }
}
