import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { skillCards, type SkillCard, type Tone } from "@/data/skills";
import SectionHeading from "./SectionHeading";
import SkillExplainer from "./SkillExplainer";
import { useTalk } from "@/context/Talk";

// Skills as cards. Clicking a card opens a panel where Sheshadri's AI voice
// explains the skill step by step, with a summary and everything it covers.

const toneText: Record<Tone, string> = {
  magenta: "text-magenta",
  ice: "text-ice",
  orchid: "text-orchid",
  sun: "text-[#9a5b00]",
};
const toneTile: Record<Tone, string> = {
  magenta: "bg-magenta/10 border-magenta/25",
  ice: "bg-ice/10 border-ice/25",
  orchid: "bg-orchid/10 border-orchid/25",
  sun: "bg-[#9a5b00]/10 border-[#9a5b00]/25",
};
const toneGlow: Record<Tone, string> = {
  magenta: "hover:border-magenta/50 hover:shadow-[0_20px_50px_-24px_rgb(194_70_31/0.55)]",
  ice: "hover:border-ice/50 hover:shadow-[0_20px_50px_-24px_rgb(103_232_249/0.45)]",
  orchid: "hover:border-orchid/50 hover:shadow-[0_20px_50px_-24px_rgb(180_140_255/0.5)]",
  sun: "hover:border-[#9a5b00]/50 hover:shadow-[0_20px_50px_-24px_rgb(154_91_0/0.4)]",
};

export default function SkillsGrid() {
  const [open, setOpen] = useState<SkillCard | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const reduce = useReducedMotion();
  const { stop } = useTalk();

  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="container-x">
        <SectionHeading
          id="skills-title"
          title="Skills & Expertise"
        >
          Built through five years of hands-on workplace IT, and the apps that came out of it.{" "}
          <span className="text-magenta">Click any card and I’ll explain it.</span>
        </SectionHeading>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.li
                key={c.id}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={(e) => {
                    opener.current = e.currentTarget;
                    stop();
                    setOpen(c);
                  }}
                  className={`group flex h-full w-full flex-col rounded-[var(--radius-card)] border border-line bg-ink-2/70 p-6 text-left transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 ${toneGlow[c.tone]}`}
                >
                  <span className={`grid h-14 w-14 place-items-center rounded-2xl border ${toneTile[c.tone]} ${toneText[c.tone]} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={26} aria-hidden />
                  </span>
                  <span className="mt-5 block text-lg font-semibold text-text">{c.title}</span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-muted">{c.subtitle}</span>
                  <span className={`mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium ${toneText[c.tone]}`}>
                    Explain this skill
                    <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {open && (
        <SkillDialog
          card={open}
          onClose={() => {
            setOpen(null);
            requestAnimationFrame(() => opener.current?.focus());
          }}
        />
      )}
    </section>
  );
}

function SkillDialog({ card, onClose }: { card: SkillCard; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const Icon = card.icon;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    d.showModal();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
      if (d.open) d.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="skill-dialog-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto max-h-[90svh] w-[min(92vw,760px)] overflow-y-auto rounded-[24px] border border-line-strong bg-ink-2 p-0 text-text shadow-[0_40px_120px_-30px_rgb(18_48_71/0.4)] backdrop:bg-[#123047]/55 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-6 sm:p-8">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-magenta/60 to-transparent" />
        <div className="relative">
          <div className="flex min-w-0 flex-col items-start gap-3 pr-0 sm:flex-row sm:items-center sm:gap-4 sm:pr-14">
            <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border ${toneTile[card.tone]} ${toneText[card.tone]}`}>
              <Icon size={26} aria-hidden />
            </span>
            <div className="min-w-0">
              <h3 id="skill-dialog-title" className="font-display text-xl leading-tight break-words sm:text-3xl">
                {card.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted">{card.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:text-text"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        <p className="mt-6 text-[0.98rem] leading-relaxed text-text/90">{card.summary}</p>

        <div className="mt-6 grid gap-6 md:grid-cols-[1.05fr_1fr]">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">How it works</h4>
            <SkillExplainer
              key={card.id}
              audio={card.explainer.audio}
              script={card.explainer.script}
              steps={card.explainer.steps}
              accent={toneText[card.tone]}
            />
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">What it covers</h4>
            <ul className="mt-5 grid gap-2">
              {card.items.map(({ icon: ItemIcon, label }) => (
                <li key={label} className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.03] px-3.5 py-2.5 text-sm">
                  <ItemIcon size={16} aria-hidden className={`shrink-0 ${toneText[card.tone]}`} />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </dialog>
  );
}
