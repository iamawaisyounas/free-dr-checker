import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Dr Checker",
  description:
    "Read the Dr Checker privacy policy to understand what data we collect, how we use it, and your rights.",
  alternates: { canonical: "https://dr-checker.com/privacy-policy" },
  robots: { index: true, follow: true }
};

export default function PrivacyPolicyPage() {
  return (
    <main className="standard-page">
      <div className="standard-page__inner">
        <p className="page-kicker">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="lead"><strong>Last updated: June 14, 2026</strong></p>
        <p>Thanks for using Dr Checker. This page explains what information we collect when you use our site, and how we use it. We&apos;ve tried to keep it simple and jargon-free.</p>

        <section><h2>Information We Collect</h2><p><strong>Domains you check:</strong> When you enter a domain into our tool, we process that domain to return a Domain Rating score. We may log this information for service improvement and abuse-prevention purposes.</p><p><strong>Usage data:</strong> Like most websites, we automatically collect basic information about your visit, such as your IP address, browser type, device type, pages visited, and timestamps. This is collected via analytics tools.</p><p><strong>Contact form data:</strong> If you reach out via our contact form or email, we&apos;ll have access to whatever information you choose to share.</p></section>
        <section><h2>Cookies & Analytics</h2><p>We use cookies and similar technologies, including Google Analytics and Google Tag Manager, to understand how visitors use our site and improve the experience. You can control or disable cookies through your browser settings.</p></section>
        <section><h2>How We Use Information</h2><ul><li>Provide and improve the Dr Checker tool</li><li>Understand how visitors use our site so we can make it better</li><li>Respond to questions, feedback, or support requests</li><li>Detect and prevent abuse of our service</li></ul></section>
        <section><h2>Data Sharing</h2><p>We do not sell your personal information. We may share data with third-party service providers, such as analytics or hosting providers, who help us operate the site under their own privacy and security practices.</p></section>
        <section><h2>Third-Party Services</h2><p>Dr Checker is hosted on Vercel and uses Google Analytics / Google Tag Manager for usage insights. These third parties have their own privacy policies governing how they handle data.</p></section>
        <section><h2>Your Choices</h2><p>You can disable cookies in your browser at any time. Doing so may affect how parts of the site function.</p></section>
        <section><h2>Children&apos;s Privacy</h2><p>Dr Checker is not directed at children under 13, and we do not knowingly collect personal information from children.</p></section>
        <section><h2>Changes to This Policy</h2><p>We may update this privacy policy occasionally. Any changes will be posted on this page with an updated Last updated date.</p></section>
        <section><h2>Contact Us</h2><p>Questions about this policy? Reach out via our <a href="/contact">Contact page</a> or email support@dr-checker.com.</p></section>
        <p><em>Dr Checker is a free tool provided by <a href="https://socialbu.com">SocialBu</a>.</em></p>
      </div>
    </main>
  );
}
