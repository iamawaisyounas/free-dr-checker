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
      <DiscoverTools activeTool="serp" />

      <section className="content-section" aria-label="Google SERP simulator guide">
        <div className="content-wrap">
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
    </main>
  );
}
