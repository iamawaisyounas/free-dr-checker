import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import AppHeader from "./components/AppHeader";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";
import { publisherSchema, siteUrl } from "../lib/schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dr-checker.com"),
  title: {
    default: "Domain Rating Checker - Check Ahrefs DR for Free",
    template: "%s"
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

const googleTagManagerId = "GTM-PN765D4C";
const googleAnalyticsId = "G-FKY1D8N8WY";
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "DR Checker",
  url: siteUrl,
  publisher: publisherSchema,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?domain={domain}`,
    "query-input": "required name=domain"
  }
};

function Footer() {
  return (
    <footer className="global-footer">
      <div className="global-footer__inner">
        <div className="footer-brand-block">
          <p className="footer-tagline">Make Better SEO Decisions</p>
          <p className="footer-built-by">Built by</p>
          <a className="footer-socialbu-logo-link" href="https://socialbu.com" aria-label="SocialBu">
            <img className="footer-socialbu-logo" src="/assets/socialbu-logo.svg" alt="SocialBu" width="138" height="28" />
          </a>
        </div>

        <nav className="footer-column" aria-label="DR Checker footer links">
          <h2>DR Checker</h2>
          <Link href="/about">About Us</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
        </nav>

        <nav className="footer-column" aria-label="Free SEO tools">
          <h2>Free SEO Tools</h2>
          <Link href="/">DR Checker</Link>
          <Link href="/bulk-dr-checker">Bulk DR Checker</Link>
          <Link href="/domain-authority-checker">Domain Authority Checker</Link>
          <Link href="/domain-age-checker">Domain Age Checker</Link>
          <Link href="/google-serp-simulator">Google SERP Simulator</Link>
          <span className="footer-coming-soon">
            <span>Domain Backlinks Checker</span>
            <small>Coming Soon</small>
          </span>
          <span className="footer-coming-soon">
            <span>Broken Links Checker</span>
            <small>Coming Soon</small>
          </span>
        </nav>

        <nav className="footer-column" aria-label="Support links">
          <h2>Support</h2>
          <Link href="/faq">Ask a Question</Link>
          <Link href="/contact">Submit Your Request</Link>
        </nav>
      </div>
      <div className="global-footer__bottom">
        <p>© 2026 Domain Rating Checker | All rights reserved.</p>
        <p>Made with ❤️ by <a href="https://socialbu.com">SocialBu</a></p>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          id="gtm-script"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${googleTagManagerId}');`
          }}
        />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
        <script
          id="google-tag-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
            `
          }}
        />
        <script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            title="Google Tag Manager"
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <AppHeader />
        <ScrollToTopOnRouteChange />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
