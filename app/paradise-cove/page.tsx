import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Slot from "@/components/Slot";
import Reveal from "@/components/Reveal";
import Waterline from "@/components/Waterline";
import SizeBySwell from "@/components/home/SizeBySwell";
import { SWELL } from "@/components/waves";
import { productById } from "@/lib/catalog";
import { SITE, LAUNCHED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Paradise Cove · Women's",
  description: "Paradise Cove. Soft, coastal, embroidered. The off-shoulder crewneck, $65. Sun · Salt · Surf.",
};

export default function ParadiseCovePage() {
  const p = productById("off-shoulder-crewneck")!;
  const slots = p.slots!;
  return (
    <div className="bg-paper text-navy">
      {/* Quiet opening */}
      <section aria-labelledby="pc-title" className="relative">
        <div className="wrap grid justify-items-center gap-6 pb-20 pt-16 text-center md:pb-28 md:pt-24">
          <h1 id="pc-title" className="sr-only">Paradise Cove, women&apos;s</h1>
          <span className="pc-label text-navy/60">Women&apos;s</span>
          <Image src="/assets/logos/script-navy.png" alt="Paradise Cove" width={1022} height={193} priority className="logo-fade h-auto w-[min(620px,86%)]" />
          <span className="h-[2px] w-16 bg-coral" aria-hidden="true" />
          <p className="pc-head text-[clamp(22px,3.2vw,34px)] tracking-[.24em]">Sun · Salt · Surf</p>
          <p className="max-w-[34ch] text-navy/80">Soft, coastal, embroidered. Wish you were here.</p>
        </div>
        <Waterline line color="#E8A0B4" height={40} comps={SWELL} scale={0.8} duration={34} />
      </section>

      {/* The crewneck, front and back */}
      <section aria-labelledby="crewneck" className="py-20 md:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-20">
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal slow><Slot file={slots.front} label="Off-shoulder crewneck · front" tone="cream" className="aspect-[4/5] w-full" /></Reveal>
            <Reveal slow delay={0.15}><Slot file={slots.back} label="Off-shoulder crewneck · back" tone="cream" className="aspect-[4/5] w-full" /></Reveal>
          </div>
          <Reveal slow delay={0.1} className="grid content-start gap-6 lg:sticky lg:top-40">
            <span className="pc-label text-navy/60">The hero piece</span>
            <h2 id="crewneck" className="pc-head text-[clamp(36px,5vw,60px)]">{p.name}</h2>
            <p className="font-cove text-3xl font-black">${p.price}</p>
            <ul className="grid gap-2 border-t-2 border-coral pt-5">
              {p.details!.map((d) => <li key={d} className="flex gap-3"><span className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-coral" aria-hidden="true" />{d}</li>)}
            </ul>
            <p className="pc-label text-[10px] text-navy/70">{LAUNCHED ? SITE.where : `First drop coming soon · ${SITE.store}`}</p>
            <Link href="/find-us" className="pc-label inline-flex min-h-[48px] w-fit items-center rounded-full bg-navy px-7 text-cream transition-colors hover:bg-coral hover:text-navy">Find us</Link>
          </Reveal>
        </div>
      </section>

      {/* Embroidery, up close */}
      <section aria-labelledby="details" className="bg-cream py-20 md:py-28">
        <div className="wrap grid gap-10">
          <Reveal slow className="grid justify-items-center gap-3 text-center">
            <span className="pc-label text-navy/60">Up close</span>
            <h2 id="details" className="pc-head text-[clamp(30px,4.4vw,48px)]">Pink thread, by hand</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {slots.details.map(([file, label], i) => (
              <Reveal slow delay={i * 0.12} key={file}><Slot file={file} label={label} tone="paper" className="aspect-square w-full" /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <SizeBySwell />
    </div>
  );
}
