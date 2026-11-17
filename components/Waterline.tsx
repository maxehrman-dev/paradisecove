import { seaFill, seaLine, twice, LACE, SWELL, type Comp } from "./waves";

/** The looping waterline: a realistic flat wave that rolls slowly sideways, forever. */
export default function Waterline({
  color = "#1C2B4A", foam = "#F4F0E4", height = 56, base, comps = SWELL, scale = 1, duration = 18, line = false, reverse = false, className = "",
}: { color?: string; foam?: string | null; height?: number; base?: number; comps?: Comp[]; scale?: number; duration?: number; line?: boolean; reverse?: boolean; className?: string }) {
  const W = 2880, b = base ?? Math.round(height * 0.45);
  const c = twice(comps);
  return (
    <div className={`pointer-events-none relative overflow-hidden ${className}`} style={{ height }} aria-hidden="true">
      <svg className={`waterline absolute left-0 top-0 h-full w-[200%] max-md:w-[560%] ${reverse ? "waterline-rev" : ""}`} style={{ ["--dur" as string]: `${duration}s` }}
        viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none">
        {line ? (
          <path d={seaLine(W, b, c, scale)} fill="none" stroke={color} strokeWidth={2} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        ) : (
          <>
            <path d={seaFill(W, height, b, c, scale)} fill={color} />
            {foam && <path d={seaLine(W, b + 5, c, scale)} fill="none" stroke={foam} strokeWidth={1.5} strokeDasharray={LACE} vectorEffect="non-scaling-stroke" strokeLinecap="round" opacity={0.8} />}
          </>
        )}
      </svg>
    </div>
  );
}
