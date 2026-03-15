import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

type FulfillmentAlert = {
  eventId: string;
  sessionId: string;
  orderId: string;
  customerEmail: string | null;
  product: string;
  timestamp: string;
  result: string;
  failureReason: string | null;
};

type DeliveryOutbox = {
  to: string | null;
  orderId: string;
  subject: string;
  text: string;
  html: string;
};

function getOutboxPath() {
  return process.env.ACME_FULFILLMENT_EMAIL_OUTBOX_PATH
    ? path.resolve(process.env.ACME_FULFILLMENT_EMAIL_OUTBOX_PATH)
    : path.join(process.cwd(), ".data", "acme_fulfillment_delivery_outbox.ndjson");
}

function getAlertPath() {
  return process.env.ACME_FULFILLMENT_ALERT_PATH
    ? path.resolve(process.env.ACME_FULFILLMENT_ALERT_PATH)
    : path.join(process.cwd(), ".data", "acme_fulfillment_alerts.ndjson");
}

async function ensureDir(filePath: string) {
  await mkdir(path.dirname(filePath), { recursive: true });
}

async function appendJsonLine(filePath: string, payload: unknown) {
  await ensureDir(filePath);
  await appendFile(filePath, `${JSON.stringify(payload)}\n`, "utf8");
}

async function sendViaAgentMail(payload: DeliveryOutbox): Promise<boolean> {
  const apiKey = process.env.AGENTMAIL_API_KEY;
  const inboxId = process.env.AGENTMAIL_INBOX_ID ?? "hendrik@agentmail.to";
  if (!apiKey || !payload.to) return false;

  const response = await fetch(`https://api.agentmail.to/v0/inboxes/${inboxId}/messages`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: [payload.to],
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
    }),
  });

  return response.ok;
}

export async function queueDeliveryEmail(payload: DeliveryOutbox) {
  // Try AgentMail first
  if (process.env.AGENTMAIL_API_KEY) {
    const sent = await sendViaAgentMail(payload);
    if (sent) return;
    // Fall through to outbox/webhook on failure
    console.error(`[fulfillment] AgentMail send failed for order ${payload.orderId}, falling back`);
  }

  const outboxPath = getOutboxPath();
  const webhookUrl = process.env.ACME_FULFILLMENT_DELIVERY_WEBHOOK_URL;
  if (!webhookUrl) {
    await appendJsonLine(outboxPath, payload);
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await appendJsonLine(outboxPath, payload);
  }
}

export async function sendInternalAlert(payload: FulfillmentAlert) {
  const alertPath = getAlertPath();
  const webhookUrl = process.env.ACME_FULFILLMENT_ALERT_WEBHOOK_URL;
  const normalized = { ...payload };
  if (!webhookUrl) {
    await appendJsonLine(alertPath, normalized);
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(normalized),
  });

  if (!response.ok) {
    await appendJsonLine(alertPath, normalized);
  }
}
