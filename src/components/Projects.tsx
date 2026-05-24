import { motion } from "framer-motion";
import { Tag, ExternalLink, Github } from "lucide-react";

interface Project {
  tag: string;
  title: string;
  description: string;
  tools: string[];
  features: string[];
  gradient: string;
  liveUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    tag: "Featured Project",
    title: "TechOps Portal",
    description:
      "IT Asset and Helpdesk Management Portal built for managing assets, tickets, users, and support workflows with a clean dashboard UI.",
    tools: ["React", "Tailwind CSS", "Node.js", "REST APIs", "Replit"],
    features: [
      "Asset inventory management",
      "Helpdesk ticket management system",
      "Admin dashboard with analytics",
      "Employee support portal",
      "Status tracking & SLA management",
      "IT workflow automation",
      "Responsive, modern UI",
    ],
    gradient: "from-rose-500 via-pink-600 to-purple-700",
    liveUrl: "https://techops-portal.onrender.com",
    githubUrl: "https://github.com/sheshadri022/techops-demo-portal",
  },
  {
    tag: "Personal Project",
    title: "Portfolio Website",
    description:
      "Personal portfolio website for showcasing experience, skills, projects, certifications, and contact details.",
    tools: ["React", "Vite", "Tailwind CSS", "Framer Motion", "TypeScript"],
    features: [
      "Animated hero section with role rotator",
      "Dark / light mode toggle",
      "Glassmorphism card design",
      "Smooth scroll navigation",
      "Responsive layout (mobile & desktop)",
      "Framer Motion entrance animations",
      "Deployed on Render via GitHub",
    ],
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    liveUrl: "https://sheshadri-portfolio.onrender.com",
    githubUrl: "https://github.com/sheshadri022/portfolio",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 inline-flex items-center gap-4">
            Featured Projects
            <span className="h-px w-24 bg-border inline-block"></span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Key projects that demonstrate IT operations expertise and development capability.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-xl"
              data-testid={`project-card-${idx}`}
            >
              {/* Top gradient accent */}
              <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${project.gradient}`} />

              <div className="p-8 md:p-12 lg:p-16">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
                        <Tag size={14} />
                        {project.tag}
                      </div>
                      {idx === 0 && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-rose-600/20 to-pink-700/20 text-rose-400 border border-rose-600/30 text-xs font-semibold">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-400"></span>
                          </span>
                          Live
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {project.description}
                    </p>

                    <div className="mb-8">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-3">Technologies & Tools</span>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary border border-primary/20 font-medium"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20"
                        data-testid={`button-live-demo-${idx}`}
                      >
                        <ExternalLink size={15} />
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-semibold hover:border-primary/50 hover:text-primary transition-all hover:-translate-y-0.5 bg-white/5"
                        data-testid={`button-github-${idx}`}
                      >
                        <Github size={15} />
                        GitHub
                      </a>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                      Key Features & Outcomes
                    </h4>
                    <ul className="grid gap-3">
                      {project.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.06 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border text-sm"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </div>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
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
