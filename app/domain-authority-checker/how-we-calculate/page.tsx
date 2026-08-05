import type { Metadata } from "next";
import Link from "next/link";

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

export default function AuthorityScoreMethodPage() {
  return (
    <main className="standard-page">
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
      </div>
    </main>
  );
}
