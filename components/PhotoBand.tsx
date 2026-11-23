import ParallaxPhoto from "./ParallaxPhoto";

/** A full-bleed photo with a flat plaque cut flush into its bottom-left corner. No gradients: the plaque carries the text. */
export default function PhotoBand({ src, alt, eyebrow, title, line, tone = "navy", position = "50% 50%", club = false }: {
  src: string; alt: string; eyebrow?: string; title: string; line?: string; tone?: "navy" | "paper" | "cream"; position?: string; club?: boolean;
}) {
  const plaque = tone === "navy" ? "bg-navy text-cream" : tone === "cream" ? "bg-cream text-navy" : "bg-paper text-navy";
  return (
    <section aria-label={title} className="relative overflow-hidden">
      <ParallaxPhoto src={src} alt={alt} position={position} strength={10} className="h-[72svh] min-h-[440px] w-full md:h-[92svh]" />
      <div className={`edge-l relative grid gap-3 py-9 md:absolute md:bottom-0 md:left-0 md:w-[calc(max(0px,(100vw-1240px)/2)+560px)] md:py-12 ${plaque}`}>
        {eyebrow && <span className={`${club ? "cp-fine" : "pc-label tracking-[.34em]"} text-[10px] opacity-70`}>{eyebrow}</span>}
        <h2 className={club ? "cp-head text-[clamp(30px,4vw,54px)] text-rust" : "pc-head text-[clamp(30px,4vw,54px)]"}>{title}</h2>
        {line && <p className={club ? "cp-quote text-lg leading-snug" : "text-[15px] leading-relaxed opacity-80"}>{line}</p>}
      </div>
    </section>
  );
}
