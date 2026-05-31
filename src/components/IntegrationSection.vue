<template>
  <section id="integration" class="section integration">
    <div class="section__inner">
      <h2 class="section__title">Integrate in minutes</h2>
      <p class="section__sub">Five steps from sign-up to accepting crypto payments.</p>

      <div class="integration__layout">
        <ol class="integration__steps">
          <li v-for="(step, i) in steps" :key="i" class="integration__step">
            <div class="integration__step-num">{{ i + 1 }}</div>
            <div>
              <h3 class="integration__step-title">{{ step.title }}</h3>
              <p class="integration__step-desc">{{ step.description }}</p>
            </div>
          </li>
        </ol>

        <div class="integration__code-block">
          <div class="code-header">
            <span class="code-lang">POST /v1/payments</span>
            <span class="code-note">Create a payment</span>
          </div>
          <pre class="code-body"><code>{{ codeExample }}</code></pre>

          <div class="code-response-label">Response</div>
          <pre class="code-body code-body--response"><code>{{ responseExample }}</code></pre>
        </div>
      </div>

      <p class="integration__docs-link">
        Full API reference and SDK examples →
        <a :href="docsUrl" target="_blank" rel="noopener">{{ docsUrl || 'docs.tokencashflow.com' }}</a>
      </p>
    </div>
  </section>
</template>

<script setup>
const docsUrl = import.meta.env.VITE_DOCS_URL || ''

const steps = [
  {
    title: 'Register and complete KYC',
    description: 'Sign up as a merchant and submit identity documents for Basic KYC verification.',
  },
  {
    title: 'Create an API key',
    description: 'Generate an API key from your dashboard to authenticate API requests.',
  },
  {
    title: 'POST to /v1/payments',
    description: 'Send the payment amount in USD, a description, and an optional redirect URL.',
  },
  {
    title: 'Share the pay link',
    description: 'Hand the returned pay link to your customer — they choose their crypto and pay.',
  },
  {
    title: 'Receive a webhook on confirmation',
    description: 'Configure your webhook URL to receive signed POST callbacks on every state change.',
  },
]

const codeExample = `curl -X POST https://api.tokencashflow.com/v1/payments \\
  -H "X-API-Key: tcf_live_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount_usd": 99.00,
    "description": "Order #1042",
    "redirect_url": "https://yourstore.com/thank-you"
  }'`

const responseExample = `{
  "id": "pay_01hx...",
  "pay_link": "https://app.tokencashflow.com/pay/01hx...",
  "amount_usd": "99.00",
  "status": "awaiting_selection",
  "expires_at": "2026-05-16T13:00:00Z"
}`
</script>

<style scoped>
.integration {
  padding: 6rem 1.5rem;
  background: rgba(255,255,255,0.015);
}

.section__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.section__title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #fff;
  text-align: center;
  margin: 0 0 0.75rem;
}

.section__sub {
  text-align: center;
  color: rgba(255,255,255,0.55);
  font-size: 1rem;
  margin: 0 0 3.5rem;
}

.integration__layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: start;
}

.integration__steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.integration__step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.integration__step-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(124,58,237,0.2);
  border: 1px solid rgba(124,58,237,0.4);
  color: #a78bfa;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.integration__step-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.25rem;
}

.integration__step-desc {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
  margin: 0;
  line-height: 1.55;
}

.integration__code-block {
  background: #0d0d1a;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  overflow: hidden;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 1rem;
  background: rgba(255,255,255,0.04);
  border-bottom: 1px solid rgba(255,255,255,0.07);
}

.code-lang {
  font-size: 0.78rem;
  font-weight: 600;
  color: #a78bfa;
  font-family: monospace;
}

.code-note {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.35);
}

.code-body {
  margin: 0;
  padding: 1rem;
  font-family: 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.78rem;
  line-height: 1.65;
  color: rgba(255,255,255,0.75);
  overflow-x: auto;
  white-space: pre;
}

.code-response-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  padding: 0.5rem 1rem 0;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.code-body--response {
  color: #6ee7b7;
}

.integration__docs-link {
  margin-top: 2.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.45);
}

.integration__docs-link a {
  color: #a78bfa;
  text-decoration: none;
}

.integration__docs-link a:hover {
  text-decoration: underline;
}

@media (max-width: 900px) {
  .integration__layout {
    grid-template-columns: 1fr;
  }
}
</style>
