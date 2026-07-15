"use client";

import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Check,
  Image as ImageIcon,
} from "lucide-react";

type EventRow = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  createdBy: { id: string; name: string; email: string };
};

const emptyForm = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  imageUrl: "",
};

function toInputDate(iso: string) {
  return iso.slice(0, 10);
}

export default function EventManager({
  title = "Event Management",
}: {
  title?: string;
}) {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [listError, setListError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function load() {
    setLoading(true);
    setListError("");
    try {
      const res = await apiFetch("/api/events");
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setEvents(data.events || []);
      } else {
        setListError(data.error || "Failed to load events");
      }
    } catch {
      setListError("Cannot reach API. Start backend: cd backend && npm run dev");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setOpen(true);
  }

  function openEdit(ev: EventRow) {
    setEditingId(ev.id);
    setForm({
      title: ev.title,
      description: ev.description,
      startDate: toInputDate(ev.startDate),
      endDate: toInputDate(ev.endDate),
      imageUrl: ev.imageUrl,
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
      fd.append("folder", "events");
      const res = await apiFetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }
      setForm((f) => ({ ...f, imageUrl: data.url }));
    } catch {
      setError("Upload failed — is the backend running?");
    } finally {
      setUploading(false);
    }
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = editingId ? `/api/events/${editingId}` : "/api/events";
      const res = await apiFetch(url, {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Save failed");
        return;
      }
      setOpen(false);
      await load();
    } catch {
      setError("Cannot reach API. Start backend: cd backend && npm run dev");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    try {
      const res = await apiFetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) await load();
    } catch {
      alert("Cannot reach API");
    }
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold text-[#D4AF37]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h1>
          <p className="text-sm text-[#F5F0E8]/45 mt-1">
            Add events — title, dates & image (separate from workshops)
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#0a0a0a]"
          style={{
            background: "linear-gradient(135deg, #D4AF37, #B8960C)",
          }}
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {listError && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {listError}
        </p>
      )}

      <div className="rounded-xl border border-[#D4AF37]/15 bg-[#0a0a0a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[720px]">
            <thead>
              <tr className="border-b border-[#D4AF37]/12 text-[11px] uppercase tracking-wider text-[#F5F0E8]/40">
                <th className="px-4 py-3 font-medium">Image</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Dates</th>
                <th className="px-4 py-3 font-medium">Created by</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E8]/6">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-[#F5F0E8]/40"
                  >
                    Loading…
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-[#F5F0E8]/40"
                  >
                    No events yet. Click Add Event.
                  </td>
                </tr>
              ) : (
                events.map((ev) => (
                  <tr key={ev.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={ev.imageUrl}
                        alt=""
                        className="h-12 w-16 rounded object-cover border border-[#D4AF37]/15"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium max-w-[220px]">
                      <div className="truncate">{ev.title}</div>
                      {ev.description && (
                        <div className="text-xs text-[#F5F0E8]/40 truncate">
                          {ev.description}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-[#F5F0E8]/70">
                      <div>{formatDate(ev.startDate)}</div>
                      <div>{formatDate(ev.endDate)}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">{ev.createdBy.name}</div>
                      <div className="text-xs text-[#F5F0E8]/35">
                        {ev.createdBy.email}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <a
                          href={ev.imageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg border border-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                          title="View image"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => openEdit(ev)}
                          className="p-2 rounded-lg border border-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => void onDelete(ev.id)}
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
          <div className="w-full max-w-lg rounded-2xl border border-[#D4AF37]/20 bg-[#0a0a0a] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/12 px-5 py-4">
              <h2
                className="text-lg font-semibold text-[#D4AF37]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {editingId ? "Edit Event" : "Add Event"}
              </h2>
              <button type="button" onClick={() => setOpen(false)}>
                <X className="w-5 h-5 text-[#F5F0E8]/50" />
              </button>
            </div>

            <form onSubmit={onSave} className="p-5 space-y-4">
              <div>
                <label className="block text-xs tracking-wider uppercase text-[#F5F0E8]/40 mb-2">
                  Title
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/40 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]/50 text-[#F5F0E8]"
                />
              </div>

              <div>
                <label className="block text-xs tracking-wider uppercase text-[#F5F0E8]/40 mb-2">
                  Description (optional)
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={3}
                  className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/40 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]/50 text-[#F5F0E8]"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-[#F5F0E8]/40 mb-2">
                    Start date
                  </label>
                  <input
                    type="date"
                    required
                    value={form.startDate}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, startDate: e.target.value }))
                    }
                    className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/40 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]/50 text-[#F5F0E8]"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-[#F5F0E8]/40 mb-2">
                    End date
                  </label>
                  <input
                    type="date"
                    required
                    value={form.endDate}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, endDate: e.target.value }))
                    }
                    className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/40 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]/50 text-[#F5F0E8]"
                  />
                </div>
              </div>

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
                  {saving ? "Saving…" : "Save event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
