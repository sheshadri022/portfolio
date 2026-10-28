import { useEffect, useRef } from "react";
import { useTalk } from "@/context/Talk";
import { useVirtualHuman } from "@/context/VirtualHuman";
import { avatarClips } from "@/data/voice";

// Once the visitor has started the guide (Click to interact, the speech
// bubble or the speaker button), the guide follows them:
//  - scrolling: each section is explained once, after the reader has
//    settled on it for a moment;
//  - pointing: resting the mouse on a section explains that section.
// Nothing happens while a dialog (a skill explainer or a certificate) is open.

const clipFor = (section: string | null) =>
  section ? avatarClips.find((c) => c.section === section && c.id !== "intro")?.id ?? null : null;

const dialogOpen = () => !!document.querySelector("dialog[open]");

export default function GuideFollower() {
  const { voiceOn, current, say } = useTalk();
  const { section } = useVirtualHuman();
  const played = useRef(new Set<string>());
  const currentRef = useRef<string | null>(null);

  useEffect(() => {
    currentRef.current = current;
    if (current) played.current.add(current);
  }, [current]);

  // Scroll: explain the section the reader has settled on, once.
  useEffect(() => {
    if (!voiceOn) return;
    const clip = clipFor(section);
    if (!clip || played.current.has(clip)) return;
    const t = window.setTimeout(() => {
      if (!dialogOpen() && currentRef.current !== clip) say(clip, { now: true });
    }, 900);
    return () => window.clearTimeout(t);
  }, [section, voiceOn, say]);

  // Pointer: explain the section the mouse rests on. Only real mouse
  // movement counts, so content scrolling under a still cursor does not.
  useEffect(() => {
    if (!voiceOn) return;
    let hovered: string | null = null;
    let lastMove = 0;
    let timer: number | undefined;
    const onMove = () => {
      lastMove = performance.now();
    };
    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || performance.now() - lastMove > 120) return;
      const el = e.target as Element | null;
      if (!el || el.closest("dialog, header, [data-guide-ignore]")) return;
      const sec = el.closest("section[id]")?.id ?? null;
      if (sec === hovered) return;
      hovered = sec;
      window.clearTimeout(timer);
      const clip = clipFor(sec);
      if (!clip) return;
      timer = window.setTimeout(() => {
        if (!dialogOpen() && currentRef.current !== clip) say(clip, { now: true });
      }, 700);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.clearTimeout(timer);
    };
  }, [voiceOn, say]);

  return null;
}
