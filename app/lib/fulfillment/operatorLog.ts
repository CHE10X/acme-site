import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { FulfillmentOrderRecord } from "./fulfillmentStore";

function getOperatorLogPath() {
  return process.env.ACME_FULFILLMENT_OPERATOR_LOG_PATH
    ? path.resolve(process.env.ACME_FULFILLMENT_OPERATOR_LOG_PATH)
    : path.join(
        process.env.HOME || "/Users/AGENT",
        ".openclaw",
        "workspace",
        "acme-site",
        ".logs",
        "acme_fulfillment.log"
      );
}

async function appendLine(payload: string) {
  await mkdir(path.dirname(getOperatorLogPath()), { recursive: true });
  await appendFile(getOperatorLogPath(), `${payload}\n`, "utf8");
}

export async function writeOperatorLog(order: FulfillmentOrderRecord, status: string) {
  try {
    const payload = `${new Date().toISOString()} ${order.stripe_session_id} ${order.product_sku} ${status}`;
    await appendLine(payload);
  } catch {
    // operator logging is intentionally fail-safe
  }
}
