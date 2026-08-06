import type { Metadata } from "next";
import DiscoverTools from "../components/DiscoverTools";
import SeoBulkTool from "../components/SeoBulkTool";

export const metadata: Metadata = {
  title: "Free Domain Age Checker - Check Domain Age Of any Website",
  description:
    "Find the exact age of any domain in seconds. Use our free Domain Age Checker to view registration details, website age, and domain history for better SEO research.",
  alternates: { canonical: "https://dr-checker.com/domain-age-checker" },
  openGraph: {
    title: "Free Domain Age Checker - Check Domain Age Of any Website",
    description:
      "Find the exact age of any domain in seconds. Use our free Domain Age Checker to view registration details, website age, and domain history for better SEO research.",
    url: "https://dr-checker.com/domain-age-checker",
    siteName: "DR Checker",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Free Domain Age Checker - Check Domain Age Of any Website",
    description:
      "Find the exact age of any domain in seconds. Use our free Domain Age Checker to view registration details, website age, and domain history for better SEO research."
  }
};

export default function DomainAgePage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Domain Age Checker",
    description:
      "Find the exact age of any domain in seconds. Use our free Domain Age Checker to view registration details, website age, and domain history for better SEO research.",
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
      <SeoBulkTool tool="age" />
      <DiscoverTools activeTool="age" />
      <section className="content-section" aria-label="Domain Age guide">
        <div className="content-wrap">
          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M8 2v4M16 2v4M3 10h18"></path>
                <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                <path d="M12 14v3l2 1"></path>
              </svg>
              Domain age
            </p>
            <h2>What is domain age</h2>
            <p className="wide-copy">Domain age is the length of time that has passed since a domain was first registered. It&apos;s calculated from the domain&apos;s creation date on record with its registry, found through WHOIS or the newer RDAP protocol. Renewing a domain extends its expiry date, but it doesn&apos;t reset the original registration date, so the age keeps counting from when the domain first went live.</p>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M4 19V5"></path>
                <path d="M4 19h16"></path>
                <path d="m7 15 4-4 3 3 5-6"></path>
              </svg>
              SEO Context
            </p>
            <h2>Does domain age affect SEO rankings</h2>
            <p className="wide-copy">Google has said publicly that domain age by itself isn&apos;t a significant ranking factor. A brand new domain can outrank an older one if the content and relevance are stronger. Where domain age is actually useful is as a trust and context signal rather than a ranking lever. Older domains often, though not always, have had more time to accumulate backlinks and a track record, and that&apos;s what tends to help them rank, not the age itself.</p>
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
            <h2>Why domain age still matters</h2>
            <div className="feature-grid">
              <article>
                <h3>Buying an aged or expired domain</h3>
                <p>Confirm exactly how old a domain is and when it expires before you bid or buy.</p>
              </article>
              <article>
                <h3>Vetting a guest post or link opportunity</h3>
                <p>An established registration history is one more data point when deciding if a site is worth pursuing.</p>
              </article>
              <article>
                <h3>Checking email sending domains</h3>
                <p>Newly registered domains can trigger spam filters. Confirm a domain&apos;s age before running an outbound email campaign from it.</p>
              </article>
            </div>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12 7v14"></path>
                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
              </svg>
              Data Sources
            </p>
            <h2>WHOIS vs RDAP: how this tool gets its data</h2>
            <p className="wide-copy">WHOIS has been the standard way to look up domain registration details for decades, but the data format varies by registry and isn&apos;t always machine readable. RDAP is the newer protocol replacing it, returning structured, consistent data across registries. This tool queries RDAP first and falls back to WHOIS where needed, so you get accurate registration and expiry dates without digging through raw WHOIS text yourself.</p>
          </section>

          <section className="copy-block split-block">
            <div>
              <p className="section-label">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                Data Notes
              </p>
              <h2>Why WHOIS data can look off sometimes</h2>
            </div>
            <ul className="check-list">
              <li>Privacy or proxy registration services hide the registrant&apos;s personal details, but the creation date is normally still public.</li>
              <li>Some country code domains restrict how much WHOIS data they expose.</li>
              <li>A domain transfer between registrars can sometimes make a record look newer than the domain actually is. Always check the original creation date field, not just the updated date.</li>
            </ul>
          </section>

          <section className="copy-block faq-block" aria-labelledby="age-faq-title">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <path d="M12 17h.01"></path>
              </svg>
              FAQs
            </p>
            <h2 id="age-faq-title">Frequently asked questions</h2>
            <div className="faq-list">
              <details>
                <summary>Why does domain age matter for SEO?<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg></summary>
                <p>It doesn&apos;t directly affect rankings, but older domains often have more time to build backlinks and trust, and that does help.</p>
              </details>
              <details>
                <summary>Is domain age a direct Google ranking factor?<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg></summary>
                <p>No. Google has stated it isn&apos;t a significant factor on its own.</p>
              </details>
              <details>
                <summary>How accurate is this data?<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg></summary>
                <p>It&apos;s pulled live from WHOIS and RDAP registry records, the same source registrars themselves use.</p>
              </details>
              <details>
                <summary>Does this tool require signup?<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg></summary>
                <p>No login or account is needed.</p>
              </details>
              <details>
                <summary>What&apos;s the difference between registration date and domain age?<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg></summary>
                <p>Registration date is the fixed date a domain was first registered. Domain age is just the time that&apos;s passed since then, and it updates automatically.</p>
              </details>
              <details>
                <summary>Does renewing a domain reset its age?<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg></summary>
                <p>No. Renewing only extends the expiry date. The original registration date, and the domain&apos;s age, stays the same.</p>
              </details>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
