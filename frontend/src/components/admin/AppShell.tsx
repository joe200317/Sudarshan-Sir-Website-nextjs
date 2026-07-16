"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
  X,
  Layers,
  ExternalLink,
  Brain,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { AuthProvider, useAuth } from "@/components/admin/AuthProvider";

const GOLD = "#D4AF37";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  permission?: string;
  superOnly?: boolean;
};

function ShellInner({
  children,
  base,
  items,
  title,
}: {
  children: React.ReactNode;
  base: "/admin" | "/user";
  items: NavItem[];
  title: string;
}) {
  const pathname = usePathname();
  const { user, loading, logout, can } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37] animate-spin" />
      </div>
    );
  }

  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/admin";
    return null;
  }

  if (base === "/admin" && user.role !== "SUPER_ADMIN") {
    if (typeof window !== "undefined") {
      window.location.href = "/user/workshops";
    }
    return null;
  }

  if (base === "/user" && user.role === "SUPER_ADMIN") {
    // Super admin can still use user area if needed; allow
  }

  const visible = items.filter((item) => {
    if (item.superOnly && user.role !== "SUPER_ADMIN") return false;
    if (item.permission && !can(item.permission)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F0E8] flex">
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-svh w-64 shrink-0 border-r border-[#D4AF37]/15 bg-[#0a0a0a] flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-5 border-b border-[#D4AF37]/12">
          <Link href={base === "/admin" ? "/admin/dashboard" : "/user/workshops"} className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, #B8960C)`,
              }}
            >
              <Brain className="w-4 h-4 text-[#0a0a0a]" />
            </div>
            <div>
              <p
                className="text-sm font-bold tracking-wide text-[#D4AF37]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {title}
              </p>
              <p className="text-[10px] text-[#F5F0E8]/40 truncate max-w-[140px]">
                {user.name}
              </p>
            </div>
          </Link>
          <button
            type="button"
            className="lg:hidden p-1.5 text-[#F5F0E8]/50"
            onClick={() => setOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {visible.map(({ label, href, icon: Icon }) => {
            const active =
              pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-[#D4AF37]/12 text-[#D4AF37] border border-[#D4AF37]/25"
                    : "text-[#F5F0E8]/55 hover:text-[#F5F0E8] hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#D4AF37]/12 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#F5F0E8]/45 hover:text-[#00BFFF]"
          >
            <ExternalLink className="w-4 h-4" strokeWidth={1.75} />
            View website
          </Link>
          <button
            type="button"
            onClick={() => void logout()}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#F5F0E8]/45 hover:text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.75} />
            Log out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-[#D4AF37]/12 bg-[#050505]/90 backdrop-blur-xl px-4 py-3 lg:px-8">
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg border border-[#D4AF37]/20 text-[#D4AF37]"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <p className="text-sm text-[#F5F0E8]/45">{user.email}</p>
          <span className="ml-auto text-[10px] tracking-wider uppercase px-2 py-1 rounded border border-[#D4AF37]/25 text-[#D4AF37]">
            {user.role === "SUPER_ADMIN" ? "Super Admin" : "User"}
          </span>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

const adminItems: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
    permission: "users",
    superOnly: true,
  },
  {
    label: "Programs",
    href: "/admin/programs",
    icon: Layers,
    permission: "programs",
    superOnly: true,
  },
  {
    label: "Workshops",
    href: "/admin/workshops",
    icon: BookOpen,
    permission: "workshops",
  },
  {
    label: "Event Management",
    href: "/admin/events",
    icon: CalendarDays,
    permission: "events",
  },
  {
    label: "Contact Messages",
    href: "/admin/contact-messages",
    icon: MessageSquare,
  },
];

const userItems: NavItem[] = [
  {
    label: "Workshops",
    href: "/user/workshops",
    icon: BookOpen,
    permission: "workshops",
  },
  {
    label: "Event Management",
    href: "/user/events",
    icon: CalendarDays,
    permission: "events",
  },
  {
    label: "Contact Messages",
    href: "/user/contact-messages",
    icon: MessageSquare,
  },
];

export function AdminAppShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ShellInner base="/admin" items={adminItems} title="Super Admin">
        {children}
      </ShellInner>
    </AuthProvider>
  );
}

export function UserAppShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ShellInner base="/user" items={userItems} title="User Panel">
        {children}
      </ShellInner>
    </AuthProvider>
  );
}
