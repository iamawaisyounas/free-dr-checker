import { NextRequest, NextResponse } from "next/server";
import { currentUsageKey, getCounter } from "../../../../lib/kv-cache";
import { fetchOpenPageRankUsage } from "../../../../lib/open-pagerank";

export const runtime = "nodejs";

const WARNING_THRESHOLD = 0.8;

async function sendAlert(message: string) {
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

function isAuthorizedCron(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const providedSecret = request.headers.get("x-cron-secret") || request.nextUrl.searchParams.get("secret");

  return request.headers.get("x-vercel-cron") === "1"
    || Boolean(secret && providedSecret === secret);
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const localUsage = await getCounter(currentUsageKey());
  const providerUsage = await fetchOpenPageRankUsage().catch((error) => {
    console.warn("Open PageRank usage lookup failed", error);
    return null;
  });

  const used = providerUsage?.domains_used ?? localUsage;
  const limit = providerUsage?.monthly_domain_limit ?? 30000;
  const ratio = limit ? used / limit : 0;

  if (ratio >= WARNING_THRESHOLD) {
    await sendAlert(`OpenPageRank usage is at ${used}/${limit} domains this month.`);
  }

  return NextResponse.json({
    ok: true,
    local_usage: localUsage,
    provider_usage: providerUsage,
    warning: ratio >= WARNING_THRESHOLD
  });
}
