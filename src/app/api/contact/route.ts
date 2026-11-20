import { NextResponse } from "next/server";

// In-memory limiter: resets on cold starts. Good enough to start; use Upstash/Vercel KV later if abused.
const hits = new Map<string, number[]>();
const TYPES = ["Research collaboration", "Academic opportunity", "Professional opportunity", "General inquiry"];
const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  if (recent.length >= 5) return fail("Too many messages. Please try again later.", 429);

  let d: Record<string, unknown>;
  try { d = await req.json(); } catch { return fail("Invalid request.", 400); }
  if (d.website) return NextResponse.json({ ok: true }); // honeypot: silently drop bots

  const name = String(d.name ?? "").trim();
  const email = String(d.email ?? "").trim();
  const org = String(d.org ?? "").trim();
  const type = String(d.type ?? "");
  const message = String(d.message ?? "").trim();
  if (!name || name.length > 100) return fail("Please enter your name.", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 150) return fail("Please enter a valid email.", 400);
  if (!TYPES.includes(type)) return fail("Please choose an inquiry type.", 400);
  if (message.length < 10 || message.length > 2000) return fail("Message must be 10 to 2000 characters.", 400);

  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL, from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) return fail("The contact form is not configured yet. Please email directly.", 503);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from, to: [to], reply_to: email,
      subject: `[Portfolio] ${type} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nOrganization: ${org || "-"}\nType: ${type}\n\n${message}`,
    }),
  });
  if (!res.ok) return fail("Could not send your message. Please email directly.", 502);
  hits.set(ip, [...recent, now]);
  return NextResponse.json({ ok: true });
}
