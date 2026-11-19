import Image from "next/image";
import Slot from "./Slot";
import type { Product } from "@/lib/catalog";
import { SITE } from "@/lib/site";

/** Product tile: the back print first (that's the graphic), the front on hover. Ends at ATLAS, never a cart. */
export default function ProductCard({ p, accent = "rust" }: { p: Product; accent?: "rust" | "coral" }) {
  const later = p.status === "later-drop";
  const imgs = p.images as { back: string | null; front: string | null };
  return (
    <article className="group grid gap-3">
      <div className="relative aspect-square overflow-hidden rounded-[4px] bg-cream">
        {imgs.back ? (
          <>
            <Image src={imgs.back} alt={`${p.name}, back`} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" className="object-cover" />
            {imgs.front && <Image src={imgs.front} alt="" aria-hidden="true" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />}
          </>
        ) : (
          <Slot file={`${p.id}.jpg`} label={p.name} className="absolute inset-0" />
        )}
        {later && <span className="cp-fine absolute left-3 top-3 bg-paper px-2 py-1 text-[9px] text-navy">Later drop</span>}
      </div>
      <div className={`flex items-baseline justify-between gap-3 border-t-2 pt-2 ${accent === "rust" ? "border-rust" : "border-coral"}`}>
        <h3 className="grid font-club text-[13px] font-extrabold uppercase tracking-[.08em] [font-stretch:112%]">
          {"number" in p && p.number ? <span className="text-[10px] text-navy/50">No. {p.number}</span> : null}<span>{p.name}</span>
        </h3>
        <span className="font-club text-sm font-extrabold tabular-nums">{p.price ? `$${p.price}` : ""}</span>
      </div>
      {"line" in p && p.line ? <p className="cp-quote -mt-1 text-[15px] leading-snug text-navy/80">{p.line}</p> : null}
      <p className="cp-fine text-[9px] text-navy/60">{later ? "Coming in a later drop" : SITE.where}</p>
    </article>
  );
}
