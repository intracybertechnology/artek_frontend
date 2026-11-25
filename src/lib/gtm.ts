/**
 * Google Tag Manager utilities for a React SPA.
 *
 * GTM is loaded once in index.html (head + noscript body).
 * Because React Router navigates without a full page reload, GTM never
 * sees the subsequent pages on its own. This module pushes a virtualPageView
 * event to dataLayer on every route change so GTM triggers fire correctly.
 *
 * In GTM, create a Trigger:
 *   - Trigger type: Custom Event
 *   - Event name:   virtualPageView
 *   - Fire on:      All Custom Events
 * Then attach your GA4 / Google Ads / conversion tags to that trigger.
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/** Push any event to GTM's dataLayer. */
export function pushDataLayer(event: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

/**
 * Push a virtual page view to GTM on SPA route changes.
 * Call this on every pathname change.
 */
export function pushPageView(pathname: string, title?: string): void {
  pushDataLayer({
    event: "virtualPageView",
    pageUrl: pathname,
    pageTitle: title ?? document.title,
  });
}
