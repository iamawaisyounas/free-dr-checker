import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, breadcrumbSchema, faqSchema, softwareApplicationSchema } from "../../../lib/schema";

export const metadata: Metadata = {
  title: "How We Calculate Domain Authority Score | DR Checker",
  description: "See how DR Checker calculates its independent 0 to 100 Domain Authority Score from OpenPageRank data and how to use the result responsibly.",
  alternates: { canonical: "https://dr-checker.com/domain-authority-checker/how-we-calculate" },
  openGraph: {
    title: "How We Calculate Domain Authority Score | DR Checker",
    description: "See how DR Checker calculates its independent 0 to 100 Domain Authority Score from OpenPageRank data and how to use the result responsibly.",
    url: "https://dr-checker.com/domain-authority-checker/how-we-calculate",
    siteName: "DR Checker",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "How We Calculate Domain Authority Score | DR Checker",
    description: "See how DR Checker calculates its independent 0 to 100 Domain Authority Score from OpenPageRank data and how to use the result responsibly."
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
        <p className="lead">DR Checker&apos;s Domain Authority Score is an independent 0 to 100 rating derived from open link-graph data. It is not Moz Domain Authority, it is not affiliated with Moz, and it should be used as a comparison signal rather than a ranking promise.</p>
        <section className="method-summary">
          <article>
            <span>Source</span>
            <strong>OpenPageRank</strong>
            <p>We use open link-graph data for the normalized registered domain.</p>
          </article>
          <article>
            <span>Scale</span>
            <strong>0 to 100</strong>
            <p>The source score is converted into a familiar authority-style display score.</p>
          </article>
          <article>
            <span>Limit</span>
            <strong>Not Moz DA</strong>
            <p>The number is independent and should not be labeled as official Moz Domain Authority.</p>
          </article>
        </section>
        <section>
          <h2>Methodology intent</h2>
          <p>Searchers who ask how Domain Authority is calculated usually need more than a formula. They want to know what data is used, whether the score is official Moz DA, whether it can be compared with Ahrefs DR, and what the number can or cannot prove.</p>
          <div className="keyword-map">
            <article className="keyword-card">
              <span>how is domain authority calculated</span>
              <h3>Formula and source</h3>
              <p>We explain the source score, the 0 to 100 conversion, and the normalization step before the lookup.</p>
            </article>
            <article className="keyword-card">
              <span>domain authority score</span>
              <h3>Responsible interpretation</h3>
              <p>The score is a comparison signal, so it should be read beside link quality, organic visibility, and topic fit.</p>
            </article>
            <article className="keyword-card">
              <span>DA vs DR</span>
              <h3>Separate metrics</h3>
              <p>This page keeps DR Checker&apos;s authority score separate from Ahrefs Domain Rating and Moz Domain Authority.</p>
            </article>
          </div>
        </section>
        <section>
          <h2>Formula</h2>
          <p>We fetch OpenPageRank&apos;s current score for the normalized registered domain, then convert it to a familiar 0 to 100 display scale:</p>
          <p><strong>displayed score = Math.round(open_page_rank * 10)</strong></p>
        </section>
        <section>
          <h2>Quality Controls</h2>
          <p>The checker normalizes each submitted URL to the registered domain before requesting the score. Results may be cached to keep the tool fast and reliable when third-party API quotas are temporarily limited.</p>
        </section>
        <section>
          <h2>How To Use It</h2>
          <p>Treat the score as a quick comparison signal. It is most useful when you pair it with referring domains, global rank, topical relevance, organic traffic, and a manual review of link quality.</p>
          <div className="callout-panel">
            <div>
              <h3>Report it clearly</h3>
              <p>When you share this metric with clients or teammates, name the source and keep it separate from official Moz DA and Ahrefs DR.</p>
            </div>
            <ul className="mini-metric-list">
              <li><strong>Say</strong><span>&quot;DR Checker authority score from OpenPageRank-derived link data.&quot;</span></li>
              <li><strong>Avoid</strong><span>&quot;Moz DA,&quot; &quot;Google authority score,&quot; or &quot;ranking score.&quot;</span></li>
              <li><strong>Add</strong><span>Relevance, traffic, editorial quality, and link profile notes before making a decision.</span></li>
            </ul>
          </div>
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
