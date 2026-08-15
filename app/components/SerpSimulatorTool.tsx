"use client";

import { useEffect, useMemo, useState } from "react";

const defaultTitle = "Domain Rating Checker - Check Ahrefs DR for Free | DR Checker";
const defaultUrl = "https://dr-checker.com";
const defaultDescription =
  "Check the Domain Rating (DR) of any website instantly. See a clear visual score and find out where your domain stands. Get a free 0-100 authority score for any domain.";
const defaultQuery = "google serp simulator";
const serpCharacterLimits = {
  desktop: {
    title: 61,
    description: 167
  },
  mobile: {
    title: 58,
    description: 155
  }
};

function normalizeUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "https://example.com/page";
  }

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function formatDisplayUrl(value: string) {
  try {
    const url = new URL(normalizeUrl(value));
    const path = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "");
    return `${url.hostname}${path}`.replace(/^www\./, "");
  } catch {
    return value.trim() || "example.com/page";
  }
}

function getOriginLabel(value: string) {
  try {
    const url = new URL(normalizeUrl(value));
    return url.hostname.replace(/^www\./, "");
  } catch {
    return "example.com";
  }
}

function getPathCrumbs(value: string) {
  try {
    const url = new URL(normalizeUrl(value));
    return url.pathname
      .split("/")
      .filter(Boolean)
      .slice(0, 3)
      .map((part) => part.replace(/-/g, " "));
  } catch {
    return [];
  }
}

function truncateForSerp(value: string, limit: number) {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= limit) {
    return normalized;
  }

  return `${normalized.slice(0, Math.max(0, limit - 3)).trimEnd()}...`;
}

function scoreCharacters(length: number, limit: number, label: string) {
  if (!length) return `Needs ${label}`;
  if (length <= limit) return `Fits ${label}`;
  return "Likely truncated";
}

