import { entities } from "@/data/profile";

// One IT function, three companies. Logos are shown as supplied, each on the
// plate it was designed for (white/yellow marks on dark, navy marks on light).
export default function EntityStrip() {
  return (
    <div className="glass rounded-[var(--radius-panel)] p-3 sm:p-4">
      <ul className="grid gap-3 md:grid-cols-3">
        {entities.map((e) => (
          <li key={e.legalName} className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-2/60">
            <div
              className={`flex h-28 items-center justify-center gap-5 px-6 ${
                e.logos[0].plate === "light" ? "bg-[#f4f6fb]" : "bg-[#14121c]"
              }`}
            >
              {e.logos.map((l) => (
                <img
                  key={l.src}
                  src={l.src}
                  alt={l.alt}
                  style={{ height: l.height }}
                  className={`w-auto object-contain ${e.logos.length > 1 ? "max-w-[44%]" : "max-w-[80%]"}`}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
            <div className="px-5 py-4">
              <p className="font-semibold text-text">{e.legalName}</p>
              <p className="mt-0.5 text-sm text-muted">
                {e.brand !== e.legalName ? `${e.brand}, ` : ""}
                {e.note.toLowerCase()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
