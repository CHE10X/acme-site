import fs from "node:fs";
import path from "node:path";

type CatalogProduct = {
  productKey?: string;
  priceId?: string;
};

type CatalogShape = {
  products?: CatalogProduct[];
};

function normalizeProductKey(value: string) {
  return value.trim().toLowerCase();
}

export function getCatalogPriceId(productKey: string): string | null {
  try {
    const catalogPath = path.join(process.cwd(), "content/stripe/catalog.json");
    const raw = fs.readFileSync(catalogPath, "utf8");
    const parsed = JSON.parse(raw) as CatalogShape;
    const normalized = normalizeProductKey(productKey);
    const match = (parsed.products ?? []).find((item) => {
      const key = item.productKey ? normalizeProductKey(item.productKey) : "";
      return key === normalized;
    });
    return match?.priceId ?? null;
  } catch {
    return null;
  }
}
