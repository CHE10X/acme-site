# CODEX — Contributor Notes for acme-site

> Read this before touching anything. It will save you pain.

---

## 🚫 HARD DO-NOT-TOUCH LIST

These files are owned by Chip directly. Any edits will cause conflicts and data loss.

| Path | Reason |
|------|--------|
| `legal/privacy-policy.md` | Finalized legal doc — Chip edits directly |
| `legal/ terms-of-service.md` | Finalized legal doc — note: leading space in filename (GitHub rename artifact, do not fix) |
| `app/legal/**` | Legal page routes — only touch if Chip explicitly requests |

---

## ⚠️ KNOWN QUIRKS

### Filename with leading space
`legal/ terms-of-service.md` has a leading space in the filename. This is a GitHub web UI artifact from a rename. **Do not rename it.** The page at `app/legal/terms/page.tsx` handles it with an `fs.existsSync` fallback.

### `--webpack` flag is BANNED
**Never add `--webpack` to any build script.** It breaks Next.js 16 static export. This was the cause of GP-WEB-BUILD-001. The fix is committed at `bdbdc9e`.

### `output: "export"` is intentional
`next.config.ts` has `output: "export"` — this is correct. The site is a static export deployed via Vercel. Do not remove it.

### GitHub Pages is blocked
The `CHE10X/acme-site` repo is private. GitHub Pages is not available. **Do not add or modify `.github/workflows/deploy-pages.yml`.** Deployment is via Vercel (auto-deploy on push to `main`).

---

## ✅ SAFE TO TOUCH

- `app/` — pages and components (except `app/legal/**` — see above)
- `content/docs/` — markdown docs rendered at `/docs/[...slug]`
- `public/` — static assets
- `components/` — shared UI components
- `app/globals.css` — styling (but confirm with Chip before major changes)

---

## 🏗️ ARCHITECTURE

- **Framework:** Next.js 16, App Router, static export (`output: "export"`)
- **Styling:** Tailwind v4 + custom CSS in `app/globals.css`
- **Markdown rendering:** `marked` (installed)
- **Deployment:** Vercel, auto-deploy from `main` branch
- **Live URL:** `acme-site-lilac.vercel.app`
- **Legal URLs:**
  - `/legal/terms` → reads `legal/ terms-of-service.md`
  - `/legal/privacy` → reads `legal/privacy-policy.md`

---

## 🌿 BRANCH DISCIPLINE

| Branch | Purpose |
|--------|---------|
| `main` | Production — auto-deploys to Vercel |
| `web/homepage-4plus1` | Active homepage dev branch |
| `chore/publish-legal-via-github-pages` | **ABANDONED** — do not merge, do not base work on it |

---

## 📋 BUILD VERIFICATION

Before pushing to `main`, always verify:

```bash
npm run build
# Should show /legal/terms and /legal/privacy in route list
# Should show no errors
ls out/legal/
```

---

*Last updated: 2026-03-02 by Hendrik (OpenClaw agent)*
