import type { Metadata } from "next";
import InstagramFeed from "@/components/InstagramFeed";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Find us", description: "Find Paradise Cove Surf Club at ATLAS, Westfield UTC, La Jolla. First drop coming soon." };

const Q = encodeURIComponent("ATLAS Westfield UTC La Jolla");

export default function FindUsPage() {
  return (
    <div className="bg-paper text-navy">
      <section aria-labelledby="find-title" className="wrap grid gap-12 pb-20 pt-16 md:grid-cols-[1fr_1.1fr] md:gap-16 md:pt-24">
        <div className="grid content-start gap-6">
          <span className="pc-label text-navy/60">Find us</span>
          <h1 id="find-title" className="pc-head text-[clamp(40px,6.4vw,76px)]">ATLAS at Westfield UTC</h1>
          <p className="text-lg text-navy/85">{SITE.city}. First drop coming soon.</p>
          <div className="flex flex-wrap gap-3">
            <a className="pc-label inline-flex min-h-[48px] items-center rounded-full bg-navy px-6 text-cream transition-colors hover:bg-coral hover:text-navy" href={`https://maps.apple.com/?q=${Q}`} target="_blank" rel="noopener noreferrer">Apple Maps</a>
            <a className="pc-label inline-flex min-h-[48px] items-center rounded-full border-2 border-navy px-6 transition-colors hover:bg-navy hover:text-cream" href={`https://www.google.com/maps/search/?api=1&query=${Q}`} target="_blank" rel="noopener noreferrer">Google Maps</a>
          </div>
          <dl className="mt-4 grid gap-5 border-t border-navy/15 pt-6">
            <div><dt className="pc-label text-navy/60">Instagram</dt><dd className="mt-1"><a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="underline decoration-coral decoration-2 underline-offset-4">{SITE.instagram.handle}</a></dd></div>
            <div><dt className="pc-label text-navy/60">House rules</dt><dd className="mt-1">{SITE.houseRules.map((r, i) => `${i + 1}. ${r}`).join(" · ")}</dd></div>
          </dl>
        </div>
        <div className="overflow-hidden rounded-[6px] border-2 border-navy bg-cream">
          <iframe title="Map: ATLAS at Westfield UTC, La Jolla" src={`https://www.google.com/maps?q=${Q}&output=embed`} className="block aspect-[4/3] h-auto w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
      <section aria-labelledby="drop" className="bg-cream py-16 md:py-20">
        <div className="wrap grid max-w-[640px] justify-items-center gap-4 text-center">
          <h2 id="drop" className="pc-head text-[clamp(32px,5vw,56px)]">First drop coming soon.</h2>
          <p className="text-navy/80">Wish you were here. Leave your email and we&apos;ll tell you the day it lands.</p>
          <a href="#signup" className="pc-label mt-2 inline-flex min-h-[48px] items-center rounded-full bg-navy px-7 text-cream transition-colors hover:bg-coral hover:text-navy">Get the drop email</a>
          <p className="pc-label pt-6 text-[10px] text-navy/60">{SITE.address} · {SITE.coords}</p>
        </div>
      </section>
      <InstagramFeed />
    </div>
  );
}
