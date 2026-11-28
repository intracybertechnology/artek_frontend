import type { ComponentProps, PointerEvent } from "react";
import { Link } from "react-router-dom";
import "./SpotlightCard.css";

// React Bits SpotlightCard adapted to keep the entire card a single router link.
export function SpotlightCard({ children, className = "", onPointerMove, ...props }: ComponentProps<typeof Link>) {
  function move(event: PointerEvent<HTMLAnchorElement>) {
    onPointerMove?.(event);
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <Link {...props} className={`spotlight-card ${className}`} onPointerMove={move}>
      <span className="spotlight-card__light" aria-hidden="true" />
      {children}
      <span className="spotlight-card__edge" aria-hidden="true" />
    </Link>
  );
}
