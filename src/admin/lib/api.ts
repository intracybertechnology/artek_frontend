/**
 * Admin API client — uses the shared fetch helpers from src/lib/api.ts
 * so all requests go to API_BASE with credentials: "include".
 */
import { API_BASE, apiDelete, apiGet, apiGetQ, apiPatch, apiPost, type ApiError } from "@/lib/api";
import type {
  AdminBrand,
  AdminCategory,
  AdminProduct,
  AdminProductImage,
  AdminTestimonial,
  AdminUser,
  ProductAvailability,
  Quote,
  QuoteStatus,
} from "./types";

// ── Auth ──────────────────────────────────────────────────────────────────

export const authLogin = (email: string, password: string) =>
  apiPost<{ success: boolean; user: AdminUser }>("/api/auth/login", { email, password });

export const authLogout = () =>
  apiPost<{ success: boolean }>("/api/auth/logout", {});

export const authMe = () =>
  apiGet<{ success: boolean; user: AdminUser }>("/api/auth/me");

// ── Quotes ────────────────────────────────────────────────────────────────

export type QuoteListResponse = {
  quotes: Quote[];
  total: number;
  page: number;
  totalPages: number;
};

type QuotesApiResponse = {
  success: boolean;
  quotes?: Quote[] | null;
  pagination?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  } | null;
};

export const listQuotes = async (params: {
  page?: number;
  limit?: number;
  status?: QuoteStatus | "";
}): Promise<QuoteListResponse> => {
  const data = await apiGetQ<QuotesApiResponse>("/api/quotes", {
    page: params.page,
    limit: params.limit,
    status: params.status || undefined,
  });
  const total = data.pagination?.total ?? 0;
  const totalPages = data.pagination?.totalPages ?? 0;
  return {
    quotes: data.quotes ?? [],
    total,
    page: data.pagination?.page ?? params.page ?? 1,
    totalPages: totalPages > 0 ? totalPages : 1,
  };
};

export const updateQuoteStatus = (id: string, status: QuoteStatus) =>
  apiPatch<{ success: boolean; data: Quote }>(`/api/quotes/${id}`, { status });

// ── Products ──────────────────────────────────────────────────────────────

export type ProductListResponse = {
  products: AdminProduct[];
  total: number;
  page: number;
  totalPages: number;
};

type ProductsApiResponse = {
  success: boolean;
  products?: AdminProduct[] | null;
  pagination?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  } | null;
};

export const listProducts = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  brand?: string;
  availability?: ProductAvailability | "";
  deleted?: boolean;
}): Promise<ProductListResponse> => {
  const data = await apiGetQ<ProductsApiResponse>("/api/admin/products", {
    page: params.page,
    limit: params.limit,
    search: params.search || undefined,
    category: params.category || undefined,
    brand: params.brand || undefined,
    availability: params.availability || undefined,
    deleted: params.deleted ? "true" : undefined,
  });
  const total = data.pagination?.total ?? 0;
  const totalPages = data.pagination?.totalPages ?? 0;
  return {
    products: data.products ?? [],
    total,
    page: data.pagination?.page ?? params.page ?? 1,
    totalPages: totalPages > 0 ? totalPages : 1,
  };
};

export const deleteProduct = (id: string) =>
  apiDelete<{ success: boolean }>(`/api/products/${id}`);

export const restoreProduct = (id: string) =>
  apiPost<{ success: boolean }>(`/api/products/${id}/restore`, {});

export const listCategories = () =>
  apiGet<{ success: boolean; categories: AdminCategory[] }>("/api/categories");

export const listBrands = () =>
  apiGet<{ success: boolean; brands: AdminBrand[] }>("/api/brands");

// ── Testimonials ───────────────────────────────────────────────────────────

type TestimonialsApiResponse = {
  success: boolean;
  testimonials?: AdminTestimonial[] | null;
};

type TestimonialApiResponse = {
  success: boolean;
  testimonial?: AdminTestimonial | null;
};

type TestimonialCreateBody = {
  quote: string;
  name: string;
  role?: string | null;
  company?: string | null;
  rating?: number | null;
  isPublished?: boolean;
  sortOrder?: number;
};

export const listTestimonials = async (params?: {
  deleted?: boolean;
}): Promise<AdminTestimonial[]> => {
  const data = await apiGet<TestimonialsApiResponse>(
    "/api/admin/testimonials" + (params?.deleted ? "?deleted=true" : ""),
  );
  return data.testimonials ?? [];
};

