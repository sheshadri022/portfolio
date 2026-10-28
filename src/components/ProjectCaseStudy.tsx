import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, X } from "lucide-react";
import type { Project } from "@/data/profile";

export default function ProjectCaseStudy({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("button, a[href]");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);

  const titleId = `case-${project.id}`;

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="glass relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-[var(--radius-panel)] p-6 sm:rounded-[var(--radius-panel)] sm:p-10"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-xl text-muted hover:text-text"
        >
          <X size={22} aria-hidden />
        </button>

        <p className="text-sm text-magenta">
          Project {project.number}, {project.category.toLowerCase()}
        </p>
        <h3
          id={titleId}
          className="mt-2 pr-10 font-display text-3xl font-bold leading-tight"
        >
          {project.name}
        </h3>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h4 className="font-semibold text-text">The problem</h4>
            <p className="mt-2 leading-relaxed text-muted">{project.problem}</p>
          </div>
          <div>
            <h4 className="font-semibold text-text">What I built</h4>
            <p className="mt-2 leading-relaxed text-muted">
              {project.solution}
            </p>
          </div>
        </div>

        {project.architecture && (
          <div className="mt-10">
            <h4 className="font-semibold text-text">How it fits together</h4>
            <ol className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              {project.architecture.map((a, i) => (
                <li key={a.label} className="flex flex-1 items-center gap-3">
                  <div className="h-full flex-1 rounded-[var(--radius-card)] border border-line bg-ink-3/60 p-4">
                    <p className="font-display font-bold text-ice">{a.label}</p>
                    <p className="mt-1 text-sm leading-snug text-muted">
                      {a.detail}
                    </p>
                  </div>
                  {i < project.architecture!.length - 1 && (
                    <ArrowRight
                      size={18}
                      className="hidden shrink-0 text-faint sm:block"
                      aria-hidden
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-10">
          <h4 className="font-semibold text-text">
            {project.confidential ? "What I can share" : "What it does"}
          </h4>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {project.capabilities.map((c) => (
              <li
                key={c}
                className="flex gap-2 text-sm leading-relaxed text-muted"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-magenta"
                  aria-hidden
                />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {project.stack.length > 0 && (
          <div className="mt-10">
            <h4 className="font-semibold text-text">Built with</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.privacyNote && (
          <p className="mt-10 flex gap-3 rounded-[var(--radius-card)] border border-ice/25 bg-ice/[0.05] p-4 text-sm leading-relaxed text-muted">
            <ShieldCheck
              size={18}
              className="mt-0.5 shrink-0 text-ice"
              aria-hidden
            />
            {project.privacyNote}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
