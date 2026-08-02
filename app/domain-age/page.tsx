import type { Metadata } from "next";
import DiscoverTools from "../components/DiscoverTools";
import SeoBulkTool from "../components/SeoBulkTool";

export const metadata: Metadata = {
  title: "Free Domain Age Checker — Check Domain Registration Age Instantly",
  description:
    "Check any domain's age for free using live WHOIS and RDAP data. See registration date, domain age, and expiry. No signup required.",
  alternates: { canonical: "https://dr-checker.com/domain-age" }
};

export default function DomainAgePage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Domain Age Checker",
    description:
      "Check any domain's age for free using live WHOIS and RDAP data. See registration date, domain age, and expiry. No signup required.",
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
            <p className="section-label">Domain age</p>
            <h2>What is domain age</h2>
            <p className="wide-copy">Domain age is the length of time that has passed since a domain was first registered. It&apos;s calculated from the domain&apos;s creation date on record with its registry, found through WHOIS or the newer RDAP protocol. Renewing a domain extends its expiry date, but it doesn&apos;t reset the original registration date, so the age keeps counting from when the domain first went live.</p>
          </section>

          <section className="copy-block">
            <p className="section-label">SEO Context</p>
            <h2>Does domain age affect SEO rankings</h2>
            <p className="wide-copy">Google has said publicly that domain age by itself isn&apos;t a significant ranking factor. A brand new domain can outrank an older one if the content and relevance are stronger. Where domain age is actually useful is as a trust and context signal rather than a ranking lever. Older domains often, though not always, have had more time to accumulate backlinks and a track record, and that&apos;s what tends to help them rank, not the age itself.</p>
          </section>

          <section className="copy-block">
            <p className="section-label">Use cases</p>
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
            <p className="section-label">Data Sources</p>
            <h2>WHOIS vs RDAP: how this tool gets its data</h2>
            <p className="wide-copy">WHOIS has been the standard way to look up domain registration details for decades, but the data format varies by registry and isn&apos;t always machine readable. RDAP is the newer protocol replacing it, returning structured, consistent data across registries. This tool queries RDAP first and falls back to WHOIS where needed, so you get accurate registration and expiry dates without digging through raw WHOIS text yourself.</p>
          </section>

          <section className="copy-block split-block">
            <div>
              <p className="section-label">Data Notes</p>
              <h2>Why WHOIS data can look off sometimes</h2>
            </div>
            <ul className="check-list">
              <li>Privacy or proxy registration services hide the registrant&apos;s personal details, but the creation date is normally still public.</li>
              <li>Some country code domains restrict how much WHOIS data they expose.</li>
              <li>A domain transfer between registrars can sometimes make a record look newer than the domain actually is. Always check the original creation date field, not just the updated date.</li>
            </ul>
          </section>

          <section className="copy-block faq-block" aria-labelledby="age-faq-title">
            <p className="section-label">FAQs</p>
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
