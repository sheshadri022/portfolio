import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, CheckCircle2, ExternalLink, Github, PlayCircle } from "lucide-react";
import { projects, type Project } from "@/data/profile";
import ProjectCaseStudy from "./ProjectCaseStudy";
import SectionHeading from "./SectionHeading";

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-line-strong bg-ink-2 shadow-[0_30px_60px_-30px_rgba(18,48,71,0.45)]">
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
      <BrowserFrame url={project.shotsLabel ?? project.name}>
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

// Projects without screenshots (client work) show the setup as a checklist.
function ChecklistFrame({ project }: { project: Project }) {
  return (
    <BrowserFrame url="admin.google.com">
      <div className="relative flex aspect-[16/10] flex-col justify-center gap-3 bg-gradient-to-br from-[#e8f4ff] via-ink-2 to-ink-3 px-6 sm:px-10">
        <p className="font-display text-[clamp(1.25rem,2.6vw,1.9rem)] font-bold leading-tight text-text">Workspace setup checklist</p>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {project.checklist!.map((c) => (
            <li key={c} className="flex items-center gap-2.5 rounded-xl border border-line bg-white/80 px-3.5 py-2.5 text-sm font-medium text-text">
              <CheckCircle2 size={18} className="shrink-0 text-ice" aria-hidden />
              {c}
            </li>
          ))}
        </ul>
        <p className="text-xs text-faint">Done for two businesses.</p>
      </div>
    </BrowserFrame>
  );
}

function ProjectPanel({ project, onCase }: { project: Project; onCase: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.2, 1]);

  return (
    <article id={`project-${project.id}`} aria-labelledby={`p-${project.id}`} className="glass scroll-mt-24 relative overflow-hidden rounded-[var(--radius-panel)] p-6 sm:p-10 lg:p-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgb(255 215 200 / 0.8), transparent)" }}
      />
      <header className="relative flex flex-wrap items-end gap-x-6 gap-y-2">
        <span
          aria-hidden
          className="font-display text-[clamp(4rem,9vw,7rem)] font-extrabold leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_rgb(194_70_31/0.75)]"
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
          {project.shots ? <Screens project={project} /> : <ChecklistFrame project={project} />}
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

          {project.stack.length > 0 && (
            <>
              <h4 className="mt-8 font-semibold text-text">Technology</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
            {project.demo && (
              <a href={project.demo.href} target="_blank" rel="noreferrer" className="btn btn-primary">
                <PlayCircle size={16} aria-hidden />
                {project.demo.label}
              </a>
            )}
            {project.live && (
              <a href={project.live.href} target="_blank" rel="noreferrer" className={`btn ${project.demo ? "btn-ghost" : "btn-primary"}`}>
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

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="container-x">
        <SectionHeading
          id="projects-title"
          title="Featured projects"
        >
          Real products and setups, built from problems I saw in IT operations.
        </SectionHeading>

        <div className="flex flex-col gap-10">
          {projects.map((p) => (
            <ProjectPanel key={p.id} project={p} onCase={() => setOpen(p)} />
          ))}
        </div>

      </div>

      <AnimatePresence>{open && <ProjectCaseStudy project={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
