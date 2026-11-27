import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/admin/lib/auth";
import {
  createPost,
  deletePost,
  getAdminPost,
  updatePost,
  updatePostStatus,
  uploadInsightImage,
} from "@/admin/lib/api";
import type { PostStatus } from "@/admin/lib/types";
import { type ApiError } from "@/lib/api";
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
import { BlockEditor } from "@/admin/components/BlockEditor";
import { authors } from "@/data/authors";

const MAX_TITLE_LEN = 255;
const MAX_SLUG_LEN = 255;
const MAX_CATEGORY_LEN = 100;
const MAX_COVER_WORD_LEN = 50;
const MAX_CHIP_ITEMS = 50;
const MAX_CHIP_LEN = 100;

const POST_STATUSES: { value: PostStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "needs-review", label: "Needs review" },
  { value: "published", label: "Published" },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function friendlyError(err: unknown): string {
  if (err instanceof Error) {
    const e = err as ApiError;
    if (e.status === 401) return "Your session has expired. Please sign in again.";
    if (e.status === 403) return "You do not have access";
    if (e.status === 0 || !e.status) return "Network error — check your connection.";
    return e.message || "Request failed";
  }
  return "Request failed";
}

function parseChipInput(value: string): string[] {
  return value.split(/[,;]/).map((s) => s.trim()).filter(Boolean);
}

function formatChipInput(items: string[]): string {
  return items.join(", ");
}

// Convert API body blocks to editable blocks for the editor
function apiBlocksToEditable(body: { type: string; text?: string; [key: string]: unknown }[] | null | undefined): any[] {
  if (!body) return [];
  return body.map((b) => {
    const block: Record<string, unknown> = { type: b.type };
    if (b.text !== undefined) block.text = b.text;
    if (b.id !== undefined) block.id = b.id;
    if (b.cite !== undefined) block.cite = b.cite;
    if (b.title !== undefined) block.title = b.title;
    if (b.items !== undefined) block.items = Array.isArray(b.items) ? [...b.items] : [];
    if (b.head !== undefined) block.head = Array.isArray(b.head) ? [...b.head] : [];
    if (b.rows !== undefined) block.rows = Array.isArray(b.rows) ? b.rows.map((r: unknown[]) => [...r]) : [];
    if (b.src !== undefined) block.src = b.src;
    if (b.alt !== undefined) block.alt = b.alt;
    if (b.width !== undefined) block.width = b.width;
    if (b.height !== undefined) block.height = b.height;
    if (b.caption !== undefined) block.caption = b.caption;
    return block;
  });
}

