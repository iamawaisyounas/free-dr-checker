import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import AppHeader from "./components/AppHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dr-checker.com"),
  title: {
    default: "Free Domain Rating Checker — Powered by Ahrefs | No Login",
    template: "%s"
  },
  description:
    "Check any website's Domain Rating (DR) for free using real Ahrefs data. No login required. Enter a domain and get your DR score instantly.",
  alternates: {
    canonical: "https://dr-checker.com"
  },
  openGraph: {
    title: "Free Domain Rating Checker — Powered by Ahrefs | No Login",
    description: "Check any website's Domain Rating instantly. Free, no login required.",
    url: "https://dr-checker.com",
    siteName: "DR Checker",
    type: "website"
  },
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

const googleTagId = "G-FKY1D8N8WY";

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "DR Checker",
  url: "https://dr-checker.com",
  description:
    "Check any website's Domain Rating (DR) for free using real Ahrefs data. No login required. Enter a domain and get your DR score instantly.",
  applicationCategory: "SEOApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
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
        <Script
          id="google-tag"
          src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-tag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleTagId}');
            `
          }}
        />
        <Script
          id="schema-markup"
          strategy="beforeInteractive"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
        />
        <AppHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
