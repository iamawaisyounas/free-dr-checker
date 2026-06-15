import type { Metadata } from "next";
import RelatedLinks from "../components/RelatedLinks";

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
  { id: "what-is-domain-rating", question: "What is Domain Rating (DR)?", answer: "Domain Rating is a score from 0 to 100 that estimates how strong a website's backlink profile is. It is based on the quantity and quality of websites linking to it." },
  { id: "is-dr-checker-free", question: "Is Dr Checker free?", answer: "Yep, completely free. No signup, no credit card, no hidden limits on basic checks." },
  { id: "how-accurate-is-the-dr-score", question: "How accurate is the DR score?", answer: "DR is an estimate, not an exact science. Different tools may show slightly different numbers because they use different data sources and algorithms." },
  { id: "why-is-my-dr-low", question: "Why might my DR score be low even though my site has good content?", answer: "DR is based on backlinks, not content quality. A site can have amazing content but a low DR if very few other websites link to it yet." },
  { id: "can-i-check-any-website", question: "Can I check any website, or just my own?", answer: "Check any domain you like - your own site, a competitor's, or a site you're considering for a guest post or backlink." },
  { id: "how-often-is-data-updated", question: "How often is the data updated?", answer: "We refresh our underlying data regularly so scores reflect a reasonably current snapshot of each domain's backlink profile." },
  { id: "domain-format", question: "Do I need to enter https:// or www?", answer: "Nope. Just the root domain, like example.com, works best." },
  { id: "who-made-dr-checker", question: "Who made Dr Checker?", answer: "Dr Checker is a free tool from the team at SocialBu, a social media management platform for creators and businesses." },
  { id: "report-a-bug", question: "I found a bug - where do I report it?", answer: "Head to our Contact page and let us know what happened. We appreciate the heads-up!" }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
};

export default function FaqPage() {
  return (
    <main className="standard-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="standard-page__inner faq-page__inner">
        <p className="page-kicker">FAQ</p>
        <h1>Frequently Asked Questions</h1>
        <nav className="anchor-links" aria-label="FAQ topics">
          <a href="#what-is-domain-rating">What is DR?</a>
          <a href="#how-accurate-is-the-dr-score">Accuracy</a>
          <a href="#can-i-check-any-website">Website checks</a>
          <a href="#report-a-bug">Support</a>
        </nav>
        <div className="faq-list page-faq-list">
          {faqs.map((faq) => (
            <details id={faq.id} key={faq.id}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
        <RelatedLinks
          links={[
            { href: "/", label: "Use the Free DR Checker" },
            { href: "/about#what-is-domain-rating", label: "Learn About Domain Rating" },
            { href: "/contact", label: "Report a Bug" }
          ]}
        />
      </div>
    </main>
  );
}
