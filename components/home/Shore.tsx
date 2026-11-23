import Image from "next/image";
import Link from "next/link";
import ParallaxPhoto from "../ParallaxPhoto";

/** 1. Shore: a real shoreline at sunrise, full bleed. The paper panel is cut flush into the bottom corner of the photo. */
export default function Shore() {
  return (
    <section aria-label="Paradise Cove Surf Club" className="relative bg-paper">
      <ParallaxPhoto src="/assets/photos/stock-shore-sunrise.jpg" alt="Sunrise over the shoreline, foam washing up the sand" priority strength={6} position="50% 60%" className="h-[62svh] min-h-[420px] md:h-[calc(100svh-84px)] md:min-h-[640px]" />
      <div className="edge-l relative bg-paper pb-12 pt-9 md:absolute md:bottom-0 md:left-0 md:w-[calc(max(0px,(100vw-1240px)/2)+600px)] md:pb-14 md:pt-12">
        <h1 className="sr-only">Paradise Cove Surf Club</h1>
        <div className="grid max-w-[440px] justify-items-start gap-6">
          <Image src="/assets/logos/wave-navy.png" alt="Paradise Cove" width={1173} height={748} priority className="logo-fade h-auto w-[min(280px,68%)]" />
          <div className="grid gap-3">
            <p className="eyebrow text-navy">Sun · Salt · Surf</p>
            <p className="text-[15px] leading-relaxed text-navy/75">Locals since forever. Born in Paradise Cove, sold in La Jolla.</p>
          </div>
          <div className="grid w-full grid-cols-1 gap-px border border-navy bg-navy sm:grid-cols-2">
            <Link href="/paradise-cove" className="btn bg-navy text-paper hover:bg-coral hover:text-navy">Women&apos;s</Link>
            <Link href="/club-paradise" className="btn bg-paper text-navy hover:bg-navy hover:text-paper">Men&apos;s</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
