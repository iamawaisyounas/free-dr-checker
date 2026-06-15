import type { Metadata } from "next";
import RelatedLinks from "../components/RelatedLinks";

export const metadata: Metadata = {
  title: "Terms and Conditions - Dr Checker",
  description: "The terms and conditions for using the Dr Checker domain rating tool.",
  alternates: { canonical: "https://dr-checker.com/terms" },
  robots: { index: true, follow: true }
};

export default function TermsPage() {
  return (
    <main className="standard-page">
      <div className="standard-page__inner">
        <p className="page-kicker">Legal</p>
        <h1>Terms and Conditions</h1>
        <p className="lead"><strong>Last updated: June 14, 2026</strong></p>
        <p>Welcome to Dr Checker! By using our website and tool, you agree to the following terms. Please read them carefully.</p>

        <section><h2>1. Using Dr Checker</h2><p>Dr Checker provides a <a href="/">free tool to estimate the Domain Rating</a> (DR) of websites. You&apos;re welcome to use it for personal, business, or research purposes. You agree not to misuse the tool by attempting to overload our servers, scrape data at scale without permission, or use the service for any illegal purpose.</p></section>
        <section><h2>2. No Guarantee of Accuracy</h2><p>Domain Rating scores provided by Dr Checker are estimates based on available data and our own methodology. We do not guarantee that scores are 100% accurate, complete, or match results from other tools. See the <a href="/faq#how-accurate-is-the-dr-score">DR accuracy FAQ</a> for more context.</p></section>
        <section><h2>3. As Is Service</h2><p>Dr Checker is provided as is and as available, without warranties of any kind, express or implied. We don&apos;t guarantee the tool will be error-free, uninterrupted, or available at all times.</p></section>
        <section><h2>4. Intellectual Property</h2><p>The Dr Checker name, logo, design, and underlying code are the property of SocialBu and its team. You may not copy, reproduce, or redistribute the tool or its content without permission.</p></section>
        <section><h2>5. Limitation of Liability</h2><p>To the fullest extent permitted by law, SocialBu and the Dr Checker team are not liable for any damages or losses arising from your use of, or inability to use, this website or its results.</p></section>
        <section><h2>6. Changes to the Service</h2><p>We may update, modify, or discontinue any part of Dr Checker at any time, with or without notice.</p></section>
        <section><h2>7. Changes to These Terms</h2><p>We may revise these terms from time to time. Continued use of the site after changes are posted means you accept the updated terms.</p></section>
        <section><h2>8. Contact</h2><p>Questions about these terms? Reach out via our <a href="/contact">Contact page</a> or email support@dr-checker.com.</p></section>
        <p><em>Dr Checker is a free tool provided by <a href="https://socialbu.com">SocialBu</a>.</em></p>
        <RelatedLinks
          links={[
            { href: "/privacy-policy", label: "Privacy Policy" },
            { href: "/faq#how-accurate-is-the-dr-score", label: "DR Accuracy FAQ" },
            { href: "/", label: "Use Dr Checker" }
          ]}
        />
      </div>
    </main>
  );
}
