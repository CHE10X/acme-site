import type { FulfillmentOrderRecord } from "../fulfillmentStore";
import { deliver_driftguard } from "./deliver_driftguard";
import { deliver_sentinel } from "./deliver_sentinel";
import { deliver_sphinxgate } from "./deliver_sphinxgate";
import { deliver_transmission } from "./deliver_transmission";
import { deliver_watchdog } from "./deliver_watchdog";

export async function deliver_operator_bundle(order: FulfillmentOrderRecord) {
  await Promise.all([
    deliver_sentinel(order),
    deliver_watchdog(order),
    deliver_sphinxgate(order),
    deliver_driftguard(order),
    deliver_transmission(order),
  ]);
}
