import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { about } from "@/data/profile";
import ResponsiveImage from "./ResponsiveImage";
import SectionHeading from "./SectionHeading";

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <motion.figure
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[420px] lg:sticky lg:top-28"
        >
          <ResponsiveImage
            base="/assets/avatars/about"
            alt="Sheshadri N with arms crossed"
            width={720}
            height={1170}
            className="relative block aspect-[4/5] h-auto w-full rounded-[var(--radius-panel)] border border-line object-cover object-top"
          />
          <figcaption className="hand absolute right-2 bottom-[8%] rotate-[-6deg] sm:-right-3 rounded-xl bg-ink/70 px-3 py-2 text-2xl text-ice backdrop-blur" aria-hidden>
            people, devices,
            <br />
            accounts, tools
          </figcaption>
        </motion.figure>

        <div>
          <SectionHeading id="about-title" title="About me" />
          <div className="max-w-[38rem] space-y-5 text-[1.075rem] leading-[1.75] text-muted">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>

          <div className="mt-10 rounded-[var(--radius-card)] border border-magenta/30 bg-gradient-to-br from-wine/30 to-transparent p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold">
              <Sparkles size={18} className="text-magenta" aria-hidden />
              {about.devCapability.title}
            </h3>
            <p className="mt-2 leading-relaxed text-muted">{about.devCapability.text}</p>
          </div>

          <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {about.focus.map((f) => (
              <div key={f.title} className="border-l-2 border-line-strong pl-4">
                <dt className="font-semibold text-text">{f.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
