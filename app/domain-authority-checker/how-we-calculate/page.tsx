import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, breadcrumbSchema, faqSchema, softwareApplicationSchema } from "../../../lib/schema";

export const metadata: Metadata = {
  title: "How We Calculate Domain Authority Score | DR Checker",
  description: "How DR Checker calculates its 0-100 Domain Authority Score from OpenPageRank data.",
  alternates: { canonical: "https://dr-checker.com/domain-authority-checker/how-we-calculate" },
  openGraph: {
    title: "How We Calculate Domain Authority Score | DR Checker",
    description: "How DR Checker calculates its 0-100 Domain Authority Score from OpenPageRank data.",
    url: "https://dr-checker.com/domain-authority-checker/how-we-calculate",
    siteName: "DR Checker",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "How We Calculate Domain Authority Score | DR Checker",
    description: "How DR Checker calculates its 0-100 Domain Authority Score from OpenPageRank data."
  }
};

const faqs = [
  {
    question: "Is this Moz Domain Authority?",
    answer: "No. DR Checker calculates an independent authority-style score from OpenPageRank data. It is not Moz Domain Authority and is not affiliated with Moz."
  },
  {
    question: "What data does the score use?",
    answer: "The score uses OpenPageRank link-graph data for the normalized registered domain, then converts that source score to a 0 to 100 display scale."
  },
  {
    question: "Should I compare this score directly with Ahrefs DR?",
    answer: "No. Compare this score with itself over time or against other domains checked in the same tool. Use Ahrefs DR as a separate backlink-strength view."
  },
  {
    question: "Can this score guarantee rankings?",
    answer: "No. Authority metrics are comparison signals. Rankings also depend on search intent, content quality, technical SEO, links, and competition."
  }
];

export default function AuthorityScoreMethodPage() {
  const schemas = [
    softwareApplicationSchema({
      name: "Domain Authority Checker",
      description: "DR Checker calculates an independent 0 to 100 authority-style score from OpenPageRank link-graph data.",
      url: absoluteUrl("/domain-authority-checker"),
      features: [
        "OpenPageRank authority score lookup",
        "0 to 100 score conversion",
        "Domain normalization",
        "Bulk authority checks"
      ]
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Domain Rating Checker", url: absoluteUrl("/") },
      { name: "Domain Authority Checker", url: absoluteUrl("/domain-authority-checker") },
      { name: "How We Calculate", url: absoluteUrl("/domain-authority-checker/how-we-calculate") }
    ])
  ];

  return (
    <main className="standard-page">
      {schemas.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="standard-page__inner">
        <p className="page-kicker">Methodology</p>
        <h1>How We Calculate Domain Authority Score</h1>
        <p className="lead">Our Domain Authority Score is a simple 0-100 rating derived from open link-graph data. It is not Moz Domain Authority and is not affiliated with Moz.</p>
        <section>
          <h2>Formula</h2>
          <p>We fetch OpenPageRank&apos;s current score for the normalized registered domain, then calculate:</p>
          <p><strong>displayed score = Math.round(open_page_rank * 10)</strong></p>
        </section>
        <section>
          <h2>How To Use It</h2>
          <p>Treat the score as a quick comparison signal. It is most useful when paired with referring domains, global rank, topical relevance, organic traffic, and a manual review of link quality.</p>
        </section>
        <section>
          <h2>Related Tools</h2>
          <p><Link href="/domain-authority-checker">Check Authority Score</Link> or compare it with <Link href="/">Ahrefs Domain Rating</Link> and <Link href="/domain-age-checker">Domain Age</Link>.</p>
        </section>
        <section className="faq-block" aria-labelledby="method-faq-title">
          <h2 id="method-faq-title">Frequently asked questions</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
