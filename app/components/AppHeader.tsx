"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppHeader() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <div className="standard-header-shell">
      <header className="site-header standard-site-header" aria-label="Site header">
        <div className="brand-lockup">
          <Link className="brand" href="/" aria-label="Domain Rating Checker home">
            <img className="site-logo site-logo-light" src="/assets/da-checker-logo-light.svg" alt="DR checker light logo" width="320" height="60" />
            <img className="site-logo site-logo-dark" src="/assets/da-checker-logo-dark.svg" alt="DR checker dark logo" width="320" height="60" />
          </Link>
        </div>
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </header>
    </div>
  );
}
