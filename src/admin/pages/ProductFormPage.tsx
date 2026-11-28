import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon, Trash2Icon } from "lucide-react";
import {
  createProduct,
  deleteProductImage,
  getProduct,
  getProductBySlug,
  listBrands,
  listCategories,
  setPrimaryImage,
  updateProduct,
  uploadProductImages,
} from "@/admin/lib/api";
import type {
  AdminBrand,
  AdminCategory,
  AdminProduct,
  AdminProductImage,
  ProductAvailability,
} from "@/admin/lib/types";
import { PRODUCT_AVAILABILITIES } from "@/admin/lib/types";
import { API_BASE, type ApiError } from "@/lib/api";
import { Alert } from "@/admin/components/ui/alert";
import { Badge } from "@/admin/components/ui/badge";
import { Button } from "@/admin/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/admin/components/ui/card";
import { Input } from "@/admin/components/ui/input";
import { Label } from "@/admin/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/admin/components/ui/select";


const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_IMAGES = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const AVAILABILITY_LABELS: Record<ProductAvailability, string> = {
  available: "Available",
  out_of_stock: "Out of stock",
  on_request: "On request",
};

type SpecRow = { key: string; value: string };

function friendlyError(err: unknown): string {
  if (err instanceof Error) {
    const e = err as ApiError;
    if (e.status === 403) return "You do not have access";
    if (e.status === 0 || !e.status) return "Network error — check your connection.";
    return e.message || "Request failed";
  }
  return "Request failed";
}

