// Custom entry point so Next.js can run under cPanel's Node.js App (Passenger).
// Passenger injects the port to listen on via process.env.PORT — `next start`
// alone doesn't work as a Passenger startup file, so we wrap it in a plain
// http server here. Set this file as the "Application startup file" in
// cPanel's Setup Node.js App screen.
//
// Workshop landing pages (/workshop/*) are duplicated to a static HTML file
// on disk, with the exact Meta Pixel and/or Google Tag Manager code an admin
// pasted spliced into the page (byte-for-byte, we don't rewrite it) — like a
// frozen, standalone copy
// of the page instead of one re-rendered by Next on every visit. The React
// component/design that produces the page is untouched; we just capture its
// output once. Every request for that slug after that is served straight
// from disk (plain Content-Length, no Next.js involved).
//
// The backend calls POST /__internal/regenerate-workshop right after a
// workshop is created/edited/deleted, so the duplicate is rebuilt
// immediately — not lazily on whatever visitor happens by next.
const { createServer } = require("http");
const { promises: fs } = require("fs");
const path = require("path");
const zlib = require("zlib");
const next = require("next");

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");

const REGENERATE_SECRET = process.env.WORKSHOP_CACHE_SECRET || "";

const CACHE_DIR = path.join(__dirname, ".workshop-cache");

function cachePathForSlug(slug) {
  const safe = String(slug).replace(/[^a-zA-Z0-9_-]/g, "");
  return path.join(CACHE_DIR, `${safe}.html`);
}

const GZIP_MAGIC = Buffer.from([0x1f, 0x8b]);

/**
 * Reads the cached file for a slug. If it's already gzip-compressed (from a
 * cache written before compression was handled centrally in this file — a
 * real leftover we hit in production), it's corrupt for our purposes: we'd
 * double-compress it on top when serving to a gzip-accepting client, which
 * browsers can't decode. Self-heal by discarding it so the caller treats
 * this as a cache miss and regenerates a clean, plain-HTML copy.
 */
async function readCachedPage(slug) {
  try {
    const body = await fs.readFile(cachePathForSlug(slug));
    if (body.length >= 2 && body.subarray(0, 2).equals(GZIP_MAGIC)) {
      await deleteCachedPage(slug);
      return null;
    }
    return body;
  } catch {
    return null;
  }
}

async function writeCachedPage(slug, body) {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(cachePathForSlug(slug), body);
}

async function deleteCachedPage(slug) {
  try {
    await fs.unlink(cachePathForSlug(slug));
  } catch {
    // no cached file yet — nothing to do
  }
}

/** Splits a pasted Meta snippet into its <head> script part and <body> noscript part. */
/**
 * Splits a pasted snippet into its <head> script part and <body> noscript
 * part. Handles multiple tags pasted together (e.g. Meta Pixel + Google Tag
 * Manager in the same box) — every <noscript> block found is pulled out and
 * moved to <body>, not just the first one.
 */
function splitPixelCode(rawCode) {
  const noscriptBlocks = rawCode.match(/<noscript[\s\S]*?<\/noscript>/gi) || [];
  const headPart = rawCode.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  return { headPart: headPart.trim(), noscript: noscriptBlocks.join("\n") };
}

