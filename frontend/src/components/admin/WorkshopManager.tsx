"use client";

import { apiFetch } from "@/lib/api";
import { formatDate, slugify } from "@/lib/utils";
import { WORKSHOP_PROGRAMS } from "@/data/workshop-programs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, X, Upload, Check, ExternalLink } from "lucide-react";
import WorkshopRegistrationsReport, {
  ViewRegistrationsButton,
} from "@/components/admin/WorkshopRegistrationsReport";

type Program = { slug: string; title: string };
type Workshop = {
  id: string;
  programSlug: string;
  slug: string;
  startDate: string;
  endDate: string;
  eventDate: string;
  fees: number | null;
  location: string;
  notificationEmail: string;
  metaPixelCode: string;
  includePayment: boolean;
  imageUrl: string;
  program: Program;
  createdBy: { id: string; name: string; email: string };
};

const emptyForm = {
  programSlug: "",
  slug: "",
  startDate: "",
  endDate: "",
  eventDate: "",
  fees: "",
  location: "",
  notificationEmail: "",
  metaPixelCode: "",
  includePayment: false,
  imageUrl: "",
};

function toInputDate(iso: string) {
  return iso.slice(0, 10);
}

export default function WorkshopManager({
  title = "Workshops",
  canCreate = true,
}: {
  title?: string;
  /** Super admin can view but not create workshops */
  canCreate?: boolean;
}) {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [reportWorkshop, setReportWorkshop] = useState<Workshop | null>(null);

  async function load() {
    setLoading(true);
    try {
      const wRes = await apiFetch("/api/workshops");
      const wData = await wRes.json();
      if (wRes.ok) setWorkshops(wData.workshops || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function openCreate() {
    if (!canCreate) return;
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setOpen(true);
  }

  function openEdit(w: Workshop) {
    setEditingId(w.id);
    setForm({
      programSlug: w.programSlug || w.program?.slug || "",
      slug: w.slug || "",
      startDate: toInputDate(w.startDate),
      endDate: toInputDate(w.endDate),
      eventDate: toInputDate(w.eventDate || w.startDate),
      fees: w.fees != null ? String(w.fees) : "",
      location: w.location,
      notificationEmail: w.notificationEmail,
      metaPixelCode: w.metaPixelCode,
      includePayment: w.includePayment,
      imageUrl: w.imageUrl,
    });
    setError("");
    setOpen(true);
  }

  async function onUpload(file: File) {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await apiFetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }
      setForm((f) => ({ ...f, imageUrl: data.url }));
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        fees: form.fees === "" ? null : Number(form.fees),
      };
      const url = editingId
        ? `/api/workshops/${editingId}`
        : "/api/workshops";
      const res = await apiFetch(url, {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Save failed");
        return;
      }
      setOpen(false);
      await load();
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this workshop?")) return;
    const res = await apiFetch(`/api/workshops/${id}`, { method: "DELETE" });
    if (res.ok) await load();
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold text-[#D4AF37]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h1>
          <p className="text-sm text-[#F5F0E8]/45 mt-1">
            {canCreate
              ? "Add workshops — pick Train The Trainer or Life Counselling"
              : "All workshops created by users (view only — users add workshops)"}
          </p>
        </div>
        {canCreate && (
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#0a0a0a]"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #B8960C)",
            }}
          >
            <Plus className="w-4 h-4" />
            Add Workshop
          </button>
        )}
      </div>

      <div className="rounded-xl border border-[#D4AF37]/15 bg-[#0a0a0a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-[#D4AF37]/12 text-[11px] uppercase tracking-wider text-[#F5F0E8]/40">
                <th className="px-4 py-3 font-medium">Program</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Start / End</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Fees</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E8]/6">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-[#F5F0E8]/40">
                    Loading…
                  </td>
                </tr>
              ) : workshops.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-[#F5F0E8]/40">
                    {canCreate
                      ? "No workshops yet. Click Add Workshop."
                      : "No workshops yet."}
                  </td>
                </tr>
              ) : (
                workshops.map((w) => (
                  <tr key={w.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-medium">
                      <div>{w.program?.title || w.programSlug}</div>
                      <Link
                        href={`/workshop/${w.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-[11px] text-[#00BFFF] hover:underline mt-0.5"
                      >
                        Open page <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[#F5F0E8]/55">
                      {w.slug}
                    </td>
                    <td className="px-4 py-3 text-xs text-[#F5F0E8]/70">
                      <div>{formatDate(w.startDate)}</div>
                      <div>{formatDate(w.endDate)}</div>
                    </td>
                    <td className="px-4 py-3">{w.location}</td>
                    <td className="px-4 py-3 text-[#D4AF37]">
                      {w.fees != null ? `₹${w.fees}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <ViewRegistrationsButton
                          onClick={() => setReportWorkshop(w)}
                        />
                        {canCreate && (
                          <button
                            type="button"
                            onClick={() => openEdit(w)}
                            className="p-2 rounded-lg border border-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => void onDelete(w.id)}
                          className="p-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/70 p-4 py-10">
          <div className="w-full max-w-2xl rounded-2xl border border-[#D4AF37]/20 bg-[#0a0a0a] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/12 px-5 py-4">
              <h2
                className="text-lg font-semibold text-[#D4AF37]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {editingId ? "Edit Workshop" : "Add Workshop"}
              </h2>
              <button type="button" onClick={() => setOpen(false)}>
                <X className="w-5 h-5 text-[#F5F0E8]/50" />
              </button>
            </div>

            <form onSubmit={onSave} className="p-5 space-y-4">
              <div>
                <label className="block text-xs tracking-wider uppercase text-[#F5F0E8]/40 mb-2">
                  Select program
                </label>
                <select
                  value={form.programSlug}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, programSlug: e.target.value }))
                  }
                  className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/40 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]/50 text-[#F5F0E8]"
                  required
                >
                  <option value="">Choose program…</option>
                  {WORKSHOP_PROGRAMS.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs tracking-wider uppercase text-[#F5F0E8]/40 mb-2">
                  Slug (unique URL)
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, slug: slugify(e.target.value) }))
                  }
                  placeholder="e.g. mumbai-ttt-july"
                  className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/40 px-4 py-3 text-sm font-mono outline-none focus:border-[#D4AF37]/50 text-[#F5F0E8]"
                  required
                />
                {form.slug ? (
                  <p className="mt-1.5 text-[11px] text-[#00BFFF]/80">
                    Page: /workshop/{form.slug}
                  </p>
                ) : (
                  <p className="mt-1.5 text-[11px] text-[#F5F0E8]/35">
                    Must be unique — page opens at /workshop/your-slug
                  </p>
                )}
              </div>

              <Field
                label="Fees (optional)"
                type="number"
                value={form.fees}
                onChange={(v) => setForm((f) => ({ ...f, fees: v }))}
              />

              <div className="grid sm:grid-cols-3 gap-4">
                <Field
                  label="Start date"
                  type="date"
                  value={form.startDate}
                  onChange={(v) => setForm((f) => ({ ...f, startDate: v }))}
                  required
                />
                <Field
                  label="End date"
                  type="date"
                  value={form.endDate}
                  onChange={(v) => setForm((f) => ({ ...f, endDate: v }))}
                  required
                />
                <Field
                  label="Event date"
                  type="date"
                  value={form.eventDate}
                  onChange={(v) => setForm((f) => ({ ...f, eventDate: v }))}
                  required
                />
              </div>

              <Field
                label="Location"
                value={form.location}
                onChange={(v) => setForm((f) => ({ ...f, location: v }))}
                required
              />
              <Field
                label="Notification email"
                type="email"
                value={form.notificationEmail}
                onChange={(v) =>
                  setForm((f) => ({ ...f, notificationEmail: v }))
                }
                required
              />
              <div>
                <label className="block text-xs tracking-wider uppercase text-[#F5F0E8]/40 mb-2">
                  Meta Pixel ID / code
                </label>
                <textarea
                  value={form.metaPixelCode}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, metaPixelCode: e.target.value }))
                  }
                  rows={3}
                  className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/40 px-4 py-3 text-xs font-mono outline-none focus:border-[#D4AF37]/50 text-[#F5F0E8]"
                  placeholder="Pixel ID (e.g. 28359733993614251) or paste full Meta Pixel snippet"
                />
                <p className="mt-1.5 text-[11px] text-[#F5F0E8]/35">
                  Per landing page. Injected only on that workshop&apos;s{" "}
                  <span className="font-mono">/workshop/slug</span> URL. CTA +
                  form/payment events fire automatically.
                </p>
              </div>

              <label className="flex items-center gap-3 rounded-lg border border-[#D4AF37]/15 px-4 py-3 cursor-pointer hover:bg-white/[0.02]">
                <input
                  type="checkbox"
                  checked={form.includePayment}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      includePayment: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-[#D4AF37]"
                />
                <span className="text-sm">Include payment</span>
              </label>

              <div>
                <label className="block text-xs tracking-wider uppercase text-[#F5F0E8]/40 mb-2">
                  Image
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 rounded-lg border border-[#D4AF37]/25 px-4 py-2.5 text-sm text-[#D4AF37] cursor-pointer hover:bg-[#D4AF37]/10">
                    <Upload className="w-4 h-4" />
                    {uploading ? "Uploading…" : "Choose image"}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void onUpload(file);
                      }}
                    />
                  </label>
                  {form.imageUrl && (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Image ready
                    </span>
                  )}
                </div>
                {form.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="mt-3 h-28 w-auto rounded-lg border border-[#D4AF37]/15 object-cover"
                  />
                )}
              </div>

              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 text-sm rounded-lg border border-[#F5F0E8]/15"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !form.imageUrl}
                  className="px-5 py-2.5 text-sm font-semibold rounded-lg text-[#0a0a0a] disabled:opacity-50"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #B8960C)",
                  }}
                >
                  {saving ? "Saving…" : "Save workshop"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {reportWorkshop && (
        <WorkshopRegistrationsReport
          open={Boolean(reportWorkshop)}
          onClose={() => setReportWorkshop(null)}
          workshopSlug={reportWorkshop.slug}
          workshopTitle={
            reportWorkshop.program?.title || reportWorkshop.programSlug
          }
        />
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs tracking-wider uppercase text-[#F5F0E8]/40 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/40 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]/50 text-[#F5F0E8]"
        required={required}
      />
    </div>
  );
}
