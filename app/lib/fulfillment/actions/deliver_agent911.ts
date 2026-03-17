import { sendProductDeliveryEmail } from "./shared";
import type { FulfillmentOrderRecord } from "../fulfillmentStore";
import { PRODUCT_INSTRUCTIONS } from "../fulfillmentLinks";

export async function deliver_agent911(order: FulfillmentOrderRecord) {
  await sendProductDeliveryEmail({
    order,
    productName: "Agent911",
    instructionsUrl: PRODUCT_INSTRUCTIONS.agent911,
    fulfillmentType: "manual",
  });
}
