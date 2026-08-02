import { incrementCounter } from "./kv-cache";

export async function checkRateLimit(key: string, limit: number, windowSeconds: number) {
  const count = await incrementCounter(key, 1, windowSeconds);

  if (!count) {
    return { ok: true, count: 0 };
  }

  return { ok: count <= limit, count };
}

export function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}