export const getTestimonial = async (id: number): Promise<AdminTestimonial> => {
  const res = await apiGet<TestimonialApiResponse>(`/api/admin/testimonials/${id}`);
  if (res.testimonial) return res.testimonial;
  // Fallback: the body itself is the testimonial (no wrapper).
  return res as unknown as AdminTestimonial;
};

export const createTestimonial = (body: TestimonialCreateBody) =>
  apiPost<{ success: boolean; testimonial?: AdminTestimonial | null }>("/api/testimonials", body);

export const updateTestimonial = (id: number, body: Partial<TestimonialCreateBody>) =>
  apiPatch<{ success: boolean }>(`/api/testimonials/${id}`, body);

export const togglePublishTestimonial = (id: number, isPublished: boolean) =>
  apiPatch<{ success: boolean }>(`/api/testimonials/${id}`, { isPublished });

export const reorderTestimonials = (ids: number[]) =>
  apiPatch<{ success: boolean }>("/api/testimonials/reorder", { ids });

export const uploadTestimonialImage = (id: number, file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  return fetch(`${API_BASE}/api/testimonials/${id}/image`, {
    credentials: "include",
    method: "POST",
    body: formData,
  }).then(async (res) => {
    const body = await res.json().catch(() => ({}) as Record<string, unknown>);
    if (!res.ok) {
      const err = new Error(
        (body as { message?: string }).message ||
          (body as { error?: string }).error ||
          `Request failed (${res.status})`,
      ) as ApiError;
      err.status = res.status;
      throw err;
    }
    return body as { success: boolean };
  });
};

export const deleteTestimonialImage = (id: number) =>
  apiDelete<{ success: boolean }>(`/api/testimonials/${id}/image`);

export const deleteTestimonial = (id: number) =>
  apiDelete<{ success: boolean }>(`/api/testimonials/${id}`);

export const restoreTestimonial = (id: number) =>
  apiPost<{ success: boolean }>(`/api/testimonials/${id}/restore`, {});

// ── Product detail (add / edit) ──

type ProductByIdResponse = {
  success: boolean;
  product?: AdminProduct | null;
};

export const getProduct = async (id: string): Promise<AdminProduct> => {
  const res = await apiGet<ProductByIdResponse>(`/api/admin/products/${id}`);
  if (res.product) return res.product;
  // Fallback: the body itself is the product (no wrapper).
  return res as unknown as AdminProduct;
};

export const getProductBySlug = (slug: string) =>
  apiGet<{ success: boolean; product?: AdminProduct | null }>(`/api/products/${slug}`);

type ProductCreateBody = {
  name: string;
  model_number: string;
  category_id: number;
  subcategory_id?: number | null;
  brand_id: number;
  description?: string;
  availability?: ProductAvailability;
  specifications?: Record<string, string>;
  is_active?: boolean;
};

type ProductCreateResponse = {
  success: boolean;
  product?: AdminProduct | null;
  data?: { id?: string } | null;
};

export const createProduct = (body: ProductCreateBody) =>
  apiPost<ProductCreateResponse>("/api/products", body);

export const updateProduct = (id: string, body: Partial<ProductCreateBody>) =>
  apiPatch<{ success: boolean }>(`/api/products/${id}`, body);

// ── Product images ──

export const uploadProductImages = (id: string, files: FileList | File[]) => {
  const formData = new FormData();
  for (const file of Array.from(files ?? [])) formData.append("images", file);
  return fetch(`${API_BASE}/api/products/${id}/images`, {
    credentials: "include",
    method: "POST",
    body: formData,
  }).then(async (res) => {
    const body = await res.json().catch(() => ({}) as Record<string, unknown>);
    if (!res.ok) {
      const err = new Error(
        (body as { message?: string }).message ||
          (body as { error?: string }).error ||
          `Request failed (${res.status})`,
      ) as ApiError;
      err.status = res.status;
      throw err;
    }
    return body as { success: boolean; images?: AdminProductImage[] };
  });
};

export const setPrimaryImage = (id: string, imageId: string) =>
  apiPatch<{ success: boolean }>(`/api/products/${id}/images/${imageId}/primary`, {});

export const deleteProductImage = (id: string, imageId: string) =>
  apiDelete<{ success: boolean }>(`/api/products/${id}/images/${imageId}`);
