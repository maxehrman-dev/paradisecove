import Image from "next/image";
import Link from "next/link";
import { productById } from "@/lib/catalog";
import { SITE, LAUNCHED } from "@/lib/site";

/** 3. The crewneck alone, with one line. Front first; the back shows on hover. */
export default function HeroProduct() {
  const p = productById("off-shoulder-crewneck")!;
  const img = p.images as { front: string; back: string };
  return (
    <section aria-labelledby="hero-product" className="bg-studio py-14 md:py-20">
      <div className="wrap grid justify-items-center gap-6 text-center">
        <span className="pc-label text-navy/70">Paradise Cove · Women&apos;s</span>
        <Link href="/paradise-cove" className="group relative block aspect-[4/5] w-full max-w-[560px] overflow-hidden" aria-label={`${p.name}: see Paradise Cove`}>
          <Image src={img.front} alt={`${p.name}, front`} fill sizes="(min-width: 640px) 560px, 100vw" className="object-cover" />
          <Image src={img.back} alt="" aria-hidden="true" fill sizes="(min-width: 640px) 560px, 100vw" className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </Link>
        <div className="grid justify-items-center gap-3">
          <h2 id="hero-product" className="pc-head text-[clamp(30px,5vw,52px)]">{p.name}</h2>
          <p className="max-w-[40ch] text-base text-navy/80">{p.line} <span className="font-extrabold text-navy">${p.price}</span></p>
          <p className="pc-label text-[10px] text-navy/60">{LAUNCHED ? SITE.where : `First drop coming soon · ${SITE.store}`}</p>
        </div>
      </div>
    </section>
  );
}
