import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/blog/mdx-components";

export function MdxContent({ source }: { source: string }) {
  const cleaned = source.replace(/ \{#[a-z0-9-]+\}$/gm, "");

  return (
    <div className="blog-prose">
      <MDXRemote
        source={cleaned}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}
