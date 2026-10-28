import { motion, useReducedMotion } from "framer-motion";
import { Download, Github, Linkedin, Mail, MessageCircle, Play } from "lucide-react";
import { useTalk } from "@/context/Talk";
import { useVirtualHuman } from "@/context/VirtualHuman";
import { person, stats } from "@/data/profile";

// Template 03, "Isometric IT Desk". A 3D Sheshadri works at a floating desk
// surrounded by the things he looks after. Labels name each one. The scene
// idles on a short silent loop; "Click to interact" has his 3D guide give a
// voiced introduction (see TalkingAvatar).

const ease = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

const socials = [
  { label: "LinkedIn", href: person.linkedin, Icon: Linkedin },
  { label: "GitHub", href: person.github, Icon: Github },
  { label: "Email", href: `mailto:${person.email}`, Icon: Mail },
];

// Positions are fractions of the cropped scene box (the image's right 65%).
const labels = [
  { text: "Servers & network", x: 0.2, y: 0.55, side: "left" as const },
  { text: "IT asset lifecycle", x: 0.33, y: 0.37, side: "left" as const },
  { text: "Google Workspace", x: 0.5, y: 0.47, side: "right" as const },
  { text: "Helpdesk", x: 0.6, y: 0.58, side: "right" as const },
];

const SCENE_SHOWN = 0.65; // share of the image width kept in view

function Scene() {
  const reduce = useReducedMotion();
  const { setVoiceOn, say } = useTalk();
  const imgStyle = { width: `${100 / SCENE_SHOWN}%`, left: `${(-(1 - SCENE_SHOWN) / SCENE_SHOWN) * 100}%` };

  return (
    <div className="relative aspect-[1789/1536] w-full overflow-hidden">
      <picture>
        <source type="image/avif" srcSet="/assets/hero3d/scene-md.avif 960w, /assets/hero3d/scene.avif 1920w" sizes="(min-width: 1024px) 60vw, 100vw" />
        <img
          src="/assets/hero3d/scene.webp"
          alt="3D illustration of Sheshadri at a floating desk with a laptop, a stack of laptops, a server rack, a router and a plant"
          width={1920}
          height={1072}
          fetchPriority="high"
          className="absolute top-0 h-full max-w-none"
          style={imgStyle}
        />
      </picture>
      {!reduce && (
        <video
          src="/assets/hero3d/idle.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="absolute top-0 h-full max-w-none"
          style={imgStyle}
        />
      )}

      {labels.map((l, i) => (
        <motion.span
          key={l.text}
          aria-hidden
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.9 + i * 0.15, ease }}
          className="absolute hidden sm:block"
          style={{ left: `${l.x * 100}%`, top: `${l.y * 100}%` }}
        >
          <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full border-2 border-white bg-magenta shadow" />
          <span
            className={`absolute -top-11 whitespace-nowrap rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-text shadow-[0_8px_20px_-8px_rgba(18,48,71,0.45)] ${
              l.side === "left" ? "right-2" : "left-2"
            }`}
          >
            {l.text}
          </span>
        </motion.span>
      ))}

      {/* Speech bubble over his head doubles as the interact button */}
      <motion.button
        type="button"
        onClick={() => {
          setVoiceOn(true);
          say("intro", { now: true });
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.6, ease }}
        className="absolute right-[2%] top-[4%] rounded-2xl rounded-bl-sm bg-text px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
      >
        Hi! Click me for a quick intro
      </motion.button>
    </div>
  );
}

export default function HeroSection() {
  const { setVoiceOn, say } = useTalk();
  const { setAskOpen } = useVirtualHuman();

  return (
    <section id="home" aria-labelledby="hero-name" className="relative overflow-hidden bg-[#cbf2f7] pt-24 lg:pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink" />
      <div className="container-x relative grid items-center gap-8 pb-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-4 lg:pb-16">
        <div className="order-2 lg:order-1">
          <motion.p {...rise(0.05)} className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-text shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#1f9d55]" aria-hidden />
            Hi, I’m Sheshadri N
          </motion.p>

          <motion.h1
            id="hero-name"
            {...rise(0.1)}
            className="mt-5 font-display text-[clamp(2.6rem,5.6vw,4.9rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-text"
          >
            I keep the <span className="text-magenta">office tech</span> running.
          </motion.h1>

          <motion.p {...rise(0.18)} className="mt-5 font-display text-xl font-bold text-text sm:text-2xl">
            {person.title}
          </motion.p>
          <motion.p {...rise(0.24)} className="mt-2 text-[0.95rem] font-medium text-ice">
            {person.positioning.join(" • ")}
          </motion.p>
          <motion.p {...rise(0.3)} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-[1.05rem]">
            {person.intro}
          </motion.p>

          <motion.div {...rise(0.38)} className="mt-7 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => {
                setVoiceOn(true);
                say("intro", { now: true });
              }}
              className="btn btn-primary"
            >
              <Play size={17} aria-hidden />
              Click to interact
            </button>
            <a href="#projects" className="btn btn-ghost">
              See what I built
            </a>
            <a href={person.resume} download className="btn btn-ghost">
              <Download size={17} aria-hidden />
              Resume
            </a>
          </motion.div>

          <motion.div {...rise(0.44)} className="mt-5 flex flex-wrap items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-xl bg-white text-text shadow-sm transition-colors hover:text-magenta"
              >
                <Icon size={18} aria-hidden />
              </a>
            ))}
            <button
              type="button"
              onClick={() => setAskOpen(true)}
              className="ml-1 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-ice shadow-sm transition-colors hover:text-text"
            >
              <MessageCircle size={17} aria-hidden />
              Ask Sheshadri
            </button>
          </motion.div>

          <motion.dl {...rise(0.5)} className="mt-9 grid max-w-xl grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-[var(--radius-card)] bg-white/80 px-4 py-4 shadow-sm">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-extrabold leading-none text-text">{s.value}</dd>
                <dd className="mt-2 text-xs leading-snug text-muted">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          className="order-1 -mx-4 lg:order-2 lg:-mr-[max(3rem,calc((100vw-1280px)/2+3rem))] lg:ml-0"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          <Scene />
        </motion.div>
      </div>
    </section>
  );
}
