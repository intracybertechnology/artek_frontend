import type { Faq } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  OFFERS — /offers
 *
 *  The headline percentage and the offer dates come from .env:
 *    VITE_OFFER_DISCOUNT_PERCENT   e.g. 15   → "15%" everywhere on the page
 *    VITE_OFFER_START_DATE         YYYY-MM-DD → defines the offer period start
 *    VITE_OFFER_END_DATE           YYYY-MM-DD → offer period end + "Valid until"
 *  Everything else here is page copy and can be edited directly.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type OfferTermsItem = { label: string; value: string };

/**
 * Env values. This file is also imported by the prerender/sitemap scripts,
 * which run in plain Node where `import.meta.env` does not exist — hence the
 * guarded read (Vite inlines the value into the browser/SSR builds).
 */
const env = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;

const fromEnv = Number(env?.VITE_OFFER_DISCOUNT_PERCENT);
export const offerPercent = Number.isFinite(fromEnv) && fromEnv > 0 ? fromEnv : 15;

/** "2026-08-31" → "31 August 2026". Returns the raw string if it can't be parsed. */
const formatDate = (value: string | undefined, fallback: string) => {
  if (!value) return fallback;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};

export const offerStartDate = formatDate(env?.VITE_OFFER_START_DATE, "1 June 2026");
export const offerEndDate = formatDate(env?.VITE_OFFER_END_DATE, "31 August 2026");
export const offerPeriod = `${offerStartDate} – ${offerEndDate}`;

/** Replaces {offerPercent} in copy strings. */
const fill = (text: string) => text.replaceAll("{offerPercent}", String(offerPercent));

export type Offer = {
  /** small pill above the headline */
  badge: string;
  /** headline with the discount wrapped in *asterisks* for highlighting */
  headline: string;
  /** line under the headline */
  subheadline: string;
  /** the pitch */
  pitch: string;
  /** short reassurance points beside the pitch */
  points: readonly string[];
  /** shown in the "offer at a glance" strip */
  validUntil: string;
  minimum: string;
  status: "draft" | "live";
  /** fine print rendered as a definition list */
  terms: readonly OfferTermsItem[];
};

export const offer: Offer = {
  badge: "Limited-time offer",
  headline: fill("Protect your property. *Save {offerPercent}%* on CCTV installation."),
  subheadline: fill(
    "Secure your home or business with professional CCTV installation from ARTEK Computers — installed by experienced technicians, at {offerPercent}% off for a limited time.",
  ),
  pitch: fill(
    "Most people only think about CCTV after something goes wrong. Don't wait for a close call. " +
      "Artek Computers brings you high-definition, weatherproof surveillance systems installed cleanly " +
      "by experienced technicians — now at {offerPercent}% off. You get clear day-and-night footage, instant " +
      "mobile alerts and local support you can actually reach when you need help. Lock in your {offerPercent}% " +
      "discount today, before the offer closes.",
  ),
  points: [
    "High-definition, weatherproof cameras",
    "Night vision and instant mobile alerts",
    "Clean installation by experienced technicians",
    "Local support you can actually reach",
  ],
  validUntil: offerEndDate,
  minimum: "CCTV packages from AED 4,000",
  status: "draft",
  terms: [
    { label: "Offer period", value: offerPeriod },
    { label: "Applicable to", value: "CCTV installation packages in Dubai" },
    { label: "Minimum scope", value: "CCTV packages from AED 4,000" },
    { label: "Installation area", value: "Dubai; other emirates by arrangement" },
    { label: "Availability", value: "While appointment slots last" },
    {
      label: "Status of pricing",
      value: "Promotional and indicative until a written, itemised quotation is issued",
    },
    {
      label: "Exclusions",
      value: "Civil and building works, SIRA fees and any equipment outside the quoted scope",
    },
  ],
};

/** Short action labels — all read the percentage from the env. */
export const offerCopy = {
  claimCta: fill("Claim your {offerPercent}% discount"),
  headlineCta: fill("Claim your {offerPercent}% discount"),
  ticker: [
    fill("{offerPercent}% off CCTV installation"),
    "Free site survey",
    "Night vision & mobile alerts",
    "Local support you can reach",
  ],
  savingFact: fill("{offerPercent}% off installation"),
  includesNote: fill(
    "The {offerPercent}% comes off the CCTV installation package, applied line by line on your written quotation — no hidden charges, no last-minute additions.",
  ),
  savingLabel: fill("off CCTV installation"),
} as const;

export const offerFaqs: readonly Faq[] = [
  {
    question: fill("How do I claim the {offerPercent}% discount?"),
    answer: fill(
      "Call or use the form on this page and mention the offer. We book a site survey, scope the work and issue an itemised quotation with the {offerPercent}% applied — the saving is confirmed on that written quotation.",
    ),
  },
  {
    question: "Is the discount on the cameras or the whole installation?",
    answer:
      "The 15% applies to the CCTV installation package on your quotation. The exact scope it covers — cameras, recorders, cabling and labour — is written out line by line before you approve anything.",
  },
  {
    question: "Does the offer cover other services?",
    answer:
      "The current offer is for CCTV installation. Networking, IT support, Microsoft 365, cloud, cybersecurity and telephony are quoted the standard way — ask us and we will confirm whether the offer can be extended.",
  },
  {
    question: "Can it be applied to a project already quoted?",
    answer:
      "Ask before you accept an existing quotation. Whether the discount applies depends on when it was issued and how much has been ordered. Our team will confirm in writing.",
  },
  {
    question: "How is the installation carried out?",
    answer:
      "ARTEK supplies the equipment, installs and configures it, and tests the finished system. Where a site falls under SIRA requirements, the approval paperwork is planned in from the start.",
  },
];

/** The page, the SEO registry and the sitemap all read this one switch. */
export const offerIsLive = offer.status === "live";
