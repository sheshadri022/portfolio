import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, MessageCircle, Play, Square } from "lucide-react";
import { useTalk } from "@/context/Talk";
import { useVirtualHuman } from "@/context/VirtualHuman";
import { person, stats } from "@/data/profile";

// Template 02, "Night Studio 3D". A 3D Sheshadri waves from beside his desk
// in a deep navy studio. Copy sits on the left over a navy shade. A speech
// bubble near his head offers the tour; it (or "Click to interact") crossfades
// to a lip-synced clip of the same shot with his spoken intro and captions.

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

const intro =
  "Hello! I'm Sheshadri, a Workplace Technology Specialist at Miles Education. I keep people, devices and accounts running, and I build internal tools with AI. Scroll down and I'll walk you through my work.";

// The scene's own aspect ratio. The "stage" is sized like object-fit: cover,
// so anything placed on it in % stays pinned to the same spot in the picture.
const AR = 2752 / 1536;
const stage: CSSProperties = {
  width: `max(100cqw, calc(100cqh * ${AR}))`,
  height: `max(100cqh, calc(100cqw / ${AR}))`,
  left: `calc((100cqw - max(100cqw, calc(100cqh * ${AR}))) * var(--px))`,
  top: `calc((100cqh - max(100cqh, calc(100cqw / ${AR}))) * var(--py, 0.5))`,
};
function Stage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`absolute ${className}`} style={stage}>
      {children}
    </div>
  );
}

