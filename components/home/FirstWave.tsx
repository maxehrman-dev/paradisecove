"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Doors from "./Doors";
import { crestPath } from "../waves";

/** One flat wave layer: crest on top, solid body, trailing crest underneath. */
function WaveLayer({ progress, color, from, to, end = 0.72, amp = 22, period = 320 }: { progress: MotionValue<number>; color: string; from: number; to: number; end?: number; amp?: number; period?: number }) {
  const y = useTransform(progress, [0.02, end], [`${from}svh`, `${to}svh`]);
  const top = crestPath(1440, 60, amp + 4, amp, period);
  const bottom = crestPath(1440, 60, amp + 4, amp, period * 1.3);
  return (
    <motion.div style={{ y }} className="absolute inset-x-0 top-0 will-change-transform" aria-hidden="true">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block h-[60px] w-full"><path d={top} fill={color} /></svg>
      <div className="h-[110svh]" style={{ background: color }} />
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block h-[60px] w-full rotate-180"><path d={bottom} fill={color} /></svg>
    </motion.div>
  );
}

/** 2. First wave: cream and navy waves wash up the screen and leave two doors behind. */
export default function FirstWave({ locked }: { locked: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Function transforms keep these fades on the JS path (the accelerated scroll path mis-tracks a sticky target).
  const ramp = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));
  const doorsOpacity = useTransform(scrollYProgress, (v) => ramp(v, 0.4, 0.62));
  const doorsY = useTransform(scrollYProgress, (v) => 48 * (1 - ramp(v, 0.4, 0.7)));
  const hintOpacity = useTransform(scrollYProgress, (v) => 1 - ramp(v, 0, 0.12));

  if (reduce) {
    return (
      <section aria-label="Choose a side" className="bg-paper py-10">
        <div className="wrap h-[min(78svh,760px)]"><Doors locked={locked} /></div>
      </section>
    );
  }
  return (
    <section ref={ref} aria-label="Choose a side" className="relative h-[260svh] bg-paper">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.p style={{ opacity: hintOpacity }} className="pc-label absolute inset-x-0 top-[42%] text-center text-navy/60">Two doors · One club</motion.p>
        <motion.div style={{ opacity: doorsOpacity, y: doorsY }} className="wrap absolute inset-x-0 bottom-4 top-[118px] md:bottom-8 md:top-[112px]">
          <Doors locked={locked} />
        </motion.div>
        {/* Three flat layers at three speeds: depth without gradients */}
        <WaveLayer progress={scrollYProgress} color="#F4F0E4" from={100} to={-190} end={0.62} amp={18} period={360} />
        <WaveLayer progress={scrollYProgress} color="#1C2B4A" from={112} to={-178} end={0.66} amp={24} period={300} />
        <WaveLayer progress={scrollYProgress} color="#F4F0E4" from={124} to={-168} end={0.7} amp={14} period={420} />
      </div>
    </section>
  );
}
