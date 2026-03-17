import { sendProductDeliveryEmail } from "./shared";
import type { FulfillmentOrderRecord } from "../fulfillmentStore";
import { PRODUCT_INSTRUCTIONS } from "../fulfillmentLinks";

export async function deliver_driftguard(order: FulfillmentOrderRecord) {
  await sendProductDeliveryEmail({
    order,
    productName: "DriftGuard",
    instructionsUrl: PRODUCT_INSTRUCTIONS.driftguard,
    fulfillmentType: "instant_download",
  });
}
