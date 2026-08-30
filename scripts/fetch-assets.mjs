/**
 * Downloads the product photo library recovered from the previous site.
 *
 * Sources live in content/image-sources.json, already rewritten from the
 * 250x250/500x500 thumbnails the old site displayed to the 1000x1000
 * originals. Images land in public/products/<slug>-<n>.<ext> and a manifest
 * is written to content/image-manifest.json for the content layer to read.
 *
 *   node scripts/fetch-assets.mjs
 */
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { join } from "node:path";

const OUT_DIR = "public/products";
const CONCURRENCY = 6;
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

/**
 * The CDN lies about format in the URL — several `.webp` paths return JPEG
 * bytes. Trust the magic number, not the extension.
 */
function sniffExt(buf) {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return ".jpg";
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])))
    return ".png";
  if (buf.subarray(0, 4).toString() === "RIFF" && buf.subarray(8, 12).toString() === "WEBP")
    return ".webp";
  if (buf.subarray(0, 3).toString() === "GIF") return ".gif";
  return null;
}

async function download(url, baseName) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);

  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.byteLength < 1024) throw new Error(`suspiciously small: ${url}`);

  const ext = sniffExt(buf);
  if (!ext) throw new Error(`unrecognised image format: ${url}`);
  if (ext === ".gif") throw new Error(`tracking pixel, skipped: ${url}`);

  const file = `${baseName}${ext}`;
  const dest = join(OUT_DIR, file);
  if (await exists(dest)) return { file, cached: true };

  await writeFile(dest, buf);
  return { file, bytes: buf.byteLength };
}

/** Runs tasks with a fixed worker pool so we don't hammer the CDN. */
async function pool(items, limit, worker) {
  const results = [];
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const i = cursor++;
        results[i] = await worker(items[i], i);
      }
    }),
  );
  return results;
}

const sources = JSON.parse(await readFile("content/image-sources.json", "utf8"));
await mkdir(OUT_DIR, { recursive: true });

const jobs = [];
for (const [slug, group] of Object.entries(sources)) {
  group.images.forEach((url, i) => {
    jobs.push({ slug, url, baseName: `${slug}-${i + 1}` });
  });
}

console.log(`Fetching ${jobs.length} images into ${OUT_DIR}/ …`);

let ok = 0;
let cached = 0;
const failed = [];

const done = await pool(jobs, CONCURRENCY, async (job) => {
  try {
    const r = await download(job.url, job.baseName);
    if (r.cached) cached++;
    else ok++;
    return { ...job, file: r.file, ok: true };
  } catch (err) {
    failed.push({ ...job, error: String(err.message ?? err) });
    return { ...job, ok: false };
  }
});

const manifest = {};
for (const job of done) {
  if (!job.ok) continue;
  (manifest[job.slug] ??= { name: sources[job.slug].name, files: [] }).files.push(
    `/products/${job.file}`,
  );
}

await writeFile("content/image-manifest.json", JSON.stringify(manifest, null, 2));

console.log(`  downloaded ${ok}, cached ${cached}, failed ${failed.length}`);
if (failed.length) {
  for (const f of failed.slice(0, 10)) console.log(`  ! ${f.baseName}: ${f.error}`);
}
console.log(
  `Manifest: ${Object.keys(manifest).length} groups -> content/image-manifest.json`,
);
