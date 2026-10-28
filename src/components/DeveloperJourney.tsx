import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { journey } from "@/data/profile";
import ResponsiveImage from "./ResponsiveImage";
import SectionHeading from "./SectionHeading";

// An excerpt from the real API in the TechOps demo repository.
const code = [
  ["k", 'router.get("/assets", async (req, res) => {'],
  ["", "  const qp = ListAssetsQueryParams.safeParse(req.query);"],
  ["", "  let query = db.select().from(assetsTable).$dynamic();"],
  ["c", "  // filter by status or category"],
  ["", "  if (qp.data.status)"],
  ["", "    query = query.where(eq(assetsTable.status, qp.data.status));"],
  ["", "  const assets = await query.orderBy(assetsTable.createdAt);"],
  ["k", "});"],
] as const;

function DeskScene() {
  return (
    <figure className="relative mx-auto w-full max-w-[640px]">
      <ResponsiveImage
        base="/assets/avatars/developer"
        alt="Sheshadri N working on a laptop with code on the monitors"
        width={1100}
        height={923}
        className="block aspect-[1100/923] h-auto w-full rounded-[var(--radius-panel)] border border-line object-cover"
      />
      {/* Real excerpt from the asset portal API */}
      <div className="absolute -bottom-6 right-3 hidden w-[min(78%,360px)] sm:block rounded-[14px] border border-line-strong bg-[#0a0d1f]/95 p-4 font-mono text-[10px] leading-[1.7] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] sm:-right-6 sm:text-[11px]">
        <p className="mb-2 text-[10px] text-faint">api-server/src/routes/assets.ts</p>
        <pre className="overflow-hidden whitespace-pre text-muted">
          {code.map(([t, line], i) => (
            <span key={i} className={`block ${t === "k" ? "text-ice" : t === "c" ? "text-faint" : ""}`}>
              {line}
            </span>
          ))}
        </pre>
      </div>
      <figcaption className="hand absolute -top-5 left-4 -rotate-6 text-2xl text-magenta" aria-hidden>
        building the asset portal
      </figcaption>
    </figure>
  );
}

export default function DeveloperJourney() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section id="journey" aria-labelledby="journey-title" className="section">
      <div className="container-x">
        <SectionHeading id="journey-title" title="From IT Operations to Building Solutions">
          The building comes out of the support work, not the other way round.
        </SectionHeading>

        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <DeskScene />

          <div className="relative">
            <div aria-hidden className="absolute bottom-4 left-[19px] top-4 w-px bg-line" />
            <motion.div
              aria-hidden
              className="absolute left-[19px] top-4 w-px origin-top bg-gradient-to-b from-magenta via-orchid to-ice"
              style={{ scaleY: progress, bottom: 16 }}
            />
            <ol ref={ref} className="relative space-y-7">
              {journey.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong bg-ink font-display text-sm font-bold text-text">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-display text-lg font-bold leading-snug">{s.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
