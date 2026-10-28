import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download, Github, Linkedin, Mail, MessageCircle, Play, Square } from "lucide-react";
import { useTalk } from "@/context/Talk";
import { useVirtualHuman } from "@/context/VirtualHuman";
import { person, stats } from "@/data/profile";

// Template 07, "Aura Glow". A 3D Sheshadri sits at his desk in a dark room.
// His name is set huge *behind* him: the scene, the name and a cut-out of
// him are stacked, all sized the same way so they line up. A pink and violet
// aura breathes behind the name. "Click to interact" crossfades to a
// lip-synced clip of the same shot with his spoken intro and captions.

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

const layer = "absolute inset-0 h-full w-full object-cover object-[50%_35%]";

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
      <div className="relative mt-16 aspect-[5/4] w-full overflow-hidden sm:mt-0 bg-ink sm:aspect-[16/10] lg:aspect-auto lg:h-[100svh] lg:min-h-[640px]">
        {/* 1. Scene */}
        <picture>
          <source type="image/avif" srcSet="/assets/aura/scene-md.avif 1000w, /assets/aura/scene.avif 1920w" sizes="100vw" />
          <img
            src="/assets/aura/scene.webp"
            alt="3D illustration of Sheshadri sitting at his desk in a dark room with code on the monitors"
            width={1920}
            height={1072}
            fetchPriority="high"
            className={`${layer} brightness-[0.7]`}
          />
        </picture>

        {/* 2. Aura */}
        <div
          aria-hidden
          className={`absolute inset-0 mix-blend-screen ${reduce ? "" : "motion-safe:animate-[aura_6s_ease-in-out_infinite]"}`}
          style={{
            background:
              "radial-gradient(30% 26% at 50% 40%, rgb(236 72 153 / 0.55), transparent 70%)," +
              "radial-gradient(24% 20% at 24% 76%, rgb(147 51 234 / 0.35), transparent 70%)," +
              "radial-gradient(24% 20% at 78% 70%, rgb(56 189 248 / 0.2), transparent 70%)",
          }}
        />

        {/* 3. Name, behind him */}
        <motion.h1
          id="hero-name"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease }}
          className="absolute inset-x-0 top-[12%] whitespace-nowrap text-center font-display text-[16.5vw] uppercase leading-none text-text sm:top-[16%] sm:text-[15vw] lg:top-[17%]"
          style={{ textShadow: "0 0 3vw rgb(236 72 153 / 0.55)" }}
        >
          I’m Sheshadri
        </motion.h1>

        {/* 4. Him, in front of the name */}
        <img
          src="/assets/aura/cut.webp"
          srcSet="/assets/aura/cut-md.webp 1000w, /assets/aura/cut.webp 1920w"
          sizes="100vw"
          alt=""
          aria-hidden
          width={1920}
          height={1072}
          className={`${layer} pointer-events-none`}
        />

        {/* 5. Talking clip of the same shot */}
        <video
          ref={video}
          src={`/assets/aura/intro.${ext}`}
          playsInline
          preload="none"
          aria-hidden
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration) setProgress(v.currentTime / v.duration);
          }}
          onEnded={end}
          className={`${layer} transition-opacity duration-500 ${talking ? "opacity-100" : "opacity-0"}`}
        />
        {talking && (
          <span className="absolute left-1/2 top-20 -translate-x-1/2 rounded-full bg-ink/70 px-3 py-1 text-xs text-muted backdrop-blur sm:top-24">
            AI voice &amp; animation
          </span>
        )}

        {/* Orb */}
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute right-[7%] top-[46%] hidden h-14 w-14 rounded-full sm:block"
            style={{ background: "radial-gradient(circle at 35% 35%, #fff, #ec4899 45%, #7e22ce 80%)", boxShadow: "0 0 40px #ec4899" }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-ink via-ink/70 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/80 to-transparent" />

        {/* Copy over the scene on large screens */}
        <div className="absolute inset-x-0 bottom-0 hidden lg:block">
          <div className="container-x flex items-end justify-between gap-10 pb-10">
            <Copy talking={talking} words={words} shown={shown} />
            <Actions talking={talking} start={start} end={end} />
          </div>
        </div>

        {/* Small screens: one compact control over the scene */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center lg:hidden">
          <button type="button" onClick={talking ? end : start} aria-pressed={talking} className="btn btn-primary">
            {talking ? <Square size={14} aria-hidden /> : <Play size={16} aria-hidden />}
            {talking ? "Stop" : "Click to interact"}
          </button>
        </div>
      </div>

      {/* Small screens: copy below the scene */}
      <div className="container-x pb-4 pt-6 lg:hidden">
        <Copy talking={talking} words={words} shown={shown} />
        <div className="mt-6">
          <Actions talking={talking} start={start} end={end} compact />
        </div>
      </div>

      {/* Stats, socials and Ask */}
      <div className="container-x pb-6 pt-6 lg:pt-8">
        <div className="flex flex-col gap-5 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <dl className="grid grid-cols-3 gap-3 md:max-w-xl md:flex-1">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-4xl leading-none text-text">{s.value}</dd>
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
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-magenta/60 hover:text-text"
              >
                <Icon size={18} aria-hidden />
              </a>
            ))}
            <button
              type="button"
              onClick={() => setAskOpen(true)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ice/40 px-4 text-sm font-semibold text-ice transition-colors hover:bg-ice/10"
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

function Copy({ talking, words, shown }: { talking: boolean; words: string[]; shown: number }) {
  return (
    <div className="max-w-xl">
      <motion.p {...rise(0.3)} className="mb-3 inline-flex items-center gap-2 rounded-full border border-ice/30 bg-ink/50 px-3 py-1 text-sm text-ice backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-ice" aria-hidden />
        Available for new opportunities
      </motion.p>
      <motion.div {...rise(0.4)}>
        <RotatingTitle />
      </motion.div>
      <motion.p {...rise(0.46)} className="mt-2 text-sm text-ice/90">
        {person.positioning.join(" • ")}
      </motion.p>
      {talking ? (
        <p className="mt-3 min-h-[4.5rem] text-[0.95rem] leading-relaxed" aria-live="polite">
          <span className="sr-only">{words.join(" ")}</span>
          <span aria-hidden className="text-text">
            {words.slice(0, shown).join(" ")}
            <span className="text-faint"> {words.slice(shown).join(" ")}</span>
          </span>
        </p>
      ) : (
        <motion.p {...rise(0.52)} className="mt-3 text-[0.95rem] leading-relaxed text-muted">
          {person.intro}
        </motion.p>
      )}
    </div>
  );
}

function Actions({ talking, start, end, compact }: { talking: boolean; start: () => void; end: () => void; compact?: boolean }) {
  return (
    <motion.div {...rise(0.6)} className="flex flex-wrap gap-2.5">
      {!compact && (
        <button type="button" onClick={talking ? end : start} aria-pressed={talking} className="btn btn-primary">
          {talking ? <Square size={14} aria-hidden /> : <Play size={16} aria-hidden />}
          {talking ? "Stop" : "Click to interact"}
        </button>
      )}
      <a href="#projects" className="btn btn-ghost">
        View Projects
      </a>
      <a href={person.resume} download className="btn btn-ghost">
        <Download size={17} aria-hidden />
        Resume
      </a>
    </motion.div>
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

  const cls = "col-start-1 row-start-1 whitespace-nowrap font-display text-[clamp(1.1rem,6vw,2rem)] uppercase leading-none tracking-wide lg:text-[clamp(1.6rem,2.6vw,2.4rem)]";
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
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease }}
        >
          {titles[i]}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}
