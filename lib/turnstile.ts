import { NextRequest, NextResponse } from "next/server";

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export function turnstileIsConfigured() {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstileToken(request: NextRequest, token: unknown) {
  if (!turnstileIsConfigured()) {
    return null;
  }

  if (typeof token !== "string" || !token.trim()) {
    return NextResponse.json({ error: "Please complete the bot protection check." }, { status: 400 });
  }

  const formData = new FormData();
  formData.append("secret", process.env.TURNSTILE_SECRET_KEY as string);
  formData.append("response", token);

  const ip = request.headers.get("cf-connecting-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  if (ip) {
    formData.append("remoteip", ip);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData
  }).catch((error) => {
    console.warn("Turnstile verification request failed", error);
    return null;
  });

  if (!response) {
    return NextResponse.json({ error: "Bot protection is temporarily unavailable. Please try again." }, { status: 503 });
  }

  const data = await response.json().catch(() => null) as TurnstileResponse | null;
  if (!data?.success) {
    console.warn("Turnstile verification failed", data?.["error-codes"]);
    return NextResponse.json({ error: "Bot protection check failed. Please try again." }, { status: 400 });
  }

  return null;
}
