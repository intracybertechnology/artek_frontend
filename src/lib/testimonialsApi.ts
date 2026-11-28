import { API_BASE, apiGet } from "@/lib/api";
import type { Testimonial } from "@/types";
import { approvedTestimonials } from "@/data/testimonials";

type RawTestimonial = {
  id: number;
  quote: string;
  name: string;
  role?: string | null;
  company?: string | null;
  rating?: number | null;
  image?: string | null;
};

type TestimonialsResponse = {
  success: boolean;
  testimonials: RawTestimonial[];
};

function toTestimonial(item: RawTestimonial): Testimonial {
  const rating =
    typeof item.rating === "number" &&
    Number.isInteger(item.rating) &&
    item.rating >= 1 &&
    item.rating <= 5
      ? (item.rating as 1 | 2 | 3 | 4 | 5)
      : 5;
  return {
    id: String(item.id),
    quote: item.quote,
    name: item.name,
    role: item.role ?? "",
    company: item.company ?? "",
    rating,
    image: item.image ? `${API_BASE}${item.image}` : undefined,
  };
}

/**
 * Fetch testimonials from the backend, falling back to the static approved
 * list on any failure or empty result. Never throws — callers can always
 * render safely.
 */
export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await apiGet<TestimonialsResponse>(`/api/testimonials?limit=20`);
    const items = Array.isArray(res?.testimonials) ? res.testimonials.map(toTestimonial) : [];
    if (items.length === 0) return [...approvedTestimonials];
    return items;
  } catch {
    return [...approvedTestimonials];
  }
}
