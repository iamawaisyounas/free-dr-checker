import type { Metadata } from "next";
import RelatedLinks from "../components/RelatedLinks";

export const metadata: Metadata = {
  title: "Contact Us - Dr Checker",
  description:
    "Have a question, feedback, or found a bug? Get in touch with the Dr Checker team - we read every message.",
  alternates: { canonical: "https://dr-checker.com/contact" },
  openGraph: {
    title: "Contact Dr Checker",
    description: "Reach out to the Dr Checker team with questions, feedback, or bug reports.",
    url: "https://dr-checker.com/contact",
    siteName: "Dr Checker",
    type: "website"
  }
};

export default function ContactPage() {
  return (
    <main className="standard-page">
      <div className="standard-page__inner">
        <p className="page-kicker">Contact</p>
        <h1>Get In Touch</h1>
        <p className="lead">Got a question, found a bug, or just want to say hi? We&apos;d love to hear from you.</p>

        <section>
          <h2>Email Us</h2>
          <p>Drop us a line at <strong>support@dr-checker.com</strong> and we&apos;ll get back to you as soon as we can.</p>
        </section>

        <section>
          <h2>Feedback & Suggestions</h2>
          <p>Dr Checker is a work in progress, and we&apos;re always looking to make it better. If there&apos;s a feature you&apos;d love to see, or something that&apos;s not working quite right, let us know. You can also check the <a href="/faq#report-a-bug">bug reporting FAQ</a> before sending details.</p>
        </section>

        <section>
          <h2>About SocialBu</h2>
          <p>Dr Checker is a free tool brought to you by <a href="https://socialbu.com">SocialBu</a>. If you&apos;re looking for a full social media management platform with scheduling, automation, analytics, and more, check them out too. You can read more about the tool on the <a href="/about#socialbu">About page</a>.</p>
        </section>

        <form className="contact-form" action="mailto:support@dr-checker.com" method="post" encType="text/plain">
          <label>Name<input name="name" type="text" autoComplete="name" /></label>
          <label>Email<input name="email" type="email" autoComplete="email" /></label>
          <label>Message<textarea name="message" rows={6}></textarea></label>
          <button type="submit">Submit</button>
        </form>

        <RelatedLinks
          links={[
            { href: "/", label: "Check a Domain" },
            { href: "/faq#report-a-bug", label: "Bug Report FAQ" },
            { href: "/about", label: "About Dr Checker" }
          ]}
        />
      </div>
    </main>
  );
}
