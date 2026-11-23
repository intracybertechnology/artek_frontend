/**
 * scripts/optimize-images.mjs
 *
 * Optimises raw product photos from images-inbox/<group-slug>/ into
 * public/images/products/<group-slug>/<slug>.webp — always exactly 1000x750
 * (fit "contain" on a white background) as WebP. Quality starts at 80 and
 * steps down to 70/60 while the file is over 120 KB; anything still over
 * 150 KB gets a warning. Inbox files are never modified or deleted.
 *
 *   node scripts/optimize-images.mjs
 */
import { readdir, mkdir } from "node:fs/promises";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

import { productGroups, slugify } from "../src/data/catalog.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INBOX_DIR = path.join(ROOT, "images-inbox");
const OUT_DIR = path.join(ROOT, "public/images/products");

/** Accepted inbox extensions (jfif is JPEG under another name). */
const EXT_SET = new Set(["jpg", "jpeg", "png", "webp", "jfif"]);

const WIDTH = 1000;
const HEIGHT = 750;
const WHITE = "#ffffff";
/** Quality steps: 80 first, stepped down while the output is too heavy. */
const QUALITY_STEPS = [80, 70, 60];
const RETRY_LIMIT = 120 * 1024;
const WARN_LIMIT = 150 * 1024;

/** File-name slug: name without extension, lowercased, spaces/underscores → hyphens. */
function fileSlug(filename) {
  const ext = path.extname(filename);
  const base = filename.slice(0, -ext.length);
  return base.toLowerCase().replace(/[\s_]+/g, "-");
}

/** Product slugs per group — used to warn about photos that match no product. */
const productSlugsByGroup = new Map(
  productGroups.map((g) => [g.slug, new Set(g.items.map((item) => slugify(item)))]),
);

const fmtKb = (bytes) => `${(bytes / 1024).toFixed(1)}KB`;

/** Encode at stepped-down qualities until the buffer fits the retry limit. */
async function encode(src) {
  let last;
  for (const quality of QUALITY_STEPS) {
    const buffer = await sharp(src)
      .flatten({ background: WHITE })
      .resize(WIDTH, HEIGHT, { fit: "contain", background: WHITE })
      .webp({ quality })
      .toBuffer();
    last = { buffer, quality };
    if (buffer.byteLength <= RETRY_LIMIT) break;
  }
  return last;
}

async function main() {
  const groupDirs = (await readdir(INBOX_DIR, { withFileTypes: true }))
    .filter((d) => d.isDirectory());

  for (const groupDir of groupDirs) {
    const groupSlug = groupDir.name;
    const knownSlugs = productSlugsByGroup.get(groupSlug);

    const files = (await readdir(path.join(INBOX_DIR, groupSlug)))
      .filter((file) => EXT_SET.has(path.extname(file).slice(1).toLowerCase()));

    for (const file of files) {
      const slug = fileSlug(file);
      const dest = path.join(OUT_DIR, groupSlug, `${slug}.webp`);

      const { buffer, quality } = await encode(path.join(INBOX_DIR, groupSlug, file));
      await mkdir(path.dirname(dest), { recursive: true });
      writeFileSync(dest, buffer);

      console.log(`OK    ${groupSlug}/${file} → ${path.relative(ROOT, dest)}  ${fmtKb(buffer.byteLength)}  (q${quality})`);

      if (buffer.byteLength > WARN_LIMIT) {
        console.log(`WARN  ${groupSlug}/${file} is still over ${fmtKb(WARN_LIMIT)} after q${quality}`);
      }
      if (knownSlugs && !knownSlugs.has(slug)) {
        console.log(`WARN  no product "${slug}" in group "${groupSlug}" (file: ${file})`);
      }
      if (!knownSlugs) {
        console.log(`WARN  "${groupSlug}" is not a product group slug (file: ${file})`);
      }
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
