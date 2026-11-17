"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { seaFill, seaLine, LACE, SWELL, GROUNDSWELL } from "../waves";

const LINES = ["The big surf brands lost their touch.", "We make pieces about real places.", "Born in Paradise Cove, sold in La Jolla."];

/** 6. Story: three short lines, with flat wave layers drifting at different speeds as we head into deep water. */
export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const back = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const front = useTransform(scrollYProgress, [0, 1], [130, 0]);
  return (
    <section ref={ref} aria-labelledby="story" className="relative overflow-hidden bg-paper pt-20 md:pt-28">
      <div className="wrap relative z-10 grid justify-items-center gap-6 pb-40 text-center md:pb-52">
        <h2 id="story" className="pc-label text-navy/60">Our story</h2>
        <div className="grid gap-4">
          {LINES.map((l) => <p key={l} className="pc-head text-[clamp(26px,4.4vw,52px)] text-balance">{l}</p>)}
        </div>
        <Link href="/story" className="pc-label mt-4 inline-flex min-h-[44px] items-center gap-2 border-b-2 border-navy">Read the story <span aria-hidden="true">→</span></Link>
      </div>
      <motion.svg style={reduce ? undefined : { y: back }} viewBox="0 0 1440 160" preserveAspectRatio="none" className="absolute bottom-10 left-0 block h-32 w-full max-md:-left-[90%] max-md:w-[280%]" aria-hidden="true"><path d={seaFill(1440, 160, 50, GROUNDSWELL, 1.15)} fill="#F4F0E4" /></motion.svg>
      <motion.svg style={reduce ? undefined : { y: front }} viewBox="0 0 1440 160" preserveAspectRatio="none" className="absolute -bottom-6 left-0 block h-32 w-full max-md:-left-[60%] max-md:w-[280%]" aria-hidden="true"><path d={seaFill(1440, 160, 54, SWELL, 1.5)} fill="#1C2B4A" /><path d={seaLine(1440, 61, SWELL, 1.5)} fill="none" stroke="#F4F0E4" strokeWidth={2} strokeDasharray={LACE} strokeLinecap="round" vectorEffect="non-scaling-stroke" /></motion.svg>
    </section>
  );
}
