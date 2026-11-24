"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** A real photo that drifts slightly slower than the page as you scroll. Transform only. */
export default function ParallaxPhoto({ src, alt, className = "", strength = 8, sizes = "100vw", priority = false, position = "50% 50%" }: {
  src: string; alt: string; className?: string; strength?: number; sizes?: string; priority?: boolean; position?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div data-parallax={strength} className="absolute inset-x-0 will-change-transform" style={reduce ? { top: 0, bottom: 0 } : { y, top: `-${strength + 2}%`, bottom: `-${strength + 2}%` }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: position }} />
      </motion.div>
    </div>
  );
}
