import type { Metadata } from "next";
import Image from "next/image";
import ScrollSequence, { type Beat } from "@/components/ScrollSequence";
import PhotoBand from "@/components/PhotoBand";
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

const ridePlaque = "edge-l pb-8 md:pb-12";
function RideLine({ no, title, line }: { no: string; title: string; line: string }) {
  return (
    <div className={ridePlaque}>
      <div className="grid max-w-[460px] gap-3 border border-rust bg-cream p-6 md:p-8">
        <span className="cp-fine text-[10px] text-navy/60">{no}</span>
        <p className="cp-head text-[clamp(30px,4vw,54px)] text-rust">{title}</p>
        <p className="cp-quote text-lg leading-snug text-navy">{line}</p>
      </div>
    </div>
  );
}
const RIDE: Beat[] = [
  { from: 0.04, to: 0.3, children: <RideLine no="06:10 · Drop in" title="Early tide." line="First light, glassy, nobody out yet." /> },
  { from: 0.4, to: 0.64, children: <RideLine no="06:11 · Trim" title="Same crew." line="Since forever. Locals only, guests welcome." /> },
  { from: 0.76, to: 1, children: <RideLine no="06:12 · Kick out" title="Siesta next." line="Surf early. Nap often. Stay for sunset." /> },
];

export default function ClubParadisePage() {
  const tees = products.filter((p) => p.collection === "club-paradise");
  return (
    <div className="bg-cream text-navy">
      {/* Under the awning */}
      <section aria-labelledby="cp-title" className="relative">
        <Awning />
        <div className="grid md:grid-cols-2">
          <div className="edge-l grid content-center justify-items-center gap-6 py-14 text-center md:justify-items-start md:py-20 md:text-left">
            <span className="cp-fine text-navy/70">Men's · Surf Club</span>
            <h1 id="cp-title" className="cp-head text-[clamp(52px,5.2vw,84px)] text-rust">Club<br />Paradise</h1>
            <p className="cp-club text-sm sm:text-base">Surf · Siesta · Sunset</p>
            <p className="cp-quote max-w-[34ch] text-[clamp(19px,2.2vw,24px)] leading-snug">Early tide. Late sunsets. The same crew since forever. Locals only, guests welcome.</p>
            <p className="cp-fine border-t border-rust/40 pt-4 text-[9px] text-navy/55">Members since forever · {SITE.address} · {SITE.coords}</p>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto md:min-h-[78svh]">
            <Image src="/assets/photos/stock-club-crew-sunset.jpg" alt="Two surfers walking the beach at sunset, boards under their arms" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-[60%_50%]" />
          </div>
        </div>
      </section>

      {/* The ride, told by scroll */}
      <ScrollSequence
        desktop={{ dir: "/assets/scroll/ride-d", count: 110 }}
        length={300} fit="cover" mobileFit="contain" bg="#F4F0E4" poster={40}
        alt="A surfer drops in, rides the wave across, and kicks out as you scroll"
        beats={RIDE}
      />

      <StripeBand />

      {/* The Club Directory */}
      <section aria-labelledby="directory" className="bg-paper py-16 md:py-24">
        <div className="wrap">
          <Reveal className="mb-10 grid gap-3 md:mb-14 md:grid-cols-[1fr_auto] md:items-end">
            <div className="grid gap-3">
              <span className="cp-fine text-[10px] text-navy/55">Eight rooms · One clubhouse</span>
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
      <section aria-labelledby="rules" className="bg-cream py-16 md:py-20">
        <div className="wrap grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
          <h2 id="rules" className="cp-head text-[clamp(36px,5vw,60px)] text-rust">House<br className="max-md:hidden" /> Rules</h2>
          <ol className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
            {SITE.houseRules.map((r, i) => (
              <li key={r} className="grid gap-2 border-t border-rust pt-4">
                <span className="font-club text-3xl font-black text-rust [font-stretch:125%]">{i + 1}</span>
                <span className="cp-club text-[13px] text-rust">{r}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PhotoBand club tone="cream" src="/assets/photos/stock-club-palm.jpg" alt="A single palm against a clear teal sky" eyebrow="Club Paradise · Men's" title="Members since forever." line="Locals only, guests welcome." position="50% 40%" />

      <StripeBand />

      {/* The rack */}
      <section aria-labelledby="rack" className="bg-paper pt-16 md:pt-24">
        <div className="wrap">
          <Reveal className="mb-10 grid gap-3 md:mb-14 md:grid-cols-[1fr_auto] md:items-end">
            <div className="grid gap-3">
              <span className="cp-fine text-[10px] text-navy/55">Tees · $40 · {LAUNCHED ? SITE.where : "First drop coming soon"}</span>
              <h2 id="rack" className="cp-head text-[clamp(40px,7vw,84px)]">The Rack</h2>
            </div>
            <p className="cp-quote max-w-[32ch] text-lg">Real places, printed on heavy cotton. The back is the point.</p>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-px border-t border-navy/10 bg-navy/10 md:grid-cols-3 lg:grid-cols-4">
          {tees.map((p) => <ProductCard key={p.id} p={p} accent="rust" />)}
          {/* Fill the last row so the hairline grid ends flush at every width. */}
          {(2 - (tees.length % 2)) % 2 > 0 && <div aria-hidden="true" className="bg-paper md:hidden" />}
          {(3 - (tees.length % 3)) % 3 > 0 && <div aria-hidden="true" className="hidden bg-paper md:block lg:hidden" style={{ gridColumn: `span ${(3 - (tees.length % 3)) % 3}` }} />}
          {(4 - (tees.length % 4)) % 4 > 0 && <div aria-hidden="true" className="hidden bg-paper lg:block" style={{ gridColumn: `span ${(4 - (tees.length % 4)) % 4}` }} />}
        </div>
      </section>
    </div>
  );
}
