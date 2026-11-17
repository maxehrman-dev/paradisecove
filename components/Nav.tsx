import Image from "next/image";
import Link from "next/link";

function CollectionLink({ href, name, audience, align }: { href: string; name: string; audience: string; align: "left" | "right" }) {
  return (
    <Link href={href} className={`group inline-flex flex-col py-2 ${align === "right" ? "items-end text-right" : "items-start"}`}>
      <span className="pc-label text-[11px] tracking-[.24em] sm:text-[12px]">{name}</span>
      <span className="font-label text-[10px] font-extrabold uppercase tracking-[.2em] text-rose">{audience}</span>
      <span className="mt-1 h-[2px] w-0 bg-navy transition-[width] duration-300 group-hover:w-full" aria-hidden="true" />
    </Link>
  );
}

const small = "font-label text-[10px] font-extrabold uppercase tracking-[.22em] text-navy/70 hover:text-navy";

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
          <CollectionLink href="/paradise-cove" name="Paradise Cove" audience="Women's" align="left" />
          <CollectionLink href="/club-paradise" name="Club Paradise" audience="Men's" align="right" />
        </div>
        {/* Desktop: Paradise Cove left, logo centered, Club Paradise right, Story and Find us far right */}
        <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-8 py-3 md:grid">
          <div><CollectionLink href="/paradise-cove" name="Paradise Cove" audience="Women's" align="left" /></div>
          <Link href="/" aria-label="Paradise Cove Surf Club home"><Image src="/assets/logos/stacked-navy.png" alt="Paradise Cove Surf Club" width={944} height={422} priority className="logo-fade h-14 w-auto" /></Link>
          <div className="flex items-center justify-end gap-10">
            <CollectionLink href="/club-paradise" name="Club Paradise" audience="Men's" align="right" />
            <div className="flex flex-col items-end gap-1 border-l border-navy/15 pl-6">
              <Link href="/story" className={small}>Story</Link>
              <Link href="/find-us" className={small}>Find us</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
