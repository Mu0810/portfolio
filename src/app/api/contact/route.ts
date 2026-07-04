import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  // Anti-spam fields (see ContactForm.tsx):
  company?: string; // honeypot — real users never fill this
  ts?: number; // client timestamp of when the form was rendered
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NAME_MAX = 100;
const EMAIL_MAX = 200;
const MESSAGE_MAX = 5000;

// Minimum time (ms) a genuine human takes to fill the form. Bots submit instantly.
const MIN_SUBMIT_MS = 2000;

// --- Simple in-memory, per-IP rate limiter -------------------------------
// Note: in-memory state is per serverless instance and resets on cold start.
// It stops casual abuse cheaply; use a shared store (e.g. Upstash Redis) for
// strict, cross-instance guarantees.
const RATE_LIMIT = 5; // max requests
const RATE_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;
  const recent = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => t <= windowStart)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT;
}

function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  // Rate limit first — cheapest rejection.
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const payload = body as ContactPayload;

  // Honeypot: if the hidden field is filled, silently accept (don't tip off bots).
  if (typeof payload.company === "string" && payload.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Timing check: reject submissions that arrive implausibly fast.
  if (typeof payload.ts === "number" && Date.now() - payload.ts < MIN_SUBMIT_MS) {
    return NextResponse.json(
      { error: "Please take a moment before submitting." },
      { status: 400 }
    );
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and message." },
      { status: 400 }
    );
  }
  if (name.length > NAME_MAX) {
    return NextResponse.json(
      { error: `Name is too long (max ${NAME_MAX} characters).` },
      { status: 400 }
    );
  }
  if (email.length > EMAIL_MAX || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (message.length > MESSAGE_MAX) {
    return NextResponse.json(
      { error: `Message is too long (max ${MESSAGE_MAX} characters).` },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "0810sonimanish@gmail.com";
  // Resend's shared sender works out of the box; swap for your verified domain.
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  // Graceful fallback: if email isn't configured yet, tell the client so it
  // can offer a mailto: link instead of failing silently.
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "unconfigured",
        message:
          "The email service isn't configured yet. Please reach out by email directly.",
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        html: `
          <div style="font-family: system-ui, sans-serif; line-height: 1.6;">
            <h2 style="margin:0 0 12px;">New message from your portfolio</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error:", res.status, detail);
      return NextResponse.json(
        { error: "Could not send your message. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
