import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, Github, Linkedin, Mail, MessageCircle, Square } from "lucide-react";
import { useTalk } from "@/context/Talk";
import { useVirtualHuman } from "@/context/VirtualHuman";
import { person, stats } from "@/data/profile";

// Template 4 hero: Sheshadri stands in a dark tech office on the right.
// He idles (breathing, blinking) on a short silent loop; "Click to interact"
// plays his voiced introduction, lip-synced, with captions.

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

function Wave({ active }: { active: boolean }) {
  return (
    <span className="flex h-5 items-center gap-[3px]" aria-hidden>
      {[0.5, 0.9, 0.6, 1, 0.7, 0.4].map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-current"
          style={{ height: `${h * 100}%` }}
          animate={active ? { scaleY: [0.4, 1, 0.5, 0.9, 0.4] } : { scaleY: [1, 0.6, 1] }}
          transition={{ duration: active ? 0.9 : 2.4, repeat: Infinity, delay: i * 0.08 }}
        />
      ))}
    </span>
  );
}

export default function HeroSection() {
  const { setVoiceOn, stop } = useTalk();
  const { setAskOpen } = useVirtualHuman();
  const reduce = useReducedMotion();
  const idle = useRef<HTMLVideoElement>(null);
  const talk = useRef<HTMLVideoElement>(null);
  const [talking, setTalking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ext, setExt] = useState("mp4");

  useEffect(() => {
    const v = document.createElement("video");
    if (v.canPlayType('video/webm; codecs="vp9, opus"')) setExt("webm");
  }, []);

  function startIntro() {
    const v = talk.current;
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

  function endIntro() {
    talk.current?.pause();
    setTalking(false);
    setProgress(0);
  }

  const words = intro.split(" ");
  const shown = Math.ceil(words.length * Math.min(1, progress * 1.06));

  return (
    <section id="home" aria-labelledby="hero-name" className="relative isolate overflow-hidden lg:min-h-[100svh]">
      {/* Scene: still image, idle loop and talking clip share one frame */}
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto">
        <picture>
          <source media="(max-width: 639px)" type="image/avif" srcSet="/assets/hero/scene-mobile.avif" />
          <source media="(max-width: 639px)" type="image/webp" srcSet="/assets/hero/scene-mobile.webp" />
          <source type="image/avif" srcSet="/assets/hero/scene-md.avif 960w, /assets/hero/scene.avif 1920w" sizes="100vw" />
          <img
            src="/assets/hero/scene.webp"
            alt="Sheshadri N in a dark tech office, gesturing as he explains"
            width={1920}
            height={1072}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[78%_30%] sm:object-[70%_30%] lg:object-[64%_30%]"
          />
        </picture>
        {!reduce && (
          <video
            ref={idle}
            src={`/assets/hero/idle.${ext}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            className={`absolute inset-0 hidden h-full w-full object-cover object-[70%_30%] transition-opacity duration-500 sm:block lg:object-[64%_30%] ${talking ? "opacity-0" : "opacity-100"}`}
          />
        )}
        <video
          ref={talk}
          src={`/assets/hero/intro.${ext}`}
          playsInline
          preload="none"
          aria-hidden
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration) setProgress(v.currentTime / v.duration);
          }}
          onEnded={endIntro}
          className={`absolute inset-0 h-full w-full object-cover object-[93%_30%] transition-opacity duration-500 sm:object-[70%_30%] lg:object-[64%_30%] ${talking ? "opacity-100" : "opacity-0"}`}
        />
        {/* Readability gradients */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent lg:bg-gradient-to-r lg:from-ink lg:via-ink/75 lg:to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/80 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

        {/* Interact controls, sitting over the avatar */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 lg:bottom-[14%] lg:left-[64%]">
          <motion.button
            {...rise(0.9)}
            type="button"
            onClick={talking ? endIntro : startIntro}
            aria-pressed={talking}
            className="inline-flex min-h-12 items-center gap-3 rounded-full border border-white/15 bg-ink/70 px-5 text-sm font-semibold text-text shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md transition-colors hover:border-magenta/60"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-magenta-strong text-white">
              {talking ? <Square size={12} aria-hidden /> : <Wave active={false} />}
            </span>
            {talking ? "Stop" : "Click to interact"}
            {talking && (
              <span className="text-magenta">
                <Wave active />
              </span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Copy */}
      <div className="container-x relative pb-16 pt-6 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-12 lg:pt-28">
        <div className="max-w-[40rem]">
          <motion.p {...rise(0.05)} className="mb-5 inline-flex items-center gap-2 rounded-full border border-ice/25 bg-ice/[0.06] px-3 py-1 text-sm text-ice">
            <span className="h-1.5 w-1.5 rounded-full bg-ice" aria-hidden />
            Available for new opportunities
          </motion.p>

          <motion.h1 id="hero-name" {...rise(0.1)} className="font-display text-[clamp(2.3rem,5.4vw,4.6rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            <span className="block">Hello!</span>
            <span className="block sm:whitespace-nowrap">
              I’m <span className="text-magenta">Sheshadri</span>
            </span>
          </motion.h1>

          <motion.p {...rise(0.2)} className="mt-5 font-display text-[clamp(1.3rem,2.2vw,1.6rem)] font-semibold text-text">
            {person.title}
          </motion.p>
          <motion.p {...rise(0.26)} className="mt-3 text-[0.95rem] leading-relaxed text-ice/90">
            {person.positioning.join(" • ")}
          </motion.p>
          <motion.p {...rise(0.32)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-[1.05rem]">
            {person.intro}
          </motion.p>

          {/* Live captions while he talks */}
          <p className={`mt-5 min-h-[3rem] text-sm leading-relaxed ${talking ? "" : "sr-only"}`} aria-live="polite">
            <span className="sr-only">{talking ? intro : ""}</span>
            <span aria-hidden className="text-text">
              {talking && words.slice(0, shown).join(" ")}
              <span className="text-faint"> {talking && words.slice(shown).join(" ")}</span>
            </span>
          </p>

          <motion.div {...rise(0.4)} className="mt-4 flex flex-wrap gap-2.5">
            <a href={person.resume} download className="btn btn-primary">
              <Download size={18} aria-hidden />
              Download Resume
            </a>
            <a href="#projects" className="btn btn-ghost">
              View Projects
            </a>
            <a href="#contact" className="btn btn-ghost">
              Contact Me
            </a>
          </motion.div>

          <motion.div {...rise(0.46)} className="mt-6 flex flex-wrap items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-ink/40 text-muted transition-colors hover:border-magenta/60 hover:text-text"
              >
                <Icon size={18} aria-hidden />
              </a>
            ))}
            <button
              type="button"
              onClick={() => setAskOpen(true)}
              className="ml-1 inline-flex min-h-11 items-center gap-2 rounded-xl border border-ice/40 bg-ice/[0.07] px-4 text-sm font-semibold text-ice transition-colors hover:bg-ice/15"
            >
              <MessageCircle size={17} aria-hidden />
              Ask Sheshadri
            </button>
          </motion.div>

          <motion.dl {...rise(0.52)} className="mt-10 grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-[var(--radius-card)] border border-line bg-ink/50 px-4 py-4 backdrop-blur-sm">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-bold leading-none text-text">{s.value}</dd>
                <dd className="mt-2 text-xs leading-snug text-muted">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
