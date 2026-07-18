// Custom entry point so Next.js can run under cPanel's Node.js App (Passenger).
// Passenger injects the port to listen on via process.env.PORT — `next start`
// alone doesn't work as a Passenger startup file, so we wrap it in a plain
// http server here. Set this file as the "Application startup file" in
// cPanel's Setup Node.js App screen.
//
// It also splices the Meta Pixel bootstrap script directly before </head>
// for /workshop/* routes, since Next.js's App Router has no supported way to
// place a custom script literally inside <head> (next/script's
// "beforeInteractive" strategy queues it at the top of <body> instead, not
// physically in <head>, as of this Next.js version).
const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");

function extractMetaPixelId(input) {
  const raw = input
    .trim()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"');
  if (!raw) return null;
  if (/^\d{5,20}$/.test(raw)) return raw;

  const initMatch = raw.match(/fbq\s*\(\s*['"]init['"]\s*,\s*['"](\d{5,20})['"]\s*\)/i);
  if (initMatch && initMatch[1]) return initMatch[1];

  const queryMatch = raw.match(/[?&]id=(\d{5,20})/i);
  if (queryMatch && queryMatch[1]) return queryMatch[1];

  const loose = raw.match(/\b(\d{10,20})\b/);
  return loose ? loose[1] : null;
}

function metaPixelScriptTag(pixelId) {
  return `<script id="meta-pixel-${pixelId}">
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');
</script>`;
}

function metaPixelNoscriptTag(pixelId) {
  return `<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" /></noscript>`;
}

async function getWorkshopPixelId(pathname) {
  const match = pathname.match(/^\/workshop\/([^/?]+)/);
  if (!match) return null;

  try {
    const res = await fetch(
      `${API_BASE}/api/workshops/by-slug/${encodeURIComponent(match[1])}`,
    );
    if (!res.ok) return null;
    const data = await res.json();
    const code = data && data.workshop && data.workshop.metaPixelCode;
    return code ? extractMetaPixelId(code) : null;
  } catch {
    return null;
  }
}

function bufferChunk(chunk, encoding) {
  if (Buffer.isBuffer(chunk)) return chunk;
  return Buffer.from(chunk, typeof encoding === "string" ? encoding : undefined);
}

/**
 * Buffers the response body and injects the pixel script before </head>.
 *
 * Headers (and any Transfer-Encoding: chunked) must not reach the client
 * until we know the final, post-injection Content-Length — Next's App
 * Router streams the shell and calls res.writeHead() as soon as the first
 * bytes are ready, well before res.end(). If we let that writeHead go out
 * as-is and only patch headers inside our res.end override, the client has
 * already committed to chunked framing while we send back a single raw
 * buffer, producing a malformed response the browser aborts mid-stream.
 * So we intercept writeHead/setHeader too and hold everything back until end().
 */
function withHeadInjection(res, pixelId) {
  const chunks = [];
  const originalWrite = res.write.bind(res);
  const originalEnd = res.end.bind(res);
  const originalWriteHead = res.writeHead.bind(res);

  let pendingStatusCode = null;
  let pendingHeaders = null;

  res.writeHead = (statusCode, statusMessageOrHeaders, maybeHeaders) => {
    pendingStatusCode = statusCode;
    pendingHeaders =
      typeof statusMessageOrHeaders === "object" && statusMessageOrHeaders
        ? statusMessageOrHeaders
        : maybeHeaders || null;
    return res;
  };

  res.write = (chunk, encoding, callback) => {
    if (chunk) chunks.push(bufferChunk(chunk, encoding));
    const cb = typeof encoding === "function" ? encoding : callback;
    if (typeof cb === "function") cb();
    return true;
  };

  res.end = (chunk, encoding, callback) => {
    if (chunk && typeof chunk !== "function") {
      chunks.push(bufferChunk(chunk, encoding));
    }

    let body = Buffer.concat(chunks);
    const contentType = String(
      (pendingHeaders && (pendingHeaders["content-type"] || pendingHeaders["Content-Type"])) ||
        res.getHeader("content-type") ||
        "",
    );

    if (contentType.includes("text/html") && body.includes("</head>")) {
      let html = body.toString("utf-8");
      html = html.replace("</head>", `${metaPixelScriptTag(pixelId)}</head>`);
      html = html.replace(/(<body[^>]*>)/, `$1${metaPixelNoscriptTag(pixelId)}`);
      body = Buffer.from(html, "utf-8");
    }

    res.removeHeader("transfer-encoding");
    res.setHeader("content-length", Buffer.byteLength(body));

    if (pendingHeaders) {
      for (const key of Object.keys(pendingHeaders)) {
        if (key.toLowerCase() === "transfer-encoding" || key.toLowerCase() === "content-length") {
          delete pendingHeaders[key];
        }
      }
      pendingHeaders["content-length"] = Buffer.byteLength(body);
    }

    if (pendingStatusCode !== null) {
      originalWriteHead(pendingStatusCode, pendingHeaders || undefined);
    }

    if (body.length) originalWrite(body);
    originalEnd();

    const cb = typeof encoding === "function" ? encoding : callback;
    if (typeof cb === "function") cb();
  };
}

app.prepare().then(() => {
  createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pixelId = await getWorkshopPixelId(url.pathname);

    if (pixelId) withHeadInjection(res, pixelId);

    handle(req, res);
  }).listen(port, () => {
    console.log(`Frontend running on port ${port}`);
  });
});
