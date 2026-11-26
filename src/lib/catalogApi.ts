import { API_BASE, apiGet } from "@/lib/api";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CATALOG API — products from the backend (GET /api/products)
 *
 *  The brand page lists live model cards through these; the static models in
 *  src/data/catalog.ts remain the fallback when the backend is unreachable or
 *  has nothing for the brand.
 *
 *  Wire shape (artek_backend/src/controllers/products.controller.js —
 *  mapListItem): { success, products: [{ id, name, model_number, type,
 *  availability, brand: { name, slug } | null, category: { name, slug } | null,
 *  primary_image: "/uploads/products/..." | null }] }.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** One product as the frontend consumes it — only the fields the cards need. */
export type ApiProduct = {
  id: number;
  name: string;
  modelNumber: string;
  /** Subcategory name — null when the product has no subcategory. */
  type: string | null;
  brandName: string | null;
  categorySlug: string | null;
  /** primary_image prefixed with the API base URL; null when there is no image. */
  image: string | null;
  availability: "available" | "out_of_stock" | "on_request";
};

/** Raw /api/products item, before the camelCase mapping. */
type RawProduct = {
  id: number;
  name: string;
  model_number: string;
  type: string | null;
  availability: "available" | "out_of_stock" | "on_request";
  brand: { name: string; slug: string } | null;
  category: { name: string; slug: string } | null;
  primary_image: string | null;
};

type ProductsResponse = {
  success: boolean;
  products: RawProduct[];
};

/** Snake_case wire item → ApiProduct; image paths get the API base URL prefix. */
const toProduct = (item: RawProduct): ApiProduct => ({
  id: item.id,
  name: item.name,
  modelNumber: item.model_number,
  type: item.type,
  brandName: item.brand?.name ?? null,
  categorySlug: item.category?.slug ?? null,
  image: item.primary_image ? `${API_BASE}${item.primary_image}` : null,
  availability: item.availability,
});

const fetchProducts = (query: string): Promise<ApiProduct[]> =>
  apiGet<ProductsResponse>(`/api/products?${query}`).then((res) => res.products.map(toProduct));

/** Products of one brand — GET /api/products?brand=<slug>&limit=60. */
export const fetchProductsByBrand = (brandSlug: string): Promise<ApiProduct[]> =>
  fetchProducts(`brand=${encodeURIComponent(brandSlug)}&limit=60`);

/** Products of one category — GET /api/products?category=<slug>&limit=60. */
export const fetchProductsByCategory = (categorySlug: string): Promise<ApiProduct[]> =>
  fetchProducts(`category=${encodeURIComponent(categorySlug)}&limit=60`);
