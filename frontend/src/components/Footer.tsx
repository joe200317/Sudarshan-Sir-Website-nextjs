"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const GOLD = "#D4AF37";

const quickLinksLeft = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Awards", href: "/awards" },
];

const quickLinksRight = [
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const pathname = usePathname();
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/user") ||
    pathname?.startsWith("/create-super-admin")
  ) {
    return null;
  }

  return (
    <footer className="mt-auto bg-[#000000] border-t border-[#F5F0E8]/8 pb-0 mb-0">
      <div className="container pt-10 md:pt-12 pb-8 md:pb-10">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8 mb-8 md:mb-12">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <span className="relative w-9 h-9 shrink-0">
                <Image
                  src="/images/logo-mark.png"
                  alt="Trainer's World"
                  fill
                  className="object-contain"
                  sizes="36px"
                />
              </span>
              <span
                className="text-[#F5F0E8] text-lg font-semibold tracking-wider"
                style={{ fontFamily: "var(--font-display)" }}
              >
                TRAINER&apos;S WORLD
              </span>
            </Link>
            <p className="text-[#F5F0E8]/45 text-sm leading-relaxed max-w-xs">
              India&apos;s leading training &amp; coaching company — helping
              individuals, professionals and organizations unlock their true
              potential.
            </p>
          </div>

          <div>
            <h4
              className="text-[#F5F0E8] text-sm tracking-[0.15em] mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              QUICK LINKS
            </h4>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 md:gap-12">
              <ul className="flex flex-col gap-3">
                {quickLinksLeft.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#F5F0E8]/45 text-sm hover:text-[#D4AF37] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-3">
                {quickLinksRight.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#F5F0E8]/45 text-sm hover:text-[#D4AF37] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4
              className="text-[#F5F0E8] text-sm tracking-[0.15em] mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              MANTRA
            </h4>
            <p className="text-[#F5F0E8]/45 text-sm italic leading-relaxed mb-4">
              &ldquo;The mind is a universe. We help you explore it.&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: GOLD }}
              />
              <span
                className="text-[#D4AF37] text-xs tracking-[0.2em]"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                EST. 2019
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-[#F5F0E8]/10 bg-[#000000]">
        <div className="container py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#F5F0E8]/35 text-xs text-center sm:text-left">
            © 2025 Mind Trainer. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-[#F5F0E8]/35 text-xs hover:text-[#D4AF37] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-[#F5F0E8]/35 text-xs hover:text-[#D4AF37] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
