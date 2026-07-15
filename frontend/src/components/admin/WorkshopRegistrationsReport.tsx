"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, X, Loader2 } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export type RegistrationRow = {
  id: string;
  name: string;
  phone: string;
  profession: string;
  monthlyIncome: string;
  isSerious: boolean;
  amount: number;
  paymentRequired: boolean;
  paymentStatus: string;
  razorpayPaymentId: string;
  whatsappSent: boolean;
  createdAt?: string;
};

type Props = {
  workshopSlug: string;
  workshopTitle: string;
  open: boolean;
  onClose: () => void;
};

export default function WorkshopRegistrationsReport({
  workshopSlug,
  workshopTitle,
  open,
  onClose,
}: Props) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [rows, setRows] = useState<RegistrationRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ workshopSlug });
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      if (paymentStatus) params.set("paymentStatus", paymentStatus);
      const res = await apiFetch(`/api/registrations?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load");
        setRows([]);
        return;
      }
      setRows(data.registrations || []);
    } catch {
      setError("Network error");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [workshopSlug, from, to, paymentStatus]);

  useEffect(() => {
    if (open) void load();
  }, [open, load]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/75 p-4 py-8">
      <div className="w-full max-w-5xl rounded-2xl border border-[#D4AF37]/20 bg-[#0a0a0a] shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-[#D4AF37]/12 px-5 py-4">
          <div>
            <h2
              className="text-lg font-semibold text-[#D4AF37]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Form submissions
            </h2>
            <p className="text-xs text-[#F5F0E8]/45 mt-0.5">
              {workshopTitle} ·{" "}
              <span className="font-mono text-[#00BFFF]/80">{workshopSlug}</span>
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close">
            <X className="w-5 h-5 text-[#F5F0E8]/50" />
          </button>
        </div>

        <div className="px-5 py-4 border-b border-[#D4AF37]/10 flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#F5F0E8]/40 mb-1">
              From date
            </label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="rounded-lg border border-[#D4AF37]/20 bg-black/40 px-3 py-2 text-sm text-[#F5F0E8] outline-none [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#F5F0E8]/40 mb-1">
              To date
            </label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="rounded-lg border border-[#D4AF37]/20 bg-black/40 px-3 py-2 text-sm text-[#F5F0E8] outline-none [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#F5F0E8]/40 mb-1">
              Payment
            </label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="rounded-lg border border-[#D4AF37]/20 bg-black/40 px-3 py-2 text-sm text-[#F5F0E8] outline-none"
            >
              <option value="">All</option>
              <option value="none">No payment</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => void load()}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-[#0a0a0a]"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #B8960C)",
            }}
          >
            Apply filter
          </button>
          <button
            type="button"
            onClick={() => {
              setFrom("");
              setTo("");
              setPaymentStatus("");
            }}
            className="rounded-lg border border-[#D4AF37]/20 px-4 py-2 text-sm text-[#F5F0E8]/60 hover:bg-white/5"
          >
            Clear
          </button>
          <p className="ml-auto text-xs text-[#F5F0E8]/40 self-center">
            {loading ? "Loading…" : `${rows.length} records`}
          </p>
        </div>

        <div className="overflow-x-auto max-h-[65vh]">
          {error ? (
            <p className="p-6 text-sm text-red-400">{error}</p>
          ) : loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-[#F5F0E8]/40 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading…
            </div>
          ) : rows.length === 0 ? (
            <p className="p-10 text-center text-sm text-[#F5F0E8]/40">
              No form submissions for this filter.
            </p>
          ) : (
            <table className="w-full text-left text-sm min-w-[900px]">
              <thead className="sticky top-0 bg-[#0a0a0a]">
                <tr className="border-b border-[#D4AF37]/12 text-[11px] uppercase tracking-wider text-[#F5F0E8]/40">
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Profession</th>
                  <th className="px-4 py-3 font-medium">Income</th>
                  <th className="px-4 py-3 font-medium">Serious</th>
                  <th className="px-4 py-3 font-medium">Payment</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F0E8]/6">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-xs text-[#F5F0E8]/60 whitespace-nowrap">
                      {formatDate(r.createdAt)}
                      {r.createdAt ? (
                        <div className="text-[10px] text-[#F5F0E8]/35">
                          {new Date(r.createdAt).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 font-medium">{r.name}</td>
                    <td className="px-4 py-3 font-mono text-xs">{r.phone}</td>
                    <td className="px-4 py-3 text-xs text-[#F5F0E8]/70">
                      {r.profession}
                    </td>
                    <td className="px-4 py-3 text-xs">{r.monthlyIncome}</td>
                    <td className="px-4 py-3">
                      {r.isSerious ? (
                        <span className="text-[#D4AF37]">Yes</span>
                      ) : (
                        <span className="text-[#F5F0E8]/40">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs capitalize">
                      {r.paymentStatus === "paid" ? (
                        <span className="text-emerald-400">Paid</span>
                      ) : r.paymentStatus === "pending" ? (
                        <span className="text-amber-400">Pending</span>
                      ) : r.paymentStatus === "failed" ? (
                        <span className="text-red-400">Failed</span>
                      ) : (
                        <span className="text-[#F5F0E8]/40">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#D4AF37] text-xs">
                      {r.amount > 0 ? `₹${r.amount}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

/** Small View button used in workshop table rows */
export function ViewRegistrationsButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-2 rounded-lg border border-[#00BFFF]/25 text-[#00BFFF] hover:bg-[#00BFFF]/10"
      title="View form submissions"
    >
      <Eye className="w-3.5 h-3.5" />
    </button>
  );
}
