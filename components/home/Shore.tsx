import Image from "next/image";
import Link from "next/link";
import ParallaxPhoto from "../ParallaxPhoto";

/** 1. Shore: a real shoreline at sunrise, full bleed, with the wave logo on a paper card. */
export default function Shore() {
  return (
    <section aria-label="Paradise Cove Surf Club" className="relative">
      <ParallaxPhoto src="/assets/photos/stock-shore-sunrise.jpg" alt="Sunrise over the shoreline, foam washing up the sand" priority strength={6} position="50% 60%" className="h-[calc(100svh-96px)] min-h-[560px] md:h-[calc(100svh-84px)]" />
      <div className="wrap absolute inset-x-0 bottom-5 md:bottom-12">
        <div className="grid w-full max-w-[460px] justify-items-start gap-4 bg-paper p-6 md:p-8">
          <h1 className="sr-only">Paradise Cove Surf Club</h1>
          <Image src="/assets/logos/wave-navy.png" alt="Paradise Cove" width={1173} height={748} priority className="logo-fade h-auto w-[min(300px,70%)]" />
          <p className="pc-label text-[12px] tracking-[.34em]">Sun · Salt · Surf</p>
          <p className="text-[15px] text-navy/80">Locals since forever. Born in Paradise Cove, sold in La Jolla.</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/paradise-cove" className="pc-label inline-flex min-h-[46px] items-center rounded-full bg-navy px-5 text-[10px] text-cream transition-colors hover:bg-coral hover:text-navy">Paradise Cove · Women&apos;s</Link>
            <Link href="/club-paradise" className="pc-label inline-flex min-h-[46px] items-center rounded-full border-2 border-navy px-5 text-[10px] transition-colors hover:bg-navy hover:text-cream">Club Paradise · Men&apos;s</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
