export function ArticleFaqs({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  if (!faqs.length) return null;

  return (
    <section className="blog-faqs" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="blog-section-title">
        Frequently asked questions
      </h2>
      <div className="blog-faqs__list">
        {faqs.map((faq) => (
          <details key={faq.question} className="blog-faq">
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
