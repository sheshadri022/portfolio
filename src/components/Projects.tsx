import { motion } from "framer-motion";
import { Tag, User, Wrench, ExternalLink, Github } from "lucide-react";

interface Project {
  tag: string;
  title: string;
  description: string;
  role: string;
  tools: string[];
  features: string[];
  image?: string;
  gradient: string;
  featured: boolean;
  liveUrl: string | null;
  githubUrl: string | null;
}

const projects: Project[] = [
  {
    tag: "Featured Project",
    title: "IT Asset & Helpdesk Portal",
    description:
      "Built a modern IT Asset & Helpdesk Portal using Replit AI-assisted development. The platform helps manage IT assets, employee support tickets, onboarding/offboarding requests, asset allocation, issue tracking, and internal IT workflows.",
    role: "System Administrator / Developer",
    tools: ["Replit AI", "React", "Tailwind CSS", "Firebase / Supabase", "REST APIs"],
    features: [
      "Asset inventory management",
      "Ticket management system",
      "Admin dashboard",
      "Employee support portal",
      "Status tracking",
      "IT workflow automation",
      "Responsive UI",
    ],
    image: "/project-helpdesk.png",
    gradient: "from-rose-500 via-pink-600 to-purple-700",
    featured: true,
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    tag: "Internal Initiative",
    title: "Miles IT Asset Management",
    description:
      "Developed and managed an internal IT Asset Management process for tracking laptops, desktops, accessories, and IT resources across departments. Streamlined asset allocation, onboarding/offboarding processes, inventory tracking, procurement coordination, and maintenance lifecycle management.",
    role: "System Administrator / IT Asset Coordinator",
    tools: ["Google Workspace", "ITSM Tools", "Excel", "Windows Administration", "Asset Tracking Systems"],
    features: [
      "Asset allocation & tracking",
      "Employee onboarding/offboarding asset handling",
      "Inventory management",
      "Procurement coordination",
      "IT asset lifecycle monitoring",
      "Excel/ITSM-based reporting",
      "Reduced asset loss & improved tracking efficiency",
    ],
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    featured: false,
    liveUrl: null,
    githubUrl: null,
  },
  {
    tag: "Internal Platform",
    title: "Miles IT Hub",
    description:
      "Built and maintained a centralized IT Hub for Miles Education — a single point of contact for all IT support, service requests, and knowledge resources. Consolidated helpdesk operations, standardized support workflows, and created self-service guides to reduce ticket volume and improve end-user resolution times.",
    role: "System Administrator / Google Workspace Admin",
    tools: ["Google Workspace", "ITSM Ticketing", "Windows OS", "Network Troubleshooting", "Knowledge Base Tools"],
    features: [
      "Centralized IT helpdesk operations",
      "Standardized L1/L2 support workflows",
      "Self-service knowledge base & guides",
      "Ticket triage and SLA management",
      "End-user onboarding documentation",
      "Hardware & software request handling",
      "Reduced average ticket resolution time",
    ],
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    featured: false,
    liveUrl: null,
    githubUrl: null,
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
            Key initiatives that streamlined IT operations and improved organizational efficiency.
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
                      {project.featured && (
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

                    <div className="flex items-center gap-3 mb-6">
                      <User size={16} className="text-primary flex-shrink-0" />
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Role</span>
                        <p className="text-sm font-semibold">{project.role}</p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-3">
                        <Wrench size={16} className="text-primary" />
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Technologies & Tools</span>
                      </div>
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

                    {/* CTA buttons for featured project */}
                    {project.featured && (
                      <div className="flex flex-wrap gap-3">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20"
                            data-testid="button-live-demo"
                          >
                            <ExternalLink size={15} />
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-semibold hover:border-primary/50 hover:text-primary transition-all hover:-translate-y-0.5 bg-white/5"
                            data-testid="button-github"
                          >
                            <Github size={15} />
                            GitHub
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Project image for featured projects */}
                    {project.image && (
                      <div className="mb-6 rounded-2xl overflow-hidden border border-border shadow-lg">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
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