export default function AdminPostFormPage() {
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();
  const { role } = useAuth();
  const isEdit = Boolean(params.id);
  const id = Number(params.id!);
  const isSuperAdmin = role === "super_admin";

  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(isEdit);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // ── Form state ──
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [category, setCategory] = useState("");
  const [dek, setDek] = useState("");
  const [coverWord, setCoverWord] = useState("");
  const [authorId, setAuthorId] = useState(authors[0]?.id ?? "");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<PostStatus>("draft");
  const [publishedAt, setPublishedAt] = useState("");
  const [tagsRaw, setTagsRaw] = useState("");
  const [relatedServicesRaw, setRelatedServicesRaw] = useState("");
  const [blocks, setBlocks] = useState<any[]>([]);
  const [editAsJson, setEditAsJson] = useState(false);
  const [bodyJson, setBodyJson] = useState("[]");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  // ── FAQs ──
  type FaqRow = { question: string; answer: string };
  const [faqs, setFaqs] = useState<FaqRow[]>([]);

  // ── Original values for change tracking (edit only) ──
  const originalRef = useRef<Record<string, unknown> | null>(null);

  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(null);
  const clearServerError = () => setServerError(null);

  // ── Load existing post (edit mode) ──
  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const p = await getAdminPost(id);
        setTitle(p.title);
        setSlug(p.slug);
        setCategory(p.category);
        setDek(p.dek);
        setCoverWord(p.coverWord);
        setAuthorId(p.authorId);
        setFeatured(Boolean(p.featured));
        setStatus(p.status);
        setPublishedAt(p.publishedAt ?? "");
        setTagsRaw(formatChipInput(p.tags));
        setRelatedServicesRaw(formatChipInput(p.relatedServices));
        setBlocks(apiBlocksToEditable(p.body));
        setBodyJson(JSON.stringify(p.body, null, 2));
        setSeoTitle(p.seo?.title ?? "");
        setSeoDescription(p.seo?.description ?? "");
        setFaqs((p.faqs ?? []).map((f) => ({ question: f.question, answer: f.answer })));
        originalRef.current = {
          title: p.title,
          slug: p.slug,
          category: p.category,
          dek: p.dek,
          coverWord: p.coverWord,
          authorId: p.authorId,
          featured: p.featured,
          status: p.status,
          publishedAt: p.publishedAt,
          tags: p.tags,
          relatedServices: p.relatedServices,
          body: p.body,
          faqs: p.faqs,
          seo: p.seo,
        };
      } catch (err) {
        const ae = err as ApiError;
        if (ae.status === 401) { navigate("/admin/login", { replace: true }); return; }
        setError(friendlyError(err));
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [isEdit, id, navigate]);

  // ── Auto-fill slug from title until user edits it ──
  useEffect(() => {
    if (!isEdit && !slugManuallyEdited && title.trim()) {
      setSlug(slugify(title));
    }
  }, [title, slugManuallyEdited, isEdit]);

  // ── Keep bodyJson in sync with blocks when not in JSON mode ──
  useEffect(() => {
    if (!editAsJson) {
      setBodyJson(JSON.stringify(blocks, null, 2));
    }
  }, [blocks, editAsJson]);

  // ── Parse JSON mode input back into blocks ──
  const parsedJson: any[] = useMemo(() => {
    try {
      const parsed = JSON.parse(bodyJson || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [bodyJson]);

  // ── Validation ──
  const requiredMissing: string[] = [];
  if (!title.trim()) requiredMissing.push("Title");
  if (title.trim().length > MAX_TITLE_LEN) requiredMissing.push("Title (max 255 chars)");
  if (!isEdit && !slug.trim()) {
    // On new, slug is optional (server generates)
  } else if (slug.trim().length > MAX_SLUG_LEN) {
    requiredMissing.push("Slug (max 255 chars)");
  }
  if (!category.trim()) requiredMissing.push("Category");
  if (category.trim().length > MAX_CATEGORY_LEN) requiredMissing.push("Category (max 100 chars)");
  if (!dek.trim()) requiredMissing.push("Dek");
  if (!coverWord.trim()) requiredMissing.push("Cover word");
  if (coverWord.trim().length > MAX_COVER_WORD_LEN) requiredMissing.push("Cover word (max 50 chars)");

  let jsonError: string | null = null;
  if (editAsJson) {
    if (parsedJson.length === 0 && bodyJson.trim() !== "") {
      jsonError = "Body must be a non-empty JSON array of blocks.";
    } else if (parsedJson.length > 200) {
      jsonError = `Body has ${parsedJson.length} blocks (max 200).`;
    }
  }

  const faqErrors: string[] = [];
  faqs.forEach((f, i) => {
    if (!f.question.trim()) faqErrors.push(`FAQ row ${i + 1}: question is required`);
    if (!f.answer.trim()) faqErrors.push(`FAQ row ${i + 1}: answer is required`);
  });

  const allErrors = [...requiredMissing, ...faqErrors].filter(Boolean);
  if (jsonError) allErrors.push(jsonError);

  // ── Changed-fields tracking ──
  const changedFields = useMemo(() => {
    if (!isEdit || !originalRef.current) return {} as Record<string, unknown>;
    const orig = originalRef.current;
    const changed: Record<string, unknown> = {};
    const current: Record<string, unknown> = {
      title, slug, category, dek, coverWord, authorId, featured, status,
      publishedAt, tags: parseChipInput(tagsRaw),
      relatedServices: parseChipInput(relatedServicesRaw),
      body: editAsJson ? parsedJson : blocks,
      faqs: faqs.length > 0 ? faqs : null,
      seo: { title: seoTitle, description: seoDescription },
    };
    for (const key of Object.keys(current)) {
      if (JSON.stringify(current[key]) !== JSON.stringify(orig[key])) {
        changed[key] = current[key];
      }
    }
    return changed;
  }, [title, slug, category, dek, coverWord, authorId, featured, status, publishedAt,
    tagsRaw, relatedServicesRaw, parsedJson, blocks, editAsJson, seoTitle, seoDescription, faqs, isEdit]);

  const hasChanges = Object.keys(changedFields).length > 0;

  // ── Handlers ──
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setServerError(null);

    if (allErrors.length > 0) {
      setError("Please fix: " + allErrors.join("; ") + ".");
      return;
    }
    if (isEdit && !hasChanges) {
      setError("No changes detected.");
      return;
    }

    setSaving(true);
    try {
      const body: Record<string, unknown> = {};
      if (isEdit) {
        Object.assign(body, changedFields);
      } else {
        Object.assign(body, {
          title: title.trim(),
          slug: slug.trim() || undefined,
          dek: dek.trim(),
          category: category.trim(),
          coverWord: coverWord.trim(),
          authorId,
          featured,
          status,
          publishedAt: publishedAt || null,
          tags: parseChipInput(tagsRaw),
          relatedServices: parseChipInput(relatedServicesRaw),
          body: editAsJson ? parsedJson : blocks,
          faqs: faqs.length > 0 ? faqs : null,
          seo: { title: seoTitle, description: seoDescription },
        });
      }

      if (isEdit) {
        await updatePost(id, body as Parameters<typeof updatePost>[1]);
        setSuccess("Post saved.");
      } else {
        const res = await createPost(body as Parameters<typeof createPost>[0]);
        const newId = res.post?.id;
        if (newId != null) {
          navigate(`/admin/insights/${newId}/edit`, { replace: true });
        } else {
          setSuccess("Post created. Please reload to continue editing.");
        }
      }
    } catch (err) {
      const ae = err as ApiError;
      if (ae.status === 401) { navigate("/admin/login", { replace: true }); return; }
      if (ae.status === 403) { setError("You do not have access"); return; }
      if (ae.status === 409) {
        setError("A post with this slug already exists.");
        return;
      }
      if (ae.status === 422) {
        const msg = (err as Error).message;
        if (msg) setServerError({ _form: msg });
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
      const nextStatus: PostStatus = status === "published" ? "draft" : "published";
      await updatePostStatus(id, nextStatus);
      setStatus(nextStatus);
      setSuccess(status === "published" ? "Post unpublished." : "Post published.");
    } catch (err) {
      setError(friendlyError(err));
    }
  };

  async function handleDelete() {
    setBusy(true);
    setError(null);
    setConfirmDelete(false);
    try {
      await deletePost(id);
      navigate("/admin/insights");
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  }

  // ── FAQs ──
  const addFaqRow = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaqRow = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));
  const moveFaqRow = (index: number, dir: -1 | 1) => {
    const next = [...faqs];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setFaqs(next);
  };
  const updateFaqRow = (index: number, field: "question" | "answer", value: string) => {
    const next = [...faqs];
    next[index] = { ...next[index], [field]: value };
    setFaqs(next);
  };

  return (
    <div className="min-h-dvh">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/insights")}
            className="mr-3"
          >
            <ArrowLeftIcon className="size-3.5" /> Back to insights
          </Button>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              {isEdit ? "Edit post" : "Add post"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEdit ? "Change the post details and body." : "Create a new insight post."}
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

        {loading && (
          <Alert className="flex items-center gap-3">
            <span>Loading post…</span>
          </Alert>
        )}

        {!loading && (
          <form onSubmit={handleSave} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post details</CardTitle>
                <CardDescription>Required fields are marked.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. SIRA CCTV requirements for Dubai buildings"
                      aria-invalid={!title.trim() || title.trim().length > MAX_TITLE_LEN}
                      required
                      maxLength={MAX_TITLE_LEN}
                    />
                    {!title.trim() && <span className="text-xs text-destructive">Title is required.</span>}
                    {(title.trim().length > MAX_TITLE_LEN) && (
                      <span className="text-xs text-destructive">Title must be 255 characters or less.</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input
                      value={slug}
                      onChange={(e) => { setSlug(e.target.value); setSlugManuallyEdited(true); }}
                      placeholder="e.g. sira-cctv-requirements-dubai"
                      aria-invalid={slug.trim().length > MAX_SLUG_LEN}
                      maxLength={MAX_SLUG_LEN}
                    />
                    {isEdit && slug.trim() && (
                      <span className="text-xs text-muted-foreground">
                        Changing the slug changes the public URL (/blog/{slug}).
                      </span>
                    )}
                    {(slug.trim().length > MAX_SLUG_LEN) && (
                      <span className="text-xs text-destructive">Slug must be 255 characters or less.</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Security"
                      aria-invalid={!category.trim() || category.trim().length > MAX_CATEGORY_LEN}
                      required
                      maxLength={MAX_CATEGORY_LEN}
                    />
                    {!category.trim() && <span className="text-xs text-destructive">Category is required.</span>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Dek (standfirst)</Label>
                  <textarea
                    rows={3}
                    value={dek}
                    onChange={(e) => setDek(e.target.value)}
                    placeholder="Short summary shown under the title…"
                    aria-invalid={!dek.trim()}
                    required
                    className="block w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive"
                  />
                  {!dek.trim() && <span className="text-xs text-destructive">Dek is required.</span>}
                </div>

                <div className="space-y-2">
                  <Label>Cover word</Label>
                  <Input
                    value={coverWord}
                    onChange={(e) => setCoverWord(e.target.value)}
                    placeholder="e.g. Compliance"
                    aria-invalid={!coverWord.trim() || coverWord.trim().length > MAX_COVER_WORD_LEN}
                    required
                    maxLength={MAX_COVER_WORD_LEN}
                  />
                  {!coverWord.trim() && <span className="text-xs text-destructive">Cover word is required.</span>}
                  {(coverWord.trim().length > MAX_COVER_WORD_LEN) && (
                    <span className="text-xs text-destructive">Cover word must be 50 characters or less.</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Author</Label>
                  <Select
                    value={authorId}
                    onValueChange={(v) => setAuthorId(v)}
                  >
                    <SelectTrigger className="w-full" aria-label="Author">
                      <SelectValue placeholder="Choose an author" />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((a) => (
                        <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    Featured
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="rounded-md border text-primary ring-offset-background focus-visible:ring-ring focus-visible:ring-[3px] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Pinned to the top of the Insights page.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={status}
                    onValueChange={(v) => setStatus(v as PostStatus)}
                  >
                    <SelectTrigger className="w-full" aria-label="Status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {POST_STATUSES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Published at</Label>
                  <Input
                    type="date"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    placeholder="YYYY-MM-DD"
                  />
                  <p className="text-xs text-muted-foreground">
                    Optional. The server defaults to today when publishing.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags &amp; related services</CardTitle>
                <CardDescription>
                  Comma-separated values. Max {MAX_CHIP_ITEMS} items, {MAX_CHIP_LEN} chars each.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input
                    value={tagsRaw}
                    onChange={(e) => setTagsRaw(e.target.value)}
                    placeholder="e.g. cctv, sira, dubai"
                    className="block w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs"
                  />
                  <p className="text-xs text-muted-foreground">
                    {parseChipInput(tagsRaw).length} / {MAX_CHIP_ITEMS} tags
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Related services</Label>
                  <Input
                    value={relatedServicesRaw}
                    onChange={(e) => setRelatedServicesRaw(e.target.value)}
                    placeholder="e.g. cctv-installation, network"
                    className="block w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs"
                  />
                  <p className="text-xs text-muted-foreground">
                    {parseChipInput(relatedServicesRaw).length} / {MAX_CHIP_ITEMS} services
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FAQs</CardTitle>
                <CardDescription>
                  Question / answer pairs. Add, remove, or reorder rows.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {faqs.map((row, i) => (
                  <div key={i} className="border border-input rounded-lg p-3 space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={row.question}
                        onChange={(e) => updateFaqRow(i, "question", e.target.value)}
                        placeholder="Question"
                        aria-invalid={!row.question.trim()}
                        className="flex-1"
                      />
                      <Input
                        value={row.answer}
                        onChange={(e) => updateFaqRow(i, "answer", e.target.value)}
                        placeholder="Answer"
                        aria-invalid={!row.answer.trim()}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveFaqRow(i, -1)}
                        disabled={i === 0}
                        className="text-muted-foreground"
                      >
                        <ChevronUpIcon className="size-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveFaqRow(i, 1)}
                        disabled={i === faqs.length - 1}
                        className="text-muted-foreground"
                      >
                        <ChevronDownIcon className="size-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFaqRow(i)}
                        className="text-destructive"
                      >
                        <Trash2Icon className="size-3" />
                      </Button>
                    </div>
                    {!row.question.trim() && <span className="text-xs text-destructive">Question is required.</span>}
                    {!row.answer.trim() && <span className="text-xs text-destructive">Answer is required.</span>}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={addFaqRow}
                >
                  <PlusIcon className="size-3.5" /> Add FAQ row
                </Button>
                {faqErrors.length > 0 && (
                  <p className="text-xs text-destructive">{faqErrors.join(" ")}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO (optional)</CardTitle>
                <CardDescription>
                  Override the default meta title and description.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>SEO title</Label>
                  <Input
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="e.g. SIRA CCTV Requirements — ARTEK Computers"
                    className="block w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label>SEO description</Label>
                  <textarea
                    rows={3}
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="e.g. Learn about SIRA CCTV compliance requirements in Dubai…"
                    className="block w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Body (blocks)</CardTitle>
                <CardDescription>
                  Visual block editor. {blocks.length} / 200 blocks.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between mb-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditAsJson(!editAsJson)}
                  >
                    {editAsJson ? "Visual editor" : "Edit as JSON"}
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    Supports <code className="font-mono text-xs">**bold**</code> and <code className="font-mono text-xs">[label](/path)</code> inline.
                  </span>
                </div>

                {editAsJson ? (
                  <>
                    <textarea
                      rows={12}
                      value={bodyJson}
                      onChange={(e) => setBodyJson(e.target.value)}
                      spellCheck="false"
                      aria-invalid={!!jsonError}
                      className="font-mono text-sm block w-full min-w-0 rounded-md border bg-transparent px-3 py-2 shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive"
                    />
                    {jsonError && <span className="text-xs text-destructive">{jsonError}</span>}
                    <p className="text-xs text-muted-foreground text-right">
                      {parsedJson.length} / 200 blocks
                    </p>
                  </>
                ) : (
                  <BlockEditor
                    blocks={blocks}
                    onChange={(next) => {
                      setBlocks(next);
                      setBodyJson(JSON.stringify(next, null, 2));
                    }}
                    onImageUpload={uploadInsightImage}
                  />
                )}
              </CardContent>
            </Card>

            {isEdit && (
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePublishToggle}
                  disabled={saving}
                >
                  {status === "published" ? "Unpublish post" : "Publish post"}
                </Button>
                {status === "published" && (
                  <a
                    href={`/blog/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-foreground"
                  >
                    View on site
                  </a>
                )}
                {isSuperAdmin && (
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={saving || busy}
                    onClick={() => setConfirmDelete(true)}
                  >
                    Delete post
                  </Button>
                )}
              </div>
            )}

            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => navigate("/admin/insights")}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving || allErrors.length > 0 || (isEdit && !hasChanges)}
              >
                {saving ? "Saving…" : isEdit ? "Save changes" : "Create post"}
              </Button>
            </div>
          </form>
        )}
      </main>

      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setConfirmDelete(false);
          }}
        >
          <div className="w-full max-w-sm rounded-lg border bg-card p-5 shadow-lg">
            <h2 id="confirm-delete-title" className="text-base font-semibold">
              Delete post?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              “{title}” will be deleted. This cannot be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={busy}
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={busy}
                onClick={handleDelete}
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
