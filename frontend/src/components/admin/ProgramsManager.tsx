"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

type Program = {
  id: string;
  title: string;
  slug: string;
  description: string;
  isActive: boolean;
};

export default function ProgramsManager() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await apiFetch("/api/programs/all");
      const data = await res.json();
      if (res.ok) setPrograms(data.programs || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await apiFetch("/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed");
        return;
      }
      setOpen(false);
      setForm({ title: "", description: "" });
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this program?")) return;
    const res = await apiFetch(`/api/programs/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Could not delete");
      return;
    }
    await load();
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold text-[#D4AF37]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Programs
          </h1>
          <p className="text-sm text-[#F5F0E8]/45 mt-1">
            Programs appear in the workshop “Select program” dropdown
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setError("");
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#0a0a0a]"
          style={{
            background: "linear-gradient(135deg, #D4AF37, #B8960C)",
          }}
        >
          <Plus className="w-4 h-4" />
          Add program
        </button>
      </div>

      <div className="rounded-xl border border-[#D4AF37]/15 bg-[#0a0a0a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[520px]">
            <thead>
              <tr className="border-b border-[#D4AF37]/12 text-[11px] uppercase tracking-wider text-[#F5F0E8]/40">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E8]/6">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-4 py-10 text-center text-[#F5F0E8]/40">
                    Loading…
                  </td>
                </tr>
              ) : programs.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-10 text-center text-[#F5F0E8]/40">
                    No programs yet.
                  </td>
                </tr>
              ) : (
                programs.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-medium">{p.title}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs ${
                          p.isActive ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {p.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => void onDelete(p.id)}
                          className="p-2 rounded-lg border border-red-500/20 text-red-400"
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
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#D4AF37]/20 bg-[#0a0a0a]">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/12 px-5 py-4">
              <h2
                className="text-lg font-semibold text-[#D4AF37]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Add program
              </h2>
              <button type="button" onClick={() => setOpen(false)}>
                <X className="w-5 h-5 text-[#F5F0E8]/50" />
              </button>
            </div>
            <form onSubmit={onCreate} className="p-5 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#F5F0E8]/40 mb-2">
                  Title
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/40 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#F5F0E8]/40 mb-2">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={3}
                  className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/40 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm rounded-lg border border-[#F5F0E8]/15"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 text-sm font-semibold rounded-lg text-[#0a0a0a]"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #B8960C)",
                  }}
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
