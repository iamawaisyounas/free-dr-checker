import type { Metadata } from "next";
import SeoBulkTool from "../components/SeoBulkTool";

export const metadata: Metadata = {
  title: "Domain Authority Score Checker | DR Checker",
  description:
    "Check a domain authority-style 0-100 authority score from open link-graph data. Bulk check domains with referring domains, global rank, and cached results.",
  alternates: { canonical: "https://dr-checker.com/authority-score" }
};

export default function AuthorityScorePage() {
  return (
    <main>
      <SeoBulkTool tool="authority" />
      <section className="content-section" aria-label="Authority Score guide">
        <div className="content-wrap">
          <section className="copy-block">
            <p className="section-label">Score Method</p>
            <h2>How this authority score works</h2>
            <p className="wide-copy">The score converts OpenPageRank&apos;s 0-10 link-graph score into a 0-100 rating by multiplying by 10 and rounding. Use it as a directional comparison metric alongside traffic, relevance, content quality, and manual backlink review.</p>
          </section>
          <section className="copy-block split-block">
            <div>
              <p className="section-label">Related Tools</p>
              <h2>Check the same domain from more than one angle</h2>
            </div>
            <ul className="check-list">
              <li><a href="/">Domain Rating Checker</a> for the Ahrefs DR score.</li>
              <li><a href="/domain-age">Domain Age Checker</a> for registration age and expiry data.</li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