export default function ProductFormPage() {
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();
  const isEdit = Boolean(params.id);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  // Required-field hints show only after a field was left or a save was attempted.
  const [touched, setTouched] = useState({ name: false, modelNumber: false, brandId: false, categoryId: false });
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [name, setName] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [availability, setAvailability] = useState<ProductAvailability>("available");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [specs, setSpecs] = useState<SpecRow[]>([]);

  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [brands, setBrands] = useState<AdminBrand[]>([]);
  const [subcategories, setSubcategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [catsError, setCatsError] = useState<string | null>(null);
  const [brandsError, setBrandsError] = useState<string | null>(null);
  const [catsSettled, setCatsSettled] = useState(false);
  const [brandsSettled, setBrandsSettled] = useState(false);
  const [refetchRefs, setRefetchRefs] = useState(0);

  const [images, setImages] = useState<AdminProductImage[]>([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const categoryRef = useRef<AdminCategory | null>(null);
  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(null);
  // A successful save leaves the form without stale field errors.
  const resetValidationHints = () => {
    setSubmitAttempted(false);
    setTouched({ name: false, modelNumber: false, brandId: false, categoryId: false });
  };

  // Load reference data (categories + brands) always needed for the selects.
  useEffect(() => {
    let cancelled = false;
    setCatsSettled(false);
    setBrandsSettled(false);
    listCategories()
      .then((r) => {
        if (!cancelled) { setCategories(r.categories ?? []); setCatsError(null); setCatsSettled(true); }
      })
      .catch(() => { if (!cancelled) { setCatsError("Could not load categories"); setCatsSettled(true); } });
    listBrands()
      .then((r) => {
        if (!cancelled) { setBrands(r.brands ?? []); setBrandsError(null); setBrandsSettled(true); }
      })
      .catch(() => { if (!cancelled) { setBrandsError("Could not load brands"); setBrandsSettled(true); } });
    return () => { cancelled = true; };
  }, [refetchRefs]);

  // Recompute the subcategory options whenever the chosen category (or the list) changes.
  useEffect(() => {
    const cat = categories.find((c) => Number(c.id) === Number(categoryId));
    categoryRef.current = cat ?? null;
    setSubcategories((cat?.subcategories ?? []).map((s) => ({ id: s.id, name: s.name, slug: s.slug })));
    if (subcategoryId && cat && !cat.subcategories.some((s) => Number(s.id) === Number(subcategoryId))) {
      setSubcategoryId("");
    }
  }, [categoryId, categories, subcategoryId]);

  // Edit mode: load the existing product.
  useEffect(() => {
    if (!isEdit) return;
    if (!catsSettled || !brandsSettled) return;
    const load = async () => {
      setError(null);
      try {
        const product = await getProduct(params.id!);
        setName(product.name ?? "");
        setModelNumber(product.model_number ?? "");
        setAvailability((product.availability ?? "available") as ProductAvailability);
        setDescription(product.description ?? "");
        setIsActive(Boolean(product.is_active));
        setSpecs(
          typeof product.specifications === "object" && product.specifications !== null
            ? Object.entries(product.specifications).map(([key, value]) => ({ key, value: String(value) }))
            : [],
        );
        setImages(product.images ?? []);
        // If the images array is missing, load them via the public product-by-slug endpoint.
        if ((!product.images || product.images.length === 0) && product.slug) {
          try {
            const bySlug = await getProductBySlug(product.slug);
            const p = (bySlug.product ?? bySlug) as unknown as AdminProduct;
            if (p && Array.isArray(p.images)) setImages(p.images);
          } catch {
            /* Ignore — images simply stay empty. */
          }
        }

        // Resolve saved ids once the reference lists have settled.
        // Backend ids may arrive as numbers; the Radix Select compares string values,
        // so everything is normalised to a string here.
        const resolveId = (v: string | number | null | undefined): string => (v == null ? "" : String(v));
        const brand = product.brand;
        const category = product.category;
        const subcategory = product.subcategory;
        const brandIdResolved = resolveId(
          product.brand_id ??
            brand?.id ??
            (brand?.slug
              ? brands.find((b) => String(b.slug) === String(brand.slug))?.id
              : undefined),
        );
        const categoryIdResolved = resolveId(
          product.category_id ??
            category?.id ??
            (category?.slug
              ? categories.find((c) => String(c.slug) === String(category.slug))?.id
              : undefined),
        );

        setBrandId(brandIdResolved);
        setCategoryId(categoryIdResolved);

        const cat = categories.find((c) => Number(c.id) === Number(categoryIdResolved));
        let subcategoryIdResolved = resolveId(
          product.subcategory_id ??
            subcategory?.id ??
            (subcategory?.slug && cat
              ? cat.subcategories.find((s) => String(s.slug) === String(subcategory.slug))?.id
              : undefined),
        );
        setSubcategoryId(subcategoryIdResolved);
      } catch (err) {
        const ae = err as ApiError;
        if (ae.status === 401) { navigate("/admin/login", { replace: true }); return; }
        setError(friendlyError(err));
      }
    };
    void load();
  }, [isEdit, params.id, navigate, catsSettled, brandsSettled, brands, categories]);

  const requiredMissing: string[] = [];
  if (!name.trim()) requiredMissing.push("Name");
  if (!modelNumber.trim()) requiredMissing.push("Model number");
  if (!brandId) requiredMissing.push("Brand");
  if (!categoryId) requiredMissing.push("Category");

  // Hints appear only once a field was left or a save was attempted.
  const showNameError = (touched.name || submitAttempted) && !name.trim();
  const showModelError = (touched.modelNumber || submitAttempted) && !modelNumber.trim();
  const showBrandError = (touched.brandId || submitAttempted) && !brandId;
  const showCategoryError = (touched.categoryId || submitAttempted) && !categoryId;

  const payload = {
    name,
    model_number: modelNumber,
    brand_id: Number(brandId),
    category_id: Number(categoryId),
    ...(subcategoryId ? { subcategory_id: Number(subcategoryId) } : { subcategory_id: null }),
    description,
    availability,
    specifications: Object.fromEntries(
      specs.filter((s) => s.key.trim()).map((s) => [s.key.trim(), s.value]),
    ),
    is_active: isActive,
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (requiredMissing.length > 0) {
      setSubmitAttempted(true);
      setError(`Required fields: ${requiredMissing.join(", ")}.`);
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        await updateProduct(params.id!, payload);
        resetValidationHints();
        setSuccess("Product saved.");
        // Refresh the loaded product so the images section stays in sync.
        try {
          const product = await getProduct(params.id!);
          setImages(product.images ?? []);
        } catch {
          /* ignore */
        }
      } else {
        const res = await createProduct(payload);
        resetValidationHints();
        const newId = res.product?.id ?? res.data?.id;
        if (newId) {
          navigate(`/admin/products/${newId}/edit`, { replace: true });
        } else {
          setSuccess("Product created. Please reload to add images.");
        }
      }
    } catch (err) {
      const ae = err as ApiError;
      if (ae.status === 401) { navigate("/admin/login", { replace: true }); return; }
      if (ae.status === 403) { setError("You do not have access"); return; }
      if (ae.status === 409) {
        setError("A product with this model number already exists.");
        return;
      }
      if (ae.status === 422) {
        setError((err as Error).message || "Please fix the highlighted fields.");
        return;
      }
      setError(friendlyError(err));
    } finally {
      setSaving(false);
    }
  };

  const addSpecRow = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const removeSpecRow = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const updateSpecRow = (index: number, field: "key" | "value", value: string) => {
    const next = [...specs];
    next[index] = { ...next[index], [field]: value };
    setSpecs(next);
  };

  // ── Images ──

  const validateFiles = (files: File[]): string | null => {
    for (const file of files) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        return `“${file.name}” is not a supported image (JPG, PNG or WebP only).`;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        return `“${file.name}” is larger than 5 MB.`;
      }
    }
    const total = images.length + files.length;
    if (total > MAX_IMAGES) {
      return `You can have at most ${MAX_IMAGES} images per product (${MAX_IMAGES - images.length} slot${MAX_IMAGES - images.length === 1 ? "" : "s"} left).`;
    }
    return null;
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const msg = validateFiles(files);
    if (msg) {
      setError(msg);
      e.target.value = "";
      return;
    }
    setSelectedFiles(files);
    setFilePreviews(files.map((f) => URL.createObjectURL(f)));
    setError(null);
  };

  const removeSelectedFile = (index: number) => {
    const next = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(next);
    const nextPreviews = filePreviews.filter((_, i) => i !== index);
    nextPreviews.forEach((url) => URL.revokeObjectURL(url));
    setFilePreviews(nextPreviews);
  };

  const handleImageUpload = async () => {
    if (selectedFiles.length === 0) return;
    if (!params.id) return;
    setError(null);
    setImageUploading(true);
    try {
      await uploadProductImages(params.id, selectedFiles);
      setSelectedFiles([]);
      filePreviews.forEach((url) => URL.revokeObjectURL(url));
      setFilePreviews([]);
      const product = await getProduct(params.id);
      setImages(product.images ?? []);
      setSuccess("Images uploaded.");
    } catch (err) {
      const ae = err as ApiError;
      if (ae.status === 401) { navigate("/admin/login", { replace: true }); return; }
      if (ae.status === 403) { setError("You do not have access"); return; }
      setError(friendlyError(err));
    } finally {
      setImageUploading(false);
    }
  };

  const handleMakePrimary = async (imageId: string) => {
    if (!params.id) return;
    setError(null);
    try {
      await setPrimaryImage(params.id, imageId);
      const product = await getProduct(params.id);
      setImages(product.images ?? []);
    } catch (err) {
      setError(friendlyError(err));
    }
  };

  const handleDeleteImage = (imageId: string) => {
    if (!window.confirm("Delete this image?")) return;
    setConfirmDeleteId(imageId);
  };

  const confirmDeleteImage = async () => {
    if (!params.id || !confirmDeleteId) return;
    setError(null);
    try {
      await deleteProductImage(params.id, confirmDeleteId);
      const product = await getProduct(params.id);
      setImages(product.images ?? []);
      setConfirmDeleteId(null);
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const canAddMore = images.length + selectedFiles.length < MAX_IMAGES;
  const primaryImage = images.find((i) => i.is_primary);

  return (
    <div className="min-h-dvh">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/products")}
            className="mr-3"
          >
            <ArrowLeftIcon className="size-3.5" /> Back to products
          </Button>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              {isEdit ? "Edit product" : "Add product"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEdit ? "Change the product details and images." : "Create a new product and add images."}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6">
        {catsError && (
          <Alert tone="destructive" className="flex items-center justify-between gap-3">
            <span>Could not load categories</span>
            <Button variant="outline" size="sm" onClick={() => setRefetchRefs((v) => v + 1)}>
              Retry
            </Button>
          </Alert>
        )}
        {brandsError && (
          <Alert tone="destructive" className="flex items-center justify-between gap-3">
            <span>Could not load brands</span>
            <Button variant="outline" size="sm" onClick={() => setRefetchRefs((v) => v + 1)}>
              Retry
            </Button>
          </Alert>
        )}
        {error && (
          <Alert tone="destructive" className="flex items-center justify-between gap-3">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={clearError}>Retry</Button>
          </Alert>
        )}
        {success && !isEdit ? null : success && (
          <Alert className="flex items-center justify-between gap-3">
            <span>{success}</span>
            <Button variant="outline" size="sm" onClick={clearSuccess}>Dismiss</Button>
          </Alert>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product details</CardTitle>
              <CardDescription>Required fields are marked.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    placeholder="e.g. Artek Dome Camera"
                    aria-invalid={showNameError}
                    required
                  />
                  {showNameError && <span className="text-xs text-destructive">Name is required.</span>}
                </div>
                <div className="space-y-2">
                  <Label>Model number</Label>
                  <Input
                    value={modelNumber}
                    onChange={(e) => setModelNumber(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, modelNumber: true }))}
                    placeholder="e.g. ADC-2000"
                    aria-invalid={showModelError}
                    required
                  />
                  {showModelError && <span className="text-xs text-destructive">Model number is required.</span>}
                </div>
                <div className="space-y-2">
                  <Label>Brand</Label>
                  <Select
                    value={brandId}
                    onValueChange={(v) => setBrandId(v)}
                    aria-invalid={showBrandError}
                  >
                    <SelectTrigger
                      className="w-full"
                      aria-label="Brand"
                      onBlur={() => setTouched((t) => ({ ...t, brandId: true }))}
                    >
                      <SelectValue placeholder="Choose a brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((b) => (
                        <SelectItem key={b.id} value={String(b.id)}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {showBrandError && <span className="text-xs text-destructive">Brand is required.</span>}
                </div>
              </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={categoryId}
                    onValueChange={(v) => { setCategoryId(v); setSubcategoryId(""); }}
                    aria-invalid={showCategoryError}
                  >
                    <SelectTrigger
                      className="w-full"
                      aria-label="Category"
                      onBlur={() => setTouched((t) => ({ ...t, categoryId: true }))}
                    >
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {showCategoryError && <span className="text-xs text-destructive">Category is required.</span>}
                </div>
                <div className="space-y-2">
                  <Label>Subcategory</Label>
                  <Select
                    value={subcategoryId}
                    onValueChange={(v) => setSubcategoryId(v)}
                    disabled={!categoryRef.current}
                  >
                    <SelectTrigger className="w-full" aria-label="Subcategory">
                      <SelectValue
                        placeholder={categoryRef.current ? "Choose a subcategory" : "Pick a category first"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategories.map((s) => (
                        <SelectItem key={s.id} value={String(s.id)}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Availability</Label>
                  <Select
                    value={availability}
                    onValueChange={(v) => setAvailability(v as ProductAvailability)}
                  >
                    <SelectTrigger className="w-full" aria-label="Availability">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_AVAILABILITIES.map((a) => (
                        <SelectItem key={a} value={a}>
                          {AVAILABILITY_LABELS[a]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Choose Available only if the model is in stock.
                  </p>
                </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Active
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded-md border text-primary ring-offset-background focus-visible:ring-ring focus-visible:ring-[3px] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </Label>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description of the product…"
                  className="h-32"
                />
              </div>

              <div className="space-y-2">
                <Label>Specifications</Label>
                <p className="text-xs text-muted-foreground">Key / value pairs. Empty rows are ignored.</p>
                <div className="space-y-2">
                  {specs.map((row, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={row.key}
                        onChange={(e) => updateSpecRow(i, "key", e.target.value)}
                        placeholder="Key"
                        className="max-w-[35%]"
                      />
                      <Input
                        value={row.value}
                        onChange={(e) => updateSpecRow(i, "value", e.target.value)}
                        placeholder="Value"
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => removeSpecRow(i)}
                        aria-label="Remove specification row"
                      >
                        <Trash2Icon className="size-3.5" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" type="button" onClick={addSpecRow}>
                    <PlusIcon className="size-3.5" /> Add row
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {isEdit ? (
            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
                <CardDescription>
                  Up to {MAX_IMAGES} images. JPG, PNG or WebP, max 5 MB each.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex flex-col gap-3">
                  <Label>Current images</Label>
                  {images.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No images yet.</p>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {images.map((image) => {
                        const url = `${API_BASE}${image.image_path}`;
                        const isPrimary = image.id === primaryImage?.id;
                        return (
                          <div key={image.id} className="relative flex flex-col items-center gap-2">
                            <img
                              src={url}
                              alt=""
                              loading="lazy"
                              className="size-24 rounded-md object-cover ring-1 ring-border bg-muted"
                            />
                            {isPrimary && (
                              <Badge className="absolute top-1 left-1 z-10">Primary</Badge>
                            )}
                            <div className="flex gap-1">
                              {!isPrimary && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => void handleMakePrimary(image.id)}
                                  disabled={imageUploading}
                                >
                                  Make primary
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive"
                                onClick={() => handleDeleteImage(image.id)}
                                disabled={imageUploading}
                                aria-label={`Delete image ${image.id}`}
                              >
                                <Trash2Icon className="size-3.5" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Add images</Label>
                    <input
                      type="file"
                      multiple
                      accept={ACCEPTED_TYPES.join(",")}
                      onChange={handleImageSelect}
                      disabled={imageUploading || !canAddMore}
                      aria-label="Select product images"
                    />
                    {selectedFiles.length > 0 && (
                      <div className="grid gap-2 sm:grid-cols-3">
                        {selectedFiles.map((file, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <img
                              src={filePreviews[i]}
                              alt=""
                              className="size-10 rounded-md object-cover"
                            />
                            <span className="text-xs text-muted-foreground truncate" title={file.name}>
                              {file.name}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive"
                              onClick={() => removeSelectedFile(i)}
                            >
                              <Trash2Icon className="size-3" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="default"
                          size="sm"
                          onClick={handleImageUpload}
                          disabled={imageUploading}
                        >
                          Upload {selectedFiles.length} image{selectedFiles.length > 1 ? "s" : ""}
                        </Button>
                      </div>
                    )}
                    {!canAddMore && selectedFiles.length === 0 && (
                      <p className="text-xs text-muted-foreground">
                        Maximum {MAX_IMAGES} images per product reached.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-4 text-center text-muted-foreground">
                Save the product first, then add images on the edit page.
              </CardContent>
            </Card>
          )}

          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/products")}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving || requiredMissing.length > 0}
            >
              {saving ? "Saving…" : isEdit ? "Save changes" : "Create product"}
            </Button>
          </div>
        </form>
      </main>

      {confirmDeleteId !== null && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-image-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setConfirmDeleteId(null);
          }}
        >
          <div className="w-full max-w-sm rounded-lg border bg-card p-5 shadow-lg">
            <h2 id="confirm-delete-image-title" className="text-base font-semibold">
              Delete image?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              This image will be removed from the product.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setConfirmDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" size="sm" disabled={imageUploading} onClick={confirmDeleteImage}>
                {imageUploading ? "Deleting…" : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
