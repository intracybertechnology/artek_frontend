import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import { api } from "@/admin/lib/api";
import type { BlogPost, BlogStatus } from "@/admin/lib/types";
import { Alert } from "@/admin/components/ui/alert";
import { Button } from "@/admin/components/ui/button";
import { Card, CardContent } from "@/admin/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/admin/components/ui/table";
import { cn } from "@/lib/utils";

const fmt = (iso: string) => new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

const FILTERS: { key: "all" | BlogStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "published", label: "Published" },
  { key: "draft", label: "Drafts" },
];

function StatusPill({ status }: { status: BlogStatus }) {
  const published = status === "published";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        published ? "bg-emerald-100 text-emerald-900" : "bg-muted text-muted-foreground",
      )}
    >
      <span className={cn("size-1.5 rounded-full", published ? "bg-emerald-600" : "bg-muted-foreground")} />
      {published ? "Published" : "Draft"}
    </span>
  );
}

export function BlogListPage() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState<"all" | BlogStatus>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .listBlog()
      .then((res) => setItems(res.items))
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load posts."))
      .finally(() => setLoading(false));
  }, []);

  const shown = filter === "all" ? items : items.filter((p) => p.status === filter);
  const count = (key: "all" | BlogStatus) => (key === "all" ? items.length : items.filter((p) => p.status === key).length);

  return (
    <div className="min-h-dvh">
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Blog posts</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Published posts appear on the site after the next rebuild.
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/blog/new">
              <PlusIcon />
              New post
            </Link>
          </Button>
        </div>

        <div role="tablist" aria-label="Filter posts" className="flex gap-1 border-b">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "-mb-px border-b-2 px-3 pb-3 text-sm font-medium transition-colors",
                filter === f.key
                  ? "border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground border-transparent",
              )}
            >
              {f.label}
              <span className="text-muted-foreground ml-2 text-xs tabular-nums">{count(f.key)}</span>
            </button>
          ))}
        </div>

        {error && <Alert tone="destructive">{error}</Alert>}

        <Card className="gap-0 py-0">
          <CardContent className="px-0">
            {loading ? (
              <p className="text-muted-foreground px-6 py-12 text-center text-sm">Loading posts…</p>
            ) : shown.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-sm font-medium">
                  {items.length === 0 ? "No posts yet" : `No ${filter === "draft" ? "drafts" : "published posts"}`}
                </p>
                {items.length === 0 && (
                  <p className="text-muted-foreground mt-1 text-sm">Write your first article to get started.</p>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Last updated</TableHead>
                    <TableHead className="text-right"><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shown.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="max-w-md whitespace-normal">
                        <Link to={`/admin/blog/${post.id}`} className="font-medium hover:underline">
                          {post.title}
                        </Link>
                        <p className="text-muted-foreground mt-0.5 truncate text-xs">/blog/{post.slug}</p>
                      </TableCell>
                      <TableCell className="text-muted-foreground hidden text-sm md:table-cell">{post.category}</TableCell>
                      <TableCell>
                        <StatusPill status={post.status} />
                      </TableCell>
                      <TableCell className="text-muted-foreground hidden text-sm sm:table-cell">
                        {fmt(post.updatedAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/admin/blog/${post.id}`}>Edit</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
