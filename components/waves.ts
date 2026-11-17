/**
 * Realistic flat waves. Each shape is a sum of Gerstner (trochoidal) components: points bunch up
 * at the crests and spread out in the troughs, so crests come out sharp and troughs long and flat,
 * like real swell. Integer cycle counts keep every shape seamless across its width.
 */
export type Comp = [cycles: number, amp: number, steep: number, phase: number];

// Long swell does the shaping; short ripples stay small and soft so crests read as water, not rocks.
export const SWELL: Comp[] = [[3, 10, 0.5, 0], [7, 3.2, 0.16, 1.7], [13, 1, 0.05, 0.6]];
export const CHOP: Comp[] = [[5, 6, 0.46, 0.4], [11, 1.8, 0.14, 2.2], [19, 0.6, 0.04, 1.1]];
export const GROUNDSWELL: Comp[] = [[2, 15, 0.55, 0], [5, 4.5, 0.18, 1.2], [9, 1.5, 0.06, 2.6]];

function points(width: number, base: number, comps: Comp[], scale = 1, step = 4) {
  const pts: [number, number][] = [];
  for (let u = -width * 0.04; u <= width * 1.04 + 0.01; u += step) {
    let x = u, y = base;
    for (const [cyc, amp, q, ph] of comps) {
      const k = (2 * Math.PI * cyc) / width, t = k * u + ph;
      x -= (q / k) * Math.sin(t);
      y -= amp * scale * Math.cos(t);
    }
    pts.push([+x.toFixed(1), +y.toFixed(1)]);
  }
  return pts;
}

/** A filled sea: crest on top, solid below to `height`. */
export function seaFill(width: number, height: number, base: number, comps: Comp[], scale = 1) {
  const p = points(width, base, comps, scale);
  return `M${p[0][0]} ${height} L${p.map(([x, y]) => `${x} ${y}`).join(" L")} L${p[p.length - 1][0]} ${height} Z`;
}

/** Just the crest line (for the waterline and the foam lace). */
export function seaLine(width: number, base: number, comps: Comp[], scale = 1) {
  const p = points(width, base, comps, scale);
  return `M${p.map(([x, y]) => `${x} ${y}`).join(" L")}`;
}

/** Same comps, every cycle count doubled: the shape tiles twice across `2 * width` for seamless loops. */
export const twice = (comps: Comp[]): Comp[] => comps.map(([c, a, q, p]) => [c * 2, a, q, p]);

/** Irregular foam lace along a crest. */
export const LACE = "38 14 6 22 64 10 12 30 26 18";
