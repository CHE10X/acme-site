import { buildDeliveryTemplate } from "../deliveryEmailTemplate";
import { queueDeliveryEmail } from "../fulfillmentNotifier";
import { ACME_QUICKSTART_LINK, ACME_SUPPORT_LINK } from "../fulfillmentLinks";
import type { FulfillmentOrderRecord } from "../fulfillmentStore";

type DeliverParams = {
  order: FulfillmentOrderRecord;
  productName: string;
  instructionsUrl: string;
  fulfillmentType?: "instant_download" | "private_access" | "manual";
  supportLink?: string;
};

export function buildInstallLink(_productSku: string, token: string) {
  const base = process.env.ACME_INSTALL_BASE_URL || "https://acmeagentsupply.com/install";
  return `${base}?token=${encodeURIComponent(token)}`;
}

export async function sendProductDeliveryEmail({
  order,
  productName,
  instructionsUrl,
  fulfillmentType,
  supportLink,
}: DeliverParams) {
  const installLink = buildInstallLink(order.product_sku, order.install_token);

  const template = buildDeliveryTemplate({
    orderId: order.order_id,
    customerEmail: order.customer_email,
    productName,
    fulfillmentType: fulfillmentType ?? order.fulfillment_type,
    supportTier: order.support_tier,
    purchaseTimestamp: order.purchase_timestamp,
    supportLink: supportLink || ACME_SUPPORT_LINK,
    installLink,
    quickstartLink: ACME_QUICKSTART_LINK,
    downloadLink: fulfillmentType === "instant_download" ? instructionsUrl : undefined,
  });

  await queueDeliveryEmail({
    to: order.customer_email,
    orderId: order.order_id,
    subject: `${template.subject} - ${productName}`,
    text: `${template.text}\n\nInstructions: ${instructionsUrl}\n\nInstall link: ${installLink}`,
    html: `${template.html}<p>Instructions: <a href="${instructionsUrl}">${instructionsUrl}</a></p><p>Install: <a href="${installLink}">${installLink}</a></p>`,
  });
}
