import type { Metadata } from "next";
import DiscoverTools from "../components/DiscoverTools";
import SeoBulkTool from "../components/SeoBulkTool";
import { absoluteUrl, breadcrumbSchema, faqSchema, softwareApplicationSchema } from "../../lib/schema";

export const metadata: Metadata = {
  title: "Free Domain Authority Checker Online | DR Checker",
  description:
    "Check an authority-style score for any website with our free Domain Authority Checker. Compare domains, review link strength, and add context beside Ahrefs DR.",
  alternates: { canonical: "https://dr-checker.com/domain-authority-checker" },
  openGraph: {
    title: "Free Domain Authority Checker Online | DR Checker",
    description:
      "Check an authority-style score for any website with our free Domain Authority Checker. Compare domains, review link strength, and add context beside Ahrefs DR.",
    url: "https://dr-checker.com/domain-authority-checker",
    siteName: "DR Checker",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Free Domain Authority Checker Online | DR Checker",
    description:
      "Check an authority-style score for any website with our free Domain Authority Checker. Compare domains, review link strength, and add context beside Ahrefs DR."
  }
};

const faqs = [
  {
    question: "What is a good DA score?",
    answer: "Anything above 50 is generally considered strong, but the right benchmark depends on your niche and who you are competing against."
  },
  {
    question: "Is this the same as Moz's official Domain Authority?",
    answer: "No. This is an independent 0 to 100 score built on open link graph data, not Moz's algorithm. Use it as a comparison metric, not an official DA lookup."
  },
  {
    question: "Is DA a Google ranking factor?",
    answer: "No. Authority scores are third-party metrics. Google does not use them directly in rankings."
  },
  {
    question: "Can a low DA site still rank well?",
    answer: "Yes. Strong content, search intent match, and page-level relevance can help lower authority sites rank."
  },
  {
    question: "Do I need an account to check DA?",
    answer: "No signup or login is required."
  },
  {
    question: "How often is the score updated?",
    answer: "Results are cached for 30 days per domain, so checking the same domain again soon after may return a cached score."
  }
];

