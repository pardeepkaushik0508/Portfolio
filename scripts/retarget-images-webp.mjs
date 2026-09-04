import fs from "fs";

const paths = [
  "src/data/projects.ts",
  "src/data/personal.ts",
  "src/components/sections/PillarsSection.tsx",
];

for (const p of paths) {
  const c = fs.readFileSync(p, "utf8");
  const n = c.replace(/(\/images\/[^"'\\\s]+)\.(png|jpe?g)/g, "$1.webp");
  fs.writeFileSync(p, n);
  console.log("updated", p);
}

let m = fs.readFileSync("src/app/manifest.ts", "utf8");
m = m
  .replace("pardeep-kaushik.png", "pardeep-kaushik.jpg")
  .replace("image/png", "image/jpeg");
fs.writeFileSync("src/app/manifest.ts", m);
console.log("manifest ok");
