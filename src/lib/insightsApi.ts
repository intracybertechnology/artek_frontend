import { API_BASE, apiGet } from "@/lib/api";
import type { ApiError } from "@/lib/api";
import type { BlogPost, PostBlock, SeoMeta, ServiceId } from "@/types";

type RawPostBase = {
  id: number | string;
  slug: string;
  title: string;
  dek: string;
  category: string;
  tags: string[];
  authorId: string;
  publishedAt: string;
  updatedAt?: string | null;
  featured?: boolean | null;
  coverWord: string;
  relatedServices: string[];
  status: string;
};

type RawPostListItem = RawPostBase;

type RawPostBlock = {
  type: string;
  text?: string;
  id?: string;
  items?: readonly string[];
  cite?: string;
  title?: string;
  head?: readonly string[];
  rows?: readonly (readonly string[])[];
  src?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  caption?: string | null;
};

type RawPostDetail = RawPostBase & {
  body: RawPostBlock[];
  faqs?: { question: string; answer: string }[] | null;
  seo?: { title: string; description: string; ogType?: string | null; ogImage?: string | null } | null;
  prev?: { slug: string; title: string } | null;
  next?: { slug: string; title: string } | null;
};

type ListResponse = {
  success: boolean;
  posts: RawPostListItem[];
  categories: string[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
};

type DetailResponse = {
  success: boolean;
  post: RawPostDetail;
  prev?: { slug: string; title: string } | null;
  next?: { slug: string; title: string } | null;
};

type PostResult =
  | { kind: "found"; post: BlogPost }
  | { kind: "notFound" };

function mapImageBlock(block: RawPostBlock): PostBlock {
  if (
    block.type === "image" &&
    block.src &&
    typeof block.src === "string" &&
    block.src.startsWith("/")
  ) {
    return { ...block, type: "image" as const, src: `${API_BASE}${block.src}` } as PostBlock;
  }
  return block as PostBlock;
}

function toPost(item: RawPostListItem): BlogPost {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    dek: item.dek,
    category: item.category,
    tags: item.tags,
    authorId: item.authorId,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt ?? undefined,
    featured: Boolean(item.featured),
    coverWord: item.coverWord,
    body: [],
    relatedServices: item.relatedServices as ServiceId[],
    status: item.status as BlogPost["status"],
  };
}

function toPostDetail(item: RawPostDetail): BlogPost {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    dek: item.dek,
    category: item.category,
    tags: item.tags,
    authorId: item.authorId,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt ?? undefined,
    featured: Boolean(item.featured),
    coverWord: item.coverWord,
    body: item.body.map(mapImageBlock),
    faqs: item.faqs ?? undefined,
    relatedServices: item.relatedServices as ServiceId[],
    seo: item.seo == null ? undefined : (item.seo as SeoMeta),
    status: item.status as BlogPost["status"],
  };
}

export async function fetchPosts(): Promise<BlogPost[] | null> {
  try {
    const res = await apiGet<ListResponse>(`/api/insights?limit=50`);
    if (!res.success || !Array.isArray(res.posts)) return [];
    return res.posts.map(toPost);
  } catch {
    return null;
  }
}

export async function fetchPostBySlug(slug: string): Promise<PostResult | null> {
  try {
    const res = await apiGet<DetailResponse>(`/api/insights/${slug}`);
    if (!res.success || !res.post) return { kind: "notFound" };
    return { kind: "found", post: toPostDetail(res.post) };
  } catch (err) {
    const apiErr = err as ApiError;
    if (apiErr.status === 404) return { kind: "notFound" };
    return null;
  }
}
