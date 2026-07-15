"use client";

import Link from "next/link";
import { useAuth } from "@/components/admin/AuthProvider";
import { BookOpen, CalendarDays, Layers, Users } from "lucide-react";

export default function AdminDashboardPage() {
  const { user, can } = useAuth();

  const cards = [
    {
      label: "Users",
      href: "/admin/users",
      icon: Users,
      show: can("users"),
    },
    {
      label: "Programs",
      href: "/admin/programs",
      icon: Layers,
      show: can("programs"),
    },
    {
      label: "Workshops",
      href: "/admin/workshops",
      icon: BookOpen,
      show: can("workshops"),
    },
    {
      label: "Events",
      href: "/admin/events",
      icon: CalendarDays,
      show: can("events"),
    },
  ].filter((c) => c.show);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1
          className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Welcome, {user?.name}
        </h1>
        <p className="text-sm text-[#F5F0E8]/45">
          Super admin control panel — manage users, programs, workshops & events
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl border border-[#D4AF37]/15 bg-[#0a0a0a] p-5 hover:border-[#D4AF37]/35 transition-colors"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/10">
              <Icon className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.75} />
            </div>
            <p
              className="font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
