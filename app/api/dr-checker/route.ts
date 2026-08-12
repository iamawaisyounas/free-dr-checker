import { NextRequest, NextResponse } from "next/server";
import { isValidDomain, normalizeDomain, parseDomainInput } from "../../../lib/domain-normalize";

async function fetchDomainRating(domain: string) {
  const apiUrl = new URL("https://api.ahrefs.com/v3/public/domain-rating-free");
  apiUrl.searchParams.set("target", domain);
  apiUrl.searchParams.set("output", "json");

  const response = await fetch(apiUrl, {
    headers: {
      accept: "application/json",
      "user-agent": "FreeDRChecker/1.0"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    return {
      domain,
      dr: null,
      status: response.status === 404 ? "not_found" : "unavailable" as const
    };
  }

  const data = await response.json();
  const dr = data?.domain_rating?.domain_rating;

  if (typeof dr !== "number") {
    return { domain, dr: null, status: "unavailable" as const };
  }

  return { domain, dr: Math.round(dr), status: "ok" as const };
}

export async function GET(request: NextRequest) {
  const domain = normalizeDomain(request.nextUrl.searchParams.get("domain"));

  if (!domain) {
    return NextResponse.json({ error: "Please enter a domain." }, { status: 400 });
  }

  if (!isValidDomain(domain)) {
    return NextResponse.json({ error: "Please enter a valid website address." }, { status: 400 });
  }

  try {
    const result = await fetchDomainRating(domain);

    if (result.status !== "ok") {
      return NextResponse.json({ error: "Unable to fetch Domain Rating." }, { status: 502 });
    }

    return NextResponse.json({ domain: result.domain, dr: result.dr });
  } catch {
    return NextResponse.json({ error: "Unable to fetch Domain Rating." }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const parsed = parseDomainInput(body?.domains, 100);

    if (!parsed.domains.length) {
      return NextResponse.json(
        { error: parsed.invalid.length ? "Please enter valid website addresses." : "Enter at least one domain." },
        { status: 400 }
      );
    }

    const results = [];

    for (const domain of parsed.domains) {
      results.push(await fetchDomainRating(domain));
    }

    return NextResponse.json({
      results,
      invalid: parsed.invalid,
      truncated: parsed.truncated,
      max_domains: 100
    });
  } catch {
    return NextResponse.json({ error: "Unable to fetch Domain Rating." }, { status: 502 });
  }
}
