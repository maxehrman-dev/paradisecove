import Link from "next/link";
import ParallaxPhoto from "../ParallaxPhoto";

const LINES = ["The big surf brands lost their touch.", "We make pieces about real places.", "Born in Paradise Cove, sold in La Jolla."];

/** 6. Story: three short lines beside a real shoreline. */
export default function Story() {
  return (
    <section aria-labelledby="story" className="relative overflow-hidden bg-paper py-20 md:py-28">
      <div className="wrap relative z-10 grid items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <div className="grid justify-items-start gap-6">
          <h2 id="story" className="pc-label text-navy/60">Our story</h2>
          <div className="grid gap-4">
            {LINES.map((l) => <p key={l} className="pc-head text-[clamp(26px,3.8vw,48px)] text-balance">{l}</p>)}
          </div>
          <Link href="/story" className="pc-label mt-2 inline-flex min-h-[44px] items-center gap-2 border-b-2 border-navy">Read the story <span aria-hidden="true">→</span></Link>
        </div>
        <ParallaxPhoto src="/assets/photos/stock-golden-shore.jpg" alt="Golden hour on the shoreline, small waves rolling in" strength={8} sizes="(min-width: 768px) 45vw, 100vw" className="aspect-[4/5] w-full rounded-[6px]" />
      </div>
    </section>
  );
}
