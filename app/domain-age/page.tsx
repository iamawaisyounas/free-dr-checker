import type { Metadata } from "next";
import SeoBulkTool from "../components/SeoBulkTool";

export const metadata: Metadata = {
  title: "Domain Age Checker | DR Checker",
  description:
    "Check domain age, registration date, expiry date, registrar, and RDAP availability for one domain or a bulk list.",
  alternates: { canonical: "https://dr-checker.com/domain-age" }
};

export default function DomainAgePage() {
  return (
    <main>
      <SeoBulkTool tool="age" />
      <section className="content-section" aria-label="Domain Age guide">
        <div className="content-wrap">
          <section className="copy-block">
            <p className="section-label">RDAP Data</p>
            <h2>What domain age tells you</h2>
            <p className="wide-copy">Domain age is calculated from the public RDAP registration event. Registration data is available for many common TLDs, but some registries return limited or unavailable data.</p>
          </section>
          <section className="copy-block split-block">
            <div>
              <p className="section-label">Related Tools</p>
              <h2>Pair age with authority metrics</h2>
            </div>
            <ul className="check-list">
              <li><a href="/">Domain Rating Checker</a> for Ahrefs DR.</li>
              <li><a href="/authority-score">Authority Score Checker</a> for open link-graph authority.</li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
