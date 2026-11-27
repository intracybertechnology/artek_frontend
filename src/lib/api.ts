/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  JSON API CLIENT
 *
 *  Small fetch wrapper for the backend at VITE_API_URL (set it in .env.local;
 *  defaults to http://localhost:5000 for local development).
 *
 *    1. Every request sends `credentials: "include"` so the httpOnly
 *       session cookie travels with it.
 *    2. POST bodies are JSON; responses are parsed as JSON.
 *    3. A non-OK response throws an Error carrying the server's message
 *       (body.error / body.message) with the HTTP status attached.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Backend origin — exported so image paths served by the API (e.g. /uploads/…) can be prefixed. */
export const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

export type ApiError = Error & { status?: number };

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    ...init,
  });

  const body = await res.json().catch(() => ({}) as Record<string, unknown>);
  if (!res.ok) {
    const err: ApiError = new Error(
      (body.error as string) || (body.message as string) || `Request failed (${res.status})`,
    );
    err.status = res.status;
    throw err;
  }
  return body as T;
}

/** GET `${BASE}${path}` as JSON. */
export const apiGet = <T>(path: string): Promise<T> => request<T>(path);

/** GET `${BASE}${path}` with query params as JSON. */
export const apiGetQ = <T>(path: string, params: Record<string, string | number | undefined>): Promise<T> => {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") q.set(k, String(v));
  }
  const qs = q.toString();
  return request<T>(qs ? `${path}?${qs}` : path);
};

/** POST `${BASE}${path}` with a JSON body, returning the JSON response. */
export const apiPost = <T>(path: string, body: unknown): Promise<T> =>
  request<T>(path, { method: "POST", body: JSON.stringify(body) });

/** PATCH `${BASE}${path}` with a JSON body. */
export const apiPatch = <T>(path: string, body: unknown): Promise<T> =>
  request<T>(path, { method: "PATCH", body: JSON.stringify(body) });

/** DELETE `${BASE}${path}`. */
export const apiDelete = <T>(path: string): Promise<T> =>
  request<T>(path, { method: "DELETE" });
