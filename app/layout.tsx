import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import AppHeader from "./components/AppHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dr-checker.com"),
  title: {
    default: "Free Domain Rating Checker - Check DR, DA & UR | DR Checker",
    template: "%s"
  },
  description:
    "Check the Domain Rating (DR) of any website in seconds. Use our free Domain Rating Checker to analyze website authority, compare domains, and make smarter SEO decisions. No signup required.",
  alternates: {
    canonical: "https://dr-checker.com/"
  },
  openGraph: {
    title: "Free Domain Rating Checker - Check DR, DA & UR | DR Checker",
    description: "Check the Domain Rating (DR) of any website in seconds. Use our free Domain Rating Checker to analyze website authority, compare domains, and make smarter SEO decisions. No signup required.",
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

const googleTagManagerId = "GTM-PN765D4C";
const googleAnalyticsId = "G-FKY1D8N8WY";

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "DR Checker",
  url: "https://dr-checker.com",
  description:
    "Check the Domain Rating (DR) of any website in seconds. Use our free Domain Rating Checker to analyze website authority, compare domains, and make smarter SEO decisions. No signup required.",
  applicationCategory: "SEO Tool",
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
          <Link href="/domain-authority-checker">Domain Authority Checker</Link>
          <Link href="/domain-age-checker">Domain Age Checker</Link>
          <span className="footer-coming-soon">
            <span>Domain Backlinks Checker</span>
            <small>Coming Soon</small>
          </span>
          <span className="footer-coming-soon">
            <span>Broken Links Checker</span>
            <small>Coming Soon</small>
          </span>
        </nav>

        <nav className="footer-column" aria-label="Social links">
          <h2>Find Us On</h2>
          <a href="https://www.linkedin.com/company/socialbu" rel="me noopener noreferrer" target="_blank">LinkedIn</a>
          <a href="https://twitter.com/socialbu" rel="me noopener noreferrer" target="_blank">Twitter</a>
          <a href="https://www.instagram.com/socialbu/" rel="me noopener noreferrer" target="_blank">Instagram</a>
          <a href="https://www.tiktok.com/@socialbu" rel="me noopener noreferrer" target="_blank">TikTok</a>
          <a href="https://www.facebook.com/socialbu" rel="me noopener noreferrer" target="_blank">Facebook</a>
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
        <Script
          id="schema-markup"
          strategy="beforeInteractive"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
        />
        <AppHeader />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