/** Bare numeric ID (or fbq('init', 'ID') fragment) — wrap in the standard Meta boilerplate. */
function extractMetaPixelId(input) {
  const raw = input
    .trim()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"');
  if (!raw) return null;
  if (/^\d{5,20}$/.test(raw)) return raw;

  const initMatch = raw.match(/fbq\s*\(\s*['"]init['"]\s*,\s*['"](\d{5,20})['"]\s*\)/i);
  if (initMatch && initMatch[1]) return initMatch[1];

  const loose = raw.match(/\b(\d{10,20})\b/);
  return loose ? loose[1] : null;
}

function standardPixelSnippet(pixelId) {
  return {
    headPart: `<script id="meta-pixel-${pixelId}">
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
</script>`,
    noscript: `<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" /></noscript>`,
  };
}

/** Resolves a pasted metaPixelCode value into {headPart, noscript} to splice into the page. */
function resolvePixelParts(rawCode) {
  const text = String(rawCode || "").trim();
  if (!text) return null;
  if (/<script|<noscript/i.test(text)) return splitPixelCode(text);
  const id = extractMetaPixelId(text);
  return id ? standardPixelSnippet(id) : null;
}

/** Merges the resolved Meta Pixel and GTM parts into one {headPart, noscript} to splice in. */
function combinePixelParts(partsList) {
  const present = partsList.filter(Boolean);
  if (!present.length) return null;
  return {
    headPart: present.map((p) => p.headPart).filter(Boolean).join("\n"),
    noscript: present.map((p) => p.noscript).filter(Boolean).join("\n"),
  };
}

async function fetchWorkshopScripts(slug) {
  try {
    const res = await fetch(
      `${API_BASE}/api/workshops/by-slug/${encodeURIComponent(slug)}`,
    );
    if (!res.ok) return { metaPixelCode: null, gtmCode: null };
    const data = await res.json();
    const workshop = (data && data.workshop) || {};
    return {
      metaPixelCode: workshop.metaPixelCode || null,
      gtmCode: workshop.gtmCode || null,
    };
  } catch {
    return { metaPixelCode: null, gtmCode: null };
  }
}

function bufferChunk(chunk, encoding) {
  if (Buffer.isBuffer(chunk)) return chunk;
  return Buffer.from(chunk, typeof encoding === "string" ? encoding : undefined);
}

/**
 * Buffers a full Next.js response, splices in the pixel code exactly as
 * pasted, and hands the final buffer to `onBody` (used to cache it to disk)
 * before flushing it to the client.
 *
 * Headers (and any Transfer-Encoding: chunked) must not reach the client
 * until we know the final, post-injection Content-Length — Next's App
 * Router streams the shell and calls res.writeHead() as soon as the first
 * bytes are ready, well before res.end(). If we let that writeHead go out
 * as-is and only patch headers inside our res.end override, the client has
 * already committed to chunked framing while we send back a single raw
 * buffer, producing a malformed response the browser aborts mid-stream.
 * So we intercept writeHead/setHeader too and hold everything back until end().
 *
 * The caller strips the real request's Accept-Encoding before invoking Next
 * (see the request handler below) so what we buffer here is always plain
 * text — otherwise an already-gzipped chunk wouldn't contain a literal
 * "</head>" to splice into, and a raw gzip buffer would get cached to disk
 * as if it were HTML. `clientAcceptEncoding` is the real value, used to
 * gzip the *final* response ourselves before it reaches the browser.
 */
function withHeadInjection(res, pixelParts, onBody, clientAcceptEncoding) {
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
    const isHtml = contentType.includes("text/html");

    if (isHtml && body.includes("</head>")) {
      let html = body.toString("utf-8");
      html = html.replace("</head>", `${pixelParts.headPart}</head>`);
      if (pixelParts.noscript) {
        html = html.replace(/(<body[^>]*>)/, `$1${pixelParts.noscript}`);
      }
      body = Buffer.from(html, "utf-8");
    }

    // Cache the plain (uncompressed) body — compression below is only for
    // what actually goes out on this specific response.
    if (isHtml && pendingStatusCode === 200 && onBody) onBody(body);

    let outBody = body;
    const wantsGzip = isHtml && /\bgzip\b/.test(String(clientAcceptEncoding || ""));
    if (wantsGzip) outBody = zlib.gzipSync(body);

    res.removeHeader("transfer-encoding");
    res.setHeader("content-length", Buffer.byteLength(outBody));
    if (wantsGzip) res.setHeader("content-encoding", "gzip");
    else res.removeHeader("content-encoding");

    if (pendingHeaders) {
      for (const key of Object.keys(pendingHeaders)) {
        const lower = key.toLowerCase();
        if (lower === "transfer-encoding" || lower === "content-length" || lower === "content-encoding") {
          delete pendingHeaders[key];
        }
      }
      pendingHeaders["content-length"] = Buffer.byteLength(outBody);
      if (wantsGzip) pendingHeaders["content-encoding"] = "gzip";
    }

    if (pendingStatusCode !== null) {
      originalWriteHead(pendingStatusCode, pendingHeaders || undefined);
    }

    if (outBody.length) originalWrite(outBody);
    originalEnd();

    const cb = typeof encoding === "function" ? encoding : callback;
    if (typeof cb === "function") cb();
  };
}

/**
 * Serves the cached HTML with an encoding that matches whatever we declare.
 * Some layer in front of this app (nginx/cPanel) has been observed adding a
 * "Content-Encoding: gzip" response header whenever the client sends
 * "Accept-Encoding: gzip" without actually compressing the body — the
 * browser then tries to gunzip plain text and shows garbage. Compressing it
 * ourselves and setting the header explicitly keeps the bytes and the
 * header truthful regardless of what that front layer does (it won't
 * re-encode a response that already declares Content-Encoding).
 */
function serveCachedHtml(req, res, body) {
  const acceptEncoding = String(req.headers["accept-encoding"] || "");
  res.statusCode = 200;
  res.setHeader("content-type", "text/html; charset=utf-8");
  res.setHeader("x-workshop-cache", "hit");

  if (/\bgzip\b/.test(acceptEncoding)) {
    const compressed = zlib.gzipSync(body);
    res.setHeader("content-encoding", "gzip");
    res.setHeader("content-length", compressed.length);
    res.end(compressed);
  } else {
    res.setHeader("content-length", Buffer.byteLength(body));
    res.end(body);
  }
}

/**
 * Regenerates a workshop's cached page by dropping the stale file and making
 * a real loopback HTTP request to our own /workshop/<slug> route — that
 * request goes through the exact same render + splice + cache path a real
 * visitor's would, so there's no separate rendering code path to keep in
 * sync.
 */
async function generateWorkshopPage(slug) {
  await deleteCachedPage(slug);
  // accept-encoding: identity ensures Next renders/returns plain HTML here,
  // so what we cache to disk is always uncompressed — compression for real
  // visitors happens separately in serveCachedHtml, where we control it.
  await fetch(`http://127.0.0.1:${port}/workshop/${encodeURIComponent(slug)}`, {
    headers: { host: "127.0.0.1", "accept-encoding": "identity" },
  });
}

async function handleRegenerate(req, res) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  let payload = {};
  try {
    payload = JSON.parse(Buffer.concat(chunks).toString("utf-8") || "{}");
  } catch {
    // ignore malformed body
  }

  const providedSecret = req.headers["x-invalidate-secret"] || payload.secret;
  if (!REGENERATE_SECRET || providedSecret !== REGENERATE_SECRET) {
    res.statusCode = 401;
    res.end("unauthorized");
    return;
  }

  const slugs = Array.isArray(payload.slugs)
    ? payload.slugs
    : payload.slug
      ? [payload.slug]
      : [];
  const unique = [...new Set(slugs.filter(Boolean))];

  await Promise.all(
    unique.map((slug) => generateWorkshopPage(slug).catch(() => deleteCachedPage(slug))),
  );

  res.statusCode = 200;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify({ ok: true, regenerated: unique }));
}

app.prepare().then(() => {
  createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === "/__internal/regenerate-workshop" && req.method === "POST") {
      await handleRegenerate(req, res);
      return;
    }

    const workshopMatch = url.pathname.match(/^\/workshop\/([^/?]+)\/?$/);
    if (workshopMatch) {
      const cached = await readCachedPage(workshopMatch[1]);
      if (cached) {
        serveCachedHtml(req, res, cached);
        return;
      }

      const scripts = await fetchWorkshopScripts(workshopMatch[1]);
      const pixelParts = combinePixelParts([
        resolvePixelParts(scripts.metaPixelCode),
        resolvePixelParts(scripts.gtmCode),
      ]);
      if (pixelParts) {
        const clientAcceptEncoding = req.headers["accept-encoding"];
        // Stop Next from compressing what we're about to buffer/splice —
        // see the withHeadInjection doc comment for why.
        req.headers["accept-encoding"] = "identity";
        withHeadInjection(
          res,
          pixelParts,
          (body) => {
            void writeCachedPage(workshopMatch[1], body);
          },
          clientAcceptEncoding,
        );
      }
    }

    handle(req, res);
  }).listen(port, () => {
    console.log(`Frontend running on port ${port}`);
  });
});
