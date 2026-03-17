import type { FulfillmentType } from "./fulfillmentStore";

export type DeliveryEmailInput = {
  orderId: string;
  customerEmail: string | null;
  productName: string;
  fulfillmentType: FulfillmentType;
  supportTier: string | null;
  purchaseTimestamp: string;
  supportLink: string;
  installLink: string;
  quickstartLink: string;
  downloadLink?: string;
};

export function buildDeliveryTemplate(input: DeliveryEmailInput) {
  const destination =
    input.fulfillmentType === "instant_download"
      ? [
          "Your digital delivery is ready.",
          input.downloadLink
            ? `Download: ${input.downloadLink}`
            : "Delivery link is queued for provisioning.",
          `Next steps: ${input.installLink}`,
        ]
      : input.fulfillmentType === "private_access"
        ? [
            "Your private access has been provisioned.",
            `Install: ${input.installLink}`,
            `Private access steps: ${input.quickstartLink}`,
            "Follow the quickstart link to activate your purchase.",
          ]
        : [
            "Your order is received and queued for manual onboarding.",
            `Install: ${input.installLink}`,
            "A support specialist will contact you from support.",
            `In the meantime: ${input.quickstartLink}`,
          ];

  const subject = `Acme Fulfillment: ${input.productName}`;
  const details = [
    `Customer: ${input.customerEmail || "not provided"}`,
    `Order ID: ${input.orderId}`,
    `Product: ${input.productName}`,
    `Support tier: ${input.supportTier || "standard"}`,
    `Purchased: ${input.purchaseTimestamp}`,
  ];

  const body = [
    `Hi,`,
    ``,
    `We confirmed your purchase for ${input.productName}.`,
    "",
    ...details,
    "",
    ...destination,
    "",
    `Support: ${input.supportLink}`,
  ].join("\n");

  const html = `
<h3>Acme Fulfillment</h3>
<p>We confirmed your purchase for <strong>${input.productName}</strong>.</p>
<ul>
  <li>Customer: ${input.customerEmail || "not provided"}</li>
  <li>Order ID: ${input.orderId}</li>
  <li>Support tier: ${input.supportTier || "standard"}</li>
  <li>Purchase time: ${input.purchaseTimestamp}</li>
</ul>
<p>${destination.join("<br/>")}</p>
<p>Support: <a href="${input.supportLink}">${input.supportLink}</a></p>
`;

  return {
    subject,
    text: body,
    html,
  };
}
