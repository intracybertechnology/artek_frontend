import { useCallback, useEffect, useMemo, useState } from "react";
import { PencilIcon, RotateCcwIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/admin/lib/auth";
import {
  deletePost,
  listAdminPosts,
  restorePost,
  updatePostStatus,
} from "@/admin/lib/api";
import type { AdminPost, PostStatus } from "@/admin/lib/types";
import { type ApiError } from "@/lib/api";
import { Alert } from "@/admin/components/ui/alert";
import { Badge } from "@/admin/components/ui/badge";
import { Button } from "@/admin/components/ui/button";
import { Card } from "@/admin/components/ui/card";
import { Label } from "@/admin/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/admin/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/admin/components/ui/table";

const PAGE_SIZE = 25;

const STATUS_LABELS: Record<PostStatus, string> = {
  draft: "Draft",
  "needs-review": "Needs review",
  published: "Published",
};

const STATUS_VARIANT: Record<PostStatus, "outline" | "secondary" | "destructive"> = {
  draft: "secondary",
  "needs-review": "outline",
  published: "outline",
};

function friendlyError(err: unknown): string {
  if (err instanceof Error) {
    const e = err as ApiError;
    if (e.status === 401) return "Your session has expired. Please sign in again.";
    if (e.status === 403) return "You do not have access";
    if (e.status === 0 || !e.status) return "Network error — check your connection.";
  }
  return "Could not load posts";
}

export function AdminInsightsPage() {
  const navigate = useNavigate();
  const { role } = useAuth();
  const [items, setItems] = useState<AdminPost[]>([]);
  const [page, setPage] = useState(1);
  const [showDeleted, setShowDeleted] = useState(false);
  const [statusFilter, setStatusFilter] = useState<PostStatus | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<AdminPost | null>(null);
  const [busy, setBusy] = useState(false);
  const isSuperAdmin = role === "super_admin";

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listAdminPosts({
        deleted: showDeleted,
        status: statusFilter || undefined,
      });
      setItems(res);
    } catch (err) {
      const ae = err as ApiError;
      if (ae.status === 401) navigate("/admin/login", { replace: true });
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  }, [showDeleted, statusFilter, navigate]);

  useEffect(() => { void load(); }, [load]);

  const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, page]);

  async function onToggleStatus(p: AdminPost) {
    setBusy(true);
    setError(null);
    try {
      const nextStatus: PostStatus = p.status === "published" ? "draft" : "published";
      await updatePostStatus(p.id, nextStatus);
      await load();
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  }

  async function onDelete() {
    if (!confirming) return;
    setBusy(true);
    setError(null);
    try {
      await deletePost(confirming.id);
      setConfirming(null);
      await load();
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  }

  async function onRestore(p: AdminPost) {
    setBusy(true);
    setError(null);
    try {
      await restorePost(p.id);
      await load();
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-dvh">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Insights</h1>
            <p className="text-sm text-muted-foreground">Manage blog posts shown on the Insights page</p>
          </div>
          <Button onClick={() => navigate("/admin/insights/new")}>New post</Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6">
        {error && (
          <Alert tone="destructive" className="flex items-center justify-between gap-3">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={() => void load()}>
              Retry
            </Button>
          </Alert>
        )}

        <Card className="gap-0 py-0">
          <div className="border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={showDeleted ? "secondary" : "outline"}
                size="sm"
                aria-pressed={showDeleted}
                onClick={() => { setShowDeleted((v) => !v); setPage(1); }}
                disabled={!isSuperAdmin}
              >
                {showDeleted ? "Showing deleted" : "Show deleted"}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="status-filter">Status</Label>
              <Select
                value={statusFilter}
                onValueChange={(v) => { setStatusFilter(v as PostStatus | ""); setPage(1); }}
              >
                <SelectTrigger className="w-[140px]" aria-label="Filter by status">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="" value="">
                    All statuses
                  </SelectItem>
                  {Object.entries(STATUS_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left w-48">Title</TableHead>
                <TableHead className="text-muted-foreground text-left">Category</TableHead>
                <TableHead className="text-muted-foreground text-center w-20">Status</TableHead>
                <TableHead className="text-muted-foreground text-center w-12">★</TableHead>
                <TableHead className="text-muted-foreground text-right w-24">Published</TableHead>
                <TableHead className="text-muted-foreground text-right w-24">Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && items.length === 0
                ? Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 7 }).map((__, j) => (
                        <TableCell key={j}>
                          <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : items.length === 0
                  ? (
                    <TableRow>
                      <TableCell colSpan={7} className="py-14 text-center text-muted-foreground">
                        No posts found
                      </TableCell>
                    </TableRow>
                  )
                  : paged.map((p) => {
                      return (
                        <TableRow key={p.id}>
                          <TableCell>
                            <span className="font-medium">{p.title}</span>
                            {p.dek && <div className="text-xs text-muted-foreground truncate max-w-[200px]">{p.dek}</div>}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {p.category}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant={STATUS_VARIANT[p.status]} className="text-xs">
                              {STATUS_LABELS[p.status]}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center text-muted-foreground">
                            {p.featured ? "★" : "—"}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-right">
                            {new Date(p.publishedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-right">
                            {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate(`/admin/insights/${p.id}/edit`)}
                              >
                                <PencilIcon className="size-3.5" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={busy}
                                onClick={() => onToggleStatus(p)}
                              >
                                {p.status === "published" ? "Unpublish" : "Publish"}
                              </Button>
                              {isSuperAdmin ? (
                                showDeleted ? (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={busy}
                                    onClick={() => void onRestore(p)}
                                  >
                                    <RotateCcwIcon className="size-3.5" />
                                    Restore
                                  </Button>
                                ) : (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={busy}
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => setConfirming(p)}
                                  >
                                    <Trash2Icon className="size-3.5" />
                                  </Button>
                                )
                              ) : null}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
            </TableBody>
          </Table>
        </Card>

        {items.length > 0 && (
          <nav aria-label="Pagination" className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">
              {`Page ${page} of ${pages} · ${items.length} total`}
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="text-muted-foreground">
                {page} / {pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= pages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </nav>
        )}
      </main>

      {confirming && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-title"
        >
          <div className="w-full max-w-sm rounded-lg border bg-card p-5 shadow-lg">
            <h2 id="confirm-delete-title" className="text-base font-semibold">
              Delete post?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              “{confirming.title}” will be moved to deleted. You can restore it later.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={busy}
                onClick={() => setConfirming(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={busy}
                onClick={() => void onDelete()}
              >
                {busy ? "Deleting…" : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
