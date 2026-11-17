"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { clubs, INK, CARD } from "@/lib/catalog";

export function Awning({ className = "" }: { className?: string }) {
  return (
    <svg className={`block h-8 w-full md:h-10 ${className}`} viewBox="0 0 480 40" preserveAspectRatio="none" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d={`M${i * 40} 0 H${i * 40 + 40} V24 a20 16 0 0 1 -40 0 Z`} fill={i % 2 ? "#F4F0E4" : i % 4 === 0 ? "#A83434" : "#2C5C3E"} />
      ))}
    </svg>
  );
}

export function MemberCard({ i, name, motto, ink, card }: { i: number; name: string; motto: string; ink: string; card: string }) {
  const color = INK[ink as keyof typeof INK], bg = CARD[card as keyof typeof CARD];
  return (
    <article className="grid h-[300px] w-[240px] shrink-0 content-between rounded-[6px] border-[3px] p-5 sm:h-[330px] sm:w-[260px]" style={{ background: bg, borderColor: color, color }}>
      <div className="flex items-center justify-between cp-fine text-[10px]"><span>Member</span><span>No. {String(i + 1).padStart(2, "0")}</span></div>
      <div className="grid gap-3">
        <h3 className="cp-head text-[34px] sm:text-[38px]">{name}</h3>
        <p className="cp-quote text-lg leading-snug">{motto}</p>
      </div>
      <div className="flex items-end justify-between border-t-2 pt-3 cp-fine text-[9px]" style={{ borderColor: color }}>
        <span>Members since forever</span><span>La Jolla</span>
      </div>
    </article>
  );
}

/** 4. Riviera break: awning stripes and a rack of club cards sliding in sideways. The one loud moment. */
export default function Riviera() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0.1, 0.9], ["18%", "-62%"]);
  return (
    <section ref={ref} aria-labelledby="riviera" className="relative overflow-hidden py-0 text-navy">
      {/* Flat red, cream and green awning stripes */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="awning" width="160" height="10" patternUnits="userSpaceOnUse">
            <rect width="40" height="10" fill="#A83434" /><rect x="40" width="40" height="10" fill="#F4F0E4" />
            <rect x="80" width="40" height="10" fill="#2C5C3E" /><rect x="120" width="40" height="10" fill="#F4F0E4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#awning)" />
      </svg>
      <Awning className="relative" />
      <div className="relative py-14 md:py-20">
        <div className="wrap">
          <div className="mx-auto grid max-w-[560px] justify-items-center gap-3 border-[3px] border-terracotta bg-cream px-6 py-7 text-center">
            <span className="cp-fine text-terracotta">Club Paradise · Men's</span>
            <h2 id="riviera" className="cp-head text-[clamp(38px,7vw,72px)] text-terracotta">The Clubhouse</h2>
            <p className="cp-quote text-xl text-forest">Surf · Siesta · Sunset</p>
          </div>
        </div>
        <div className="mt-10 md:mt-14">
          <motion.div style={reduce ? undefined : { x }} className={`flex gap-4 px-4 will-change-transform sm:gap-6 ${reduce ? "overflow-x-auto pb-4" : ""}`}>
            {clubs.map((c, i) => <MemberCard key={c.id} i={i} {...c} />)}
          </motion.div>
        </div>
      </div>
      <Awning className="relative rotate-180" />
    </section>
  );
}
