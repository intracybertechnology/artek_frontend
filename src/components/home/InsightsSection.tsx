import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { publishedPosts } from "@/data/blog";
import { formatPostDate } from "@/lib/dates";

/**
 * Homepage — latest insights.
 *
 * Text-only ruled rows (no covers) so the homepage stays light and the blog
 * index carries the imagery. Renders nothing until at least one post is
 * published, so the section never ships empty.
 */
export function InsightsSection() {
  const latest = publishedPosts.slice(0, 3);
  if (!latest.length) return null;

  return (
    <section className="on-paper bg-paper border-y border-slate-900/10 band" aria-labelledby="insights-heading">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="insights-heading"
            align="left"
            tone="paper"
            eyebrow="Insights"
            title="Field notes from the engineers."
            description="Practical guidance on compliance, networks and support — written for the decisions UAE businesses actually make."
          />
          <Link
            to="/blog"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-slate-600"
          >
            All articles
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-12 border-t border-slate-900/10">
          {latest.map((post) => (
            <li key={post.id} className="border-b border-slate-900/10">
              <Link
                to={`/blog/${post.slug}`}
                className="group grid gap-x-8 gap-y-2 py-6 sm:grid-cols-[7.5rem_minmax(0,1fr)_auto] sm:items-baseline"
              >
                <time
                  dateTime={post.publishedAt}
                  className="text-[11px] font-semibold uppercase tracking-[0.14em] tabular-nums text-slate-600"
                >
                  {formatPostDate(post.publishedAt)}
                </time>
                <h3 className="display-title text-[clamp(1.15rem,1rem+0.6vw,1.5rem)] text-slate-900 transition-colors group-hover:text-slate-700">
                  {post.title}
                </h3>
                <span className="hidden items-center gap-4 sm:flex">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                    {post.category}
                  </span>
                  <ArrowRight
                    className="size-4 text-slate-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-slate-900"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
