import type { Metadata } from "next";
import Link from "next/link";
import AppHeader from "./components/AppHeader";
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

function Footer() {
  return (
    <footer className="global-footer">
      <div className="global-footer__row">
        <nav aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
        <p>© {new Date().getFullYear()} Domain Rating Checker - Free SEO tool by <a href="https://socialbu.com">SocialBu</a></p>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
