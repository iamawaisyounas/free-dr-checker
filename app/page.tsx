import type { Metadata } from "next";
import CheckerTool from "./components/CheckerTool";

export const metadata: Metadata = {
  title: "Dr Checker - Free Domain Rating (DR) Checker Tool",
  description:
    "Check the Domain Rating (DR) of any website for free. Fast, accurate, and easy-to-use DR checker for SEO research, link building, and competitor analysis.",
  alternates: { canonical: "https://dr-checker.com" },
  openGraph: {
    title: "Dr Checker - Free Domain Rating Checker",
    description: "Instantly check any website's Domain Rating (DR) score. Free, fast, no signup required.",
    url: "https://dr-checker.com",
    siteName: "Dr Checker",
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
            <p className="section-label">How it works</p>
            <h2>Getting a domain&apos;s rating is as easy as 1-2-3</h2>
            <div className="steps">
              <article>
                <span>1</span>
                <h3>Enter the domain</h3>
                <p>Just add the root domain you want to check. No need for https:// or www.</p>
              </article>
              <article>
                <span>2</span>
                <h3>Hit Check DR</h3>
                <p>Dr Checker cleans up the domain and does the lookup for you.</p>
              </article>
              <article>
                <span>3</span>
                <h3>Get your score</h3>
                <p>See a 0 to 100 score that reflects the overall strength of the backlink profile.</p>
              </article>
            </div>
          </section>

          <section className="copy-block split-block">
            <div>
              <p className="section-label">Benefits</p>
              <h2>Why use Dr Checker?</h2>
            </div>
            <ul className="check-list">
              <li>It&apos;s free. No paywalls, credit card, or signup tricks.</li>
              <li>It&apos;s fast. Get your score in seconds, not minutes.</li>
              <li>It&apos;s simple. No clutter or confusing dashboards.</li>
              <li>It&apos;s useful for link building, outreach, audits, and competitor checks.</li>
            </ul>
          </section>

          <section className="copy-block">
            <p className="section-label">Use cases</p>
            <h2>Who&apos;s this for?</h2>
            <div className="feature-grid">
              <article>
                <h3>SEOs & marketers</h3>
                <p>Quickly vet link prospects before outreach or competitor research.</p>
              </article>
              <article>
                <h3>Bloggers & creators</h3>
                <p>See how your site stacks up against others in your niche.</p>
              </article>
              <article>
                <h3>Agencies</h3>
                <p>Run quick checks for client reports without opening a heavy SEO suite.</p>
              </article>
            </div>
          </section>

          <section className="copy-block">
            <p className="section-label">Ready?</p>
            <h2>Ready to check a domain?</h2>
            <p className="wide-copy">Scroll back up, drop in a URL, and see what Dr Checker finds. It only takes a few seconds.</p>
          </section>
        </div>
      </section>
    </main>
  );
}
