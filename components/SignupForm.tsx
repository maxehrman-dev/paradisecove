"use client";
import { useState } from "react";

export default function SignupForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const dark = tone === "dark";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setState("error"); setMsg("That email looks off. Check it and try again."); return; }
    setState("sending");
    try {
      const res = await fetch("/api/signup", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { setState("done"); setMsg("You're on the list. First drop coming soon."); }
      else { setState("error"); setMsg(data.error || "Couldn't save that. Try again in a minute."); }
    } catch { setState("error"); setMsg("Couldn't reach us. Check your connection and try again."); }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3">
      <label htmlFor={`email-${tone}`} className={`pc-label ${dark ? "text-coral" : "text-rose"}`}>First drop email</label>
      <div className="flex flex-wrap gap-2">
        <input id={`email-${tone}`} name="email" type="email" autoComplete="email" required placeholder="you@email.com" disabled={state === "done"}
          className={`min-h-[48px] min-w-0 flex-1 basis-56 rounded-full border px-5 font-label text-base outline-none ${dark ? "border-cream/40 bg-transparent text-cream placeholder:text-cream/50 focus:border-coral" : "border-navy/30 bg-paper text-navy placeholder:text-navy/40 focus:border-navy"}`} />
        <button type="submit" disabled={state === "sending" || state === "done"}
          className={`min-h-[48px] rounded-full px-6 pc-label transition-colors disabled:opacity-60 ${dark ? "bg-coral text-navy hover:bg-cream" : "bg-navy text-cream hover:bg-rose"}`}>
          {state === "sending" ? "Sending" : state === "done" ? "Done" : "Notify me"}
        </button>
      </div>
      <p role="status" aria-live="polite" className={`min-h-[1.5em] text-sm ${dark ? "text-cream/80" : "text-navy/80"}`}>{msg}</p>
    </form>
  );
}
