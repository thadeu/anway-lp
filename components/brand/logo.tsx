// The brand lockup. Its file is outlines, so it needs no font. Width follows
// the lockup ratio (741 by 152).
export function Logo({ height = 22 }: { height?: number }) {
  const width = Math.round((height * 741) / 152.4);

  return (
    <img
      src="/brand/lockup-on-dark.svg"
      alt="Anway"
      width={width}
      height={height}
      className="block"
    />
  );
}
