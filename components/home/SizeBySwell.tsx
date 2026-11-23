"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// y is the waterline height in the frame (0 = top, 1 = bottom). The photo slides so its own waterline meets it.
const SIZES = [
  { size: "XS", name: "Ankle Biter", y: 0.85 },
  { size: "S", name: "Knee High", y: 0.7 },
  { size: "M", name: "Waist High", y: 0.53 },
  { size: "L", name: "Head High", y: 0.3 },
  { size: "XL", name: "Overhead", y: 0.13 },
];
// Frame is 9:7. Photo is 2:3 with its waterline at 50% of its height. Offset as a % of the photo's own height.
const offset = (y: number) => `${(0.5185 * y - 0.5) * 100}%`;

/** 5. Size by Swell: tap a size and a real wave rises to that height. */
export default function SizeBySwell() {
  const [i, setI] = useState(2);
  const reduce = useReducedMotion();
  const s = SIZES[i];
  return (
    <section aria-labelledby="swell" className="bg-cream py-16 md:py-24">
      <div className="wrap grid items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <div className="grid gap-5">
          <span className="pc-label text-navy/60">Every piece</span>
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
        <div className="relative aspect-[9/7] w-full overflow-hidden rounded-[6px] bg-navy" role="img" aria-label={`Wave at ${s.name} height`}>
          <motion.div className="absolute inset-x-0 top-0 aspect-[2/3]" initial={false} animate={{ y: offset(s.y) }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 60, damping: 16 }}>
            <Image src="/assets/photos/stock-wave-crest.jpg" alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </motion.div>
          {SIZES.map((m) => (
            <div key={m.size} className="absolute inset-x-0 flex items-center gap-2 px-3" style={{ top: `${m.y * 100}%` }}>
              <span className="h-px flex-1 border-t border-dashed border-paper/70" />
              <span className="pc-label bg-navy/80 px-2 py-0.5 text-[9px] text-paper">{m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
