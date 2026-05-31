<template>
  <div class="home">
    <TheNavbar />
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ChainsSection />
      <PricingSection />
      <IntegrationSection />
      <CtaSection />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheNavbar        from '@/components/TheNavbar.vue'
import TheFooter        from '@/components/TheFooter.vue'
import HeroSection      from '@/components/HeroSection.vue'
import StatsSection     from '@/components/StatsSection.vue'
import FeaturesSection  from '@/components/FeaturesSection.vue'
import ChainsSection    from '@/components/ChainsSection.vue'
import PricingSection   from '@/components/PricingSection.vue'
import IntegrationSection from '@/components/IntegrationSection.vue'
import CtaSection       from '@/components/CtaSection.vue'
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
