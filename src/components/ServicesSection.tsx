import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { prefillContact, services, type Service } from "@/data/services";
import SectionHeading from "./SectionHeading";

// "Services I Provide". The SNS Cloud portal itself is shown in Featured projects.

const toneText = { magenta: "text-magenta", ice: "text-ice", orchid: "text-orchid", sun: "text-[#9a5b00]" } as const;
const toneTile = {
  magenta: "bg-magenta/10 border-magenta/25",
  ice: "bg-ice/10 border-ice/25",
  orchid: "bg-orchid/10 border-orchid/25",
  sun: "bg-[#9a5b00]/10 border-[#9a5b00]/25",
} as const;
const toneHover = {
  magenta: "hover:border-magenta/45",
  ice: "hover:border-ice/45",
  orchid: "hover:border-orchid/45",
  sun: "hover:border-[#9a5b00]/45",
} as const;


export default function ServicesSection() {
  const reduce = useReducedMotion();
  return (
    <>
      <section id="services" aria-labelledby="services-title" className="section">
        <div className="container-x">
          <SectionHeading id="services-title" title="Services I Provide">
            Practical IT help for startups and growing businesses: devices, websites, Google Workspace and the software to run it all.
          </SectionHeading>

          <ul className="grid gap-5 md:grid-cols-2">
            {services.map((s, i) => (
              <motion.li
                key={s.id}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <ServiceCard s={s} />
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

    </>
  );
}

function ServiceCard({ s }: { s: Service }) {
  const Icon = s.icon;
  return (
    <article
      className={`flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-ink-2/70 p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 sm:p-8 ${toneHover[s.tone]}`}
    >
      <span className={`grid h-14 w-14 place-items-center rounded-2xl border ${toneTile[s.tone]} ${toneText[s.tone]}`}>
        <Icon size={26} aria-hidden />
      </span>
      <h3 className="mt-5 font-display text-xl leading-tight break-words sm:text-2xl">{s.title}</h3>
      <p className="mt-2 leading-relaxed text-muted">{s.description}</p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${s.title}: what's included`}>
        {s.capabilities.map((c) => (
          <li key={c} className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-[13px] text-text/85">
            {c}
          </li>
        ))}
      </ul>

      {s.tech && (
        <p className="mt-5 text-sm text-muted">
          <span className="mr-2 font-semibold text-text">Built with</span>
          {s.tech.join(" · ")}
        </p>
      )}

      {s.note && (
        <p className="mt-5 flex items-start gap-2 rounded-xl border border-line bg-white/[0.03] px-3.5 py-2.5 text-xs leading-relaxed text-muted">
          <Info size={14} className="mt-0.5 shrink-0" aria-hidden />
          {s.note}
        </p>
      )}

      <div className="mt-auto pt-6">
        <a
          href={s.cta.href}
          onClick={() => s.cta.need && prefillContact(s.cta.need)}
          className={`inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold ${toneText[s.tone]} hover:underline`}
        >
          {s.cta.label}
          <ArrowRight size={15} aria-hidden />
        </a>
      </div>
    </article>
  );
}
