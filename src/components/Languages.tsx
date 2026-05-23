import { motion } from "framer-motion";
import { Languages as LanguagesIcon } from "lucide-react";

const languages = [
  { name: "Tamil", proficiency: "Native" },
  { name: "Kannada", proficiency: "Fluent" },
  { name: "Telugu", proficiency: "Fluent" },
  { name: "English", proficiency: "Professional" },
];

export default function Languages() {
  return (
    <section id="languages" className="py-16 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center gap-8"
        >
          <div className="flex items-center gap-4 md:w-48 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <LanguagesIcon size={20} />
            </div>
            <h2 className="text-xl font-bold font-heading">Languages</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 shadow-sm"
                data-testid={`language-${lang.name.toLowerCase()}`}
              >
                <span className="font-semibold text-sm">{lang.name}</span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">{lang.proficiency}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
