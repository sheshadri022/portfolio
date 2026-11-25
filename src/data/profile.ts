import { years } from "@/lib/career";
// Single source of truth for every fact shown on the site and used by
// "Ask Sheshadri". Keep this file factual: if something is not verified,
// it does not go here.

export const person = {
  name: "SHESHADRI N",
  title: "Workplace Technology Support",
  // The hero cycles through these every 3 seconds, starting with the title.
  titles: ["Workplace Technology Support", "AI-Assisted Developer", "IT Asset Management", "Google Workspace Admin"],
  positioning: [
    "IT Operations",
    "Google Workspace",
    "Asset Management",
    "Hardware Services",
    "Automation",
    "AI-Assisted Full-Stack Development",
  ],
  // Short hero line.
  headline:
    "I manage workplace technology, repair and optimise devices, administer Google Workspace, and build practical software solutions for real business operations.",
  intro:
    `Workplace Technology Support professional and AI-assisted developer with ${years}+ years of experience across IT operations, Google Workspace administration, endpoint support, IT asset management and hardware servicing, supporting about 1,200 employees across 13 locations. I built and run the SNS Cloud IT Asset & Helpdesk Portal, and I design and deploy websites and SaaS applications using AI-assisted full-stack development.`,
  location: "Bengaluru, Karnataka",
  email: "sheshadri022@gmail.com",
  phone: "+91 8190062144",
  phoneHref: "tel:+918190062144",
  whatsapp: "https://wa.me/918190062144?text=" + encodeURIComponent("Hi Sheshadri, I found you on snscloud.in."),
  linkedin: "https://www.linkedin.com/in/sheshadri-n",
  github: "https://github.com/sheshadri022",
  resume: "/resume.pdf",
  site: "https://snscloud.in/",
};

export const stats = [
  { value: `${years}+`, label: "Years in workplace IT", note: "Miles Education, Oct 2021 to now" },
  { value: "1,200", label: "Employees supported", note: "Across three group companies" },
  { value: "13", label: "Office locations", note: "One IT function, every location" },
];

export type Entity = {
  legalName: string;
  brand: string;
  logos: { src: string; alt: string; plate: "dark" | "light"; height: number }[];
  note: string;
};

export const entities: Entity[] = [
  {
    legalName: "Miles Education Pvt. Ltd.",
    brand: "Miles Education",
    logos: [{ src: "/assets/logos/miles-education.svg", alt: "Miles Education logo", plate: "dark", height: 34 }],
    note: "Primary employer",
  },
  {
    legalName: "MasterCampus Private Limited",
    brand: "MOJO Campus",
    logos: [{ src: "/assets/logos/mojo-campus.webp", alt: "MOJO Campus logo", plate: "dark", height: 60 }],
    note: "Group entity",
  },
  {
    legalName: "MilesSOBA Private Limited",
    brand: "AgencyM and MilesSOBA",
    logos: [
      { src: "/assets/logos/agencym.webp", alt: "AgencyM logo", plate: "light", height: 44 },
      { src: "/assets/logos/milessoba.webp", alt: "MilesSOBA logo", plate: "light", height: 36 },
    ],
    note: "Group entity",
  },
];

export const about = {
  paragraphs: [
    "I keep workplaces running: people, devices, accounts and tools. I joined Miles Education in 2021 in Network Support, moved to IT Support in 2022, and since 2023 I have handled workplace technology support (designation: Associate – Asset Management) for about 1,200 employees across 13 locations: Google Workspace, onboarding and offboarding, 400–600 helpdesk tickets a month, laptop servicing and the IT asset lifecycle.",
    "I also build. With AI-assisted development I built the SNS Cloud IT Asset & Helpdesk Portal, a product companies can try with a free 7-day demo, and I have set up Google Workspace for two businesses. For startups, I can plan and set up IT from day one.",
  ],
  devCapability: {
    title: "AI-Assisted Full-Stack Development",
    text: "I build and deploy end-to-end applications using AI-assisted development workflows, GitHub, Supabase, Render, APIs and modern web technologies.",
  },
  focus: [
    { title: "Google Workspace Admin", text: "Users, groups, security policies and access controls across the organisation." },
    { title: "L1/L2 Technical Support", text: "Helpdesk on Freshservice with an SLA focus, from first response to fix." },
    { title: "IT Asset Lifecycle", text: "Procurement, allocation, inventory, warranty and recovery of hardware and SaaS." },
    { title: "Hands-on servicing", text: "Windows setup, diagnostics and laptop servicing at the desk." },
  ],
};

