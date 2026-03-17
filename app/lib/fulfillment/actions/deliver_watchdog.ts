import { sendProductDeliveryEmail } from "./shared";
import type { FulfillmentOrderRecord } from "../fulfillmentStore";
import { PRODUCT_INSTRUCTIONS } from "../fulfillmentLinks";

export async function deliver_watchdog(order: FulfillmentOrderRecord) {
  await sendProductDeliveryEmail({
    order,
    productName: "Watchdog",
    instructionsUrl: PRODUCT_INSTRUCTIONS.watchdog,
    fulfillmentType: "private_access",
  });
}
