/** Normalize to digits with country code (default India 91) */
export function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.startsWith("91") && digits.length === 12) return digits;
  return digits;
}

/**
 * Send thank-you WhatsApp after form submit.
 * Configure one of:
 * - Meta Cloud API: WHATSAPP_TOKEN + WHATSAPP_PHONE_NUMBER_ID
 * - Custom webhook: WHATSAPP_WEBHOOK_URL (POST JSON { phone, name, message, ... })
 */
export async function sendWhatsAppThankYou(opts: {
  name: string;
  phone: string;
  programTitle: string;
  amount?: number | null;
  paid?: boolean;
}) {
  const to = normalizePhone(opts.phone);
  if (!to || to.length < 10) {
    console.warn("[whatsapp] invalid phone, skip");
    return false;
  }

  const amountLine =
    opts.paid && opts.amount
      ? `\nPayment received: ₹${opts.amount}`
      : "";

  const message =
    `Hi ${opts.name},\n\n` +
    `Thank you for reserving your spot for *${opts.programTitle}*!` +
    `${amountLine}\n\n` +
    `We have received your details. Our team will contact you shortly.\n\n` +
    `— Mind Trainer · Sudarshan Sabat`;

  const webhook = process.env.WHATSAPP_WEBHOOK_URL?.trim();
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: to,
        name: opts.name,
        message,
        programTitle: opts.programTitle,
        amount: opts.amount ?? null,
        paid: Boolean(opts.paid),
      }),
    });
    if (!res.ok) {
      console.warn("[whatsapp] webhook failed", await res.text());
      return false;
    }
    return true;
  }

  const token = process.env.WHATSAPP_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  if (!token || !phoneNumberId) {
    console.warn(
      "[whatsapp] not configured (set WHATSAPP_TOKEN + WHATSAPP_PHONE_NUMBER_ID or WHATSAPP_WEBHOOK_URL)",
    );
    return false;
  }

  const template = process.env.WHATSAPP_TEMPLATE_NAME?.trim();
  const payload = template
    ? {
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: template,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANG || "en" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: opts.name },
                { type: "text", text: opts.programTitle },
              ],
            },
          ],
        },
      }
    : {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: message },
      };

  const res = await fetch(
    `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    console.warn("[whatsapp] Meta API failed", await res.text());
    return false;
  }
  return true;
}
