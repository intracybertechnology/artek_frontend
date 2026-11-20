import { useState } from "react";
import { brandLogo } from "@/data/catalog";

interface BrandLogoProps {
  /** Brand display name — used for the img alt text and to build the logo path. */
  name: string;
  /** Extra classes on the outer tile element. */
  className?: string;
  /**
   * When true: if the image fails to load or no file exists, show the brand
   * name as centered dark text inside the tile instead of leaving it blank.
   * Use this when the tile is the only place the name is shown.
   * Leave false (default) when the caller already renders the name separately.
   */
  showNameFallback?: boolean;
}

/**
 * Shows a brand logo inside a white rounded tile.
 * No zoom or scale — logos are already properly cropped.
 * Falls back to blank tile (or brand name text if showNameFallback=true).
 */
export function BrandLogo({ name, className = "", showNameFallback = false }: BrandLogoProps) {
  const src = brandLogo(name);
  const [failed, setFailed] = useState(false);

  const noImage = !src || failed;

  return (
    <span
      className={`flex h-10 w-20 items-center justify-center rounded bg-white p-1.5 ${className}`}
    >
      {noImage ? (
        showNameFallback ? (
          <span className="line-clamp-2 text-center text-[11px] font-bold leading-tight text-slate-700">
            {name}
          </span>
        ) : null
      ) : (
        <img
          src={src}
          alt={`${name} logo`}
          width={64}
          height={28}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      )}
    </span>
  );
}
