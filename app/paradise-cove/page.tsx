import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SizeBySwell from "@/components/home/SizeBySwell";
import { productById } from "@/lib/catalog";
import { SITE, LAUNCHED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Paradise Cove · Women's",
  description: "Paradise Cove. Soft, coastal, embroidered. The off-shoulder crewneck, $65. Sun · Salt · Surf.",
};

export default function ParadiseCovePage() {
  const p = productById("off-shoulder-crewneck")!;
  const img = p.images as { front: string; back: string };
  return (
    <div className="bg-paper text-navy">
      {/* Quiet opening */}
      <section aria-labelledby="pc-title" className="relative">
        <div className="grid md:grid-cols-2">
          <div className="edge-l grid content-center justify-items-center gap-7 py-14 text-center md:justify-items-start md:py-20 md:text-left">
            <h1 id="pc-title" className="sr-only">Paradise Cove, women&apos;s</h1>
            <span className="eyebrow">Women&apos;s</span>
            <Image src="/assets/logos/script-navy.png" alt="Paradise Cove" width={1022} height={193} priority className="logo-fade h-auto w-[min(560px,90%)]" />
            <span className="h-px w-16 bg-coral" aria-hidden="true" />
            <p className="pc-head text-[clamp(22px,3.2vw,34px)] tracking-[.24em]">Sun · Salt · Surf</p>
            <p className="max-w-[34ch] text-[15px] leading-relaxed text-navy/75">Soft, coastal, embroidered. Wish you were here.</p>
          </div>
          <Reveal slow className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto md:min-h-[82svh]">
            <Image src="/assets/photos/stock-pink-sunset-surfer.jpg" alt="Close-up of a surfer riding an orange board through turquoise water" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-[60%_50%]" />
          </Reveal>
        </div>
      </section>

      {/* The crewneck, front and back */}
      <section aria-labelledby="crewneck" className="border-t border-navy/10">
        <div className="grid lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="grid gap-px bg-navy/10 sm:grid-cols-2">
            <Reveal slow><figure className="relative bg-studio"><div className="relative aspect-[4/5] overflow-hidden"><Image src={img.front} alt="Off-shoulder crewneck, front" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /></div><figcaption className="eyebrow absolute bottom-4 left-5">Front</figcaption></figure></Reveal>
            <Reveal slow delay={0.15}><figure className="relative bg-studio"><div className="relative aspect-[4/5] overflow-hidden"><Image src={img.back} alt="Off-shoulder crewneck, back" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /></div><figcaption className="eyebrow absolute bottom-4 left-5">Back</figcaption></figure></Reveal>
          </div>
          <Reveal slow delay={0.1} className="edge-r grid content-start gap-7 py-14 lg:sticky lg:top-28 lg:py-20">
            <span className="eyebrow">The hero piece</span>
            <h2 id="crewneck" className="pc-head text-[clamp(36px,5vw,60px)]">{p.name}</h2>
            <p className="font-cove text-3xl font-black">${p.price}</p>
            <ul className="grid gap-3 border-t border-navy/15 pt-6 text-[15px] text-navy/80">
              {p.details!.map((d) => <li key={d} className="flex gap-3"><span className="mt-[10px] h-px w-3 shrink-0 bg-coral" aria-hidden="true" />{d}</li>)}
            </ul>
            <p className="eyebrow">{LAUNCHED ? SITE.where : `First drop coming soon · ${SITE.store}`}</p>
            <Link href="/find-us" className="btn-solid w-full sm:w-fit">Find us</Link>
          </Reveal>
        </div>
      </section>

      {/* Embroidery, up close */}
      <section aria-labelledby="details" className="bg-cream pt-20 md:pt-28">
        <div className="grid gap-12 md:gap-16">
          <Reveal slow className="wrap grid justify-items-center gap-4 text-center">
            <span className="eyebrow">Up close</span>
            <h2 id="details" className="pc-head text-[clamp(30px,4.4vw,48px)]">Pink thread, by hand</h2>
          </Reveal>
          <div className="grid gap-px bg-navy/10 sm:grid-cols-3">
            {(p.closeups as string[][]).map(([src, label], i) => (
              <Reveal slow delay={i * 0.12} key={src}>
                <figure className="grid bg-cream">
                  <div className="relative aspect-square overflow-hidden bg-studio"><Image src={src} alt={label} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" /></div>
                  <figcaption className="px-5 py-4 text-[13px] text-navy/70">{label}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SizeBySwell />
    </div>
  );
}
