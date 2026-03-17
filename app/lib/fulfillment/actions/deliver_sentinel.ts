import { sendProductDeliveryEmail } from "./shared";
import type { FulfillmentOrderRecord } from "../fulfillmentStore";
import { PRODUCT_INSTRUCTIONS } from "../fulfillmentLinks";

export async function deliver_sentinel(order: FulfillmentOrderRecord) {
  await sendProductDeliveryEmail({
    order,
    productName: "Sentinel",
    instructionsUrl: PRODUCT_INSTRUCTIONS.sentinel,
    fulfillmentType: "private_access",
  });
}
