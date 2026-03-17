import { sendProductDeliveryEmail } from "./shared";
import type { FulfillmentOrderRecord } from "../fulfillmentStore";
import { PRODUCT_INSTRUCTIONS } from "../fulfillmentLinks";

export async function deliver_lazarus(order: FulfillmentOrderRecord) {
  await sendProductDeliveryEmail({
    order,
    productName: "lazarus",
    instructionsUrl: PRODUCT_INSTRUCTIONS.lazarus,
    fulfillmentType: "instant_download",
  });
}
