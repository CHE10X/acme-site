import crypto from "node:crypto"
import { buildSignedLicense, getKeyId, type LicenseFile } from "./signer"
import { getFeaturesForPlan, inferPlanFromSubscription, type Plan } from "./plans"
import { type LicenseRecord, type IssuedReason } from "./store"

const DEFAULT_GRACE_DAYS = 7

function getGraceDays(): number {
  const val = parseInt(process.env.LICENSE_GRACE_DAYS ?? "", 10)
  return Number.isFinite(val) && val >= 0 ? val : DEFAULT_GRACE_DAYS
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setUTCDate(result.getUTCDate() + days)
  return result
}

type GenerateLicenseInput = {
  /** Existing license_id to preserve (for renewals). If null, a new UUID is generated. */
  licenseId: string | null
  customerEmail: string
  customerName: string | null
  stripeCustomerId: string
  subscriptionId: string
  plan: Plan
  validFrom: Date
  /** Stripe subscription period_end — grace window is added on top. */
  periodEnd: Date
  issuedReason: IssuedReason
  stripeEventId: string
}

export type GeneratedLicense = {
  record: LicenseRecord
  file: LicenseFile
}

/**
 * Generates a signed license file and corresponding entitlement record.
 *
 * Signing procedure (Arch/Ops spec):
 * 1. Build base payload (no sig, no digest)
 * 2. Compute integrity_digest = SHA256(canonical_base)
 * 3. Build payload-with-digest (no sig)
 * 4. Sign payload-with-digest with Ed25519
 */
export function generateLicense(input: GenerateLicenseInput): GeneratedLicense {
  const licenseId = input.licenseId ?? crypto.randomUUID()
  const keyId = getKeyId()
  const graceDays = getGraceDays()
  const validUntil = addDays(input.periodEnd, graceDays)
  const issuedAt = new Date().toISOString()

  const features = getFeaturesForPlan(input.plan)

  const base = {
    license_id: licenseId,
    customer: input.customerName,
    customer_email: input.customerEmail,
    plan: input.plan,
    valid_from: input.validFrom.toISOString(),
    valid_until: validUntil.toISOString(),
    issued_at: issuedAt,
    issued_reason: input.issuedReason,
    features,
    subscription_id: input.subscriptionId,
    key_id: keyId,
  }

  const file = buildSignedLicense(base)

  const record: LicenseRecord = {
    license_id: licenseId,
    customer_email: input.customerEmail,
    customer_name: input.customerName,
    stripe_customer_id: input.stripeCustomerId,
    subscription_id: input.subscriptionId,
    plan: input.plan,
    entitlement_status: "active",
    valid_from: base.valid_from,
    valid_until: file.valid_until,
    issued_at: issuedAt,
    last_stripe_event_id: input.stripeEventId,
    key_id: keyId,
    issued_reason: input.issuedReason,
    delivery_sent_at: null,
    github_access_granted: false,
  }

  return { record, file }
}

/**
 * Determines the IssuedReason by comparing the new plan to any existing license.
 */
export function resolveIssuedReason(
  newPlan: Plan,
  existingRecord: LicenseRecord | null
): IssuedReason {
  if (!existingRecord) return "new_sale"

  const planRank: Record<Plan, number> = { community: 0, operator: 1, enterprise: 2 }
  const existingRank = planRank[existingRecord.plan] ?? 0
  const newRank = planRank[newPlan] ?? 0

  if (newRank > existingRank) return "upgrade"
  if (newRank < existingRank) return "downgrade"
  return "renewal"
}

/**
 * Infers the plan from a Stripe invoice object.
 * Falls back to subscription-level inference if invoice doesn't have explicit metadata.
 */
export function inferPlanFromInvoice(
  invoice: Record<string, unknown>,
  subscription: Record<string, unknown> | null
): Plan {
  // Try invoice metadata first
  const metadata = invoice.metadata as Record<string, unknown> | null
  if (metadata?.plan && typeof metadata.plan === "string") {
    const p = metadata.plan.toLowerCase()
    if (p === "enterprise") return "enterprise"
    if (p === "operator") return "operator"
    if (p === "community") return "community"
  }

  // Fall back to subscription-level inference
  if (subscription) {
    return inferPlanFromSubscription(subscription)
  }

  return "community"
}
