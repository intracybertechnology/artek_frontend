import { useCallback, useEffect, useState } from "react";
import { PackageIcon, PencilIcon, RotateCcwIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  deleteProduct,
  listBrands,
  listCategories,
  listProducts,
  restoreProduct,
} from "@/admin/lib/api";
import { useAuth } from "@/admin/lib/auth";
import type { AdminBrand, AdminCategory, AdminProduct, ProductAvailability } from "@/admin/lib/types";
import { PRODUCT_AVAILABILITIES } from "@/admin/lib/types";
import { API_BASE, type ApiError } from "@/lib/api";
import { Alert } from "@/admin/components/ui/alert";
import { Badge } from "@/admin/components/ui/badge";
import { Button } from "@/admin/components/ui/button";
import { Card } from "@/admin/components/ui/card";
import { Input } from "@/admin/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/admin/components/ui/select";
import { Skeleton } from "@/admin/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/admin/components/ui/table";

const PAGE_SIZE = 25;

const AVAILABILITY_LABELS: Record<ProductAvailability, string> = {
  available: "Available",
  out_of_stock: "Out of stock",
  on_request: "On request",
};

const AVAILABILITY_CLASSES: Record<ProductAvailability, string> = {
  available: "border-transparent bg-emerald-100 text-emerald-900",
  out_of_stock: "border-transparent bg-red-100 text-red-800",
  on_request: "border-transparent bg-amber-100 text-amber-900",
};

function AvailabilityBadge({ status }: { status: ProductAvailability }) {
  return <Badge className={AVAILABILITY_CLASSES[status]}>{AVAILABILITY_LABELS[status]}</Badge>;
}

function StatusBadge({ product }: { product: AdminProduct }) {
  if (product.deleted_at) return <Badge variant="destructive">Deleted</Badge>;
  if (product.is_active === false) return <Badge variant="secondary">Inactive</Badge>;
  return <Badge variant="outline">Active</Badge>;
}

function friendlyError(err: unknown): string {
  if (err instanceof Error) {
    const e = err as ApiError;
    if (e.status === 401) return "Your session has expired. Please sign in again.";
    if (e.status === 403) return "You do not have access";
    if (e.status === 0 || !e.status) return "Network error — check your connection.";
  }
  return "Could not load products";
}

export function ProductsPage() {
  const navigate = useNavigate();
  const { role } = useAuth();
  // Delete / restore / "Show deleted" are super_admin-only.
  const canManageDeleted = role === "super_admin";
  const [items, setItems] = useState<AdminProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [availability, setAvailability] = useState<"" | ProductAvailability>("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [brands, setBrands] = useState<AdminBrand[]>([]);

  const [confirming, setConfirming] = useState<AdminProduct | null>(null);
  const [busy, setBusy] = useState(false);

  // Debounce the search box (300 ms).
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Filter dropdowns are loaded once.
  useEffect(() => {
    let cancelled = false;
    listCategories()
      .then((r) => { if (!cancelled) setCategories(r.categories ?? []); })
      .catch(() => undefined);
    listBrands()
      .then((r) => { if (!cancelled) setBrands(r.brands ?? []); })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listProducts({
        page,
        limit: PAGE_SIZE,
        search: search || undefined,
        category: category || undefined,
        brand: brand || undefined,
        availability: availability || "",
        deleted: showDeleted,
      });
      setItems(res.products);
      setTotal(res.total);
    } catch (err) {
      const ae = err as ApiError;
      if (ae.status === 401) navigate("/admin/login", { replace: true });
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  }, [page, search, category, brand, availability, showDeleted, navigate]);

  useEffect(() => { void load(); }, [load]);

  async function onDelete() {
    if (!confirming) return;
    setBusy(true);
    setError(null);
    try {
      await deleteProduct(confirming.id);
      setConfirming(null);
      await load();
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  }

  async function onRestore(product: AdminProduct) {
    setBusy(true);
    setError(null);
    try {
      await restoreProduct(product.id);
      await load();
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  }

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="min-h-dvh">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Products</h1>
            <p className="text-sm text-muted-foreground">Manage the product catalogue</p>
          </div>
          <Button onClick={() => navigate("/admin/products/new")}>New product</Button>
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
          <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search name, model, brand…"
                className="pl-9"
                aria-label="Search products"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={category || "all"}
                onValueChange={(v) => { setCategory(v === "all" ? "" : v); setPage(1); }}
              >
                <SelectTrigger className="w-[160px]" aria-label="Filter by category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={brand || "all"}
                onValueChange={(v) => { setBrand(v === "all" ? "" : v); setPage(1); }}
              >
                <SelectTrigger className="w-[150px]" aria-label="Filter by brand">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All brands</SelectItem>
                  {brands.map((b) => (
                    <SelectItem key={b.id} value={b.slug}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={availability || "all"}
                onValueChange={(v) => {
                  setAvailability(v === "all" ? "" : (v as ProductAvailability));
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[150px]" aria-label="Filter by availability">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All availability</SelectItem>
                  {PRODUCT_AVAILABILITIES.map((a) => (
                    <SelectItem key={a} value={a}>{AVAILABILITY_LABELS[a]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {canManageDeleted && (
                <Button
                  variant={showDeleted ? "secondary" : "outline"}
                  size="sm"
                  aria-pressed={showDeleted}
                  onClick={() => { setShowDeleted((v) => !v); setPage(1); }}
                >
                  {showDeleted ? "Showing deleted" : "Show deleted"}
                </Button>
              )}
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && items.length === 0
                ? Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 9 }).map((__, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-4 w-full max-w-[140px]" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : items.length === 0
                  ? (
                    <TableRow>
                      <TableCell colSpan={9} className="py-14 text-center text-muted-foreground">
                        No products found
                      </TableCell>
                    </TableRow>
                  )
                  : items.map((p) => {
                      const deleted = Boolean(p.deleted_at);
                      return (
                        <TableRow key={p.id}>
                          <TableCell>
                            {p.primary_image ? (
                              <img
                                src={`${API_BASE}${p.primary_image}`}
                                alt=""
                                loading="lazy"
                                className="size-10 shrink-0 rounded-md object-cover ring-1 ring-border"
                              />
                            ) : (
                              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground">
                                <PackageIcon className="size-4" aria-hidden="true" />
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{p.name}</span>
                            {p.short_description && (
                              <div className="max-w-[220px] truncate text-xs text-muted-foreground">
                                {p.short_description}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {p.model_number ?? "-"}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {p.brand?.name ?? "-"}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {p.category?.name ?? "-"}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {p.type ?? p.subcategory?.name ?? "-"}
                          </TableCell>
                          <TableCell>
                            <AvailabilityBadge status={p.availability} />
                          </TableCell>
                          <TableCell>
                            <StatusBadge product={p} />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate(`/admin/products/${p.id}/edit`)}
                              >
                                <PencilIcon className="size-3.5" />
                                Edit
                              </Button>
                              {canManageDeleted && (deleted ? (
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
                                  className="text-destructive hover:text-destructive"
                                  disabled={busy}
                                  onClick={() => setConfirming(p)}
                                >
                                  <Trash2Icon className="size-3.5" />
                                  Delete
                                </Button>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
            </TableBody>
          </Table>
        </Card>

        {total > 0 && (
          <nav aria-label="Pagination" className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">
              {`Page ${page} of ${pages} · ${total} total`}
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
              Delete product?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              “{confirming.name}” will be moved to deleted. You can restore it later.
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