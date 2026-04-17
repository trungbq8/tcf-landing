# tcf-landing

Marketing landing page for the TokenCashFlow platform.

Built with **Vue 3** + **Vite**. Completely static — no authentication, no API calls (except `/health` proxy).

## Features

- Product overview and feature highlights
- Supported chains and tokens display
- Pricing / fee structure section
- Integration steps / quickstart preview
- Link to documentation (`tcf-docs`)
- Call-to-action to register on the merchant portal
- `/health` page — shows real-time status of all platform services

## Quick Start

See [DEV_ENVIRONMENT_SETUP.md](../DEV_ENVIRONMENT_SETUP.md) for full instructions.

```bash
npm install
cp .env.example .env
npm run dev
```

App available at: http://localhost:5175

## Project Structure

```
src/
├── main.js
├── App.vue
├── router/
├── views/
│   ├── HomeView.vue
│   └── HealthView.vue
└── components/
    ├── HeroSection.vue
    ├── FeaturesSection.vue
    ├── ChainsSection.vue
    ├── PricingSection.vue
    └── CtaSection.vue
```

## Build

```bash
npm run build
```
