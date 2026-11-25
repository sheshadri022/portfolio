import { person, entities } from "@/data/profile";
import { product } from "@/data/services";

// Ask Sheshadri answers come from a provider. Today the local provider
// answers from profile data. To connect a real AI model later, deploy a
// small server endpoint (Render web service or Supabase Edge Function)
// that holds the API key, and set VITE_ASK_ENDPOINT to its URL at build
// time. The browser only ever talks to that endpoint, never to the model
// provider, so no key ships in this bundle.

export type Answer = { text: string; links?: { label: string; href: string }[] };

export type Question = { id: string; label: string; keywords: string[]; answer: Answer };


export const questions: Question[] = [
  {
    id: "specialize",
    label: "What do you specialize in?",
    keywords: ["specialize", "specialise", "do you do", "role", "about", "who"],
    answer: {
      text: "Workplace technology support at Miles Education for about 1,200 employees across 13 locations: Google Workspace administration, L1/L2 support (400–600 tickets a month), onboarding and offboarding, laptop servicing and the IT asset lifecycle. On top of that I build products with AI-assisted full-stack development, like the SNS Cloud IT Asset & Helpdesk Portal.",
    },
  },
  {
    id: "services",
    label: "What services do you offer?",
    keywords: ["service", "offer", "hire", "repair", "upgrade", "ssd", "ram", "battery", "website", "freelance"],
    answer: {
      text: "Four things: laptop repair and upgrades (RAM, SSD, battery, keyboard, display, Windows), business websites from landing pages to e-commerce, Google Workspace and IT setup for growing teams, and my SNS Cloud IT Asset & Helpdesk Portal. Hardware repairs depend on inspection, parts availability and device condition.",
      links: [
        { label: "See services", href: "#services" },
        { label: "Contact me", href: "#contact" },
      ],
    },
  },
  {
    id: "product",
    label: "Can my company use your asset platform?",
    keywords: ["saas", "product", "demo", "platform", "deploy", "subscription", "startup"],
    answer: {
      text: `Yes. ${product.positioning} It covers asset inventory, a helpdesk with SLAs, procurement with approvals and GST-ready POs, a Windows and Mac device agent, multiple locations and reports. It is priced by company size and set up to your workflows. Start with the free 7-day demo.`,
      links: [
        { label: "Start free demo", href: product.demo },
        { label: "Product website", href: product.site },
        { label: "See the project", href: "#project-snscloud" },
      ],
    },
  },
  {
    id: "it-projects",
    label: "What IT projects have you built?",
    keywords: ["project", "built", "build", "portal", "helpdesk", "tool"],
    answer: {
      text: "The SNS Cloud IT Asset & Helpdesk Portal (inventory, helpdesk, procurement and a device agent, with a free demo), Google Workspace setups for two businesses, and this portfolio.",
      links: [
        { label: "Start free demo", href: product.demo },
        { label: "See projects", href: "#projects" },
      ],
    },
  },
  {
    id: "workspace",
    label: "What is your Google Workspace experience?",
    keywords: ["google", "workspace", "gmail", "g suite", "admin console", "dns", "dmarc", "email"],
    answer: {
      text: "Day-to-day admin of users, groups and security policies, onboarding and offboarding, email migration, shared drives, domain and DNS setup including SPF, DKIM and DMARC. I also completed a 32-hour Google Workspace admin course on Udemy.",
    },
  },
  {
    id: "full-stack",
    label: "What full-stack applications have you built?",
    keywords: ["full-stack", "full stack", "application", "app", "react", "api", "database"],
    answer: {
      text: "The SNS Cloud IT Asset & Helpdesk Portal: a React and TypeScript frontend, an Express REST API and PostgreSQL, with an admin portal, an employee self-service portal and a device agent. An early sample-data version is public on GitHub (React 19, Express, PostgreSQL, Drizzle ORM). This portfolio is another one.",
      links: [
        { label: "Product website", href: product.site },
        { label: "Sample code on GitHub", href: "https://github.com/sheshadri022/techops-demo-portal" },
      ],
    },
  },
  {
    id: "tech",
    label: "What technologies do you use?",
    keywords: ["technolog", "stack", "tools", "language", "framework"],
    answer: {
      text: "For IT: Google Admin Console, Freshservice, Windows. For building: React, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL, Drizzle ORM, Supabase, Cloudflare, GitHub, Render and WordPress, with AI coding tools such as Replit AI for development.",
    },
  },
  {
    id: "companies",
    label: "Which companies do you support?",
    keywords: ["compan", "entit", "employer", "work for", "mojo", "soba", "agency", "miles"],
    answer: {
      text: `I work at ${entities[0].legalName} and support its group entities ${entities[1].legalName} (MOJO Campus) and ${entities[2].legalName}, including AgencyM.`,
    },
  },
  {
    id: "itam",
    label: "What is your IT Asset Management experience?",
    keywords: ["asset", "itam", "inventory", "procure", "warranty", "laptop", "device"],
    answer: {
      text: "Since 2023 I own the IT asset lifecycle at Miles Education, across 13 locations: procurement, allocation, inventory, SaaS licence tracking, warranty tracking and asset recovery, with vendor coordination along the way. I hold an ITAM certificate from Udemy.",
    },
  },
  {
    id: "contact",
    label: "How can I contact you?",
    keywords: ["contact", "reach", "email", "phone", "call", "hire", "linkedin"],
    answer: {
      text: `WhatsApp or call ${person.phone}, or email ${person.email}. I am also on LinkedIn.`,
      links: [
        { label: "WhatsApp", href: person.whatsapp },
        { label: "Email", href: `mailto:${person.email}` },
        { label: "LinkedIn", href: person.linkedin },
      ],
    },
  },
];

const fallback: Answer = {
  text: `I don't have a ready answer for that here. Email me at ${person.email} and I will reply.`,
  links: [{ label: "Email", href: `mailto:${person.email}` }],
};

function localAnswer(input: string): Answer {
  const q = input.toLowerCase();
  let best: Question | null = null;
  let score = 0;
  for (const item of questions) {
    const s = item.keywords.reduce((n, k) => (q.includes(k) ? n + k.length : n), 0);
    if (s > score) {
      score = s;
      best = item;
    }
  }
  return best ? best.answer : fallback;
}

const endpoint = import.meta.env.VITE_ASK_ENDPOINT as string | undefined;

export async function ask(input: string): Promise<Answer> {
  const preset = questions.find((q) => q.label === input);
  if (preset) return preset.answer;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input.slice(0, 500) }),
      });
      if (res.ok) {
        const data = (await res.json()) as Partial<Answer>;
        if (typeof data.text === "string" && data.text.trim()) return { text: data.text, links: data.links };
      }
    } catch {
      // fall through to the local answer
    }
  }
  return localAnswer(input);
}
