import { NextResponse } from 'next/server';

// Served by: curl -fsSL https://acmeagentsupply.com/install/triage | bash
// Delegates to the public octriageunit installer in acmeagentsupply/triage.

const INSTALL_SCRIPT = `#!/usr/bin/env bash
# Triage — installer
# https://acmeagentsupply.com/install/triage
#
# Usage:
#   curl -fsSL https://acmeagentsupply.com/install/triage | bash
#   curl -fsSL https://acmeagentsupply.com/install/triage | bash -s -- --user
#
# Installs the Triage diagnostic tool for OpenClaw operators.
# Requires: git, bash. Safe: read-only tool, no telemetry, no service restarts.

set -euo pipefail

REPO="https://github.com/acmeagentsupply/triage.git"
TMPDIR_BASE="\${TMPDIR:-/tmp}"
WORK="\$(mktemp -d "\${TMPDIR_BASE}/triage-install.XXXXXX")"

cleanup() { rm -rf "\$WORK"; }
trap cleanup EXIT

printf '\\n\\033[1mTriage — ACME Agent Supply\\033[0m\\n'
printf '  Source: %s\\n\\n' "\$REPO"

git clone --depth 1 --quiet "\$REPO" "\$WORK/repo"

bash "\$WORK/repo/scripts/install.sh" "\$@"
`;

export async function GET() {
  return new NextResponse(INSTALL_SCRIPT, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
