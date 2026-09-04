import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: `The page you requested does not exist on ${personal.name}'s portfolio.`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-[78vh] items-center overflow-hidden border-b border-border bg-[linear-gradient(165deg,#0c1210_0%,#15201c_55%,#1a2822_100%)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(15,118,110,0.35), transparent), radial-gradient(ellipse 40% 35% at 10% 80%, rgba(196,120,42,0.18), transparent)",
        }}
      />
      <div className="container-shell relative py-28 sm:py-32">
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
          Error 404
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-[clamp(2.4rem,6vw,4rem)] font-bold tracking-tight text-white">
          This page isn&apos;t here.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          The link may be outdated, or the page moved. Head home, browse
          services, or send a project note.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" magnetic>
            Back to Home
          </Button>
          <Button href="/services" variant="secondary" className="border-white/25 text-white hover:bg-white/10">
            Services
          </Button>
          <Button href="/contact" variant="dark" magnetic>
            Contact
          </Button>
        </div>
        <ul className="mt-12 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] uppercase tracking-[0.1em] text-white/55">
          {[
            { href: "/about", label: "About" },
            { href: "/experience", label: "Experience" },
            { href: "/process", label: "Process" },
            { href: "/reviews", label: "Reviews" },
            { href: "/blog", label: "Blog" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
