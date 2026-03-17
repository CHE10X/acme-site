import type { LicenseFile } from "./signer"

const DEFAULT_FROM_EMAIL = "licenses@acmeagentsupply.co"
const DEFAULT_FROM_NAME = "Acme Agent Supply"

type DeliveryResult = {
  success: boolean
  error?: string
}

function buildEmailText(customerEmail: string, plan: string): string {
  const planDisplay = plan.charAt(0).toUpperCase() + plan.slice(1)
  return [
    `Your Acme ${planDisplay} license is attached to this email as license.json.`,
    "",
    "To activate:",
    "1. Save the attached license.json to your machine.",
    "2. Set the ACME_LICENSE_PATH environment variable to point to it, or place it in the default location (~/.acme/license.json).",
    "3. The software will validate it automatically on startup.",
    "",
    "Your license includes offline verification — no internet connection required at runtime.",
    "",
    "If you have any questions, reply to this email.",
    "",
    "— Acme Agent Supply",
  ].join("\n")
}

function buildEmailHtml(customerEmail: string, plan: string): string {
  const planDisplay = plan.charAt(0).toUpperCase() + plan.slice(1)
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111;">
  <h2 style="margin-bottom: 8px;">Your Acme ${planDisplay} License</h2>
  <p>Your license is attached to this email as <code>license.json</code>.</p>
  <h3>To activate:</h3>
  <ol>
    <li>Save the attached <code>license.json</code> to your machine.</li>
    <li>Set the <code>ACME_LICENSE_PATH</code> environment variable to point to it,<br>or place it in the default location: <code>~/.acme/license.json</code>.</li>
    <li>The software will validate it automatically on startup.</li>
  </ol>
  <p>Your license includes offline verification — no internet connection required at runtime.</p>
  <p>If you have any questions, reply to this email.</p>
  <p style="color: #666; font-size: 14px;">— Acme Agent Supply</p>
</body>
</html>
`.trim()
}

/**
 * Delivers a signed license file to the customer via SendGrid.
 *
 * Delivery failures are non-fatal — always returns a result object.
 * Never throws.
 */
export async function deliverLicense(
  to: string,
  licenseFile: LicenseFile,
  plan: string
): Promise<DeliveryResult> {
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey) {
    console.warn("[license/delivery] SENDGRID_API_KEY not configured — skipping email delivery")
    return { success: false, error: "SENDGRID_API_KEY not configured" }
  }

  const fromEmail = process.env.ACME_LICENSE_FROM_EMAIL ?? DEFAULT_FROM_EMAIL
  const fromName = process.env.ACME_LICENSE_FROM_NAME ?? DEFAULT_FROM_NAME
  const planDisplay = plan.charAt(0).toUpperCase() + plan.slice(1)

  // Never log the full license payload or signature
  const licenseJson = JSON.stringify(licenseFile, null, 2)
  const licenseB64 = Buffer.from(licenseJson, "utf8").toString("base64")

  const payload = {
    personalizations: [{ to: [{ email: to }] }],
    from: { email: fromEmail, name: fromName },
    subject: `Your Acme ${planDisplay} License`,
    content: [
      { type: "text/plain", value: buildEmailText(to, plan) },
      { type: "text/html", value: buildEmailHtml(to, plan) },
    ],
    attachments: [
      {
        content: licenseB64,
        type: "application/json",
        filename: "license.json",
        disposition: "attachment",
      },
    ],
  }

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (response.status === 202) {
      return { success: true }
    }

    let errorDetail = `HTTP ${response.status}`
    try {
      const body = (await response.json()) as { errors?: Array<{ message: string }> }
      errorDetail = body.errors?.[0]?.message ?? errorDetail
    } catch {
      // ignore parse failure
    }

    return { success: false, error: errorDetail }
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown delivery error"
    return { success: false, error: message }
  }
}
