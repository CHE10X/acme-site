# Acme Site — Launch Checklist
*Tracked daily by site integrity report. Update status inline as items complete.*

---

## 🔴 Blocking (must be done before launch)

### Stripe / Payments
- [ ] Live Stripe keys configured in production env
- [ ] Checkout session creates successfully (live mode test)
- [ ] License webhook endpoint registered in Stripe dashboard (`/api/stripe/license-webhook`)
- [ ] `STRIPE_LICENSE_WEBHOOK_SECRET` configured in prod env
- [ ] `LICENSE_SIGNING_KEY` + `LICENSE_PUBLIC_KEY` generated and configured
- [ ] `SENDGRID_API_KEY` configured for license email delivery

### Docs — Mintlify / Content Completeness
- [ ] RadCheck docs: full install + usage guide (target 500w+)
- [ ] Sentinel docs: full install + usage guide (target 500w+)
- [ ] Agent911 docs: full install + usage guide (target 500w+)
- [ ] DriftGuard docs: stub → real content (currently 40w)
- [ ] Watchdog docs: stub → real content (currently 41w)
- [ ] Transmission docs: stub → real content (currently 29w)
- [ ] ORP docs: stub → real content (currently 29w)
- [ ] Quickstart: expand beyond 5-minute.md (multi-step onboarding flow)
- [ ] Support page: SLA, escalation, contact info complete

### Support Integration (Gerrit / Tawk.to)
- [ ] Tawk.to widget verified loading on `/docs/*` pages (client-side render check)
- [ ] Tawk.to widget verified loading on `/install` page
- [ ] Gerrit Tawk.to invite accepted (currently pending)
- [ ] Gerrit can receive and respond to live chats
- [ ] Support routing confirmed: tawk.to → gerrit@acmeagentsupply.com

### Legal / Compliance
- [ ] Privacy policy page live at `/legal/privacy`
- [ ] Terms of service page live at `/legal/terms`
- [ ] Cookie consent if applicable

---

## 🟡 Pre-launch (ship within first week)

### License Verifier
- [ ] License verifier CLI packaged and downloadable
- [ ] Verification test vectors published (canonical form documented)
- [ ] `verifier.ts` with `invalid_integrity` status code shipped

### Stripe / Payments
- [ ] Admin reconciliation script built (Stripe subscriptions vs license store)
- [ ] `LICENSE_GRACE_DAYS` configured in prod env
- [ ] `ACME_LICENSE_ALERT_WEBHOOK_URL` configured (internal ops alerts)

### Docs
- [ ] SphinxGate docs: complete (currently 150w — near threshold)
- [ ] FindMyAgent docs: complete (currently 168w — near threshold)
- [ ] Lazarus docs: complete (currently 156w — near threshold)
- [ ] Architecture overview page complete (currently 218w)
- [ ] OCTriage docs: complete (currently 67w)
- [ ] llms.txt deployed at root
- [ ] /agent JSON endpoint live (AgentFront)

### GTM
- [ ] Pricing page finalized (currently 308 redirect — confirm page content)
- [ ] Homepage above-the-fold copy reviewed
- [ ] Moltbook announcement post drafted

---

## 🟢 Post-launch backlog

- [ ] HMAC identity verification for Tawk.to widget (deferred from v1)
- [ ] Customer portal for license download/refresh
- [ ] Admin reconciliation cron job (Stripe vs license store)
- [ ] Database migration trigger (when >100 customers)
- [ ] GitHub repo access automation (deferred from license webhook v1)
- [ ] Key rotation system for license signing
- [ ] Callsign beta access gating
- [ ] Commander / Dispatch product pages

---

## ✅ Done

- [x] Acme-site deployed and live at acmeagentsupply.com *(2026-03)*
- [x] Tawk.to widget code deployed to site (`TawkToWidget.tsx`, widget ID `1jja03h8a`) *(2026-03-09)*
- [x] support@acmeagentsupply.com routing to gerrit@acmeagentsupply.com *(2026-03-06)*
- [x] Heike Tawk.to account activated *(2026-03-08)*
- [x] Stripe checkout route live (`/api/checkout`) *(2026-03)*
- [x] License webhook service built (V1 + integrity_digest) *(2026-03-14)*
- [x] Shared Stripe verification utilities (`lib/stripe/verify.ts`, `normalize.ts`) *(2026-03-14)*
- [x] NDJSON entitlement store + idempotency store *(2026-03-14)*
- [x] Ed25519 license signing (Node crypto, no external deps) *(2026-03-14)*
- [x] SendGrid license email delivery *(2026-03-14)*
- [x] Internal license alerts *(2026-03-14)*
