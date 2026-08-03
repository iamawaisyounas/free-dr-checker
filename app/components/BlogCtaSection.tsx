import Link from "next/link";

export default function BlogCtaSection() {
  return (
    <section className="blog-domain-cta" aria-labelledby="blog-domain-cta-title">
      <div className="blog-domain-cta__content">
        <h2 id="blog-domain-cta-title">
          Check Domain Rating <em>in seconds.</em>
        </h2>
        <p>No signup. No delay. Clear SEO authority insights.</p>
        <Link className="blog-domain-cta__button" href="/">Check Domain Rating Free</Link>
        <small>Free forever. Nothing to install. Start with any domain.</small>
      </div>
    </section>
  );
}
