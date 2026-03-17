import { appendFile, mkdir, readFile } from "node:fs/promises"
import path from "node:path"
import type { Plan } from "./plans"

export type LicenseStatus = "active" | "grace" | "expired" | "revoked"
export type IssuedReason =
  | "new_sale"
  | "renewal"
  | "upgrade"
  | "downgrade"
  | "replacement"

export type LicenseRecord = {
  license_id: string
  customer_email: string
  customer_name: string | null
  stripe_customer_id: string
  subscription_id: string
  plan: Plan
  entitlement_status: LicenseStatus
  valid_from: string
  valid_until: string
  issued_at: string
  last_stripe_event_id: string
  key_id: string
  issued_reason: IssuedReason
  delivery_sent_at: string | null
  github_access_granted: false
}

function getStorePath(): string {
  return process.env.LICENSE_STORE_PATH
    ? path.resolve(process.env.LICENSE_STORE_PATH)
    : path.join(process.cwd(), ".data", "acme_licenses.ndjson")
}

async function ensureDir(filePath: string): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true })
}

async function readAllRecords(): Promise<LicenseRecord[]> {
  const storePath = getStorePath()
  try {
    const raw = await readFile(storePath, "utf8")
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as LicenseRecord
        } catch {
          return null
        }
      })
      .filter((r): r is LicenseRecord => r !== null)
  } catch {
    return []
  }
}

async function appendRecord(record: LicenseRecord): Promise<void> {
  const storePath = getStorePath()
  await ensureDir(storePath)
  await appendFile(storePath, `${JSON.stringify(record)}\n`, "utf8")
}

/**
 * Upsert strategy: append new record (old lines remain for audit trail).
 * When reading, the last matching record wins.
 */
export async function upsertLicenseRecord(record: LicenseRecord): Promise<void> {
  await appendRecord(record)
}

/**
 * Returns the most recent license record for a given subscription ID, or null.
 */
export async function getLicenseBySubscriptionId(
  subscriptionId: string
): Promise<LicenseRecord | null> {
  const records = await readAllRecords()
  // Last match wins (append-log semantics)
  const matches = records.filter((r) => r.subscription_id === subscriptionId)
  return matches.length > 0 ? matches[matches.length - 1] : null
}

/**
 * Returns the most recent license record for a given license ID, or null.
 */
export async function getLicenseByLicenseId(
  licenseId: string
): Promise<LicenseRecord | null> {
  const records = await readAllRecords()
  const matches = records.filter((r) => r.license_id === licenseId)
  return matches.length > 0 ? matches[matches.length - 1] : null
}
