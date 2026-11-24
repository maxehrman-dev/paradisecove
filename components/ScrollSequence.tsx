"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

type Set = { dir: string; count: number };
export type Beat = { from: number; to: number; children: React.ReactNode; className?: string };

const src = (s: Set, i: number) => `${s.dir}/${String(i + 1).padStart(3, "0")}.webp`;

/** One line of copy that fades in and out over its slice of the scroll. */
function BeatLayer({ p, beat, first }: { p: MotionValue<number>; beat: Beat; first: boolean }) {
  // Computed by hand (function form) so ranges near 0 and 1 never hit the accelerated path's [0,1] offset limit.
  const f = 0.06;
  const level = (v: number) => {
    const fadeIn = first ? 1 : Math.min(1, Math.max(0, (v - (beat.from - f)) / f));
    const fadeOut = beat.to >= 1 ? 1 : Math.min(1, Math.max(0, ((beat.to + f) - v) / f));
    return Math.min(fadeIn, fadeOut);
  };
  const opacity = useTransform(p, (v) => level(v));
  const y = useTransform(p, (v) => (1 - level(v)) * (v < beat.from ? 24 : -24));
  const [live, setLive] = useState(first);
  useMotionValueEvent(opacity, "change", (o) => setLive(o > 0.05));
  return <motion.div data-beat-from={beat.from} data-beat-to={beat.to} data-beat-first={first ? "1" : undefined} style={{ opacity, y }} aria-hidden={!live} className={`absolute inset-x-0 bottom-0 ${live ? "" : "pointer-events-none"} ${beat.className ?? ""}`}>{beat.children}</motion.div>;
}

/**
 * A video told by scroll: the first frame shows on arrival, and scrolling plays it forward (and back).
 * Frames are a WebP sequence drawn to a canvas, blended between neighbours so it stays smooth.
 * Reduced motion: a still frame, no pinning.
 */
export default function ScrollSequence({ desktop, mobile, length = 320, fit = "cover", mobileFit = "cover", poster, alt, beats = [], className = "", bg = "#1C2B4A" }: {
  desktop: Set; mobile?: Set; length?: number; fit?: "cover" | "contain"; mobileFit?: "cover" | "contain";
  poster?: number; alt: string; beats?: Beat[]; className?: string; bg?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const frames = useRef<(HTMLImageElement | null)[]>([]);
  const progress = useRef(0);
  const [set, setSet] = useState<Set | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Pick the frame set for this screen.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const pick = () => { setIsMobile(mq.matches); setSet(mq.matches && mobile ? mobile : desktop); };
    pick(); mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, [desktop, mobile]);

  const mode = isMobile ? mobileFit : fit;

  const draw = () => {
    const c = canvas.current; if (!c || !set) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = c.clientWidth, h = c.clientHeight;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
    const f = progress.current * (set.count - 1);
    const i = Math.floor(f), t = f - i;
    // Nearest loaded frame at or before i, so it never goes blank while frames stream in.
    let a = frames.current[i], k = i;
    while ((!a || !a.complete) && k > 0) a = frames.current[--k];
    if (!a || !a.complete || !a.naturalWidth) return;
    const b = frames.current[i + 1];
    const paint = (img: HTMLImageElement, alpha: number) => {
      const s = mode === "cover" ? Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight) : Math.min(c.width / img.naturalWidth, c.height / img.naturalHeight);
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      ctx.globalAlpha = alpha; ctx.drawImage(img, (c.width - dw) / 2, (c.height - dh) / 2, dw, dh);
    };
    ctx.globalAlpha = 1; ctx.fillStyle = bg; ctx.fillRect(0, 0, c.width, c.height);
    paint(a, 1);
    if (k === i && b && b.complete && b.naturalWidth && t > 0.01) paint(b, t);
    ctx.globalAlpha = 1;
  };
  const drawRef = useRef(draw); drawRef.current = draw;
  const redraw = () => requestAnimationFrame(() => drawRef.current());

  // Load the first frame now; stream the rest once the section is near.
  useEffect(() => {
    if (!set) return;
    frames.current = new Array(set.count).fill(null);
    const load = (i: number) => new Promise<void>((res) => {
      const img = new Image(); img.decoding = "async";
      img.onload = img.onerror = () => { res(); redraw(); };
      img.src = src(set, i); frames.current[i] = img;
    });
    const startAt = reduce ? (poster ?? 0) : Math.round(scrollYProgress.get() * (set.count - 1));
    progress.current = scrollYProgress.get();
    load(0); if (startAt) load(startAt);
    if (reduce) { progress.current = startAt / Math.max(1, set.count - 1); const onR = () => redraw(); window.addEventListener("resize", onR); return () => window.removeEventListener("resize", onR); }
    let cancelled = false;
    const io = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      // Coarse pass first (every 8th frame) so scrubbing works right away, then fill in.
      const order: number[] = [];
      for (const step of [8, 4, 2, 1]) for (let i = 0; i < set.count; i += step) if (!order.includes(i)) order.push(i);
      let n = 0; const workers = Array.from({ length: 6 }, async () => { while (!cancelled && n < order.length) { const i = order[n++]; if (!frames.current[i]) await load(i); } });
      await Promise.all(workers);
    }, { rootMargin: "100% 0px" });
    if (ref.current) io.observe(ref.current);
    const onResize = () => redraw();
    window.addEventListener("resize", onResize);
    return () => { cancelled = true; io.disconnect(); window.removeEventListener("resize", onResize); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [set, reduce]);

  useMotionValueEvent(scrollYProgress, "change", (v) => { if (reduce) return; progress.current = v; redraw(); });

  return (
    <section ref={ref} data-seq={JSON.stringify({ d: desktop, m: mobile, fit, mfit: mobileFit, bg, poster: poster ?? 0 })} className={`relative ${className}`} style={{ height: reduce ? undefined : `${length}svh`, background: bg }}>
      <div className={`${reduce ? "relative" : "sticky top-0"} h-[100svh] overflow-hidden`}>
        <canvas ref={canvas} role="img" aria-label={alt} className="absolute inset-0 h-full w-full" />
        {beats.map((b, i) => reduce
          ? (i === 0 ? <div key={i} className={`absolute inset-x-0 bottom-0 ${b.className ?? ""}`}>{b.children}</div> : null)
          : <BeatLayer key={i} p={scrollYProgress} beat={b} first={i === 0 && b.from === 0} />)}
      </div>
    </section>
  );
}
