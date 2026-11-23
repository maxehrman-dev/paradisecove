import Image from "next/image";
import Link from "next/link";
import ScrollSequence, { type Beat } from "../ScrollSequence";

const plaque = "edge-l bg-paper py-9 md:w-[calc(max(0px,(100vw-1240px)/2)+600px)] md:py-12";

function Line({ eyebrow, title, line }: { eyebrow: string; title: string; line: string }) {
  return (
    <div className={plaque}>
      <div className="grid max-w-[440px] gap-3">
        <span className="eyebrow">{eyebrow}</span>
        <p className="pc-head text-[clamp(34px,4.4vw,58px)]">{title}</p>
        <p className="text-[15px] leading-relaxed text-navy/75">{line}</p>
      </div>
    </div>
  );
}

const BEATS: Beat[] = [
  {
    from: 0, to: 0.22,
    children: (
      <div className={`${plaque} pb-10 pt-8`}>
        <div className="grid max-w-[440px] justify-items-start gap-6">
          <Image src="/assets/logos/wave-navy.png" alt="Paradise Cove" width={1173} height={748} priority className="logo-fade h-auto w-[min(260px,62%)]" />
          <div className="grid gap-3">
            <p className="eyebrow text-navy">Sun · Salt · Surf</p>
            <p className="text-[15px] leading-relaxed text-navy/75">Locals since forever. Born in Paradise Cove, sold in La Jolla.</p>
          </div>
          <div className="grid w-full grid-cols-1 gap-px border border-navy bg-navy sm:grid-cols-2">
            <Link href="/paradise-cove" className="btn bg-navy text-paper hover:bg-coral hover:text-navy">Women&apos;s</Link>
            <Link href="/club-paradise" className="btn bg-paper text-navy hover:bg-navy hover:text-paper">Men&apos;s</Link>
          </div>
          <p className="eyebrow hidden md:block">Scroll · walk in</p>
        </div>
      </div>
    ),
  },
  { from: 0.36, to: 0.58, children: <Line eyebrow="Paradise Cove" title="Start on the sand." line="Early tide, cold feet, the whole crew out." /> },
  { from: 0.72, to: 1, children: <Line eyebrow="La Jolla, California" title="Wish you were here." line="Two collections. One surf club. Pick a side below." /> },
];

/** 1. Shore: a drone shot told by scroll. First frame is the sand; scrolling walks you out into the whitewater. */
export default function Shore() {
  return (
    <>
      <h1 className="sr-only">Paradise Cove Surf Club</h1>
      <ScrollSequence
        desktop={{ dir: "/assets/scroll/shore-d", count: 120 }}
        mobile={{ dir: "/assets/scroll/shore-m", count: 120 }}
        length={340} poster={0} bg="#F4F0E4"
        alt="From above: waves washing up the sand, then open whitewater as you scroll"
        beats={BEATS}
      />
    </>
  );
}