export const roles = [
  {
    title: "Network Support",
    duration: "Oct 2021 – Sep 2022",
    current: false,
    tags: ["Connectivity", "First-line support"],
    responsibilities: [
      "Network and connectivity troubleshooting for office users",
      "Desktop and laptop setup and basic hardware support",
      "First-line technical support for staff",
    ],
  },
  {
    title: "IT Support",
    duration: "Oct 2022 – Sep 2023",
    current: false,
    tags: ["L1/L2 support", "Windows", "Service desk"],
    responsibilities: [
      "L1/L2 support for hardware, software and system issues",
      "Windows OS installation, configuration and laptop/desktop troubleshooting",
      "Service desk ticket handling and issue resolution",
      "Supported IT asset tracking and inventory",
    ],
  },
  {
    title: "Associate – Asset Management",
    duration: "Oct 2023 – Present",
    current: true,
    tags: ["Workplace technology support", "IT asset lifecycle", "Google Workspace admin", "Onboarding & offboarding"],
    responsibilities: [
      "Workplace technology support for about 1,200 employees across three group companies and 13 locations",
      "400–600 L1/L2 tickets a month on Freshservice, worked against SLA targets",
      "Weekly onboarding (3 days) and offboarding (3 days): accounts, devices, access and recovery",
      "Own the IT asset lifecycle: procurement, allocation, inventory and SaaS licence tracking",
      "Google Workspace administration: users, groups, security policies, email migration",
      "Windows setup, troubleshooting and hands-on laptop servicing",
    ],
  },
];

export const scopeTrack = [
  "IT Support",
  "IT Asset Management",
  "Google Workspace Administration",
  "Workplace Technology Operations",
  "Automation",
  "AI-assisted applications",
];

export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  capabilities: string[];
  stack: string[];
  shots?: { src: string; srcSm: string; alt: string }[];
  /** Setup steps shown as a checklist card when there are no screenshots. */
  checklist?: string[];
  live?: { label: string; href: string };
  demo?: { label: string; href: string };
  github?: string;
  architecture?: { label: string; detail: string }[];
  privacyNote?: string;
  /** Text in the browser bar above the screenshots. */
  shotsLabel?: string;
};

