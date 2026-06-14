import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Dr Checker | Domain Rating Checker Questions Answered",
  description:
    "Answers to common questions about Domain Rating, how Dr Checker calculates scores, and how to use the tool effectively.",
  alternates: { canonical: "https://dr-checker.com/faq" },
  openGraph: {
    title: "Dr Checker - FAQ",
    description: "Common questions about Domain Rating and how Dr Checker works.",
    url: "https://dr-checker.com/faq",
    siteName: "Dr Checker",
    type: "website"
  }
};

const faqs = [
  ["What is Domain Rating (DR)?", "Domain Rating is a score from 0 to 100 that estimates how strong a website's backlink profile is. It is based on the quantity and quality of websites linking to it."],
  ["Is Dr Checker free?", "Yep, completely free. No signup, no credit card, no hidden limits on basic checks."],
  ["How accurate is the DR score?", "DR is an estimate, not an exact science. Different tools may show slightly different numbers because they use different data sources and algorithms."],
  ["Why might my DR score be low even though my site has good content?", "DR is based on backlinks, not content quality. A site can have amazing content but a low DR if very few other websites link to it yet."],
  ["Can I check any website, or just my own?", "Check any domain you like - your own site, a competitor's, or a site you're considering for a guest post or backlink."],
  ["How often is the data updated?", "We refresh our underlying data regularly so scores reflect a reasonably current snapshot of each domain's backlink profile."],
  ["Do I need to enter https:// or www?", "Nope. Just the root domain, like example.com, works best."],
  ["Who made Dr Checker?", "Dr Checker is a free tool from the team at SocialBu, a social media management platform for creators and businesses."],
  ["I found a bug - where do I report it?", "Head to our Contact page and let us know what happened. We appreciate the heads-up!"]
];

export default function FaqPage() {
  return (
    <main className="standard-page">
      <div className="standard-page__inner">
        <p className="page-kicker">FAQ</p>
        <h1>Frequently Asked Questions</h1>
        <div className="faq-list page-faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
