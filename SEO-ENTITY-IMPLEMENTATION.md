# SEO Entity Implementation — Pardeep Kaushik

## BEFORE vs AFTER (checklist)

| Area | Before | After |
| --- | --- | --- |
| Primary title | Full Stack / WP / Shopify (no India in title) | Full Stack Developer **in India** + WP & Shopify |
| Homepage H1 | Role without India | `Pardeep Kaushik — Full Stack Developer in India` |
| Person jobTitle schema | Combined title string | `Full Stack Developer` + entity description |
| About schema | ProfilePage type without `mainEntity` | `ProfilePage` + `mainEntity` → `#person` |
| India hire intent pages | Missing | `/full-stack-developer-india`, `/wordpress-developer-india`, `/shopify-developer-india`, `/web-developer-india` |
| “Best developer” keyword | Risk of spam claims | Educational article — criteria-based, no #1 claim |
| FAQs | Fewer entity questions | Who / specialize / hire / tech / deploy |
| AI discovery | None | `/llms.txt` (optional, factual) |

## Files modified

- `src/data/personal.ts`
- `src/data/faqs.ts`
- `src/data/service-landings.ts`
- `src/lib/schema.ts`
- `src/app/about/page.tsx`
- `src/app/layout.tsx`
- `src/components/sections/AboutSection.tsx`

## Files created

- `content/blog/how-to-choose-full-stack-developer-india.mdx`
- `public/llms.txt`
- `SEO-ENTITY-IMPLEMENTATION.md` (this file)

## Pages created / strengthened

### New landings (distinct hire-in-India intent)

| URL | Primary keyword | H1 |
| --- | --- | --- |
| `/full-stack-developer-india` | Full Stack Developer in India | Full Stack Developer in India — Pardeep Kaushik |
| `/wordpress-developer-india` | WordPress Developer India | WordPress Developer in India for Business Sites That Stay Editable |
| `/shopify-developer-india` | Shopify Developer India | Shopify Developer in India for Stores That Convert on Mobile |
| `/web-developer-india` | Web Developer India | Web Developer in India for Business Websites and Web Apps |

### New article

| URL | Primary keyword |
| --- | --- |
| `/blog/how-to-choose-full-stack-developer-india` | best full stack developer in India (defensible criteria) |

### Existing (updated metadata/entity)

| URL | Notes |
| --- | --- |
| `/` | Title, description, H1, FAQs, Person/WebSite schema |
| `/about` | ProfilePage + stronger H1/FAQs |
| Existing `/full-stack-developer` etc. | Kept; linked from India pages (not doorway duplicates) |

## SEO titles & meta (core)

**Homepage**

- Title: `Pardeep Kaushik | Full Stack Developer in India | WordPress & Shopify Expert`
- Description: Hire Pardeep — full stack developer in India, 5+ years, WordPress, Shopify, React, Next.js, Node.js, custom development, speed, APIs

**About**

- Title: `About Pardeep Kaushik — Full Stack Developer in India`
- Description: from `personal.aboutIntro`

## Schema added / fixed

- Person `@id` `https://pardeepkaushik.info/#person` — `jobTitle: Full Stack Developer`, verified `sameAs`
- WebSite → publisher/author Person
- ProfilePage on `/about` with `mainEntity` → Person
- Service + FAQ + Breadcrumb on landings (existing pattern)
- Case study CreativeWork (existing)

## Internal links

- India landings ↔ capability landings ↔ `/work/*` case studies
- Blog guide → About, India FS page, WP/Shopify India, contact, case studies
- Homepage FAQs → entity clarity

## Technical SEO

- robots.txt already allows major search/AI bots; sitemap at `/sitemap.xml`
- New landings auto-included via `getAllServiceSlugs()` in `sitemap.ts`
- New blog post included via blog sitemap generation
- `llms.txt` at site root (optional AI aid)

## Performance

- No heavy redesign; no new JS libraries
- Hero LCP image path unchanged
- Avoided duplicate animation text clones (prior fix retained)

## Manual actions required

1. Google Search Console → property `https://pardeepkaushik.info/` → submit `/sitemap.xml`
2. Bing Webmaster Tools → same sitemap
3. Validate schema with Rich Results Test (home, about, one India landing, blog post)
4. Align LinkedIn/Upwork headlines with: `Full Stack Developer | WordPress & Shopify Developer`
5. Do **not** add Fiverr until you provide a verified URL
6. Optional IndexNow key (never invent)
7. Publish additional first-hand articles from the content cluster over time (no mass thin posts)

## GSC steps (short)

1. Add URL-prefix or Domain property
2. Verify (HTML tag / DNS / file — use real token)
3. Sitemaps → `https://pardeepkaushik.info/sitemap.xml`
4. Inspect homepage + `/full-stack-developer-india` + new blog URL
5. Monitor queries: Pardeep Kaushik, full stack developer India, hire WordPress/Shopify India

## External entity / backlink recommendations (legitimate only)

- Keep GitHub / LinkedIn / Upwork consistent with site title
- Client attributions where allowed
- Guest posts or talks only if genuinely authored
- Directory listings only if high-quality and accurate
- Never buy spam links or fake reviews

## URLs to manually test

- https://pardeepkaushik.info/
- https://pardeepkaushik.info/about
- https://pardeepkaushik.info/full-stack-developer-india
- https://pardeepkaushik.info/wordpress-developer-india
- https://pardeepkaushik.info/shopify-developer-india
- https://pardeepkaushik.info/web-developer-india
- https://pardeepkaushik.info/blog/how-to-choose-full-stack-developer-india
- https://pardeepkaushik.info/llms.txt
- https://pardeepkaushik.info/sitemap.xml
- https://pardeepkaushik.info/robots.txt
- https://pardeepkaushik.info/work/utilitytools

## Intentionally NOT done

- No “#1 / best developer in India” self-claim
- No fake testimonials, awards, client counts
- No mass thin location doorway pages
- No invented Fiverr URL
- No privacy/terms pages invented without legal copy (add when you provide text)
