import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import {
  createTestimonial,
  deleteTestimonialImage,
  getTestimonial,
  togglePublishTestimonial,
  updateTestimonial,
  uploadTestimonialImage,
} from "@/admin/lib/api";
import { API_BASE, type ApiError } from "@/lib/api";
import { Alert } from "@/admin/components/ui/alert";
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

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const RATING_OPTIONS: { value: "" | number; label: string }[] = [
  { value: "", label: "None" },
  { value: 1, label: "1 star" },
  { value: 2, label: "2 stars" },
  { value: 3, label: "3 stars" },
  { value: 4, label: "4 stars" },
  { value: 5, label: "5 stars" },
];

function friendlyError(err: unknown): string {
  if (err instanceof Error) {
    const e = err as ApiError;
    if (e.status === 403) return "You do not have access";
    if (e.status === 0 || !e.status) return "Network error — check your connection.";
    return e.message || "Request failed";
  }
  return "Request failed";
}

export default function TestimonialFormPage() {
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const id = Number(id);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<Record<string, string> | null>(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState<"" | number>("");
  const [isPublished, setIsPublished] = useState(true);

  const [image, setImage] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [confirmRemoveImage, setConfirmRemoveImage] = useState(false);

  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(null);
  const clearServerError = () => setServerError(null);

  // Edit mode: load the existing testimonial.
  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      setError(null);
      try {
        const t = await getTestimonial(id);
        setName(t.name);
        setRole(t.role ?? "");
        setCompany(t.company ?? "");
        setQuote(t.quote);
        setRating(t.rating ? String(t.rating) : "");
        setIsPublished(Boolean(t.isPublished));
        setImage(t.image ?? null);
      } catch (err) {
        const ae = err as ApiError;
        if (ae.status === 401) { navigate("/admin/login", { replace: true }); return; }
        setError(friendlyError(err));
      }
    };
    void load();
  }, [isEdit, id, navigate]);

  const requiredMissing: string[] = [];
  if (!name.trim()) requiredMissing.push("Name");
  if (name.trim().length < 2 || name.trim().length > 100) requiredMissing.push("Name (2–100 chars)");
  if (!quote.trim()) requiredMissing.push("Quote");
  if (quote.trim().length < 10 || quote.trim().length > 1000) requiredMissing.push("Quote (10–1000 chars)");
  if (rating !== "" && (typeof rating !== "number" || rating < 1 || rating > 5)) requiredMissing.push("Rating (1–5 or none)");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setServerError(null);
    if (requiredMissing.length > 0) {
      setError(`Required fields: ${requiredMissing.join(", ")}.`);
      return;
    }
    setSaving(true);
    try {
      const body = {
        name: name.trim(),
        role: role.trim() || null,
        company: company.trim() || null,
        quote: quote.trim(),
        rating: rating === "" ? null : rating,
        isPublished,
      };
      if (isEdit) {
        await updateTestimonial(id, body);
        setSuccess("Testimonial saved.");
      } else {
        const res = await createTestimonial(body);
        const newId = res.testimonial?.id;
        if (newId != null) {
          navigate(`/admin/testimonials/${newId}/edit`, { replace: true });
        } else {
          setSuccess("Testimonial created. Please reload to add a portrait.");
        }
      }
    } catch (err) {
      const ae = err as ApiError;
      if (ae.status === 401) { navigate("/admin/login", { replace: true }); return; }
      if (ae.status === 403) { setError("You do not have access"); return; }
      if (ae.status === 422) {
        setServerError((err as Error).message ? { _form: (err as Error).message } : null);
        setError("Please fix the highlighted fields.");
        return;
      }
      setError(friendlyError(err));
    } finally {
      setSaving(false);
    }
  };

  const handlePublishToggle = async () => {
    if (!id) return;
    setError(null);
    try {
      await togglePublishTestimonial(id, !isPublished);
      setIsPublished(!isPublished);
      setSuccess(isPublished ? "Testimonial hidden." : "Testimonial published.");
    } catch (err) {
      setError(friendlyError(err));
    }
  };

  // ── Portrait (edit page only) ──
  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `“${file.name}” is not a supported image (JPG, PNG or WebP only).`;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return `“${file.name}” is larger than 2 MB.`;
    }
    return null;
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    const msg = validateFile(file);
    if (msg) {
      setError(msg);
      e.target.value = "";
      return;
    }
    setSelectedFile(file);
    setFilePreview(URL.createObjectURL(file));
    setError(null);
  };

  const removeSelectedFile = () => {
    if (filePreview) URL.revokeObjectURL(filePreview);
    setSelectedFile(null);
    setFilePreview(null);
  };

  const handlePortraitUpload = async () => {
    if (!id || !selectedFile) return;
    setError(null);
    setImageUploading(true);
    try {
      await uploadTestimonialImage(id, selectedFile);
      setSelectedFile(null);
      if (filePreview) URL.revokeObjectURL(filePreview);
      setFilePreview(null);
      const t = await getTestimonial(id);
      setImage(t.image ?? null);
      setSuccess("Portrait uploaded.");
    } catch (err) {
      const ae = err as ApiError;
      if (ae.status === 401) { navigate("/admin/login", { replace: true }); return; }
      if (ae.status === 403) { setError("You do not have access"); return; }
      setError(friendlyError(err));
    } finally {
      setImageUploading(false);
    }
  };

  const handleRemovePortrait = async () => {
    if (!id) return;
    setError(null);
    try {
      await deleteTestimonialImage(id);
      setImage(null);
      setConfirmRemoveImage(false);
      setSuccess("Portrait removed.");
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setConfirmRemoveImage(false);
    }
  };

  const hasPortrait = Boolean(image) || Boolean(filePreview);
  const portraitUrl = filePreview ?? (image ? `${API_BASE}${image}` : null);

  return (
    <div className="min-h-dvh">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/testimonials")}
            className="mr-3"
          >
            <ArrowLeftIcon className="size-3.5" /> Back to testimonials
          </Button>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              {isEdit ? "Edit testimonial" : "Add testimonial"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEdit ? "Change the testimonial and portrait." : "Create a new testimonial."}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6">
        {error && (
          <Alert tone="destructive" className="flex items-center justify-between gap-3">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={clearError}>Retry</Button>
          </Alert>
        )}
        {serverError && (
          <Alert tone="destructive" className="flex items-center justify-between gap-3">
            <span>{serverError._form}</span>
            <Button variant="outline" size="sm" onClick={clearServerError}>Dismiss</Button>
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
              <CardTitle>Testimonial details</CardTitle>
              <CardDescription>Required fields are marked.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ahmed Al Farsi"
                    aria-invalid={!name.trim() || name.trim().length < 2 || name.trim().length > 100}
                    required
                  />
                  {!name.trim() && <span className="text-xs text-destructive">Name is required.</span>}
                  {(name.trim().length < 2 || name.trim().length > 100) && name.trim() && (
                    <span className="text-xs text-destructive">Name must be 2–100 characters.</span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Facilities Manager"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Marina Gate Offices, Dubai"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Quote</Label>
                <textarea
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Enter the client’s quote…"
                  aria-invalid={!quote.trim() || quote.trim().length < 10 || quote.trim().length > 1000}
                  required
                  className="block w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {quote.length} / 1000 characters
                </p>
                {!quote.trim() && <span className="text-xs text-destructive">Quote is required.</span>}
                {(quote.trim().length < 10 || quote.trim().length > 1000) && quote.trim() && (
                  <span className="text-xs text-destructive">Quote must be 10–1000 characters.</span>
                )}
              </div>

              <div className="space-y-2">
                <Label>Rating</Label>
                <Select
                  value={rating === "" ? "" : String(rating)}
                  onValueChange={(v) => setRating(v === "" ? "" : Number(v))}
                >
                  <SelectTrigger className="w-full" aria-label="Rating">
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    {RATING_OPTIONS.map((o) => (
                      <SelectItem key={String(o.value)} value={String(o.value)}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Leave as “None” if no rating applies.</p>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Published
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="rounded-md border text-primary ring-offset-background focus-visible:ring-ring focus-visible:ring-[3px] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </Label>
                <p className="text-xs text-muted-foreground">
                  Unpublished testimonials are hidden from the home page carousel.
                </p>
              </div>

              {isEdit && (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePublishToggle}
                    disabled={saving}
                  >
                    {isPublished ? "Hide testimonial" : "Publish testimonial"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {isEdit ? (
            <Card>
              <CardHeader>
                <CardTitle>Portrait</CardTitle>
                <CardDescription>
                  JPG, PNG or WebP, max 2 MB.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex flex-col gap-3">
                  <Label>Current portrait</Label>
                  {hasPortrait ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={portraitUrl!}
                        alt=""
                        loading="lazy"
                        className="size-24 shrink-0 rounded-full object-cover ring-1 ring-border bg-muted"
                      />
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={() => setConfirmRemoveImage(true)}
                          disabled={imageUploading}
                        >
                          Remove portrait
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No portrait yet.</p>
                  )}
                  <div className="space-y-2">
                    <Label>Replace portrait</Label>
                    <input
                      type="file"
                      accept={ACCEPTED_TYPES.join(",")}
                      onChange={handleImageSelect}
                      disabled={imageUploading}
                      aria-label="Select testimonial portrait"
                    />
                    {selectedFile && (
                      <div className="flex items-center gap-2">
                        <img
                          src={filePreview!}
                          alt=""
                          className="size-10 rounded-md object-cover"
                        />
                        <span className="text-xs text-muted-foreground truncate" title={selectedFile.name}>
                          {selectedFile.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={removeSelectedFile}
                        >
                          <Trash2Icon className="size-3" />
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={handlePortraitUpload}
                          disabled={imageUploading}
                        >
                          {imageUploading ? "Uploading…" : "Upload portrait"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-4 text-center text-muted-foreground">
                Save the testimonial first, then add a portrait on the edit page.
              </CardContent>
            </Card>
          )}

          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/testimonials")}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving || requiredMissing.length > 0}
            >
              {saving ? "Saving…" : isEdit ? "Save changes" : "Create testimonial"}
            </Button>
          </div>
        </form>
      </main>

      {confirmRemoveImage && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-remove-portrait-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setConfirmRemoveImage(false);
          }}
        >
          <div className="w-full max-w-sm rounded-lg border bg-card p-5 shadow-lg">
            <h2 id="confirm-remove-portrait-title" className="text-base font-semibold">
              Remove portrait?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The portrait will be deleted from this testimonial.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={imageUploading}
                onClick={() => setConfirmRemoveImage(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={imageUploading}
                onClick={handleRemovePortrait}
              >
                {imageUploading ? "Removing…" : "Remove"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
