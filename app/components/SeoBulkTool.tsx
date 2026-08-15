"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import TurnstileWidget from "./TurnstileWidget";

type AuthorityResult = {
  domain: string;
  authority_score: number | null;
  referring_domains: number | null;
  global_rank: number | null;
  checked_at: string;
  from_cache: boolean;
  history: { date: string; score: number | null }[];
  status: "ok" | "not_found" | "unavailable";
};

type DomainAgeResult = {
  domain: string;
  status: "ok" | "not_found" | "unavailable" | "no_registration_data";
  created_date?: string;
  expiry_date?: string | null;
  age_years?: number;
  registrar?: string | null;
  from_cache?: boolean;
};

type DrResult = {
  domain: string;
  dr: number | null;
  status: "ok" | "not_found" | "unavailable";
  source?: string;
  license?: string | null;
  checked_at?: string;
};

type Props = {
  tool: "authority" | "age" | "dr";
};

function splitInput(value: string) {
  return Array.from(new Set(value.split(/[\n,;\s]+/).map((item) => item.trim()).filter(Boolean)));
}

function formatDate(value?: string | null) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(value));
}

function formatNumber(value: number | null | undefined) {
  return typeof value === "number" ? new Intl.NumberFormat("en").format(value) : "Not found";
}

function ageStatusLabel(result: DomainAgeResult) {
  if (result.status === "ok") return "Registered";
  if (result.status === "not_found") return "Not registered";
  return "Data unavailable";
}

function authorityStatusLabel(result: AuthorityResult) {
  if (result.status === "ok") return result.from_cache ? "Cached" : "Fresh";
  if (result.status === "not_found") return "Not found";
  return "Temporarily limited";
}

function drStatusLabel(result: DrResult) {
  if (result.status === "ok") return "Found";
  if (result.status === "not_found") return "Not found";
  return "Unavailable";
}

function drStatus(score: number | null) {
  if (typeof score !== "number") return "Not found";
  if (score < 30) return "Poor";
  if (score < 50) return "Fair";
  if (score < 70) return "Good";
  return "Excellent";
}

