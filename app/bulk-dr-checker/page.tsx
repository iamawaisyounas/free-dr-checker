import type { Metadata } from "next";
import DiscoverTools from "../components/DiscoverTools";
import SeoBulkTool from "../components/SeoBulkTool";
import { absoluteUrl, breadcrumbSchema, faqSchema, softwareApplicationSchema } from "../../lib/schema";

const title = "Bulk DR Checker - Check Ahrefs DR for Multiple Domains";
const description =
  "Check Ahrefs Domain Rating for up to 100 domains at once. Clean prospect lists, compare backlink strength, and export bulk DR results to CSV.";

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

const faqs = [
  {
    question: "How many domains can I check at once?",
    answer: "You can check up to 100 domains or URLs in one bulk DR lookup, then export the results to CSV."
  },
  {
    question: "Does the bulk DR checker remove duplicate domains?",
    answer: "Yes. The tool cleans each entry, removes duplicates, and checks the unique domains that remain."
  },
  {
    question: "Should I use bulk DR as my only outreach filter?",
    answer: "No. Use bulk DR as a first-pass screen, then review topical relevance, traffic signals, editorial quality, and page fit."
  },
  {
    question: "Can I export bulk Domain Rating results?",
    answer: "Yes. After the check finishes, you can export the table to CSV for prospect sheets, audits, or client reporting."
  }
];

