"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { crestPath } from "../waves";

const SIZES = [
  { size: "XS", name: "Ankle Biter", y: 238 },
  { size: "S", name: "Knee High", y: 196 },
  { size: "M", name: "Waist High", y: 148 },
  { size: "L", name: "Head High", y: 82 },
  { size: "XL", name: "Overhead", y: 34 },
];
const MARKS = [{ y: 238, t: "Ankle" }, { y: 196, t: "Knee" }, { y: 148, t: "Waist" }, { y: 82, t: "Head" }, { y: 34, t: "Overhead" }];

/** 5. Size by Swell: tap a size and the wave rises to that height. */
export default function SizeBySwell() {
  const [i, setI] = useState(2);
  const reduce = useReducedMotion();
  const s = SIZES[i];
  const wave = crestPath(720, 320, 14, 12, 120);
  return (
    <section aria-labelledby="swell" className="bg-cream py-16 md:py-24">
      <div className="wrap grid items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <div className="grid gap-5">
          <span className="pc-label text-rose">Every piece</span>
          <h2 id="swell" className="pc-head text-[clamp(38px,6vw,64px)]">Sized by swell</h2>
          <p className="max-w-[36ch] text-navy/80">Every size is named for a wave height. Yours is circled on the neck label.</p>
          <div role="radiogroup" aria-label="Size" className="grid grid-cols-5 gap-2">
            {SIZES.map((x, k) => (
              <button key={x.size} type="button" role="radio" aria-checked={k === i} onClick={() => setI(k)}
                className={`grid min-h-[64px] place-items-center gap-0.5 rounded-[6px] border-2 px-1 py-2 transition-colors ${k === i ? "border-navy bg-navy text-cream" : "border-navy/25 bg-paper text-navy hover:border-navy"}`}>
                <span className="font-cove text-xl font-black leading-none">{x.size}</span>
                <span className="font-label text-[9px] font-extrabold uppercase leading-tight tracking-[.08em] sm:text-[10px]">{x.name}</span>
              </button>
            ))}
          </div>
          <p aria-live="polite" className="pc-label text-navy">{s.size} · {s.name}</p>
        </div>
        <div className="relative overflow-hidden rounded-[6px] border-2 border-navy bg-paper">
          <svg viewBox="0 0 360 280" className="block h-auto w-full" role="img" aria-label={`Wave at ${s.name} height`}>
            {MARKS.map((m) => (
              <g key={m.t}>
                <line x1="0" x2="360" y1={m.y} y2={m.y} stroke="#1C2B4A" strokeOpacity=".15" strokeDasharray="4 6" />
                <text x="10" y={m.y - 6} fill="#1C2B4A" fillOpacity=".55" style={{ font: "800 9px var(--font-montserrat)", letterSpacing: ".2em", textTransform: "uppercase" }}>{m.t.toUpperCase()}</text>
              </g>
            ))}
            <motion.g initial={false} animate={{ y: s.y - 14 }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 70, damping: 14 }}>
              <path d={wave} fill="#1C2B4A" transform="translate(-180 0)" />
            </motion.g>
          </svg>
        </div>
      </div>
    </section>
  );
}