export default function SeoBulkTool({ tool }: Props) {
  const [input, setInput] = useState("");
  const [dedupe, setDedupe] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTurnstile, setShowTurnstile] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [drResults, setDrResults] = useState<DrResult[]>([]);
  const [authorityResults, setAuthorityResults] = useState<AuthorityResult[]>([]);
  const [ageResults, setAgeResults] = useState<DomainAgeResult[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  const isDr = tool === "dr";
  const isAuthority = tool === "authority";
  const maxDomains = isDr ? 100 : isAuthority ? 1000 : 50;
  const title = isDr ? "Bulk DR Checker" : isAuthority ? "Free Domain Authority Checker" : "Free Domain Age Checker";
  const subtitle = isDr
    ? "Check Ahrefs Domain Rating for up to 100 domains at once. Clean messy prospect lists, remove duplicates, and export the DR scores your team needs for outreach or competitor research."
    : isAuthority
    ? "Check an authority-style score for any website from 0 to 100, plus referring domains and global rank when available. Use it as a second opinion beside Ahrefs DR, not as an official Moz DA lookup."
    : "Check when a domain was first registered, how old it is, and when it expires. The tool reads public WHOIS and RDAP records so you can add history context to SEO, outreach, and domain buying decisions.";
  const inputLabel = isDr || isAuthority ? "Domains or URLs" : "Website URL or domain";
  const buttonLabel = isDr ? "Check DR" : isAuthority ? "Check DA" : "Check Age";
  const trustLine = isDr
    ? "Free bulk DR lookup. No signup. Export up to 100 cleaned domains."
    : isAuthority
    ? "Free authority checks. No signup. Bulk check up to 1000 domains."
    : "Free domain age lookup. No signup. WHOIS and RDAP based.";
  const emptyState = isDr
    ? "Paste your prospect list above to see Ahrefs Domain Rating scores, status, and export-ready results."
    : isAuthority
    ? "Paste a domain above to see its authority-style score, referring domains, and global rank."
    : "Enter a domain above to see its registration date, age, expiry date, and registrar details.";
  const endpoint = isDr ? "/api/dr-checker" : isAuthority ? "/api/tools/authority-score" : "/api/tools/domain-age";
  const placeholder = "example.com\nsocialbu.com\n";
  const resultCount = isDr ? drResults.length : isAuthority ? authorityResults.length : ageResults.length;
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  useEffect(() => {
    const domain = new URLSearchParams(window.location.search).get("domain");
    if (domain) {
      setInput(domain);
    }
  }, []);

  const preparedDomains = useMemo(() => {
    const items = splitInput(input);
    return dedupe ? Array.from(new Set(items)) : items;
  }, [dedupe, input]);
  const hasPreparedDomains = preparedDomains.length > 0;
  const canSubmit = !loading && hasPreparedDomains;

  const handleTurnstileError = useCallback(() => {
    setError("Bot protection could not load. Please refresh and try again.");
  }, []);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken("");
    setPendingVerification(false);
    setTurnstileResetKey((value) => value + 1);
  }, []);

  function handleInputChange(value: string) {
    setInput(value);
    if (turnstileToken || pendingVerification) {
      resetTurnstile();
    }

    if (showTurnstile) {
      setShowTurnstile(false);
    }
  }

  const runCheck = useCallback(async (domains: string[], token: string) => {
    setLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domains, turnstileToken: token })
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || "Unable to check these domains right now.");
        return;
      }

      if (isAuthority) {
        setAuthorityResults(data.results || []);
        setAgeResults([]);
        setDrResults([]);
        if (data.quota_status === "cache_only") {
          setNotice("OpenPageRank quota is temporarily limited, so cached data is shown where available.");
        } else if (data.quota_status === "warning") {
          setNotice("OpenPageRank monthly usage is close to the configured cap.");
        }
      } else if (isDr) {
        setDrResults(data.results || []);
        setAuthorityResults([]);
        setAgeResults([]);
        if (data.invalid?.length) {
          setNotice(`${data.invalid.length} invalid domain${data.invalid.length === 1 ? " was" : "s were"} skipped.`);
        }
      } else {
        setAgeResults(data.results || []);
        setAuthorityResults([]);
        setDrResults([]);
      }

      if (data.truncated) {
        setNotice((current) => `${current ? `${current} ` : ""}Only the first ${data.max_domains || maxDomains} domains were checked.`);
      }

      if (turnstileSiteKey) {
        setShowTurnstile(false);
        resetTurnstile();
      }

      window.setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);
    } catch {
      setError("Unable to check these domains right now.");
    } finally {
      setLoading(false);
    }
  }, [endpoint, isAuthority, isDr, maxDomains, resetTurnstile, turnstileSiteKey]);

  useEffect(() => {
    if (pendingVerification && turnstileToken && !loading) {
      setPendingVerification(false);
      void runCheck(preparedDomains.slice(0, maxDomains), turnstileToken);
    }
  }, [loading, maxDomains, pendingVerification, preparedDomains, runCheck, turnstileToken]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    const domains = preparedDomains.slice(0, maxDomains);
    if (!domains.length) {
      setError("Enter at least one domain.");
      return;
    }

    if (turnstileSiteKey && !turnstileToken) {
      setShowTurnstile(true);
      setPendingVerification(true);
      setError("Please complete the bot protection check.");
      return;
    }

    await runCheck(domains, turnstileToken);
  }

  function exportCsv() {
    const rows = isDr
      ? [
        ["Domain", "Domain Rating", "Data Point", "Source", "License", "Status"],
        ...drResults.map((result) => [
          result.domain,
          result.dr ?? "",
          "Domain Rating",
          result.source || "Ahrefs Domain Rating API",
          result.license || "",
          drStatusLabel(result)
        ])
      ]
      : isAuthority
      ? [
        ["Domain", "Authority Score", "Referring Domains", "Global Rank", "Last Checked", "Status"],
        ...authorityResults.map((result) => [
          result.domain,
          result.authority_score ?? "",
          result.referring_domains ?? "",
          result.global_rank ?? "",
          result.checked_at,
          authorityStatusLabel(result)
        ])
      ]
      : [
        ["Domain", "Age", "Registered", "Expires", "Registrar", "Status"],
        ...ageResults.map((result) => [
          result.domain,
          result.age_years ?? "",
          result.created_date ?? "",
          result.expiry_date ?? "",
          result.registrar ?? "",
          ageStatusLabel(result)
        ])
      ];

    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = isDr ? "bulk-dr-results.csv" : isAuthority ? "authority-score-results.csv" : "domain-age-results.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <section className="tool-shell" aria-labelledby="tool-title">
        <div className="checker-intro">
          <h1 id="tool-title">{title}</h1>
          <p className="subtitle">{subtitle}</p>
        </div>

        <form className="bulk-tool-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="bulkDomains">{inputLabel}</label>
          <textarea
            id="bulkDomains"
            value={input}
            placeholder={placeholder}
            disabled={loading}
            onChange={(event) => handleInputChange(event.target.value)}
          />
          <div className="tool-controls">
            <label className="toggle-control">
              <input
                type="checkbox"
                checked={dedupe}
                disabled={loading}
                onChange={(event) => setDedupe(event.target.checked)}
              />
              <span>Exclude duplicates</span>
            </label>
            <span>{preparedDomains.length} queued · max {maxDomains}</span>
          </div>
          {showTurnstile ? (
            <TurnstileWidget
              disabled={loading}
              resetKey={turnstileResetKey}
              siteKey={turnstileSiteKey}
              onError={handleTurnstileError}
              onTokenChange={setTurnstileToken}
            />
          ) : null}
          <button type="submit" disabled={!canSubmit}>
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="m21 21-4.35-4.35"></path>
              <circle cx="11" cy="11" r="7"></circle>
            </svg>
            <span>{loading ? "Checking..." : buttonLabel}</span>
          </button>
        </form>
        <p className="error" role="alert" aria-live="polite">{error}</p>
        <p className="form-helper">{trustLine}</p>
      </section>

      <section className="tool-results-section" ref={resultRef} aria-label={`${title} results`}>
        {!resultCount ? (
          <div className="result-placeholder">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M3 3v18h18"></path>
              <path d="m19 9-5 5-4-4-3 3"></path>
            </svg>
            <span>{emptyState}</span>
          </div>
        ) : (
          <div className="tool-results-card">
            <div className="tool-results-header">
              <div>
                <strong>{resultCount} results</strong>
                {notice ? <p>{notice}</p> : null}
              </div>
              <button type="button" onClick={exportCsv}>Export CSV</button>
            </div>

            {isDr ? (
              <>
                <p className="score-disclaimer">
                  Bulk DR uses the Ahrefs free Domain Rating endpoint, which returns Domain Rating only.
                </p>
                <div className="responsive-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Domain</th>
                        <th>Domain Rating</th>
                        <th>Rating Label</th>
                        <th>Source</th>
                        <th>Status</th>
                        <th>Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      {drResults.map((result) => (
                        <tr key={result.domain}>
                          <td>{result.domain}</td>
                          <td><strong>{result.dr ?? "Not found"}</strong></td>
                          <td>{drStatus(result.dr)}</td>
                          <td>
                            Domain Rating by Ahrefs
                            {result.license ? <> · <a href={result.license} rel="noreferrer" target="_blank">License</a></> : null}
                          </td>
                          <td>{drStatusLabel(result)}</td>
                          <td><Link href={`/?domain=${encodeURIComponent(result.domain)}`}>Single DR</Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : isAuthority ? (
              <>
                <p className="score-disclaimer">
                  Domain Authority Score is our own 0-100 authority rating, calculated from open link-graph data. It is not affiliated with or equivalent to Moz&apos;s Domain Authority metric.
                </p>
                <div className="responsive-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Domain</th>
                        <th>Authority Score</th>
                        <th>Referring Domains</th>
                        <th>Global Rank</th>
                        <th>Last Checked</th>
                        <th>Status</th>
                        <th>Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      {authorityResults.map((result) => (
                        <tr key={result.domain}>
                          <td>{result.domain}</td>
                          <td><strong>{result.authority_score ?? "Not found"}</strong></td>
                          <td>{formatNumber(result.referring_domains)}</td>
                          <td>{formatNumber(result.global_rank)}</td>
                          <td>{formatDate(result.checked_at)}</td>
                          <td>{authorityStatusLabel(result)}</td>
                          <td><Link href={`/domain-age-checker?domain=${encodeURIComponent(result.domain)}`}>Age</Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="responsive-table">
                <table>
                  <thead>
                    <tr>
                      <th>Domain</th>
                      <th>Age</th>
                      <th>Registered</th>
                      <th>Expires</th>
                      <th>Registrar</th>
                      <th>Status</th>
                      <th>Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ageResults.map((result) => (
                      <tr key={result.domain}>
                        <td>{result.domain}</td>
                        <td><strong>{typeof result.age_years === "number" ? `${result.age_years} years` : "Not available"}</strong></td>
                        <td>{formatDate(result.created_date)}</td>
                        <td>{formatDate(result.expiry_date)}</td>
                        <td>{result.registrar || "Not available"}</td>
                        <td>{ageStatusLabel(result)}</td>
                        <td><Link href={`/domain-authority-checker?domain=${encodeURIComponent(result.domain)}`}>Score</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
