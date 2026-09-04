import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "content", "blog");
const files = fs.readdirSync(OUT).filter((f) => f.endsWith(".mdx")).sort();
const used = new Set();

const entries = files.map((file) => {
  const fp = path.join(OUT, file);
  const raw = fs.readFileSync(fp, "utf8");
  const m = raw.match(/publishedAt:\s*"([^"]+)"/);
  return { file, fp, raw, date: m?.[1] || null, keep: false };
});

for (const e of entries) {
  if (e.date && !used.has(e.date) && !e.date.startsWith("2026-07")) {
    used.add(e.date);
    e.keep = true;
  }
}

let day = 0;
function nextDate() {
  const d = new Date(Date.UTC(2025, 0, 1));
  d.setUTCDate(d.getUTCDate() + day);
  day += 1;
  const iso = d.toISOString().slice(0, 10);
  if (used.has(iso)) return nextDate();
  used.add(iso);
  return iso;
}

let changed = 0;
for (const e of entries) {
  if (e.keep) continue;
  const newDate = nextDate();
  const newRaw = e.raw.replace(/publishedAt:\s*"[^"]+"/, `publishedAt: "${newDate}"`);
  if (newRaw !== e.raw) {
    fs.writeFileSync(e.fp, newRaw);
    changed += 1;
  }
}

console.log(`Updated dates on ${changed} posts. Unique dates: ${used.size}`);
