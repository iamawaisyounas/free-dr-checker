import { NextRequest, NextResponse } from "next/server";

function normalizeDomain(value: string | null) {
  return String(value || "")
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

export async function GET(request: NextRequest) {
  const domain = normalizeDomain(request.nextUrl.searchParams.get("domain"));

  if (!domain) {
    return NextResponse.json({ error: "Please enter a domain." }, { status: 400 });
  }

  if (!isValidDomain(domain)) {
    return NextResponse.json({ error: "Please enter a valid website address." }, { status: 400 });
  }

  try {
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
      return NextResponse.json(
        { error: "Unable to fetch Domain Rating." },
        { status: response.status >= 500 ? 502 : response.status }
      );
    }

    const data = await response.json();
    const dr = data?.domain_rating?.domain_rating;

    if (typeof dr !== "number") {
      return NextResponse.json({ error: "Unable to fetch Domain Rating." }, { status: 502 });
    }

    return NextResponse.json({ domain, dr: Math.round(dr) });
  } catch {
    return NextResponse.json({ error: "Unable to fetch Domain Rating." }, { status: 502 });
  }
}
