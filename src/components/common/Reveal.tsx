import { useEffect, useRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";

/**
 * Fades a section heading in when it scrolls into view — a subtle one-shot
 * scroll reveal, unlike RevealBox which wraps whole blocks.
 *
 * Renders a normal element on the server and on first client render, so the
 * prerendered HTML and no-JS visitors see everything. After mount it does
 * nothing for prefers-reduced-motion, missing IntersectionObserver, or
 * elements already inside the viewport; otherwise the element gets
 * data-reveal="hidden" and the observer flips it to data-reveal="shown"
 * exactly once (globals.css owns the visual states).
 */
export function Reveal({
  as: Tag = "div",
  children,
  ...rest
}: { as?: "div" | "section" | "article" | "li" | "h2" | "h3" | "p"; children?: ReactNode } & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.reveal = "shown";
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // the ref is stable and only used for observation
      ref={ref as React.Ref<never>}
      {...rest}
    >
      {children}
    </Tag>
  );
}
