import { SITE } from "@/lib/site";

/** Pre-launch block: the headline, where, and a jump to the signup in the footer. */
export default function ComingSoon() {
  return (
    <section aria-labelledby="coming-soon" className="bg-paper pb-24 pt-16 text-center">
      <div className="wrap grid justify-items-center gap-4">
        <span className="pc-label text-navy/60">{SITE.store}</span>
        <h2 id="coming-soon" className="pc-head text-[clamp(36px,6vw,68px)]">First drop coming soon.</h2>
        <p className="max-w-[34ch] text-navy/80">Wish you were here. Leave your email and we&apos;ll tell you the day it lands.</p>
        <a href="#signup" className="pc-label mt-2 inline-flex min-h-[48px] items-center rounded-full bg-navy px-7 text-cream hover:bg-coral hover:text-navy">Get the drop email</a>
      </div>
    </section>
  );
}
