import { NextResponse } from 'next/server';

// Served by: curl -fsSL https://acmeagentsupply.com/install/radcheck | bash
// Direct install — no gate, no checkout. Same mechanic as Triage.
// License: ACME Freeware License (https://acmeagentsupply.com/legal/radcheck-license)
// Free to use. Not free to fork or redistribute.

const INSTALL_SCRIPT = `#!/usr/bin/env bash
# =============================================================================
# RadCheck — installer
# ACME Agent Supply — https://acmeagentsupply.com
#
# Usage:
#   curl -fsSL https://acmeagentsupply.com/install/radcheck | bash
#
# Installs the RadCheck reliability scorer for OpenClaw operators.
# Read-only. No agents started. No configurations modified. No telemetry.
#
# License: ACME Freeware License
#   Free to use. Not free to fork or redistribute.
#   https://acmeagentsupply.com/legal/radcheck-license
# =============================================================================

set -euo pipefail

REPO="https://github.com/acmeagentsupply/acme-ops.git"
SCRIPTS_SRC="scripts/radiation"
INSTALL_DIR="\${HOME}/.openclaw/watchdog"
TMPDIR_BASE="\${TMPDIR:-/tmp}"
WORK="\$(mktemp -d "\${TMPDIR_BASE}/radcheck-install.XXXXXX")"

cleanup() { rm -rf "\$WORK"; }
trap cleanup EXIT

# ── Colors ────────────────────────────────────────────────────────────────────
BOLD='\\033[1m'; GREEN='\\033[0;32m'; BLUE='\\033[0;34m'; RESET='\\033[0m'
ok()   { echo -e "\${GREEN}✓\${RESET} \$*"; }
info() { echo -e "\${BLUE}→\${RESET} \$*"; }

# ── Header ────────────────────────────────────────────────────────────────────
echo ""
echo -e "\${BOLD}ACME Agent Supply — RadCheck Installer\${RESET}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Freeware. Read-only. No configuration changes."
echo ""

# ── Preflight ─────────────────────────────────────────────────────────────────
info "Checking prerequisites..."
command -v git >/dev/null 2>&1 || { echo "git is required. Install git and retry."; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "python3 is required."; exit 1; }
ok "Prerequisites OK"

# ── Clone repo ────────────────────────────────────────────────────────────────
info "Fetching RadCheck from acme-ops..."
git clone --depth 1 --filter=blob:none --sparse --quiet "\$REPO" "\$WORK/repo"
cd "\$WORK/repo"
git sparse-checkout set "\$SCRIPTS_SRC"
cd - >/dev/null
ok "Source ready"

# ── Install ───────────────────────────────────────────────────────────────────
info "Installing to \${INSTALL_DIR}..."
mkdir -p "\$INSTALL_DIR"

cp "\$WORK/repo/\${SCRIPTS_SRC}/radiation_check.py" "\$INSTALL_DIR/radiation_check.py"
cp "\$WORK/repo/\${SCRIPTS_SRC}/radcheck_scoring_v2.py" "\$INSTALL_DIR/radcheck_scoring_v2.py"
ok "Installed radiation_check.py"
ok "Installed radcheck_scoring_v2.py"

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "\${GREEN}\${BOLD}RadCheck installed.\${RESET}"
echo ""
echo "  Run it:"
echo -e "  \${BOLD}python3 ~/.openclaw/watchdog/radiation_check.py\${RESET}"
echo ""
echo "  Score guide:  https://acmeagentsupply.com/docs/radcheck/score-explained"
echo "  License:      https://acmeagentsupply.com/legal/radcheck-license"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
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
