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
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[620px]">
      {/* Monitor */}
      <div className="absolute right-0 top-0 w-[82%] overflow-hidden rounded-[16px] border border-line-strong bg-[#0c1024] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
        <div className="h-6 border-b border-line bg-white/[0.02]" aria-hidden />
        <img
          src="/assets/projects/techops-dashboard-sm.webp"
          alt="Dashboard of the asset and helpdesk portal, demo data"
          width={640}
          height={400}
          loading="lazy"
          className="block h-auto w-full"
        />
      </div>
      <div aria-hidden className="absolute right-[34%] top-[58%] h-[8%] w-[14%] bg-gradient-to-b from-line-strong to-transparent" />

      {/* Code window */}
      <div className="absolute bottom-[4%] right-[4%] w-[66%] rounded-[14px] border border-line-strong bg-[#0a0d1f]/95 p-4 font-mono text-[10px] leading-[1.7] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] sm:text-[11px]">
        <p className="mb-2 text-[10px] text-faint">api-server/src/routes/assets.ts</p>
        <pre className="overflow-hidden whitespace-pre text-muted">
          {code.map(([t, line], i) => (
            <span key={i} className={`block ${t === "k" ? "text-ice" : t === "c" ? "text-faint" : ""}`}>
              {line}
            </span>
          ))}
        </pre>
      </div>

      {/* Sheshadri, presenting the work */}
      <div className="absolute bottom-0 left-0 w-[34%]">
        <ResponsiveImage
          base="/assets/profile/hero-sm"
          alt="Sheshadri N presenting the portal"
          width={320}
          height={550}
          className="block h-auto w-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
        />
      </div>
      <p className="hand absolute left-[1%] top-[36%] -rotate-6 text-2xl text-magenta" aria-hidden>
        built this one
      </p>
    </div>
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
