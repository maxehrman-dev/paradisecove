import Image from "next/image";
import Link from "next/link";

function Lock() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true" className="inline-block">
      <rect x="1" y="7" width="12" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7V4.8a3 3 0 0 1 6 0V7" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function DoorShell({ href, locked, className, children, label }: { href: string; locked: boolean; className: string; children: React.ReactNode; label: string }) {
  const base = `group relative flex min-h-0 flex-1 flex-col overflow-hidden transition-[flex-grow] duration-500 ease-out md:hover:grow-[1.45] ${className}`;
  return locked
    ? <div className={base} aria-label={`${label}. Opens with the first drop.`} role="group">{children}</div>
    : <Link href={href} className={base} aria-label={label}>{children}</Link>;
}

/** Two tall doors with the real pieces inside: the beach side and the clubhouse. Hover widens a door. */
export default function Doors({ locked }: { locked: boolean }) {
  return (
    <div className="flex h-full w-full flex-col gap-3 md:flex-row md:gap-5">
      {/* Paradise Cove: an arched beach door, coral frame, the crewneck inside */}
      <DoorShell href="/paradise-cove" locked={locked} label="Paradise Cove, women's" className="bg-coral p-2 text-navy [border-top-left-radius:50%_20%] [border-top-right-radius:50%_20%] md:p-3 max-md:[border-top-left-radius:50%_30%] max-md:[border-top-right-radius:50%_30%]">
        <div className="relative min-h-0 flex-1 overflow-hidden bg-studio [border-top-left-radius:50%_19%] [border-top-right-radius:50%_19%] max-md:[border-top-left-radius:50%_29%] max-md:[border-top-right-radius:50%_29%]">
          <Image src="/assets/products/crewneck-front.jpg" alt="The off-shoulder crewneck" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover object-[50%_45%] transition-transform duration-700 group-hover:scale-[1.03]" />
        </div>
        <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-3 md:px-3">
          <div className="grid gap-1">
            <Image src="/assets/logos/script-navy.png" alt="Paradise Cove" width={1022} height={193} className="logo-fade h-auto w-[min(220px,48vw)]" />
            <span className="pc-label text-[10px]">Women&apos;s · The beach side</span>
          </div>
          <span className="pc-label inline-flex shrink-0 items-center gap-2 text-[10px]">{locked ? <><Lock /> Soon</> : <>Enter <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></>}</span>
        </div>
      </DoorShell>
      {/* Club Paradise: the clubhouse door, navy frame under a rust and cream awning, a tee inside */}
      <DoorShell href="/club-paradise" locked={locked} label="Club Paradise, men's" className="bg-navy p-2 pt-0 text-cream md:p-3 md:pt-0">
        <svg className="-mx-2 block h-9 w-[calc(100%+1rem)] shrink-0 md:-mx-3 md:h-12 md:w-[calc(100%+1.5rem)]" viewBox="0 0 400 48" preserveAspectRatio="none" aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${i * 40} 0 H${i * 40 + 40} V30 a20 16 0 0 1 -40 0 Z`} fill={i % 2 ? "#F4F0E4" : "#C2603A"} />)}
        </svg>
        <div className="relative mt-2 min-h-0 flex-1 overflow-hidden bg-studio">
          <Image src="/assets/products/tee-11-back.jpg" alt="The Yacht Club tee" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          <span className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-rust md:h-5 md:w-5" aria-hidden="true" />
        </div>
        <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-3 md:px-3">
          <div className="grid gap-1">
            <span className="cp-head text-[clamp(22px,3vw,34px)]">Club Paradise</span>
            <span className="cp-fine text-[10px] text-cream/75">Men&apos;s · The clubhouse</span>
          </div>
          <span className="cp-fine inline-flex shrink-0 items-center gap-2 text-[10px]">{locked ? <><Lock /> Soon</> : <>Enter <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></>}</span>
        </div>
      </DoorShell>
    </div>
  );
}
