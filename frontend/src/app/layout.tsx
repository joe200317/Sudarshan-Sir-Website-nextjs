import type { Metadata } from "next";
import { Cinzel, DM_Sans, Orbitron } from "next/font/google";
import SiteShell from "@/components/SiteShell";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://sudarshanfoundation.com";
const SITE_NAME = "Trainer's World — Sudarshan Sabat";
const SITE_TITLE = "Sudarshan Sabat | India's Leading Mind Trainer & Training Company";
const SITE_DESCRIPTION =
  "Trainer's World, led by Sudarshan Sabat, is India's leading training & coaching company — mind power training, leadership development, and personal transformation programs for individuals, professionals, entrepreneurs and organizations.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Trainer's World",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Sudarshan Sabat",
    "mind trainer India",
    "Trainer's World",
    "mind power training",
    "train the trainer",
    "leadership development",
    "personality development",
    "corporate training India",
    "life coaching Mumbai",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: "Sudarshan Sabat" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/images/favicon-32.png",
    apple: "/images/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/images/logo.png", width: 1510, height: 705 }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${dmSans.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#F5F0E8] m-0 p-0">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
