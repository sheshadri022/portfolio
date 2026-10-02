import { motion } from "framer-motion";
import { Building2, Calendar, CheckCircle2 } from "lucide-react";

const company = {
  name: "Miles Education Pvt Ltd",
  roles: [
    {
      title: "Associate – Asset Management",
      duration: "Oct 2023 – Present",
      current: true,
      responsibilities: [
        "Own the IT asset lifecycle: procurement, allocation, inventory and SaaS licence tracking",
        "Google Workspace administration: users, groups, security policies, email migration",
        "Employee onboarding/offboarding and access management",
        "L1/L2 support on Freshservice with an SLA focus",
        "Windows setup, troubleshooting and hands-on laptop servicing",
        "Built an internal IT Asset & Helpdesk Portal using AI-assisted development",
      ],
    },
    {
      title: "IT Support",
      duration: "Oct 2022 – Sep 2023",
      current: false,
      responsibilities: [
        "L1/L2 support for hardware, software and system issues",
        "Windows OS installation, configuration and laptop/desktop troubleshooting",
        "Service desk ticket handling and issue resolution",
        "Supported IT asset tracking and inventory",
      ],
    },
    {
      title: "Network Support",
      duration: "Oct 2021 – Sep 2022",
      current: false,
      responsibilities: [
        "Network and connectivity troubleshooting for office users",
        "Desktop and laptop setup and basic hardware support",
        "First-line technical support for staff",
      ],
    }
  ],
};

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 inline-flex items-center gap-4">
            Experience
            <span className="h-px w-24 bg-border inline-block"></span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            5 years keeping workplace technology running: people, devices, accounts and tools.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-border bg-card shadow-xl overflow-hidden"
        >
          {/* Company header */}
          <div className="flex flex-wrap items-center gap-4 px-8 md:px-12 py-6 border-b border-border bg-muted/30">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <Building2 size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading">{company.name}</h3>
              <p className="text-sm text-muted-foreground">Oct 2021 – Present · 5 years</p>
            </div>
          </div>

          {/* Roles */}
          <div className="px-8 md:px-12 py-8 flex flex-col gap-0">
            {company.roles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="relative"
              >
                {/* Vertical connector between roles */}
                {i < company.roles.length - 1 && (
                  <div className="absolute left-[9px] top-[28px] bottom-0 w-px bg-gradient-to-b from-primary/60 to-primary/10" />
                )}

                <div className={`pb-10 ${i < company.roles.length - 1 ? "mb-2" : ""}`}>
                  {/* Role header with dot */}
                  <div className="flex flex-wrap items-start gap-4 mb-5">
                    <div className="relative mt-1.5 flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-primary border-4 border-card shadow-lg shadow-primary/30" />
                    </div>
                    <div className="flex-1 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <h4 className="text-lg font-bold font-heading">{role.title}</h4>
                          {role.current && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border flex-shrink-0">
                        <Calendar size={13} className="text-primary" />
                        {role.duration}
                      </div>
                    </div>
                  </div>

                  {/* Responsibilities indented under dot */}
                  <div className="ml-9">
                    <ul className="grid md:grid-cols-2 gap-3">
                      {role.responsibilities.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 size={15} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
