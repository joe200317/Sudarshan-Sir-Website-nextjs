"use client";

import { useEffect, useState } from "react";
import { Eye, Loader2, Mail, Trash2, X } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/utils";

type ContactMessageRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
};

export default function ContactMessagesManager() {
  const [messages, setMessages] = useState<ContactMessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<ContactMessageRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await apiFetch("/api/contact-messages");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load messages");
        setMessages([]);
        return;
      }
      setMessages(data.messages || []);
    } catch {
      setError("Failed to load messages");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function deleteMessage(id: string) {
    if (!confirm("Delete this contact message?")) return;
    setDeletingId(id);
    try {
      const res = await apiFetch(`/api/contact-messages/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to delete");
        return;
      }
      if (selected?.id === id) setSelected(null);
      await load();
    } finally {
      setDeletingId(null);
    }
  }

  function formatTime(iso?: string) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1
          className="text-2xl md:text-3xl font-bold text-[#D4AF37]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Contact Messages
        </h1>
        <p className="text-sm text-[#F5F0E8]/45 mt-1">
          Messages submitted from the website contact form
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-400 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
          {error}
        </p>
      )}

      <div className="rounded-xl border border-[#D4AF37]/15 bg-[#0a0a0a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[720px]">
            <thead>
              <tr className="border-b border-[#D4AF37]/12 text-[11px] uppercase tracking-wider text-[#F5F0E8]/40">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E8]/6">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-[#F5F0E8]/40"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading…
                    </span>
                  </td>
                </tr>
              ) : messages.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-[#F5F0E8]/40"
                  >
                    No contact messages yet.
                  </td>
                </tr>
              ) : (
                messages.map((m) => (
                  <tr key={m.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 whitespace-nowrap text-[#F5F0E8]/55">
                      <div>{formatDate(m.createdAt)}</div>
                      <div className="text-xs text-[#F5F0E8]/35">
                        {formatTime(m.createdAt)}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{m.name}</td>
                    <td className="px-4 py-3 text-[#F5F0E8]/55">
                      <a
                        href={`mailto:${m.email}`}
                        className="hover:text-[#D4AF37] inline-flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        {m.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-[#F5F0E8]/65 max-w-xs">
                      <p className="line-clamp-2">{m.message}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelected(m)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D4AF37]/25 text-[#D4AF37] text-xs hover:bg-[#D4AF37]/10"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === m.id}
                          onClick={() => void deleteMessage(m.id)}
                          className="p-2 rounded-lg border border-red-500/20 text-red-400 disabled:opacity-50"
                        >
                          {deletingId === m.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
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

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/70"
            onClick={() => setSelected(null)}
          />
          <div className="relative w-full max-w-lg rounded-xl border border-[#D4AF37]/20 bg-[#0a0a0a] p-6 shadow-xl">
            <div className="flex items-start justify-between gap-3 mb-5">
              <div>
                <h2
                  className="text-lg font-bold text-[#D4AF37]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Message details
                </h2>
                <p className="text-xs text-[#F5F0E8]/40 mt-1">
                  {formatDate(selected.createdAt)}
                  {formatTime(selected.createdAt)
                    ? ` · ${formatTime(selected.createdAt)}`
                    : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="p-1.5 rounded-lg text-[#F5F0E8]/45 hover:text-[#F5F0E8] hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#F5F0E8]/40 mb-1">
                  Name
                </p>
                <p className="font-medium">{selected.name}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#F5F0E8]/40 mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${selected.email}`}
                  className="text-[#D4AF37] hover:underline"
                >
                  {selected.email}
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#F5F0E8]/40 mb-1">
                  Message
                </p>
                <p className="text-[#F5F0E8]/75 whitespace-pre-wrap leading-relaxed">
                  {selected.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
