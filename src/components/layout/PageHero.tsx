import Link from "next/link";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  breadcrumbs?: { name: string; href?: string }[];
};

export function PageHero({
  eyebrow,
  title,
  description,
  className,
  breadcrumbs,
}: PageHeroProps) {
  const crumbs = breadcrumbs ?? [
    { name: "Home", href: "/" },
    { name: eyebrow },
  ];

  return (
    <header
      className={cn(
        "border-b border-border bg-[linear-gradient(165deg,#f7faf9_0%,#eef3f2_48%,#f8f6f1_100%)] pt-28 pb-12 sm:pt-32 sm:pb-14",
        className,
      )}
    >
      <div className="container-shell">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            {crumbs.map((crumb, index) => (
              <li key={`${crumb.name}-${index}`} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden>/</span> : null}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition hover:text-foreground"
                  >
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-foreground">{crumb.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="section-heading mt-4 max-w-3xl">{title}</h1>
        <p className="section-lead mt-4 max-w-2xl">{description}</p>
      </div>
    </header>
  );
}
