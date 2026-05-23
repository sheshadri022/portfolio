import { motion } from "framer-motion";
import { Monitor, Cloud, Ticket, HeadphonesIcon, Laptop, Package, Network, FileSpreadsheet } from "lucide-react";

const skills = [
  { name: "Windows OS", icon: <Monitor size={28} />, level: 95 },
  { name: "Google Workspace", icon: <Cloud size={28} />, level: 92 },
  { name: "ITSM Tools", icon: <Ticket size={28} />, level: 88 },
  { name: "IT Support (L1/L2)", icon: <HeadphonesIcon size={28} />, level: 95 },
  { name: "Desktop & Laptop Support", icon: <Laptop size={28} />, level: 93 },
  { name: "IT Asset Management", icon: <Package size={28} />, level: 90 },
  { name: "Networking Basics", icon: <Network size={28} />, level: 75 },
  { name: "MS Office", icon: <FileSpreadsheet size={28} />, level: 85 },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 inline-flex items-center gap-4">
            Skills
            <span className="h-px w-24 bg-border inline-block"></span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Core technical competencies built through 4+ years of hands-on enterprise IT experience.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
              data-testid={`skill-card-${i}`}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                {skill.icon}
              </div>
              <h3 className="font-semibold text-base mb-4">{skill.name}</h3>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.07 + 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
