const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:4000";

/** Calls Express API (MongoDB backend) with cookies */
export async function apiFetch(path: string, init?: RequestInit) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE}${clean.startsWith("/api") ? clean : `/api${clean}`}`;

  const headers = new Headers(init?.headers);
  if (
    init?.body &&
    !(init.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(url, {
    ...init,
    headers,
    credentials: "include",
  });
}

export { API_BASE };
