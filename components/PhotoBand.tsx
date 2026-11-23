import ParallaxPhoto from "./ParallaxPhoto";

/** A full-bleed photo with a flat plaque cut flush into its bottom-left corner. No gradients: the plaque carries the text. */
export default function PhotoBand({ src, alt, eyebrow, title, line, tone = "navy", position = "50% 50%" }: {
  src: string; alt: string; eyebrow?: string; title: string; line?: string; tone?: "navy" | "paper"; position?: string;
}) {
  const plaque = tone === "navy" ? "bg-navy text-cream" : "bg-paper text-navy";
  return (
    <section aria-label={title} className="relative overflow-hidden">
      <ParallaxPhoto src={src} alt={alt} position={position} strength={10} className="h-[72svh] min-h-[440px] w-full md:h-[92svh]" />
      <div className={`edge-l relative grid gap-3 py-9 md:absolute md:bottom-0 md:left-0 md:w-[calc(max(0px,(100vw-1240px)/2)+560px)] md:py-12 ${plaque}`}>
        {eyebrow && <span className="pc-label text-[10px] tracking-[.34em] opacity-70">{eyebrow}</span>}
        <h2 className="pc-head text-[clamp(30px,4vw,54px)]">{title}</h2>
        {line && <p className="text-[15px] leading-relaxed opacity-80">{line}</p>}
      </div>
    </section>
  );
}
