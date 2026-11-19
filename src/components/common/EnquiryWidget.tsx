import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, Phone, X } from "lucide-react";
import { company } from "@/data/company";

/**
 * Floating enquiry button (bottom-right).
 *
 * Deliberately NOT a chatbot: every option is a one-tap route to a channel a
 * human actually answers. Typed-question bots would have to invent prices and
 * certifications, which this project forbids; a hand-written tree gets
 * exhausted in four taps. Quick actions cannot go wrong and cannot lie.
 *
 * Behaviour:
 * - collapsed to a small circular trigger;
 * - appears only after the visitor has scrolled one viewport, so it never
 *   competes with the hero;
 * - opens a Radix Dialog (focus trap, Escape, scroll-lock handled by Radix);
 * - WhatsApp options pre-fill a message, so the visitor never types from zero
 *   and ARTEK sees the topic before replying;
 * - phone stays available at all times — it is the only channel that works
 *   regardless of the visitor's device.
 */

interface QuickAction {
  id: string;
  label: string;
  /** Message pre-filled into WhatsApp. Omitted for the call action. */
  message?: string;
}

const ACTIONS: readonly QuickAction[] = [
  {
    id: "quote",
    label: "Get a quote",
    message: "Hello! I’d like a quote for a requirement I have.",
  },
  {
    id: "products",
    label: "Explore products & pricing",
    message: "Hello! I’d like to know more about the products you offer and their pricing.",
  },
  {
    id: "general",
    label: "General enquiry",
    message: "Hello! I have a general enquiry about your solutions.",
  },
  {
    id: "support",
    label: "Technical support & AMC",
    message: "Hello! I’m reaching out regarding support or AMC services.",
  },
];

/** Build a wa.me link with a pre-filled message. */
function waLink(number: string, message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}

export function EnquiryWidget() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const wa = company.whatsappNumber;

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* Trigger — small, monochrome, out of the way */}
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Contact ARTEK"
          className={[
            "fixed bottom-5 right-4 z-40 inline-flex size-12 items-center justify-center rounded-full",
            "bg-[#25D366] text-white shadow-[0_8px_24px_rgb(37_211_102/0.35)]",
            "outline-none transition-[opacity,transform,background-color] duration-300",
            "hover:bg-[#1ebe5b] focus-visible:ring-2 focus-visible:ring-[#25D366]/60",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            "sm:bottom-6 sm:right-6",
            visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
          ].join(" ")}
          tabIndex={visible ? 0 : -1}
          aria-hidden={!visible}
        >
          <MessageCircle className="size-5" aria-hidden="true" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]" />
        <Dialog.Content
          className={[
            "fixed z-50 flex flex-col overflow-hidden rounded-(--radius-card) border border-white/10 bg-surface-2",
            "shadow-[0_18px_50px_rgb(0_0_0/0.6)] outline-none",
            // mobile: bottom sheet that can never exceed the viewport, so the
            // call button stays reachable; the option list scrolls instead.
            "inset-x-3 bottom-3 max-h-[calc(100dvh-1.5rem)]",
            // desktop: anchored card above the trigger
            "sm:inset-x-auto sm:bottom-24 sm:right-6 sm:max-h-[70vh] sm:w-[24rem]",
          ].join(" ")}
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
            <div>
              <Dialog.Title className="text-[15px] font-semibold tracking-tight text-text">
                How can we help?
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-xs leading-relaxed text-text-muted">
                Pick an option and we&apos;ll pick it up in WhatsApp with your
                message ready.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="-mr-1 -mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-text-muted outline-none transition-colors hover:bg-white/[0.06] hover:text-text focus-visible:ring-2 focus-visible:ring-paper/60"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            {wa ? (
              <ul className="space-y-1">
                {ACTIONS.map((a) => (
                  <li key={a.id}>
                    <a
                      href={waLink(wa, a.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm font-medium text-text outline-none transition-colors hover:bg-white/[0.05] focus-visible:ring-2 focus-visible:ring-paper/60"
                    >
                      <span className="flex items-center gap-2.5">
                        <MessageCircle className="size-4 shrink-0 text-text-muted" aria-hidden="true" />
                        {a.label}
                      </span>
                      <ArrowRight
                        className="size-4 shrink-0 text-white/25 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-text-muted"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-3 py-2 text-xs leading-relaxed text-text-muted">
                WhatsApp is not set up yet. Please call us instead.
              </p>
            )}
          </div>

          <div className="border-t border-white/10 p-3">
            <a
              href={company.phoneHref}
              onClick={() => setOpen(false)}
              className="flex h-11 items-center justify-center gap-2 rounded-lg bg-paper text-sm font-semibold text-surface transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2 focus-visible:ring-paper/40"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call {company.phoneDisplay}
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
