import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, MapPin, Volume2 } from "lucide-react";
import { useTalk } from "@/context/Talk";
import { person, stats } from "@/data/profile";
import VirtualHuman from "./VirtualHuman";
import AskSheshadri from "./AskSheshadri";
import ResponsiveImage from "./ResponsiveImage";

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

export default function HeroSection() {
  const { setVoiceOn, say } = useTalk();
  return (
    <section id="home" aria-labelledby="hero-name" className="relative overflow-hidden pb-16 pt-28 lg:min-h-[100svh] lg:pb-10 lg:pt-28">
      <div className="container-x grid items-start gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_330px] xl:grid-cols-[minmax(0,1.2fr)_330px_minmax(0,0.8fr)] xl:gap-x-8">
        {/* Name: full width, the figure stands in front of it on desktop */}
        <div className="relative z-0 lg:col-span-2 xl:col-span-3">
          <motion.p {...rise(0.05)} className="mb-5 inline-flex items-center gap-2 rounded-full border border-ice/25 bg-ice/[0.06] px-3 py-1 text-sm text-ice">
            <span className="h-1.5 w-1.5 rounded-full bg-ice" aria-hidden />
            Available for new opportunities
          </motion.p>
          <motion.h1
            id="hero-name"
            {...rise(0.1)}
            className="whitespace-nowrap font-display text-[clamp(1.85rem,8vw,6.6rem)] font-extrabold leading-[0.9] tracking-[-0.03em]"
          >
            SHESHADRI N
          </motion.h1>
        </div>

        {/* Identity */}
        <div className="lg:col-start-1 lg:row-start-2">
          <motion.p {...rise(0.2)} className="font-display text-[clamp(1.35rem,2.2vw,1.6rem)] font-semibold text-text">
            {person.title}
          </motion.p>

          <motion.p {...rise(0.26)} className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-ice/90">
            {person.positioning.join(" • ")}
          </motion.p>

          <motion.p {...rise(0.32)} className="mt-6 max-w-[36rem] text-base leading-relaxed text-muted sm:text-[1.05rem]">
            {person.intro}
          </motion.p>

          <motion.div {...rise(0.4)} className="mt-8 flex flex-wrap gap-2.5">
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

          <motion.div {...rise(0.46)} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <ul className="flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-magenta/60 hover:text-text"
                  >
                    <Icon size={18} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setVoiceOn(true);
                say("about", { now: true });
              }}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-ice/40 bg-ice/[0.07] px-4 text-sm font-semibold text-ice transition-colors hover:bg-ice/15"
            >
              <Volume2 size={17} aria-hidden />
              Meet Sheshadri
            </button>
            <span className="inline-flex items-center gap-1.5 text-sm text-faint">
              <MapPin size={15} aria-hidden />
              {person.location}
            </span>
          </motion.div>

          <motion.dl {...rise(0.52)} className="mt-10 grid grid-cols-3 gap-3 sm:max-w-xl">
            {stats.map((s) => (
              <div key={s.label} className="rounded-[var(--radius-card)] border border-line bg-white/[0.025] px-4 py-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-bold leading-none text-text">{s.value}</dd>
                <dd className="mt-2 text-xs leading-snug text-muted">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Virtual human: full figure on desktop, light portrait on mobile */}
        <div className="relative z-10 lg:col-start-2 lg:row-span-2 lg:row-start-2 lg:-mt-16 xl:row-span-1 xl:-mt-[5.5rem]">
          <div className="hidden lg:block">
            <VirtualHuman />
          </div>
          <motion.figure
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="relative mx-auto w-[min(78vw,300px)] lg:hidden"
          >
            <div
              aria-hidden
              className="absolute inset-[-12%] rounded-full"
              style={{ background: "radial-gradient(closest-side, rgb(229 65 127 / 0.32), rgb(123 30 62 / 0.15) 55%, transparent)" }}
            />
            <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[28px] border border-line bg-gradient-to-b from-ink-3 to-ink-2">
              <ResponsiveImage
                base="/assets/avatars/mobile"
                alt="Sheshadri N"
                width={520}
                height={885}
                priority
                className="block aspect-[4/5] h-auto w-full object-cover object-top"
              />
            </div>
            <figcaption className="hand mt-3 text-center text-2xl text-text/90" aria-hidden>
              Let’s build solutions
            </figcaption>
          </motion.figure>
        </div>

        {/* Ask Sheshadri */}
        <motion.div
          {...rise(0.6)}
          className="lg:col-start-1 lg:row-start-3 lg:max-w-xl xl:col-start-3 xl:row-start-2 xl:max-w-none xl:self-center"
        >
          <AskSheshadri />
        </motion.div>
      </div>
    </section>
  );
}
