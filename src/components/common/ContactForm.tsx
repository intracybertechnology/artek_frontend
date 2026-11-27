import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, AlertTriangle, Info, Loader2, Send, Sparkles } from "lucide-react";
import { enquirySchema, type EnquiryValues } from "@/lib/validation";
import { submitEnquiry } from "@/lib/submissions";
import { Input, Textarea } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { coreServices } from "@/data/services";
import { offerPercent } from "@/data/offers";

const EMIRATES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Other (UAE)"] as const;

const SERVICE_OPTIONS = [...coreServices.map((s) => s.title), "Other"];

/** The CCTV service option label, used to pre-fill the offer intent. */
const CCTV_TITLE = SERVICE_OPTIONS.find((s) => s.startsWith("CCTV")) ?? "CCTV & Security Systems";

/**
 * Reads the URL a visitor arrived from and turns it into form defaults, so an
 * ad/offer click is never lost:
 *  - `?intent=offer`       → CCTV selected + a message mentioning the offer
 *  - `utm_*` from the ads   → the enquiry's `source`, so ad leads are identifiable
 * Without any of these the form behaves exactly as before.
 */
function readIntent(params: URLSearchParams) {
  const offer = params.get("intent") === "offer";
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const source = [utmSource, utmMedium].filter(Boolean).join("/");
  return {
    offer,
    source: source ? `offer-${source}` : offer ? "offers-page" : undefined,
    message: offer
      ? `I'm interested in the ${offerPercent}% CCTV installation offer. `
      : "",
    service: offer ? CCTV_TITLE : undefined,
  };
}

/**
 * Accessible quote/enquiry form — React Hook Form + Zod.
 * Submission goes through lib/submissions.ts; without a configured endpoint
 * the form clearly states it is in demo mode and fakes nothing.
 */
export function ContactForm({ className }: { className?: string }) {
  const [params] = useSearchParams();
  const intent = readIntent(params);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    mode: "onBlur",
    defaultValues: {
      service: intent.service ?? "",
      emirate: "",
      companyName: "",
      botcheck: "",
      ...(intent.offer ? { message: intent.message } : {}),
    },
  });

  /* The contact page is also reachable by client-side link with a different
     query string; re-apply the intent when it changes. */
  const appliedIntent = useRef(`${intent.offer}|${intent.source ?? ""}`);
  useEffect(() => {
    const key = `${intent.offer}|${intent.source ?? ""}`;
    if (key === appliedIntent.current) return;
    appliedIntent.current = key;
    if (intent.offer) {
      setValue("service", CCTV_TITLE, { shouldValidate: false });
      setValue("message", intent.message, { shouldValidate: false });
    }
  }, [intent.offer, intent.message, intent.source, setValue]);

  const [result, setResult] = useState<null | { kind: "ok" | "demo" | "error"; message?: string }>(null);
  const emirate = watch("emirate");
  const service = watch("service");

  const onSubmit = handleSubmit(async (values) => {
    setResult(null);
    const res = await submitEnquiry({ ...values, source: intent.source ?? "website-contact-form" });
    if (res.status === "ok") {
      setResult({ kind: "ok" });
      reset();
    } else if (res.status === "demo") {
      setResult({ kind: "demo" });
    } else {
      setResult({ kind: "error", message: res.message });
    }
  });

  const labelCls = "mb-1.5 block text-sm font-medium text-slate-200";
  const errCls = "mt-1 text-xs text-red-600";

  if (result?.kind === "ok") {
    return (
      <div className={`rounded-xl border border-emerald-600/30 bg-emerald-950/30 p-8 text-center ${className ?? ""}`} role="status">
        <CheckCircle2 className="mx-auto size-10 text-emerald-500" aria-hidden="true" />
        <h3 className="mt-4 text-lg font-semibold text-ink">Enquiry sent</h3>
        <p className="mt-2 text-sm text-slate-300">
          Thank you — our team will get back to you shortly. For urgent matters call +971 50 5513139.
        </p>
        <Button variant="outline" className="mt-5" onClick={() => setResult(null)}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={className} aria-label="Request a quote">
      {intent.offer && (
        <p className="mb-5 flex items-start gap-2 rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm text-slate-700" role="status">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-sky-700" aria-hidden="true" />
          <span>
            You&apos;re claiming the <strong className="font-semibold text-slate-900">{offerPercent}% CCTV installation offer</strong>. Send
            your details and we&apos;ll confirm the saving on your quotation.
          </span>
        </p>
      )}
      {/* Honeypot — hidden from users, catches bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("botcheck")}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelCls}>
            Full Name <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <Input id="fullName" autoComplete="name" aria-required="true" aria-invalid={!!errors.fullName} {...register("fullName")} />
          {errors.fullName && <p className={errCls} role="alert">{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="companyName" className={labelCls}>
            Company Name <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <Input id="companyName" autoComplete="organization" aria-invalid={!!errors.companyName} {...register("companyName")} />
          {errors.companyName && <p className={errCls} role="alert">{errors.companyName.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email Address <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <Input id="email" type="email" autoComplete="email" inputMode="email" aria-required="true" aria-invalid={!!errors.email} {...register("email")} />
          {errors.email && <p className={errCls} role="alert">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone Number <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <Input id="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+971 5X XXX XXXX" aria-required="true" aria-invalid={!!errors.phone} {...register("phone")} />
          {errors.phone && <p className={errCls} role="alert">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="service" className={labelCls}>
            Service Required <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <Select
            value={service}
            onValueChange={(v) => setValue("service", v, { shouldValidate: true })}
          >
            <SelectTrigger id="service" aria-invalid={!!errors.service}>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && <p className={errCls} role="alert">{errors.service.message}</p>}
        </div>
        <div>
          <label htmlFor="emirate" className={labelCls}>
            Emirate / Location <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <Select
            value={emirate}
            onValueChange={(v) => setValue("emirate", v, { shouldValidate: true })}
          >
            <SelectTrigger id="emirate" aria-invalid={!!errors.emirate}>
              <SelectValue placeholder="Select your location" />
            </SelectTrigger>
            <SelectContent>
              {EMIRATES.map((e) => (
                <SelectItem key={e} value={e}>{e}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.emirate && <p className={errCls} role="alert">{errors.emirate.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelCls}>
            Message <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <Textarea
            id="message"
            placeholder="Tell us about your requirement — site size, number of cameras, systems involved…"
            aria-required="true"
            aria-invalid={!!errors.message}
            {...register("message")}
          />
          {errors.message && <p className={errCls} role="alert">{errors.message.message}</p>}
        </div>
      </div>

      {result?.kind === "error" && (
        <p className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {result.message}
        </p>
      )}
      {result?.kind === "demo" && (
        <p className="mt-4 flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-slate-300" role="status">
          <Info className="mt-0.5 size-4 shrink-0 text-accent-600" aria-hidden="true" />
          Demo mode — your details were validated but <strong className="font-semibold">not sent</strong>. Set
          the Web3Forms access key in <code className="rounded bg-mist-2 px-1 py-0.5 text-xs">VITE_WEB3FORMS_ACCESS_KEY</code> to enable live sending.
        </p>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            Request a Free Quote
          </>
        )}
      </Button>
    </form>
  );
}
