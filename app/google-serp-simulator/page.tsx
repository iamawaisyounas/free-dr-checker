import type { Metadata } from "next";
import DiscoverTools from "../components/DiscoverTools";
import SerpSimulatorTool from "../components/SerpSimulatorTool";
import { absoluteUrl, breadcrumbSchema, faqSchema, softwareApplicationSchema } from "../../lib/schema";

const title = "Google SERP Simulator - Free Snippet Preview Tool";
const description =
  "Preview your Google search snippet before publishing. Test title tags, URLs, and meta descriptions on desktop and mobile.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://dr-checker.com/google-serp-simulator" },
  openGraph: {
    title,
    description,
    url: "https://dr-checker.com/google-serp-simulator",
    siteName: "DR Checker",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Google SERP simulator snippet preview"
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
    question: "What does a Google SERP simulator do?",
    answer: "A Google SERP simulator previews how a title tag, URL, and meta description may appear in search results before you publish a page."
  },
  {
    question: "Will Google always show the snippet I write?",
    answer: "No. Google may rewrite titles or descriptions based on the page content, search query, and what it thinks helps the searcher."
  },
  {
    question: "Should I test snippets on mobile and desktop?",
    answer: "Yes. Mobile and desktop results can display different amounts of text, so previewing both views helps you protect the most important message."
  },
  {
    question: "What makes a stronger search snippet?",
    answer: "A stronger snippet matches the page, puts the main topic near the start, explains the benefit clearly, and avoids keyword stuffing."
  }
];

