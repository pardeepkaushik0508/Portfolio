import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";

function getText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return getText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function Heading({
  as: Tag,
  children,
  ...props
}: { as: "h2" | "h3"; children?: ReactNode } & ComponentPropsWithoutRef<"h2">) {
  const text = getText(children);
  const id = props.id || slugify(text);
  return (
    <Tag id={id} className={Tag === "h2" ? "blog-h2" : "blog-h3"} {...props}>
      <a href={`#${id}`} className="blog-heading-anchor">
        {children}
      </a>
    </Tag>
  );
}

export const mdxComponents = {
  h1: ({ children }: { children?: ReactNode }) => (
    <p className="blog-inline-warning">{children}</p>
  ),
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <Heading as="h2" {...props}>
      {children}
    </Heading>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <Heading as="h3" {...props}>
      {children}
    </Heading>
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="blog-p" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="blog-ul" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="blog-ol" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="blog-li" {...props} />
  ),
  a: ({ href = "#", children, ...props }: ComponentPropsWithoutRef<"a">) => {
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} className="blog-a" {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className="blog-a"
        rel="noopener noreferrer"
        target={href.startsWith("http") ? "_blank" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <aside className="blog-callout" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="blog-table-wrap" role="region" aria-label="Comparison table" tabIndex={0}>
      <table className="blog-table" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th scope="col" {...props} />
  ),
  code: ({ className, children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const isBlock = Boolean(className);
    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className="blog-inline-code" {...props}>
        {children}
      </code>
    );
  },
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre className="blog-pre" {...props} />
  ),
  hr: () => <hr className="blog-hr" />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="blog-strong" {...props} />
  ),
};
