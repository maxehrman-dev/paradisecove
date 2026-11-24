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

/** 5. Size by Swell: tap a size and a real wave rises to that height. The photo sits flush to the right edge. */
export default function SizeBySwell() {
  const [i, setI] = useState(2);
  const reduce = useReducedMotion();
  const s = SIZES[i];
  return (
    <section data-swell="" aria-labelledby="swell" className="grid bg-cream md:grid-cols-2 md:items-center">
      <div className="edge-l grid gap-7 py-16 md:order-1 md:py-24">
        <span className="eyebrow">Every piece</span>
        <h2 id="swell" className="pc-head text-[clamp(38px,5.4vw,68px)]">Sized by swell</h2>
        <p className="max-w-[36ch] text-[15px] leading-relaxed text-navy/75">Every size is named for a wave height. Yours is circled on the neck label.</p>
        <div role="radiogroup" aria-label="Size" className="grid grid-cols-5 border border-navy">
          {SIZES.map((x, k) => (
            <button key={x.size} data-y={x.y} data-label={`${x.size} · ${x.name}`} type="button" role="radio" aria-checked={k === i} onClick={() => setI(k)}
              className={`grid min-h-[68px] place-items-center gap-1 px-1 py-2 transition-colors duration-300 ${k > 0 ? "border-l border-navy" : ""} ${k === i ? "bg-navy text-cream" : "bg-transparent text-navy hover:bg-paper"}`}>
              <span className="font-cove text-xl font-black leading-none">{x.size}</span>
              <span className="font-label text-[8.5px] font-extrabold uppercase leading-tight tracking-[.1em] sm:text-[9.5px]">{x.name}</span>
            </button>
          ))}
        </div>
        <p data-swell-live="" aria-live="polite" className="eyebrow text-navy">{s.size} · {s.name}</p>
      </div>
      <div className="relative order-2 aspect-[9/7] w-full overflow-hidden bg-navy" data-swell-frame="" role="img" aria-label={`Wave at ${s.name} height`}>
        <motion.div data-swell-photo="" className="absolute inset-x-0 top-0 aspect-[2/3]" initial={false} animate={{ y: offset(s.y) }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 60, damping: 16 }}>
          <Image src="/assets/photos/stock-wave-crest.jpg" alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </motion.div>
        {SIZES.map((m) => (
          <div key={m.size} className="absolute inset-x-0 flex items-center gap-3 px-4 md:px-6" style={{ top: `${m.y * 100}%` }}>
            <span data-mark-line={m.size} className={`h-px flex-1 transition-opacity duration-500 ${m.size === s.size ? "bg-paper" : "bg-paper/40"}`} />
            <span data-mark-label={m.size} className={`pc-label text-[9px] tracking-[.24em] transition-opacity duration-500 ${m.size === s.size ? "text-paper" : "text-paper/60"}`}>{m.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
