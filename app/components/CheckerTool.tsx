"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Result = {
  domain: string;
  dr: number;
};

function cleanDomain(value: string) {
  return value
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split(/[/?#]/)[0]
    .replace(/\.+$/, "")
    .toLowerCase();
}

function isValidDomain(domain: string) {
  if (!domain || domain.length > 253 || domain.includes("..")) {
    return false;
  }

  const labels = domain.split(".");
  if (labels.length < 2) {
    return false;
  }

  return labels.every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))
    && /^[a-z]{2,63}$/.test(labels.at(-1) || "");
}

function getStatus(score: number) {
  if (score < 30) return "Poor";
  if (score < 50) return "Fair";
  if (score < 70) return "Good";
  return "Excellent";
}

function getInsight(domain: string, score: number, status: string) {
  const insights: Record<string, string> = {
    Poor: `${domain} has a DR of ${score}. Low rating - focus on earning relevant, high-quality backlinks.`,
    Fair: `${domain} has a DR of ${score}. Moderate rating - the domain has some backlink strength but still has room to grow.`,
    Good: `${domain} has a DR of ${score}. Strong rating - this domain can be competitive in many niches.`,
    Excellent: `${domain} has a DR of ${score}. Top-tier rating - this suggests an outstanding backlink profile.`
  };

  return insights[status]
    || `${domain} has a Domain Rating of ${score}. Use it as a comparison metric alongside traffic, relevance, and content quality.`;
}

function pointOnGauge(score: number) {
  const safeScore = Math.max(0, Math.min(100, score));
  const angle = Math.PI * (1 - safeScore / 100);

  return {
    x: 160 + 124 * Math.cos(angle),
    y: 170 - 124 * Math.sin(angle)
  };
}

export default function CheckerTool() {
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!result) {
      return;
    }

    const canonicalHref = "https://dr-checker.com/";
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = canonicalHref;
  }, [result]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const nextDomain = cleanDomain(domain);

    if (!nextDomain) {
      setError("Please enter a website.");
      return;
    }

    if (!isValidDomain(nextDomain)) {
      setError("Please enter a valid website address.");
      return;
    }

    setDomain(nextDomain);
    setLoading(true);

    try {
      const response = await fetch(`/api/dr-checker?domain=${encodeURIComponent(nextDomain)}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || "Unable to fetch Domain Rating. Try again later.");
        return;
      }

      setResult({ domain: data.domain, dr: Math.round(Number(data.dr) || 0) });
      window.setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);
    } catch {
      setError("Unable to fetch Domain Rating. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  const score = Math.max(0, Math.min(100, Number(result?.dr) || 0));
  const status = getStatus(score);
  const needlePoint = pointOnGauge(score);

  return (
    <>
      <section className="checker-shell" aria-labelledby="page-title">
        <div className="checker-intro">
          <h1 id="page-title">Domain Rating Checker</h1>
          <p className="subtitle">Check the Domain Rating (DR) of any website instantly. See a clear visual score and find out where your domain stands.</p>
        </div>

        <form className="checker-form" onSubmit={handleSubmit} noValidate>
          <label className="sr-only" htmlFor="domainInput">Website URL or domain</label>
          <div className="input-row">
            <div className="input-shell">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path>
                <path d="M3.6 9h16.8M3.6 15h16.8M12 3c2.25 2.45 3.38 5.45 3.38 9S14.25 18.55 12 21M12 3C9.75 5.45 8.62 8.45 8.62 12S9.75 18.55 12 21"></path>
              </svg>
              <input
                id="domainInput"
                name="domain"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="Enter a domain (e.g. example.com)"
                aria-describedby="helperText errorText"
                value={domain}
                disabled={loading}
                onChange={(event) => setDomain(event.target.value)}
              />
            </div>
            <button type="submit" disabled={loading}>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="m21 21-4.35-4.35"></path>
                <circle cx="11" cy="11" r="7"></circle>
              </svg>
              <span>{loading ? "Checking..." : "Check DR"}</span>
            </button>
          </div>
        </form>
        <p className="form-helper" id="helperText">100% Free · No Sign-up Required</p>
        <p className="error" id="errorText" role="alert" aria-live="polite">{error}</p>

        {loading ? (
          <div className="loading" aria-live="polite">
            <span className="spinner" aria-hidden="true"></span>
            <span>Checking backlink rating...</span>
          </div>
        ) : null}
      </section>

      <section className="results-section" aria-label="Domain Rating result" ref={resultRef}>
        {!result ? (
          <div className="result-placeholder">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="m12 14 4-4"></path>
              <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
            </svg>
            <span>Enter a domain above to see its Domain Rating visualized here.</span>
          </div>
        ) : (
          <div className="result-card">
            <div className="score-panel">
              <div className="score-graph" aria-label="Domain Rating score graph">
                <svg viewBox="0 0 320 200" role="img" aria-labelledby="scoreGraphTitle">
                  <title id="scoreGraphTitle">Domain Rating score graph</title>
                  <path className="gauge-base" d="M30 170 A130 130 0 0 1 290 170"></path>
                  <path className="gauge-band gauge-poor" d="M30 170 A130 130 0 0 1 83.6 64.8"></path>
                  <path className="gauge-band gauge-fair" d="M83.6 64.8 A130 130 0 0 1 160 40"></path>
                  <path className="gauge-band gauge-good" d="M160 40 A130 130 0 0 1 236.4 64.8"></path>
                  <path className="gauge-band gauge-excellent" d="M236.4 64.8 A130 130 0 0 1 290 170"></path>
                  <text x="8" y="174">0</text>
                  <text x="77" y="50">30</text>
                  <text x="160" y="24">50</text>
                  <text x="243" y="50">70</text>
                  <text x="312" y="174">100</text>
                  <line className="gauge-needle" x1="160" y1="170" x2={needlePoint.x.toFixed(1)} y2={needlePoint.y.toFixed(1)}></line>
                  <circle className="needle-hub" cx="160" cy="170" r="8"></circle>
                  <circle className="needle-dot" cx="160" cy="170" r="3"></circle>
                </svg>
                <div className="score-value">
                  <strong>{score}</strong>
                  <span>DR Score · <b>{status}</b></span>
                </div>
              </div>
            </div>

            <div className="result-details">
              <div className="domain-line">
                <span>Result for</span>
                <strong>{result.domain}</strong>
              </div>
              <div className="result-summary-line">
                <span className={`status-pill status-${status.toLowerCase()}`}>{status}</span>
                <p>{getInsight(result.domain, score, status)}</p>
              </div>
              <div className="quick-stats" aria-label="Result summary">
                <div><span>DR Score</span><strong>{score}</strong></div>
                <div><span>Rating Scale</span><strong>0-100</strong></div>
              </div>
              <div className="score-ranges" aria-label="Score range">
                <p>Score range</p>
                <div>
                  {["Poor", "Fair", "Good", "Excellent"].map((range, index) => (
                    <span
                      key={range}
                      data-range={range.toLowerCase()}
                      className={range === status ? "is-active" : ""}
                    >
                      <b></b>{["0-29", "30-49", "50-69", "70-100"][index]}<br /><strong>{range}</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