export default function GoogleSerpSimulatorPage() {
  const schemas = [
    softwareApplicationSchema({
      name: "Google SERP Simulator",
      description,
      url: absoluteUrl("/google-serp-simulator"),
      features: [
        "Desktop snippet preview",
        "Mobile snippet preview",
        "Title and meta description length checks",
        "Search result URL preview"
      ]
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Domain Rating Checker", url: absoluteUrl("/") },
      { name: "Google SERP Simulator", url: absoluteUrl("/google-serp-simulator") }
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
      <SerpSimulatorTool />

      <section className="content-section" aria-label="Google SERP simulator guide">
        <div className="content-wrap">
          <section className="copy-block answer-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M4 7h16"></path>
                <path d="M4 12h10"></path>
                <path d="M4 17h16"></path>
              </svg>
              Quick answer
            </p>
            <h2>Use the SERP simulator to test search-result clarity before a page goes live</h2>
            <p className="wide-copy">A Google SERP simulator helps you preview title tags, URLs, and meta descriptions on desktop and mobile. It cannot force Google to show your exact snippet, but it helps you catch weak messaging, awkward truncation, and unclear page promises before publishing.</p>
            <div className="answer-grid" aria-label="SERP simulator quick facts">
              <article>
                <span>Checks</span>
                <strong>Title and description fit</strong>
                <p>See whether the strongest part of your snippet is likely to remain visible.</p>
              </article>
              <article>
                <span>Best use</span>
                <strong>Pre-publish review</strong>
                <p>Test important pages before launch, refreshes, and SEO copy updates.</p>
              </article>
              <article>
                <span>Important limit</span>
                <strong>Google may rewrite snippets</strong>
                <p>The preview is a writing aid, not a guarantee of the final search result.</p>
              </article>
            </div>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M4 7h16"></path>
                <path d="M4 12h10"></path>
                <path d="M4 17h16"></path>
              </svg>
              Snippet preview
            </p>
            <h2>Preview your Google search snippet before publishing</h2>
            <p className="wide-copy">A Google SERP simulator shows how your title tag, display URL, and meta description may appear in search results. Use it before publishing to catch truncation, unclear promises, keyword stuffing, and descriptions that do not give searchers a reason to click.</p>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M4 6h16"></path>
                <path d="M4 12h12"></path>
                <path d="M4 18h8"></path>
              </svg>
              Snippet strategy
            </p>
            <h2>Write snippets for the searcher&apos;s next click, not only for length limits</h2>
            <div className="intent-grid">
              <article className="intent-card">
                <span>Title tag</span>
                <h3>Lead with the page topic</h3>
                <p>Put the clearest topic and value near the beginning so truncation does not hide the reason to click.</p>
              </article>
              <article className="intent-card">
                <span>Description</span>
                <h3>Answer the query quickly</h3>
                <p>Use the first sentence to state what the page helps the reader do, compare, learn, or decide.</p>
              </article>
              <article className="intent-card">
                <span>URL path</span>
                <h3>Make the slug readable</h3>
                <p>A short descriptive path supports trust and helps the result feel aligned with the query.</p>
              </article>
              <article className="intent-card">
                <span>Device view</span>
                <h3>Check mobile and desktop</h3>
                <p>Search results can expose different amounts of text, so protect the most useful words in both previews.</p>
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
              Snippet matrix
            </p>
            <h2>How to diagnose a weak search snippet</h2>
            <div className="responsive-table decision-table">
              <table>
                <thead>
                  <tr>
                    <th>Issue</th>
                    <th>What it usually means</th>
                    <th>Better fix</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Title is too vague</td>
                    <td>The searcher cannot tell what the page solves.</td>
                    <td>Put the topic and outcome near the start of the title.</td>
                  </tr>
                  <tr>
                    <td>Description repeats keywords</td>
                    <td>The snippet sounds mechanical and gives no reason to click.</td>
                    <td>Answer the intent and include one concrete benefit or detail.</td>
                  </tr>
                  <tr>
                    <td>URL is hard to read</td>
                    <td>The displayed path weakens trust or distracts from the result.</td>
                    <td>Use a short slug that describes the page topic clearly.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <path d="M7 10l5 5 5-5"></path>
                <path d="M12 15V3"></path>
              </svg>
              Rewrite framework
            </p>
            <h2>A simple framework for stronger title tags and meta descriptions</h2>
            <div className="workflow-grid">
              <article className="workflow-card">
                <span>Search intent</span>
                <h3>Name the job of the page</h3>
                <p>Before editing length, decide whether the result should help someone learn, compare, buy, troubleshoot, or complete a task.</p>
              </article>
              <article className="workflow-card">
                <span>Primary phrase</span>
                <h3>Use the keyword naturally once</h3>
                <p>The title should contain the main phrase when it accurately describes the page. The description can use related wording if that reads better.</p>
              </article>
              <article className="workflow-card">
                <span>Proof point</span>
                <h3>Add one concrete reason to click</h3>
                <p>Examples include free tool, current guide, checklist, calculator, comparison table, template, or step-by-step process.</p>
              </article>
              <article className="workflow-card">
                <span>Preview</span>
                <h3>Trim only after the message is clear</h3>
                <p>Shorter is not automatically better. First make the snippet useful, then remove extra words that hide the main value.</p>
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
              SEO checks
            </p>
            <h2>What to check before publishing a snippet</h2>
            <div className="feature-grid">
              <article>
                <h3>Title clarity</h3>
                <p>Put the main topic and promise near the start so the result makes sense at a glance.</p>
              </article>
              <article>
                <h3>Description fit</h3>
                <p>Write a concise answer or benefit, then check that the strongest words appear before truncation.</p>
              </article>
              <article>
                <h3>URL readability</h3>
                <p>Keep slugs short and descriptive so the displayed URL supports the page topic.</p>
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
                Best practices
              </p>
              <h2>How to write better title tags and meta descriptions</h2>
            </div>
            <ul className="check-list">
              <li>Match the title and description to the exact page content, not just the target keyword.</li>
              <li>Use one clear benefit or answer instead of repeating the same phrase mechanically.</li>
              <li>Preview desktop and mobile because visible space can change by device and query.</li>
              <li>Expect Google to rewrite some snippets when it thinks another page excerpt fits the query better.</li>
            </ul>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M4 4h16v16H4z"></path>
                <path d="M8 9h8"></path>
                <path d="M8 13h6"></path>
              </svg>
              Keyword fit
            </p>
            <h2>Search terms this SERP preview page is built to satisfy</h2>
            <ul className="query-pill-list" aria-label="SERP simulator keyword targets">
              <li>google serp simulator</li>
              <li>serp preview tool</li>
              <li>snippet preview tool</li>
              <li>meta description preview</li>
              <li>title tag preview</li>
              <li>mobile serp preview</li>
            </ul>
          </section>

          <section className="copy-block faq-block" aria-labelledby="serp-faq-title">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <path d="M12 17h.01"></path>
              </svg>
              FAQs
            </p>
            <h2 id="serp-faq-title">Frequently asked questions</h2>
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
      <DiscoverTools activeTool="serp" />
    </main>
  );
}
