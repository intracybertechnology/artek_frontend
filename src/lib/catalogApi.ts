import { API_BASE, apiGet, apiGetQ } from "@/lib/api";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CATALOG API — products from the backend (GET /api/products)
 *
 *  Brand pages ("Popular {brand} models") and product type pages
 *  ("{Product} products") list live model cards through these; the static
 *  catalog in src/data/catalog.ts remains the fallback.
 *
 *  Wire shape (artek_backend/src/controllers/products.controller.js —
 *  mapListItem): { success, products: [{ id, slug, name, model_number, type,
 *  availability, brand: { name, slug } | null, category: { name, slug } | null,
 *  subcategory: { name, slug } | null, primary_image: "/uploads/products/..." | null }],
 *  pagination: { page, limit, total, totalPages } }.
 *
 *  Endpoint parameters (products.routes.js listValidation + findProducts):
 *  page (1+), limit (1–60), search (matches name, model number and brand),
 *  category / subcategory / brand (slugs), availability, sort. The sort
 *  whitelist is "newest" (default: created_at DESC) | "name" (product name
 *  A–Z) — there is no ascending created_at and no model-number sort, so the
 *  grid's "oldest first" default is assembled by reading the API's pages from
 *  the end (see fetchModelsBySubcategory).
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** One product as the frontend consumes it — only the fields the cards need. */
export type ApiProduct = {
  id: number;
  /** Backend product slug — the last route segment of the model page. */
  slug: string;
  name: string;
  modelNumber: string;
  /** Subcategory name — null when the product has no subcategory. */
  type: string | null;
  brandName: string | null;
  categorySlug: string | null;
  /** Product-type slug — the /products/<group>/<productType> segment of the model page. */
  subcategorySlug: string | null;
  /** primary_image prefixed with the API base URL; null when there is no image. */
  image: string | null;
  availability: "available" | "out_of_stock" | "on_request";
};

/** Raw /api/products item, before the camelCase mapping. */
type RawProduct = {
  id: number;
  slug: string;
  name: string;
  model_number: string;
  type: string | null;
  availability: "available" | "out_of_stock" | "on_request";
  brand: { name: string; slug: string } | null;
  category: { name: string; slug: string } | null;
  subcategory: { name: string; slug: string } | null;
  primary_image: string | null;
};

type Pagination = { page: number; limit: number; total: number; totalPages: number };

type ProductsResponse = {
  success: boolean;
  products: RawProduct[];
  pagination: Pagination;
};

/** Snake_case wire item → ApiProduct; image paths get the API base URL prefix. */
const toProduct = (item: RawProduct): ApiProduct => ({
  id: item.id,
  slug: item.slug,
  name: item.name,
  modelNumber: item.model_number,
  type: item.type,
  brandName: item.brand?.name ?? null,
  categorySlug: item.category?.slug ?? null,
  subcategorySlug: item.subcategory?.slug ?? null,
  image: item.primary_image ? `${API_BASE}${item.primary_image}` : null,
  availability: item.availability,
});

const rev = (items: ApiProduct[]): ApiProduct[] => [...items].reverse();

/** One raw API page, in the API's own (newest first) order. */
const fetchPage = (query: string): Promise<ProductsResponse> =>
  apiGet<ProductsResponse>(`/api/products?${query}`);

/** Every product of a query (≤ 60), reversed to oldest first. */
const fetchProducts = (query: string): Promise<ApiProduct[]> =>
  fetchPage(query).then((res) => rev(res.products.map(toProduct)));

/** Products of one brand — GET /api/products?brand=<slug>&limit=60, oldest first. */
export const fetchProductsByBrand = (brandSlug: string): Promise<ApiProduct[]> =>
  fetchProducts(`brand=${encodeURIComponent(brandSlug)}&limit=60`);

/** Products of one category — GET /api/products?category=<slug>&limit=60, oldest first. */
export const fetchProductsByCategory = (categorySlug: string): Promise<ApiProduct[]> =>
  fetchProducts(`category=${encodeURIComponent(categorySlug)}&limit=60`);

/* ── Product type pages: paginated, searchable, sortable model grid ───────── */

/** Grid sort order. The API itself only lists newest first (its sort whitelist
 *  is "newest" | "name"); "oldest" is produced by reading its pages from the end. */
export type ModelsSort = "oldest" | "newest";

export interface ModelsQuery {
  /** 1-based page of the grid. */
  page: number;
  /** Page size (1–60). */
  limit: number;
  /** Free-text search — matched against name, model number and brand on the server. */
  search?: string;
  /** Brand slug, from the filter chips. */
  brand?: string;
  sort?: ModelsSort;
}

export interface ModelsPage {
  /** This grid page, in display order. */
  items: ApiProduct[];
  total: number;
  totalPages: number;
}