export const projects: Project[] = [
  {
    id: "snscloud",
    number: "01",
    name: "SNS Cloud IT Asset & Helpdesk Portal",
    category: "Product, live with a free demo",
    summary:
      "My own IT asset management, helpdesk and procurement platform for Indian companies. It grew out of my day-to-day IT work and is now a product with its own website, pricing and a 7-day free demo.",
    problem:
      "IT teams track laptops in spreadsheets, take support requests over chat and email, and buy hardware through long approval threads. Nobody can see who holds which device, what is broken or what is on order.",
    solution:
      "One portal for the whole IT asset lifecycle, built with AI-assisted development: an admin portal for IT, a self-service portal for employees, a procurement workflow with approvals, and a device agent on Windows and Mac.",
    capabilities: [
      "Asset inventory for devices, accessories and SIM cards, with owner, location, warranty and full history",
      "Helpdesk where employees raise tickets from their own portal, with SLA timers and attachments",
      "Procurement: request, manager approval, vendor quotes, IT Head and Finance sign-off, GST-ready PO, goods receipt and asset tagging",
      "Windows and Mac device agent that reports device health and supports remote lock",
      "Per-location stock and requests with head-office oversight, plus spend, ageing and warranty reports",
      "Email OTP and single sign-on, with DPDP Act 2023 privacy controls",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "Cloudflare", "AI-assisted development"],
    architecture: [
      { label: "Employees", detail: "Raise tickets, see their own assets, request purchases" },
      { label: "IT admin portal", detail: "Inventory, helpdesk, procurement, reports" },
      { label: "Device agent", detail: "Health and remote lock on Windows and Mac" },
      { label: "Approvers", detail: "Manager, IT Head and Finance sign-off" },
    ],
    shotsLabel: "assetdesk.snscloud.in",
    shots: [
      { src: "/assets/projects/snscloud-dashboard.webp", srcSm: "/assets/projects/snscloud-dashboard-sm.webp", alt: "SNS Cloud portal dashboard with assets by category, assets by location, asset health and pending actions, demo company data" },
      { src: "/assets/projects/snscloud-site.webp", srcSm: "/assets/projects/snscloud-site-sm.webp", alt: "SNS Cloud product website home: Every laptop, ticket and purchase. One IT portal." },
      { src: "/assets/projects/snscloud-demo.webp", srcSm: "/assets/projects/snscloud-demo-sm.webp", alt: "Free 7-day demo sign-up page for the SNS Cloud portal" },
    ],
    live: { label: "Product website", href: "https://assetdesk.snscloud.in/" },
    demo: { label: "Start free demo", href: "https://assetdesk.snscloud.in/trial.html" },
  },
  {
    id: "workspace",
    number: "02",
    name: "Google Workspace Setup for Two Businesses",
    category: "Freelance IT setup",
    summary:
      "End-to-end Google Workspace setup for two businesses, so each team started with business email on its own domain and an admin who controls access.",
    problem:
      "Both businesses were starting out on personal email, with no company domain mail and no central control over accounts.",
    solution:
      "I verified each domain, set up business email, created the user accounts and handed over admin access, so the owners run Workspace themselves.",
    capabilities: [
      "Domain verification",
      "Business email on the company domain",
      "User accounts for the team",
      "Admin access handed over to the owner",
    ],
    stack: ["Google Workspace", "Google Admin Console", "DNS"],
    checklist: ["Domain verified", "Business email live", "User accounts created", "Admin access handed over"],
  },
  {
    id: "portfolio",
    number: "03",
    name: "This portfolio",
    category: "Personal project, live",
    summary: "The site you are on. Built with AI-assisted development and deployed from GitHub to Render, with a 3D guide that explains each part as you go.",
    problem: "A resume page did not show the building side of my work.",
    solution: "A fast, accessible single-page site with an Ask Sheshadri panel that answers from my real profile data, and a talking 3D guide.",
    capabilities: [
      "3D guide that explains each section as you scroll or point",
      "Ask Sheshadri panel that answers from my real profile data",
      "Click any skill or certificate to have it explained",
      "Services with a contact form that pre-selects the right option",
      "Responsive images in AVIF and WebP, reduced-motion support",
    ],
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Higgsfield (AI voice & animation)", "GitHub", "Render"],
    shotsLabel: "snscloud.in",
    shots: [
      { src: "/assets/projects/portfolio-hero.webp", srcSm: "/assets/projects/portfolio-hero-sm.webp", alt: "Portfolio home: Sheshadri's 3D character at an isometric IT desk with the headline I keep the office tech running" },
      { src: "/assets/projects/portfolio-guide.webp", srcSm: "/assets/projects/portfolio-guide-sm.webp", alt: "The 3D guide explaining the Services section, with captions" },
      { src: "/assets/projects/portfolio-skills.webp", srcSm: "/assets/projects/portfolio-skills-sm.webp", alt: "Skills section with click-to-explain skill cards" },
      { src: "/assets/projects/portfolio-certs.webp", srcSm: "/assets/projects/portfolio-certs-sm.webp", alt: "Certifications section with certificate cards" },
    ],
    live: { label: "Live site", href: "https://snscloud.in/" },
    github: "https://github.com/sheshadri022/portfolio",
  },
];

export const journey = [
  { title: "Problem observed in IT operations", text: "Day-to-day IT work showed where asset tracking and support requests needed a proper system." },
  { title: "Workflow understood", text: "I mapped how a device moves: purchase, allocation, support, warranty, recovery." },
  { title: "Solution designed", text: "Two portals: one for the IT team, one for employees to help themselves." },
  { title: "Built with AI-assisted development", text: "React and TypeScript frontend, Express API and PostgreSQL, built with AI coding tools." },
  { title: "Shipped and hosted", text: "Code on GitHub, first deployed on Render and Supabase, now self-hosted behind Cloudflare." },
  { title: "Now a product", text: "Proven in day-to-day IT work, now the SNS Cloud IT Asset & Helpdesk Portal with a free demo." },
];

