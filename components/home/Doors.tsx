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
  const base = `group relative flex min-h-0 flex-1 flex-col items-center overflow-hidden text-center transition-[flex-grow] duration-500 ease-out md:hover:grow-[1.45] ${className}`;
  return locked
    ? <div className={base} aria-label={`${label}. Opens with the first drop.`} role="group">{children}</div>
    : <Link href={href} className={base} aria-label={label}>{children}</Link>;
}

/** Two tall doors: the beach side and the clubhouse. Hover widens a door. Locked before launch. */
export default function Doors({ locked }: { locked: boolean }) {
  return (
    <div className="flex h-full w-full flex-col gap-3 md:flex-row md:gap-5">
      {/* Paradise Cove: an arched beach door */}
      <DoorShell href="/paradise-cove" locked={locked} label="Paradise Cove, women's" className="bg-coral text-navy [border-top-left-radius:50%_22%] [border-top-right-radius:50%_22%] max-md:[border-top-left-radius:50%_34%] max-md:[border-top-right-radius:50%_34%]">
        <div className="flex h-full w-full flex-col items-center justify-between px-6 pb-5 pt-[12%] md:pb-8">
          <span className="pc-label text-[10px] text-navy/80">Women's · The beach side</span>
          <div className="grid justify-items-center gap-3">
            <Image src="/assets/logos/script-navy.png" alt="Paradise Cove" width={1022} height={193} className="logo-fade h-auto w-[min(360px,76%)]" />
            <span className="pc-head text-lg tracking-[.2em] sm:text-2xl">Sun · Salt · Surf</span>
          </div>
          <span className="pc-label inline-flex items-center gap-2 text-[11px]">
            {locked ? <><Lock /> Opens with the first drop</> : <>Step onto the sand <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></>}
          </span>
        </div>
      </DoorShell>
      {/* Club Paradise: the clubhouse door, under a striped awning */}
      <DoorShell href="/club-paradise" locked={locked} label="Club Paradise, men's" className="bg-navy text-cream">
        <svg className="absolute inset-x-0 top-0 h-10 w-full md:h-14" viewBox="0 0 400 56" preserveAspectRatio="none" aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => <rect key={i} x={i * 40} y="0" width="40" height="40" fill={i % 2 ? "#F4F0E4" : "#C2603A"} />)}
          {Array.from({ length: 10 }, (_, i) => <path key={`s${i}`} d={`M${i * 40} 40 a20 16 0 0 0 40 0 Z`} fill={i % 2 ? "#F4F0E4" : "#C2603A"} />)}
        </svg>
        <span className="absolute right-[12%] top-1/2 h-4 w-4 rounded-full bg-rust md:h-5 md:w-5" aria-hidden="true" />
        <div className="flex h-full w-full flex-col items-center justify-between px-6 pb-5 pt-14 md:pb-8 md:pt-24">
          <span className="cp-fine text-[10px] text-cream/70">Men's · The clubhouse</span>
          <div className="grid justify-items-center gap-3">
            <span className="cp-head text-[clamp(34px,6.4vw,76px)]">Club<br />Paradise</span>
            <span className="cp-club text-[11px] text-cream/80 sm:text-xs">Members since forever</span>
          </div>
          <span className="cp-fine inline-flex items-center gap-2 text-[11px]">
            {locked ? <><Lock /> Opens with the first drop</> : <>Members, come in <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></>}
          </span>
        </div>
      </DoorShell>
    </div>
  );
}
