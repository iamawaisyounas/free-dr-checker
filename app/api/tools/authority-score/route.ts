import { NextRequest, NextResponse } from "next/server";
import { normalizeDomain, parseDomainInput } from "../../../../lib/domain-normalize";
import { currentUsageKey, getCachedJson, getCounter, incrementCounter, secondsUntilMonthBuffer, setCachedJson } from "../../../../lib/kv-cache";
import { fetchAuthorityScores, type OpenPageRankRow } from "../../../../lib/open-pagerank";
import { checkRateLimit, getClientIp } from "../../../../lib/rate-limit";
import { verifyTurnstileToken } from "../../../../lib/turnstile";

export const runtime = "nodejs";

const MAX_DOMAINS = 1000;
const PROVIDER_BATCH_SIZE = 100;
const MONTHLY_CAP = 30000;
const WARNING_BUFFER = 500;
const CACHE_TTL_SECONDS = 30 * 24 * 60 * 60;

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

async function readBody(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    return {
      input: body.domains ?? body.domain ?? [],
      turnstileToken: body.turnstileToken
    };
  }

  return {
    input: request.nextUrl.searchParams.get("domains")
      || request.nextUrl.searchParams.get("domain")
      || "",
    turnstileToken: request.nextUrl.searchParams.get("turnstileToken")
  };
}

function toAuthorityResult(row: OpenPageRankRow): AuthorityResult {
  const score = typeof row.open_page_rank === "number"
    ? Math.round(row.open_page_rank * 10)
    : null;

  return {
    domain: normalizeDomain(row.domain),
    authority_score: score,
    referring_domains: row.referring_domains ?? null,
    global_rank: row.rank ?? null,
    checked_at: new Date().toISOString(),
    from_cache: false,
    history: row.history?.map((point) => ({
      date: point.date,
      score: typeof point.open_page_rank === "number" ? Math.round(point.open_page_rank * 10) : null
    })) ?? [],
    status: row.found === false || score === null ? "not_found" : "ok"
  };
}

async function alertQuota(message: string) {
  const webhook = process.env.ALERT_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL;
  console.warn(message);

  if (!webhook) {
    return;
  }

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: message })
  }).catch((error) => console.warn("Quota alert failed", error));
}

export async function POST(request: NextRequest) {
  const rate = await checkRateLimit(`ratelimit:authscore:${getClientIp(request)}`, 20, 60);
  if (!rate.ok) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute and try again." }, { status: 429 });
  }

  const { input, turnstileToken } = await readBody(request);
  const turnstileError = await verifyTurnstileToken(request, turnstileToken);
  if (turnstileError) {
    return turnstileError;
  }

  const parsed = parseDomainInput(input, MAX_DOMAINS);

  if (!parsed.domains.length) {
    return NextResponse.json({
      error: parsed.invalid.length ? "Please enter valid domain names." : "Please enter at least one domain."
    }, { status: 400 });
  }

  const usageKey = currentUsageKey();
  const currentUsage = await getCounter(usageKey);
  let quotaStatus: "ok" | "warning" | "cache_only" = currentUsage >= MONTHLY_CAP ? "cache_only" : "ok";
  const cachedResults: AuthorityResult[] = [];
  const uncached: string[] = [];

  await Promise.all(parsed.domains.map(async (domain) => {
    const cached = await getCachedJson<AuthorityResult>(`authscore:${domain}`);
    if (cached) {
      cachedResults.push({ ...cached, from_cache: true });
      return;
    }
    uncached.push(domain);
  }));

  const freshResults: AuthorityResult[] = [];
  const staleFallbacks: AuthorityResult[] = [];

  if (quotaStatus !== "cache_only" && uncached.length) {
    const remaining = Math.max(0, MONTHLY_CAP - currentUsage);
    const allowedFresh = uncached.slice(0, remaining);

    for (let index = 0; index < allowedFresh.length; index += PROVIDER_BATCH_SIZE) {
      const batch = allowedFresh.slice(index, index + PROVIDER_BATCH_SIZE);

      try {
        const data = await fetchAuthorityScores(batch);
        const rowsByDomain = new Map((data.results ?? []).map((row) => [normalizeDomain(row.domain), row]));

        await Promise.all(batch.map(async (domain) => {
          const row = rowsByDomain.get(domain);
          const result = row ? toAuthorityResult(row) : {
            domain,
            authority_score: null,
            referring_domains: null,
            global_rank: null,
            checked_at: new Date().toISOString(),
            from_cache: false,
            history: [],
            status: "not_found" as const
          };
          freshResults.push(result);
          await setCachedJson(`authscore:${domain}`, result, CACHE_TTL_SECONDS);
        }));
      } catch (error) {
        console.warn("Open PageRank lookup failed", error);
        await Promise.all(batch.map(async (domain) => {
          const cached = await getCachedJson<AuthorityResult>(`authscore:${domain}`);
          staleFallbacks.push(cached
            ? { ...cached, from_cache: true }
            : {
              domain,
              authority_score: null,
              referring_domains: null,
              global_rank: null,
              checked_at: new Date().toISOString(),
              from_cache: false,
              history: [],
              status: "unavailable"
            });
        }));
      }
    }

    const usageAfterIncrement = await incrementCounter(usageKey, freshResults.length, secondsUntilMonthBuffer());
    const effectiveUsage = usageAfterIncrement || currentUsage + freshResults.length;
    if (MONTHLY_CAP - effectiveUsage <= WARNING_BUFFER) {
      quotaStatus = "warning";
      await alertQuota(`OpenPageRank usage is near the monthly cap: ${effectiveUsage}/${MONTHLY_CAP}`);
    }
  }

  if (quotaStatus === "cache_only" || uncached.length > freshResults.length + staleFallbacks.length) {
    quotaStatus = "cache_only";
  }

  const byDomain = new Map([...cachedResults, ...freshResults, ...staleFallbacks].map((result) => [normalizeDomain(result.domain), result]));

  return NextResponse.json({
    results: parsed.domains.map((domain) => byDomain.get(domain) ?? {
      domain,
      authority_score: null,
      referring_domains: null,
      global_rank: null,
      checked_at: new Date().toISOString(),
      from_cache: false,
      history: [],
      status: "unavailable"
    }),
    invalid: parsed.invalid,
    truncated: parsed.truncated,
    max_domains: MAX_DOMAINS,
    quota_status: quotaStatus
  });
}

export async function GET(request: NextRequest) {
  return POST(request);
}
