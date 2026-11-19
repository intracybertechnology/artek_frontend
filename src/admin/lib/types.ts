export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff";
};

export type EnquiryStatus = "new" | "contacted" | "quoted" | "won" | "lost";
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

export const ENQUIRY_STATUSES: EnquiryStatus[] = ["new", "contacted", "quoted", "won", "lost"];

export type BlogStatus = "draft" | "published";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  category: string;
  authorId: string;
  content: string;
  coverImage: string | null;
  coverAlt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  status: BlogStatus;
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

/** What the editor sends. Dates are YYYY-MM-DD or null. */
export type BlogInput = Pick<
  BlogPost,
  | "slug"
  | "title"
  | "dek"
  | "category"
  | "authorId"
  | "content"
  | "coverImage"
  | "coverAlt"
  | "seoTitle"
  | "seoDescription"
  | "status"
  | "featured"
  | "publishedAt"
>;

export const BLOG_CATEGORIES = [
  "IT Infrastructure",
  "Cybersecurity",
  "CCTV & Surveillance",
  "Business IT Solutions",
  "Networking & Connectivity",
  "Cloud Solutions",
  "Access Control & Security",
  "Technology Insights",
] as const;
