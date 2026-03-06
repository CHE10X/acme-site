#!/usr/bin/env node
/**
 * stripe_export_catalog.mjs
 *
 * Fetches active Stripe Products + Prices and writes content/stripe/catalog.json.
 * Run before each deploy or as part of CI.
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_... node scripts/stripe_export_catalog.mjs
 *   # or with .env.local:
 *   node --env-file=.env.local scripts/stripe_export_catalog.mjs
 *
 * Required Stripe Product metadata (set in Stripe dashboard):
 *   metadata.productKey  — e.g. "sentinel"
 *   metadata.tier        — free | attach | module | bundle | premium
 *   metadata.sortOrder   — number controlling grid order
 *   metadata.badge       — MOST_POPULAR | MOST_COMMON_LOADOUT | (empty)
 */

import { writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!SECRET_KEY) {
  console.error("❌  STRIPE_SECRET_KEY is not set.");
  process.exit(1);
}

const MODE = SECRET_KEY.startsWith("sk_live") ? "live" : "test";
console.log(`🔑  Stripe mode: ${MODE}`);

// ── Stripe helpers ─────────────────────────────────────────────────────────────

async function stripeGet(path) {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    headers: { Authorization: `Bearer ${SECRET_KEY}` },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Stripe API error ${res.status} on ${path}: ${err}`);
  }
  return res.json();
}

async function fetchAll(path, params = "") {
  const items = [];
  let url = `${path}?limit=100${params ? "&" + params : ""}`;
  while (url) {
    const page = await stripeGet(url.replace("https://api.stripe.com/v1", ""));
    items.push(...page.data);
    url = page.has_more
      ? `${path}?limit=100${params ? "&" + params : ""}&starting_after=${page.data.at(-1).id}`
      : null;
  }
  return items;
}

// ── Fetch data ─────────────────────────────────────────────────────────────────

console.log("📦  Fetching products...");
const allProducts = await fetchAll("/products", "active=true");

console.log("💰  Fetching prices...");
const allPrices = await fetchAll("/prices", "active=true");

// ── Build catalog ──────────────────────────────────────────────────────────────

const warnings = [];
const catalog = [];

for (const product of allProducts) {
  const meta = product.metadata ?? {};
  const productKey = meta.productKey;

  if (!productKey) {
    warnings.push(`⚠️  Product "${product.name}" (${product.id}) missing metadata.productKey — skipped`);
    continue;
  }

  const tier = meta.tier ?? null;
  const sortOrder = meta.sortOrder ? parseInt(meta.sortOrder, 10) : 999;
  const badge = meta.badge ?? null;

  if (!tier) {
    warnings.push(`⚠️  Product "${productKey}" missing metadata.tier`);
  }

  // Find the monthly recurring price for this product
  // Prefer prices with a matching productKey in metadata; fall back to any monthly price
  const productPrices = allPrices.filter((p) => p.product === product.id);

  const monthlyPrice =
    productPrices.find(
      (p) =>
        p.recurring?.interval === "month" &&
        p.recurring?.interval_count === 1 &&
        p.active
    ) ??
    productPrices.find((p) => p.active && !p.recurring) ?? // one-time
    null;

  if (!monthlyPrice && tier !== "free") {
    warnings.push(`⚠️  Product "${productKey}" has no active monthly price`);
  }

  catalog.push({
    productKey,
    name: product.name,
    description: product.description ?? null,
    tier,
    badge: badge || null,
    sortOrder,
    priceId: monthlyPrice?.id ?? null,
    unitAmount: monthlyPrice?.unit_amount ?? 0,
    currency: monthlyPrice?.currency?.toUpperCase() ?? "USD",
    interval: monthlyPrice?.recurring?.interval ?? null,
    active: product.active,
  });
}

// Sort by sortOrder
catalog.sort((a, b) => a.sortOrder - b.sortOrder);

// ── Output ─────────────────────────────────────────────────────────────────────

const output = {
  generatedAt: new Date().toISOString(),
  mode: MODE,
  productCount: catalog.length,
  products: catalog,
};

const outPath = resolve(ROOT, "content/stripe/catalog.json");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(output, null, 2) + "\n");

console.log(`\n✅  Wrote ${catalog.length} products to content/stripe/catalog.json`);
console.log(`   Mode: ${MODE} | Generated: ${output.generatedAt}`);

if (warnings.length) {
  console.log("\n⚠️  Warnings (add missing metadata in Stripe dashboard):");
  warnings.forEach((w) => console.log("  " + w));
}

// Print summary table
console.log("\n📋  Catalog summary:");
console.log("  sortOrder | productKey       | tier     | priceId           | amount");
console.log("  --------- | ---------------- | -------- | ----------------- | ------");
for (const p of catalog) {
  const amount = p.unitAmount != null ? `$${p.unitAmount / 100}` : "n/a";
  console.log(
    `  ${String(p.sortOrder).padEnd(9)} | ${p.productKey.padEnd(16)} | ${(p.tier ?? "?").padEnd(8)} | ${(p.priceId ?? "none").padEnd(17)} | ${amount}`
  );
}
