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

**Stripe is canonical. Do not hardcode dollar amounts in the UI.**

### Architecture

```
Stripe dashboard (prices + product metadata)
        ↓
node scripts/stripe_export_catalog.mjs
        ↓
content/stripe/catalog.json  ← committed to repo
        ↓
app/pricing/page.tsx  (reads catalog.json by tier)
```

### Regenerate catalog after any Stripe change

```bash
node --env-file=.env.local scripts/stripe_export_catalog.mjs
git add content/stripe/catalog.json
git commit -m "chore: regenerate Stripe catalog"
```

Then tell Hendrik to deploy.

### Required Stripe Product metadata (set in dashboard)

| Product | `productKey` | `tier` | `sortOrder` | `badge` |
|---|---|---|---|---|
| RadCheck | `radcheck` | `free` | `10` | |
| Sentinel | `sentinel` | `attach` | `20` | `MOST_POPULAR` |
| Operator Bundle | `operator-kit` | `bundle` | `30` | `MOST_COMMON_LOADOUT` |
| SphinxGate | `sphinxgate` | `module` | `40` | |
| DriftGuard | `driftguard` | `module` | `50` | |
| Transmission | `transmission` | `module` | `60` | |
| WatchDog | `watchdog` | `module` | `70` | |
| Lazarus | `lazarus` | `free` | `80` | |
| Agent911 | `agent911` | `premium` | `90` | |
| FindMyAgent | `findmyagent` | `module` | `95` | |

### Canonical price amounts (verify in Stripe)

| Product | Amount |
|---|---|
| Sentinel | $5/month |
| Operator Kit | $5/month |
| Modules (sphinxgate, driftguard, transmission, watchdog, findmyagent) | $1/month |
| Agent911 | $19/month |
| Free (radcheck, lazarus) | $0 |

### For Codex — /pricing page task

Update `app/pricing/page.tsx` to:
1. Import `catalog.json` statically: `import catalog from "@/content/stripe/catalog.json"`
2. Remove all hardcoded price constants
3. Render sections by tier:
   - **Free Surface:** `tier=free`
   - **Standard Issue Modules:** `tier=attach` (Sentinel first) + `tier=module`
   - **Operator Kit:** `tier=bundle` (featured card)
   - **Premium band:** `tier=premium` (Agent911)
4. Show dev-only warning if `catalog.mode === "test"` (only in `NODE_ENV=development`)
5. Use `badge` field for MOST_POPULAR / MOST_COMMON_LOADOUT labels

### Stripe product config

`app/lib/stripeProducts.ts` — product/entitlement map
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
