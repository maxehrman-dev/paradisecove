"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import ParallaxPhoto from "../ParallaxPhoto";

function Lock() {
  return (
    <svg width="12" height="14" viewBox="0 0 14 16" aria-hidden="true" className="inline-block">
      <rect x="1" y="7" width="12" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 7V4.8a3 3 0 0 1 6 0V7" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function Door({ href, locked, label, delay, children }: { href: string; locked: boolean; label: string; delay: number; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const inner = "group relative flex h-full flex-col";
  return (
    <motion.div className="relative h-[78svh] min-h-[520px] md:h-full md:min-h-0 md:flex-1 md:transition-[flex-grow] md:duration-700 md:ease-out md:hover:grow-[1.25]"
      initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "0px 0px -15% 0px" }} transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}>
      {locked ? <div className={inner} role="group" aria-label={`${label}. Opens with the first drop.`}>{children}</div> : <Link href={href} className={inner} aria-label={label}>{children}</Link>}
    </motion.div>
  );
}

function Enter({ locked }: { locked: boolean }) {
  return locked
    ? <span className="inline-flex items-center gap-2"><Lock /> Soon</span>
    : <span className="inline-flex items-center gap-3">Enter <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span></span>;
}

/** 2. Two doors, flush side by side: the beach side and the clubhouse. Real photos, edge to edge. */
export default function Doors({ locked }: { locked: boolean }) {
  return (
    <section aria-label="Choose a side" className="flex flex-col bg-navy md:h-[calc(100svh-86px)] md:min-h-[640px] md:flex-row">
      <Door href="/paradise-cove" locked={locked} label="Paradise Cove, women's" delay={0}>
        <ParallaxPhoto src="/assets/photos/stock-pink-sunset-surfer.jpg" alt="Close-up of a surfer riding an orange board through turquoise water" strength={6} sizes="(min-width: 768px) 55vw, 100vw" position="60% 50%" className="min-h-0 flex-1" />
        <div className="flex items-center justify-between gap-4 bg-coral px-5 py-6 text-navy sm:px-8 md:px-10 md:py-8">
          <div className="grid gap-2">
            <span className="eyebrow text-navy/70">Women&apos;s</span>
            <span className="pc-head text-[clamp(26px,3vw,40px)]">Paradise Cove</span>
          </div>
          <span className="pc-label shrink-0 text-[10px]"><Enter locked={locked} /></span>
        </div>
      </Door>
      <Door href="/club-paradise" locked={locked} label="Club Paradise, men's" delay={0.12}>
        <svg className="block h-7 w-full shrink-0 md:h-9" viewBox="0 0 400 36" preserveAspectRatio="none" aria-hidden="true">
          <rect width="400" height="36" fill="#1C2B4A" />
          {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${i * 40} 0 H${i * 40 + 40} V22 a20 14 0 0 1 -40 0 Z`} fill={i % 2 ? "#F4F0E4" : "#C2603A"} />)}
        </svg>
        <ParallaxPhoto src="/assets/photos/stock-barrel-surfer.jpg" alt="A surfer deep in a green barrel" strength={6} sizes="(min-width: 768px) 55vw, 100vw" position="45% 50%" className="min-h-0 flex-1" />
        <div className="flex items-center justify-between gap-4 bg-navy px-5 py-6 text-cream sm:px-8 md:px-10 md:py-8">
          <div className="grid gap-2">
            <span className="cp-fine text-[10px] text-cream/65">Men&apos;s</span>
            <span className="cp-head text-[clamp(24px,3vw,40px)]">Club Paradise</span>
          </div>
          <span className="cp-fine shrink-0 text-[10px]"><Enter locked={locked} /></span>
        </div>
      </Door>
    </section>
  );
}
