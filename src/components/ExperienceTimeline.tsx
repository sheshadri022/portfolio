import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { roles, scopeTrack } from "@/data/profile";
import EntityStrip from "./EntityStrip";
import SectionHeading from "./SectionHeading";

export default function ExperienceTimeline() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const ordered = [...roles].reverse(); // newest first

  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="container-x">
        <SectionHeading id="experience-title" title="Workplace Technology & IT Operations Across Multiple Entities">
          One IT function at Miles Education, supporting the group’s companies. These are entities I support, not separate jobs.
        </SectionHeading>

        <EntityStrip />

        <div className="mt-24 grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h3 className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-tight">My Professional Journey</h3>
            <p className="mt-3 text-muted">Miles Education Pvt Ltd, Oct 2021 – Present, 5 years.</p>
            <picture>
              <source type="image/avif" srcSet="/assets/avatars/seated.avif" />
              <img
                src="/assets/avatars/seated.webp"
                alt="Sheshadri N seated in a lounge chair"
                width={840}
                height={973}
                loading="lazy"
                className="mt-6 hidden aspect-[5/4] w-full rounded-[var(--radius-card)] border border-line object-cover object-[50%_20%] lg:block"
              />
            </picture>

            <h4 className="mt-8 text-sm font-semibold text-text">How the scope grew</h4>
            <ol className="mt-3 space-y-2">
              {scopeTrack.map((s, i) => (
                <li key={s} className="flex items-center gap-3 text-sm text-muted">
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[11px] font-semibold ${
                      i === scopeTrack.length - 1 ? "border-magenta bg-magenta/15 text-magenta" : "border-line-strong text-faint"
                    }`}
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

          <div ref={listRef} className="relative">
            <div aria-hidden className="absolute bottom-2 left-[11px] top-2 w-px bg-line" />
            <motion.div
              aria-hidden
              className="absolute left-[11px] top-2 w-px origin-top bg-gradient-to-b from-magenta to-orchid"
              style={{ scaleY: progress, bottom: 8 }}
            />
            <ol className="relative">
            {ordered.map((r) => (
              <li key={r.title} className="relative pb-12 pl-12 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute left-0 top-1 grid h-6 w-6 place-items-center rounded-full border-2 ${
                    r.current ? "border-magenta bg-ink shadow-[0_0_0_6px_rgb(229_65_127/0.15)]" : "border-line-strong bg-ink"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${r.current ? "bg-magenta" : "bg-faint"}`} />
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-display text-xl font-bold">
                    {r.title}
                    {r.current && <span className="ml-3 align-middle text-xs font-semibold text-magenta">Current</span>}
                  </h4>
                  <p className="text-sm text-faint">{r.duration}</p>
                </div>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Focus areas">
                  {r.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 space-y-2.5">
                  {r.responsibilities.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                      <CheckCircle2 size={16} className="mt-1 shrink-0 text-magenta/80" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
