import type { Metadata } from "next";
import CheckerTool from "./components/CheckerTool";
import DiscoverTools from "./components/DiscoverTools";
import { absoluteUrl, breadcrumbSchema, faqSchema, softwareApplicationSchema } from "../lib/schema";

const homeTitle = "Domain Rating Checker - Free Ahrefs DR Checker";
const homeDescription =
  "Check Ahrefs Domain Rating for free. Compare backlink strength, qualify websites faster, and decide which domains deserve deeper SEO review.";
const homeOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "DR Checker domain rating score preview"
};

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: "https://dr-checker.com/" },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "https://dr-checker.com",
    siteName: "DR Checker",
    locale: "en_US",
    type: "website",
    images: [homeOgImage]
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [homeOgImage.url]
  },
  robots: {
    index: true,
    follow: true
  }
};

const faqs = [
  {
    question: "What is a good DR score?",
    answer: "A DR above 50 is usually strong, but the right benchmark depends on your niche and competitors."
  },
  {
    question: "Is DR the same as Google rating?",
    answer: "No. DR is an Ahrefs metric. Google does not use Ahrefs DR directly in rankings."
  },
  {
    question: "Can a low DR website rank well?",
    answer: "Yes. Strong content, search intent match, topical relevance, and page-level links can help lower-DR sites rank."
  },
  {
    question: "Does this tool require an Ahrefs account?",
    answer: "No user Ahrefs account is required. DR Checker uses a server-side Ahrefs APIv3 key to fetch Domain Rating data."
  }
];

