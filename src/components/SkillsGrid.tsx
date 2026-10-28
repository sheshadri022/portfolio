import { useState } from "react";
import { Bot, Code2, Cloud, MonitorCog } from "lucide-react";
import { skillGroups } from "@/data/profile";
import SectionHeading from "./SectionHeading";

const icons = [MonitorCog, Cloud, Code2, Bot];
const accents = ["text-magenta", "text-ice", "text-orchid", "text-magenta"];
const PREVIEW = 10;

export default function SkillsGrid() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="container-x">
        <SectionHeading id="skills-title" title="Skills">
          Built through five years of hands-on workplace IT, and the apps that came out of it.
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((g, i) => {
            const Icon = icons[i];
            const open = expanded[g.title];
            const items = open ? g.items : g.items.slice(0, PREVIEW);
            const more = g.items.length - PREVIEW;
            const listId = `skills-${i}`;
            return (
              <article key={g.title} aria-labelledby={`${listId}-t`} className="glass rounded-[var(--radius-card)] p-6 sm:p-8">
                <Icon size={26} className={accents[i]} aria-hidden />
                <h3 id={`${listId}-t`} className="mt-4 font-display text-xl font-bold">
                  {g.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{g.text}</p>
                <ul id={listId} className="mt-5 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <li key={s} className="chip !text-text/85">
                      {s}
                    </li>
                  ))}
                </ul>
                {more > 0 && (
                  <button
                    type="button"
                    aria-expanded={!!open}
                    aria-controls={listId}
                    onClick={() => setExpanded((e) => ({ ...e, [g.title]: !open }))}
                    className="mt-4 text-sm text-ice underline-offset-4 hover:underline"
                  >
                    {open ? "Show fewer" : `Show ${more} more`}
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
