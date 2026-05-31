<template>
  <span class="badge" :class="`badge--${status}`">
    <span class="badge__dot"></span>
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    default: 'unknown',
    validator: (v) => ['healthy', 'degraded', 'down', 'unknown'].includes(v),
  },
})

const labels = {
  healthy:  'Healthy',
  degraded: 'Degraded',
  down:     'Down',
  unknown:  'Unknown',
}

const label = computed(() => labels[props.status] ?? 'Unknown')
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
}

.badge__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* healthy */
.badge--healthy {
  color: #22c55e;
  background: rgba(34,197,94,0.12);
}
.badge--healthy .badge__dot {
  background: #22c55e;
  box-shadow: 0 0 0 2px rgba(34,197,94,0.25);
}

/* degraded */
.badge--degraded {
  color: #f59e0b;
  background: rgba(245,158,11,0.12);
}
.badge--degraded .badge__dot {
  background: #f59e0b;
  box-shadow: 0 0 0 2px rgba(245,158,11,0.25);
}

/* down */
.badge--down {
  color: #ef4444;
  background: rgba(239,68,68,0.12);
}
.badge--down .badge__dot {
  background: #ef4444;
  box-shadow: 0 0 0 2px rgba(239,68,68,0.25);
}

/* unknown */
.badge--unknown {
  color: rgba(255,255,255,0.4);
  background: rgba(255,255,255,0.06);
}
.badge--unknown .badge__dot {
  background: rgba(255,255,255,0.3);
}
</style>
