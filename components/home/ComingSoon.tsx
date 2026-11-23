import { SITE } from "@/lib/site";

/** Pre-launch block: the headline, where, and a jump to the signup in the footer. */
export default function ComingSoon() {
  return (
    <section aria-labelledby="coming-soon" className="bg-paper py-24 md:py-32 text-center">
      <div className="wrap grid justify-items-center gap-5">
        <span className="eyebrow">{SITE.store}</span>
        <h2 id="coming-soon" className="pc-head text-[clamp(36px,6vw,68px)]">First drop coming soon.</h2>
        <p className="max-w-[34ch] text-[15px] leading-relaxed text-navy/75">Wish you were here. Leave your email and we&apos;ll tell you the day it lands.</p>
        <a href="#signup" className="btn-solid mt-4">Get the drop email</a>
      </div>
    </section>
  );
}
