import { appendFile, mkdir } from "node:fs/promises"
import path from "node:path"

export type LicenseAlert = {
  customer_email: string
  plan: string
  license_id: string
  subscription_id: string
  entitlement_status: string
  event_id: string
  timestamp: string
}

function getAlertPath(): string {
  return path.join(process.cwd(), ".data", "acme_license_alerts.ndjson")
}

async function ensureDir(filePath: string): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true })
}

async function appendJsonLine(filePath: string, payload: unknown): Promise<void> {
  await ensureDir(filePath)
  await appendFile(filePath, `${JSON.stringify(payload)}\n`, "utf8")
}

export async function sendLicenseAlert(payload: LicenseAlert): Promise<void> {
  // Do NOT include signature, private key, or full license attachment in alerts
  const safe: LicenseAlert = {
    customer_email: payload.customer_email,
    plan: payload.plan,
    license_id: payload.license_id,
    subscription_id: payload.subscription_id,
    entitlement_status: payload.entitlement_status,
    event_id: payload.event_id,
    timestamp: payload.timestamp,
  }

  const webhookUrl = process.env.ACME_LICENSE_ALERT_WEBHOOK_URL
  if (!webhookUrl) {
    await appendJsonLine(getAlertPath(), safe)
    return
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(safe),
    })
    if (!response.ok) {
      await appendJsonLine(getAlertPath(), safe)
    }
  } catch {
    await appendJsonLine(getAlertPath(), safe)
  }
}
