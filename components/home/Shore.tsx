import Image from "next/image";
import Waterline from "../Waterline";
import Slot from "../Slot";

/** 1. Shore: paper, wave logo, Sun · Salt · Surf, one lifestyle slot, a rolling waterline along the bottom. */
export default function Shore() {
  return (
    <section aria-label="Paradise Cove Surf Club" className="relative bg-paper">
      <div className="wrap grid items-center gap-10 pb-14 pt-8 md:grid-cols-[1.05fr_1fr] md:gap-16 md:pb-20 md:pt-14">
        <div className="grid justify-items-center gap-6 text-center md:justify-items-start md:text-left">
          <h1 className="sr-only">Paradise Cove Surf Club</h1>
          <Image src="/assets/logos/wave-navy.png" alt="Paradise Cove" width={1173} height={748} priority className="logo-fade h-auto w-[min(520px,88%)]" />
          <p className="pc-label text-[13px] tracking-[.36em] sm:text-sm">Sun · Salt · Surf</p>
          <p className="max-w-[30ch] text-base text-navy/80">Locals since forever. Born in Paradise Cove, sold in La Jolla.</p>
        </div>
        <Slot file="lifestyle-shore.jpg" label="Lifestyle photo · the shore" className="aspect-[4/5] w-full max-md:max-h-[60svh]" />
      </div>
      <Waterline line color="#1C2B4A" height={36} amp={9} period={240} duration={14} />
      <Waterline line color="#1C2B4A" height={26} amp={6} period={300} duration={22} reverse className="-mt-5 opacity-40" />
    </section>
  );
}
