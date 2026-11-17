/** A clearly named placeholder for a photo that doesn't exist yet. Drop the file in /public/assets/photos/<file>. */
export default function Slot({ file, label, className = "", tone = "cream" }: { file: string; label: string; className?: string; tone?: "cream" | "paper" }) {
  const bg = tone === "paper" ? "bg-paper" : "bg-cream";
  return (
    <figure className={`slot ${bg} ${className}`} role="img" aria-label={`Photo coming: ${label}`}>
      <div className="grid gap-2 p-6">
        <span className="pc-label text-[10px] text-navy/60">Photo slot</span>
        <span className="font-label text-sm font-extrabold">{label}</span>
        <code className="font-label text-[11px] text-navy/60">assets/photos/{file}</code>
      </div>
    </figure>
  );
}
