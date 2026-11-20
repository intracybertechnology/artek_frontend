import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  getConsent,
  initConsentGating,
  OPEN_SETTINGS_EVENT,
  saveConsent,
} from "@/lib/cookieConsent";
import { cn } from "@/lib/utils";

/**
 * Cookie consent banner — client-only (nothing renders before mount, so the
 * prerendered HTML and hydration are untouched). Shows when there is no valid
 * stored choice, and re-opens on the "open-cookie-settings" event (footer
 * link). A plain fixed card: no overlay, no focus trap, the page stays usable.
 */

const btnCls =
  "rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 outline-none transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 focus-visible:ring-offset-white";

/** One toggle row in the customize panel. */
function SwitchRow({
  title,
  description,
  checked,
  onChange,
  disabled = false,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span>
        <span className="block text-sm font-semibold text-slate-900">{title}</span>
        <span className="block text-xs text-slate-500">{description}</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full outline-none transition-colors",
          "focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
          checked ? "bg-slate-900" : "bg-slate-200",
          disabled ? "opacity-60" : "cursor-pointer",
        )}
      >
        <span
          className={cn(
            "inline-block size-4 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
    </div>
  );
}

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    initConsentGating();
    if (!getConsent()) setVisible(true);

    const onOpenSettings = () => {
      const stored = getConsent();
      setAnalytics(stored?.analytics ?? false);
      setMarketing(stored?.marketing ?? false);
      setClosing(false);
      setCustomizing(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpenSettings);
    return () => {
      window.removeEventListener(OPEN_SETTINGS_EVENT, onOpenSettings);
      clearTimeout(closeTimer.current);
    };
  }, []);

  /** Persist the choice, then fade the banner out. */
  const finish = (analyticsChoice: boolean, marketingChoice: boolean) => {
    saveConsent({ analytics: analyticsChoice, marketing: marketingChoice });
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      setVisible(false);
      setClosing(false);
      setCustomizing(false);
    }, 200);
  };

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-heading"
      onKeyDown={(e) => {
        // Escape collapses the customize panel only — never the banner.
        if (e.key === "Escape" && customizing) setCustomizing(false);
      }}
      className={cn(
        "fixed z-[60] border border-slate-200 bg-white p-5 text-slate-900 shadow-2xl transition-opacity duration-200",
        // Below sm: bottom sheet across the width, keeping the right strip
        // free so the WhatsApp button is never covered.
        "bottom-0 left-4 right-[9rem] rounded-t-2xl",
        "sm:right-auto sm:bottom-4 sm:w-[420px] sm:max-w-[calc(100vw-2rem)] sm:rounded-2xl",
        closing ? "opacity-0" : "opacity-100",
      )}
    >
      <h2 id="cookie-consent-heading" className="text-base font-bold">
        We use cookies
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        We use necessary cookies to run this site. With your permission we also use analytics
        and marketing cookies to understand how the site is used and to improve it. You can
        change your choice at any time.
      </p>
      <Link
        to="/privacy-policy"
        className="mt-1 inline-block rounded-sm text-sm font-medium text-blue-700 underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-blue-600"
      >
        Privacy policy
      </Link>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={btnCls} onClick={() => finish(true, true)}>
          Accept all
        </button>
        <button type="button" className={btnCls} onClick={() => finish(false, false)}>
          Reject non-essential
        </button>
        <button
          type="button"
          className={btnCls}
          onClick={() => {
            const stored = getConsent();
            setAnalytics(stored?.analytics ?? false);
            setMarketing(stored?.marketing ?? false);
            setCustomizing(true);
          }}
        >
          Customize
        </button>
      </div>

      {customizing && (
        <div className="mt-4 space-y-3 border-t border-slate-200 pt-4">
          <SwitchRow
            title="Necessary"
            description="Required for the site to work"
            checked
            disabled
          />
          <SwitchRow
            title="Analytics"
            description="Understand how visitors use the site"
            checked={analytics}
            onChange={setAnalytics}
          />
          <SwitchRow
            title="Marketing"
            description="Measure how our pages and campaigns perform"
            checked={marketing}
            onChange={setMarketing}
          />
          <button
            type="button"
            className={btnCls}
            onClick={() => finish(analytics, marketing)}
          >
            Save my choices
          </button>
        </div>
      )}
    </div>
  );
}
