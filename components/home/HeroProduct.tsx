import Slot from "../Slot";
import { productById } from "@/lib/catalog";
import { SITE } from "@/lib/site";

/** 3. The crewneck alone, with one line. */
export default function HeroProduct() {
  const p = productById("off-shoulder-crewneck")!;
  return (
    <section aria-labelledby="hero-product" className="bg-paper py-16 md:py-24">
      <div className="wrap grid justify-items-center gap-8 text-center">
        <span className="pc-label text-rose">Paradise Cove · Women's</span>
        <Slot file={p.images.front} label="The off-shoulder crewneck, front" className="aspect-[4/5] w-full max-w-[520px]" />
        <div className="grid justify-items-center gap-3">
          <h2 id="hero-product" className="pc-head text-[clamp(30px,5vw,52px)]">{p.name}</h2>
          <p className="max-w-[40ch] text-base text-navy/80">{p.line} <span className="font-extrabold text-navy">${p.price}</span></p>
          <p className="pc-label text-[10px] text-navy/60">{SITE.where}</p>
        </div>
      </div>
    </section>
  );
}
