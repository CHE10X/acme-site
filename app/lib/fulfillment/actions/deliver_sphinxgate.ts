import { sendProductDeliveryEmail } from "./shared";
import type { FulfillmentOrderRecord } from "../fulfillmentStore";
import { PRODUCT_INSTRUCTIONS } from "../fulfillmentLinks";

export async function deliver_sphinxgate(order: FulfillmentOrderRecord) {
  await sendProductDeliveryEmail({
    order,
    productName: "SphinxGate",
    instructionsUrl: PRODUCT_INSTRUCTIONS.sphinxgate,
    fulfillmentType: "private_access",
  });
}
