import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Clock, ExternalLink, Maximize2, X } from "lucide-react";
import { certifications } from "@/data/profile";
import SectionHeading from "./SectionHeading";

// Certifications as a card grid: the certificate itself on top (click to see
// it full size), the platform, a Verify link, what it covers, date and hours.

type Cert = (typeof certifications)[number];

export default function Certifications() {
  const [open, setOpen] = useState<Cert | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="certifications" aria-labelledby="certifications-title" className="section">
      <div className="container-x">
        <SectionHeading id="certifications-title" title="Certifications">
          Verified credentials from industry-recognised platforms.
        </SectionHeading>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, i) => (
            <motion.li
              key={c.title}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-2/70 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-magenta/45 hover:shadow-[0_24px_60px_-28px_rgb(236_72_153/0.5)]"
            >
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={`View the ${c.title} certificate`}
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setOpen(c);
                }}
                className="relative h-40 shrink-0 overflow-hidden bg-white"
              >
                <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
                <span className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <Maximize2 size={14} aria-hidden />
                </span>
              </button>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <span className="whitespace-nowrap rounded-full border border-magenta/35 bg-magenta/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-magenta">
                    {c.platform}
                  </span>
                  {c.verifyUrl && (
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-8 shrink-0 items-center gap-1.5 text-sm text-muted transition-colors hover:text-ice"
                    >
                      <ExternalLink size={14} aria-hidden />
                      Verify
                      <span className="sr-only"> {c.title} (opens in a new tab)</span>
                    </a>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-text">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.description}</p>

                <div className="mt-auto pt-5" />
                <dl className="space-y-2 border-t border-line pt-4 text-sm text-muted [&>div]:flex [&>div]:items-center [&>div]:gap-2">
                  <div>
                    <dt className="sr-only">Completed</dt>
                    <CalendarDays size={15} className="text-magenta" aria-hidden />
                    <dd>{c.date}</dd>
                  </div>
                  {c.hours && (
                    <div>
                      <dt className="sr-only">Length</dt>
                      <Clock size={15} className="text-magenta" aria-hidden />
                      <dd>{c.hours}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {open && (
        <CertDialog
          cert={open}
          onClose={() => {
            setOpen(null);
            requestAnimationFrame(() => opener.current?.focus());
          }}
        />
      )}
    </section>
  );
}

function CertDialog({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
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
      aria-label={`${cert.title} certificate`}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto max-w-[94vw] bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
    >
      <div className="flex justify-end pb-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close certificate"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-black/80"
        >
          <X size={18} aria-hidden />
        </button>
      </div>
      <img src={cert.image} alt={`${cert.title} certificate`} className="block h-auto max-h-[82svh] w-auto max-w-[min(94vw,900px)] rounded-2xl bg-white" />
    </dialog>
  );
}
