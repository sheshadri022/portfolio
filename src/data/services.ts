import type { LucideIcon } from "lucide-react";
import { Boxes, Cloud, Globe, Laptop } from "lucide-react";

// Services and the SNS Cloud IT Asset & Helpdesk Portal. Facts only: the
// product's "available" items match assetdesk.snscloud.in; everything else is roadmap.

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

export const PRODUCT_NAME = "SNS Cloud IT Asset & Helpdesk Portal";

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
    // Only tools used in his own projects (this site, the asset portal, client builds).
    tech: ["GitHub", "Render", "Supabase", "WordPress", "Hostinger"],
    cta: { label: "Start a website", need: "Business website", href: "#contact" },
    tone: "ice",
  },
  {
    id: "saas",
    icon: Boxes,
    title: PRODUCT_NAME,
    description: "My IT asset, helpdesk and procurement platform for Indian companies, set up to each company's workflows. Try it free for 7 days.",
    capabilities: ["Asset inventory", "Helpdesk & SLAs", "Procurement & POs", "Device agent", "Multiple locations", "Reports", "SSO & email OTP", "DPDP privacy controls"],
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
  positioning: "Every laptop, ticket and purchase in one IT portal: asset inventory, helpdesk and procurement for Indian companies.",
  origin: "Built from my day-to-day IT work with AI-assisted development, now a product run by SNS Cloud. The free demo is a full demo company with sample data.",
  site: "https://assetdesk.snscloud.in/",
  demo: "https://assetdesk.snscloud.in/trial.html",
  pricing: "https://assetdesk.snscloud.in/pricing.html",
  shot: {
    src: "/assets/projects/snscloud-dashboard-full.webp",
    alt: "SNS Cloud portal dashboard: assets by category, assets by location, asset health and pending actions, with demo company data",
  },
  modules: [
    {
      title: "Asset Inventory",
      items: [on("Devices, accessories and SIM cards"), on("Owner, location and condition"), on("Warranty tracking"), on("Full history per asset"), on("Bulk import")],
    },
    {
      title: "Helpdesk",
      items: [on("Employee self-service portal"), on("SLA timers"), on("Attachments"), on("Tickets linked to assets")],
    },
    {
      title: "Procurement",
      items: [on("Purchase requests"), on("Manager, IT Head and Finance approvals"), on("Vendor quote comparison"), on("GST-ready purchase orders"), on("Goods receipt and asset tagging")],
    },
    {
      title: "Device Agent",
      items: [on("Windows and Mac agent"), on("Device health"), on("Remote lock"), later("Remote control sessions"), later("Mobile device management")],
    },
    {
      title: "Locations",
      items: [on("Per-office stock"), on("Per-office requests"), on("Head-office oversight")],
    },
    {
      title: "Reports",
      items: [on("Spend and utilisation"), on("Ageing and warranty expiry"), on("Weekly summary emails")],
    },
    {
      title: "Sign-in & Security",
      items: [on("Email OTP sign-in"), on("Single sign-on"), on("DPDP Act 2023 privacy controls")],
    },
    {
      title: "Your Company",
      items: [on("Set up to your workflows"), on("Priced by company size, in rupees"), on("Hosted in India")],
    },
  ] as ProductModule[],
  plans: [
    { title: "7-day free demo", detail: "Full demo company, no credit card" },
    { title: "Starter to Business", detail: "Flat monthly price by company size" },
    { title: "Every plan", detail: "Helpdesk, inventory and device agent included" },
    { title: "Enterprise", detail: "500+ employees or a custom build" },
  ],
};
