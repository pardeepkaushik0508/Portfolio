import Link from "next/link";
import { personal } from "@/data/personal";

export function AuthorBlock() {
  return (
    <section className="blog-author" aria-labelledby="author-heading">
      <h2 id="author-heading" className="sr-only">
        About the author
      </h2>
      <div className="blog-author__inner">
        <p className="blog-kicker">Author</p>
        <p className="blog-author__name">{personal.name}</p>
        <p className="blog-author__role">
          Full Stack Developer in India
        </p>
        <p className="blog-author__bio">
          Based in {personal.location}. Builds business websites and web
          applications with WordPress, Elementor, WooCommerce, Shopify Liquid,
          React, Next.js and Node.js—from planning and development through
          deployment and support.
        </p>
        <div className="blog-author__links">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href={`mailto:${personal.email}`}>Email</a>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </section>
  );
}
