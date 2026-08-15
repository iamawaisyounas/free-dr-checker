import type { Metadata } from "next";
import DiscoverTools from "../components/DiscoverTools";
import SeoBulkTool from "../components/SeoBulkTool";
import { absoluteUrl, breadcrumbSchema, faqSchema, softwareApplicationSchema } from "../../lib/schema";

export const metadata: Metadata = {
  title: "Free Domain Age Checker - Check Domain Age Of any Website",
  description:
    "Find the age of any domain in seconds. Check registration date, expiry date, and WHOIS/RDAP history for SEO research, outreach, and domain reviews.",
  alternates: { canonical: "https://dr-checker.com/domain-age-checker" },
  openGraph: {
    title: "Free Domain Age Checker - Check Domain Age Of any Website",
    description:
      "Find the age of any domain in seconds. Check registration date, expiry date, and WHOIS/RDAP history for SEO research, outreach, and domain reviews.",
    url: "https://dr-checker.com/domain-age-checker",
    siteName: "DR Checker",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Free Domain Age Checker - Check Domain Age Of any Website",
    description:
      "Find the age of any domain in seconds. Check registration date, expiry date, and WHOIS/RDAP history for SEO research, outreach, and domain reviews."
  }
};

const faqs = [
  {
    question: "Why does domain age matter for SEO?",
    answer: "Domain age does not directly affect rankings, but older domains often have more time to build backlinks, brand signals, and trust."
  },
  {
    question: "Is domain age a direct Google ranking factor?",
    answer: "No. Google has said domain age by itself is not a significant ranking factor."
  },
  {
    question: "How accurate is this domain age data?",
    answer: "The tool pulls registration data from WHOIS and RDAP registry records, which are the public sources registrars use."
  },
  {
    question: "Does this tool require signup?",
    answer: "No. You can check domain age without creating an account."
  },
  {
    question: "What is the difference between registration date and domain age?",
    answer: "Registration date is the fixed date a domain was first registered. Domain age is the time that has passed since that date."
  },
  {
    question: "Does renewing a domain reset its age?",
    answer: "No. Renewing only extends the expiry date. The original registration date and domain age stay the same."
  }
];

