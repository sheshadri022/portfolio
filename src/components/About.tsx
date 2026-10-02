import { motion } from "framer-motion";
import { Server, Users, Laptop, Wrench, Building } from "lucide-react";

const highlights = [
  {
    icon: <Users size={24} />,
    title: "Google Workspace Admin",
    desc: "Managing users, groups, security policies, and access controls enterprise-wide.",
  },
  {
    icon: <Server size={24} />,
    title: "L1/L2 Technical Support",
    desc: "Resolving complex technical issues to maintain SLAs and minimize downtime.",
  },
  {
    icon: <Laptop size={24} />,
    title: "IT Asset Lifecycle",
    desc: "End-to-end tracking, procurement, and maintenance of hardware and software.",
  },
  {
    icon: <Wrench size={24} />,
    title: "Troubleshooting",
    desc: "Expert hardware & software diagnostics for Windows environments.",
  },
  {
    icon: <Building size={24} />,
    title: "Enterprise IT Management",
    desc: "Streamlining onboarding/offboarding and ticketing systems.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 inline-flex items-center gap-4">
            About Me
            <span className="h-px w-24 bg-border inline-block"></span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I keep workplaces running: people, devices, accounts and tools. I joined Miles Education in 2021 in Network Support, moved to IT Support in 2022, and have been Associate – Asset Management since 2023, looking after Google Workspace, onboarding/offboarding, L1/L2 helpdesk, laptop servicing and the IT asset lifecycle.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mt-4">
            I also build. Using AI tools, I created our internal IT Asset & Helpdesk Portal, set up Google Workspace for two businesses, and built a complete e-commerce website for a client. For startups, I can plan and set up IT from day one.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm hover:shadow-md backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
