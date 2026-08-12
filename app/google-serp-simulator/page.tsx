import type { Metadata } from "next";
import DiscoverTools from "../components/DiscoverTools";
import SerpSimulatorTool from "../components/SerpSimulatorTool";

const title = "Google SERP Simulator - Free Snippet Preview Tool";
const description =
  "Preview how your title tag, page URL, and meta description may appear in Google search results. Test desktop and mobile snippets before publishing.";

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

export default function GoogleSerpSimulatorPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Google SERP Simulator",
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
            <h2>Preview your Google search snippet</h2>
            <p className="wide-copy">Use this Google SERP simulator to test how a page title, URL, and meta description may look in search results. It helps you spot overly long titles, weak descriptions, unclear URLs, and messaging that may not earn the click.</p>
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
            <h2>What to check before publishing</h2>
            <div className="feature-grid">
              <article>
                <h3>Title clarity</h3>
                <p>Put the main keyword and core promise near the start so searchers understand the page quickly.</p>
              </article>
              <article>
                <h3>Description fit</h3>
                <p>Write a concise summary with a reason to click, then check that the important text appears before truncation.</p>
              </article>
              <article>
                <h3>URL readability</h3>
                <p>Keep slugs short and descriptive so the displayed URL supports the result instead of distracting from it.</p>
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
              <h2>How to write better snippets</h2>
            </div>
            <ul className="check-list">
              <li>Match the title and description to the real page content.</li>
              <li>Use a clear benefit instead of repeating keywords mechanically.</li>
              <li>Compare desktop and mobile previews because available space can vary.</li>
              <li>Remember that Google may rewrite snippets based on the search query.</li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
