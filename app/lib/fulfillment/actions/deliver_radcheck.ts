import { sendProductDeliveryEmail } from "./shared";
import type { FulfillmentOrderRecord } from "../fulfillmentStore";
import { PRODUCT_INSTRUCTIONS } from "../fulfillmentLinks";

export async function deliver_radcheck(order: FulfillmentOrderRecord) {
  await sendProductDeliveryEmail({
    order,
    productName: "RadCheck",
    instructionsUrl: PRODUCT_INSTRUCTIONS.radcheck,
    fulfillmentType: "instant_download",
  });
}
