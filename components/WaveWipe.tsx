"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { seaFill, seaLine, LACE, SWELL, GROUNDSWELL, type Comp } from "./waves";

function Layer({ color, foam, comps, delay }: { color: string; foam?: string; comps: Comp[]; delay: number }) {
  return (
    <motion.div className="absolute inset-0" initial={{ y: "0%" }} animate={{ y: "-130%" }} transition={{ duration: 1.25, delay, ease: [0.65, 0, 0.35, 1] }}>
      <div className="h-full" style={{ background: color }} />
      {/* the trailing edge is a real breaking-swell silhouette */}
      <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="-mt-px block h-[140px] w-full rotate-180 max-md:-ml-[90%] max-md:w-[280%]">
        <path d={seaFill(1440, 140, 70, comps, 2)} fill={color} />
        {foam && <path d={seaLine(1440, 77, comps, 2)} fill="none" stroke={foam} strokeWidth={2} strokeDasharray={LACE} strokeLinecap="round" vectorEffect="non-scaling-stroke" />}
      </svg>
    </motion.div>
  );
}

/** The wave wipe: on entry a navy swell, then a rust one, wash up and off the screen. */
export default function WaveWipe({ back = "#C2603A", front = "#1C2B4A" }: { back?: string; front?: string }) {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  if (reduce || done) return null;
  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ duration: 1.8 }} onAnimationComplete={() => setTimeout(() => setDone(true), 1700)}>
      <Layer color={back} comps={GROUNDSWELL} delay={0.18} />
      <Layer color={front} foam="#F4F0E4" comps={SWELL} delay={0} />
    </motion.div>
  );
}
