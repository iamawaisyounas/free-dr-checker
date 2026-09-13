"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AppHeader() {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("dr-checker-theme");
    const initialTheme = savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", theme === "dark");
    document.body.classList.toggle("dark-mode", theme === "dark");
    window.localStorage.setItem("dr-checker-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`standard-header-shell${isScrolled ? " is-scrolled" : ""}`}>
      <header className="site-header standard-site-header" aria-label="Site header">
        <div className="brand-lockup">
          <Link className="brand" href="/" aria-label="Domain Rating Checker home">
            <span className="site-logo" role="img" aria-label="DR Checker">
              <img className="site-logo-icon" src="/icon-512.png" alt="" width="28" height="28" />
              <span className="site-logo-name">Checker</span>
            </span>
          </Link>
        </div>
        <nav
          id="primary-navigation"
          className={`site-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Primary navigation"
        >
          <details className="nav-dropdown">
            <summary>
              <span>Free SEO Tools</span>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </summary>
            <div className="nav-dropdown-menu">
              <Link href="/" onClick={() => setMenuOpen(false)}>DR Checker</Link>
              <Link href="/bulk-dr-checker" onClick={() => setMenuOpen(false)}>Bulk DR Checker</Link>
              <Link href="/domain-authority-checker" onClick={() => setMenuOpen(false)}>Domain Authority Checker</Link>
              <Link href="/domain-age-checker" onClick={() => setMenuOpen(false)}>Domain Age Checker</Link>
              <Link href="/google-serp-simulator" onClick={() => setMenuOpen(false)}>SERP Simulator</Link>
            </div>
          </details>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)}>Resources</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>
        <div className="header-actions">
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
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <svg className="menu-icon" aria-hidden="true" viewBox="0 0 24 24">
              <path d="M4 7h16M4 12h16M4 17h16"></path>
            </svg>
            <svg className="close-icon" aria-hidden="true" viewBox="0 0 24 24">
              <path d="m6 6 12 12M18 6 6 18"></path>
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}
