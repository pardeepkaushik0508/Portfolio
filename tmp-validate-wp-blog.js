const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "content", "blog");
const mine = [
  "elementor-vs-custom-wordpress.mdx",
  "wordpress-speed-optimization-checklist.mdx",
  "woocommerce-website-cost.mdx",
  "wordpress-security-checklist.mdx",
  "improve-core-web-vitals-wordpress.mdx",
  "acf-custom-wordpress-websites.mdx",
  "migrate-wordpress-to-vps.mdx",
  "technical-seo-checklist-wordpress.mdx",
  "woocommerce-cart-checkout-conversion.mdx",
  "signs-wordpress-needs-redesign.mdx",
];

function countWords(text) {
  const cleaned = text
    .replace(/^---[\s\S]*?---\s*/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_\-|[\](){}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned ? cleaned.split(" ").filter(Boolean).length : 0;
}

const allDates = new Map();
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".mdx"))) {
  const raw = fs.readFileSync(path.join(dir, f), "utf8");
  const m = raw.match(/publishedAt:\s*"([^"]+)"/);
  if (m) {
    if (!allDates.has(m[1])) allDates.set(m[1], []);
    allDates.get(m[1]).push(f);
  }
}

console.log("ALL DATES:");
for (const [d, files] of [...allDates.entries()].sort()) {
  console.log(d, files.join(", "));
}
console.log("\nDATE COLLISIONS:");
let collisions = 0;
for (const [d, files] of [...allDates.entries()].sort()) {
  if (files.length > 1) {
    collisions++;
    console.log(d, files.join(", "));
  }
}
if (!collisions) console.log("(none)");

console.log("\nMY ARTICLES:");
for (const f of mine) {
  const raw = fs.readFileSync(path.join(dir, f), "utf8");
  const body = raw.replace(/^---[\s\S]*?---\s*/, "");
  const words = countWords(raw);
  const hasBQ = /^>\s+/m.test(body);
  const hasH1 = /^#\s+/m.test(body);
  const faqs = (raw.match(/^\s*-\s*question:/gm) || []).length;
  const date = (raw.match(/publishedAt:\s*"([^"]+)"/) || [])[1];
  const feat = /featured:\s*true/.test(raw);
  const status = words < 1200 ? "SHORT" : words > 1800 ? "LONG" : "OK";
  console.log(
    [
      f,
      words + "w",
      date,
      "faqs:" + faqs,
      hasBQ ? "bq" : "NO_BQ",
      hasH1 ? "HAS_H1" : "okH",
      feat ? "feat" : "",
      status,
    ]
      .filter(Boolean)
      .join(" | "),
  );
}
