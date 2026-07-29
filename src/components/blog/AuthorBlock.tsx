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
        <p className="blog-author__role">Full Stack Developer</p>
        <p className="blog-author__bio">
          Based in {personal.location}. Builds business websites and web
          applications with WordPress, Shopify, React, Next.js and Node.js—
          from planning and development through deployment and support.
        </p>
        <div className="blog-author__links">
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href={`mailto:${personal.email}`}>Email</a>
          <a href="/#contact">Contact</a>
        </div>
      </div>
    </section>
  );
}
