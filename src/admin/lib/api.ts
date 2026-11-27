/**
 * Admin API client — uses the shared fetch helpers from src/lib/api.ts
 * so all requests go to API_BASE with credentials: "include".
 */
import { apiDelete, apiGet, apiGetQ, apiPatch, apiPost } from "@/lib/api";
import type {
  AdminBrand,
  AdminCategory,
  AdminProduct,
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
