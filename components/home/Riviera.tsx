"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { clubs, products, INK, CARD, type Product } from "@/lib/catalog";

/** Scalloped awning valance. Rust and cream only. */
export function Awning({ className = "" }: { className?: string }) {
  return (
    <svg className={`block h-8 w-full md:h-10 ${className}`} viewBox="0 0 480 40" preserveAspectRatio="none" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d={`M${i * 40} 0 H${i * 40 + 40} V24 a20 16 0 0 1 -40 0 Z`} fill={i % 2 ? "#F4F0E4" : "#C2603A"} />
      ))}
    </svg>
  );
}

export function MemberCard({ i, name, motto, ink, card }: { i: number; name: string; motto: string; ink: string; card: string }) {
  const color = INK[ink as keyof typeof INK] ?? INK.rust, bg = CARD[card as keyof typeof CARD] ?? CARD.cream;
  return (
    <article className="grid h-[300px] w-[240px] shrink-0 content-between rounded-[6px] border-[3px] p-5 text-navy sm:h-[330px] sm:w-[260px]" style={{ background: bg, borderColor: color }}>
      <div className="flex items-center justify-between cp-fine text-[10px] text-navy/70"><span>Member</span><span>No. {String(i + 1).padStart(2, "0")}</span></div>
      <div className="grid gap-3">
        <h3 className="cp-head text-[34px] sm:text-[38px]" style={{ color }}>{name}</h3>
        <p className="cp-quote text-lg leading-snug">{motto}</p>
      </div>
      <div className="flex items-end justify-between border-t-2 pt-3 cp-fine text-[9px] text-navy/70" style={{ borderColor: color }}>
        <span>Members since forever</span><span>La Jolla</span>
      </div>
    </article>
  );
}

/** A tee hanging on the rack: the real back print on a rust-bordered card. */
function RackCard({ p }: { p: Product }) {
  const club = clubs.find((c) => c.product === p.id);
  const img = (p.images as { back: string }).back;
  return (
    <article className="w-[240px] shrink-0 overflow-hidden rounded-[6px] border-[3px] border-rust bg-cream sm:w-[280px]">
      <div className="relative aspect-square bg-studio"><Image src={img} alt={`${p.name}, back print`} fill sizes="280px" className="object-cover" /></div>
      <div className="grid gap-1 border-t-[3px] border-rust p-4">
        <div className="flex items-center justify-between cp-fine text-[9px] text-navy/70"><span>No. {"number" in p ? p.number : ""}</span><span>{club ? club.name : "Club Paradise"}</span></div>
        <h3 className="cp-head text-[22px] text-rust">{p.name.replace(/ Tee$/, "")}</h3>
        <p className="cp-fine text-[9px] text-navy/70">Tee · ${p.price}</p>
      </div>
    </article>
  );
}

/** 4. Riviera break: rust and cream awning stripes and a rack of club cards sliding in sideways. The one loud moment. */
export default function Riviera() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0.1, 0.9], ["22%", "-58%"]);
  return (
    <section ref={ref} aria-labelledby="riviera" className="relative overflow-hidden text-navy">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="awning" width="96" height="10" patternUnits="userSpaceOnUse">
            <rect width="48" height="10" fill="#C2603A" /><rect x="48" width="48" height="10" fill="#F4F0E4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#awning)" />
      </svg>
      <Awning className="relative" />
      <div className="relative py-14 md:py-20">
        <div className="wrap">
          <div className="mx-auto grid max-w-[680px] justify-items-center gap-3 border-[3px] border-rust bg-cream px-6 py-7 text-center">
            <span className="cp-fine text-navy/70">Club Paradise · Men's</span>
            <h2 id="riviera" className="cp-head text-[clamp(34px,6vw,64px)] text-rust">The Clubhouse</h2>
            <p className="cp-quote text-xl text-navy">Surf · Siesta · Sunset</p>
          </div>
        </div>
        <div className="mt-10 md:mt-14">
          <motion.div style={reduce ? undefined : { x }} className={`flex gap-4 px-4 will-change-transform sm:gap-6 ${reduce ? "overflow-x-auto pb-4" : ""}`}>
            {products.filter((p) => p.id.startsWith("tee-")).map((p) => <RackCard key={p.id} p={p} />)}
          </motion.div>
        </div>
      </div>
      <Awning className="relative rotate-180" />
    </section>
  );
}
