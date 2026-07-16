/**
 * Accepts a raw Pixel ID or a full Meta Pixel HTML/JS snippet and returns the ID.
 */
export function extractMetaPixelId(input: string): string | null {
  const raw = input.trim().replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
  if (!raw) return null;

  if (/^\d{5,20}$/.test(raw)) return raw;

  const initMatch = raw.match(
    /fbq\s*\(\s*['"]init['"]\s*,\s*['"](\d{5,20})['"]\s*\)/i,
  );
  if (initMatch?.[1]) return initMatch[1];

  const queryMatch = raw.match(/[?&]id=(\d{5,20})/i);
  if (queryMatch?.[1]) return queryMatch[1];

  const loose = raw.match(/\b(\d{10,20})\b/);
  return loose?.[1] ?? null;
}

/** Exact Meta base snippet — must appear in initial HTML for Events Manager “Setup Event”. */
export function getMetaPixelBootstrapScript(pixelId: string): string {
  const id = pixelId.replace(/[^\d]/g, "");
  return `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${id}');
fbq('track', 'PageView');
`.trim();
}

type FbqFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: FbqFn & {
      callMethod?: FbqFn;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
    };
    _fbq?: Window["fbq"];
  }
}

/**
 * Fire a Meta event without blocking the UI / redirect.
 * fbq queues calls even before fbevents.js finishes — safe for Meta console.
 */
export function trackMetaEvent(
  event: string,
  params?: Record<string, unknown>,
  options?: { custom?: boolean },
) {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.fbq === "function") {
      if (options?.custom) {
        window.fbq("trackCustom", event, params);
      } else {
        window.fbq("track", event, params);
      }
      return;
    }
  } catch {
    // ignore — never block redirect
  }

  // Short non-blocking retry if stub not ready yet (Meta tool / slow network)
  let tries = 0;
  const timer = window.setInterval(() => {
    tries += 1;
    try {
      if (typeof window.fbq === "function") {
        if (options?.custom) {
          window.fbq("trackCustom", event, params);
        } else {
          window.fbq("track", event, params);
        }
        window.clearInterval(timer);
        return;
      }
    } catch {
      window.clearInterval(timer);
      return;
    }
    if (tries >= 15) window.clearInterval(timer);
  }, 50);
}
