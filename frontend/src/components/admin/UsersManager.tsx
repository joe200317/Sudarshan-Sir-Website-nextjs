"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { Plus, Shield, Trash2, X } from "lucide-react";

type Perm = { key: string; label: string; description?: string; allowed: boolean };
type UserRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  permissions: Perm[];
};

export default function UsersManager() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [rolesUser, setRolesUser] = useState<UserRow | null>(null);
  const [roles, setRoles] = useState<Perm[]>([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await apiFetch("/api/users");
      const data = await res.json();
      if (res.ok) setUsers(data.users || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await apiFetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed");
        return;
      }
      setCreateOpen(false);
      setForm({ name: "", phone: "", email: "", password: "" });
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function openRoles(user: UserRow) {
    const res = await apiFetch(`/api/users/${user.id}`);
    const data = await res.json();
    if (!res.ok) return;
    setRolesUser(data.user);
    setRoles(data.permissions);
  }

  async function saveRoles() {
    if (!rolesUser) return;
    setSaving(true);
    await apiFetch(`/api/users/${rolesUser.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ permissions: roles }),
    });
    setSaving(false);
    setRolesUser(null);
    await load();
  }

  async function deleteUser(id: string) {
    if (!confirm("Delete this user?")) return;
    await apiFetch(`/api/users/${id}`, { method: "DELETE" });
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
            Users
          </h1>
          <p className="text-sm text-[#F5F0E8]/45 mt-1">
            Create accounts — all menus enabled by default
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setError("");
            setCreateOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#0a0a0a]"
          style={{
            background: "linear-gradient(135deg, #D4AF37, #B8960C)",
          }}
        >
          <Plus className="w-4 h-4" />
          Add user
        </button>
      </div>

      <div className="rounded-xl border border-[#D4AF37]/15 bg-[#0a0a0a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[720px]">
            <thead>
              <tr className="border-b border-[#D4AF37]/12 text-[11px] uppercase tracking-wider text-[#F5F0E8]/40">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E8]/6">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-[#F5F0E8]/40">
                    Loading…
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-[#F5F0E8]/40">
                    No users yet.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-medium">{u.name}</td>
                    <td className="px-4 py-3 text-[#F5F0E8]/55">{u.email}</td>
                    <td className="px-4 py-3">{u.phone}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs ${
                          u.isActive ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {u.isActive ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => void openRoles(u)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D4AF37]/25 text-[#D4AF37] text-xs hover:bg-[#D4AF37]/10"
                        >
                          <Shield className="w-3.5 h-3.5" />
                          Roles
                        </button>
                        <button
                          type="button"
                          onClick={() => void deleteUser(u.id)}
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

      {createOpen && (
        <Modal title="Add user" onClose={() => setCreateOpen(false)}>
          <form onSubmit={createUser} className="space-y-4">
            {(
              [
                ["name", "Name", "text"],
                ["phone", "Phone", "tel"],
                ["email", "Email", "email"],
                ["password", "Password", "password"],
              ] as const
            ).map(([key, label, type]) => (
              <div key={key}>
                <label className="block text-xs uppercase tracking-wider text-[#F5F0E8]/40 mb-2">
                  {label}
                </label>
                <input
                  type={type}
                  required
                  minLength={key === "password" ? 6 : undefined}
                  value={form[key]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [key]: e.target.value }))
                  }
                  className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/40 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]/50"
                />
              </div>
            ))}
            <p className="text-xs text-[#F5F0E8]/40">
              All menu permissions will be checked by default.
            </p>
            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCreateOpen(false)}
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
                {saving ? "Creating…" : "Create"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {rolesUser && (
        <Modal
          title={`Roles — ${rolesUser.name}`}
          onClose={() => setRolesUser(null)}
        >
          <div className="space-y-3">
            {roles.map((p) => (
              <label
                key={p.key}
                className="flex items-start gap-3 rounded-lg border border-[#D4AF37]/15 px-4 py-3 cursor-pointer hover:bg-white/[0.02]"
              >
                <input
                  type="checkbox"
                  checked={p.allowed}
                  onChange={(e) =>
                    setRoles((list) =>
                      list.map((x) =>
                        x.key === p.key
                          ? { ...x, allowed: e.target.checked }
                          : x,
                      ),
                    )
                  }
                  className="mt-0.5 h-4 w-4 accent-[#D4AF37]"
                />
                <span>
                  <span className="block text-sm font-medium">{p.label}</span>
                  {p.description && (
                    <span className="text-xs text-[#F5F0E8]/40">
                      {p.description}
                    </span>
                  )}
                </span>
              </label>
            ))}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRolesUser(null)}
                className="px-4 py-2 text-sm rounded-lg border border-[#F5F0E8]/15"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void saveRoles()}
                disabled={saving}
                className="px-4 py-2 text-sm font-semibold rounded-lg text-[#0a0a0a]"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #B8960C)",
                }}
              >
                {saving ? "Saving…" : "Save roles"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#D4AF37]/20 bg-[#0a0a0a]">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/12 px-5 py-4">
          <h2
            className="text-lg font-semibold text-[#D4AF37]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          <button type="button" onClick={onClose}>
            <X className="w-5 h-5 text-[#F5F0E8]/50" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
