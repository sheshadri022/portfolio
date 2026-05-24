import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Commerce (B.Com)",
    school: "MGR College, Hosur",
    board: "Periyar University",
    year: "2021",
  },
  {
    degree: "Higher Secondary (+2) – Commerce",
    school: "R.V. Government Higher Secondary School, Hosur",
    board: "State Board",
    year: "2018",
  },
  {
    degree: "SSLC / 10th",
    school: "R.V. Government Higher Secondary School, Hosur",
    board: "State Board",
    year: "2016",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 inline-flex items-center gap-4">
            Education
            <span className="h-px w-24 bg-border inline-block"></span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Academic foundation that underpins a practical career in IT.
          </p>
        </motion.div>

        <div className="max-w-2xl flex flex-col gap-5">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-8 md:p-10 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all shadow-sm group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-600 to-pink-700 rounded-l-2xl" />
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <GraduationCap size={26} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading mb-1">{edu.degree}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-primary" />
                      <span>{edu.school}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {edu.board}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-primary" />
                      <span>{edu.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
