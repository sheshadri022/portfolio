// Fixed, static backdrop: ambient light pools, a faint grid and film grain.
// Static on purpose: it costs nothing per frame and never fights the content.
const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export default function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 50% 8%, rgb(229 65 127 / 0.14), transparent 70%)," +
            "radial-gradient(40% 40% at 6% 40%, rgb(79 70 229 / 0.16), transparent 70%)," +
            "radial-gradient(45% 35% at 92% 85%, rgb(99 213 232 / 0.08), transparent 70%)," +
            "linear-gradient(180deg, #0d1338 0%, #0b1030 50%, #090d29 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(238 240 248 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(238 240 248 / 0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 75%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: grain }} />
    </div>
  );
}
