import type { Metadata } from "next";
import CheckerTool from "./components/CheckerTool";

export const metadata: Metadata = {
  title: "Free Domain Rating Checker — Powered by Ahrefs | No Login",
  description:
    "Check any website's Domain Rating (DR) for free using real Ahrefs data. No login required. Enter a domain and get your DR score instantly.",
  alternates: { canonical: "https://dr-checker.com" },
  openGraph: {
    title: "Free Domain Rating Checker — Powered by Ahrefs | No Login",
    description: "Check any website's Domain Rating instantly. Free, no login required.",
    url: "https://dr-checker.com",
    siteName: "DR Checker",
    type: "website"
  }
};

export default function HomePage() {
  return (
    <main>
      <CheckerTool />

      <section className="content-section" aria-label="Domain Rating guide">
        <div className="content-wrap">
          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
              Use cases
            </p>
            <h2>When to use this DR checker</h2>
            <div className="feature-grid">
              <article>
                <h3>Competitor research</h3>
                <p>Compare domains before you study their backlink profile, content strategy, or search visibility.</p>
              </article>
              <article>
                <h3>Guest post checks</h3>
                <p>Quickly screen websites before spending time on outreach, pricing, or partnership conversations.</p>
              </article>
              <article>
                <h3>Website audits</h3>
                <p>Use DR as a first signal when reviewing your own domain rating and link growth over time.</p>
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
              <h2>A cleaner way to read backlink strength</h2>
            </div>
            <ul className="check-list">
              <li>One simple input for any domain or URL.</li>
              <li>Instant DR score with an easy rating label.</li>
              <li>Plain-English explanation so the number is useful.</li>
              <li>Powered by Ahrefs&apos; free Domain Rating API.</li>
            </ul>
          </section>

          <section className="copy-block">
            <p className="section-label">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
              </svg>
              How it works
            </p>
            <h2>From website URL to DR score</h2>
            <div className="steps">
              <article>
                <span>1</span>
                <h3>Enter a site</h3>
                <p>Paste a domain like example.com or a full URL.</p>
              </article>
              <article>
                <span>2</span>
                <h3>Clean and validate</h3>
                <p>The tool removes extra URL parts and checks the domain format.</p>
              </article>
              <article>
                <span>3</span>
                <h3>Get the result</h3>
                <p>The backend calls Ahrefs and returns a DR score with context.</p>
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
              <h2>Tips for improving domain rating</h2>
            </div>
            <div className="tip-list">
              <p><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Earn links from relevant websites in your niche instead of chasing random high-DR links.</p>
              <p><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Create link-worthy assets such as original research, statistics pages, tools, and practical guides.</p>
              <p><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Fix weak technical SEO so valuable pages can be crawled, indexed, and shared more easily.</p>
              <p><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Review toxic or irrelevant link patterns and focus on steady, natural link growth.</p>
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
            <h2>What Domain Rating really means</h2>
            <p className="wide-copy">Domain Rating is an Ahrefs metric that estimates the strength of a website&apos;s backlink profile on a 0-100 scale. A higher DR usually means the domain has a stronger link rating, but it is not a Google ranking factor. Use it as a comparison metric together with relevance, organic traffic, content quality, and real audience signals.</p>
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
              <details>
                <summary>What is a good DR score?<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg></summary>
                <p>A DR above 50 is usually strong, but the right benchmark depends on your niche and competitors.</p>
              </details>
              <details>
                <summary>Is DR the same as Google rating?<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg></summary>
                <p>No. DR is an Ahrefs metric. Google does not use Ahrefs DR directly in rankings.</p>
              </details>
              <details>
                <summary>Can a low DR website rank well?<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg></summary>
                <p>Yes. Strong content, search intent match, topical relevance, and page-level links can help lower-DR sites rank.</p>
              </details>
              <details>
                <summary>Does this tool require an Ahrefs account?<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg></summary>
                <p>No. It uses Ahrefs&apos; free public Domain Rating endpoint through a backend proxy.</p>
              </details>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
