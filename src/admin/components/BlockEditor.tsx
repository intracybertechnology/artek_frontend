import { useCallback, useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/admin/components/ui/button";
import { Input } from "@/admin/components/ui/input";
import { Label } from "@/admin/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/admin/components/ui/select";
import { API_BASE } from "@/lib/api";

const MAX_BLOCKS = 200;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const BLOCK_TYPES: { value: string; label: string }[] = [
  { value: "p", label: "Paragraph" },
  { value: "h2", label: "Heading 2" },
  { value: "h3", label: "Heading 3" },
  { value: "ul", label: "Bulleted list" },
  { value: "ol", label: "Numbered list" },
  { value: "quote", label: "Quote" },
  { value: "callout", label: "Callout" },
  { value: "table", label: "Table" },
  { value: "image", label: "Image" },
];

type EditableTextBlock = { type: string; text: string; id?: string; cite?: string; title?: string };
type EditableListBlock = { type: "ul" | "ol"; items: string[] };
type EditableTableBlock = { type: "table"; head: string[]; rows: string[][] };
type EditableImageBlock = {
  type: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

type EditableBlock =
  | EditableTextBlock
  | EditableListBlock
  | EditableTableBlock
  | EditableImageBlock;

type BlockEditorProps = {
  blocks: EditableBlock[];
  onChange: (blocks: EditableBlock[]) => void;
  onImageUpload?: (file: File) => Promise<{ path: string; width: number; height: number }>;
  disabled?: boolean;
};

function newBlock(type: string): EditableBlock {
  switch (type) {
    case "p":
      return { type: "p", text: "" };
    case "h2":
      return { type: "h2", id: "", text: "" };
    case "h3":
      return { type: "h3", text: "" };
    case "ul":
      return { type: "ul", items: [""] };
    case "ol":
      return { type: "ol", items: [""] };
    case "quote":
      return { type: "quote", text: "", cite: "" };
    case "callout":
      return { type: "callout", title: "", text: "" };
    case "table":
      return { type: "table", head: [""], rows: [[""]] };
    case "image":
      return { type: "image", src: "", alt: "", width: 0, height: 0 };
    default:
      return { type: "p", text: "" };
  }
}

export function BlockEditor({ blocks, onChange, onImageUpload, disabled }: BlockEditorProps) {
  const [localBlocks, setLocalBlocks] = useState(blocks);
  const [imageUploading, setImageUploading] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<number, string[]>>({});

  // Sync external changes (e.g. JSON mode edits)
  useEffect(() => {
    setLocalBlocks(blocks);
  }, [blocks]);

  // Validate blocks and show errors inline
  useEffect(() => {
    const newErrors: Record<number, string[]> = {};
    localBlocks.forEach((block, i) => {
      const errs: string[] = [];
      switch (block.type) {
        case "p":
        case "h3":
          if (!block.text.trim()) errs.push("Text is required.");
          break;
        case "h2":
          if (!block.text.trim()) errs.push("Text is required.");
          break;
        case "ul":
        case "ol": {
          const list = block as EditableListBlock;
          if (list.items.length === 0) errs.push("At least one item is required.");
          list.items.forEach((item, j) => {
            if (!item.trim()) errs.push(`Item ${j + 1} must not be empty.`);
          });
          break;
        }
        case "quote":
          if (!block.text.trim()) errs.push("Quote text is required.");
          break;
        case "callout":
          if (!block.title?.trim()) errs.push("Title is required.");
          if (!block.text.trim()) errs.push("Text is required.");
          break;
        case "table": {
          const tbl = block as EditableTableBlock;
          tbl.head.forEach((h, j) => {
            if (!h.trim()) errs.push(`Column ${j + 1} header must not be empty.`);
          });
          tbl.rows.forEach((row, r) => {
            row.forEach((cell, c) => {
              if (!cell.trim()) errs.push(`Row ${r + 1}, cell ${c + 1} must not be empty.`);
            });
          });
          break;
        }
        case "image": {
          const img = block as EditableImageBlock;
          if (!img.alt.trim()) errs.push("Alt text is required.");
          break;
        }
      }
      if (errs.length > 0) newErrors[i] = errs;
    });
    setErrors(newErrors);
  }, [localBlocks]);

  const addBlock = useCallback(
    (type: string) => {
      if (localBlocks.length >= MAX_BLOCKS) return;
      const block = newBlock(type);
      const next = [...localBlocks, block];
      setLocalBlocks(next);
      onChange(next);
    },
    [localBlocks, onChange],
  );

  const removeBlock = useCallback(
    (index: number) => {
      const next = localBlocks.filter((_, i) => i !== index);
      setLocalBlocks(next);
      onChange(next);
    },
    [localBlocks, onChange],
  );

  const moveBlock = useCallback(
    (index: number, dir: -1 | 1) => {
      const next = [...localBlocks];
      const target = index + dir;
      if (target < 0 || target >= next.length) return;
      [next[index], next[target]] = [next[target], next[index]];
      setLocalBlocks(next);
      onChange(next);
    },
    [localBlocks, onChange],
  );

  const updateField = useCallback(
    (index: number, field: string, value: unknown) => {
      const next = [...localBlocks];
      (next[index] as any)[field] = value;
      setLocalBlocks(next);
      onChange(next);
    },
    [localBlocks, onChange],
  );

  const addListItem = useCallback((index: number) => {
    const next = [...localBlocks];
    const block = next[index] as EditableListBlock;
    block.items.push("");
    setLocalBlocks(next);
    onChange(next);
  }, [localBlocks, onChange]);

  const removeListItem = useCallback((blockIndex: number, itemIndex: number) => {
    const next = [...localBlocks];
    const block = next[blockIndex] as EditableListBlock;
    block.items.splice(itemIndex, 1);
    setLocalBlocks(next);
    onChange(next);
  }, [localBlocks, onChange]);

  const updateListItem = useCallback((blockIndex: number, itemIndex: number, value: string) => {
    const next = [...localBlocks];
    const block = next[blockIndex] as EditableListBlock;
    block.items[itemIndex] = value;
    setLocalBlocks(next);
    onChange(next);
  }, [localBlocks, onChange]);

  const addTableColumn = useCallback((index: number) => {
    const next = [...localBlocks];
    const block = next[index] as EditableTableBlock;
    block.head.push("");
    block.rows.forEach((row) => row.push(""));
    setLocalBlocks(next);
    onChange(next);
  }, [localBlocks, onChange]);

  const removeTableColumn = useCallback((index: number, colIndex: number) => {
    const next = [...localBlocks];
    const block = next[index] as EditableTableBlock;
    block.head.splice(colIndex, 1);
    block.rows.forEach((row) => row.splice(colIndex, 1));
    setLocalBlocks(next);
    onChange(next);
  }, [localBlocks, onChange]);

  const addTableRow = useCallback((index: number) => {
    const next = [...localBlocks];
    const block = next[index] as EditableTableBlock;
    block.rows.push(Array(block.head.length).fill(""));
    setLocalBlocks(next);
    onChange(next);
  }, [localBlocks, onChange]);

  const removeTableRow = useCallback((index: number, rowIndex: number) => {
    const next = [...localBlocks];
    const block = next[index] as EditableTableBlock;
    block.rows.splice(rowIndex, 1);
    setLocalBlocks(next);
    onChange(next);
  }, [localBlocks, onChange]);

  const updateTableCell = useCallback(
    (blockIndex: number, rowIndex: number, colIndex: number, value: string) => {
      const next = [...localBlocks];
      const block = next[blockIndex] as EditableTableBlock;
      block.rows[rowIndex][colIndex] = value;
      setLocalBlocks(next);
      onChange(next);
    },
    [localBlocks, onChange],
  );

  const updateTableHead = useCallback((blockIndex: number, colIndex: number, value: string) => {
    const next = [...localBlocks];
    const block = next[blockIndex] as EditableTableBlock;
    block.head[colIndex] = value;
    setLocalBlocks(next);
    onChange(next);
  }, [localBlocks, onChange]);

  const handleImageUpload = useCallback(
    async (file: File, blockIndex: number) => {
      if (!onImageUpload) return;
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        // handled by validation
        return;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        return;
      }
      setImageUploading(blockIndex);
      try {
        const result = await onImageUpload(file);
        const next = [...localBlocks];
        const block = next[blockIndex] as EditableImageBlock;
        block.src = result.path;
        block.width = result.width;
        block.height = result.height;
        setLocalBlocks(next);
        onChange(next);
      } finally {
        setImageUploading(null);
      }
    },
    [localBlocks, onChange, onImageUpload],
  );

  const handleImageSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, blockIndex: number) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        return;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        return;
      }
      void handleImageUpload(file, blockIndex);
      e.target.value = "";
    },
    [handleImageUpload],
  );

  const blockCount = localBlocks.length;

  return (
    <div className="space-y-3">
      {localBlocks.map((block, i) => {
        const blockErrors = errors[i] ?? [];
        const isImageUploading = imageUploading === i;
        return (
          <div
            key={i}
            className="border border-input rounded-lg p-3 sm:p-4 space-y-2 bg-card"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {block.type}
              </span>
              <span className="text-xs text-muted-foreground">Block {i + 1}</span>
              <div className="ml-auto flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={disabled || i === 0}
                  onClick={() => moveBlock(i, -1)}
                  className="text-muted-foreground"
                >
                  <ChevronUpIcon className="size-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={disabled || i === blockCount - 1}
                  onClick={() => moveBlock(i, 1)}
                  className="text-muted-foreground"
                >
                  <ChevronDownIcon className="size-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={disabled}
                  onClick={() => removeBlock(i)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2Icon className="size-3" />
                </Button>
              </div>
            </div>

            {block.type === "p" || block.type === "h3" || block.type === "quote" || block.type === "h2" || block.type === "callout" ? (
              <>
                {block.type === "h2" && (
                  <div className="space-y-1">
                    <Label>Heading ID (optional, server generates)</Label>
                    <Input
                      value={block.id ?? ""}
                      onChange={(e) => updateField(i, "id", e.target.value)}
                      placeholder="auto-generated"
                      disabled={disabled}
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <Label>{block.type === "h2" ? "Heading" : block.type === "h3" ? "Sub-heading" : block.type === "quote" ? "Quote" : block.type === "callout" ? "Callout text" : "Text"}</Label>
                  <Input
                    value={block.text}
                    onChange={(e) => updateField(i, "text", e.target.value)}
                    placeholder="Supports **bold** and [link](/path) inline."
                    disabled={disabled}
                    className="block w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Supports <code className="font-mono text-xs">**bold**</code> and <code className="font-mono text-xs">[label](/path)</code> inline.
                  </p>
                </div>
                {block.type === "quote" && (
                  <div className="space-y-1">
                    <Label>Cite (optional)</Label>
                    <Input
                      value={block.cite ?? ""}
                      onChange={(e) => updateField(i, "cite", e.target.value)}
                      placeholder="Source attribution"
                      disabled={disabled}
                      className="block w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs"
                    />
                  </div>
                )}
                {block.type === "callout" && (
                  <div className="space-y-1">
                    <Label>Callout title</Label>
                    <Input
                      value={block.title ?? ""}
                      onChange={(e) => updateField(i, "title", e.target.value)}
                      placeholder="Title"
                      disabled={disabled}
                      className="block w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs"
                    />
                  </div>
                )}
              </>
            ) : block.type === "ul" || block.type === "ol" ? (
              <div className="space-y-2">
                {(block as EditableListBlock).items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Input
                      value={item}
                      onChange={(e) => updateListItem(i, j, e.target.value)}
                      placeholder="List item"
                      disabled={disabled}
                      className="flex-1 min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={disabled || (block as EditableListBlock).items.length === 1}
                      onClick={() => removeListItem(i, j)}
                      className="text-destructive"
                    >
                      <Trash2Icon className="size-3" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={disabled}
                  onClick={() => addListItem(i)}
                >
                  <PlusIcon className="size-3" /> Add item
                </Button>
              </div>
            ) : block.type === "table" ? (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label>Table header</Label>
                  <div className="flex gap-2">
                    {(block as EditableTableBlock).head.map((h, j) => (
                      <Input
                        key={j}
                        value={h}
                        onChange={(e) => updateTableHead(i, j, e.target.value)}
                        placeholder="Column header"
                        disabled={disabled}
                        className="min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs"
                      />
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={disabled}
                      onClick={() => addTableColumn(i)}
                    >
                      <PlusIcon className="size-3" /> Column
                    </Button>
                    {(block as EditableTableBlock).head.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={disabled}
                        onClick={() => removeTableColumn(i, ((block as EditableTableBlock).head.length - 1))}
                        className="text-destructive"
                      >
                        <Trash2Icon className="size-3" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Rows</Label>
                  {(block as EditableTableBlock).rows.map((row, r) => (
                    <div key={r} className="flex gap-2">
                      {row.map((cell, c) => (
                        <Input
                          key={c}
                          value={cell}
                          onChange={(e) => updateTableCell(i, r, c, e.target.value)}
                          placeholder="Cell"
                          disabled={disabled}
                          className="min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs"
                        />
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={disabled}
                        onClick={() => removeTableRow(i, r)}
                        className="text-destructive"
                      >
                        <Trash2Icon className="size-3" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={disabled}
                    onClick={() => addTableRow(i)}
                  >
                    <PlusIcon className="size-3" /> Row
                  </Button>
                </div>
              </div>
            ) : block.type === "image" ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                    onChange={(e) => handleImageSelect(e, i)}
                    disabled={disabled || isImageUploading}
                    aria-label="Upload image"
                  />
                  {(() => {
                    const imgBlock = block as EditableImageBlock;
                    if (!imgBlock.src) return null;
                    return (
                      <img
                        src={`${API_BASE}${imgBlock.src}`}
                        alt={imgBlock.alt}
                        loading="lazy"
                        className="size-20 shrink-0 rounded-md object-cover border border-input bg-muted"
                      />
                    );
                  })()}
                </div>
                <div className="space-y-1">
                  <Label>Alt text</Label>
                  <Input
                    value={(block as EditableImageBlock).alt}
                    onChange={(e) => updateField(i, "alt", e.target.value)}
                    placeholder="Alt text"
                    disabled={disabled}
                    className="block w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Caption (optional)</Label>
                  <Input
                    value={((block as EditableImageBlock).caption ?? "")}
                    onChange={(e) => updateField(i, "caption", e.target.value)}
                    placeholder="Caption"
                    disabled={disabled}
                    className="block w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Width</Label>
                  <Input
                    type="number"
                    value={String((block as EditableImageBlock).width ?? "")}
                    onChange={(e) => updateField(i, "width", Number(e.target.value) || 0)}
                    disabled={disabled}
                    className="w-24 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Height</Label>
                  <Input
                    type="number"
                    value={String((block as EditableImageBlock).height ?? "")}
                    onChange={(e) => updateField(i, "height", Number(e.target.value) || 0)}
                    disabled={disabled}
                    className="w-24 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs"
                  />
                </div>
                {isImageUploading && (
                  <p className="text-xs text-muted-foreground">Uploading image…</p>
                )}
              </div>
            ) : null}

            {blockErrors.length > 0 && (
              <div className="flex items-start gap-1 text-xs text-destructive">
                <span>Block {i + 1}:</span>
                <span>{blockErrors.join(" ")}</span>
              </div>
            )}
          </div>
        );
      })}

      {localBlocks.length === 0 && (
        <p className="text-xs text-muted-foreground">No blocks yet. Add a block to start writing.</p>
      )}

      <div className="flex items-center gap-2 pt-2">
        <Label>Add block</Label>
        <Select
          value=""
          onValueChange={(v) => {
            if (v) {
              addBlock(v);
            }
          }}
          disabled={disabled || localBlocks.length >= MAX_BLOCKS}
        >
          <SelectTrigger className="w-[180px]" aria-label="Add block type">
            <SelectValue placeholder="Choose block type" />
          </SelectTrigger>
          <SelectContent>
            {BLOCK_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Max {MAX_BLOCKS} blocks.
        </p>
      </div>
    </div>
  );
}
