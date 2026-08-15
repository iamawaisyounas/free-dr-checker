"use client";

import { useMemo, useState } from "react";

const defaultTitle = "Free Domain Rating Checker - Check Ahrefs DR Instantly";
const defaultUrl = "https://dr-checker.com/google-serp-simulator";
const defaultDescription =
  "Preview your Google search snippet, test desktop and mobile fit, and improve title tags and meta descriptions before publishing.";

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

function scoreLength(length: number, goodMin: number, goodMax: number, okMax: number) {
  if (length < goodMin) return "Short";
  if (length <= goodMax) return "Good";
  if (length <= okMax) return "Long";
  return "Likely truncated";
}

export default function SerpSimulatorTool() {
  const [title, setTitle] = useState(defaultTitle);
  const [url, setUrl] = useState(defaultUrl);
  const [description, setDescription] = useState(defaultDescription);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [showDate, setShowDate] = useState(false);
  const [copied, setCopied] = useState("");

  const displayUrl = useMemo(() => formatDisplayUrl(url), [url]);
  const previewDate = useMemo(() => new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date()), []);
  const titleStatus = scoreLength(title.trim().length, 35, 60, 70);
  const descriptionStatus = scoreLength(description.trim().length, 110, 155, 170);
  const previewTitle = title.trim() || "Untitled page";
  const previewDescription = description.trim() || "Add a meta description to preview your search snippet.";

  async function copySnippet() {
    const snippet = [
      `Title: ${previewTitle}`,
      `URL: ${normalizeUrl(url)}`,
      `Meta description: ${previewDescription}`
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
          <h1 id="page-title">Google SERP Simulator for Title and Meta Preview</h1>
          <p className="subtitle">
            Preview your title tag, URL, and meta description before a page goes live. Use the simulator to catch truncation, tighten the search promise, and compare desktop and mobile snippets in one place.
          </p>

          <div className="serp-workbench" aria-label="SERP simulator editor and live preview">
            <section className="serp-panel serp-input-panel" aria-label="Snippet inputs">
              <div className="serp-panel-header">
                <strong>Input</strong>
                <span>Edit your snippet fields</span>
              </div>

              <div className="serp-field">
                <label htmlFor="serpTitle">Title tag</label>
                <input
                  id="serpTitle"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  maxLength={120}
                />
                <span>{title.trim().length} characters - {titleStatus}</span>
              </div>

              <div className="serp-field">
                <label htmlFor="serpUrl">Page URL</label>
                <input
                  id="serpUrl"
                  type="text"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  maxLength={180}
                />
              </div>

              <div className="serp-field">
                <label htmlFor="serpDescription">Meta description</label>
                <textarea
                  id="serpDescription"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  maxLength={260}
                />
                <span>{description.trim().length} characters - {descriptionStatus}</span>
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
                <span>Live SERP preview</span>
              </div>

              <div className="serp-search-bar" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <span>{previewTitle}</span>
              </div>

              <div className={`serp-preview serp-preview--${device}`}>
                <div className="serp-preview__favicon" aria-hidden="true">D</div>
                <div className="serp-preview__body">
                  <div className="serp-preview__site">DR Checker</div>
                  <div className="serp-preview__url">{displayUrl}</div>
                  <h2>{previewTitle}</h2>
                  <p>{showDate ? `${previewDate} - ` : ""}{previewDescription}</p>
                </div>
              </div>

              <p className="serp-preview-note">Google can rewrite snippets, but this preview helps you catch weak messaging before a crawler or searcher sees the page.</p>

              <div className="serp-guidance-grid">
                <article>
                  <strong>Title</strong>
                  <span>{titleStatus}</span>
                  <p>35 to 60 characters is a useful target.</p>
                </article>
                <article>
                  <strong>Description</strong>
                  <span>{descriptionStatus}</span>
                  <p>110 to 155 characters usually fits cleanly.</p>
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
