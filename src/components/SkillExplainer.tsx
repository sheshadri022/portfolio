import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
import type { ExplainerStep } from "@/data/voice";

// "How it works" explainer for one skill group: steps light up in order,
// timed to an AI voice-over, with the narration shown as captions.
export default function SkillExplainer({
  audio,
  script,
  steps,
  accent,
}: {
  audio: string;
  script: string;
  steps: ExplainerStep[];
  accent: string;
}) {
  const ref = useRef<HTMLAudioElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0); // 0..1
  const active = Math.min(steps.length - 1, Math.floor(t * steps.length));
  const started = t > 0;

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    return () => a.pause();
  }, []);

  function toggle() {
    const a = ref.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else {
      a.pause();
      setPlaying(false);
    }
  }

  function replay() {
    const a = ref.current;
    if (!a) return;
    a.currentTime = 0;
    a.play().then(() => setPlaying(true)).catch(() => {});
  }

  return (
    <div className="mt-5 rounded-[14px] border border-line bg-ink/60 p-4">
      <audio
        ref={ref}
        src={audio}
        preload="auto"
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          if (a.duration) setT(a.currentTime / a.duration);
        }}
        onEnded={() => {
          setPlaying(false);
          setT(1);
        }}
      />
      <ol className="relative grid gap-2" aria-label="How it works">
        {steps.map((s, i) => {
          const on = reduce || (started && i <= active) || t >= 1;
          const now = !reduce && playing && i === active;
          return (
            <motion.li
              key={s.title}
              animate={{ opacity: on ? 1 : 0.72, x: now ? 4 : 0 }}
              transition={{ duration: 0.35 }}
              className={`flex items-start gap-3 rounded-[10px] border px-3 py-2.5 ${now ? "border-magenta/60 bg-magenta/[0.07]" : "border-transparent"}`}
            >
              <span
                className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[11px] font-bold ${
                  on ? `border-current ${accent}` : "border-line-strong text-faint"
                }`}
              >
                {i + 1}
              </span>
              <span>
                <span className="block text-sm font-semibold text-text">{s.title}</span>
                <span className="block text-xs leading-snug text-muted">{s.detail}</span>
              </span>
            </motion.li>
          );
        })}
      </ol>

      <div className="mt-4 h-1 overflow-hidden rounded-full bg-ink-3" aria-hidden>
        <div className="h-full bg-gradient-to-r from-magenta to-orchid transition-[width] duration-200" style={{ width: `${t * 100}%` }} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause narration" : "Play narration"}
          className="grid h-9 w-9 place-items-center rounded-full bg-magenta-strong text-white"
        >
          {playing ? <Pause size={15} aria-hidden /> : <Play size={15} aria-hidden />}
        </button>
        <button
          type="button"
          onClick={replay}
          aria-label="Replay from the start"
          className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted hover:text-text"
        >
          <RotateCcw size={15} aria-hidden />
        </button>
        <span className="text-[11px] text-faint">AI voice-over</span>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted">{script}</p>
    </div>
  );
}
