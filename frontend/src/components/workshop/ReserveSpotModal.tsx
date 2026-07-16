"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Loader2 } from "lucide-react";
import { apiFetch } from "@/lib/api";
import {
  PROFESSIONS,
  INCOME_SLABS,
  type WorkshopBookingInfo,
} from "@/data/reserve-spot";
import { trackMetaEvent } from "@/lib/meta-pixel";

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

type BusyPhase = null | "submit" | "payment" | "verify" | "redirect";

const BUSY_COPY: Record<Exclude<BusyPhase, null>, string> = {
  submit: "Submitting your details…",
  payment: "Opening secure payment…",
  verify: "Confirming payment…",
  redirect: "Redirecting…",
};

export default function ReserveSpotModal({ open, onClose, workshop }: Props) {
  const router = useRouter();
  const lockRef = useRef(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [isSerious, setIsSerious] = useState<"" | "yes" | "no">("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<BusyPhase>(null);

  const thankYouBase = `/workshop/${encodeURIComponent(workshop.slug)}/thank-you`;
  const isBusy = busy !== null;

  useEffect(() => {
    if (!open) return;
    router.prefetch(`${thankYouBase}?paid=0`);
    router.prefetch(`${thankYouBase}?paid=1`);
    if (workshop.includePayment && (workshop.fees ?? 0) > 0) {
      void loadRazorpayScript();
    }
  }, [open, thankYouBase, workshop.includePayment, workshop.fees, router]);

  if (!open) return null;

  const fees = workshop.fees ?? 0;
  const payLabel =
    workshop.includePayment && fees > 0
      ? `Pay ₹${fees} & Reserve`
      : "Submit";

  function goToThankYou(paid: boolean) {
    setBusy("redirect");
    // Hard redirect — fastest; Meta also sees full page load
    window.location.replace(`${thankYouBase}?paid=${paid ? "1" : "0"}`);
  }

  function fireSuccessEvents(paid: boolean) {
    if (paid) {
      trackMetaEvent("Purchase", {
        content_name: workshop.programTitle,
        value: fees,
        currency: "INR",
      });
      trackMetaEvent("CompleteRegistration", {
        content_name: workshop.programTitle,
        value: fees,
        currency: "INR",
      });
    } else {
      trackMetaEvent("Lead", {
        content_name: workshop.programTitle,
        content_category: workshop.programSlug,
      });
      trackMetaEvent("CompleteRegistration", {
        content_name: workshop.programTitle,
      });
    }
  }

  function unlock(msg?: string) {
    lockRef.current = false;
    setBusy(null);
    if (msg) setError(msg);
  }

  function reset() {
    lockRef.current = false;
    setName("");
    setPhone("");
    setProfession("");
    setMonthlyIncome("");
    setIsSerious("");
    setError("");
    setBusy(null);
  }

  function handleClose() {
    if (isBusy) return; // block close while processing
    reset();
    onClose();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (lockRef.current) return;
    lockRef.current = true;
    setError("");
    setBusy("submit");

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
        unlock(data.error || "Submit failed");
        return;
      }

      if (!data.requiresPayment) {
        fireSuccessEvents(false);
        goToThankYou(false);
        return;
      }

      setBusy("payment");
      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        unlock("Could not load Razorpay. Try again.");
        return;
      }

      trackMetaEvent("InitiateCheckout", {
        content_name: workshop.programTitle,
        value: fees,
        currency: "INR",
      });

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
          lockRef.current = true;
          setBusy("verify");
          setError("");
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
              unlock(vData.error || "Payment verification failed");
              return;
            }
            fireSuccessEvents(true);
            goToThankYou(true);
          } catch {
            unlock("Payment verification failed");
          }
        },
      });

      rzp.on("payment.failed", () => {
        unlock("Payment failed. Please try again.");
      });

      // Checkout open — hide our spinner so Razorpay UI is usable
      setBusy(null);
      lockRef.current = false;
      rzp.open();
    } catch {
      unlock("Network error. Please try again.");
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-[#D4AF37]/20 bg-black/50 px-4 py-3 text-sm text-[#F5F0E8] outline-none focus:border-[#D4AF37]/50 disabled:opacity-50 [color-scheme:dark]";

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/75 p-4 py-10">
      <div className="relative w-full max-w-md rounded-2xl border border-[#D4AF37]/25 bg-[#0a0a0a] shadow-2xl overflow-hidden">
        {/* Full modal spinner — blocks double submit */}
        {isBusy && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/80 backdrop-blur-[2px]"
            aria-live="polite"
            aria-busy="true"
          >
            <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
            <p
              className="text-sm font-medium text-[#F5F0E8]/90"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {BUSY_COPY[busy]}
            </p>
            <p className="text-[11px] text-[#F5F0E8]/45 px-6 text-center">
              Please wait — do not refresh or press back
            </p>
          </div>
        )}

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
            <p className="text-[11px] text-[#F5F0E8]/45 mt-2 rounded-lg border border-[#D4AF37]/15 bg-[#D4AF37]/5 px-3 py-2">
              {workshop.includePayment && fees > 0
                ? `After you submit, payment of ₹${fees} opens next (Razorpay).`
                : "After you submit, your spot is reserved — no payment on this page."}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isBusy}
            aria-label="Close"
            className="disabled:opacity-30"
          >
            <X className="w-5 h-5 text-[#F5F0E8]/50" />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="p-5 space-y-4"
          aria-disabled={isBusy}
        >
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
              disabled={isBusy}
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
              disabled={isBusy}
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
              disabled={isBusy}
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
              disabled={isBusy}
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
              disabled={isBusy}
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
            disabled={isBusy}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-[#0a0a0a] disabled:opacity-50 disabled:pointer-events-none"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #B8960C)",
            }}
            data-meta-event="Lead"
            data-cta="reserve-submit"
          >
            {isBusy ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Please wait…
              </>
            ) : (
              payLabel
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
