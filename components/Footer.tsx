import Image from "next/image";
import Link from "next/link";
import SignupForm from "./SignupForm";
import ParallaxPhoto from "./ParallaxPhoto";
import { SITE } from "@/lib/site";

/** Deep water: full navy, cream logo, where to find us, signup, coordinates in fine print. */
export default function Footer() {
  return (
    <footer className="relative bg-navy text-cream" id="signup">
      <ParallaxPhoto src="/assets/photos/stock-underwater-light.jpg" alt="" strength={10} className="h-[34svh] min-h-[220px] w-full" />
      <div className="wrap grid gap-12 pb-10 pt-12 md:grid-cols-[1.1fr_1fr] md:gap-16 md:pt-16">
        <div className="grid content-start gap-6">
          <Image src="/assets/logos/wave-cream.png" alt="Paradise Cove" width={1173} height={748} className="logo-fade w-[min(340px,78%)] h-auto" />
          <p className="pc-head text-3xl text-coral sm:text-4xl">Wish you were here.</p>
          <dl className="grid gap-3 font-label text-sm">
            <div><dt className="pc-label text-cream/60">Where</dt><dd className="mt-1">{SITE.store} · {SITE.city}</dd></div>
            <div><dt className="pc-label text-cream/60">Follow</dt><dd className="mt-1"><a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="underline decoration-coral underline-offset-4 hover:text-coral">{SITE.instagram.handle}</a></dd></div>
          </dl>
        </div>
        <div className="grid content-start gap-10">
          <div className="grid gap-2">
            <p className="pc-head text-2xl">First drop coming soon.</p>
            <SignupForm tone="dark" />
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-3 font-label text-sm">
            <Link href="/paradise-cove" className="hover:text-coral">Paradise Cove · Women's</Link>
            <Link href="/club-paradise" className="hover:text-coral">Club Paradise · Men's</Link>
            <Link href="/story" className="hover:text-coral">Story</Link>
            <Link href="/find-us" className="hover:text-coral">Find us</Link>
          </nav>
        </div>
      </div>
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-cream/15 py-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pc-label text-[10px] text-cream/60">
        <span>{SITE.address}</span>
        <span>{SITE.coords}</span>
        <span>© {new Date().getFullYear()} {SITE.name}</span>
      </div>
    </footer>
  );
}
