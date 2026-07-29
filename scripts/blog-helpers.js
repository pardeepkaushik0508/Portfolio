const fs = require("fs");
const path = require("path");

const OUT = path.join(process.cwd(), "content", "blog");
fs.mkdirSync(OUT, { recursive: true });

const DATES = [
  "2026-07-18","2026-07-03","2026-06-21","2026-06-08","2026-05-27",
  "2026-05-14","2026-04-30","2026-04-16","2026-04-02","2026-03-19",
  "2026-03-05","2026-02-18","2026-02-04","2026-01-21","2026-01-08",
  "2025-12-17","2025-12-03","2025-11-19","2025-11-05","2025-10-22",
  "2025-10-08","2025-09-24","2025-09-10","2025-08-27","2025-08-13",
  "2025-07-30","2025-07-15","2025-06-28","2025-06-11","2025-05-26",
  "2025-05-09","2025-04-22","2025-04-05","2025-03-18","2025-03-02",
  "2025-02-14","2025-01-28","2025-01-11","2024-12-16","2024-11-29",
  "2024-11-08","2024-10-21","2024-10-03","2024-09-16","2024-08-28",
  "2024-08-09","2024-07-18","2024-06-25","2024-05-14","2024-03-22"
];

function fm(meta) {
  const faqs = meta.faqs.map((f) => `  - question: ${JSON.stringify(f.q)}\n    answer: ${JSON.stringify(f.a)}`).join("\n");
  return `---
title: ${JSON.stringify(meta.title)}
slug: ${meta.slug}
description: ${JSON.stringify(meta.description)}
excerpt: ${JSON.stringify(meta.excerpt)}
publishedAt: ${meta.publishedAt}
updatedAt: null
category: ${meta.category}
tags:
${meta.tags.map((t) => `  - ${t}`).join("\n")}
primaryKeyword: ${JSON.stringify(meta.primaryKeyword)}
secondaryKeywords:
${meta.secondaryKeywords.map((k) => `  - ${JSON.stringify(k)}`).join("\n")}
author: Pardeep Kaushik
featured: ${meta.featured}
draft: false
faqs:
${faqs}
---
`;
}

function writePost(meta, body) {
  const file = path.join(OUT, `${meta.slug}.mdx`);
  fs.writeFileSync(file, fm(meta) + "\n" + body.trim() + "\n", "utf8");
  return file;
}

module.exports = { DATES, writePost, OUT };
