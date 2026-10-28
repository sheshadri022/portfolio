import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { skillGroups } from "@/data/profile";

// Skills laid out as a periodic table. Every skill from profile.ts becomes an
// element; the group decides its colour. Symbols are derived, with a few
// hand-picked ones where the obvious letters read better.

const override: Record<string, string> = {
  "IT Operations": "It",
  "IT Asset Management": "Am",
  "Google Admin Console": "Ga",
  "Gmail Administration": "Gm",
  "Google Groups": "Gg",
  "SPF / DKIM / DMARC": "Dk",
  DNS: "Dn",
  React: "Re",
  TypeScript: "Ts",
  "Tailwind CSS": "Tw",
  "Node.js": "No",
  Express: "Ex",
  PostgreSQL: "Pg",
  "Drizzle ORM": "Dz",
  Supabase: "Sb",
  GitHub: "Gh",
  Render: "Rn",
  WordPress: "Wp",
  "REST APIs": "Ap",
  "Replit AI": "Rp",
  Freshservice: "Fs",
  "AI-Assisted Full-Stack Development": "Af",
};

const groupStyle = [
  { tile: "border-magenta/40 bg-magenta/[0.07]", sym: "text-magenta", dot: "bg-magenta" },
  { tile: "border-ice/40 bg-ice/[0.06]", sym: "text-ice", dot: "bg-ice" },
  { tile: "border-orchid/45 bg-orchid/[0.08]", sym: "text-orchid", dot: "bg-orchid" },
  { tile: "border-[#facc15]/40 bg-[#facc15]/[0.07]", sym: "text-[#fde047]", dot: "bg-[#facc15]" },
];

type El = { n: number; symbol: string; name: string; group: number };

function buildElements(): El[] {
  const used = new Set<string>();
  const out: El[] = [];
  let n = 1;
  skillGroups.forEach((g, gi) => {
    for (const name of g.items) {
      let sym = override[name];
      if (!sym || used.has(sym)) {
        const letters = name.replace(/[^A-Za-z]/g, "");
        sym = letters[0].toUpperCase() + (letters[1] ?? "").toLowerCase();
        for (let i = 2; used.has(sym) && i < letters.length; i++) sym = letters[0].toUpperCase() + letters[i].toLowerCase();
      }
      used.add(sym);
      out.push({ n: n++, symbol: sym, name, group: gi });
    }
  });
  return out;
}

export default function PeriodicSkills() {
  const elements = useMemo(buildElements, []);
  const [filter, setFilter] = useState<number | null>(null);
  const [focus, setFocus] = useState<El | null>(null);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2" role="group" aria-label="Filter skills by group">
        <button
          type="button"
          onClick={() => setFilter(null)}
          aria-pressed={filter === null}
          className={`rounded-full border px-3 py-1.5 text-sm ${filter === null ? "border-text text-text" : "border-line text-muted hover:text-text"}`}
        >
          All {elements.length}
        </button>
        {skillGroups.map((g, i) => (
          <button
            key={g.title}
            type="button"
            onClick={() => setFilter(filter === i ? null : i)}
            aria-pressed={filter === i}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${
              filter === i ? "border-text text-text" : "border-line text-muted hover:text-text"
            }`}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${groupStyle[i].dot}`} aria-hidden />
            {g.title}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 sm:gap-2 lg:grid-cols-10" aria-label="Skills table">
        {elements.map((e, i) => {
          const s = groupStyle[e.group];
          const dim = filter !== null && filter !== e.group;
          return (
            <motion.li
              key={e.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: (i % 10) * 0.03 }}
            >
              <button
                type="button"
                onMouseEnter={() => setFocus(e)}
                onFocus={() => setFocus(e)}
                onClick={() => setFocus(e)}
                aria-label={`${e.name}, ${skillGroups[e.group].title}`}
                className={`relative flex aspect-square w-full flex-col justify-between rounded-[10px] border p-1.5 text-left transition-[opacity,transform] duration-200 hover:-translate-y-0.5 sm:p-2 ${s.tile} ${
                  dim ? "opacity-20" : "opacity-100"
                }`}
              >
                <span className="text-[9px] leading-none text-faint sm:text-[10px]">{e.n}</span>
                <span className={`font-display text-xl font-extrabold leading-none sm:text-2xl ${s.sym}`}>{e.symbol}</span>
                <span className="line-clamp-2 text-[8.5px] leading-tight text-muted sm:text-[10px]">{e.name}</span>
              </button>
            </motion.li>
          );
        })}
      </ul>

      <p className="mt-4 min-h-[1.5rem] text-sm text-muted" aria-live="polite">
        {focus ? (
          <>
            <span className={`font-display font-bold ${groupStyle[focus.group].sym}`}>{focus.symbol}</span>{" "}
            <span className="text-text">{focus.name}</span>, part of {skillGroups[focus.group].title}.
          </>
        ) : (
          "Point at an element to read it in full."
        )}
      </p>
    </div>
  );
}
