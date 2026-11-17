import { NextResponse } from "next/server";

/** Email signup. Forwards to SIGNUP_WEBHOOK_URL when set (Resend, Supabase, Zapier...). Until then it says so honestly. */
export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({ email: "" }));
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return NextResponse.json({ error: "That email looks off. Check it and try again." }, { status: 400 });
  }
  const hook = process.env.SIGNUP_WEBHOOK_URL;
  if (!hook) {
    return NextResponse.json({ error: "Signups open soon. Follow @paradisecovesurf for the drop." }, { status: 503 });
  }
  const res = await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, source: "pcsc-site", at: new Date().toISOString() }) });
  if (!res.ok) return NextResponse.json({ error: "Couldn't save that. Try again in a minute." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
