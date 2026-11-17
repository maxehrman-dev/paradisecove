import { crestPath } from "./waves";

/** The looping waterline: a flat wave that rolls slowly sideways, forever. */
export default function Waterline({
  color = "#1C2B4A", height = 48, amp = 12, period = 360, duration = 16, line = false, reverse = false, className = "",
}: { color?: string; height?: number; amp?: number; period?: number; duration?: number; line?: boolean; reverse?: boolean; className?: string }) {
  const W = 2880, base = amp + 2;
  const d = crestPath(W, height, base, amp, period, !line);
  return (
    <div className={`pointer-events-none relative overflow-hidden ${className}`} style={{ height }} aria-hidden="true">
      <svg className={`waterline absolute left-0 top-0 h-full w-[200%] ${reverse ? "waterline-rev" : ""}`} style={{ ["--dur" as string]: `${duration}s` }}
        viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none">
        {line ? <path d={d} fill="none" stroke={color} strokeWidth={2} vectorEffect="non-scaling-stroke" /> : <path d={d} fill={color} />}
      </svg>
    </div>
  );
}
