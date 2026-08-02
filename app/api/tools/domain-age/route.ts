import { NextRequest, NextResponse } from "next/server";
import { normalizeDomain, parseDomainInput } from "../../../../lib/domain-normalize";
import { getCachedJson, setCachedJson } from "../../../../lib/kv-cache";
import { fetchDomainAge } from "../../../../lib/rdap";
import { checkRateLimit, getClientIp } from "../../../../lib/rate-limit";

export const runtime = "nodejs";

const MAX_DOMAINS = 50;
const CACHE_TTL_SECONDS = 90 * 24 * 60 * 60;

type DomainAgeResult = Awaited<ReturnType<typeof fetchDomainAge>> & {
  from_cache?: boolean;
  checked_at?: string;
};

async function readBody(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    return body.domains ?? body.domain ?? [];
  }

  return request.nextUrl.searchParams.get("domains")
    || request.nextUrl.searchParams.get("domain")
    || "";
}

async function runInBatches<T, R>(items: T[], size: number, worker: (item: T) => Promise<R>) {
  const results: R[] = [];

  for (let index = 0; index < items.length; index += size) {
    const batch = items.slice(index, index + size);
    results.push(...await Promise.all(batch.map(worker)));
  }

  return results;
}

export async function POST(request: NextRequest) {
  const rate = await checkRateLimit(`ratelimit:domainage:${getClientIp(request)}`, 30, 60);
  if (!rate.ok) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute and try again." }, { status: 429 });
  }

  const input = await readBody(request);
  const parsed = parseDomainInput(input, MAX_DOMAINS);

  if (!parsed.domains.length) {
    return NextResponse.json({
      error: parsed.invalid.length ? "Please enter valid domain names." : "Please enter at least one domain."
    }, { status: 400 });
  }

  const cachedResults: DomainAgeResult[] = [];
  const uncached: string[] = [];

  await Promise.all(parsed.domains.map(async (domain) => {
    const cached = await getCachedJson<DomainAgeResult>(`domainage:${domain}`);
    if (cached) {
      cachedResults.push({ ...cached, from_cache: true });
      return;
    }
    uncached.push(domain);
  }));

  const freshResults = await runInBatches(uncached, 10, async (domain) => {
    const result: DomainAgeResult = {
      ...await fetchDomainAge(domain),
      from_cache: false,
      checked_at: new Date().toISOString()
    };

    if (result.status === "ok") {
      await setCachedJson(`domainage:${domain}`, result, CACHE_TTL_SECONDS);
    }

    return result;
  });

  const byDomain = new Map([...cachedResults, ...freshResults].map((result) => [normalizeDomain(result.domain), result]));

  return NextResponse.json({
    results: parsed.domains.map((domain) => byDomain.get(domain)).filter(Boolean),
    invalid: parsed.invalid,
    truncated: parsed.truncated,
    max_domains: MAX_DOMAINS
  });
}

export async function GET(request: NextRequest) {
  return POST(request);
}
