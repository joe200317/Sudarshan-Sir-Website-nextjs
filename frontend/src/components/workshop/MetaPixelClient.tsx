"use client";

import { useEffect } from "react";
import { extractMetaPixelId, getMetaPixelBootstrapScript } from "@/lib/meta-pixel";

/**
 * Client safety net: if the server script was blocked/stripped, re-inject
 * so Meta Pixel Helper / Setup Event still see fbq on the page.
 */
export default function MetaPixelClient({ code }: { code: string }) {
  const pixelId = extractMetaPixelId(code);

  useEffect(() => {
    if (!pixelId || typeof window === "undefined") return;

    // Server snippet already installed fbq — nothing else to do
    if (typeof window.fbq === "function") return;

    const el = document.createElement("script");
    el.setAttribute("data-meta-pixel", pixelId);
    el.text = getMetaPixelBootstrapScript(pixelId);
    document.head.appendChild(el);
  }, [pixelId]);

  return null;
}
