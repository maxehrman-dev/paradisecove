import Image from "next/image";
import Link from "next/link";

function CollectionLink({ href, name, audience, align, accent }: { href: string; name: string; audience: string; align: "left" | "right"; accent: "coral" | "rust" }) {
  return (
    <Link href={href} className={`group inline-flex flex-col py-2 ${align === "right" ? "items-end text-right" : "items-start"}`}>
      <span className="pc-label text-[10.5px] tracking-[.3em] sm:text-[11px]">{name}</span>
      <span className="mt-0.5 font-label text-[9px] font-extrabold uppercase tracking-[.3em] text-navy/50">{audience}</span>
      <span className={`mt-1.5 h-px w-0 transition-[width] duration-300 group-hover:w-full ${accent === "coral" ? "bg-coral" : "bg-rust"}`} aria-hidden="true" />
    </Link>
  );
}

const small = "font-label text-[9.5px] font-extrabold uppercase tracking-[.3em] text-navy/60 transition-colors hover:text-navy";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-paper pt-[env(safe-area-inset-top)]">
      <nav aria-label="Main" className="wrap">
        {/* Phone: logo row, then the two collections */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-2 md:hidden">
          <Link href="/story" className={small}>Story</Link>
          <Link href="/" aria-label="Paradise Cove Surf Club home"><Image src="/assets/logos/stacked-navy.png" alt="Paradise Cove Surf Club" width={944} height={422} priority className="logo-fade h-11 w-auto" /></Link>
          <Link href="/find-us" className={`${small} justify-self-end`}>Find us</Link>
        </div>
        <div className="grid grid-cols-2 border-t border-navy/10 md:hidden">
          <CollectionLink href="/paradise-cove" name="Paradise Cove" audience="Women's" align="left" accent="coral" />
          <CollectionLink href="/club-paradise" name="Club Paradise" audience="Men's" align="right" accent="rust" />
        </div>
        {/* Desktop: Paradise Cove left, logo centered, Club Paradise right, Story and Find us far right */}
        <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-8 py-4 md:grid">
          <div><CollectionLink href="/paradise-cove" name="Paradise Cove" audience="Women's" align="left" accent="coral" /></div>
          <Link href="/" aria-label="Paradise Cove Surf Club home"><Image src="/assets/logos/stacked-navy.png" alt="Paradise Cove Surf Club" width={944} height={422} priority className="logo-fade h-[52px] w-auto" /></Link>
          <div className="flex items-center justify-end gap-10">
            <CollectionLink href="/club-paradise" name="Club Paradise" audience="Men's" align="right" accent="rust" />
            <div className="flex items-center gap-8 border-l border-navy/15 pl-8">
              <Link href="/story" className={small}>Story</Link>
              <Link href="/find-us" className={small}>Find us</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
