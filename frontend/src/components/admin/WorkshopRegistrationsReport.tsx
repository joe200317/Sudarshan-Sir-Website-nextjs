"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Eye,
  X,
  Loader2,
  Download,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";
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

/** Rows per page (date headers stay with their rows) */
const PAGE_SIZE = 15;

function dateKey(iso?: string) {
  if (!iso) return "Unknown";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Unknown";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function dateLabel(key: string) {
  if (key === "Unknown") return "Unknown date";
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function paymentLabel(r: RegistrationRow) {
  if (r.paymentStatus === "paid") return "Paid";
  if (r.paymentStatus === "pending") return "Pending";
  if (r.paymentStatus === "failed") return "Failed";
  return "—";
}

function exportToExcel(
  rows: RegistrationRow[],
  workshopSlug: string,
  workshopTitle: string,
) {
  const header = [
    "Date",
    "Time",
    "Name",
    "Phone",
    "Profession",
    "Income",
    "Serious",
    "Payment",
    "Amount",
    "Workshop Slug",
    "Program",
  ];

  const lines = rows.map((r) => {
    const created = r.createdAt ? new Date(r.createdAt) : null;
    const date = created ? formatDate(created) : "";
    const time = created
      ? created.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";
    return [
      date,
      time,
      r.name,
      r.phone,
      r.profession,
      r.monthlyIncome,
      r.isSerious ? "Yes" : "No",
      paymentLabel(r),
      r.amount > 0 ? String(r.amount) : "",
      workshopSlug,
      workshopTitle,
    ]
      .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
      .join(",");
  });

  const csv = "\uFEFF" + [header.join(","), ...lines].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${workshopSlug}-submissions.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

type PageBlock =
  | { type: "date"; key: string; label: string; count: number }
  | { type: "row"; row: RegistrationRow };

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
  const [page, setPage] = useState(1);

  const load = useCallback(
    async (filters?: { from: string; to: string; paymentStatus: string }) => {
      const f = filters?.from ?? from;
      const t = filters?.to ?? to;
      const ps = filters?.paymentStatus ?? paymentStatus;
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ workshopSlug });
        if (f) params.set("from", f);
        if (t) params.set("to", t);
        if (ps) params.set("paymentStatus", ps);
        const res = await apiFetch(`/api/registrations?${params.toString()}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to load");
          setRows([]);
          return;
        }
        setRows(data.registrations || []);
        setPage(1);
      } catch {
        setError("Network error");
        setRows([]);
      } finally {
        setLoading(false);
      }
    },
    [workshopSlug, from, to, paymentStatus],
  );

  useEffect(() => {
    if (open) void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load only when modal opens
  }, [open, workshopSlug]);

  /** Flat row list → page of rows, but keep date headers above each day's group */
  const pageBlocks = useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const slice = rows.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

    const blocks: PageBlock[] = [];
    let lastKey = "";
    for (const row of slice) {
      const key = dateKey(row.createdAt);
      if (key !== lastKey) {
        const dayCount = rows.filter((r) => dateKey(r.createdAt) === key).length;
        blocks.push({
          type: "date",
          key,
          label: dateLabel(key),
          count: dayCount,
        });
        lastKey = key;
      }
      blocks.push({ type: "row", row });
    }
    return { blocks, totalPages, safePage, sliceCount: slice.length };
  }, [rows, page]);

  const dateBatchCount = useMemo(() => {
    const keys = new Set(rows.map((r) => dateKey(r.createdAt)));
    return keys.size;
  }, [rows]);

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
            <p className="text-[11px] text-[#F5F0E8]/35 mt-1">
              Grouped by date · only this workshop slug
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
              void load({ from: "", to: "", paymentStatus: "" });
            }}
            className="rounded-lg border border-[#D4AF37]/20 px-4 py-2 text-sm text-[#F5F0E8]/60 hover:bg-white/5"
          >
            Clear
          </button>
          <button
            type="button"
            disabled={rows.length === 0}
            onClick={() => exportToExcel(rows, workshopSlug, workshopTitle)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 px-4 py-2 text-sm text-emerald-400 hover:bg-emerald-500/10 disabled:opacity-40"
          >
            <Download className="w-3.5 h-3.5" />
            Export Excel
          </button>
          <p className="ml-auto text-xs text-[#F5F0E8]/40 self-center">
            {loading
              ? "Loading…"
              : `${rows.length} records · ${dateBatchCount} date${dateBatchCount === 1 ? "" : "s"}`}
          </p>
        </div>

        <div className="overflow-x-auto max-h-[60vh]">
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
              <thead className="sticky top-0 z-[5] bg-[#0a0a0a]">
                <tr className="border-b border-[#F5F0E8]/6 text-[11px] uppercase tracking-wider text-[#F5F0E8]/35">
                  <th className="px-4 py-2 font-medium">Time</th>
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Phone</th>
                  <th className="px-4 py-2 font-medium">Profession</th>
                  <th className="px-4 py-2 font-medium">Income</th>
                  <th className="px-4 py-2 font-medium">Serious</th>
                  <th className="px-4 py-2 font-medium">Payment</th>
                  <th className="px-4 py-2 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {pageBlocks.blocks.map((block) =>
                  block.type === "date" ? (
                    <tr key={`d-${block.key}`} className="bg-[#111]">
                      <td
                        colSpan={8}
                        className="px-4 py-2.5 border-y border-[#D4AF37]/15"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span
                              className="text-sm font-semibold text-[#D4AF37]"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {block.label}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-[#F5F0E8]/35">
                              Date batch
                            </span>
                          </div>
                          <span className="text-xs text-[#F5F0E8]/45">
                            {block.count}{" "}
                            {block.count === 1 ? "entry" : "entries"} that day
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr
                      key={block.row.id}
                      className="hover:bg-white/[0.02] border-b border-[#F5F0E8]/6"
                    >
                      <td className="px-4 py-3 text-xs text-[#F5F0E8]/55 whitespace-nowrap">
                        {block.row.createdAt
                          ? new Date(block.row.createdAt).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )
                          : "—"}
                      </td>
                      <td className="px-4 py-3 font-medium">{block.row.name}</td>
                      <td className="px-4 py-3 font-mono text-xs">
                        {block.row.phone}
                      </td>
                      <td className="px-4 py-3 text-xs text-[#F5F0E8]/70">
                        {block.row.profession}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {block.row.monthlyIncome}
                      </td>
                      <td className="px-4 py-3">
                        {block.row.isSerious ? (
                          <span className="text-[#D4AF37]">Yes</span>
                        ) : (
                          <span className="text-[#F5F0E8]/40">No</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs capitalize">
                        {block.row.paymentStatus === "paid" ? (
                          <span className="text-emerald-400">Paid</span>
                        ) : block.row.paymentStatus === "pending" ? (
                          <span className="text-amber-400">Pending</span>
                        ) : block.row.paymentStatus === "failed" ? (
                          <span className="text-red-400">Failed</span>
                        ) : (
                          <span className="text-[#F5F0E8]/40">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[#D4AF37] text-xs">
                        {block.row.amount > 0 ? `₹${block.row.amount}` : "—"}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          )}
        </div>

        {rows.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#D4AF37]/12 px-5 py-3">
            <p className="text-xs text-[#F5F0E8]/40">
              Page {pageBlocks.safePage} of {pageBlocks.totalPages} · showing{" "}
              {pageBlocks.sliceCount} of {rows.length} rows
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={pageBlocks.safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 rounded-lg border border-[#D4AF37]/20 px-3 py-1.5 text-xs text-[#F5F0E8]/70 disabled:opacity-35 hover:bg-white/5"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Prev
              </button>
              <button
                type="button"
                disabled={pageBlocks.safePage >= pageBlocks.totalPages}
                onClick={() =>
                  setPage((p) => Math.min(pageBlocks.totalPages, p + 1))
                }
                className="inline-flex items-center gap-1 rounded-lg border border-[#D4AF37]/20 px-3 py-1.5 text-xs text-[#F5F0E8]/70 disabled:opacity-35 hover:bg-white/5"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
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
