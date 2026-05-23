import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Calendar, Clock } from "lucide-react";

const certs = [
  {
    title: "Google Workspace (G Suite) Admin – The Complete Course",
    platform: "Udemy",
    instructor: "Saleh Ramadan",
    date: "June 25, 2024",
    hours: "32 total hours",
    certNo: "UC-8a9dbdc1-f6f2-49bb-9eed-65a562811cc7",
    verifyUrl: "https://ude.my/UC-8a9dbdc1-f6f2-49bb-9eed-65a562811cc7",
    image: "/cert-gworkspace.jpeg",
    description: "Comprehensive 32-hour course covering Google Workspace administration, user provisioning, security policies, and enterprise collaboration tools.",
    glowColor: "bg-rose-700/10",
  },
  {
    title: "IT Asset Management (ITAM) Course with Certificate",
    platform: "Udemy",
    instructor: "Mahmoud Elnady",
    date: "Nov. 20, 2025",
    hours: "1 total hour",
    certNo: "UC-ed9acd1b-420a-41f6-9e2f-f473ad4d87a6",
    verifyUrl: "https://ude.my/UC-ed9acd1b-420a-41f6-9e2f-f473ad4d87a6",
    image: "/cert-itam.jpeg",
    description: "Certified in IT asset lifecycle management, inventory tracking, procurement coordination, and ITAM best practices for enterprise environments.",
    glowColor: "bg-pink-700/10",
  },
  {
    title: "Technical Support Fundamentals",
    platform: "Google / Coursera",
    instructor: "Google",
    date: "Jul 31, 2025",
    hours: null,
    certNo: "ZO4RMTOSHTPE",
    verifyUrl: "https://coursera.org/verify/ZO4RMTOSHTPE",
    image: "/cert-google-tsf.jpeg",
    description: "Google-authorized course covering hardware, software, networking, operating systems, and IT customer service fundamentals.",
    glowColor: "bg-emerald-500/10",
  },
];

export default function Certifications() {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <section id="certifications" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 inline-flex items-center gap-4">
            Certifications
            <span className="h-px w-24 bg-border inline-block"></span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Verified credentials from industry-recognized platforms.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative group flex flex-col rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              data-testid={`cert-card-${i}`}
            >
              {/* Certificate thumbnail */}
              <button
                onClick={() => setPreview(cert.image)}
                className="relative overflow-hidden aspect-[16/7] w-full bg-white flex-shrink-0 cursor-zoom-in"
                data-testid={`cert-preview-${i}`}
                aria-label={`View ${cert.title} certificate`}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-semibold bg-black/60 px-3 py-1 rounded-full">
                    View Certificate
                  </span>
                </div>
              </button>

              {/* Glow */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 ${cert.glowColor} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`} />

              <div className="relative flex flex-col flex-1 p-6">
                {/* Platform badge + verify */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                    {cert.platform}
                  </span>
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                      data-testid={`cert-verify-${i}`}
                    >
                      <ExternalLink size={12} />
                      Verify
                    </a>
                  )}
                </div>

                <h3 className="text-sm font-bold font-heading mb-2 leading-snug">{cert.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">{cert.description}</p>

                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground border-t border-border pt-3 mt-auto">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={11} className="text-primary" />
                    {cert.date}
                  </div>
                  {cert.hours && (
                    <div className="flex items-center gap-1.5">
                      <Clock size={11} className="text-primary" />
                      {cert.hours}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate lightbox */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={preview} alt="Certificate" className="w-full h-auto" />
              <button
                onClick={() => setPreview(null)}
                className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                data-testid="button-close-preview"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
