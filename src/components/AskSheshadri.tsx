import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, ExternalLink } from "lucide-react";
import { ask, questions, type Answer } from "@/lib/ask";
import { useVirtualHuman } from "@/context/VirtualHuman";

type Msg = { id: number; from: "me" | "you"; text: string; links?: Answer["links"] };

let seq = 0;
const greeting: Msg = {
  id: seq++,
  from: "me",
  text: "Hi, I’m Sheshadri. Pick a question or type your own. Answers come from my real work history.",
};

export default function AskSheshadri({ compact = false, autoFocus = false }: { compact?: boolean; autoFocus?: boolean }) {
  const { setAskActive } = useVirtualHuman();
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, reduce]);

  const asked = new Set(messages.filter((m) => m.from === "you").map((m) => m.text));
  const suggestions = questions.filter((q) => !asked.has(q.label));
  const visible = showAll || compact ? suggestions : suggestions.slice(0, 4);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    setInput("");
    setBusy(true);
    setAskActive(true);
    setMessages((m) => [...m, { id: seq++, from: "you", text: q }]);
    const [answer] = await Promise.all([ask(q), new Promise((r) => setTimeout(r, reduce ? 0 : 420))]);
    setMessages((m) => [...m, { id: seq++, from: "me", text: answer.text, links: answer.links }]);
    setBusy(false);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <section
      aria-label="Ask Sheshadri"
      className="glass flex flex-col overflow-hidden rounded-[var(--radius-panel)]"
      onFocus={() => setAskActive(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setAskActive(false);
      }}
      onMouseEnter={() => setAskActive(true)}
      onMouseLeave={(e) => {
        if (!e.currentTarget.contains(document.activeElement)) setAskActive(false);
      }}
    >
      <header className="flex items-center gap-3 border-b border-line px-5 py-4">
        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-ink-3 ring-1 ring-magenta/40">
          <img src="/assets/guide/guide-face.webp" alt="" width={44} height={44} className="h-full w-full object-cover" />
          <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full bg-ice ring-2 ring-ink-2" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-base font-bold leading-tight">Ask Sheshadri</h2>
          <p className="text-xs text-muted">Quick answers about my work</p>
        </div>
      </header>

      <div
        ref={listRef}
        role="log"
        tabIndex={0}
        aria-live="polite"
        aria-relevant="additions"
        className={`flex flex-col gap-3 overflow-y-auto px-5 py-4 ${compact ? "max-h-[46vh]" : "max-h-[300px] min-h-[120px]"}`}
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`max-w-[92%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.from === "you"
                  ? "self-end rounded-br-md bg-magenta-strong text-white"
                  : "self-start rounded-bl-md border border-line bg-ink-3/70 text-text"
              }`}
            >
              <span className="sr-only">{m.from === "you" ? "You asked: " : "Sheshadri: "}</span>
              {m.text}
              {m.links && (
                <span className="mt-2 flex flex-wrap gap-2">
                  {m.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-line px-2 py-1 text-xs text-ice hover:border-ice/60"
                    >
                      {l.label}
                      {l.href.startsWith("http") && <ExternalLink size={11} aria-hidden />}
                    </a>
                  ))}
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {busy && (
          <div className="self-start rounded-2xl rounded-bl-md border border-line bg-ink-3/70 px-4 py-3" aria-label="Typing">
            <span className="flex gap-1" aria-hidden>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-muted"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </span>
          </div>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="border-t border-line px-5 py-3">
          <ul className="flex flex-wrap gap-2" aria-label="Suggested questions">
            {visible.map((q) => (
              <li key={q.id}>
                <button
                  type="button"
                  onClick={() => send(q.label)}
                  disabled={busy}
                  className="rounded-[10px] border border-line bg-ink-2 px-3 py-1.5 text-left text-xs text-muted transition-colors hover:border-magenta/50 hover:text-text disabled:opacity-50"
                >
                  {q.label}
                </button>
              </li>
            ))}
            {!compact && !showAll && suggestions.length > 4 && (
              <li>
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="rounded-[10px] px-2 py-1.5 text-xs text-ice underline-offset-4 hover:underline"
                >
                  More questions
                </button>
              </li>
            )}
          </ul>
        </div>
      )}

      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line px-3 py-3">
        <label htmlFor={inputId} className="sr-only">
          Your question
        </label>
        <input
          ref={inputRef}
          id={inputId}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={300}
          placeholder="Ask about my work…"
          autoComplete="off"
          className="h-11 min-w-0 flex-1 rounded-xl bg-transparent px-3 text-sm text-text placeholder:text-faint"
        />
        <button
          type="submit"
          disabled={!input.trim() || busy}
          aria-label="Send question"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-magenta-strong text-white transition-opacity disabled:opacity-40"
        >
          <ArrowUp size={18} aria-hidden />
        </button>
      </form>
    </section>
  );
}
