import type { Metadata } from "next";
import InstagramFeed from "@/components/InstagramFeed";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Find us", description: "Find Paradise Cove Surf Club at ATLAS, Westfield UTC, La Jolla. First drop coming soon." };

const Q = encodeURIComponent("ATLAS Westfield UTC La Jolla");

export default function FindUsPage() {
  return (
    <div className="bg-paper text-navy">
      <section aria-labelledby="find-title" className="grid md:grid-cols-2">
        <div className="edge-l grid content-center gap-7 py-16 md:py-24">
          <span className="eyebrow">Find us</span>
          <h1 id="find-title" className="pc-head text-[clamp(40px,6.4vw,76px)]">ATLAS at Westfield UTC</h1>
          <p className="text-[17px] text-navy/75">{SITE.city}. First drop coming soon.</p>
          <div className="grid gap-px border border-navy bg-navy sm:w-fit sm:grid-cols-2">
            <a className="btn bg-navy text-paper hover:bg-coral hover:text-navy" href={`https://maps.apple.com/?q=${Q}`} target="_blank" rel="noopener noreferrer">Apple Maps</a>
            <a className="btn bg-paper text-navy hover:bg-navy hover:text-paper" href={`https://www.google.com/maps/search/?api=1&query=${Q}`} target="_blank" rel="noopener noreferrer">Google Maps</a>
          </div>
          <dl className="mt-2 grid gap-5 border-t border-navy/15 pt-7 text-[15px]">
            <div><dt className="eyebrow">Instagram</dt><dd className="mt-2"><a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="underline decoration-coral decoration-2 underline-offset-4">{SITE.instagram.handle}</a></dd></div>
            <div><dt className="eyebrow">House rules</dt><dd className="mt-2 text-navy/80">{SITE.houseRules.map((r, i) => `${i + 1}. ${r}`).join(" · ")}</dd></div>
          </dl>
        </div>
        <div className="relative min-h-[360px] bg-cream md:min-h-[78svh]">
          <iframe title="Map: ATLAS at Westfield UTC, La Jolla" src={`https://www.google.com/maps?q=${Q}&output=embed`} className="absolute inset-0 block h-full w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
      <section aria-labelledby="drop" className="bg-cream py-24 md:py-32">
        <div className="wrap grid max-w-[640px] justify-items-center gap-5 text-center">
          <h2 id="drop" className="pc-head text-[clamp(32px,5vw,56px)]">First drop coming soon.</h2>
          <p className="text-[15px] leading-relaxed text-navy/75">Leave your email and we&apos;ll tell you the day it lands.</p>
          <a href="#signup" className="btn-solid mt-4">Get the drop email</a>
          <p className="eyebrow pt-8">{SITE.address} · {SITE.coords}</p>
        </div>
      </section>
      <InstagramFeed />
    </div>
  );
}
