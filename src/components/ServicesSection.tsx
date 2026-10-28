import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Clock, ExternalLink, Info, Rocket, Sparkles } from "lucide-react";
import { prefillContact, product, services, type Service } from "@/data/services";
import SectionHeading from "./SectionHeading";

// "Services I Provide" plus the IT Asset & Helpdesk product block.
// Product items marked live are in the public demo today; the rest is roadmap.

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

const shot = product.shot;

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

      <section id="product" aria-labelledby="product-title" className="section pt-0">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[28px] border border-line-strong bg-gradient-to-br from-[#ffe7dc] via-ink-2 to-ink-2 p-6 sm:p-10">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orchid/20 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-magenta/15 blur-3xl" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
              <div>
                <p className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-orchid/40 bg-orchid/10 px-3 py-1 font-semibold text-orchid">
                    <Sparkles size={14} aria-hidden /> Product
                  </span>
                  <span className="rounded-full border border-line px-3 py-1 text-faint">Working name</span>
                </p>
                <h2 id="product-title" className="mt-4 font-display text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.02]">
                  {product.name}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-text/90">{product.positioning}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{product.origin}</p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  <a href={product.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
                    View Demo <ExternalLink size={15} aria-hidden />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <a href="#contact" onClick={() => prefillContact("IT Asset & Helpdesk demo")} className="btn btn-ghost">
                    Request Demo
                  </a>
                  <a href="#contact" onClick={() => prefillContact("IT Asset & Helpdesk deployment")} className="btn btn-ghost">
                    Discuss Deployment
                  </a>
                </div>
                <p className="mt-3 text-xs text-faint">
                  The free demo server can take about 30 seconds to wake up.{" "}
                  <a href={product.demoCode} target="_blank" rel="noreferrer" className="font-medium text-ice underline underline-offset-2 hover:text-text">
                    Demo code on GitHub
                  </a>
                </p>
              </div>

              {shot && (
                <figure className="overflow-hidden rounded-2xl border border-line-strong bg-ink shadow-[0_30px_80px_-30px_rgb(18_48_71/0.4)]">
                  <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5" aria-hidden>
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-0.5 text-[11px] text-faint">Public demo, sample data</span>
                  </div>
                  <img src={shot.src} alt={shot.alt} loading="lazy" className="block w-full" />
                </figure>
              )}
            </div>

            <div className="relative mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Check size={15} className="text-ice" aria-hidden /> Available now, in the demo
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} className="text-faint" aria-hidden /> On the roadmap
              </span>
            </div>

            <ul className="relative mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {product.modules.map((m) => (
                <li key={m.title} className="rounded-2xl border border-line bg-ink/55 p-5">
                  <h3 className="font-display text-lg text-text">{m.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {m.items.map((it) => (
                      <li key={it.label} className={`flex items-start gap-2 ${it.live ? "text-text/90" : "text-muted"}`}>
                        {it.live ? (
                          <Check size={15} className="mt-0.5 shrink-0 text-ice" aria-hidden />
                        ) : (
                          <Clock size={15} className="mt-0.5 shrink-0 text-faint" aria-hidden />
                        )}
                        <span>
                          {it.label}
                          <span className="sr-only">{it.live ? " (available now)" : " (on the roadmap)"}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <div className="relative mt-8 rounded-2xl border border-dashed border-line-strong p-5 sm:p-6">
              <h3 className="flex items-center gap-2 font-display text-lg">
                <Rocket size={18} className="text-orchid" aria-hidden /> SaaS features
                <span className="ml-1 rounded-full bg-white/5 px-2.5 py-0.5 font-sans text-xs font-normal tracking-normal text-faint">Built, in internal use</span>
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {product.roadmap.map((r) => (
                  <li key={r.title} className="text-sm">
                    <span className="block font-semibold text-text">{r.title}</span>
                    <span className="mt-0.5 block text-muted">{r.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
