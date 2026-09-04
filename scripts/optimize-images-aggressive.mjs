/**
 * Aggressive recompress via in-memory buffers (avoids Windows file locks).
 * Run: node scripts/optimize-images-aggressive.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "images");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(webp|jpe?g|png)$/i.test(entry.name) && !entry.name.includes(".__")) {
      out.push(full);
    }
  }
  return out;
}

function maxWidth(file) {
  const base = path.basename(file).toLowerCase();
  if (base.includes("pardeep") || base.includes("banner")) return 720;
  if (file.includes(`${path.sep}projects${path.sep}`)) return 960;
  if (file.includes(`${path.sep}showcase${path.sep}`)) return 900;
  return 1100;
}

async function main() {
  const files = walk(ROOT);
  const stems = new Map();
  for (const file of files) {
    const dir = path.dirname(file);
    const ext = path.extname(file);
    const stem = path.basename(file, ext);
    const key = `${dir}::${stem}`;
    if (!stems.has(key) || ext === ".webp") stems.set(key, file);
  }

  let beforeTotal = 0;
  let afterTotal = 0;

  for (const [key, source] of stems) {
    const [dir, stem] = key.split("::");
    const before = fs.statSync(source).size;
    beforeTotal += before;
    const w = maxWidth(source);
    const input = fs.readFileSync(source);

    const webpBuf = await sharp(input, { failOn: "none" })
      .rotate()
      .resize({ width: w, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 55, effort: 6, smartSubsample: true })
      .toBuffer();

    const jpgBuf = await sharp(input, { failOn: "none" })
      .rotate()
      .resize({ width: w, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 60, mozjpeg: true, progressive: true })
      .toBuffer();

    const out = path.join(dir, `${stem}.webp`);
    const jpgOut = path.join(dir, `${stem}.jpg`);
    fs.writeFileSync(out, webpBuf);
    fs.writeFileSync(jpgOut, jpgBuf);

    afterTotal += webpBuf.length;
    console.log(
      `${path.relative(ROOT, out)}  ${(before / 1024).toFixed(0)}KB → ${(webpBuf.length / 1024).toFixed(0)}KB`,
    );
  }

  console.log(
    `\nWebP: ${(beforeTotal / 1024 / 1024).toFixed(2)}MB → ${(afterTotal / 1024 / 1024).toFixed(2)}MB`,
  );
}

main();
