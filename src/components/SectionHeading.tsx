import type { ReactNode } from "react";

export default function SectionHeading({ id, title, children }: { id: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-12 max-w-2xl md:mb-16">
      <h2 id={id} className="font-display text-[clamp(2rem,4.4vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.02em]">
        {title}
      </h2>
      {children && <p className="mt-4 text-lg leading-relaxed text-muted">{children}</p>}
    </div>
  );
}
