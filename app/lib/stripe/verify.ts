import crypto from "node:crypto"

/**
 * Verifies a Stripe webhook signature.
 * Shared utility — used by both the fulfillment webhook and the license webhook.
 */
export function verifyStripeSignature(
  payload: string,
  signatureHeader: string,
  secret: string
): boolean {
  const pairs = signatureHeader.split(",").map((part) => part.split("=", 2))
  const timestamp = pairs.find(([key]) => key === "t")?.[1]
  const signatures = pairs
    .filter(([key]) => key === "v1")
    .map(([, value]) => value)

  if (!timestamp || signatures.length === 0) {
    return false
  }

  const ageSeconds = Math.abs(Date.now() / 1000 - Number(timestamp))
  if (!Number.isFinite(ageSeconds) || ageSeconds > 300) {
    return false
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`)
    .digest("hex")

  return signatures.some((signature) => {
    const expectedBuffer = Buffer.from(expected, "utf8")
    const providedBuffer = Buffer.from(signature, "utf8")
    return (
      expectedBuffer.length === providedBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, providedBuffer)
    )
  })
}
