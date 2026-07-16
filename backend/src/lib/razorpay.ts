import crypto from "crypto";
import Razorpay from "razorpay";

/** Convert INR rupees → Razorpay paise (integer). Never trust client amounts. */
export function rupeesToPaise(rupees: number): number {
  return Math.round(Number(rupees) * 100);
}

export function paiseToRupees(paise: number): number {
  return Number(paise) / 100;
}

export function getRazorpay() {
  const key_id = process.env.RAZORPAY_KEY_ID?.trim();
  const key_secret = process.env.RAZORPAY_KEY_SECRET?.trim();
  if (!key_id || !key_secret) {
    throw new Error(
      "Razorpay is not configured (set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in backend/.env)",
    );
  }
  return {
    client: new Razorpay({ key_id, key_secret }),
    keyId: key_id,
  };
}

export function isRazorpayConfigured() {
  return Boolean(
    process.env.RAZORPAY_KEY_ID?.trim() &&
      process.env.RAZORPAY_KEY_SECRET?.trim(),
  );
}

export function verifyRazorpaySignature(opts: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const secret = process.env.RAZORPAY_KEY_SECRET?.trim();
  if (!secret) return false;
  const body = `${opts.orderId}|${opts.paymentId}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "utf8"),
      Buffer.from(String(opts.signature), "utf8"),
    );
  } catch {
    return expected === opts.signature;
  }
}

/**
 * Fetch order from Razorpay and ensure paid amount matches our DB fee (paise).
 * This blocks client-side amount tampering.
 */
export async function assertOrderAmountMatches(opts: {
  orderId: string;
  expectedPaise: number;
}) {
  const { client } = getRazorpay();
  const order = (await client.orders.fetch(opts.orderId)) as {
    id?: string;
    amount?: number | string;
    currency?: string;
    status?: string;
  };

  const orderPaise = Number(order.amount);
  if (!Number.isFinite(orderPaise) || orderPaise !== opts.expectedPaise) {
    throw new Error(
      `Amount mismatch: expected ${opts.expectedPaise} paise, Razorpay order has ${orderPaise}`,
    );
  }
  if (order.currency && order.currency !== "INR") {
    throw new Error(`Unexpected currency: ${order.currency}`);
  }
  return order;
}

/**
 * Fetch payment and ensure it belongs to the order and is captured/authorized.
 */
export async function assertPaymentForOrder(opts: {
  paymentId: string;
  orderId: string;
  expectedPaise: number;
}) {
  const { client } = getRazorpay();
  const payment = (await client.payments.fetch(opts.paymentId)) as {
    id?: string;
    order_id?: string;
    amount?: number | string;
    currency?: string;
    status?: string;
  };

  if (payment.order_id !== opts.orderId) {
    throw new Error("Payment does not belong to this order");
  }

  const paidPaise = Number(payment.amount);
  if (!Number.isFinite(paidPaise) || paidPaise !== opts.expectedPaise) {
    throw new Error(
      `Paid amount mismatch: expected ${opts.expectedPaise} paise, got ${paidPaise}`,
    );
  }

  const status = String(payment.status || "");
  if (!["captured", "authorized"].includes(status)) {
    throw new Error(`Payment not successful (status: ${status})`);
  }

  return payment;
}
