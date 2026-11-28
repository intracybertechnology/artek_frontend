/**
 * One-off script: export all published posts from src/data/blog.ts to
 * posts-export.json in the project root.
 *
 * Run with: node scripts/export-posts.mjs
 */
import { posts } from "../src/data/blog.ts";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "posts-export.json");

const exportPost = (p) => ({
  slug: p.slug,
  title: p.title,
  dek: p.dek,
  category: p.category,
  tags: Array.isArray(p.tags) ? [...p.tags] : [],
  authorId: p.authorId,
  publishedAt: p.publishedAt,
  featured: Boolean(p.featured),
  coverWord: p.coverWord,
  body: p.body,
  faqs: Array.isArray(p.faqs) ? [...p.faqs] : [],
  relatedServices: Array.isArray(p.relatedServices) ? [...p.relatedServices] : [],
  seo: p.seo ?? null,
  status: p.status,
});

const exported = posts.map(exportPost);
writeFileSync(OUT, JSON.stringify(exported, null, 2) + "\n");

console.log(`Exported ${exported.length} posts to ${OUT}`);
console.log("Keys of first post:", Object.keys(exported[0]));
