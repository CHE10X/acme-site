import { sendProductDeliveryEmail } from "./shared";
import type { FulfillmentOrderRecord } from "../fulfillmentStore";
import { PRODUCT_INSTRUCTIONS } from "../fulfillmentLinks";

export async function deliver_findmyagent(order: FulfillmentOrderRecord) {
  await sendProductDeliveryEmail({
    order,
    productName: "FindMyAgent",
    instructionsUrl: PRODUCT_INSTRUCTIONS.findmyagent,
    fulfillmentType: "instant_download",
  });
}
