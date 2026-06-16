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
    "Check the Domain Rating (DR) of any website for free. Fast, accurate, and easy-to-use DR checker for SEO research, link building, and competitor analysis.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  manifest: "/site.webmanifest"
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Dr Checker",
  url: "https://dr-checker.com",
  logo: "https://dr-checker.com/icon-512.png",
  publisher: {
    "@type": "Organization",
    name: "SocialBu",
    url: "https://socialbu.com",
    logo: "https://dr-checker.com/icon-512.png"
  }
};

function Footer() {
  return (
    <footer className="global-footer">
      <div className="global-footer__row">
        <nav aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <AppHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
