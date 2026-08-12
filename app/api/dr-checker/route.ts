import { NextRequest, NextResponse } from "next/server";
import { isValidDomain, normalizeDomain, parseDomainInput } from "../../../lib/domain-normalize";

const AHREFS_API_KEY =
  process.env.AHREFS_API_KEY
  || process.env.AHREFS_API_TOKEN
  || process.env.AHREFS_API_V3_KEY;

type DrStatus = "ok" | "not_found" | "unavailable" | "auth_required";

async function fetchDomainRating(domain: string) {
  if (!AHREFS_API_KEY) {
    return { domain, dr: null, status: "auth_required" as const };
  }

  const apiUrl = new URL("https://api.ahrefs.com/v3/public/domain-rating-free");
  apiUrl.searchParams.set("target", domain);
  apiUrl.searchParams.set("output", "json");

  const response = await fetch(apiUrl, {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${AHREFS_API_KEY}`,
      "user-agent": "FreeDRChecker/1.0"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      return { domain, dr: null, status: "auth_required" as const };
    }

    return {
      domain,
      dr: null,
      status: response.status === 404 ? "not_found" : "unavailable" as DrStatus
    };
  }

  const data = await response.json();
  const dr = data?.domain_rating?.domain_rating;

  if (typeof dr !== "number") {
    return { domain, dr: null, status: "unavailable" as const };
  }

  return { domain, dr: Math.round(dr), status: "ok" as const };
}

function domainRatingError(status: DrStatus) {
  if (status === "auth_required") {
    return {
      message: "Domain Rating data is temporarily unavailable while the Ahrefs API key is being configured.",
      status: 503
    };
  }

  return {
    message: "Unable to fetch Domain Rating.",
    status: 502
  };
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
      const error = domainRatingError(result.status);
      return NextResponse.json({ error: error.message }, { status: error.status });
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

    if (results.some((result) => result.status === "auth_required")) {
      const error = domainRatingError("auth_required");
      return NextResponse.json({ error: error.message }, { status: error.status });
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
