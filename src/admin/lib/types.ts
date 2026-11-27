export type AdminRole = "super_admin" | "admin";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
};

export type QuoteStatus = "new" | "contacted" | "closed";
export const QUOTE_STATUSES: QuoteStatus[] = ["new", "contacted", "closed"];

// ── Testimonials (admin) ───────────────────────────────────────────────────

export type AdminTestimonial = {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  image: string | null;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

// ── Insights / blog (admin) ───────────────────────────────────────────────

export type PostStatus = "draft" | "needs-review" | "published";
export const POST_STATUSES: PostStatus[] = ["draft", "needs-review", "published"];

export type AdminPost = {
  id: number;
  slug: string;
  title: string;
  dek: string;
  category: string;
  tags: string[];
  authorId: string;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  coverWord: string;
  relatedServices: string[];
  seo: { title?: string; description?: string } | null;
  status: PostStatus;
  readingMinutes: number;
  deletedAt?: string | null;
};

export type AdminPostDetail = AdminPost & {
  body: { type: string; text?: string; [key: string]: unknown }[];
  faqs: { question: string; answer: string }[] | null;
};

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
  description: string | null;
  availability: ProductAvailability;
  specifications: Record<string, string> | null;
  is_active: boolean;
  category_id: string | null;
  subcategory_id: string | null;
  brand_id: string | null;
  brand: { id: string; name: string; slug: string } | null;
  category: { id: string; name: string; slug: string } | null;
  subcategory: { id: string; name: string; slug: string } | null;
  primary_image: string | null;
  images: AdminProductImage[];
  deleted_at?: string | null;
};

export type AdminProductImage = {
  id: string;
  image_path: string;
  is_primary: boolean;
  sort_order: number;
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
