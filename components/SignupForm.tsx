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
    <form data-signup="" onSubmit={onSubmit} noValidate className="grid gap-3">
      <label htmlFor={`email-${tone}`} className={`pc-label text-[10px] tracking-[.34em] ${dark ? "text-cream/60" : "text-navy/55"}`}>First drop email</label>
      <div className={`flex items-stretch border-b ${dark ? "border-cream/50 focus-within:border-coral" : "border-navy focus-within:border-navy"}`}>
        <input id={`email-${tone}`} name="email" type="email" autoComplete="email" required placeholder="you@email.com" disabled={state === "done"}
          className={`min-h-[52px] min-w-0 flex-1 bg-transparent font-label text-base outline-none focus-visible:outline-none ${dark ? "text-cream placeholder:text-cream/40" : "text-navy placeholder:text-navy/40"}`} />
        <button type="submit" disabled={state === "sending" || state === "done"}
          className={`min-h-[52px] shrink-0 pl-4 pc-label text-[10.5px] tracking-[.3em] transition-colors disabled:opacity-60 ${dark ? "text-coral hover:text-cream" : "text-navy hover:text-coral"}`}>
          {state === "sending" ? "Sending" : state === "done" ? "Done" : <>Notify me <span aria-hidden="true">→</span></>}
        </button>
      </div>
      <p role="status" aria-live="polite" className={`min-h-[1.5em] text-sm ${dark ? "text-cream/80" : "text-navy/80"}`}>{msg}</p>
    </form>
  );
}
