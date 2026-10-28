import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useVirtualHuman } from "@/context/VirtualHuman";
import ResponsiveImage from "./ResponsiveImage";

// The hero "virtual human": Sheshadri's real photo, cut out and lit on a
// stage. Motion is restrained: a reveal on load, a breathing loop, a small
// turn toward the cursor, and a turn toward the Ask panel when it is in use.
// Box geometry is fixed at 380x700 so the annotation strokes line up with
// the photo at any size.

const ease = [0.22, 1, 0.36, 1] as const;

type Note = { text: string; x: number; y: number; rotate: number; color: string; path: string; delay: number };

const notes: Note[] = [
  { text: "Work", x: 18, y: 78, rotate: -8, color: "var(--color-ice)", path: "M66 82 C 96 70, 118 76, 138 92", delay: 1.0 },
  { text: "Support", x: 0, y: 312, rotate: -6, color: "var(--color-magenta)", path: "M44 296 C 70 270, 92 268, 110 276", delay: 1.15 },
  { text: "Automate", x: 266, y: 120, rotate: 6, color: "var(--color-ice)", path: "M300 130 C 296 146, 284 154, 268 156", delay: 1.3 },
  { text: "Build", x: 304, y: 398, rotate: 5, color: "var(--color-magenta)", path: "M320 372 C 300 350, 270 344, 240 348", delay: 1.45 },
];

function Arrow({ d, color, delay }: { d: string; color: string; delay: number }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      markerEnd="url(#vh-head)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.9 }}
      transition={{ duration: 0.7, delay, ease }}
    />
  );
}

export default function VirtualHuman() {
  const { state } = useVirtualHuman();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });

  const explaining = state === "explaining";
  const ex = useSpring(0, { stiffness: 50, damping: 16 });
  useEffect(() => {
    ex.set(explaining ? 1 : 0);
  }, [explaining, ex]);
  const turn = useTransform([sx, ex], ([a, b]: number[]) => a * 5 + b * 7);
  const tilt = useTransform(sy, (v) => v * -2.5);
  const shift = useTransform([sx, ex], ([a, b]: number[]) => a * 8 + b * 6);
  const lightX = useTransform(sx, (v) => `${50 + v * 10}%`);

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      px.set(Math.max(-1, Math.min(1, nx)));
      py.set(Math.max(-1, Math.min(1, ny)));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, px, py]);

  return (
    <div ref={ref} className="relative mx-auto aspect-[380/700] h-[min(76vh,700px)] max-w-full" style={{ perspective: 900 }}>
      {/* Rim light that follows the cursor a little */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: useTransform(
            lightX,
            (x) =>
              `radial-gradient(42% 46% at ${x} 40%, rgb(229 65 127 / 0.32), rgb(123 30 62 / 0.18) 45%, transparent 72%)`,
          ),
        }}
      />
      {/* Floor shadow */}
      <div
        aria-hidden
        className="absolute bottom-[3.5%] left-1/2 h-[4%] w-[62%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-md"
      />

      <motion.div
        className="absolute inset-x-0 bottom-[4.5%] top-[5.4%] flex justify-center will-change-transform"
        style={{ rotateY: turn, rotateX: tilt, x: shift, transformOrigin: "50% 100%" }}
        initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        transition={{ duration: 1.1, ease }}
      >
        <motion.div
          className="h-full"
          style={{ transformOrigin: "50% 100%" }}
          animate={reduce ? undefined : { scaleY: [1, 1.006, 1], scaleX: [1, 1.003, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ResponsiveImage
            base="/assets/profile/full"
            alt="Sheshadri N, standing in a burgundy suit"
            width={468}
            height={1460}
            priority
            className="h-full w-auto select-none object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
            draggable={false}
          />
        </motion.div>
      </motion.div>

      {/* Handwritten annotations */}
      <svg aria-hidden viewBox="0 0 380 700" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <marker id="vh-head" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M1 1 L8 5 L1 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="text-text/80" />
          </marker>
        </defs>
        {notes.map((n) => (
          <g key={n.text}>
            <Arrow d={n.path} color={n.color} delay={n.delay} />
            <motion.text
              x={n.x}
              y={n.y}
              className="hand"
              fontSize={30}
              fill={n.color}
              transform={`rotate(${n.rotate} ${n.x} ${n.y})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: n.delay - 0.15 }}
            >
              {n.text}
            </motion.text>
          </g>
        ))}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.7 }}>
          <text x={208} y={590} className="hand" fontSize={32} fill="var(--color-text)" transform="rotate(-5 208 590)">
            Let’s build
          </text>
          <text x={226} y={622} className="hand" fontSize={32} fill="var(--color-text)" transform="rotate(-5 226 622)">
            solutions
          </text>
        </motion.g>
        <motion.path
          d="M222 640 C 260 628, 300 622, 352 610"
          fill="none"
          stroke="var(--color-magenta)"
          strokeWidth={2.4}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1.95, ease }}
        />
      </svg>

      {/* State caption, announced for screen readers only when Ask is used */}
      <motion.p
        className="hand absolute right-[-2%] top-[33%] text-2xl text-ice"
        initial={false}
        animate={{ opacity: explaining ? 1 : 0, x: explaining ? 0 : -6 }}
        transition={{ duration: 0.3 }}
        aria-hidden
      >
        ask away
      </motion.p>
    </div>
  );
}
