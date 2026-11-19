"use client";
import Image from "next/image";
import { useState } from "react";
import type { Club, Product } from "@/lib/catalog";
import { SITE } from "@/lib/site";

/** A small embossed-style seal, drawn in one ink like a stamp on a real membership card. */
function Seal() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12 text-rust" aria-hidden="true">
      <defs><path id="sealArc" d="M 32 32 m -22 0 a 22 22 0 1 1 44 0 a 22 22 0 1 1 -44 0" /></defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="32" r="16" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <text fill="currentColor" style={{ font: "700 6.2px var(--font-archivo)", letterSpacing: "1.6px" }}><textPath href="#sealArc">LA JOLLA · CA 92037 · LA JOLLA · CA 92037 ·</textPath></text>
      <text x="32" y="35.5" textAnchor="middle" fill="currentColor" style={{ font: "900 9px var(--font-archivo)" }}>PCSC</text>
    </svg>
  );
}

/** A membership card for one club. Hover (desktop) or tap flips it to show the club's piece. */
export default function ClubCard({ club, index, product }: { club: Club; index: number; product?: Product }) {
  const [flipped, setFlipped] = useState(false);
  const no = String(index + 1).padStart(2, "0");
  const bg = club.card === "paper" ? "bg-paper" : "bg-cream";
  const img = product ? (product.images as { back: string | null }).back : null;
  return (
    <button type="button" onClick={() => setFlipped((f) => !f)} aria-pressed={flipped} aria-label={`${club.name} membership card. ${flipped ? "Showing the piece. Tap to see the card." : "Tap to see the piece."}`}
      className="flip group relative block aspect-[5/7] w-full text-left [perspective:1200px]">
      <span className={`flip-inner absolute inset-0 transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
        {/* Front: the card */}
        <span className={`absolute inset-0 grid grid-rows-[auto_1fr_auto] rounded-[8px] border-[3px] border-rust p-4 text-navy [backface-visibility:hidden] sm:p-5 ${bg}`}>
          <span className="flex items-center justify-between cp-fine text-[9px] text-navy/70"><span>Member</span><span>No. {no}</span></span>
          <span className="grid content-center gap-2 py-3">
            <span className="cp-head block text-[clamp(24px,3.2vw,36px)] text-rust">{club.name}</span>
            <span className="cp-quote block text-[15px] leading-snug sm:text-base">{club.motto}</span>
          </span>
          <span className="grid gap-3">
            <span className="flex items-end justify-between gap-3">
              <span className="grid flex-1 gap-1">
                <span className="block h-px border-b border-dashed border-navy/40" />
                <span className="cp-fine text-[8px] text-navy/60">Member's signature</span>
              </span>
              <Seal />
            </span>
            <span className="border-t-2 border-rust pt-2 cp-fine text-[8px] text-navy/70">Members since forever</span>
          </span>
        </span>
        {/* Back: the piece */}
        <span className="absolute inset-0 grid grid-rows-[1fr_auto] overflow-hidden rounded-[8px] border-[3px] border-rust bg-paper text-navy [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {img ? (
            <span className="relative block"><Image src={img} alt={`${product!.name}, back print`} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" /></span>
          ) : (
            <span className="grid place-content-center gap-2 p-5 text-center">
              <span className="cp-club text-[11px] text-rust">{club.name}</span>
              <span className="cp-quote text-lg">Pieces for this room are coming in a later drop.</span>
            </span>
          )}
          <span className="grid gap-1 border-t-2 border-rust bg-cream p-3">
            <span className="flex justify-between gap-2 font-club text-[12px] font-extrabold uppercase tracking-[.06em] [font-stretch:112%]">
              <span>{product ? product.name : club.name}</span><span className="tabular-nums">{product?.price ? `$${product.price}` : ""}</span>
            </span>
            <span className="cp-fine text-[8px] text-navy/60">{product ? SITE.where : "Members since forever"}</span>
          </span>
        </span>
      </span>
    </button>
  );
}
