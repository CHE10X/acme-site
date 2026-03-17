export const ACME_QUICKSTART_LINK =
  process.env.ACME_QUICKSTART_LINK || "/docs/quickstart/5-minute";
export const ACME_INSTALL_LINK =
  process.env.ACME_INSTALL_LINK || "https://acmeagentsupply.com/install";
export const ACME_SUPPORT_LINK =
  process.env.ACME_SUPPORT_LINK || "mailto:support@acmeagentsupply.co";

export const PRODUCT_INSTRUCTIONS = {
  radcheck: process.env.ACME_RADCHECK_INSTRUCTIONS || "https://acmeagentsupply.com/docs/radcheck/install",
  sentinel: process.env.ACME_SENTINEL_INSTRUCTIONS || "/docs/products/sentinel/overview",
  sphinxgate: process.env.ACME_SPHINXGATE_INSTRUCTIONS || "/docs/products/sphinxgate/overview",
  driftguard: process.env.ACME_DRIFTGUARD_INSTRUCTIONS || "/docs/products/driftguard/overview",
  operator_bundle:
    process.env.ACME_OPERATOR_BUNDLE_INSTRUCTIONS || "/docs/quickstart/5-minute",
  watchdog: process.env.ACME_WATCHDOG_INSTRUCTIONS || "/docs/products/watchdog/overview",
  transmission:
    process.env.ACME_TRANSMISSION_INSTRUCTIONS || "/docs/products/transmission/overview",
  lazarus: process.env.ACME_LAZARUS_INSTRUCTIONS || "/docs/quickstart/5-minute",
  findmyagent:
    process.env.ACME_FINDMYAGENT_INSTRUCTIONS || "/docs/quickstart/5-minute",
  agent911:
    process.env.ACME_AGENT911_INSTRUCTIONS || "/docs/products/agent911/overview",
} as const;
