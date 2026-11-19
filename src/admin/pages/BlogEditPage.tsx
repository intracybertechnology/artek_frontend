import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, ImageIcon, Trash2Icon, XIcon } from "lucide-react";
import { api } from "@/admin/lib/api";
import { BLOG_CATEGORIES, type BlogInput, type BlogPost } from "@/admin/lib/types";
import { authors } from "@/data/authors";
import { Alert } from "@/admin/components/ui/alert";
import { Button } from "@/admin/components/ui/button";
import { Card, CardContent } from "@/admin/components/ui/card";
import { Input } from "@/admin/components/ui/input";
import { Label } from "@/admin/components/ui/label";
import { RichTextEditor } from "@/admin/components/RichTextEditor";
import { cn } from "@/lib/utils";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);

const fieldClass =
  "border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2";

type Form = {
  title: string;
  slug: string;
  dek: string;
  category: string;
  authorId: string;
  content: string;
  coverImage: string;
  coverAlt: string;
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  publishedAt: string;
};

const emptyForm: Form = {
  title: "",
  slug: "",
  dek: "",
  category: BLOG_CATEGORIES[0],
  authorId: authors[0]?.id ?? "artek-team",
  content: "",
  coverImage: "",
  coverAlt: "",
  seoTitle: "",
  seoDescription: "",
  featured: false,
  publishedAt: "",
};

const toForm = (post: BlogPost): Form => ({
  title: post.title,
  slug: post.slug,
  dek: post.dek,
  category: post.category,
  authorId: post.authorId,
  content: post.content,
  coverImage: post.coverImage ?? "",
  coverAlt: post.coverAlt ?? "",
  seoTitle: post.seoTitle ?? "",
  seoDescription: post.seoDescription ?? "",
  featured: post.featured,
  publishedAt: post.publishedAt ?? "",
});

/** Empty text is sent as null so the server treats the field as unset. */
const orNull = (value: string) => (value.trim() ? value.trim() : null);

function toInput(form: Form, status: BlogInput["status"]): BlogInput {
  return {
    slug: form.slug.trim(),
    title: form.title.trim(),
    dek: form.dek.trim(),
    category: form.category,
    authorId: form.authorId,
    content: form.content,
    coverImage: orNull(form.coverImage),
    coverAlt: orNull(form.coverAlt),
    seoTitle: orNull(form.seoTitle),
    seoDescription: orNull(form.seoDescription),
    status,
    featured: form.featured,
    publishedAt: orNull(form.publishedAt),
  };
}

