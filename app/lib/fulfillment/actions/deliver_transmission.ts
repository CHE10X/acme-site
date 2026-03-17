import { sendProductDeliveryEmail } from "./shared";
import type { FulfillmentOrderRecord } from "../fulfillmentStore";
import { PRODUCT_INSTRUCTIONS } from "../fulfillmentLinks";

export async function deliver_transmission(order: FulfillmentOrderRecord) {
  await sendProductDeliveryEmail({
    order,
    productName: "Transmission",
    instructionsUrl: PRODUCT_INSTRUCTIONS.transmission,
    fulfillmentType: "instant_download",
  });
}
