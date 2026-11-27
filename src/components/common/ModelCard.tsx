import { useState } from "react";
import { Link } from "react-router-dom";
import { Image as ImageIcon } from "lucide-react";
import { REAL_PHOTO_KEYS } from "@/data/imageNotes";

/** Brand shown on a model card. */
export interface ModelCardBrand {
  name: string;
}

/** Availability as the backend reports it (products.availability). */
export type ModelAvailability = "available" | "out_of_stock" | "on_request";

interface ModelCardProps {
  brand: ModelCardBrand;
  modelCode: string;
  /** Product type name — the backend subcategory (e.g. "Dome Camera"). */
  typeLabel: string;
  /** Omitted for static catalog models — availability unknown there. */
  availability?: ModelAvailability;
  imageUrl?: string | null;
  /** The product type's own picture (PRODUCT_IMAGE_FILES) — shown when the model has no photo, tagged "Illustration" unless the product key is a real photo. */
  typeImage?: string | null;
  /** Backend product slug — with the route segments it links the whole card to the model page. */
  modelSlug?: string;
  /** Model page route segments: /products/<groupSlug>/<productSlug>/<modelSlug>. */
  groupSlug?: string;
  productSlug?: string;
}

/** Availability pill: green with a slowly pulsing dot for "available"; a plain
 * neutral pill for every other value (out_of_stock, on_request, unknown). */
function AvailabilityBadge({ availability }: { availability?: ModelAvailability }) {
  if (availability === "available") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800">
        <span className="model-availability-dot size-1.5 rounded-full bg-green-600" aria-hidden="true" />
        Available
      </span>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
      Ask for availability
    </span>
  );
}

/**
 * One backend model card — the unit of the "{Product} products" grid on product
 * type pages and "Popular {brand} models" on brand pages. Dark card with a
 * white image plate on top (product photos have white backgrounds), the model
 * code in the accent colour, and a full-width quote button into Ram's contact
 * flow. When the model has a backend slug, the model code carries a stretched
 * link covering the whole card; the quote button sits above it (z-10).
 * Models without a slug (static catalog models) show only the quote button.
 */
export function ModelCard({
  brand,
  modelCode,
  typeLabel,
  availability,
  imageUrl,
  modelSlug,
  groupSlug,
  productSlug,
  typeImage,
}: ModelCardProps) {
  const [modelImageFailed, setModelImageFailed] = useState(false);
  const [typeImageFailed, setTypeImageFailed] = useState(false);

  /* Ram's quote flow: a Link to /contact with the context in the query string. */
  const subject = [brand.name, modelCode].filter(Boolean).join(" ");
  const quoteTo =
    `/contact?product=${encodeURIComponent(modelCode)}` +
    `&brand=${encodeURIComponent(brand.name)}` +
    `&category=${encodeURIComponent(typeLabel)}` +
    `&message=${encodeURIComponent(`I am interested in ${subject}${typeLabel ? ` (${typeLabel})` : ""}.`)}`;

  /* The whole card links to the model page — only backend models with a full route. */
  const to =
    modelSlug && groupSlug && productSlug
      ? `/products/${groupSlug}/${productSlug}/${modelSlug}`
      : undefined;
  /* Model photo first; the product type's picture is the fallback, with an
     "Illustration" tag unless that product key holds a real photo. */
  const modelSrc = imageUrl && !modelImageFailed ? imageUrl : null;
  const typeSrc = !modelSrc && typeImage && !typeImageFailed ? typeImage : null;
  const isRealPhotoKey =
    groupSlug && productSlug ? REAL_PHOTO_KEYS.has(`${groupSlug}/${productSlug}`) : false;


  return (
    <li className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      {/* Image plate — white so the product photos blend in */}
      <div className="relative flex aspect-[4/3] shrink-0 items-center justify-center bg-white p-3">
        {modelSrc || typeSrc ? (
          <>
            <img
              src={modelSrc ?? typeSrc ?? undefined}
              alt={modelSrc ? `${brand.name} ${modelCode} ${typeLabel}` : `${typeLabel} illustration`}
              width={400}
              height={300}
              loading="lazy"
              decoding="async"
              onError={() => (modelSrc ? setModelImageFailed(true) : setTypeImageFailed(true))}
              className="h-full w-full object-contain"
            />
            {typeSrc && !isRealPhotoKey && (
              <span className="absolute left-3 top-3 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                Illustration
              </span>
            )}
          </>
        ) : (
          <ImageIcon className="size-8 shrink-0 text-slate-400" aria-hidden="true" />
        )}
      </div>

      {/* Info — light text on the dark card */}
      <div className="flex flex-1 flex-col p-4">
        {to ? (
          <Link
            to={to}
            className="break-words text-sm font-semibold text-sky-400 underline-offset-4 after:absolute after:inset-0 hover:underline"
          >
            {modelCode}
          </Link>
        ) : (
          <p className="break-words text-sm font-semibold text-sky-400">{modelCode}</p>
        )}
        <p className="mt-0.5 text-sm text-slate-200">{brand.name}</p>
        <p className="mt-0.5 text-sm text-slate-400">{typeLabel}</p>
        <div className="mt-2">
          <AvailabilityBadge availability={availability} />
        </div>
        <Link
          to={quoteTo}
          className="relative z-10 mt-4 inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white outline-none transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          Get a quote
        </Link>
      </div>
    </li>
  );
}
