import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useVirtualHuman, type VirtualHumanState } from "@/context/VirtualHuman";
import AskSheshadri from "./AskSheshadri";
import { useTalk } from "@/context/Talk";

// Small, section-aware presence once the hero has scrolled away.
// It reacts to where the reader is (one short line, then it quietly
// collapses) and opens Ask Sheshadri as a dialog.

const lines: Partial<Record<VirtualHumanState, { text: string; point?: "left" }>> = {
  idle: { text: "Five years, one IT function, three entities." },
  projects: { text: "These are apps I built and shipped.", point: "left" },
  skills: { text: "Click any card to see more." },
  contact: { text: "Email or LinkedIn both reach me." },
};

// The guide is the 3D Sheshadri from the hero; the ring colour shows the state.
const GUIDE = "/assets/hero3d/guide-face.webp";

const ring: Record<VirtualHumanState, string> = {
  idle: "ring-line-strong",
  greeting: "ring-ice/60",
  explaining: "ring-ice",
  projects: "ring-magenta",
  skills: "ring-orchid",
  contact: "ring-ice",
};

export default function VirtualHumanDock() {
  const { state, section, askOpen, setAskOpen } = useVirtualHuman();
  const { voiceOn } = useTalk();
  const [bubble, setBubble] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const visible = section !== "home";
  const line = lines[state];

  // Show the line briefly whenever the state changes.
  useEffect(() => {
    if (!visible || !line || askOpen || voiceOn) {
      setBubble(false);
      return;
    }
    setBubble(true);
    const t = setTimeout(() => setBubble(false), 4200);
    return () => clearTimeout(t);
  }, [state, visible, askOpen, voiceOn]);

  useEffect(() => {
    if (!askOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button, a[href], input");
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
    return () => window.removeEventListener("keydown", onKey);
  }, [askOpen]);

  function close() {
    setAskOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  }

  return (
    <>
      <AnimatePresence>
        {visible && !askOpen && (
          <motion.div
            data-guide-ignore
            className="fixed bottom-5 right-5 z-40 hidden items-end gap-3 sm:flex"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence>
              {bubble && line && (
                <motion.p
                  key={state}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="glass relative mb-2 hidden max-w-[240px] rounded-2xl rounded-br-md px-4 py-2.5 text-sm text-text sm:block"
                  role="status"
                >
                  {line.point === "left" && (
                    <motion.span
                      aria-hidden
                      className="hand absolute -left-9 top-1/2 -translate-y-1/2 text-3xl text-magenta"
                      animate={{ x: [0, -5, 0] }}
                      transition={{ duration: 1.4, repeat: 2 }}
                    >
                      ←
                    </motion.span>
                  )}
                  {line.text}
                </motion.p>
              )}
            </AnimatePresence>
            <motion.button
              ref={buttonRef}
              type="button"
              onClick={() => setAskOpen(true)}
              aria-label="Open Ask Sheshadri"
              aria-haspopup="dialog"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              animate={state === "projects" ? { rotate: [-4, 0] } : state === "contact" ? { y: [0, -3, 0] } : { rotate: 0 }}
              transition={{ duration: 0.6 }}
              className={`relative h-16 w-16 overflow-hidden rounded-full bg-ink-3 shadow-[0_12px_30px_-10px_rgba(18,48,71,0.45)] ring-2 transition-[box-shadow] ${ring[state]}`}
            >
              <img src={GUIDE} alt="" width={64} height={64} className="absolute inset-0 h-full w-full object-cover" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {askOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-[#123047]/45 p-3 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Ask Sheshadri"
              className="relative w-full max-w-md"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close Ask Sheshadri"
                className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-xl text-muted hover:text-text"
              >
                <X size={20} aria-hidden />
              </button>
              <AskSheshadri compact autoFocus />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
