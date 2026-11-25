import * as Accordion from "@radix-ui/react-accordion";
import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Faq } from "@/types";
import { cn } from "@/lib/utils";

export function FAQAccordion({
  faqs,
  className,
  tone = "dark",
  openFirst = false,
  card = false,
}: {
  faqs: readonly Faq[];
  className?: string;
  /** surface the accordion sits on */
  tone?: "dark" | "paper";
  /** start with the first question expanded */
  openFirst?: boolean;
  /** detached rounded rows with a raised open state */
  card?: boolean;
}) {
  const [open, setOpen] = useState<string[]>((openFirst || card) && faqs[0] ? ["faq-0"] : []);
  const base = useId().replace(/:/g, "");
  if (!faqs.length) return null;
  const paper = tone === "paper";

  return (
    <Accordion.Root
      type="single"
      collapsible
      value={open[0] ?? ""}
      onValueChange={(value) => setOpen(value ? [value] : [])}
      className={cn(card ? "grid gap-2.5" : cn("border-t", paper ? "border-slate-900/15" : "border-white/10"), className)}
    >
      {faqs.map((faq, i) => {
        const isOpen = open[0] === `faq-${i}`;
        return (
          <Accordion.Item
            key={i}
            value={`faq-${i}`}
            id={`${base}-item-${i}`}
            className={cn(
              card
                ? cn(
                    "overflow-hidden rounded-xl border transition-[border-color,box-shadow,background-color] duration-200",
                    paper ? "bg-slate-50" : "bg-white/[0.04]",
                    paper && isOpen ? "border-sky-400 bg-white shadow-[0_10px_30px_-18px_rgb(15_23_42/45%)]" : paper ? "border-slate-200 hover:border-slate-400" : isOpen ? "border-sky-400/70" : "border-white/10 hover:border-sky-400/40",
                  )
                : cn("border-b", paper ? "border-slate-900/15" : "border-white/10"),
            )}
          >
            <Accordion.Header className="flex">
              <Accordion.Trigger
                className={cn(
                  "group flex flex-1 items-center justify-between gap-5 text-left font-semibold tracking-tight",
                  card ? "px-4 py-4 text-[15px] sm:px-5 sm:text-base" : "py-5 text-[15px] sm:text-base",
                  paper ? "text-slate-900 hover:text-slate-600" : "text-text hover:text-white/80",
                )}
              >
                {faq.question}
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
                    card
                      ? paper
                        ? "border-sky-200 bg-sky-50 text-sky-800"
                        : "border-sky-400/30 bg-sky-400/10 text-sky-300"
                      : paper
                        ? "border-slate-900/20 text-slate-600 group-hover:border-slate-900/50 group-hover:text-slate-900"
                        : "border-white/15 text-text-muted group-hover:border-white/35 group-hover:text-text",
                  )}
                  aria-hidden="true"
                >
                  {card && isOpen ? <Minus className="size-4" /> : <Plus className={cn("size-4", isOpen && !card && "rotate-45")} />}
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content
              id={`${base}-content-${i}`}
              className="overflow-hidden data-[state=closed]:animate-[accordion-up_0.2s_ease-out] data-[state=open]:animate-[accordion-down_0.25s_ease-out]"
            >
              <p
                className={cn(
                  "max-w-3xl pb-5 pr-12 text-sm leading-relaxed sm:text-[15px]",
                  card && "px-4 sm:px-5",
                  paper ? "text-slate-600" : "text-text-muted",
                )}
              >
                {faq.answer}
              </p>
            </Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}
