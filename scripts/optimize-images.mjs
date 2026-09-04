/**
 * Compress public images with sharp for faster next/image delivery.
 * Writes optimized .webp + .jpg for each raster; removes bulky .png when replaced.
 * Run: node scripts/optimize-images.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "images");

const MAX_WIDTH = {
  portrait: 900,
  project: 1400,
  default: 1600,
};

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(png|jpe?g|webp)$/i.test(entry.name) && !entry.name.includes(".__opt__")) {
      out.push(full);
    }
  }
  return out;
}

function kindFor(file) {
  const base = path.basename(file).toLowerCase();
  if (
    base.includes("pardeep") ||
    base.includes("banner") ||
    base.includes("profile")
  ) {
    return "portrait";
  }
  if (file.includes(`${path.sep}projects${path.sep}`)) return "project";
  return "default";
}

async function optimizeStem(dir, stem, sourceFile, kind) {
  const before = fs.statSync(sourceFile).size;
  if (before < 8_000) return { skipped: true };

  const meta = await sharp(sourceFile, { failOn: "none" }).metadata();
  const width = meta.width || MAX_WIDTH[kind];
  const maxW = MAX_WIDTH[kind];
  const targetW = Math.min(width, maxW);
  const qWebp = kind === "portrait" ? 78 : 70;
  const qJpeg = kind === "portrait" ? 82 : 74;

  const base = () =>
    sharp(sourceFile, { failOn: "none" })
      .rotate()
      .resize({
        width: targetW,
        fit: "inside",
        withoutEnlargement: true,
      });

  const webpPath = path.join(dir, `${stem}.webp`);
  const jpgPath = path.join(dir, `${stem}.jpg`);
  const webpTmp = path.join(dir, `${stem}.__opt__.webp`);
  const jpgTmp = path.join(dir, `${stem}.__opt__.jpg`);

  await base().webp({ quality: qWebp, effort: 6 }).toFile(webpTmp);
  await base()
    .jpeg({ quality: qJpeg, mozjpeg: true, progressive: true })
    .toFile(jpgTmp);

  fs.renameSync(webpTmp, webpPath);
  fs.renameSync(jpgTmp, jpgPath);

  // Drop original PNG (and duplicate png/jpg pairs) once jpg+webp exist
  const pngPath = path.join(dir, `${stem}.png`);
  if (fs.existsSync(pngPath)) {
    try {
      fs.unlinkSync(pngPath);
    } catch {
      /* ignore */
    }
  }

  const after = fs.statSync(webpPath).size;
  return { before, after, webpPath, jpgPath, kind };
}

async function main() {
  const files = walk(ROOT);
  // Group by directory+stem so we only process each asset once
  const stems = new Map();
  for (const file of files) {
    const dir = path.dirname(file);
    const ext = path.extname(file);
    const stem = path.basename(file, ext);
    const key = `${dir}::${stem}`;
    const prev = stems.get(key);
    // Prefer png/jpg over existing webp as source for re-encode
    if (!prev) {
      stems.set(key, file);
      continue;
    }
    const prevExt = path.extname(prev).toLowerCase();
    const rank = (e) => (e === ".png" ? 3 : e === ".jpg" || e === ".jpeg" ? 2 : 1);
    if (rank(ext.toLowerCase()) > rank(prevExt)) stems.set(key, file);
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const [key, sourceFile] of stems) {
    const [dir, stem] = key.split("::");
    const kind = kindFor(sourceFile);
    try {
      const r = await optimizeStem(dir, stem, sourceFile, kind);
      if (r.skipped) continue;
      totalBefore += r.before;
      totalAfter += r.after;
      const pct = Math.round((1 - r.after / r.before) * 100);
      console.log(
        `${path.relative(ROOT, sourceFile)}  ${(r.before / 1024).toFixed(0)}KB → ${(r.after / 1024).toFixed(0)}KB webp (${pct}% smaller)`,
      );
    } catch (err) {
      console.error("FAIL", sourceFile, err.message);
    }
  }

  console.log(
    `\nWebP total: ${(totalBefore / 1024 / 1024).toFixed(2)}MB → ${(totalAfter / 1024 / 1024).toFixed(2)}MB`,
  );
}

main();
