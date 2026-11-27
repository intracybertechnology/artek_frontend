export type AdminRole = "super_admin" | "admin";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
};

export type QuoteStatus = "new" | "contacted" | "closed";
export const QUOTE_STATUSES: QuoteStatus[] = ["new", "contacted", "closed"];

// ── Products (admin) ──────────────────────────────────────────────────────

export type ProductAvailability = "available" | "out_of_stock" | "on_request";
export const PRODUCT_AVAILABILITIES: ProductAvailability[] = [
  "available",
  "out_of_stock",
  "on_request",
];

export type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  model_number: string | null;
  type: string | null;
  short_description: string | null;
  availability: ProductAvailability;
  brand: { name: string; slug: string } | null;
  category: { name: string; slug: string } | null;
  subcategory: { name: string; slug: string } | null;
  primary_image: string | null;
  is_active?: boolean;
  deleted_at?: string | null;
};

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  subcategories: { id: string; name: string; slug: string }[];
};

export type AdminBrand = {
  id: string;
  name: string;
  slug: string;
  logo_path: string | null;
};

export type Quote = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  product_id: string | null;
  product_name: string | null;
  model_number: string | null;
  brand_name: string | null;
  email_sent: boolean;
  status: QuoteStatus;
  created_at: string;
};

/** ── Legacy types kept so the old EnquirySheet still compiles if referenced ── */
export type EnquiryStatus = "new" | "contacted" | "quoted" | "won" | "lost";
export const ENQUIRY_STATUSES: EnquiryStatus[] = ["new", "contacted", "quoted", "won", "lost"];
export type NotificationStatus = "pending" | "sent" | "failed" | "skipped";

export type Enquiry = {
  id: string;
  fullName: string;
  companyName: string | null;
  email: string;
  phone: string;
  service: string;
  emirate: string;
  message: string | null;
  source: string;
  notificationStatus: NotificationStatus;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
};
