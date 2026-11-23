import Image from "next/image";

/** A full-bleed photo with a flat plaque on top. No gradients: the plaque carries the text. */
export default function PhotoBand({ src, alt, eyebrow, title, line, tone = "navy", position = "50% 50%" }: {
  src: string; alt: string; eyebrow?: string; title: string; line?: string; tone?: "navy" | "paper"; position?: string;
}) {
  const plaque = tone === "navy" ? "bg-navy text-cream" : "bg-paper text-navy";
  return (
    <section aria-label={title} className="relative overflow-hidden">
      <div className="relative h-[78svh] min-h-[460px] w-full md:h-[86svh]">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
      </div>
      <div className="wrap pointer-events-none absolute inset-x-0 bottom-6 md:bottom-10">
        <div className={`pointer-events-auto grid w-fit max-w-[min(520px,100%)] gap-2 px-6 py-5 md:px-8 md:py-7 ${plaque}`}>
          {eyebrow && <span className="pc-label text-[10px] opacity-75">{eyebrow}</span>}
          <h2 className="pc-head text-[clamp(28px,4.4vw,52px)]">{title}</h2>
          {line && <p className="text-[15px] opacity-85">{line}</p>}
        </div>
      </div>
    </section>
  );
}
