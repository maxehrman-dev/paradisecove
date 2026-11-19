"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Doors from "./Doors";
import { seaFill, seaLine, LACE, SWELL, CHOP, GROUNDSWELL, type Comp } from "../waves";

/** One flat wave layer: a realistic crest on top (with foam lace), solid body, trailing swell underneath. */
function WaveLayer({ progress, color, foam, from, to, end = 0.72, comps, scale = 1.6 }: { progress: MotionValue<number>; color: string; foam?: string; from: number; to: number; end?: number; comps: Comp[]; scale?: number }) {
  const y = useTransform(progress, [0.02, end], [`${from}svh`, `${to}svh`]);
  const H = 110, base = 64;
  return (
    <motion.div style={{ y }} className="absolute inset-x-0 top-0 overflow-hidden will-change-transform" aria-hidden="true">
      <svg viewBox={`0 0 1440 ${H}`} preserveAspectRatio="none" className="-mb-px block h-[110px] w-full max-md:-ml-[90%] max-md:w-[280%]">
        <path d={seaFill(1440, H, base, comps, scale)} fill={color} />
        {foam && <path d={seaLine(1440, base + 7, comps, scale)} fill="none" stroke={foam} strokeWidth={2} strokeDasharray={LACE} strokeLinecap="round" vectorEffect="non-scaling-stroke" />}
      </svg>
      <div className="h-[34svh]" style={{ background: color }} />
      <svg viewBox={`0 0 1440 ${H}`} preserveAspectRatio="none" className="-mt-px block h-[110px] w-full rotate-180 max-md:-ml-[90%] max-md:w-[280%]"><path d={seaFill(1440, H, base, comps, scale * 0.7)} fill={color} /></svg>
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
  const doorsOpacity = useTransform(scrollYProgress, (v) => ramp(v, 0.06, 0.3));
  const doorsY = useTransform(scrollYProgress, (v) => 48 * (1 - ramp(v, 0.06, 0.36)));
  const hintOpacity = useTransform(scrollYProgress, (v) => 1 - ramp(v, 0, 0.06));

  if (reduce) {
    return (
      <section aria-label="Choose a side" className="bg-paper py-10">
        <div className="wrap h-[min(78svh,760px)]"><Doors locked={locked} /></div>
      </section>
    );
  }
  return (
    <section ref={ref} aria-label="Choose a side" className="relative h-[190svh] bg-paper">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.p style={{ opacity: hintOpacity }} className="pc-label absolute inset-x-0 top-[42%] text-center text-navy/60">Two doors · One club</motion.p>
        <motion.div style={{ opacity: doorsOpacity, y: doorsY }} className="wrap absolute inset-x-0 bottom-4 top-[118px] md:bottom-8 md:top-[112px]">
          <Doors locked={locked} />
        </motion.div>
        {/* Three flat layers at three speeds: depth without gradients */}
        <WaveLayer progress={scrollYProgress} color="#F4F0E4" from={100} to={-95} end={0.8} comps={GROUNDSWELL} scale={1.25} />
        <WaveLayer progress={scrollYProgress} color="#1C2B4A" foam="#F4F0E4" from={108} to={-90} end={0.86} comps={SWELL} scale={1.6} />
        <WaveLayer progress={scrollYProgress} color="#F4F0E4" from={116} to={-85} end={0.92} comps={CHOP} scale={1.4} />
      </div>
    </section>
  );
}
