/**
 * Cookie consent — a single JSON record in localStorage plus small helpers.
 *
 * Every read and write is defensive: blocked storage (private mode, sandboxed
 * iframe) or a corrupted value simply means "no choice yet", so the banner
 * asks again. The choice expires after 180 days and whenever the record's
 * version changes.
 */

const STORAGE_KEY = "artek_cookie_consent";
const CONSENT_VERSION = 1;
const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

/** Custom window events used to coordinate banner and trackers (same tab). */
const CHANGED_EVENT = "cookie-consent-changed";
export const OPEN_SETTINGS_EVENT = "open-cookie-settings";

export type ConsentCategory = "analytics" | "marketing";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** ISO date — used for the 180-day expiry. */
  savedAt: string;
  version: number;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function isConsent(value: unknown): value is CookieConsent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Record<string, unknown>;
  return (
    c.necessary === true &&
    typeof c.analytics === "boolean" &&
    typeof c.marketing === "boolean" &&
    typeof c.savedAt === "string" &&
    typeof c.version === "number"
  );
}

/** The stored choice, or undefined when missing, invalid, expired or stale version. */
export function getConsent(): CookieConsent | undefined {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed: unknown = JSON.parse(raw);
    if (!isConsent(parsed)) return undefined;
    if (parsed.version !== CONSENT_VERSION) return undefined;
    if (Date.now() - new Date(parsed.savedAt).getTime() > CONSENT_MAX_AGE_MS) return undefined;
    return parsed;
  } catch {
    return undefined;
  }
}

/** Save a (partial) choice; unmentioned categories keep their previous value. */
export function saveConsent(
  partial: Partial<Pick<CookieConsent, "analytics" | "marketing">>,
): CookieConsent {
  const previous = getConsent();
  const next: CookieConsent = {
    necessary: true,
    analytics: partial.analytics ?? previous?.analytics ?? false,
    marketing: partial.marketing ?? previous?.marketing ?? false,
    savedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage blocked — the choice still applies to this page load.
  }
  window.dispatchEvent(new CustomEvent(CHANGED_EVENT, { detail: next }));
  return next;
}

/** True only when the visitor explicitly agreed to the category. */
export function hasConsent(category: ConsentCategory): boolean {
  return getConsent()?.[category] === true;
}

/** Re-open the banner's customize panel from anywhere (e.g. the footer link). */
export function openCookieSettings(): void {
  window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT));
}

/** Fire `callback` whenever the choice changes (same tab). Returns an unsubscriber. */
export function subscribe(callback: () => void): () => void {
  window.addEventListener(CHANGED_EVENT, callback);
  return () => window.removeEventListener(CHANGED_EVENT, callback);
}

/**
 * ── Consent-gated tracking ─────────────────────────────────────────────
 * The only tracker on this site is Google Tag Manager (GTM-MQJNWLSZ). It
 * used to load unconditionally from index.html; initConsentGating() now
 * loads it from the client only after the visitor accepts analytics or
 * marketing cookies, and again whenever consent is granted later via the
 * "cookie-consent-changed" event. Withdrawing consent stops it loading on
 * the next page load.
 *
 * Future trackers (Meta Pixel, Hotjar, Clarity, LinkedIn Insight, TikTok):
 * add a loader next to loadGtm() below, gate it on hasConsent("analytics")
 * or hasConsent("marketing") inside initConsentGating(), and keep any
 * static snippets out of index.html.
 */

const GTM_ID = "GTM-MQJNWLSZ";

/** Inject a <script> once (deduped by id). */
export function loadScriptOnce(id: string, src: string): void {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function loadGtm(): void {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  loadScriptOnce("gtm-consent", `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
}

/** Call once from the client (the consent banner's mount effect does it). */
export function initConsentGating(): void {
  const gtmAllowed = () => hasConsent("analytics") || hasConsent("marketing");
  if (gtmAllowed()) loadGtm();
  subscribe(() => { if (gtmAllowed()) loadGtm(); });
}
