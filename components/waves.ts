/** Flat wave shapes. All paths repeat seamlessly every `period` units. */
export function crestPath(width: number, height: number, base: number, amp: number, period: number, fill = true) {
  let d = `M0 ${base}`;
  for (let x = 0; x < width; x += period) {
    const q = period / 4;
    d += ` Q ${x + q} ${base - amp} ${x + 2 * q} ${base} T ${x + period} ${base}`;
  }
  return fill ? `${d} V ${height} H 0 Z` : d;
}
