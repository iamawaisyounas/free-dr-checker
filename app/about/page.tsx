import type { Metadata } from "next";
import RelatedLinks from "../components/RelatedLinks";

export const metadata: Metadata = {
  title: "About Dr Checker - Free DR Checker Tool",
  description:
    "Learn about Dr Checker, a free and simple tool to check the Domain Rating of any website. Built by the team behind SocialBu.",
  alternates: { canonical: "https://dr-checker.com/about" },
  openGraph: {
    title: "About Dr Checker",
    description: "The story behind Dr Checker - a simple, free Domain Rating checker tool.",
    url: "https://dr-checker.com/about",
    siteName: "Dr Checker",
    type: "website"
  }
};

export default function AboutPage() {
  return (
    <main className="standard-page">
      <div className="standard-page__inner">
        <p className="page-kicker">About</p>
        <h1>About Dr Checker</h1>
        <p className="lead">Hey there! Welcome to Dr Checker - a no-fuss, free tool that tells you the Domain Rating (DR) of any website in just a couple of seconds.</p>

        <section id="why-we-built-this">
          <h2>Why We Built This</h2>
          <p>If you&apos;ve ever done SEO work, link building, or even just wanted to <a href="/">check a website&apos;s Domain Rating</a> before reaching out for a partnership, you know that domain rating tools can be expensive, slow, or buried inside huge platforms you don&apos;t need. We wanted something simple: type a domain, get a score, done. That&apos;s Dr Checker.</p>
        </section>

        <section id="what-is-domain-rating">
          <h2>What Is Domain Rating?</h2>
          <p>Domain Rating (DR) is a score from 0 to 100 that estimates the overall strength of a website&apos;s backlink profile. The higher the number, the more authority a site tends to carry in the eyes of search engines, at least based on the links pointing to it. It&apos;s a handy way to quickly compare websites at a glance. For common questions, see our <a href="/faq#what-is-domain-rating">Domain Rating FAQ</a>.</p>
        </section>

        <section id="socialbu">
          <h2>Who&apos;s Behind Dr Checker</h2>
          <p>Dr Checker is brought to you by the team at <a href="https://socialbu.com">SocialBu</a>, a social media management tool that helps creators, businesses, and teams schedule posts, automate workflows, and grow their online presence. We built Dr Checker as a free side tool because we use domain checks ourselves all the time and figured other marketers and creators would find it handy too.</p>
        </section>

        <section>
          <h2>Our Promise</h2>
          <ul>
            <li>Always free to use</li>
            <li>No unnecessary signups</li>
            <li>Clean, simple, and fast</li>
          </ul>
          <p>Got feedback or ideas for what we should add next? <a href="/contact">Get in touch</a> - we&apos;d love to hear from you.</p>
        </section>

        <RelatedLinks
          links={[
            { href: "/", label: "Check Domain Rating" },
            { href: "/faq#how-accurate-is-the-dr-score", label: "DR Accuracy FAQ" },
            { href: "/contact", label: "Contact Dr Checker" }
          ]}
        />
      </div>
    </main>
  );
}
