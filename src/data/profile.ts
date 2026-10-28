// Single source of truth for every fact shown on the site and used by
// "Ask Sheshadri". Keep this file factual: if something is not verified,
// it does not go here.

export const person = {
  name: "SHESHADRI N",
  title: "Workplace Technology Specialist",
  // The hero cycles through these every 3 seconds, starting with the title.
  titles: ["Workplace Technology Specialist", "IT Asset Management Specialist", "Google Workspace Admin"],
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
    "Workplace Technology professional with 5+ years of experience across IT operations, Google Workspace administration, endpoint support, IT asset management and hardware servicing. I also design and deploy websites, internal tools and SaaS applications using AI-assisted full-stack development workflows.",
  location: "Bengaluru, Karnataka",
  email: "sheshadri022@gmail.com",
  phone: "+91 8190062144",
  phoneHref: "tel:+918190062144",
  linkedin: "https://www.linkedin.com/in/sheshadri-n",
  github: "https://github.com/sheshadri022",
  resume: "/resume.pdf",
  site: "https://snscloud.in/",
};

export const stats = [
  { value: "5+", label: "Years in workplace IT", note: "Miles Education, Oct 2021 to now" },
  { value: "3", label: "Entities supported", note: "One IT function, three companies" },
  { value: "AI", label: "Internal tools, built and shipped", note: "Asset & helpdesk portal for Miles Education" },
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
    "I keep workplaces running: people, devices, accounts and tools. I joined Miles Education in 2021 in Network Support, moved to IT Support in 2022, and have been Associate – Asset Management since 2023, looking after Google Workspace, onboarding/offboarding, L1/L2 helpdesk, laptop servicing and the IT asset lifecycle.",
    "I also build. Using AI tools, I created our internal IT Asset & Helpdesk Portal, set up Google Workspace for two businesses, and built a complete e-commerce website for a client. For startups, I can plan and set up IT from day one.",
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
    tags: ["IT asset lifecycle", "Google Workspace admin", "Onboarding & offboarding", "AI-assisted internal tools"],
    responsibilities: [
      "Own the IT asset lifecycle: procurement, allocation, inventory and SaaS licence tracking",
      "Google Workspace administration: users, groups, security policies, email migration",
      "Employee onboarding/offboarding and access management",
      "L1/L2 support on Freshservice with an SLA focus",
      "Windows setup, troubleshooting and hands-on laptop servicing",
      "Built an internal IT Asset & Helpdesk Portal using AI-assisted development",
    ],
  },
];

export const scopeTrack = [
  "IT Support",
  "IT Asset Management",
  "Google Workspace Administration",
  "Workplace Technology Operations",
  "Automation",
  "AI-assisted internal applications",
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
  storeNav?: string[];
  live?: { label: string; href: string };
  internalLabel?: string;
  github?: string;
  architecture?: { label: string; detail: string }[];
  privacyNote?: string;
  /** Screens and details withheld under company policy. */
  confidential?: boolean;
  /** Text in the browser bar above the screenshots. */
  shotsLabel?: string;
};

export const projects: Project[] = [
  {
    id: "itam",
    number: "01",
    name: "Internal IT Asset & Helpdesk Portal",
    category: "Internal tool, details confidential",
    summary:
      "An internal IT operations tool I built for my workplace, bringing IT assets, employee allocations and helpdesk requests into one place. Company policy keeps its screens, data and setup private, so this is only the outline.",
    problem:
      "Asset records, who holds which device, and employee support requests were handled by one IT function across several entities. The team needed one place to see and act on all of it.",
    solution:
      "I designed the workflow from my own day-to-day IT work and built a two-portal web app with AI-assisted development: an admin portal for the IT team and a self-service portal for employees.",
    capabilities: [
      "Used by the IT team in daily operations",
      "Assets, who holds them, and support requests in one place",
      "Admin portal for IT, self-service portal for employees",
      "Designed from my own IT workflow, built with AI-assisted development",
    ],
    stack: [],
    confidential: true,
    internalLabel: "Internal application",
    privacyNote:
      "The production portal is internal to my employer. Its screens, data, code and hosting are not shared here. The public demo in the Product section is a separate build that uses sample data only.",
  },
  {
    id: "gk",
    number: "02",
    name: "GK Fashions – E-Commerce Portal",
    category: "Public e-commerce website",
    summary:
      "Customer-facing e-commerce platform for GK Fashions, giving shoppers an online store for clothing and fashion products.",
    problem:
      "GK Fashions needed an online store where customers could browse the range and pay online.",
    solution:
      "I built and set up the storefront on WordPress, organised the catalogue by shopper and connected online payments.",
    capabilities: [
      "Catalogue organised as All, Men, Women, Kids and NCC Uniforms",
      "Online payments through Cashfree",
      "Order and support contact by phone, WhatsApp and email",
    ],
    stack: ["WordPress", "Cashfree", "Hostinger"],
    storeNav: ["All", "Men", "Women", "Kids", "NCC Uniforms"],
    live: { label: "Live website", href: "https://gkfashionsindia.com/" },
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
  { title: "Built with AI-assisted development", text: "React and TypeScript frontend, Express API and PostgreSQL, built with Replit's AI tooling." },
  { title: "Deployed with GitHub, Supabase and Render", text: "Code on GitHub, PostgreSQL on Render or Supabase, frontend and API on Render." },
  { title: "Used for real operational work", text: "The internal version supports the IT function at Miles Education." },
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
  { degree: "Bachelor of Commerce (B.Com)", school: "MGR College, Hosur", board: "Periyar University", year: "2021" },
  { degree: "Higher Secondary (+2) – Commerce", school: "R.V. Government Higher Secondary School, Hosur", board: "State Board", year: "2018" },
  { degree: "SSLC / 10th", school: "R.V. Government Higher Secondary School, Hosur", board: "State Board", year: "2016" },
];

export const languages = [
  { name: "Tamil", level: "Native" },
  { name: "Kannada", level: "Fluent" },
  { name: "Telugu", level: "Fluent" },
  { name: "English", level: "Professional" },
];
