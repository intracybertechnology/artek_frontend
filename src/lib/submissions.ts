import { API_BASE } from "@/lib/api";
import type { EnquiryValues } from "@/lib/validation";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  LEAD SUBMISSION SERVICE
 *
 *  Submits to our own backend POST ${API_BASE}/api/quotes, with Web3Forms as
 *  a fallback for 5xx / network errors only. Real rejections (400, 422, 429)
 *  are surfaced to the visitor and never fall back.
 *
 *    1. POST JSON to our API; on success (201 + success:true) return "success".
 *    2. On 5xx or network error, retry once via Web3Forms (if its key is set).
 *    3. Until the Web3Forms key is configured the fallback runs in demo mode.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export type SubmissionResult =
  | { status: "success" }
  | { status: "error"; message: string }
  | { status: "demo" };

export type EnquiryPayload = EnquiryValues & {
  product_name?: string;
  model_number?: string;
  brand_name?: string;
  category?: string;
  product_id?: number;
};

export const getWeb3FormsKey = (): string | undefined =>
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || undefined;

export const isDemoMode = (): boolean => !getWeb3FormsKey();

function buildOurApiBody(payload: EnquiryPayload): Record<string, unknown> {
  const body: Record<string, unknown> = {
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    message: payload.message,
    service: payload.service,
    emirate: payload.emirate,
    product_name: payload.product_name,
    model_number: payload.model_number,
    botcheck: payload.botcheck ?? "",
  };
  if (payload.companyName) body.companyName = payload.companyName;
  if (payload.category) body.category = payload.category;
  if (payload.brand_name) body.brand_name = payload.brand_name;
  if (
    typeof payload.product_id === "number" &&
    Number.isInteger(payload.product_id) &&
    payload.product_id >= 1
  ) {
    body.product_id = payload.product_id;
  }
  return body;
}

async function postToOurApi(payload: EnquiryPayload): Promise<SubmissionResult | null> {
  // null = caller should fall back to Web3Forms (5xx or network error)
  try {
    const res = await fetch(`${API_BASE}/api/quotes`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(buildOurApiBody(payload)),
    });

    if (res.status === 201) {
      const data = await res.json().catch(() => ({}));
      if (data.success === true) return { status: "success" };
      return { status: "error", message: data.message || "Something went wrong, please try again." };
    }

    if (res.status === 429) {
      return { status: "error", message: "Too many requests. Please try again in 15 minutes or call us directly." };
    }

    if (res.status === 422) {
      const data = await res.json().catch(() => ({}));
      if (Array.isArray(data.errors) && data.errors.length > 0 && data.errors[0].msg) {
        return { status: "error", message: String(data.errors[0].msg) };
      }
      if (data.message) return { status: "error", message: String(data.message) };
      return { status: "error", message: "Something went wrong, please try again." };
    }

    if (res.status >= 500) return null; // fall back to Web3Forms

    // 400 or any other non-OK response
    const data = await res.json().catch(() => ({}));
    if (data.message) return { status: "error", message: String(data.message) };
    return { status: "error", message: "Something went wrong, please try again." };
  } catch {
    return null; // network error -> fall back to Web3Forms
  }
}

async function postToWeb3Forms(payload: EnquiryPayload): Promise<SubmissionResult> {
  const accessKey = getWeb3FormsKey();
  if (!accessKey) {
    return { status: "error", message: "The enquiry could not be sent. Please try again or call us directly." };
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Website enquiry — ${payload.service} (${payload.fullName})`,
        from_name: "Artek Website",
        name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        company: payload.companyName || "—",
        service: payload.service,
        emirate: payload.emirate,
        message: payload.message,
        source: "website-contact-form",
        botcheck: payload.botcheck ?? "",
      }),
    });
    const data = await res.json();
    if (data.success) return { status: "success" };
    return { status: "error", message: data.message || "The enquiry could not be sent. Please call us instead." };
  } catch {
    return { status: "error", message: "A network problem prevented sending. Please try again or call +971 50 5513139." };
  }
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<SubmissionResult> {
  const ourResult = await postToOurApi(payload);
  if (ourResult) return ourResult;
  // 5xx or network error: fall back to Web3Forms once
  return postToWeb3Forms(payload);
}