export default function SerpSimulatorTool() {
  const [title, setTitle] = useState(defaultTitle);
  const [url, setUrl] = useState(defaultUrl);
  const [description, setDescription] = useState(defaultDescription);
  const [query, setQuery] = useState(defaultQuery);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [showDate, setShowDate] = useState(false);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (window.matchMedia("(max-width: 640px)").matches) {
      setDevice("mobile");
    }
  }, []);

  const displayUrl = useMemo(() => formatDisplayUrl(url), [url]);
  const originLabel = useMemo(() => getOriginLabel(url), [url]);
  const pathCrumbs = useMemo(() => getPathCrumbs(url), [url]);
  const previewDate = useMemo(() => new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date()), []);
  const previewTitle = title.trim() || "Untitled page";
  const previewDescription = description.trim() || "Add a meta description to preview your search snippet.";
  const searchQuery = query.trim() || previewTitle.split(" - ")[0] || previewTitle;
  const titleLimit = serpCharacterLimits[device].title;
  const descriptionLimit = serpCharacterLimits[device].description;
  const visibleTitle = truncateForSerp(previewTitle, titleLimit);
  const visibleDescription = truncateForSerp(previewDescription, descriptionLimit);
  const titleLength = title.trim().length;
  const descriptionLength = description.trim().length;
  const titleLineLabel = device === "desktop" ? "web title line" : "mobile title line";
  const descriptionLineLabel = device === "desktop" ? "web two-line snippet" : "mobile two-line snippet";
  const titleStatus = scoreCharacters(titleLength, titleLimit, titleLineLabel);
  const descriptionStatus = scoreCharacters(descriptionLength, descriptionLimit, descriptionLineLabel);
  const titleMeter = Math.min(100, Math.round((titleLength / titleLimit) * 100));
  const descriptionMeter = Math.min(100, Math.round((descriptionLength / descriptionLimit) * 100));

  async function copySnippet() {
    const snippet = [
      `Title: ${previewTitle}`,
      `URL: ${normalizeUrl(url)}`,
      `Meta description: ${previewDescription}`,
      `Search query: ${searchQuery}`
    ].join("\n");

    try {
      await navigator.clipboard.writeText(snippet);
      setCopied("Snippet copied");
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("Copy failed");
    }
  }

  function resetFields() {
    setTitle(defaultTitle);
    setUrl(defaultUrl);
    setDescription(defaultDescription);
    setQuery(defaultQuery);
    setDevice("desktop");
    setShowDate(false);
    setCopied("");
  }

  return (
    <>
      <section className="tool-shell serp-tool-shell" aria-labelledby="page-title">
        <div className="hero-backdrop" aria-hidden="true">
          <div className="hero-grid"></div>
        </div>
        <div className="checker-container">
          <p className="eyebrow">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M4 7h16"></path>
              <path d="M4 12h10"></path>
              <path d="M4 17h16"></path>
            </svg>
            Free SEO Tool
          </p>
          <h1 id="page-title">Google SERP Simulator</h1>
          <p className="subtitle">
            Preview your title tag, URL, and meta description before a page goes live. Use the simulator to catch truncation, tighten the search promise, and compare desktop and mobile snippets in one place.
          </p>

          <div className="serp-workbench" aria-label="SERP simulator editor and live preview">
            <section className="serp-panel serp-input-panel" aria-label="Snippet inputs">
              <div className="serp-panel-header">
                <strong>Input</strong>
                <span>Edit your snippet fields</span>
              </div>

              <div className="serp-field serp-field--wide">
                <label htmlFor="serpTitle">Title tag</label>
                <input
                  id="serpTitle"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  maxLength={120}
                />
                <div className="serp-meter" aria-label={`Title length is ${titleLength} characters out of ${titleLimit} and ${titleStatus.toLowerCase()}`}>
                  <span>{titleLength} / {titleLimit} characters - {titleStatus}</span>
                  <div className="serp-meter__track"><i style={{ width: `${titleMeter}%` }}></i></div>
                </div>
              </div>

              <div className="serp-field serp-field--half">
                <label htmlFor="serpUrl">Page URL</label>
                <input
                  id="serpUrl"
                  type="text"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  maxLength={180}
                />
              </div>

              <div className="serp-field serp-field--half">
                <label htmlFor="serpQuery">Search query</label>
                <input
                  id="serpQuery"
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  maxLength={90}
                />
              </div>

              <div className="serp-field serp-field--wide">
                <label htmlFor="serpDescription">Meta description</label>
                <textarea
                  id="serpDescription"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  maxLength={260}
                />
                <div className="serp-meter" aria-label={`Meta description length is ${descriptionLength} characters out of ${descriptionLimit} and ${descriptionStatus.toLowerCase()}`}>
                  <span>{descriptionLength} / {descriptionLimit} characters - {descriptionStatus}</span>
                  <div className="serp-meter__track"><i style={{ width: `${descriptionMeter}%` }}></i></div>
                </div>
              </div>

              <div className="serp-actions">
                <div className="segmented-control" aria-label="Preview device">
                  <button type="button" className={device === "desktop" ? "is-active" : ""} onClick={() => setDevice("desktop")}>
                    Desktop
                  </button>
                  <button type="button" className={device === "mobile" ? "is-active" : ""} onClick={() => setDevice("mobile")}>
                    Mobile
                  </button>
                </div>
                <label className="toggle-control serp-toggle">
                  <input type="checkbox" checked={showDate} onChange={(event) => setShowDate(event.target.checked)} />
                  Show date
                </label>
              </div>

              <div className="serp-command-row">
                <button type="button" className="secondary-button" onClick={resetFields}>Reset</button>
                <button type="button" onClick={copySnippet}>Copy snippet</button>
              </div>
              <p className="serp-copy-status" aria-live="polite">{copied}</p>
            </section>

            <section className="serp-panel serp-output-panel" aria-label="Live Google search result preview">
              <div className="serp-panel-header">
                <strong>Output</strong>
                <span>{device === "desktop" ? "Desktop SERP" : "Mobile SERP"}</span>
              </div>

              <div className={`serp-browser serp-browser--${device}`}>
                <div className="serp-google-shell" aria-hidden="true">
                  <div className="serp-google-topbar">
                    <div className="serp-google-logo">Google</div>
                    <div className="serp-search-bar">
                      <span>{searchQuery}</span>
                      <i aria-hidden="true"></i>
                      <b aria-hidden="true">x</b>
                      <svg viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="7"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                      </svg>
                    </div>
                  </div>
                  <nav className="serp-tabs">
                    <span>AI Mode</span>
                    <span className="is-active">All</span>
                    <span>Images</span>
                    <span>Videos</span>
                    <span>Forums</span>
                    <span>Short videos</span>
                    <span>News</span>
                    <span>More</span>
                    <span>Tools</span>
                  </nav>
                </div>

                <div className="serp-result-count" aria-hidden="true">
                  About 128,000 results (0.32 seconds)
                </div>

                <div className={`serp-preview serp-preview--${device}`}>
                  <div className="serp-preview__topline">
                    <div className="serp-preview__favicon" aria-hidden="true">{originLabel.charAt(0).toUpperCase()}</div>
                    <div className="serp-preview__source">
                      <div className="serp-preview__site">{originLabel}</div>
                      <div className="serp-preview__url">
                        <span>{displayUrl}</span>
                        {pathCrumbs.map((crumb, index) => (
                          <span key={`${crumb}-${index}`} className="serp-preview__crumb">{crumb}</span>
                        ))}
                      </div>
                    </div>
                    <button type="button" className="serp-more" aria-label="Result options">
                      <span></span><span></span><span></span>
                    </button>
                  </div>
                  <div className="serp-preview__body">
                    <h2 title={previewTitle}>{visibleTitle}</h2>
                    <p>{showDate ? `${previewDate} - ` : ""}{visibleDescription}</p>
                  </div>
                  <div className="serp-sitelinks" aria-hidden="true">
                    <span>Title preview</span>
                    <span>Meta description</span>
                    <span>URL check</span>
                  </div>
                </div>
              </div>

              <p className="serp-preview-note">Google can rewrite snippets, but this preview helps you catch weak messaging before a crawler or searcher sees the page.</p>

              <div className="serp-guidance-grid">
                <article>
                  <strong>Title</strong>
                  <span>{titleStatus}</span>
                  <p>{device === "desktop" ? "Web preview matches the 61-character title shown in the reference SERP." : "Mobile preview uses a tighter 58-character title line."}</p>
                </article>
                <article>
                  <strong>Description</strong>
                  <span>{descriptionStatus}</span>
                  <p>{device === "desktop" ? "Web preview matches the 167-character two-line description shown in the reference SERP." : "Mobile preview uses about 155 characters across two lines."}</p>
                </article>
                <article>
                  <strong>URL</strong>
                  <span>Readable</span>
                  <p>Short, descriptive slugs help the click.</p>
                </article>
              </div>
            </section>
          </div>
            </div>
      </section>
    </>
  );
}
