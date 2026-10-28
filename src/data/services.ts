import type { LucideIcon } from "lucide-react";
import { Boxes, Cloud, Globe, Laptop } from "lucide-react";

// Services and the IT Asset & Helpdesk product. Facts only: the product's
// "available" items are checked against the public demo's code
// (github.com/sheshadri022/techops-demo-portal); everything else is roadmap.

// Contact form options. Service CTAs preselect one of these.
export const needs = [
  "Job opportunity",
  "Laptop repair or upgrade",
  "Business website",
  "IT Asset & Helpdesk demo",
  "IT Asset & Helpdesk deployment",
  "Google Workspace & IT setup",
  "Something else",
] as const;
export type Need = (typeof needs)[number];

// Lets any button jump to Contact with the right option picked.
export function prefillContact(need: Need) {
  window.dispatchEvent(new CustomEvent<Need>("prefill-contact", { detail: need }));
}

export type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  capabilities: string[];
  tech?: string[];
  note?: string;
  cta: { label: string; need?: Need; href: string };
  tone: "magenta" | "ice" | "orchid" | "sun";
};

// Working name, not final. Change it here only, once the name is confirmed.
export const PRODUCT_NAME = "IT Asset & Helpdesk SaaS";

export const services: Service[] = [
  {
    id: "laptop",
    icon: Laptop,
    title: "Laptop Repair & Upgrade Services",
    description: "Hands-on laptop diagnostics, hardware replacement and upgrades to extend device life and restore performance.",
    capabilities: [
      "RAM upgrades",
      "SSD upgrades",
      "SSD replacement",
      "Battery replacement",
      "Keyboard replacement",
      "Trackpad replacement",
      "Display replacement",
      "Damaged internal parts servicing",
      "Laptop diagnostics",
      "Windows troubleshooting",
      "Windows installation",
      "Driver installation",
      "Performance upgrades",
      "Preventive maintenance",
      "General hardware servicing",
    ],
    note: "Hardware repairs are subject to inspection, parts availability and device condition.",
    cta: { label: "Book a repair", need: "Laptop repair or upgrade", href: "#contact" },
    tone: "magenta",
  },
  {
    id: "web",
    icon: Globe,
    title: "Business Website Development",
    description: "I design and deploy practical websites for businesses using modern web technologies and AI-assisted development workflows.",
    capabilities: [
      "Business websites",
      "Portfolio websites",
      "E-commerce websites",
      "Landing pages",
      "Website redesign",
      "Responsive development",
      "Domain setup",
      "SSL configuration",
      "Hosting setup",
      "Deployment",
      "Website maintenance",
      "Performance optimisation",
    ],
    // Only tools used in his own projects (GK Fashions, this site, the asset portal).
    tech: ["GitHub", "Render", "Supabase", "WordPress", "Hostinger"],
    cta: { label: "Start a website", need: "Business website", href: "#contact" },
    tone: "ice",
  },
  {
    id: "saas",
    icon: Boxes,
    title: PRODUCT_NAME,
    description: "A lightweight IT Asset Management and Helpdesk platform for startups and growing organisations.",
    capabilities: ["Asset inventory", "Allocation", "Asset lifecycle", "Helpdesk", "Employees", "Onboarding", "Offboarding", "Reports"],
    cta: { label: "See the product", href: "#product" },
    tone: "orchid",
  },
  {
    id: "workspace",
    icon: Cloud,
    title: "Google Workspace & IT Setup",
    description: "Setup and administration support for startups and growing businesses.",
    capabilities: [
      "Google Workspace setup",
      "Domain configuration",
      "User creation",
      "Google Groups",
      "Email aliases",
      "Gmail administration",
      "Email migration",
    ],
    cta: { label: "Set up my workspace", need: "Google Workspace & IT setup", href: "#contact" },
    tone: "sun",
  },
];

export type ModuleItem = { label: string; live: boolean };
export type ProductModule = { title: string; items: ModuleItem[] };

const on = (label: string): ModuleItem => ({ label, live: true });
const later = (label: string): ModuleItem => ({ label, live: false });

export const product = {
  name: PRODUCT_NAME,
  positioning: "A lightweight IT Asset Management and Helpdesk platform for startups and growing organisations.",
  origin: "Built from my day-to-day IT work. A version runs internally at Miles Education; the public demo uses sample data only.",
  demo: "https://techops-portal.onrender.com/",
  demoCode: "https://github.com/sheshadri022/techops-demo-portal",
  shot: {
    src: "/assets/projects/techops-dashboard.webp",
    alt: "Dashboard of the public demo showing asset breakdown and ticket trends with sample data",
  },
  modules: [
    {
      title: "Asset Inventory",
      items: [on("Asset records"), on("Device category"), on("Status: available, assigned, maintenance, retired"), on("Condition"), on("Location"), on("Warranty"), on("Purchase date and price")],
    },
    {
      title: "Allocation",
      items: [on("Assign equipment to employees"), on("Track who holds which device"), on("Current devices per employee"), later("Full allocation history per user")],
    },
    {
      title: "Asset Lifecycle",
      items: [on("Procurement details recorded"), on("Inventory"), on("Allocation"), on("Support: tickets linked to an asset"), on("Recovery back to stock"), on("Retirement")],
    },
    {
      title: "Helpdesk",
      items: [on("Ticket creation, by IT or by employees"), on("Priority"), on("Status"), on("Tracking: assignee, linked asset, closure")],
    },
    {
      title: "Employees",
      items: [on("Employee directory"), on("Assigned devices"), on("Employees see their own assets")],
    },
    {
      title: "Onboarding",
      items: [on("Asset assignment"), later("New employee IT preparation"), later("Access checklist")],
    },
    {
      title: "Offboarding",
      items: [on("Asset recovery"), later("Access closure"), later("Device return tracking")],
    },
    {
      title: "Reports",
      items: [on("Asset dashboard"), on("Available vs assigned by category"), on("Ticket trends"), later("Location reports")],
    },
  ] as ProductModule[],
  // Planned SaaS capabilities. None of these exist yet.
  roadmap: [
    { title: "Multi-company support", detail: "One platform, separate data per organisation (multi-tenant)" },
    { title: "Subscription plans", detail: "Plans for different team sizes" },
    { title: "Role-based access", detail: "Finer roles beyond today's admin and employee sign-in" },
    { title: "Customer onboarding", detail: "Self-serve setup for a new organisation" },
  ],
};
