import { getAllPostMetas } from "@/lib/blog";
import { getSiteUrl } from "@/lib/utils";
import { personal } from "@/data/personal";

export const dynamic = "force-static";

export async function GET() {
  const siteUrl = getSiteUrl();
  const posts = getAllPostMetas();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}${post.href}</link>
      <guid isPermaLink="true">${siteUrl}${post.href}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <category><![CDATA[${post.category}]]></category>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Web Development Blog | ${personal.name}</title>
    <link>${siteUrl}/blog</link>
    <description>Practical guides on full-stack development, WordPress, Shopify, WooCommerce, website performance, technical SEO and hiring web developers.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
