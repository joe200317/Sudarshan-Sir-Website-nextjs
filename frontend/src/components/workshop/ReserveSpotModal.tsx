"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { apiFetch } from "@/lib/api";
import {
  PROFESSIONS,
  INCOME_SLABS,
  type WorkshopBookingInfo,
} from "@/data/reserve-spot";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (r: unknown) => void) => void;
    };
  }
}

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

type Props = {
  open: boolean;
  onClose: () => void;
  workshop: WorkshopBookingInfo;
};

export default function ReserveSpotModal({ open, onClose, workshop }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [isSerious, setIsSerious] = useState<"" | "yes" | "no">("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const fees = workshop.fees ?? 0;
  const payLabel =
    workshop.includePayment && fees > 0
      ? `Pay ₹${fees} & Reserve`
      : "Submit";

  function reset() {
    setName("");
    setPhone("");
    setProfession("");
    setMonthlyIncome("");
    setIsSerious("");
    setError("");
    setDone(false);
    setSaving(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await apiFetch("/api/registrations", {
        method: "POST",
        body: JSON.stringify({
          workshopSlug: workshop.slug,
          name,
          phone,
          profession,
          monthlyIncome,
          isSerious: isSerious === "yes",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Submit failed");
        return;
      }

      if (!data.requiresPayment) {
        setDone(true);
        return;
      }

      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        setError("Could not load Razorpay. Try again.");
        return;
      }

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.order.amount,
        currency: data.order.currency || "INR",
        name: "Mind Trainer",
        description: data.workshopTitle || workshop.programTitle,
        order_id: data.order.id,
        prefill: {
          name: data.prefill?.name || name,
          contact: data.prefill?.contact || phone,
        },
        theme: { color: "#D4AF37" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const vRes = await apiFetch("/api/registrations/verify-payment", {
              method: "POST",
              body: JSON.stringify({
                registrationId: data.registrationId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const vData = await vRes.json();
            if (!vRes.ok) {
              setError(vData.error || "Payment verification failed");
              return;
            }
            setDone(true);
          } catch {
            setError("Payment verification failed");
          }
        },
      });

      rzp.on("payment.failed", () => {
        setError("Payment failed. Please try again.");
      });
      rzp.open();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-[#D4AF37]/20 bg-black/50 px-4 py-3 text-sm text-[#F5F0E8] outline-none focus:border-[#D4AF37]/50 [color-scheme:dark]";

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/75 p-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#D4AF37]/25 bg-[#0a0a0a] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/12 px-5 py-4">
          <div>
            <h2
              className="text-lg font-semibold text-[#D4AF37]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Reserve Your Spot
            </h2>
            <p className="text-[11px] text-[#F5F0E8]/40 mt-0.5">
              {workshop.programTitle}
              {workshop.includePayment && fees > 0 ? ` · ₹${fees}` : ""}
            </p>
          </div>
          <button type="button" onClick={handleClose} aria-label="Close">
            <X className="w-5 h-5 text-[#F5F0E8]/50" />
          </button>
        </div>

        {done ? (
          <div className="p-6 text-center space-y-3">
            <p
              className="text-xl font-semibold text-[#D4AF37]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Thank you!
            </p>
            <p className="text-sm text-[#F5F0E8]/55 leading-relaxed">
              We received your details
              {workshop.includePayment && fees > 0 ? " and payment" : ""}. A
              confirmation will also be sent on WhatsApp.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-[#0a0a0a]"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #B8960C)",
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F5F0E8]/40 mb-1.5">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldClass}
                required
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F5F0E8]/40 mb-1.5">
                Phone number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={fieldClass}
                placeholder="10-digit mobile"
                required
                autoComplete="tel"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F5F0E8]/40 mb-1.5">
                Select profession
              </label>
              <select
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className={fieldClass}
                required
              >
                <option value="">Select Profession</option>
                {PROFESSIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F5F0E8]/40 mb-1.5">
                Monthly income
              </label>
              <select
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className={fieldClass}
                required
              >
                <option value="">Select income slab</option>
                {INCOME_SLABS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F5F0E8]/40 mb-1.5">
                How serious are you?
              </label>
              <select
                value={isSerious}
                onChange={(e) =>
                  setIsSerious(e.target.value as "" | "yes" | "no")
                }
                className={fieldClass}
                required
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-[#0a0a0a] disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #B8960C)",
              }}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Please wait…
                </>
              ) : (
                payLabel
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
