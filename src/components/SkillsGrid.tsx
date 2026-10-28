import { useState } from "react";
import { Bot, Code2, Cloud, MonitorCog, PlayCircle, X } from "lucide-react";
import { skillGroups } from "@/data/profile";
import { skillExplainers } from "@/data/voice";
import SectionHeading from "./SectionHeading";
import SkillExplainer from "./SkillExplainer";
import PeriodicSkills from "./PeriodicSkills";
import { useTalk } from "@/context/Talk";

const icons = [MonitorCog, Cloud, Code2, Bot];
const accents = ["text-magenta", "text-ice", "text-orchid", "text-magenta"];
const audioFiles = ["workplace", "workspace", "dev", "ai"];

export default function SkillsGrid() {
  const [playing, setPlaying] = useState<number | null>(null);
  const { stop } = useTalk();

  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="container-x">
        <SectionHeading
          id="skills-title"
          title="Skills"
          aside={
            <img src="/assets/avatars/interactive.webp" alt="Sheshadri pointing at Work, Automate, Build and Support" width={340} height={366} loading="lazy" className="h-[260px] w-auto rounded-[22px] border border-line object-cover" />
          }
        >
          Built through five years of hands-on workplace IT, and the apps that came out of it.
        </SectionHeading>

        <PeriodicSkills />

        <h3 className="mt-16 font-display text-2xl font-bold">How it works</h3>
        <p className="mt-2 max-w-2xl text-muted">Pick a group to hear how that work actually runs, step by step.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {skillGroups.map((g, i) => {
            const Icon = icons[i];
            const listId = `skills-${i}`;
            return (
              <article key={g.title} aria-labelledby={`${listId}-t`} className="glass rounded-[var(--radius-card)] p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <Icon size={26} className={accents[i]} aria-hidden />
                  <button
                    type="button"
                    aria-expanded={playing === i}
                    aria-controls={`${listId}-x`}
                    onClick={() => {
                      stop();
                      setPlaying(playing === i ? null : i);
                    }}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line-strong px-3.5 text-sm text-text transition-colors hover:border-magenta/60"
                  >
                    {playing === i ? <X size={16} aria-hidden /> : <PlayCircle size={16} className="text-magenta" aria-hidden />}
                    {playing === i ? "Close" : "How it works"}
                  </button>
                </div>
                <h4 id={`${listId}-t`} className="mt-4 font-display text-xl font-bold">
                  {g.title}
                </h4>
                <p className="mt-1 text-sm text-muted">{g.text}</p>
                <div id={`${listId}-x`}>
                  {playing === i && (
                    <SkillExplainer
                      audio={`/assets/voice/${audioFiles[i]}.mp3`}
                      script={skillExplainers[i].script}
                      steps={skillExplainers[i].steps}
                      accent={accents[i]}
                    />
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
