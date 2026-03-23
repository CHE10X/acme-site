import { NextResponse } from "next/server";

// Revocation list endpoint for acme-transmission license validation.
// Clients call GET /api/v1/licenses/revoked to check if their license key
// has been revoked before activating.
//
// This is intentionally public (no auth) — the list contains only opaque
// license IDs, not customer data. Keeping it public allows client-side
// validation without requiring API keys in operator environments.
//
// To revoke a license: add its ID to REVOKED_LICENSE_IDS env var
// (comma-separated) in Vercel. Deploy. Takes effect immediately.
//
// Format: REVOKED_LICENSE_IDS=lic_abc123,lic_def456

export const revalidate = 60; // Cache for 60 seconds

function getRevokedList(): string[] {
  const raw = process.env.REVOKED_LICENSE_IDS ?? "";
  if (!raw.trim()) return [];
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter((id) => id.length > 0);
}

export async function GET() {
  const revoked = getRevokedList();

  return NextResponse.json(
    {
      revoked,
      generated_at: new Date().toISOString(),
      count: revoked.length,
    },
    {
      headers: {
        // Allow clients to cache for 60s, revalidate after
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    }
  );
}
