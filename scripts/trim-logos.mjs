/**
 * scripts/trim-logos.mjs
 *
 * For every PNG in public/images/brand-logos/:
 *   1. Trim the near-white/transparent border (sharp trim, threshold 15).
 *   2. Add uniform padding of 12 % of the larger trimmed dimension on all sides,
 *      filled with white, so the logo sits centred in a clean square-ish tile.
 *   3. Save back to the same filename (originals are in brand-logos-original/).
 *
 * Run once: node scripts/trim-logos.mjs
 */

import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGOS_DIR = path.resolve(__dirname, "../public/images/brand-logos");

// Logos known to be very faint / near-white — trim would destroy them, leave unchanged.
const SKIP = new Set(["seagate", "mikrotik"]);

async function main() {
  const files = (await readdir(LOGOS_DIR)).filter((f) => /\.(png|jpg|webp)$/i.test(f));

  const results = [];

  for (const file of files) {
    const stem = file.replace(/\.[^.]+$/, "");
    const filePath = path.join(LOGOS_DIR, file);

    if (SKIP.has(stem)) {
      console.log(`SKIP  ${file}  (faint logo — left unchanged)`);
      results.push({ file, status: "skipped" });
      continue;
    }

    try {
      // 1. Load and trim near-white border — produce a PNG buffer so the next
      //    sharp() call receives a self-describing encoded image, not raw pixels.
      const trimmedBuf = await sharp(filePath)
        .flatten({ background: "#ffffff" })   // collapse transparency to white first
        .trim({ background: "#ffffff", threshold: 15 })
        .png()
        .toBuffer();

      // Read back metadata from the trimmed buffer
      const { width: tw, height: th } = await sharp(trimmedBuf).metadata();

      if (!tw || !th || tw < 10 || th < 10) {
        console.warn(`WARN  ${file}  trimmed too small (${tw}×${th}) — skipping`);
        results.push({ file, status: "too-small", w: tw, h: th });
        continue;
      }

      // 2. Padding = 12 % of the larger dimension, minimum 8 px
      const pad = Math.max(8, Math.round(Math.max(tw, th) * 0.12));

      // 3. Extend with white padding and save
      await sharp(trimmedBuf)
        .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .png()
        .toFile(filePath);

      console.log(`OK    ${file}  trimmed ${tw}×${th}  pad ${pad}px`);
      results.push({ file, status: "ok", w: tw, h: th, pad });
    } catch (err) {
      console.error(`ERR   ${file}  ${err.message}`);
      results.push({ file, status: "error", err: err.message });
    }
  }

  console.log("\n--- Summary ---");
  const ok = results.filter((r) => r.status === "ok").length;
  const skipped = results.filter((r) => r.status === "skipped").length;
  const small = results.filter((r) => r.status === "too-small");
  const errors = results.filter((r) => r.status === "error");

  console.log(`Processed: ${ok}  Skipped (faint): ${skipped}  Too small: ${small.length}  Errors: ${errors.length}`);
  if (small.length) console.log("Too small:", small.map((r) => `${r.file} (${r.w}×${r.h})`).join(", "));
  if (errors.length) console.log("Errors:", errors.map((r) => `${r.file}: ${r.err}`).join("\n"));
}

main().catch((err) => { console.error(err); process.exit(1); });
