import { pricingFaqs } from "@/data/pricing";

export function PricingFaqSection() {
  return (
    <section className="section-shell border-b border-border bg-surface" id="pricing-faq">
      <div className="container-shell max-w-3xl">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          Pricing FAQ
        </h2>
        <dl className="mt-8 space-y-6">
          {pricingFaqs.map((item) => (
            <div key={item.question}>
              <dt className="font-display text-lg font-semibold tracking-tight">
                {item.question}
              </dt>
              <dd className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