/**
 * One grid page of a product type's models, oldest first by default.
 *
 * The API has no ascending sort, so "oldest" pages are read from the END of
 * its newest-first list. Aligned totals (total % limit = 0) map to a single
 * reversed API page; otherwise every grid page starts with the API's short
 * last page (total % limit items) and continues into the page before it.
 */
export const fetchModelsBySubcategory = async (
  subcategorySlug: string,
  q: ModelsQuery,
): Promise<ModelsPage> => {
  const filter =
    `subcategory=${encodeURIComponent(subcategorySlug)}&limit=${q.limit}` +
    (q.search ? `&search=${encodeURIComponent(q.search)}` : "") +
    (q.brand ? `&brand=${encodeURIComponent(q.brand)}` : "");

  if (q.sort === "newest") {
    const res = await fetchPage(`${filter}&page=${q.page}`);
    return {
      items: res.products.map(toProduct),
      total: res.pagination.total,
      totalPages: res.pagination.totalPages,
    };
  }

  const first = await fetchPage(`${filter}&page=1`);
  const { total, totalPages } = first.pagination;
  if (total === 0) return { items: [], total: 0, totalPages: 0 };
  if (totalPages === 1) return { items: rev(first.products.map(toProduct)), total, totalPages };

  const remainder = total % q.limit;
  const pageOf = (k: number): Promise<ProductsResponse> =>
    k === 1 ? Promise.resolve(first) : fetchPage(`${filter}&page=${k}`);

  if (remainder === 0) {
    const res = await pageOf(totalPages - q.page + 1);
    return { items: rev(res.products.map(toProduct)), total, totalPages };
  }

  const head = await pageOf(totalPages - q.page + 1);
  const headItems = rev(head.products.slice(0, remainder).map(toProduct));
  const tailPage = totalPages - q.page; // 0 on the last grid page
  const tailItems =
    tailPage >= 1
      ? rev((await pageOf(tailPage)).products.slice(-(q.limit - remainder)).map(toProduct))
      : [];
  return { items: [...headItems, ...tailItems], total, totalPages };
};

/** Brand names present in a subcategory, oldest first and unique — for the grid's filter chips. */
export const fetchSubcategoryBrands = async (subcategorySlug: string): Promise<string[]> => {
  const res = await fetchPage(`subcategory=${encodeURIComponent(subcategorySlug)}&limit=60`);
  const names = rev(res.products.map(toProduct)).map((p) => p.brandName);
  return [...new Set(names.filter((n): n is string => n !== null))];
};

/* ── Product type pages: server-paginated model grid ──────────────────────────
 *
 * The backend does the paging, sorting and searching itself:
 *   GET /api/products?subcategory=<slug>&page=<n>&limit=12&sort=<s>&search=<t>
 *   → { success, products, pagination: { page, limit, total, totalPages } }
 * Sorting options: created_asc (oldest first), created_desc, name.
 * pagination.totalPages is 0 when there are no results — treated as 1.
 */

/** Sort orders the products API accepts for the model grid. */
export type ModelsPageSort = "created_asc" | "created_desc" | "name";

export interface PaginatedModelsQuery {
  /** 1-based page of the grid. */
  page?: number;
  /** Models per page — the grid uses 12. */
  limit?: number;
  sort?: ModelsPageSort;
  /** Free-text search — matched against name, model number and brand on the server. */
  search?: string;
}

/** One grid page of models — every field always present, never undefined. */
export interface PaginatedModelsPage {
  products: ApiProduct[];
  total: number;
  page: number;
  /** At least 1 — the API reports 0 when there are no results. */
  totalPages: number;
}

/**
 * One server-paginated page of a product type's models, oldest first
 * by default (created_asc) so new models appear at the end of the grid.
 *
 * Resolves with safe defaults ([], 0, 1, 1) when the request fails or
 * the response is malformed, so callers can render "nothing" without
 * guarding against undefined fields.
 */
export const fetchPaginatedModels = async (
  subcategorySlug: string,
  q: PaginatedModelsQuery = {},
): Promise<PaginatedModelsPage> => {
  try {
    const res = await apiGetQ<ProductsResponse>("/api/products", {
      subcategory: subcategorySlug,
      page: q.page ?? 1,
      limit: q.limit ?? 12,
      sort: q.sort ?? "created_asc",
      search: q.search || undefined,
    });
    const products = Array.isArray(res?.products) ? res.products.map(toProduct) : [];
    const p = res?.pagination;
    return {
      products,
      total: p?.total ?? 0,
      page: p?.page ?? 1,
      totalPages: Math.max(1, p?.totalPages ?? 0),
    };
  } catch {
    // Backend unreachable or errored — safe defaults, the caller renders nothing.
    return { products: [], total: 0, page: 1, totalPages: 1 };
  }
};
