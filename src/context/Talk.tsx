import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { avatarClips } from "@/data/voice";

// Talking-avatar state. Browsers only allow sound after the visitor has
// interacted with the page, so voice starts off and is switched on by an
// explicit click. Until then clips play muted with captions.

type Ctx = {
  voiceOn: boolean;
  setVoiceOn: (v: boolean) => void;
  current: string | null;
  /** Changes on every request so the same clip can restart. */
  take: number;
  /** Ask the avatar to speak a clip. `now` skips the hover delay. */
  say: (id: string, opts?: { now?: boolean }) => void;
  cancel: () => void;
  stop: () => void;
};

const TalkContext = createContext<Ctx | null>(null);
const ids = new Set(avatarClips.map((c) => c.id));

export function TalkProvider({ children }: { children: ReactNode }) {
  const [voiceOn, setVoiceState] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const [take, setTake] = useState(0);
  const pending = useRef<number | null>(null);

  const setVoiceOn = useCallback((v: boolean) => {
    setVoiceState(v);
  }, []);

  const cancel = useCallback(() => {
    if (pending.current) window.clearTimeout(pending.current);
    pending.current = null;
  }, []);

  const say = useCallback(
    (id: string, opts?: { now?: boolean }) => {
      if (!ids.has(id)) return;
      cancel();
      const go = () => {
        setCurrent(id);
        setTake((t) => t + 1);
      };
      if (opts?.now) go();
      else pending.current = window.setTimeout(go, 350);
    },
    [cancel],
  );

  const stop = useCallback(() => {
    cancel();
    setCurrent(null);
  }, [cancel]);

  const value = useMemo(() => ({ voiceOn, setVoiceOn, current, take, say, cancel, stop }), [voiceOn, setVoiceOn, current, take, say, cancel, stop]);
  return <TalkContext.Provider value={value}>{children}</TalkContext.Provider>;
}

export function useTalk() {
  const ctx = useContext(TalkContext);
  if (!ctx) throw new Error("useTalk must be used inside TalkProvider");
  return ctx;
}
