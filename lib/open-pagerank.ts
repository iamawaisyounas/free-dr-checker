const BASE_URL = "https://openpagerank.keywordseverywhere.com/v1";

export type OpenPageRankHistoryPoint = {
  date: string;
  open_page_rank: number | null;
  estimated?: boolean;
};

export type OpenPageRankRow = {
  domain: string;
  found?: boolean;
  open_page_rank: number | null;
  rank?: number | null;
  referring_domains?: number | null;
  history?: OpenPageRankHistoryPoint[];
};

export async function fetchAuthorityScores(domains: string[]) {
  if (domains.length > 100) {
    throw new Error("Open PageRank bulk endpoint accepts max 100 domains per request");
  }

  if (!process.env.OPEN_PAGERANK_API_KEY) {
    throw new Error("Missing OPEN_PAGERANK_API_KEY");
  }

  const res = await fetch(`${BASE_URL}/domains/bulk`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPEN_PAGERANK_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ domains, include_history: true }),
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error(`Open PageRank API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<{ results?: OpenPageRankRow[]; invalid?: string[] }>;
}

export async function fetchOpenPageRankUsage() {
  if (!process.env.OPEN_PAGERANK_API_KEY) {
    return null;
  }

  const res = await fetch(`${BASE_URL}/usage`, {
    headers: { Authorization: `Bearer ${process.env.OPEN_PAGERANK_API_KEY}` },
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error(`Open PageRank usage API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<{
    monthly_domain_limit: number;
    domains_used: number;
    domains_remaining: number;
    resets_at: string;
  }>;
}
