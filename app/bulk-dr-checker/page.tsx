import type { Metadata } from "next";
import DiscoverTools from "../components/DiscoverTools";
import SeoBulkTool from "../components/SeoBulkTool";

const title = "Bulk DR Checker - Check Ahrefs DR for Multiple Domains";
const description =
  "Check Ahrefs Domain Rating for up to 100 domains at once. Paste domains or URLs, remove duplicates, and export bulk DR results to CSV.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://dr-checker.com/bulk-dr-checker" },
  openGraph: {
    title,
    description,
    url: "https://dr-checker.com/bulk-dr-checker",
    siteName: "DR Checker",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DR Checker domain rating score preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"]
  }
};

export default function BulkDrCheckerPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Bulk DR Checker",
    description,
    applicationCategory: "SEO Tool",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <SeoBulkTool tool="dr" />
      <DiscoverTools activeTool="bulk-dr" />

      <section className="content-section" aria-label="Bulk Domain Rating guide">
        <div className="content-wrap">
          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M3 3v18h18"></path>
                <path d="m19 9-5 5-4-4-3 3"></path>
              </svg>
              Bulk DR lookup
            </p>
            <h2>Check Domain Rating in bulk</h2>
            <p className="wide-copy">Use this bulk DR checker when you need to compare backlink strength across a list of websites. Paste domains or full URLs, remove duplicates automatically, and get Ahrefs Domain Rating scores in a clean table you can export.</p>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
              Use cases
            </p>
            <h2>When bulk DR checks help</h2>
            <div className="feature-grid">
              <article>
                <h3>Guest post prospecting</h3>
                <p>Screen a list of websites before spending time on outreach, pricing, or editorial review.</p>
              </article>
              <article>
                <h3>Competitor research</h3>
                <p>Compare multiple competitor domains and spot which sites have stronger backlink profiles.</p>
              </article>
              <article>
                <h3>Agency reporting</h3>
                <p>Export DR scores for client lists, prospect sheets, or quick SEO audits.</p>
              </article>
            </div>
          </section>

          <section className="copy-block split-block">
            <div>
              <p className="section-label">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                Better decisions
              </p>
              <h2>How to use bulk DR responsibly</h2>
            </div>
            <ul className="check-list">
              <li>Use DR as a first-pass backlink strength filter, not the only decision point.</li>
              <li>Review topical relevance, traffic signals, and content quality before outreach.</li>
              <li>Compare sites inside the same niche for a fairer benchmark.</li>
              <li>Export results and add notes for relevance, pricing, and editorial quality.</li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
