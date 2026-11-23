import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { products } from "@/lib/catalog";
import PhotoBand from "@/components/PhotoBand";

export const metadata: Metadata = { title: "Story", description: "The big surf brands lost their touch. We make pieces about real places. Born in Paradise Cove, sold in La Jolla." };

function Polaroid({ src, alt, caption, tilt }: { src: string; alt: string; caption: string; tilt: string }) {
  return (
    <figure className={`grid w-[min(260px,72vw)] gap-3 border border-navy/10 bg-paper p-3 pb-4 ${tilt}`}>
      <div className="relative aspect-[256/335] overflow-hidden bg-cream"><Image src={src} alt={alt} fill sizes="260px" className="object-cover" /></div>
      <figcaption className="pc-label text-center text-[10px] text-navy/70">{caption}</figcaption>
    </figure>
  );
}

export default function StoryPage() {
  const places = products.filter((p) => p.id.startsWith("tee-"));
  return (
    <div className="bg-paper text-navy">
      <section aria-labelledby="story-title" className="wrap grid justify-items-center gap-6 pb-16 pt-16 text-center md:pt-24">
        <span className="pc-label text-navy/60">Our story</span>
        <h1 id="story-title" className="grid gap-3 pc-head text-[clamp(30px,5.6vw,68px)] text-balance">
          <span>The big surf brands lost their touch.</span>
          <span>We make pieces about real places.</span>
          <span>Born in Paradise Cove, sold in La Jolla.</span>
        </h1>
      </section>
      <PhotoBand src="/assets/photos/stock-wave-crest.jpg" alt="A wave cresting at dusk" title="Sun · Salt · Surf" position="50% 62%" line="Real spots. Real slang. Real local history." tone="paper" />

      <section aria-labelledby="where-from" className="py-20 md:py-28">
        <div className="wrap grid items-center gap-14 md:grid-cols-2">
          <Reveal className="flex justify-center gap-4 md:gap-6">
            <Polaroid src="/assets/photos/lifestyle-wakesurf.jpg" alt="A member surfing a boat wake in the navy hoodie" caption="Locals since forever" tilt="-rotate-3" />
            <Polaroid src="/assets/photos/lifestyle-hoodie-boat.jpg" alt="The navy hoodie from behind, out on the water" caption="Sun · Salt · Surf" tilt="mt-10 rotate-2 max-sm:hidden" />
          </Reveal>
          <Reveal delay={0.1} className="grid gap-5">
            <h2 id="where-from" className="pc-head text-[clamp(30px,4.4vw,52px)]">A surf club you can wear</h2>
            <p className="max-w-[44ch] text-lg text-navy/85">Paradise Cove is salt air, the pier and sunset sessions. We started there, and now we sell in La Jolla.</p>
            <p className="max-w-[44ch] text-lg text-navy/85">Heavy cotton you feel before you read it. Every piece is named for a real spot, and every size is named for a wave.</p>
            <p className="pc-label text-navy/60">Wish you were here.</p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="places" className="bg-cream py-20 md:py-28">
        <div className="wrap grid gap-10">
          <Reveal className="grid gap-3">
            <span className="pc-label text-navy/60">Real places</span>
            <h2 id="places" className="pc-head text-[clamp(30px,4.4vw,52px)]">One spot per print</h2>
          </Reveal>
          <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {places.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.08}>
                <li className="grid grid-cols-[88px_1fr] items-center gap-4">
                  <div className="relative aspect-square overflow-hidden rounded-[4px] bg-paper"><Image src={(p.images as { back: string }).back} alt={`${p.name}, back print`} fill sizes="88px" className="object-cover" /></div>
                  <div className="grid gap-1">
                    <span className="pc-label text-[10px] text-navy/60">No. {"number" in p ? p.number : ""}</span>
                    <span className="font-cove text-lg font-black uppercase leading-tight">{p.name}</span>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="two" className="py-20 md:py-28">
        <div className="wrap grid gap-10">
          <h2 id="two" className="pc-head text-center text-[clamp(30px,4.4vw,52px)]">Two collections · One club</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/paradise-cove" className="group grid gap-3 rounded-[6px] bg-coral p-8 text-navy md:p-10">
              <span className="pc-label text-[10px]">Women&apos;s</span>
              <Image src="/assets/logos/script-navy.png" alt="Paradise Cove" width={1022} height={193} className="logo-fade h-auto w-[min(360px,80%)]" />
              <span>Soft, coastal, embroidered. The off-shoulder crewneck.</span>
              <span className="pc-label">Visit Paradise Cove <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
            </Link>
            <Link href="/club-paradise" className="group grid gap-3 rounded-[6px] bg-navy p-8 text-cream md:p-10">
              <span className="cp-fine text-[10px] text-cream/70">Men&apos;s</span>
              <span className="cp-head text-[clamp(36px,5vw,60px)]">Club Paradise</span>
              <span className="cp-quote text-lg">Surf club streetwear. All the tees.</span>
              <span className="cp-fine text-[11px]">Enter the clubhouse <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
