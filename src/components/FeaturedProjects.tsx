import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, ExternalLink, Github, Lock } from "lucide-react";
import { projects, type Project } from "@/data/profile";
import ProjectCaseStudy from "./ProjectCaseStudy";
import SectionHeading from "./SectionHeading";

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-line-strong bg-ink-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </span>
        <span className="mx-auto truncate rounded-md bg-ink-3/70 px-3 py-1 text-[11px] text-faint">{url}</span>
      </div>
      {children}
    </div>
  );
}

function Screens({ project }: { project: Project }) {
  const [i, setI] = useState(0);
  const shots = project.shots!;
  return (
    <div>
      <BrowserFrame url="TechOps Portal, public demo">
        <div className="relative aspect-[16/10] bg-white">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.picture
              key={shots[i].src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <source media="(max-width: 640px)" srcSet={shots[i].srcSm} />
              <img
                src={shots[i].src}
                alt={shots[i].alt}
                width={1280}
                height={800}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </motion.picture>
          </AnimatePresence>
        </div>
      </BrowserFrame>
      <div className="mt-4 flex gap-3" role="group" aria-label="Choose a screenshot">
        {shots.map((s, k) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setI(k)}
            aria-pressed={i === k}
            aria-label={s.alt}
            className={`overflow-hidden rounded-lg border transition-colors ${i === k ? "border-magenta" : "border-line hover:border-line-strong"}`}
          >
            <img src={s.srcSm} alt="" width={120} height={75} loading="lazy" className="block h-auto w-[96px] sm:w-[120px]" />
          </button>
        ))}
      </div>
    </div>
  );
}

function StoreFrame({ project }: { project: Project }) {
  return (
    <figure>
      <BrowserFrame url="gkfashionsindia.com">
        <div className="relative flex aspect-[16/10] flex-col bg-gradient-to-br from-wine via-ink-2 to-ink-3">
          <nav aria-label="Store menu" className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-line px-6 py-4">
            <span className="mr-auto font-display font-bold">GK Fashions</span>
            {project.storeNav!.map((n) => (
              <span key={n} className="text-sm text-muted">
                {n}
              </span>
            ))}
          </nav>
          <div className="flex flex-1 flex-col items-start justify-center gap-4 px-6 sm:px-10">
            <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight">
              Clothing for men, women and kids, plus NCC uniforms.
            </p>
            <a href={project.live!.href} target="_blank" rel="noreferrer" className="btn btn-ghost !min-h-10 text-sm">
              Visit the live store
              <ExternalLink size={14} aria-hidden />
            </a>
          </div>
        </div>
      </BrowserFrame>
      <figcaption className="mt-3 text-xs text-faint">A sketch of the store’s menu structure. The live site is one click away.</figcaption>
    </figure>
  );
}

function ProjectPanel({ project, onCase }: { project: Project; onCase: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.2, 1]);

  return (
    <article aria-labelledby={`p-${project.id}`} className="glass relative overflow-hidden rounded-[var(--radius-panel)] p-6 sm:p-10 lg:p-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgb(236 72 153 / 0.22), transparent)" }}
      />
      <header className="relative flex flex-wrap items-end gap-x-6 gap-y-2">
        <span
          aria-hidden
          className="font-display text-[clamp(4rem,9vw,7rem)] font-extrabold leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_rgb(244_114_182/0.8)]"
        >
          {project.number}
        </span>
        <div className="pb-1">
          <p className="text-sm text-magenta">
            <span className="sr-only">Project {project.number}, </span>
            {project.category}
          </p>
          <h3 id={`p-${project.id}`} className="mt-1 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight">
            {project.name}
          </h3>
        </div>
      </header>
      <p className="relative mt-5 max-w-3xl text-lg leading-relaxed text-muted">{project.summary}</p>

      <div className="relative mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-12">
        <motion.div ref={ref} style={{ rotateX, y, opacity, transformPerspective: 1200, transformOrigin: "50% 100%" }}>
          {project.shots ? <Screens project={project} /> : <StoreFrame project={project} />}
        </motion.div>

        <div className="flex flex-col">
          <h4 className="font-semibold text-text">Key capabilities</h4>
          <ul className="mt-3 space-y-2.5">
            {project.capabilities.map((c) => (
              <li key={c} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-magenta" aria-hidden />
                {c}
              </li>
            ))}
          </ul>

          <h4 className="mt-8 font-semibold text-text">Technology</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>

          {project.internalLabel && (
            <p className="mt-8 flex items-center gap-2 text-sm text-muted lg:mt-auto lg:pt-8">
              <Lock size={15} className="text-ice" aria-hidden />
              {project.internalLabel}. The production app is private.
            </p>
          )}
          <div className={`flex flex-wrap gap-3 ${project.internalLabel ? "mt-4" : "mt-8 lg:mt-auto lg:pt-8"}`}>
            {project.live && (
              <a href={project.live.href} target="_blank" rel="noreferrer" className="btn btn-primary">
                <ExternalLink size={16} aria-hidden />
                {project.live.label}
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <Github size={16} aria-hidden />
                GitHub
              </a>
            )}
            <button type="button" onClick={onCase} className="btn btn-ghost">
              <BookOpen size={16} aria-hidden />
              Case Study
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedProjects() {
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const [main, rest] = [projects.slice(0, 2), projects.slice(2)];

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="container-x">
        <SectionHeading
          id="projects-title"
          title="Featured projects"
          aside={
            <figure className="relative">
              <img src="/assets/avatars/presenting.webp" alt="Sheshadri pointing toward his projects" width={200} height={308} loading="lazy" className="h-[260px] w-auto rounded-[22px] border border-line object-cover" />
              <figcaption className="hand absolute -left-28 bottom-8 -rotate-6 text-2xl text-magenta" aria-hidden>
                take a look ↓
              </figcaption>
            </figure>
          }
        >
          Real applications, built from problems I saw in IT operations.
        </SectionHeading>

        <div className="flex flex-col gap-10">
          {main.map((p) => (
            <ProjectPanel key={p.id} project={p} onCase={() => setOpen(p)} />
          ))}
        </div>

        {rest.map((p) => (
          <article
            key={p.id}
            aria-labelledby={`p-${p.id}`}
            className="mt-10 flex flex-col gap-6 rounded-[var(--radius-card)] border border-line p-6 sm:p-8 md:flex-row md:items-center"
          >
            <span aria-hidden className="font-display text-5xl font-extrabold text-transparent [-webkit-text-stroke:1px_rgb(245_243_250/0.4)]">
              {p.number}
            </span>
            <div className="flex-1">
              <h3 id={`p-${p.id}`} className="font-display text-xl font-bold">
                {p.name}
              </h3>
              <p className="mt-1 text-muted">{p.summary}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              {p.github && (
                <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  <Github size={16} aria-hidden />
                  GitHub
                </a>
              )}
              <button type="button" onClick={() => setOpen(p)} className="btn btn-ghost">
                <BookOpen size={16} aria-hidden />
                Case Study
              </button>
            </div>
          </article>
        ))}
      </div>

      <AnimatePresence>{open && <ProjectCaseStudy project={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
