"use client";
import { motion, useReducedMotion } from "framer-motion";

/** A quiet fade-up as a section arrives. Opacity and transform only. */
export default function Reveal({ children, delay = 0, slow = false, className = "" }: { children: React.ReactNode; delay?: number; slow?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div data-reveal="" className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: slow ? 1.4 : 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