export default function BulkDrCheckerPage() {
  const schemas = [
    softwareApplicationSchema({
      name: "Bulk DR Checker",
      description,
      url: absoluteUrl("/bulk-dr-checker"),
      features: [
        "Bulk Ahrefs Domain Rating checks",
        "Duplicate domain cleanup",
        "CSV export",
        "Mobile-friendly results table"
      ]
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Domain Rating Checker", url: absoluteUrl("/") },
      { name: "Bulk DR Checker", url: absoluteUrl("/bulk-dr-checker") }
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
      <SeoBulkTool tool="dr" />

      <section className="content-section" aria-label="Bulk Domain Rating guide">
        <div className="content-wrap">
          <section className="copy-block answer-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M8 6h13M8 12h13M8 18h13"></path>
                <path d="M3 6h.01M3 12h.01M3 18h.01"></path>
              </svg>
              Quick answer
            </p>
            <h2>Use bulk DR checks to shrink messy prospect lists before manual review</h2>
            <p className="wide-copy">A bulk DR checker helps you check many websites at once, clean duplicate entries, and export a working CSV. It is best for triage: remove obviously weak or irrelevant domains first, then manually review the sites that still look promising.</p>
            <div className="answer-grid" aria-label="Bulk DR quick facts">
              <article>
                <span>Limit</span>
                <strong>Up to 100 domains</strong>
                <p>Paste one domain per line or mix full URLs, commas, and spaces.</p>
              </article>
              <article>
                <span>Output</span>
                <strong>CSV-ready DR scores</strong>
                <p>Export Domain Rating, source, license, and status for your sheet.</p>
              </article>
              <article>
                <span>Best use</span>
                <strong>Outreach triage</strong>
                <p>Prioritize the domains that deserve manual relevance and quality review.</p>
              </article>
            </div>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M3 3v18h18"></path>
                <path d="m19 9-5 5-4-4-3 3"></path>
              </svg>
              Bulk DR lookup
            </p>
            <h2>Check Domain Rating in bulk without cleaning the list first</h2>
            <p className="wide-copy">A bulk DR checker is useful when your prospect sheet has dozens of websites and you need a fast authority screen. Paste domains or full URLs, let the tool remove duplicates, and export Ahrefs Domain Rating scores you can add back to your outreach, audit, or competitor research workflow.</p>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M9 3H5a2 2 0 0 0-2 2v4"></path>
                <path d="M15 3h4a2 2 0 0 1 2 2v4"></path>
                <path d="M9 21H5a2 2 0 0 1-2-2v-4"></path>
                <path d="M15 21h4a2 2 0 0 0 2-2v-4"></path>
                <path d="M8 12h8"></path>
              </svg>
              List cleanup flow
            </p>
            <h2>Turn a messy prospect list into a scored outreach sheet</h2>
            <div className="workflow-grid">
              <article className="workflow-card">
                <span>Input</span>
                <h3>Paste domains, URLs, or mixed rows</h3>
                <p>Bulk checks work best when you can paste raw exports from Sheets, CRMs, Ahrefs, Google Search, or prospecting tools without cleaning every row first.</p>
              </article>
              <article className="workflow-card">
                <span>Normalize</span>
                <h3>Collapse duplicates before checking</h3>
                <p>The page cleans protocols, paths, and repeated domains so you do not waste time comparing the same website several times.</p>
              </article>
              <article className="workflow-card">
                <span>Segment</span>
                <h3>Sort by DR and relevance tier</h3>
                <p>Use high, medium, and low DR buckets as review queues. Keep niche-relevant domains visible even if they are not the highest-scoring entries.</p>
              </article>
              <article className="workflow-card">
                <span>Export</span>
                <h3>Move the result into your working process</h3>
                <p>Download CSV results for outreach qualification, client reporting, link gap review, or a manual editorial-quality checklist.</p>
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
              Review matrix
            </p>
            <h2>What to do after exporting bulk DR results</h2>
            <div className="responsive-table decision-table">
              <table>
                <thead>
                  <tr>
                    <th>List segment</th>
                    <th>What to check next</th>
                    <th>Decision rule</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>High DR, relevant niche</td>
                    <td>Recent posts, author standards, outbound links, and traffic quality.</td>
                    <td>Keep if the site would make sense even without the score.</td>
                  </tr>
                  <tr>
                    <td>High DR, mixed topics</td>
                    <td>Publication pattern, sponsored content volume, and link placement quality.</td>
                    <td>Review carefully. High DR cannot fix a weak editorial environment.</td>
                  </tr>
                  <tr>
                    <td>Mid DR, strong relevance</td>
                    <td>Audience fit, ranking pages, and whether the editor covers your topic well.</td>
                    <td>Often worth keeping for outreach because relevance can beat vanity metrics.</td>
                  </tr>
                  <tr>
                    <td>Low DR, no topical fit</td>
                    <td>Only check further if there is a strong relationship or brand reason.</td>
                    <td>Usually remove from the active prospect list.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
              Bulk query coverage
            </p>
            <h2>What bulk DR searchers usually need after the score</h2>
            <div className="keyword-map">
              <article className="keyword-card">
                <span>bulk dr checker</span>
                <h3>Fast multi-domain scoring</h3>
                <p>Answer the core query with a visible tool, clear limits, and CSV export so the user can process many domains in one session.</p>
              </article>
              <article className="keyword-card">
                <span>bulk domain rating checker</span>
                <h3>Ahrefs-style authority context</h3>
                <p>Explain that DR is a backlink-strength metric and should be paired with relevance, traffic, and link placement checks.</p>
              </article>
              <article className="keyword-card">
                <span>bulk website authority checker</span>
                <h3>List prioritization</h3>
                <p>Help users convert scores into keep, review, remove, and follow-up buckets instead of exporting a number with no guidance.</p>
              </article>
            </div>
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
            <h2>When bulk DR checks save the most time</h2>
            <div className="feature-grid">
              <article>
                <h3>Guest post prospecting</h3>
                <p>Sort a long list before you spend time checking pricing, author quality, or placement rules.</p>
              </article>
              <article>
                <h3>Competitor research</h3>
                <p>Compare competing domains on the same day so backlink-strength gaps are easier to explain.</p>
              </article>
              <article>
                <h3>Agency reporting</h3>
                <p>Export a clean CSV for client audits, link gap reviews, and campaign planning sheets.</p>
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
              <li>Use the exported DR score as a first-pass filter, not an automatic yes or no.</li>
              <li>Keep relevant mid-DR websites when they have real readers and editorial standards.</li>
              <li>Remove high-DR sites that publish unrelated topics, thin posts, or unnatural outbound links.</li>
              <li>Add manual notes for relevance, traffic, page quality, pricing, and outreach fit.</li>
            </ul>
          </section>

          <section className="copy-block faq-block" aria-labelledby="bulk-faq-title">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <path d="M12 17h.01"></path>
              </svg>
              FAQs
            </p>
            <h2 id="bulk-faq-title">Frequently asked questions</h2>
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
      <DiscoverTools activeTool="bulk-dr" />
    </main>
  );
}
