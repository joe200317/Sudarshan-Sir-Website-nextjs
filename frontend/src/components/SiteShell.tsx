"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BARE_PREFIXES = ["/landing", "/4days"];

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBare = BARE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (isBare) {
    return <div className="flex-1 flex flex-col">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </>
  );
}