export default function HeroSection() {
  const { setVoiceOn, stop } = useTalk();
  const { setAskOpen } = useVirtualHuman();
  const reduce = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [talking, setTalking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ext, setExt] = useState("mp4");

  useEffect(() => {
    if (document.createElement("video").canPlayType('video/webm; codecs="vp9, opus"')) setExt("webm");
  }, []);

  function start() {
    const v = video.current;
    if (!v) return;
    stop();
    setVoiceOn(true);
    setTalking(true);
    v.currentTime = 0;
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => setTalking(false));
    });
  }
  function end() {
    video.current?.pause();
    setTalking(false);
    setProgress(0);
  }

  const words = intro.split(" ");
  const shown = Math.ceil(words.length * Math.min(1, progress * 1.06));

  return (
    <section id="home" aria-labelledby="hero-name" className="relative">
      <div
        className="relative mt-16 aspect-[4/3] w-full overflow-hidden bg-ink [--px:0.8] [--py:0.5] sm:aspect-[16/10] sm:[--px:0.74] lg:mt-0 lg:aspect-auto lg:h-[100svh] lg:min-h-[660px] lg:[--px:0.7] lg:[--py:0.2]"
        style={{ containerType: "size" }}
      >
        {/* Scene and the talking clip of the same shot */}
        <Stage>
          <picture>
            <source type="image/avif" srcSet="/assets/night/scene-md.avif 1000w, /assets/night/scene.avif 1920w" sizes="100vw" />
            <img
              src="/assets/night/scene.webp"
              srcSet="/assets/night/scene-md.webp 1000w, /assets/night/scene.webp 1920w"
              sizes="100vw"
              alt="3D illustration of Sheshadri waving hello beside his desk with dashboards on the screens, in a navy studio"
              width={1920}
              height={1072}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
          <video
            ref={video}
            src={`/assets/night/intro.${ext}`}
            playsInline
            preload="none"
            aria-hidden
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (v.duration) setProgress(v.currentTime / v.duration);
            }}
            onEnded={end}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${talking ? "opacity-100" : "opacity-0"}`}
          />
        </Stage>

        {/* Navy shade so the copy reads (large screens), soft fades top and bottom */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ background: "linear-gradient(90deg, #0b1030 0%, rgb(11 16 48 / 0.86) 36%, rgb(11 16 48 / 0) 60%)" }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/70 to-transparent" />

        {/* Speech bubble, pinned next to his head */}
        <Stage className="pointer-events-none">
          <AnimatePresence>
            {!talking ? (
              <motion.button
                key="ask"
                type="button"
                onClick={start}
                initial={reduce ? false : { opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, delay: reduce ? 0 : 1, ease }}
                style={{ right: "23.6%", top: "13%", transformOrigin: "100% 100%" }}
                className="pointer-events-auto absolute flex items-center gap-2 rounded-[18px] rounded-br-[4px] bg-white px-3 py-2 text-left text-[13px] font-semibold leading-snug text-[#14162b] shadow-[0_18px_40px_-14px_rgb(0_0_0/0.7)] transition-transform hover:scale-[1.03] sm:px-4 sm:py-2.5 sm:text-[15px]"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-magenta-strong text-white sm:h-7 sm:w-7">
                  <Play size={12} aria-hidden />
                </span>
                Hi! Want the 30-second tour?
              </motion.button>
            ) : (
              <motion.span
                key="label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ right: "23.6%", top: "13%" }}
                className="absolute rounded-full bg-ink/70 px-3 py-1 text-xs text-muted backdrop-blur"
              >
                AI voice &amp; animation
              </motion.span>
            )}
          </AnimatePresence>
        </Stage>

        {/* Copy on the left (large screens) */}
        <div className="pointer-events-none absolute inset-0 hidden items-center lg:flex">
          <div className="container-x pt-10">
            <Copy talking={talking} words={words} shown={shown} start={start} end={end} />
          </div>
        </div>
      </div>

      {/* Small screens: copy below the scene */}
      <div className="container-x pb-2 pt-6 lg:hidden">
        <Copy talking={talking} words={words} shown={shown} start={start} end={end} />
      </div>

      {/* Stats, socials, resume and Ask */}
      <div className="container-x pb-6 pt-6">
        <div className="flex flex-col gap-5 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <dl className="grid grid-cols-3 gap-3 md:max-w-xl md:flex-1">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-4xl font-extrabold leading-none text-text">{s.value}</dd>
                <dd className="mt-1.5 text-xs leading-snug text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-magenta/60 hover:text-text"
              >
                <Icon size={18} aria-hidden />
              </a>
            ))}
            <a
              href={person.resume}
              download
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-4 text-sm font-semibold text-muted transition-colors hover:border-magenta/60 hover:text-text"
            >
              <Download size={16} aria-hidden />
              Resume
            </a>
            <button
              type="button"
              onClick={() => setAskOpen(true)}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-ice/40 px-4 text-sm font-semibold text-ice transition-colors hover:bg-ice/10"
            >
              <MessageCircle size={17} aria-hidden />
              Ask Sheshadri
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Copy({
  talking,
  words,
  shown,
  start,
  end,
}: {
  talking: boolean;
  words: string[];
  shown: number;
  start: () => void;
  end: () => void;
}) {
  return (
    <div className="pointer-events-auto max-w-[36rem]">
      <motion.p {...rise(0.2)} className="inline-flex items-center gap-2 rounded-full border border-ice/45 px-3 py-1 text-sm text-ice">
        <span className="h-1.5 w-1.5 rounded-full bg-ice" aria-hidden />
        Available for new opportunities
      </motion.p>
      <motion.h1
        {...rise(0.3)}
        id="hero-name"
        className="mt-5 font-display text-[clamp(2.1rem,11vw,3.6rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-text lg:text-[clamp(3.4rem,5.4vw,5.4rem)]"
      >
        Hello!
        <br />
        I’m <span className="text-[#ec5a93]">Sheshadri</span>
      </motion.h1>
      <motion.div {...rise(0.4)} className="mt-4">
        <RotatingTitle />
      </motion.div>
      <motion.p {...rise(0.46)} className="mt-2 text-sm text-ice/90">
        {person.positioning.join(" • ")}
      </motion.p>
      {talking ? (
        <p className="mt-4 min-h-[5rem] text-[1.02rem] leading-relaxed" aria-live="polite">
          <span className="sr-only">{words.join(" ")}</span>
          <span aria-hidden className="text-text">
            {words.slice(0, shown).join(" ")}
            <span className="text-faint"> {words.slice(shown).join(" ")}</span>
          </span>
        </p>
      ) : (
        <motion.p {...rise(0.52)} className="mt-4 text-[1.02rem] leading-relaxed text-muted">
          {person.headline}
        </motion.p>
      )}
      <motion.div {...rise(0.6)} className="mt-7 flex flex-wrap items-center gap-2.5">
        <a href="#projects" className="btn btn-primary">
          View My Work
          <ArrowRight size={16} aria-hidden />
        </a>
        <a href="#services" className="btn btn-ghost">
          Explore Services
        </a>
        <a href="#contact" className="btn btn-ghost">
          Contact Me
        </a>
        <button
          type="button"
          onClick={talking ? end : start}
          aria-pressed={talking}
          className="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold text-ice hover:underline"
        >
          {talking ? <Square size={13} aria-hidden /> : <Play size={14} aria-hidden />}
          {talking ? "Stop" : "Click to interact"}
        </button>
      </motion.div>
    </div>
  );
}

// Cycles through his titles every 3 seconds. All titles share one grid cell,
// so the line keeps the height of the longest and nothing below it jumps.
// Screen readers get all three once; reduced motion keeps the first title.
function RotatingTitle() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const titles = person.titles;

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % titles.length), 3000);
    return () => window.clearInterval(id);
  }, [reduce, paused, titles.length]);

  const cls =
    "col-start-1 row-start-1 whitespace-nowrap font-display font-bold leading-tight text-[clamp(0.95rem,4.4vw,1.6rem)] lg:text-[clamp(1.3rem,1.9vw,1.85rem)]";
  return (
    <p className="grid" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <span className="sr-only">{titles.join(", ")}</span>
      {titles.map((t) => (
        <span key={t} aria-hidden className={`${cls} invisible`}>
          {t}
        </span>
      ))}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={titles[i]}
          aria-hidden
          className={`${cls} text-text`}
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease }}
        >
          {titles[i]}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}
