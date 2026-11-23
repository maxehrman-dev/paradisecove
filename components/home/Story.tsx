import Link from "next/link";
import ParallaxPhoto from "../ParallaxPhoto";

const LINES = ["The big surf brands lost their touch.", "We make pieces about real places.", "Born in Paradise Cove, sold in La Jolla."];

/** 6. Story: three short lines beside a real shoreline that runs flush to the right edge. */
export default function Story() {
  return (
    <section aria-labelledby="story" className="grid bg-paper md:grid-cols-2">
      <div className="edge-l grid content-center justify-items-start gap-8 py-20 md:py-28">
        <h2 id="story" className="eyebrow">Our story</h2>
        <div className="grid gap-5">
          {LINES.map((l) => <p key={l} className="pc-head text-[clamp(26px,3.4vw,46px)] text-balance">{l}</p>)}
        </div>
        <Link href="/story" className="link-line">Read the story <span aria-hidden="true">→</span></Link>
      </div>
      <ParallaxPhoto src="/assets/photos/stock-golden-shore.jpg" alt="Golden hour on the shoreline, small waves rolling in" strength={8} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/5] w-full md:aspect-auto md:min-h-[92svh]" />
    </section>
  );
}
