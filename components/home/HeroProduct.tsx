import Image from "next/image";
import Link from "next/link";
import { productById } from "@/lib/catalog";
import { SITE, LAUNCHED } from "@/lib/site";

/** 3. The crewneck, flush to the left edge on the studio grey. Front first; the back shows on hover. */
export default function HeroProduct() {
  const p = productById("off-shoulder-crewneck")!;
  const img = p.images as { front: string; back: string };
  return (
    <section aria-labelledby="hero-product" className="grid bg-studio md:grid-cols-2">
      <Link href="/paradise-cove" className="group relative block aspect-[4/5] w-full overflow-hidden md:aspect-auto md:min-h-[88svh]" aria-label={`${p.name}: see Paradise Cove`}>
        <Image src={img.front} alt={`${p.name}, front`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        <Image src={img.back} alt="" aria-hidden="true" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </Link>
      <div className="edge-r grid content-center gap-7 bg-paper py-14 md:py-20">
        <span className="eyebrow">Paradise Cove · Women&apos;s</span>
        <h2 id="hero-product" className="pc-head text-[clamp(34px,4.6vw,60px)]">{p.name}</h2>
        <div className="rule" />
        <div className="flex items-baseline justify-between gap-6">
          <p className="max-w-[34ch] text-[15px] leading-relaxed text-navy/75">{p.line}</p>
          <p className="font-cove text-2xl font-black">${p.price}</p>
        </div>
        <p className="eyebrow">{LAUNCHED ? SITE.where : `First drop coming soon · ${SITE.store}`}</p>
        <Link href="/paradise-cove" className="link-line">Shop Paradise Cove <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
