<template>
  <div class="health-page">
    <TheNavbar />

    <main class="health-main">
      <div class="health-inner">
        <!-- Header -->
        <div class="health-header">
          <h1 class="health-title">Platform Health Status</h1>
          <div class="health-meta">
            <span v-if="lastCheckedAt" class="health-timestamp">
              Last checked: {{ formatTime(lastCheckedAt) }}
            </span>
            <span v-else-if="loading" class="health-timestamp">Checking…</span>
            <button class="refresh-btn" :disabled="loading" @click="refresh">
              <span :class="{ 'spin': loading }">↻</span>
              Refresh
            </button>
          </div>
        </div>

        <!-- Error banner -->
        <div v-if="error" class="error-banner">
          ⚠ {{ error }}
          <span v-if="data"> — showing last known status.</span>
        </div>

        <!-- Loading skeleton (first load only) -->
        <div v-if="loading && !data" class="skeleton-wrapper">
          <div v-for="n in 7" :key="n" class="skeleton-row"></div>
        </div>

        <!-- Status content -->
        <template v-if="data">
          <!-- Overall status -->
          <div class="overall-card" :class="`overall-card--${data.status}`">
            <StatusBadge :status="data.status" class="overall-badge" />
            <span class="overall-label">Overall Platform Status</span>
          </div>

          <!-- Core services -->
          <div class="services-section">
            <h2 class="services-section__title">Core Services</h2>
            <div class="services-table">

              <div class="service-row">
                <span class="service-name">API</span>
                <StatusBadge :status="data.services.api.status" />
                <span class="service-meta"></span>
              </div>

              <div class="service-row">
                <span class="service-name">Database</span>
                <StatusBadge :status="data.services.database.status" />
                <span class="service-meta">
                  <template v-if="data.services.database.response_ms != null">
                    {{ data.services.database.response_ms }} ms
                  </template>
                </span>
              </div>

            </div>
          </div>

          <!-- Financial Operation Service -->
          <div class="services-section">
            <h2 class="services-section__title">Financial Operation Service</h2>
            <div class="services-table">
              <div
                v-for="(svc, key) in finops"
                :key="key"
                class="service-row"
              >
                <span class="service-name">{{ serviceLabels[key] || key }}</span>
                <StatusBadge :status="svc.status" />
                <span class="service-meta">
                  <template v-if="svc.age_seconds != null">
                    last beat: {{ svc.age_seconds }}s ago
                  </template>
                  <template v-else>
                    no heartbeat
                  </template>
                </span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TheNavbar   from '@/components/TheNavbar.vue'
import TheFooter   from '@/components/TheFooter.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import { useHealthStatus } from '@/composables/useHealthStatus.js'

const { data, loading, error, lastCheckedAt, refresh } = useHealthStatus()

const finops = computed(() => data.value?.services?.financial_operations || {})

const serviceLabels = {
  rate_service:            'Rate Provider',
  payment_monitor_service: 'Payment Monitor Service',
  payout_service:          'Payout Service',
  report_service:          'Report Service',
  webhook_service:         'Webhook Service',
}

function formatTime(date) {
  if (!date) return ''
  return date.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }) + ' (local)'
}
</script>

<style scoped>
.health-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.health-main {
  flex: 1;
  padding: 3rem 1.5rem 5rem;
}

.health-inner {
  max-width: 760px;
  margin: 0 auto;
}

.health-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.health-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
}

.health-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.health-timestamp {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.4);
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.75);
  font-size: 0.82rem;
  padding: 0.35rem 0.85rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.refresh-btn:hover:not(:disabled) {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

.refresh-btn:disabled {
  opacity: 0.4;
  cursor: default;
}

.spin {
  display: inline-block;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Error banner */
.error-banner {
  background: rgba(239,68,68,0.1);
  border: 1px solid rgba(239,68,68,0.3);
  color: #fca5a5;
  font-size: 0.88rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

/* Skeleton */
.skeleton-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.skeleton-row {
  height: 44px;
  background: rgba(255,255,255,0.05);
  border-radius: 8px;
  animation: pulse 1.4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

/* Overall card */
.overall-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.08);
  margin-bottom: 2rem;
  background: rgba(255,255,255,0.03);
}

.overall-card--healthy  { border-color: rgba(34,197,94,0.3);  background: rgba(34,197,94,0.06); }
.overall-card--degraded { border-color: rgba(245,158,11,0.3); background: rgba(245,158,11,0.06); }
.overall-card--down     { border-color: rgba(239,68,68,0.3);  background: rgba(239,68,68,0.06); }

.overall-badge {
  flex-shrink: 0;
}

.overall-label {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
}

/* Services section */
.services-section {
  margin-bottom: 2.25rem;
}

.services-section__title {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin: 0 0 0.75rem;
}

.services-table {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.service-row {
  display: grid;
  grid-template-columns: 1fr auto 180px;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px;
  transition: background 0.15s;
}

.service-row:hover {
  background: rgba(255,255,255,0.05);
}

.service-name {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.8);
}

.service-meta {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.35);
  text-align: right;
}

.service-meta__muted {
  color: rgba(255,255,255,0.2);
}

@media (max-width: 560px) {
  .service-row {
    grid-template-columns: 1fr auto;
  }

  .service-meta {
    display: none;
  }
}
</style>