export default function HomePage() {
  const schemas = [
    softwareApplicationSchema({
      name: "Domain Rating Checker",
      description: homeDescription,
      url: absoluteUrl("/"),
      features: [
        "Free Ahrefs Domain Rating lookup",
        "Domain and URL cleanup",
        "Domain Rating explanation",
        "Mobile-friendly SEO tool"
      ]
    }),
    faqSchema(faqs),
    breadcrumbSchema([{ name: "Domain Rating Checker", url: absoluteUrl("/") }])
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
      <CheckerTool />
      <DiscoverTools activeTool="dr" />

      <section className="content-section" aria-label="Domain Rating guide">
        <div className="content-wrap">
          <section className="copy-block answer-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M20 7 9 18l-5-5"></path>
              </svg>
              Quick answer
            </p>
            <h2>Check Domain Rating with Ahrefs data</h2>
            <p className="wide-copy">A Domain Rating checker gives you a fast 0 to 100 backlink-strength signal for any domain. The score is useful for competitor research, guest post screening, and outreach prioritization, but it should be paired with relevance, traffic, editorial quality, and the page where a link would appear.</p>
            <div className="answer-grid" aria-label="Domain Rating quick facts">
              <article>
                <span>Measures</span>
                <strong>Backlink profile strength</strong>
                <p>DR estimates domain-level link strength, not content quality or guaranteed ranking ability.</p>
              </article>
              <article>
                <span>Best use</span>
                <strong>Fast SEO triage</strong>
                <p>Use it to decide which domains deserve deeper backlink, traffic, and relevance review.</p>
              </article>
              <article>
                <span>Data source</span>
                <strong>Ahrefs DR API</strong>
                <p>The lookup uses Ahrefs Domain Rating data through DR Checker&apos;s server-side API key.</p>
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
            <h2>Use DR for smarter SEO decisions</h2>
            <div className="feature-grid">
              <article>
                <h3>Benchmark competitors</h3>
                <p>Check your domain beside competitors before you spend time reviewing backlinks, rankings, or content gaps.</p>
              </article>
              <article>
                <h3>Screen guest post sites</h3>
                <p>Use DR as a first-pass filter before negotiating price, writing a pitch, or reviewing placement quality.</p>
              </article>
              <article>
                <h3>Track authority growth</h3>
                <p>Record the score monthly so changes in link strength are easier to explain in reports and planning.</p>
              </article>
            </div>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
              Search intent map
            </p>
            <h2>Choose the right DR benchmark</h2>
            <p className="wide-copy">Most people searching for a domain rating checker are not just curious about a number. They want to decide whether a website is strong enough to pitch, compare, audit, buy, or report on. Use the score differently depending on the job.</p>
            <div className="intent-grid">
              <article className="intent-card">
                <span>Outreach</span>
                <h3>Can I pitch this site?</h3>
                <p>Keep the domain only if DR, topical fit, recent publishing quality, and outbound link patterns all look reasonable.</p>
              </article>
              <article className="intent-card">
                <span>Competitors</span>
                <h3>How strong are they?</h3>
                <p>Compare direct competitors in the same niche, then review their best linked pages instead of stopping at domain-level DR.</p>
              </article>
              <article className="intent-card">
                <span>Reporting</span>
                <h3>Did authority improve?</h3>
                <p>Record DR monthly with notes about earned links, lost links, redirects, and major content updates.</p>
              </article>
              <article className="intent-card">
                <span>Due diligence</span>
                <h3>Is the score trustworthy?</h3>
                <p>Check whether the domain has relevant real pages, organic visibility, and a clean link history before trusting a high number.</p>
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
              Decision guide
            </p>
            <h2>Judge backlink strength with context</h2>
            <div className="responsive-table decision-table">
              <table>
                <thead>
                  <tr>
                    <th>DR range</th>
                    <th>What it usually means</th>
                    <th>Best next step</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0 to 29</td>
                    <td>New, weak, or barely visible backlink profile.</td>
                    <td>Review relevance first, then focus on earning a few real editorial links.</td>
                  </tr>
                  <tr>
                    <td>30 to 49</td>
                    <td>Some authority, often common for growing niche sites.</td>
                    <td>Compare with direct competitors and inspect link quality before outreach.</td>
                  </tr>
                  <tr>
                    <td>50 to 69</td>
                    <td>Strong enough to compete in many markets.</td>
                    <td>Check traffic, topic fit, and page quality before treating it as a strong opportunity.</td>
                  </tr>
                  <tr>
                    <td>70 to 100</td>
                    <td>Very strong backlink profile or major brand authority.</td>
                    <td>Do not skip manual review. High DR still needs relevance and editorial trust.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M9 11 12 14 22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
              Review workflow
            </p>
            <h2>Domain Rating review workflow</h2>
            <div className="workflow-grid">
              <article className="workflow-card">
                <span>Step 1</span>
                <h3>Check the exact root domain</h3>
                <p>Paste the domain or URL, then confirm the normalized domain is the one you meant to evaluate. This prevents judging a prospect by a subdomain, redirect, or tracking URL.</p>
              </article>
              <article className="workflow-card">
                <span>Step 2</span>
                <h3>Compare only relevant alternatives</h3>
                <p>A DR 42 domain can be strong in a narrow niche and weak in another. Compare against direct search competitors, not giant publishers that are outside your market.</p>
              </article>
              <article className="workflow-card">
                <span>Step 3</span>
                <h3>Inspect the pages earning links</h3>
                <p>Good DR should come from useful resources, brand mentions, tools, studies, or editorial coverage. Be careful when the link profile is mostly unrelated placements.</p>
              </article>
              <article className="workflow-card">
                <span>Step 4</span>
                <h3>Make a yes, no, or review-later decision</h3>
                <p>Use DR to speed up triage, then let relevance, traffic, page quality, and business fit decide the final action.</p>
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
                Benefits
              </p>
              <h2>What you get from this DR checker</h2>
            </div>
            <ul className="check-list">
              <li>One simple field for a full URL, root domain, or www version.</li>
              <li>A live Ahrefs Domain Rating score on the familiar 0 to 100 scale.</li>
              <li>A quick rating label so non-technical teammates can understand the result.</li>
              <li>Clear limits: DR measures backlink strength, not guaranteed rankings or traffic.</li>
            </ul>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
              </svg>
              How it works
            </p>
            <h2>How the Ahrefs DR lookup works</h2>
            <div className="steps">
              <article>
                <span>1</span>
                <h3>Paste any website</h3>
                <p>Enter a domain such as example.com or paste a full page URL from your prospect list.</p>
              </article>
              <article>
                <span>2</span>
                <h3>Normalize the domain</h3>
                <p>DR Checker removes protocol, paths, query strings, and extra formatting before the API call.</p>
              </article>
              <article>
                <span>3</span>
                <h3>Review the score</h3>
                <p>The backend requests Ahrefs Domain Rating data and returns the score with practical interpretation.</p>
              </article>
            </div>
          </section>

          <section className="copy-block split-block">
            <div>
              <p className="section-label">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M16 7h6v6"></path>
                  <path d="m22 7-8.5 8.5-5-5L2 17"></path>
                </svg>
                Tips
              </p>
              <h2>Improve Domain Rating safely</h2>
            </div>
            <div className="tip-list">
              <p><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Earn links from relevant sites that already publish for the audience you want to reach.</p>
              <p><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Create assets people can cite, such as original data, calculators, templates, and detailed how-to guides.</p>
              <p><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Recover lost link value by fixing broken pages, redirect chains, and outdated linked content.</p>
              <p><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Avoid irrelevant paid links, expired-domain networks, and placements that only look good because of a high score.</p>
            </div>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12 7v14"></path>
                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
              </svg>
              Understanding domain rating
            </p>
            <h2>What Domain Rating means</h2>
            <p className="wide-copy">Domain Rating is an Ahrefs metric that estimates the strength of a website&apos;s backlink profile on a 0 to 100 scale. A higher DR usually means the domain has stronger links, but DR is not a Google ranking factor and it does not measure content quality. Use it with relevance, organic traffic, search intent, and manual review.</p>
            <div className="callout-panel">
              <div>
                <h3>Keyword targets</h3>
                <p>These phrases match the user jobs behind a free DR checker page, so the copy covers both the tool action and the follow-up decision.</p>
              </div>
              <ul className="mini-metric-list">
                <li><strong>domain rating checker</strong><span>Primary tool query for checking a single domain&apos;s Ahrefs DR.</span></li>
                <li><strong>dr checker</strong><span>Short-form query from users who already know the metric.</span></li>
                <li><strong>check domain rating</strong><span>Action-led query that needs quick input, result interpretation, and next steps.</span></li>
              </ul>
            </div>
          </section>

          <section className="copy-block faq-block" aria-labelledby="faq-title">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <path d="M12 17h.01"></path>
              </svg>
              FAQs
            </p>
            <h2 id="faq-title">Frequently asked questions</h2>
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