export default function AuthorityScorePage() {
  const schemas = [
    softwareApplicationSchema({
      name: "Domain Authority Checker",
      description:
        "Check an authority-style score for any website with our free Domain Authority Checker. Compare domains, review link strength, and add context beside Ahrefs DR.",
      url: absoluteUrl("/domain-authority-checker"),
      features: [
        "Free authority-style score lookup",
        "OpenPageRank-powered authority data",
        "Bulk domain support",
        "CSV export"
      ]
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Domain Rating Checker", url: absoluteUrl("/") },
      { name: "Domain Authority Checker", url: absoluteUrl("/domain-authority-checker") }
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
      <SeoBulkTool tool="authority" />
      <DiscoverTools activeTool="authority" />
      <section className="content-section" aria-label="Domain Authority guide">
        <div className="content-wrap">
          <section className="copy-block answer-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                <path d="m12 14 4-4"></path>
              </svg>
              Quick answer
            </p>
            <h2>Check authority with context</h2>
            <p className="wide-copy">DR Checker&apos;s Domain Authority tool gives an independent 0 to 100 authority-style score from OpenPageRank data. It helps you compare domains quickly, but it should be read beside Ahrefs DR, referring domains, topical relevance, and manual backlink review.</p>
            <div className="answer-grid" aria-label="Domain Authority quick facts">
              <article>
                <span>Measures</span>
                <strong>Authority-style link strength</strong>
                <p>The score reflects open link graph signals, not Google&apos;s ranking system.</p>
              </article>
              <article>
                <span>Use with</span>
                <strong>Ahrefs DR</strong>
                <p>Check both metrics separately to understand how different datasets see a domain.</p>
              </article>
              <article>
                <span>Best for</span>
                <strong>Comparison research</strong>
                <p>Compare competitors, guest post targets, and domains before deeper review.</p>
              </article>
            </div>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                <path d="m12 14 4-4"></path>
                <path d="M12 19h.01"></path>
              </svg>
              Domain Authority
            </p>
            <h2>What this checker measures</h2>
            <p className="wide-copy">This Domain Authority checker returns an independent authority-style score on a 0 to 100 scale. It uses OpenPageRank&apos;s open link graph data rather than Moz&apos;s proprietary Domain Authority algorithm, so treat it as a comparison signal, not an official Moz DA lookup or a Google ranking factor.</p>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12 3v18"></path>
                <path d="M3 12h18"></path>
              </svg>
              Intent match
            </p>
            <h2>DA checker intent</h2>
            <p className="wide-copy">Some users want Moz DA specifically, while others want any quick website authority score. This page is built for the second need: a free authority-style comparison score with clear limits and links to Ahrefs DR when that metric is the better fit.</p>
            <div className="intent-grid">
              <article className="intent-card">
                <span>DA checker</span>
                <h3>Quick authority estimate</h3>
                <p>Give users a fast 0 to 100 comparison score without requiring an account or a paid suite.</p>
              </article>
              <article className="intent-card">
                <span>DA vs DR</span>
                <h3>Metric clarification</h3>
                <p>Explain that DA-style scores and Ahrefs DR are separate authority signals from different data sources.</p>
              </article>
              <article className="intent-card">
                <span>Prospecting</span>
                <h3>Website screening</h3>
                <p>Help link builders decide which sites deserve manual review based on authority plus relevance.</p>
              </article>
              <article className="intent-card">
                <span>Reporting</span>
                <h3>Client-friendly context</h3>
                <p>Give non-technical readers a simple score, then warn them not to treat it as Google&apos;s opinion.</p>
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
              Comparison guide
            </p>
            <h2>DA, DR, or both?</h2>
            <div className="responsive-table decision-table">
              <table>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Best use</th>
                    <th>Important limit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Domain Authority score</td>
                    <td>Independent authority comparison from OpenPageRank link data.</td>
                    <td>It is not Moz Domain Authority and should not be presented as Moz DA.</td>
                  </tr>
                  <tr>
                    <td>Ahrefs Domain Rating</td>
                    <td>Backlink-strength checks in Ahrefs-based SEO workflows.</td>
                    <td>DR is a third-party metric, not a direct Google ranking factor.</td>
                  </tr>
                  <tr>
                    <td>Both together</td>
                    <td>Cross-checking whether a domain looks strong across different link datasets.</td>
                    <td>Do not average them. Keep each metric separate in reports.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M6 3h12l4 6-10 12L2 9z"></path>
                <path d="M11 3 8 9l4 12 4-12-3-6"></path>
              </svg>
              Authority checklist
            </p>
            <h2>Check quality signals</h2>
            <div className="audit-grid">
              <article className="audit-card">
                <span>Links</span>
                <h3>Are referring sites relevant?</h3>
                <p>A strong score is more useful when the domain earns links from pages in its actual topic area.</p>
              </article>
              <article className="audit-card">
                <span>Traffic</span>
                <h3>Does the site have real search visibility?</h3>
                <p>Authority without rankings or real pages can signal a domain that looks better in tools than it is for users.</p>
              </article>
              <article className="audit-card">
                <span>Editorial</span>
                <h3>Would you trust the publishing pattern?</h3>
                <p>Review recent posts, author quality, outbound links, topic focus, and whether sponsored content dominates the site.</p>
              </article>
            </div>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12 20V10"></path>
                <path d="M18 20V4"></path>
                <path d="M6 20v-4"></path>
              </svg>
              Score Guide
            </p>
            <h2>Read your score</h2>
            <ul className="check-list score-guide-list">
              <li><strong>0 to 20:</strong> New or very low authority. Common for brand new sites or ones with very few backlinks.</li>
              <li><strong>21 to 40:</strong> Developing. The domain has started attracting links but isn&apos;t established yet.</li>
              <li><strong>41 to 60:</strong> Established. A reasonably solid link profile, typical of active niche sites.</li>
              <li><strong>61 to 80:</strong> Strong. Sites that compete well for backlinks in their space.</li>
              <li><strong>81 to 100:</strong> Very strong. Usually large, well known sites with a long link history.</li>
            </ul>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
                <path d="M17 17H7V7"></path>
              </svg>
              Compare Metrics
            </p>
            <h2>Domain Authority vs Domain Rating</h2>
            <p className="wide-copy">Domain Authority and Domain Rating both estimate website authority, but they come from different data sources. Domain Rating is Ahrefs&apos; backlink-strength metric. This page shows an OpenPageRank-based authority score. Neither score is used by Google directly, so compare each metric against itself and use both as context before deeper SEO review.</p>
          </section>

          <section className="copy-block split-block">
            <div>
              <p className="section-label">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                Ranking Signals
              </p>
              <h2>What affects the score</h2>
            </div>
            <ul className="check-list">
              <li>The number and quality of referring domains found in the link graph.</li>
              <li>The strength and relevance of sites linking to the checked domain.</li>
              <li>Weak, spammy, or unrelated links that make an authority score less useful.</li>
              <li>How consistently the domain has earned natural links over time.</li>
            </ul>
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
            <h2>Best DA use cases</h2>
            <div className="feature-grid">
              <article>
                <h3>Competitor research</h3>
                <p>See how a competitor&apos;s authority stacks up before you study their content or backlink strategy.</p>
              </article>
              <article>
                <h3>Link building and guest posts</h3>
                <p>Screen a site&apos;s authority before spending time on outreach or paying for a placement.</p>
              </article>
              <article>
                <h3>Buying or auditing domains</h3>
                <p>Get a quick read on a domain&apos;s link strength before you buy it, or track your own progress over time.</p>
              </article>
            </div>
          </section>

          <section className="copy-block split-block">
            <div>
              <p className="section-label">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m15 9-6 6"></path>
                  <path d="m9 9 6 6"></path>
                </svg>
                Common Mistakes
              </p>
              <h2>Common DA mistakes</h2>
            </div>
            <ul className="check-list">
              <li>Treating it as a Google ranking factor. It isn&apos;t used directly.</li>
              <li>Comparing scores across completely different niches, where average authority varies a lot.</li>
              <li>Chasing a higher number instead of relevant, quality links.</li>
              <li>Assuming scores will match across tools. Different providers calculate authority differently, so numbers won&apos;t always agree.</li>
            </ul>
          </section>

          <section className="copy-block faq-block" aria-labelledby="authority-faq-title">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <path d="M12 17h.01"></path>
              </svg>
              FAQs
            </p>
            <h2 id="authority-faq-title">Frequently asked questions</h2>
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
    </main>
  );
}
