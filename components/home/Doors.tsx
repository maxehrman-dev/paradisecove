"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import ParallaxPhoto from "../ParallaxPhoto";

function Lock() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true" className="inline-block">
      <rect x="1" y="7" width="12" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7V4.8a3 3 0 0 1 6 0V7" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function Door({ href, locked, label, delay, frame, children }: { href: string; locked: boolean; label: string; delay: number; frame: string; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const inner = `group relative flex h-full flex-col overflow-hidden ${frame}`;
  return (
    <motion.div className="relative min-h-0 flex-1 transition-[flex-grow] duration-500 ease-out md:hover:grow-[1.35]"
      initial={reduce ? false : { y: 70, opacity: 0.4 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "0px 0px -15% 0px" }} transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}>
      {locked ? <div className={inner} role="group" aria-label={`${label}. Opens with the first drop.`}>{children}</div> : <Link href={href} className={inner} aria-label={label}>{children}</Link>}
    </motion.div>
  );
}

/** 2. Two doors over the water: the beach side and the clubhouse. Real photos, no product shots. */
export default function Doors({ locked }: { locked: boolean }) {
  return (
    <section aria-label="Choose a side" className="relative overflow-hidden">
      <ParallaxPhoto src="/assets/photos/stock-aerial-surf.jpg" alt="" strength={14} position="50% 40%" className="absolute inset-0" />
      <div className="wrap relative flex h-auto flex-col gap-4 py-14 md:h-[92svh] md:min-h-[640px] md:flex-row md:gap-6 md:py-16">
        <Door href="/paradise-cove" locked={locked} label="Paradise Cove, women's" delay={0} frame="h-[52svh] min-h-[380px] bg-coral p-2 md:h-full md:p-3 [border-top-left-radius:50%_18%] [border-top-right-radius:50%_18%]">
          <ParallaxPhoto src="/assets/photos/stock-pink-sunset-surfer.jpg" alt="A surfer paddling out at a pink sunset" strength={6} sizes="(min-width: 768px) 45vw, 100vw" position="60% 50%" className="min-h-0 flex-1 [border-top-left-radius:50%_17%] [border-top-right-radius:50%_17%]" />
          <div className="flex items-end justify-between gap-3 px-2 pb-1 pt-3 text-navy">
            <div className="grid gap-1">
              <span className="pc-head text-[clamp(24px,3vw,34px)]">Paradise Cove</span>
              <span className="pc-label text-[10px]">Women&apos;s · The beach side</span>
            </div>
            <span className="pc-label inline-flex shrink-0 items-center gap-2 text-[10px]">{locked ? <><Lock /> Soon</> : <>Enter <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></>}</span>
          </div>
        </Door>
        <Door href="/club-paradise" locked={locked} label="Club Paradise, men's" delay={0.12} frame="h-[52svh] min-h-[380px] bg-navy p-2 pt-0 md:h-full md:p-3 md:pt-0">
          <svg className="-mx-2 block h-9 w-[calc(100%+1rem)] shrink-0 md:-mx-3 md:h-12 md:w-[calc(100%+1.5rem)]" viewBox="0 0 400 48" preserveAspectRatio="none" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${i * 40} 0 H${i * 40 + 40} V30 a20 16 0 0 1 -40 0 Z`} fill={i % 2 ? "#F4F0E4" : "#C2603A"} />)}
          </svg>
          <ParallaxPhoto src="/assets/photos/stock-barrel-surfer.jpg" alt="A surfer deep in a green barrel" strength={6} sizes="(min-width: 768px) 45vw, 100vw" position="45% 50%" className="mt-2 min-h-0 flex-1" />
          <div className="flex items-end justify-between gap-3 px-2 pb-1 pt-3 text-cream">
            <div className="grid gap-1">
              <span className="cp-head text-[clamp(22px,3vw,34px)]">Club Paradise</span>
              <span className="cp-fine text-[10px] text-cream/75">Men&apos;s · The clubhouse</span>
            </div>
            <span className="cp-fine inline-flex shrink-0 items-center gap-2 text-[10px]">{locked ? <><Lock /> Soon</> : <>Enter <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></>}</span>
          </div>
        </Door>
      </div>
    </section>
  );
}
