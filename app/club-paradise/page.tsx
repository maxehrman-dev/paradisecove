import type { Metadata } from "next";
import Image from "next/image";
import WaveWipe from "@/components/WaveWipe";
import ClubCard from "@/components/club/ClubCard";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { Awning } from "@/components/home/Riviera";
import { clubs, products, productById } from "@/lib/catalog";
import { SITE, LAUNCHED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Club Paradise · Men's",
  description: "Club Paradise. Surf club streetwear from Paradise Cove Surf Club. Surf · Siesta · Sunset. Members since forever.",
};

/** A thin band of rust and cream awning stripes, used between sections. */
function StripeBand() {
  return (
    <div aria-hidden="true">
      <svg className="block h-5 w-full" preserveAspectRatio="none" viewBox="0 0 96 10">
        <defs><pattern id="band" width="16" height="10" patternUnits="userSpaceOnUse"><rect width="8" height="10" fill="#C2603A" /><rect x="8" width="8" height="10" fill="#F4F0E4" /></pattern></defs>
        <rect width="96" height="10" fill="url(#band)" />
      </svg>
      <Awning />
    </div>
  );
}

export default function ClubParadisePage() {
  const tees = products.filter((p) => p.collection === "club-paradise");
  return (
    <div className="bg-cream text-navy">
      <WaveWipe />

      {/* Under the awning */}
      <section aria-labelledby="cp-title" className="relative">
        <Awning />
        <div className="wrap grid items-center gap-10 pb-16 pt-10 md:grid-cols-[1fr_1.15fr] md:gap-14 md:pb-24 md:pt-14">
          <div className="grid justify-items-center gap-5 text-center md:justify-items-start md:text-left">
            <span className="cp-fine text-navy/70">Men's · Surf Club</span>
            <h1 id="cp-title" className="cp-head text-[clamp(52px,8vw,112px)] text-rust">Club<br />Paradise</h1>
            <p className="cp-club text-sm sm:text-base">Surf · Siesta · Sunset</p>
            <p className="cp-quote max-w-[34ch] text-[clamp(19px,2.2vw,24px)] leading-snug">Early tide. Late sunsets. The same crew since forever. Locals only, guests welcome.</p>
            <p className="cp-fine text-[10px] text-navy/60">Members since forever · {SITE.address} · {SITE.coords}</p>
          </div>
          <div className="relative aspect-[5/4] w-full overflow-hidden border-[3px] border-rust">
            <Image src="/assets/photos/barrel.jpg" alt="A surfer carving a wave below the bluffs" fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <StripeBand />

      {/* The Club Directory */}
      <section aria-labelledby="directory" className="bg-paper py-16 md:py-24">
        <div className="wrap">
          <Reveal className="mb-10 grid gap-3 md:mb-14 md:grid-cols-[1fr_auto] md:items-end">
            <div className="grid gap-3">
              <span className="cp-fine text-navy/60">Eight rooms · One clubhouse</span>
              <h2 id="directory" className="cp-head text-[clamp(40px,7vw,84px)]">The Club Directory</h2>
            </div>
            <p className="cp-quote max-w-[30ch] text-lg">Every room has its own card. Flip one to see what&apos;s inside.</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {clubs.map((c, i) => <ClubCard key={c.id} club={c} index={i} product={productById(c.product)} />)}
          </div>
        </div>
      </section>

      {/* House Rules */}
      <section aria-labelledby="rules" className="border-y-[3px] border-rust bg-cream py-12 md:py-16">
        <div className="wrap grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
          <h2 id="rules" className="cp-head text-[clamp(36px,5vw,60px)] text-rust">House<br className="max-md:hidden" /> Rules</h2>
          <ol className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
            {SITE.houseRules.map((r, i) => (
              <li key={r} className="grid gap-1 border-t-2 border-rust pt-3">
                <span className="font-club text-3xl font-black text-rust [font-stretch:125%]">{i + 1}</span>
                <span className="cp-club text-[13px] text-rust">{r}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <StripeBand />

      {/* The rack */}
      <section aria-labelledby="rack" className="bg-paper py-16 md:py-24">
        <div className="wrap">
          <Reveal className="mb-10 grid gap-3 md:mb-14 md:grid-cols-[1fr_auto] md:items-end">
            <div className="grid gap-3">
              <span className="cp-fine text-navy/60">Tees · $40 · {LAUNCHED ? SITE.where : "First drop coming soon"}</span>
              <h2 id="rack" className="cp-head text-[clamp(40px,7vw,84px)]">The Rack</h2>
            </div>
            <p className="cp-quote max-w-[32ch] text-lg">Real places, printed on heavy cotton. The back is the point.</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
            {tees.map((p) => <ProductCard key={p.id} p={p} accent="rust" />)}
          </div>
        </div>
      </section>
    </div>
  );
}
