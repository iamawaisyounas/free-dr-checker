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
            <img className="site-logo site-logo-light" src="/assets/da-checker-logo-light.svg" alt="DR checker light logo" width="320" height="82" />
            <img className="site-logo site-logo-dark" src="/assets/da-checker-logo-dark.svg" alt="DR checker dark logo" width="320" height="82" />
          </Link>
        </div>
        <div className="header-actions">
          <nav
            id="primary-navigation"
            className={`site-nav${menuOpen ? " is-open" : ""}`}
            aria-label="Primary navigation"
          >
            <Link href="/authority-score" onClick={() => setMenuOpen(false)}>Domain Authority Checker</Link>
            <Link href="/domain-age" onClick={() => setMenuOpen(false)}>Domain Age Checker</Link>
          </nav>
          <button
            className="theme-toggle"
            type="button"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={theme === "dark"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
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
