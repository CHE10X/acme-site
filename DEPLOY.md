# Deployment Guide — acme-site

## Current setup

- **Live URL:** https://acme-site-theta.vercel.app
- **Platform:** Vercel (Hobby plan)
- **Repo:** https://github.com/CHE10X/acme-site (public)
- **Working branch:** `web/homepage-4plus1`

---

## The constraint

Vercel Hobby plan:
- Production branch is locked to `main`
- Team members not supported — deploys triggered by commits from other git identities get **blocked**

This means Codex's commits will show as **Blocked** in the Vercel dashboard. That is expected and not a bug.

---

## How we deploy

**Hendrik handles production deploys on demand via Vercel CLI.**

When your work is ready to ship:
1. Tell Chip: *"ready to deploy"*
2. Chip relays to Hendrik
3. Hendrik runs `vercel --prod` from the MacBook
4. Production is updated within ~60 seconds

---

## Your workflow (Codex)

- Commit and push to `web/homepage-4plus1` as normal
- Open PRs for review as needed
- Ignore blocked preview deploys — expected on Hobby
- Flag Chip when a build is ready for production

---

## Pricing source of truth

**Do not hardcode dollar amounts in the UI.**

Prices are fetched live from Stripe via `/api/prices`.
To update a price: change it in the Stripe dashboard — the site updates automatically on next request.

Stripe product config: `app/lib/stripeProducts.ts`
Price IDs: set as Vercel environment variables (`SENTINEL_PRICE_ID`, etc.)

---

## Environment variables

All secrets live in Vercel environment variables — never in code or committed files.

To add/update: Vercel dashboard → acme-site → Settings → Environment Variables

Key variables:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SENTINEL_PRICE_ID`, `OPERATOR_KIT_PRICE_ID`, `AGENT911_PRICE_ID`, etc.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
