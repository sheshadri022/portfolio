import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Award, Briefcase, ExternalLink, Hammer, X } from "lucide-react";
import { certifications } from "@/data/profile";

// "Proud moments": career milestones and certifications on one sideways track.
// On desktop the track moves sideways as you scroll down; on phones (and with
// reduced motion) it is a normal swipeable row.

type Cert = (typeof certifications)[number];
type Moment =
  | { kind: "step"; when: string; title: string; text: string }
  | { kind: "cert"; when: string; cert: Cert }
  | { kind: "built"; when: string; title: string; text: string };

const certBy = (t: string) => certifications.find((c) => c.title.startsWith(t))!;

const moments: Moment[] = [
  { kind: "step", when: "2021", title: "Joined Miles Education", text: "Started in Network Support." },
  { kind: "step", when: "2022", title: "Moved to IT Support", text: "L1/L2 support, Windows and the service desk." },
  { kind: "step", when: "2023", title: "Associate – Asset Management", text: "Took ownership of the IT asset lifecycle and Google Workspace." },
  { kind: "cert", when: "Jun 2024", cert: certBy("Google Workspace") },
  { kind: "cert", when: "Jul 2025", cert: certBy("Technical Support") },
  { kind: "cert", when: "Nov 2025", cert: certBy("IT Asset Management") },
  { kind: "cert", when: "2026", cert: certBy("Replit") },
  { kind: "built", when: "Built", title: "IT Asset & Helpdesk Portal", text: "Internal app for Miles Education, built with AI-assisted development." },
  { kind: "built", when: "Built", title: "GK Fashions store", text: "E-commerce website with online payments." },
  { kind: "built", when: "Now", title: "Three entities supported", text: "Miles Education, MOJO Campus and MilesSOBA." },
];

function Lightbox({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);
  return (
    <motion.div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-label={`${cert.title} certificate`} className="relative w-full max-w-3xl overflow-hidden rounded-2xl" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()}>
        <img src={cert.image} alt={`${cert.title} certificate`} className="h-auto w-full" />
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close certificate" className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-black/70 text-white">
          <X size={18} aria-hidden />
        </button>
      </motion.div>
    </motion.div>
  );
}

function Card({ m, onOpen }: { m: Moment; onOpen: (c: Cert) => void }) {
  const base = "flex h-[340px] w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-[var(--radius-card)] border sm:w-[300px]";
  if (m.kind === "cert") {
    const c = m.cert;
    return (
      <li className={`${base} border-line bg-ink-2/80`}>
        <button type="button" onClick={() => onOpen(c)} aria-label={`View ${c.title} certificate`} className="group relative h-36 shrink-0 overflow-hidden bg-white">
          <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
        </button>
        <div className="flex flex-1 flex-col p-5">
          <p className="flex items-center gap-2 text-sm text-magenta">
            <Award size={15} aria-hidden /> {m.when} · {c.platform}
          </p>
          <h3 className="mt-2 font-display text-base font-bold leading-snug">{c.title}</h3>
          <p className="mt-1 line-clamp-3 text-sm text-muted">{c.description}</p>
          {c.verifyUrl && (
            <a href={c.verifyUrl} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-1 pt-3 text-sm text-ice hover:underline">
              Verify <ExternalLink size={12} aria-hidden />
              <span className="sr-only">{c.title}</span>
            </a>
          )}
        </div>
      </li>
    );
  }
  const Icon = m.kind === "step" ? Briefcase : Hammer;
  return (
    <li className={`${base} justify-between border-line-strong bg-gradient-to-br ${m.kind === "step" ? "from-wine/40" : "from-orchid/20"} to-ink-2 p-6`}>
      <span className="font-display text-6xl font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_rgb(229_65_127/0.7)]">{m.when}</span>
      <div>
        <Icon size={20} className="text-ice" aria-hidden />
        <h3 className="mt-3 font-display text-xl font-bold leading-snug">{m.title}</h3>
        <p className="mt-2 text-sm text-muted">{m.text}</p>
      </div>
    </li>
  );
}

export default function Certifications() {
  const [preview, setPreview] = useState<Cert | null>(null);
  const close = useCallback(() => setPreview(null), []);
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [wide, setWide] = useState(false);
  const [dist, setDist] = useState(0);
  const pinned = wide && !reduce;

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      setWide(mq.matches);
      const el = track.current;
      if (el) setDist(Math.max(0, el.scrollWidth - window.innerWidth + 96));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  return (
    <section
      id="certifications"
      ref={wrap}
      aria-labelledby="cert-title"
      className="relative overflow-x-clip"
      style={pinned ? { height: `calc(100vh + ${dist}px)` } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "section"}>
        <div className="container-x">
          <h2 id="cert-title" className="font-display text-[clamp(2rem,4.4vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            Proud moments
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">Milestones and verified certifications, in order. {pinned ? "Keep scrolling." : "Swipe sideways."}</p>
        </div>
        <motion.ul
          ref={track}
          style={pinned ? { x } : undefined}
          className={`mt-10 flex gap-5 px-[clamp(1rem,4vw,3rem)] ${pinned ? "w-max" : "snap-x snap-mandatory scroll-px-4 overflow-x-auto pb-4"} lg:px-[max(3rem,calc((100vw-1280px)/2+3rem))]`}
          aria-label="Milestones and certifications"
        >
          {moments.map((m, i) => (
            <Card key={i} m={m} onOpen={setPreview} />
          ))}
        </motion.ul>
      </div>
      <AnimatePresence>{preview && <Lightbox cert={preview} onClose={close} />}</AnimatePresence>
    </section>
  );
}
