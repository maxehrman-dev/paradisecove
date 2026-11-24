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
      <div className="edge-r bg-paper pb-10 pt-8 md:ml-auto md:w-[calc(max(0px,(100vw-1240px)/2)+600px)] md:pb-12 md:pt-12">
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
          <p className="eyebrow hidden md:block">Scroll · ride it in</p>
        </div>
      </div>
    ),
  },
  { from: 0.36, to: 0.58, children: <Line eyebrow="Paradise Cove" title="First light, first wave." line="Paddle out before the wind comes up." /> },
  { from: 0.74, to: 1, children: <Line eyebrow="Two collections" title="Pick a side." line="Paradise Cove for the beach side. Club Paradise for the clubhouse." /> },
];

/** 1. The first wave, told by scroll: a surfer drops in on the first frame and kicks out on the last. */
export default function Shore() {
  return (
    <>
      <h1 className="sr-only">Paradise Cove Surf Club</h1>
      <ScrollSequence
        desktop={{ dir: "/assets/scroll/wave-d", count: 120 }}
        mobile={{ dir: "/assets/scroll/wave-m", count: 120 }}
        length={300} poster={40} bg="#1C2B4A"
        alt="A surfer drops into a morning wave, rides it across and kicks out as you scroll"
        beats={BEATS}
      />
    </>
  );
}
