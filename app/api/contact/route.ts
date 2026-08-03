import { NextRequest, NextResponse } from "next/server";

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "support@dr-checker.com";
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanText(value: unknown, maxLength: number) {
  return String(value || "").trim().slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid contact form submission." }, { status: 400 });
  }

  const name = cleanText(payload.name, 120);
  const email = cleanText(payload.email, 240);
  const message = cleanText(payload.message, 5000);
  const website = cleanText(payload.website, 240);

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter your name, email, and message." }, { status: 400 });
  }

  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL) {
    return NextResponse.json({ error: "Contact form email is not configured yet." }, { status: 503 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `New DR Checker contact form message from ${name}`,
      text: [
        "New message from the DR Checker contact form.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message
      ].join("\n")
    })
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Unable to send your message right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
