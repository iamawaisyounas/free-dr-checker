import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dr-checker.com"),
  title: {
    default: "Dr Checker - Free Domain Rating (DR) Checker Tool",
    template: "%s"
  },
  description:
    "Check the Domain Rating (DR) of any website for free. Fast, accurate, and easy-to-use DR checker for SEO research, link building, and competitor analysis."
};

function Header() {
  return (
    <header className="global-header" aria-label="Site header">
      <div className="global-header__inner">
        <Link className="global-brand" href="/" aria-label="Dr Checker home">
          <span>Dr Checker</span>
          <small>by SocialBu</small>
        </Link>
        <nav className="global-nav" aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="global-footer">
      <div className="global-footer__grid">
        <div>
          <h2>Dr Checker</h2>
          <p>A free, simple Domain Rating checker tool.</p>
        </div>
        <div>
          <h2>Explore</h2>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2>Legal</h2>
          <ul>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms and Conditions</Link></li>
          </ul>
        </div>
      </div>
      <div className="global-footer__bar">
        © {new Date().getFullYear()} Dr Checker. A free tool by{" "}
        <a href="https://socialbu.com" rel="noreferrer">SocialBu</a>. All rights reserved.
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
