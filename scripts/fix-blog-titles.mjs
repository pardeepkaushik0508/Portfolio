import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "content", "blog");
const map = new Map();

for (const file of fs.readdirSync(OUT).filter((f) => f.endsWith(".mdx"))) {
  const fp = path.join(OUT, file);
  const raw = fs.readFileSync(fp, "utf8");
  const title = (raw.match(/title:\s*"([^"]+)"/) || [])[1];
  if (!title) continue;
  if (!map.has(title)) map.set(title, []);
  map.get(title).push({ file, fp, raw });
}

let fixed = 0;
for (const [title, items] of map) {
  if (items.length < 2) continue;
  console.log("DUP:", title, "=>", items.map((i) => i.file).join(", "));
  // Keep the first (usually original), rename later duplicates
  for (let i = 1; i < items.length; i += 1) {
    const item = items[i];
    const newTitle = `${title} (${i + 1})`.replace(/ Guide \(2\)/, " Playbook").replace(/ Checklist \(2\)/, " Deep Dive");
    // Better unique titles from slug
    const slugTitle = item.file
      .replace(/\.mdx$/, "")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const unique = slugTitle.length > 12 ? slugTitle : newTitle;
    const next = item.raw.replace(/title:\s*"[^"]+"/, `title: ${JSON.stringify(unique)}`);
    fs.writeFileSync(item.fp, next);
    fixed += 1;
    console.log("  renamed", item.file, "->", unique);
  }
}

console.log(`Fixed ${fixed} duplicate titles`);
