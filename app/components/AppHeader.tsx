"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AppHeader() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("dr-checker-theme");
    const initialTheme = savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    window.localStorage.setItem("dr-checker-theme", theme);
  }, [theme]);

  return (
    <div className="standard-header-shell">
      <header className="site-header standard-site-header" aria-label="Site header">
        <div className="brand-lockup">
          <Link className="brand" href="/" aria-label="Domain Rating Checker home">
            <img className="site-logo site-logo-light" src="/assets/da-checker-logo-light.svg" alt="DR checker light logo" width="320" height="60" />
            <img className="site-logo site-logo-dark" src="/assets/da-checker-logo-dark.svg" alt="DR checker dark logo" width="320" height="60" />
          </Link>
        </div>
        <div className="header-actions">
          <nav className="site-nav" aria-label="Primary navigation">
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/faq">FAQs</Link>
            <Link href="/contact">Contact us</Link>
          </nav>
          <button
            className="theme-toggle"
            type="button"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={theme === "dark"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <svg className="sun-icon" aria-hidden="true" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
            </svg>
            <svg className="moon-icon" aria-hidden="true" viewBox="0 0 24 24">
              <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a7 7 0 1 0 11 11Z"></path>
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}
