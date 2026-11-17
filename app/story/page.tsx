import Link from "next/link";
export const metadata = { title: "Story" };
export default function Page() {
  return (
    <section className="wrap grid min-h-[50svh] place-content-center justify-items-center gap-4 py-24 text-center">
      <span className="pc-label text-rose">Next up</span>
      <h1 className="pc-head text-5xl">Story</h1>
      <p className="text-navy/70">This page gets built after the home page is signed off.</p>
      <Link href="/" className="pc-label border-b-2 border-navy">Back to the shore</Link>
    </section>
  );
}