export const skillGroups = [
  {
    title: "Workplace Technology",
    text: "Keeping people, devices and access working.",
    items: [
      "IT Operations", "IT Asset Management", "Endpoint Management", "Hardware Troubleshooting", "Laptop Servicing",
      "Windows OS Configuration", "Procurement", "Vendor Coordination", "Warranty Tracking", "Asset Recovery",
      "Employee Onboarding", "Employee Offboarding", "L1/L2 Support", "Freshservice", "SLA Management",
      "Printer & Peripheral Support", "Remote Desktop Support", "Basic Networking",
    ],
  },
  {
    title: "Google Workspace",
    text: "Administration from domain setup to day-to-day access.",
    items: [
      "Google Admin Console", "Gmail Administration", "Google Groups", "Shared Drives", "User Lifecycle Management",
      "Security Policies", "Access Control & Permissions", "Email Migration", "Domain Setup", "DNS",
      "SPF / DKIM / DMARC", "Google Meet Setup",
    ],
  },
  {
    title: "Development & Automation",
    text: "What I have used to build and ship real apps.",
    items: [
      "AI-Assisted Full-Stack Development", "React", "TypeScript", "Tailwind CSS", "Node.js", "Express",
      "REST APIs", "PostgreSQL", "Drizzle ORM", "Supabase", "Authentication", "GitHub", "Render", "Vite",
      "Framer Motion", "WordPress",
    ],
  },
  {
    title: "AI Tools",
    text: "How the building actually happens.",
    items: ["Replit AI", "AI-assisted coding", "AI-assisted debugging", "Prompting for app builds"],
  },
];

export const certifications = [
  {
    title: "Google Workspace (G Suite) Admin – The Complete Course",
    platform: "Udemy",
    date: "June 25, 2024",
    hours: "32 total hours",
    verifyUrl: "https://ude.my/UC-8a9dbdc1-16f2-49bb-9eed-65a562811cc7",
    image: "/assets/certs/gworkspace.webp",
    description: "Google Workspace administration, user provisioning, security policies and collaboration tools.",
  },
  {
    title: "IT Asset Management (ITAM) Course with Certificate",
    platform: "Udemy",
    date: "Nov. 20, 2025",
    hours: "1 total hour",
    verifyUrl: "https://ude.my/UC-ed9acd1b-420a-41f6-9e2f-f473ad4d87a6",
    image: "/assets/certs/itam.webp",
    description: "IT asset lifecycle management, inventory tracking, procurement coordination and ITAM practice.",
  },
  {
    title: "Technical Support Fundamentals",
    platform: "Google / Coursera",
    date: "Jul 31, 2025",
    hours: null,
    verifyUrl: "https://coursera.org/verify/ZO4RMTOSHTPE",
    image: "/assets/certs/google-tsf.webp",
    description: "Hardware, software, networking, operating systems and IT customer service.",
  },
  {
    title: "Replit Certification – Beginner Builder (Level 1)",
    platform: "Replit",
    date: "2026",
    hours: null,
    verifyUrl: "",
    image: "/assets/certs/replit.webp",
    description: "Building and shipping apps with AI-assisted development.",
  },
];

export const education = [
  { degree: "Bachelor of Commerce (B.Com)", school: "MGR Arts & Science College, Hosur", board: "Periyar University", year: "2018 – 2021" },
  { degree: "Higher Secondary (+2) – Commerce", school: "R.V. Government Higher Secondary School, Hosur", board: "State Board", year: "2018" },
  { degree: "SSLC / 10th", school: "R.V. Government Higher Secondary School, Hosur", board: "State Board", year: "2016" },
];

export const languages = [
  { name: "Tamil", level: "Native" },
  { name: "Kannada", level: "Fluent" },
  { name: "Telugu", level: "Fluent" },
  { name: "English", level: "Professional" },
];
