"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

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

type Props = {
  tool: "authority" | "age";
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

export default function SeoBulkTool({ tool }: Props) {
  const [input, setInput] = useState("");
  const [dedupe, setDedupe] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [authorityResults, setAuthorityResults] = useState<AuthorityResult[]>([]);
  const [ageResults, setAgeResults] = useState<DomainAgeResult[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  const isAuthority = tool === "authority";
  const maxDomains = isAuthority ? 1000 : 50;
  const title = isAuthority ? "Domain Authority Checker" : "Domain Age Checker";
  const subtitle = isAuthority
    ? "Check the Domain Authority score of any website for free. Get a 0 to 100 authority rating along with referring domains and global rank. No signup required, and you can check a single domain or run a bulk list."
    : "Check how old any domain is for free. Enter a domain to see its registration date, exact age, and expiry date, pulled from live WHOIS and RDAP records. No signup required.";
  const inputLabel = isAuthority ? "Domains or URLs" : "Website URL or domain";
  const buttonLabel = isAuthority ? "Check DA" : "Check Age";
  const trustLine = isAuthority
    ? "100% Free. No Sign-up Required. Bulk check up to 1000 domains."
    : "100% Free. No Sign-up Required.";
  const emptyState = isAuthority
    ? "Paste a domain above to see its Domain Authority score here."
    : "Enter a domain above to see its age and registration details here.";
  const endpoint = isAuthority ? "/api/tools/authority-score" : "/api/tools/domain-age";
  const placeholder = "example.com\ngithub.com\nhttps://www.google.com/search";
  const resultCount = isAuthority ? authorityResults.length : ageResults.length;

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    const domains = preparedDomains.slice(0, maxDomains);
    if (!domains.length) {
      setError("Enter at least one domain.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domains })
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || "Unable to check these domains right now.");
        return;
      }

      if (isAuthority) {
        setAuthorityResults(data.results || []);
        setAgeResults([]);
        if (data.quota_status === "cache_only") {
          setNotice("OpenPageRank quota is temporarily limited, so cached data is shown where available.");
        } else if (data.quota_status === "warning") {
          setNotice("OpenPageRank monthly usage is close to the configured cap.");
        }
      } else {
        setAgeResults(data.results || []);
        setAuthorityResults([]);
      }

      if (data.truncated) {
        setNotice((current) => `${current ? `${current} ` : ""}Only the first ${data.max_domains || maxDomains} domains were checked.`);
      }

      window.setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);
    } catch {
      setError("Unable to check these domains right now.");
    } finally {
      setLoading(false);
    }
  }

  function exportCsv() {
    const rows = isAuthority
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
    link.download = isAuthority ? "authority-score-results.csv" : "domain-age-results.csv";
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
            onChange={(event) => setInput(event.target.value)}
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
          <button type="submit" disabled={loading}>
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

            {isAuthority ? (
              <>
                <p className="score-disclaimer">
                  Domain Authority Score is our own 0-100 authority rating, calculated from open link-graph data. It is not affiliated with or equivalent to Moz&apos;s Domain Authority metric.
                  {" "}<Link href="/domain-authority-checker/how-we-calculate">How we calculate this score</Link>
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