export function BlogEditPage() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === "new";
  const navigate = useNavigate();

  const [form, setForm] = useState<Form>(emptyForm);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [slugEdited, setSlugEdited] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [busy, setBusy] = useState<null | "save" | "upload" | "delete">(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) return;
    api
      .getBlog(id!)
      .then(({ post }) => {
        setPost(post);
        setForm(toForm(post));
        setSlugEdited(true);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load this post."))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm((f) => ({ ...f, [key]: value }));

  function onTitleChange(value: string) {
    setForm((f) => ({ ...f, title: value, slug: slugEdited ? f.slug : slugify(value) }));
  }

  async function onImagePicked(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Upload a JPEG, PNG or WebP image.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("Images must be 5 MB or smaller.");
      return;
    }
    setBusy("upload");
    setError(null);
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Could not read the file."));
        reader.readAsDataURL(file);
      });
      const { url } = await api.uploadImage(dataUrl);
      set("coverImage", url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(null);
    }
  }

  async function save(status: BlogInput["status"]) {
    setBusy("save");
    setError(null);
    setFieldErrors({});
    setSaved(null);
    try {
      const data = toInput(form, status);
      const result = isNew ? await api.createBlog(data) : await api.updateBlog(id!, data);
      setPost(result.post);
      setForm(toForm(result.post));
      setSlugEdited(true);
      setSaved(status === "published" ? "Published. The site updates after the next rebuild." : "Draft saved.");
      if (isNew) navigate(`/admin/blog/${result.post.id}`, { replace: true });
    } catch (err) {
      const e = err as Error & { fields?: Record<string, string[]> };
      setError(e.message);
      setFieldErrors(e.fields ?? {});
    } finally {
      setBusy(null);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void save(post?.status ?? "draft");
  }

  async function remove() {
    if (!post || !window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;
    setBusy("delete");
    try {
      await api.deleteBlog(post.id);
      navigate("/admin/blog", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete the post.");
      setBusy(null);
    }
  }

  const fieldError = (name: string) =>
    fieldErrors[name]?.[0] ? <p className="text-destructive mt-1 text-xs">{fieldErrors[name][0]}</p> : null;

  if (loading) {
    return <p className="text-muted-foreground grid min-h-dvh place-items-center text-sm">Loading post…</p>;
  }

  return (
    <div className="min-h-dvh">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 pt-6 sm:px-6">
        <Link to="/admin/blog" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm">
          <ArrowLeftIcon className="size-4" />
          All posts
        </Link>
        {post && (
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
              post.status === "published" ? "bg-emerald-100 text-emerald-900" : "bg-muted text-muted-foreground",
            )}
          >
            <span className={cn("size-1.5 rounded-full", post.status === "published" ? "bg-emerald-600" : "bg-muted-foreground")} />
            {post.status === "published" ? "Published" : "Draft"}
          </span>
        )}
      </div>

      <main className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6">
        <h1 className="text-xl font-semibold tracking-tight">{isNew ? "New post" : "Edit post"}</h1>

        {error && <Alert tone="destructive">{error}</Alert>}
        {saved && <Alert>{saved}</Alert>}

        <form onSubmit={onSubmit} className="space-y-6" noValidate>
          <Card className="py-0">
            <CardContent className="space-y-5 p-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  placeholder="e.g. What SIRA's CCTV requirements ask of your building"
                  maxLength={200}
                  className="mt-1.5"
                />
                {fieldError("title")}
              </div>

              <div>
                <Label htmlFor="slug">Web address (URL slug)</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugEdited(true);
                    set("slug", slugify(e.target.value));
                  }}
                  className="mt-1.5"
                />
                <p className="text-muted-foreground mt-1 text-xs">Lowercase words separated by hyphens: /blog/{form.slug || "your-slug"}</p>
                {fieldError("slug")}
              </div>

              <div>
                <Label htmlFor="dek">Short summary</Label>
                <textarea
                  id="dek"
                  rows={2}
                  value={form.dek}
                  onChange={(e) => set("dek", e.target.value)}
                  maxLength={300}
                  className={`${fieldClass} mt-1.5`}
                />
                <p className="text-muted-foreground mt-1 text-xs">Shown on the blog list under the title.</p>
                {fieldError("dek")}
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                    className={`${fieldClass} mt-1.5`}
                  >
                    {BLOG_CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  {fieldError("category")}
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <select
                    id="author"
                    value={form.authorId}
                    onChange={(e) => set("authorId", e.target.value)}
                    className={`${fieldClass} mt-1.5`}
                  >
                    {authors.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="publishedAt">Publish date</Label>
                  <Input
                    id="publishedAt"
                    type="date"
                    value={form.publishedAt}
                    onChange={(e) => set("publishedAt", e.target.value)}
                    className="mt-1.5"
                  />
                  <p className="text-muted-foreground mt-1 text-xs">Leave empty to use the day you publish.</p>
                  {fieldError("publishedAt")}
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                  className="size-4"
                />
                Feature this post at the top of the blog
              </label>
            </CardContent>
          </Card>

          <Card className="py-0">
            <CardContent className="space-y-5 p-6">
              <div>
                <Label htmlFor="content">Article</Label>
                <div className="mt-1.5">
                  <RichTextEditor id="content" value={form.content} onChange={(html) => set("content", html)} />
                </div>
                <p className="text-muted-foreground mt-1 text-xs">
                  Use Heading 2 for main sections and Heading 3 or 4 for smaller ones. Bold, lists, links and tables are
                  in the toolbar.
                </p>
                {fieldError("content")}
              </div>

              <div className="space-y-2">
                <Label>Cover photo</Label>
                {form.coverImage ? (
                  <div className="flex items-start gap-4">
                    <img src={form.coverImage} alt="" className="h-28 w-48 rounded-md border object-cover" />
                    <Button type="button" variant="outline" size="sm" onClick={() => set("coverImage", "")}>
                      <XIcon />
                      Remove photo
                    </Button>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No photo. The post uses a text cover instead.</p>
                )}
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm underline-offset-4 hover:underline">
                  <ImageIcon className="size-4" />
                  {busy === "upload" ? "Uploading…" : "Choose a JPEG, PNG or WebP image (max 5 MB)"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={onImagePicked}
                    disabled={busy === "upload"}
                    className="sr-only"
                  />
                </label>
              </div>

              <div>
                <Label htmlFor="coverAlt">Photo description (for search engines and screen readers)</Label>
                <Input
                  id="coverAlt"
                  value={form.coverAlt}
                  onChange={(e) => set("coverAlt", e.target.value)}
                  maxLength={200}
                  className="mt-1.5"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="py-0">
            <CardContent className="space-y-5 p-6">
              <div>
                <h2 className="text-sm font-semibold">Search engine details</h2>
                <p className="text-muted-foreground text-xs">Leave empty to use the title and summary.</p>
              </div>
              <div>
                <Label htmlFor="seoTitle">Page title</Label>
                <Input
                  id="seoTitle"
                  value={form.seoTitle}
                  onChange={(e) => set("seoTitle", e.target.value)}
                  maxLength={120}
                  className="mt-1.5"
                />
                <p className="text-muted-foreground mt-1 text-xs">{form.seoTitle.length}/60 characters recommended</p>
              </div>
              <div>
                <Label htmlFor="seoDescription">Meta description</Label>
                <textarea
                  id="seoDescription"
                  rows={3}
                  value={form.seoDescription}
                  onChange={(e) => set("seoDescription", e.target.value)}
                  maxLength={300}
                  className={`${fieldClass} mt-1.5`}
                />
                <p className="text-muted-foreground mt-1 text-xs">{form.seoDescription.length}/160 characters recommended</p>
              </div>
            </CardContent>
          </Card>

          <div className="bg-card/95 sticky bottom-0 z-10 -mx-4 flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="outline" disabled={busy !== null} onClick={() => void save("draft")}>
                Save as draft
              </Button>
              <Button type="button" disabled={busy !== null} onClick={() => void save("published")}>
                {post?.status === "published" ? "Save and keep published" : "Publish"}
              </Button>
              {post?.status === "published" && (
                <Button type="button" variant="outline" disabled={busy !== null} onClick={() => void save("draft")}>
                  Unpublish
                </Button>
              )}
            </div>
            {!isNew && (
              <Button type="button" variant="destructive" disabled={busy !== null} onClick={() => void remove()}>
                <Trash2Icon />
                Delete post
              </Button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
