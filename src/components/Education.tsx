import { GraduationCap } from "lucide-react";
import { education, languages } from "@/data/profile";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" aria-labelledby="edu-title" className="section">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
        <div>
          <SectionHeading id="edu-title" title="Education" />
          <ol className="space-y-4">
            {education.map((e) => (
              <li key={e.degree} className="flex gap-5 rounded-[var(--radius-card)] border border-line bg-ink-2/60 p-6">
                <GraduationCap size={24} className="mt-0.5 shrink-0 text-magenta" aria-hidden />
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-display text-lg font-bold">{e.degree}</h3>
                    <span className="text-sm text-faint">{e.year}</span>
                  </div>
                  <p className="mt-1 text-muted">{e.school}</p>
                  <p className="text-sm text-faint">{e.board}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:pt-[7.5rem]">
          <h3 className="font-display text-2xl font-bold">Languages</h3>
          <ul className="mt-5 divide-y divide-line rounded-[var(--radius-card)] border border-line">
            {languages.map((l) => (
              <li key={l.name} className="flex items-center justify-between px-5 py-4">
                <span className="font-semibold">{l.name}</span>
                <span className="text-sm text-muted">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
