import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Clock, ExternalLink, X } from "lucide-react";
import { certifications } from "@/data/profile";
import SectionHeading from "./SectionHeading";

type Cert = (typeof certifications)[number];

function Lightbox({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${cert.title} certificate`}
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={cert.image} alt={`${cert.title} certificate`} className="h-auto w-full" />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close certificate"
          className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-black/70 text-white"
        >
          <X size={18} aria-hidden />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Certifications() {
  const [preview, setPreview] = useState<Cert | null>(null);
  const [close] = useState(() => () => setPreview(null));

  return (
    <section id="certifications" aria-labelledby="cert-title" className="section">
      <div className="container-x">
        <SectionHeading id="cert-title" title="Certifications">
          Verified credentials. Open a card to see the certificate.
        </SectionHeading>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c) => (
            <li key={c.title} className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-2/70">
              <button
                type="button"
                onClick={() => setPreview(c)}
                aria-label={`View ${c.title} certificate`}
                className="group relative aspect-[16/9] overflow-hidden bg-white"
              >
                <img
                  src={c.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </button>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-magenta">{c.platform}</span>
                  {c.verifyUrl && (
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-ice hover:underline"
                    >
                      Verify
                      <ExternalLink size={12} aria-hidden />
                      <span className="sr-only">{c.title}</span>
                    </a>
                  )}
                </div>
                <h3 className="mt-2 font-display text-base font-bold leading-snug">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.description}</p>
                <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-3 text-xs text-faint">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={12} aria-hidden />
                    {c.date}
                  </span>
                  {c.hours && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={12} aria-hidden />
                      {c.hours}
                    </span>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence>{preview && <Lightbox cert={preview} onClose={close} />}</AnimatePresence>
    </section>
  );
}
