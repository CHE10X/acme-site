import crypto from "node:crypto"

export type LicenseFile = {
  license_id: string
  customer: string | null
  customer_email: string
  plan: string
  valid_from: string
  valid_until: string
  issued_at: string
  issued_reason: string
  features: string[]
  subscription_id: string
  key_id: string
  integrity_digest: string
  signature: string
}

export type LicensePayloadBase = Omit<LicenseFile, "integrity_digest" | "signature">

/**
 * Returns the canonical JSON string of an object with sorted keys.
 * This ensures deterministic output regardless of insertion order.
 */
export function canonicalize(obj: Record<string, unknown>): string {
  const sorted: Record<string, unknown> = {}
  for (const key of Object.keys(obj).sort()) {
    sorted[key] = obj[key]
  }
  return JSON.stringify(sorted)
}

/**
 * Returns the current key ID from env, defaulting to "v1".
 */
export function getKeyId(): string {
  return process.env.LICENSE_KEY_ID ?? "v1"
}

/**
 * Computes the SHA-256 integrity digest of the canonical payload
 * (all fields except signature and integrity_digest).
 */
export function computeIntegrityDigest(
  payloadWithoutSigAndDigest: Record<string, unknown>
): string {
  const canonical = canonicalize(payloadWithoutSigAndDigest)
  return crypto.createHash("sha256").update(canonical, "utf8").digest("hex")
}

/**
 * Signs the canonical license payload (including integrity_digest, excluding signature)
 * using Ed25519.
 *
 * Private key is read from LICENSE_SIGNING_KEY env var (base64-encoded DER or PEM).
 * Never logged. Never written to disk.
 */
export function signLicensePayload(
  payloadWithDigestWithoutSig: Record<string, unknown>
): string {
  const signingKeyB64 = process.env.LICENSE_SIGNING_KEY
  if (!signingKeyB64) {
    throw new Error("LICENSE_SIGNING_KEY is not configured")
  }

  const canonical = canonicalize(payloadWithDigestWithoutSig)

  // Support both raw base64 DER and PEM
  let privateKey: crypto.KeyObject
  try {
    const keyBuffer = Buffer.from(signingKeyB64, "base64")
    // Try DER first (PKCS#8)
    try {
      privateKey = crypto.createPrivateKey({ key: keyBuffer, format: "der", type: "pkcs8" })
    } catch {
      // Fall back to treating as PEM
      const pem = signingKeyB64.includes("-----")
        ? signingKeyB64
        : `-----BEGIN PRIVATE KEY-----\n${signingKeyB64}\n-----END PRIVATE KEY-----`
      privateKey = crypto.createPrivateKey(pem)
    }
  } catch {
    throw new Error("LICENSE_SIGNING_KEY is invalid or could not be parsed")
  }

  const signature = crypto.sign(null, Buffer.from(canonical, "utf8"), privateKey)
  return signature.toString("base64")
}

/**
 * Builds a complete, signed LicenseFile from a base payload.
 *
 * Procedure per Arch/Ops spec:
 * 1. Build canonical payload (base fields, no sig, no digest)
 * 2. Compute integrity_digest = SHA256(canonical_base)
 * 3. Build payload with digest (no sig)
 * 4. Sign payload-with-digest using Ed25519
 * 5. Return complete LicenseFile
 */
export function buildSignedLicense(base: LicensePayloadBase): LicenseFile {
  const baseObj: Record<string, unknown> = { ...base }

  // Step 2: integrity digest over base fields (no sig, no digest)
  const integrity_digest = computeIntegrityDigest(baseObj)

  // Step 3: payload including digest (no sig)
  const payloadWithDigest: Record<string, unknown> = {
    ...baseObj,
    integrity_digest,
  }

  // Step 4: sign
  const signature = signLicensePayload(payloadWithDigest)

  // Step 5: complete file
  return {
    ...base,
    integrity_digest,
    signature,
  }
}

/**
 * Verifies the Ed25519 signature on a license file.
 * Returns false if LICENSE_PUBLIC_KEY is not configured (fails open with a warning).
 */
export function verifyLicenseSignature(licenseFile: LicenseFile): boolean {
  const publicKeyB64 = process.env.LICENSE_PUBLIC_KEY
  if (!publicKeyB64) {
    console.warn("[license] LICENSE_PUBLIC_KEY not configured — skipping signature verification")
    return false
  }

  try {
    const { signature, ...rest } = licenseFile
    const payloadObj = rest as Record<string, unknown>
    const canonical = canonicalize(payloadObj)

    let publicKey: crypto.KeyObject
    const keyBuffer = Buffer.from(publicKeyB64, "base64")
    try {
      publicKey = crypto.createPublicKey({ key: keyBuffer, format: "der", type: "spki" })
    } catch {
      const pem = publicKeyB64.includes("-----")
        ? publicKeyB64
        : `-----BEGIN PUBLIC KEY-----\n${publicKeyB64}\n-----END PUBLIC KEY-----`
      publicKey = crypto.createPublicKey(pem)
    }

    return crypto.verify(
      null,
      Buffer.from(canonical, "utf8"),
      publicKey,
      Buffer.from(signature, "base64")
    )
  } catch {
    return false
  }
}

/**
 * Verifies the integrity_digest of a license file.
 * The digest must match SHA256 of the canonical payload without signature or digest.
 */
export function verifyIntegrityDigest(licenseFile: LicenseFile): boolean {
  const { signature: _sig, integrity_digest: storedDigest, ...rest } = licenseFile
  const expected = computeIntegrityDigest(rest as Record<string, unknown>)
  return expected === storedDigest
}
