"use client";

import { useState } from "react";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { apiFetch } from "@/lib/api";

const GOLD = "#D4AF37";

const CITIES = ["Pune", "Mumbai", "Other"] as const;

const DESCRIBES_YOU = [
  "Business Owner / Entrepreneur",
  "Coach / Trainer / Speaker",
  "Working Professional / Manager",
  "Other",
] as const;

const AVAILABILITY = [
  "Yes, I can attend",
  "I need more details",
  "Not sure yet",
] as const;

const INTERESTED_IN_708 = [
  "Yes, I'm Interested",
  "Need More Details",
  "Not Sure",
] as const;

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function HomeLeadModal({ open, onClose }: Props) {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [describesYou, setDescribesYou] = useState("");
  const [availability, setAvailability] = useState("");
  const [interestedIn708, setInterestedIn708] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  if (!open) return null;

  function reset() {
    setFullName("");
    setMobile("");
    setCity("");
    setDescribesYou("");
    setAvailability("");
    setInterestedIn708("");
    setError("");
    setBusy(false);
    setDone(false);
  }

  function handleClose() {
    if (busy) return;
    reset();
    onClose();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    setBusy(true);

    try {
      const res = await apiFetch("/api/home-leads", {
        method: "POST",
        body: JSON.stringify({
          fullName,
          mobile,
          city,
          describesYou,
          availability,
          interestedIn708,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not submit. Please try again.");
        setBusy(false);
        return;
      }

      // Push to GTM dataLayer so a Google Ads conversion trigger can be
      // configured in GTM off this event, without hardcoding an Ads ID here.
      if (typeof window !== "undefined") {
        type WindowWithDataLayer = Window & {
          dataLayer?: Record<string, unknown>[];
        };
        const w = window as WindowWithDataLayer;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: "home_lead_submit",
          lead_source: "home_page_modal",
        });
      }

      setDone(true);
      setBusy(false);
    } catch {
      setError("Network error. Please try again.");
      setBusy(false);
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-[#D4AF37]/20 bg-black/50 px-4 py-3 text-sm text-[#F5F0E8] outline-none focus:border-[#D4AF37]/50 disabled:opacity-50 [color-scheme:dark]";
  const labelClass =
    "block text-xs uppercase tracking-wider text-[#F5F0E8]/40 mb-1.5";

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/75 p-4 py-10">
      <div className="relative w-full max-w-md rounded-2xl border border-[#D4AF37]/25 bg-[#0a0a0a] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/12 px-5 py-4">
          <div>
            <h2
              className="text-lg font-semibold text-[#D4AF37]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Reserve Your Spot
            </h2>
            <p className="text-[11px] text-[#F5F0E8]/40 mt-0.5">
              Fill in your details and our team will reach out to you.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={busy}
            aria-label="Close"
            className="disabled:opacity-30"
          >
            <X className="w-5 h-5 text-[#F5F0E8]/50" />
          </button>
        </div>

        {done ? (
          <div className="p-8 flex flex-col items-center text-center gap-3">
            <CheckCircle2 className="w-12 h-12 text-[#D4AF37]" />
            <h3
              className="text-lg font-semibold text-[#F5F0E8]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Thank you!
            </h3>
            <p className="text-sm text-[#F5F0E8]/60">
              Your details have been submitted. Our team will contact you
              shortly.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-[#0a0a0a]"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, #B8960C)`,
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="p-5 space-y-4">
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={fieldClass}
                required
                autoComplete="name"
                disabled={busy}
              />
            </div>

            <div>
              <label className={labelClass}>Mobile Number</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className={fieldClass}
                placeholder="10-digit mobile"
                required
                autoComplete="tel"
                disabled={busy}
              />
            </div>

            <div>
              <label className={labelClass}>City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={fieldClass}
                required
                disabled={busy}
              >
                <option value="">Select city</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>What best describes you?</label>
              <select
                value={describesYou}
                onChange={(e) => setDescribesYou(e.target.value)}
                className={fieldClass}
                required
                disabled={busy}
              >
                <option value="">Select an option</option>
                {DESCRIBES_YOU.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Are you available from 9:00 AM to 6:00 PM for the LIVE
                seminar?
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className={fieldClass}
                required
                disabled={busy}
              >
                <option value="">Select an option</option>
                {AVAILABILITY.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                FREE Training at 4-Star Hotel + ₹708 Food Charge. Interested?
              </label>
              <select
                value={interestedIn708}
                onChange={(e) => setInterestedIn708(e.target.value)}
                className={fieldClass}
                required
                disabled={busy}
              >
                <option value="">Select an option</option>
                {INTERESTED_IN_708.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-[#0a0a0a] disabled:opacity-50 disabled:pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, #B8960C)`,
              }}
              data-meta-event="Lead"
              data-cta="home-lead-submit"
            >
              {busy ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Please wait…
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
