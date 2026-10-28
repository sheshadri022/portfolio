import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, RotateCw } from "lucide-react";
import { person } from "@/data/profile";

// A personal ID card on a lanyard that flips to show the back.
// It is clearly a portfolio card, not a company badge: no employer logo.
export default function IdCard() {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-[min(86vw,320px)] select-none pt-16">
      {/* Lanyard */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-0 h-20 w-3 -translate-x-1/2 rounded-b bg-gradient-to-b from-wine to-magenta-strong"
        style={{ transformOrigin: "50% 0%" }}
      />
      <motion.div
        className="relative"
        style={{ transformOrigin: "50% -60px", perspective: 1200 }}
        animate={reduce ? undefined : { rotate: [0, 1.6, 0, -1.6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        whileHover={reduce ? undefined : { rotate: 0 }}
      >
        <span aria-hidden className="absolute left-1/2 top-[-10px] z-10 h-5 w-10 -translate-x-1/2 rounded-md border border-line-strong bg-ink-3" />
        <motion.button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-pressed={flipped}
          aria-label={flipped ? "Show the front of the ID card" : "Flip the ID card to see contact details"}
          className="relative block aspect-[5/8] w-full text-left"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front */}
          <span
            className="absolute inset-0 flex flex-col overflow-hidden rounded-[22px] border border-line-strong bg-gradient-to-b from-ink-3 to-ink-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="flex items-center justify-between px-5 pt-5 text-xs text-faint">
              <span className="font-display text-sm text-text">SN</span>
              <span>Workplace Technology</span>
            </span>
            <span className="mx-5 mt-4 block overflow-hidden rounded-2xl border border-line">
              <picture>
                <source type="image/avif" srcSet="/assets/avatars/id-front.avif" />
                <img src="/assets/avatars/id-front.webp" alt="" width={613} height={613} className="block aspect-square w-full object-cover" />
              </picture>
            </span>
            <span className="mt-4 px-5">
              <span className="block font-display text-2xl font-extrabold tracking-tight text-text">SHESHADRI N</span>
              <span className="mt-1 block text-sm text-magenta">{person.title}</span>
            </span>
            <span className="mt-auto grid grid-cols-2 gap-3 border-t border-line px-5 py-4 text-xs">
              <span>
                <span className="block text-faint">In IT since</span>
                <span className="font-semibold text-text">Oct 2021</span>
              </span>
              <span>
                <span className="block text-faint">Based in</span>
                <span className="font-semibold text-text">Bengaluru</span>
              </span>
            </span>
            <span className="flex items-center justify-center gap-1.5 bg-ink-3/60 py-2 text-[11px] text-faint">
              <RotateCw size={12} aria-hidden /> Tap to flip
            </span>
          </span>

          {/* Back */}
          <span
            className="absolute inset-0 flex flex-col overflow-hidden rounded-[22px] border border-line-strong bg-gradient-to-b from-wine via-ink-2 to-ink-2 p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <span className="font-display text-lg font-bold text-text">What I do</span>
            <span className="mt-3 flex flex-wrap gap-1.5">
              {["Google Workspace", "IT asset lifecycle", "L1/L2 support", "Onboarding", "AI-assisted apps"].map((t) => (
                <span key={t} className="chip !text-[11px] !text-text/85">
                  {t}
                </span>
              ))}
            </span>
            <span className="mt-6 font-display text-lg font-bold text-text">Reach me</span>
            <span className="mt-3 space-y-2.5 text-sm text-muted">
              <span className="flex items-center gap-2">
                <Mail size={15} className="text-ice" aria-hidden /> {person.email}
              </span>
              <span className="flex items-center gap-2">
                <Linkedin size={15} className="text-ice" aria-hidden /> in/sheshadri-n
              </span>
              <span className="flex items-center gap-2">
                <Github size={15} className="text-ice" aria-hidden /> sheshadri022
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={15} className="text-ice" aria-hidden /> {person.location}
              </span>
            </span>
            <span className="hand mt-auto text-2xl text-magenta">Let’s build solutions</span>
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
