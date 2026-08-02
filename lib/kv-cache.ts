import { kv } from "@vercel/kv";

export const isKvConfigured = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

export async function getCachedJson<T>(key: string) {
  if (!isKvConfigured) {
    return null;
  }

  try {
    return await kv.get<T>(key);
  } catch (error) {
    console.warn(`KV read failed for ${key}`, error);
    return null;
  }
}

export async function setCachedJson<T>(key: string, value: T, ttlSeconds: number) {
  if (!isKvConfigured) {
    return;
  }

  try {
    await kv.set(key, value, { ex: ttlSeconds });
  } catch (error) {
    console.warn(`KV write failed for ${key}`, error);
  }
}

export async function incrementCounter(key: string, amount: number, ttlSeconds: number) {
  if (!isKvConfigured || amount <= 0) {
    return 0;
  }

  try {
    const value = await kv.incrby(key, amount);
    await kv.expire(key, ttlSeconds);
    return value;
  } catch (error) {
    console.warn(`KV increment failed for ${key}`, error);
    return 0;
  }
}

export async function getCounter(key: string) {
  const value = await getCachedJson<number>(key);
  return typeof value === "number" ? value : Number(value || 0);
}

export function secondsUntilMonthBuffer(now = new Date()) {
  const nextMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
  return Math.max(86400, Math.ceil((nextMonth.getTime() - now.getTime()) / 1000) + 7 * 86400);
}

export function currentUsageKey(now = new Date()) {
  return `usage:openpagerank:${now.toISOString().slice(0, 7)}`;
}
