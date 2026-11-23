"use client";
import Script from "next/script";
import { useEffect } from "react";
import ig from "@/data/instagram.json";

declare global { interface Window { instgrm?: { Embeds: { process: () => void } } } }

/**
 * Real posts from @paradisecovesurf, embedded with Instagram's own embed.
 * Add post links (https://www.instagram.com/p/XXXX/) to data/instagram.json. Until then it's a follow block.
 */
export default function InstagramFeed({ tone = "paper", limit = 3 }: { tone?: "paper" | "cream"; limit?: number }) {
  const posts = (ig.posts as string[]).slice(0, limit);
  useEffect(() => { window.instgrm?.Embeds.process(); }, [posts.length]);
  return (
    <section aria-labelledby="instagram" className={`${tone === "cream" ? "bg-cream" : "bg-paper"} py-20 md:py-28`}>
      <div className="wrap grid gap-10">
        <div className="grid gap-6 border-b border-navy/15 pb-10 md:grid-cols-[1fr_auto] md:items-end">
          <div className="grid gap-3">
            <span className="eyebrow">On Instagram</span>
            <h2 id="instagram" className="pc-head text-[clamp(30px,4.6vw,56px)]">{ig.handle}</h2>
          </div>
          <a href={ig.profile} target="_blank" rel="noopener noreferrer" className="btn-line w-fit">
            Follow along <span aria-hidden="true">→</span>
          </a>
        </div>
        {posts.length > 0 ? (
          <>
            <div className="grid justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((url) => (
                <blockquote key={url} className="instagram-media !m-0 w-full max-w-[400px]" data-instgrm-permalink={url} data-instgrm-version="14">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="pc-label">View this post on Instagram</a>
                </blockquote>
              ))}
            </div>
            <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" onLoad={() => window.instgrm?.Embeds.process()} />
          </>
        ) : (
          <p className="max-w-[44ch] text-[15px] leading-relaxed text-navy/75">Lifestyle first, product at launch. Follow for the first drop.</p>
        )}
      </div>
    </section>
  );
}
