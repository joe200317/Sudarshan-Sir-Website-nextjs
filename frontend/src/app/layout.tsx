import type { Metadata } from "next";
import { Cinzel, DM_Sans, Orbitron } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import SiteShell from "@/components/SiteShell";
import { API_BASE } from "@/lib/api";
import { extractMetaPixelId, getMetaPixelBootstrapScript } from "@/lib/meta-pixel";
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

export const metadata: Metadata = {
  title: "Mind Trainer — Elite Mental Performance Coaching",
  description:
    "Elite mental performance coaching for leaders, athletes, and high achievers.",
};

/** Only fetched for /workshop/* routes — tagged by middleware via x-pathname. */
async function getWorkshopPixelId(pathname: string): Promise<string | null> {
  const match = pathname.match(/^\/workshop\/([^/]+)/);
  if (!match) return null;

  try {
    const res = await fetch(
      `${API_BASE}/api/workshops/by-slug/${encodeURIComponent(match[1])}`,
      { next: { revalidate: 30 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      workshop?: { metaPixelCode?: string };
    };
    const code = data.workshop?.metaPixelCode;
    return code ? extractMetaPixelId(code) : null;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const pixelId = await getWorkshopPixelId(pathname);

  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${dmSans.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#F5F0E8] m-0 p-0">
        {pixelId ? (
          <>
            {/* Meta Pixel Code — beforeInteractive guarantees <head> placement */}
            <Script
              id={`meta-pixel-${pixelId}`}
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: getMetaPixelBootstrapScript(pixelId),
              }}
            />
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        ) : null}
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