export default function DomainAgePage() {
  const schemas = [
    softwareApplicationSchema({
      name: "Domain Age Checker",
      description:
        "Find the age of any domain in seconds. Check registration date, expiry date, and WHOIS/RDAP history for SEO research, outreach, and domain reviews.",
      url: absoluteUrl("/domain-age-checker"),
      features: [
        "Domain registration date lookup",
        "WHOIS and RDAP checks",
        "Domain expiry context",
        "Bulk domain support"
      ]
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Domain Rating Checker", url: absoluteUrl("/") },
      { name: "Domain Age Checker", url: absoluteUrl("/domain-age-checker") }
    ])
  ];

  return (
    <main>
      {schemas.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <SeoBulkTool tool="age" />
      <section className="content-section" aria-label="Domain Age guide">
        <div className="content-wrap">
          <section className="copy-block answer-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M8 2v4M16 2v4M3 10h18"></path>
                <rect x="3" y="4" width="18" height="18" rx="2"></rect>
              </svg>
              Quick answer
            </p>
            <h2>Use domain age to add history context, not to predict rankings by itself</h2>
            <p className="wide-copy">A domain age checker shows when a domain was first registered and when it expires. That history helps with expired-domain reviews, link prospecting, and email-domain checks, but age alone does not prove SEO strength.</p>
            <div className="answer-grid" aria-label="Domain age quick facts">
              <article>
                <span>Measures</span>
                <strong>Registration history</strong>
                <p>Age is based on public registry creation dates from WHOIS and RDAP.</p>
              </article>
              <article>
                <span>Use with</span>
                <strong>DR and quality checks</strong>
                <p>Pair age with backlinks, relevance, content quality, and ownership history.</p>
              </article>
              <article>
                <span>Best for</span>
                <strong>Due diligence</strong>
                <p>Review domains before outreach, acquisition, redirects, or sender setup.</p>
              </article>
            </div>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M8 2v4M16 2v4M3 10h18"></path>
                <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                <path d="M12 14v3l2 1"></path>
              </svg>
              Domain age
            </p>
            <h2>What domain age means</h2>
            <p className="wide-copy">Domain age is the time that has passed since a domain was first registered. DR Checker reads the creation date from public WHOIS and RDAP registry records, then shows the age, registration date, expiry date, and registrar details when available. Renewing a domain extends the expiry date, but it does not reset the original registration date.</p>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M4 19V5"></path>
                <path d="M4 19h16"></path>
                <path d="M8 15h2"></path>
                <path d="M12 11h2"></path>
                <path d="M16 7h2"></path>
              </svg>
              Query guide
            </p>
            <h2>Use domain age differently for SEO, buying, and outreach checks</h2>
            <div className="intent-grid">
              <article className="intent-card">
                <span>SEO</span>
                <h3>Is an older domain stronger?</h3>
                <p>Age gives you history to inspect, but rankings still depend on content, links, technical quality, and intent match.</p>
              </article>
              <article className="intent-card">
                <span>Buying</span>
                <h3>Is this aged domain safe?</h3>
                <p>Check creation date, expiry, redirects, past content, and whether the old backlink profile matches your future topic.</p>
              </article>
              <article className="intent-card">
                <span>Outreach</span>
                <h3>Is the site established?</h3>
                <p>Combine age with DR, publishing history, contact credibility, and editorial standards before pitching.</p>
              </article>
              <article className="intent-card">
                <span>Email</span>
                <h3>Is the sending domain too new?</h3>
                <p>Very new domains may need slower warmup and cleaner DNS before cold outreach campaigns.</p>
              </article>
            </div>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M4 5h16"></path>
                <path d="M4 12h16"></path>
                <path d="M4 19h16"></path>
              </svg>
              Review guide
            </p>
            <h2>How to use domain age in real SEO checks</h2>
            <div className="responsive-table decision-table">
              <table>
                <thead>
                  <tr>
                    <th>Scenario</th>
                    <th>What age tells you</th>
                    <th>What to verify next</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Expired domain purchase</td>
                    <td>Whether the registration history is old enough to inspect.</td>
                    <td>Backlink quality, historical content, redirects, and brand risk.</td>
                  </tr>
                  <tr>
                    <td>Guest post prospect</td>
                    <td>Whether the site has a longer public footprint.</td>
                    <td>Current topics, editorial quality, traffic, and outbound link patterns.</td>
                  </tr>
                  <tr>
                    <td>Email sending domain</td>
                    <td>Whether the domain is very new and may need warming.</td>
                    <td>DNS setup, sender reputation, content quality, and sending volume.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M6 3v18"></path>
                <path d="M18 3v18"></path>
                <path d="M6 8h12"></path>
                <path d="M6 16h12"></path>
              </svg>
              Age vs website age
            </p>
            <h2>Domain age and website age are not always the same thing</h2>
            <div className="comparison-grid">
              <article className="comparison-card">
                <span>Domain age</span>
                <h3>Registration history</h3>
                <p>A domain can be 10 years old even if the current website launched last month. Domain age follows the registration record, not the current design or content.</p>
              </article>
              <article className="comparison-card">
                <span>Website age</span>
                <h3>Public content history</h3>
                <p>Website age depends on when useful pages were published, indexed, archived, and linked. Use web archives and content history for this review.</p>
              </article>
              <article className="comparison-card">
                <span>Ownership changes</span>
                <h3>Risk context</h3>
                <p>A domain can keep its original creation date after a sale. Always check whether the topic, owner, redirects, or language changed sharply.</p>
              </article>
              <article className="comparison-card">
                <span>Expiry date</span>
                <h3>Operational signal</h3>
                <p>Expiry does not measure age, but it helps buyers and site owners confirm whether a domain is maintained or close to lapsing.</p>
              </article>
            </div>
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
            <p className="wide-copy">Domain age by itself is not a meaningful SEO shortcut. A newer domain can outrank an older one when the content, links, and search intent match are stronger. Domain age is still useful as context because older domains often have more history to review, including backlinks, ownership changes, expired content, redirects, and reputation signals.</p>
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
                <p>Confirm the registration date and expiry date before you bid, buy, redirect, or rebuild.</p>
              </article>
              <article>
                <h3>Vetting a guest post or link opportunity</h3>
                <p>Add registration history beside DR, relevance, traffic, and editorial quality before outreach.</p>
              </article>
              <article>
                <h3>Checking email sending domains</h3>
                <p>Very new domains can look risky in outreach systems. Check age before sending campaigns from them.</p>
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
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </section>
      <DiscoverTools activeTool="age" />
    </main>
  );
}
