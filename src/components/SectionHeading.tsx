import type { ReactNode } from "react";
import { useTalk } from "@/context/Talk";

export default function SectionHeading({ id, title, children, aside }: { id: string; title: string; children?: ReactNode; aside?: ReactNode }) {
  const { say, cancel, voiceOn } = useTalk();
  const clip = id.replace(/-title$/, "");
  const head = (
    <div className="max-w-2xl" onMouseEnter={() => voiceOn && say(clip)} onMouseLeave={cancel}>
      <h2 id={id} className="font-display text-[clamp(2rem,4.4vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.02em]">
        {title}
      </h2>
      {children && <p className="mt-4 text-lg leading-relaxed text-muted">{children}</p>}
    </div>
  );
  if (!aside) return <div className="mb-12 md:mb-16">{head}</div>;
  return (
    <div className="mb-12 flex items-end justify-between gap-8 md:mb-16">
      {head}
      <div className="hidden shrink-0 md:block">{aside}</div>
    </div>
  );
}
