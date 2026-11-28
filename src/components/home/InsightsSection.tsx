import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AuthorAvatar } from "@/components/blog/AuthorAvatar";
import { publishedPosts, readingMinutes } from "@/data/blog";
import { getAuthor } from "@/data/authors";
import { formatPostDate } from "@/lib/dates";
import { fetchPosts } from "@/lib/insightsApi";
import type { BlogPost } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Colour per category — the cover plate and chip take the category's hue so
 * a card is identifiable at a glance and the section reads as a set, not as
 * four identical boxes. Hues are tints of the sky/navy family the rest of the
 * homepage uses; an unknown category falls back to sky.
 */
const CATEGORY_TONE: Record<string, { chip: string; cover: string; glow: string; numeral: string }> = {
  Security: {
    chip: "border-sky-400/30 bg-sky-400/10 text-sky-200",
    cover: "from-sky-500/35 via-sky-900/40 to-[#0b1220]",
    glow: "bg-sky-400/40",
    numeral: "text-sky-200/30",
  },
  Networking: {
    chip: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
    cover: "from-cyan-500/35 via-cyan-900/40 to-[#0b1220]",
    glow: "bg-cyan-400/40",
    numeral: "text-cyan-200/30",
  },
  "IT Support": {
    chip: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    cover: "from-emerald-500/35 via-emerald-900/40 to-[#0b1220]",
    glow: "bg-emerald-400/40",
    numeral: "text-emerald-200/30",
  },
  Microsoft: {
    chip: "border-indigo-400/30 bg-indigo-400/10 text-indigo-200",
    cover: "from-indigo-500/35 via-indigo-900/40 to-[#0b1220]",
    glow: "bg-indigo-400/40",
    numeral: "text-indigo-200/30",
  },
  Hardware: {
    chip: "border-amber-400/30 bg-amber-400/10 text-amber-100",
    cover: "from-amber-500/30 via-amber-900/40 to-[#0b1220]",
    glow: "bg-amber-400/35",
    numeral: "text-amber-100/30",
  },
};

const FALLBACK_TONE = CATEGORY_TONE.Security;

/** Typographic cover — flat plate, category hue, hairline grid. No stock photos. */
function ArticleCover({
  post,
  index,
  tone,
}: {
  post: (typeof publishedPosts)[number];
  index: number;
  tone: (typeof CATEGORY_TONE)[string];
}) {
  return (
    <span className={cn("relative flex h-36 items-end overflow-hidden p-4 sm:h-44", tone.cover, "bg-gradient-to-br")} aria-hidden="true">
      <span className={cn("absolute -right-8 -top-10 size-36 rounded-full blur-3xl transition-transform duration-500 motion-safe:group-hover:-translate-x-3 motion-safe:group-hover:translate-y-3", tone.glow)} />
      <span className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:linear-gradient(to_top_left,#000_20%,transparent_85%)]" />
      <span className="relative flex w-full items-end justify-between gap-3">
        <span className="display-title text-3xl text-white/95 sm:text-4xl">{post.coverWord}</span>
        <span className={cn("font-display text-4xl font-medium tabular-nums leading-none", tone.numeral)}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>
    </span>
  );
}

export function InsightsSection() {
  const [apiPosts, setApiPosts] = useState<BlogPost[] | null>(null);
  const [apiSettled, setApiSettled] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchPosts().then((posts) => {
      if (!cancelled) {
        setApiPosts(posts);
        setApiSettled(true);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const staticList: BlogPost[] = [...publishedPosts];
  const byDateDesc = (a: BlogPost, b: BlogPost) => b.publishedAt.localeCompare(a.publishedAt);
  const list = (apiSettled && apiPosts != null && apiPosts.length > 0 ? apiPosts : staticList)
    .slice()
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || byDateDesc(a, b));
  const latest = list.slice(0, 3);
  if (!latest.length) return null;

  return (
    <section
      className="relative isolate overflow-hidden border-y border-white/10 bg-[#0b1220] text-white band"
      aria-labelledby="insights-heading"
    >
      {/* ambient wash tying the section to the sky palette above it */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(ellipse_at_top,#0e3a5c_0%,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="insights-heading"
            align="left"
            eyebrow="Insights"
            title="Field notes from the engineers."
            description="Practical guidance on compliance, networks and support — written for the decisions UAE businesses actually make."
          />
          <Link
            to="/blog"
            className="group inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-sky-300 transition-colors hover:text-sky-200 sm:self-auto"
          >
            All articles
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, i) => {
            const tone = CATEGORY_TONE[post.category] ?? FALLBACK_TONE;
            const author = getAuthor(post.authorId);

            return (
              <li key={post.id}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-colors duration-300 hover:border-sky-400/50 hover:bg-white/[0.07]"
                >
                  <ArticleCover post={post} index={i} tone={tone} />
                  <div className="flex flex-1 flex-col border-t border-white/10 p-5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
                      <span className={cn("rounded-full border px-2.5 py-1", tone.chip)}>{post.category}</span>
                      <time dateTime={post.publishedAt} className="text-slate-400 tabular-nums">
                        {formatPostDate(post.publishedAt)}
                      </time>
                    </div>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-white">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">{post.dek}</p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs text-slate-400">
                      <span className="flex min-w-0 items-center gap-2">
                        {author && <AuthorAvatar author={author} className="size-5 text-[8px]" />}
                        <span className="truncate">{readingMinutes(post)} min read</span>
                      </span>
                      <span
                        className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-sky-300 transition-colors group-hover:text-sky-200"
                        aria-hidden="true"
                      >
                        Read
                        <ArrowUpRight className="size-4 transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
