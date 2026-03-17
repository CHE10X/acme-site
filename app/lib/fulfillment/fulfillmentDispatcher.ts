import type { FulfillmentOrderRecord, FulfillmentType } from "./fulfillmentStore";
import {
  buildUnknownProductCatalogEntry,
  getCatalogProductById,
  type FulfillmentActionName,
  type ProductCatalogRecord,
} from "./productCatalog";
import { ACME_INSTALL_LINK, ACME_QUICKSTART_LINK, ACME_SUPPORT_LINK } from "./fulfillmentLinks";
import { deliver_agent911 } from "./actions/deliver_agent911";
import { deliver_driftguard } from "./actions/deliver_driftguard";
import { deliver_findmyagent } from "./actions/deliver_findmyagent";
import { deliver_lazarus } from "./actions/deliver_lazarus";
import { deliver_operator_bundle } from "./actions/deliver_operator_bundle";
import { deliver_radcheck } from "./actions/deliver_radcheck";
import { deliver_sentinel } from "./actions/deliver_sentinel";
import { deliver_sphinxgate } from "./actions/deliver_sphinxgate";
import { deliver_transmission } from "./actions/deliver_transmission";
import { deliver_watchdog } from "./actions/deliver_watchdog";
import { writeOperatorLog } from "./operatorLog";

export type FulfillmentLookup = {
  productId?: string | null;
  productFallbackId?: string | null;
  supportTier?: string | null;
};

export type FulfillmentDecision = {
  catalog: ProductCatalogRecord;
  fulfillmentType: FulfillmentType;
  fulfillmentAction: FulfillmentActionName;
  quickstartLink: string;
  installLink: string;
  supportLink: string;
};

export function decideFulfillmentFromSession(input: FulfillmentLookup): FulfillmentDecision {
  const productId = input.productId || input.productFallbackId || "unknown";
  const catalog = getCatalogProductById(productId) ?? buildUnknownProductCatalogEntry(productId);

  return {
    catalog,
    fulfillmentType: inferFulfillmentType(catalog.fulfillment),
    fulfillmentAction: catalog.fulfillment,
    quickstartLink: ACME_QUICKSTART_LINK,
    installLink: ACME_INSTALL_LINK,
    supportLink: ACME_SUPPORT_LINK,
  };
}

function inferFulfillmentType(fulfillment: FulfillmentActionName): FulfillmentType {
  if (fulfillment === "deliver_sentinel" || fulfillment === "deliver_watchdog" || fulfillment === "deliver_sphinxgate") {
    return "private_access";
  }

  if (
    fulfillment === "deliver_agent911" ||
    fulfillment === "deliver_unknown"
  ) {
    return "manual";
  }

  return "instant_download";
}

const fulfillmentActions: Record<FulfillmentActionName, (order: FulfillmentOrderRecord) => Promise<void>> = {
  deliver_radcheck,
  deliver_sentinel,
  deliver_sphinxgate,
  deliver_driftguard,
  deliver_operator_bundle,
  deliver_watchdog,
  deliver_transmission,
  deliver_lazarus,
  deliver_findmyagent,
  deliver_agent911,
  deliver_unknown: unknownFulfillment,
};

export async function runFulfillment(action: FulfillmentActionName, order: FulfillmentOrderRecord): Promise<void> {
  const executor = fulfillmentActions[action];
  if (!executor) {
    await writeOperatorLog(order, "failed");
    throw new Error(`Unknown fulfillment action: ${action}`);
  }

  try {
    await executor(order);
    await writeOperatorLog(order, "completed");
  } catch (error) {
    await writeOperatorLog(order, "failed");
    throw error;
  }
}

async function unknownFulfillment(order: FulfillmentOrderRecord) {
  throw new Error(`No delivery action configured for product ${order.product_sku}`);
}
