import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX, X } from "lucide-react";
import { avatarClips } from "@/data/voice";
import { useTalk } from "@/context/Talk";

// The talking guide: lip-synced clips of a 3D character based on Sheshadri's
// photo with a neutral AI voice. One <video> element is reused for every clip.
// Once the visitor turns the guide on, it stays docked in the corner while
// they scroll: it speaks when a section is reached or pointed at (see
// GuideFollower) and waits quietly in between.

export default function TalkingAvatar() {
  const { current, take, voiceOn, setVoiceOn, stop } = useTalk();
  const video = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const clip = avatarClips.find((c) => c.id === current) ?? null;
  const words = clip ? clip.script.split(" ") : [];
  const shown = Math.max(1, Math.ceil(words.length * Math.min(1, progress * 1.08)));
  const open = !!clip || voiceOn;

  useEffect(() => {
    const v = video.current;
    if (!v || !clip) return;
    setProgress(0);
    const webm = v.canPlayType('video/webm; codecs="vp9, opus"') !== "";
    v.src = `/assets/avatar/${clip.id}.${webm ? "webm" : "mp4"}`;
    v.muted = !voiceOn;
    v.currentTime = 0;
    v.play().catch(() => {
      // Sound blocked by the browser: retry muted so the clip still plays.
      v.muted = true;
      v.play().catch(() => stop());
    });
  }, [clip?.id, take]);

  useEffect(() => {
    if (video.current) video.current.muted = !voiceOn;
  }, [voiceOn]);

  // Idle: no clip playing, so make sure the video is stopped.
  useEffect(() => {
    if (!clip && video.current) {
      video.current.pause();
      setProgress(0);
    }
  }, [clip]);

  const turnOff = () => {
    stop();
    setVoiceOn(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          key="talk"
          data-guide-ignore
          aria-label={clip ? `Sheshadri on ${clip.label}` : "Sheshadri's guide"}
          className={`fixed z-50 flex overflow-hidden border border-line-strong bg-ink-2 shadow-[0_24px_50px_-20px_rgba(18,48,71,0.45)] ${
            clip
              ? "bottom-4 left-4 right-4 rounded-[22px] sm:bottom-24 sm:left-auto sm:right-5 sm:w-[380px]"
              : "bottom-4 left-4 rounded-full sm:bottom-24 sm:left-auto sm:right-5"
          }`}
          layout
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={clip ? "relative aspect-[3/4] w-[132px] shrink-0 bg-ink" : "relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-ink"}>
            <video
              ref={video}
              playsInline
              preload="none"
              poster="/assets/hero3d/guide.webp"
              className={`h-full w-full object-cover ${clip ? "" : "object-[50%_18%]"}`}
              onTimeUpdate={(e) => {
                const v = e.currentTarget;
                if (v.duration) setProgress(v.currentTime / v.duration);
              }}
              onEnded={() => window.setTimeout(stop, 700)}
              aria-hidden
            />
            {clip && (
              <div className="absolute inset-x-0 bottom-1 flex justify-center">
                <span className="rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white/90">AI voice &amp; animation</span>
              </div>
            )}
          </div>

          {clip ? (
            <div className="relative flex min-w-0 flex-1 flex-col">
              <div className="flex items-center justify-between gap-2 px-4 pt-3">
                <span className="text-xs text-magenta">{clip.label}</span>
                <span className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setVoiceOn(!voiceOn)}
                    aria-label={voiceOn ? "Mute Sheshadri's voice" : "Turn on Sheshadri's voice"}
                    aria-pressed={voiceOn}
                    className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted hover:text-text"
                  >
                    {voiceOn ? <Volume2 size={16} aria-hidden /> : <VolumeX size={16} aria-hidden />}
                  </button>
                  <button
                    type="button"
                    onClick={stop}
                    aria-label="Stop this explanation"
                    title="Stop this explanation"
                    className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted hover:text-text"
                  >
                    <X size={16} aria-hidden />
                  </button>
                </span>
              </div>
              <p className="flex-1 px-4 pb-4 pt-1 text-[13px] leading-relaxed text-text" aria-live="polite">
                <span className="sr-only">{clip.script}</span>
                <span aria-hidden>
                  {words.slice(0, shown).join(" ")}
                  <span className="text-faint"> {words.slice(shown).join(" ")}</span>
                </span>
              </p>
              <div className="h-1 bg-ink-3" aria-hidden>
                <div className="h-full bg-magenta transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 py-1.5 pl-3 pr-1.5">
              <p className="max-w-[200px] text-[12.5px] leading-snug text-text sm:max-w-[230px]">
                <span className="font-semibold">I’m with you.</span>{" "}
                <span className="text-muted">Scroll on, or rest your mouse on any part and I’ll explain it.</span>
              </p>
              <button
                type="button"
                onClick={turnOff}
                aria-label="Turn off the guide"
                title="Turn off the guide"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted hover:text-text"
              >
                <X size={16} aria-hidden />
              </button>
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
