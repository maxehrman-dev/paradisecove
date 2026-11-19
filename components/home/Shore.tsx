import Image from "next/image";
import Link from "next/link";
import Waterline from "../Waterline";
import { SWELL, CHOP } from "../waves";

/** 1. Shore: paper, the wave logo, Sun · Salt · Surf, and a real photo from the water. */
export default function Shore() {
  return (
    <section aria-label="Paradise Cove Surf Club" className="relative bg-paper">
      <div className="wrap grid items-center gap-8 pb-12 pt-6 md:min-h-[calc(100svh-84px)] md:grid-cols-[1fr_1.05fr] md:gap-14 md:pb-16 md:pt-10">
        <div className="grid justify-items-center gap-5 text-center md:justify-items-start md:text-left">
          <h1 className="sr-only">Paradise Cove Surf Club</h1>
          <Image src="/assets/logos/wave-navy.png" alt="Paradise Cove" width={1173} height={748} priority className="logo-fade h-auto w-[min(500px,84%)]" />
          <p className="pc-label text-[13px] tracking-[.36em] sm:text-sm">Sun · Salt · Surf</p>
          <p className="max-w-[32ch] text-base text-navy/80">Locals since forever. Born in Paradise Cove, sold in La Jolla.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3 md:justify-start">
            <Link href="/paradise-cove" className="pc-label inline-flex min-h-[48px] items-center rounded-full bg-navy px-6 text-cream transition-colors hover:bg-coral hover:text-navy">Paradise Cove · Women&apos;s</Link>
            <Link href="/club-paradise" className="pc-label inline-flex min-h-[48px] items-center rounded-full border-2 border-navy px-6 transition-colors hover:bg-navy hover:text-cream">Club Paradise · Men&apos;s</Link>
          </div>
        </div>
        <figure className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[6px] max-md:max-h-[64svh]">
            <Image src="/assets/photos/lifestyle-wakesurf.jpg" alt="A member surfing a boat wake in the navy Paradise Cove hoodie" fill priority sizes="(min-width: 768px) 52vw, 100vw" className="object-cover object-[50%_40%]" />
          </div>
          <figcaption className="pc-label mt-3 text-[10px] text-navy/60">On the water · the navy hoodie</figcaption>
        </figure>
      </div>
      <Waterline line color="#1C2B4A" height={44} comps={SWELL} scale={0.9} duration={18} />
      <Waterline line color="#1C2B4A" height={30} comps={CHOP} scale={0.7} duration={26} reverse className="-mt-6 opacity-35" />
    </section>
  );
}
