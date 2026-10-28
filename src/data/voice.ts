// Narration scripts for the talking 3D guide. Skill explainers live in skills.ts.
// Every line is drawn from verified profile facts. Audio and video are
// AI-generated (neutral AI voice, a 3D character based on Sheshadri's photo)
// and the player labels them as AI.

export type Clip = { id: string; section: string; label: string; script: string };

export const avatarClips: Clip[] = [
  {
    id: "intro",
    section: "home",
    label: "Hello!",
    script:
      "Hello! I'm Sheshadri, a Workplace Technology Specialist at Miles Education. I keep people, devices and accounts running, and I build internal tools with AI. Scroll down and I'll walk you through my work.",
  },
  {
    id: "about",
    section: "about",
    label: "About me",
    script:
      "Hi, I'm Sheshadri. I keep workplaces running: people, devices, accounts and tools. At Miles Education since 2021, from network support to owning IT assets and Google Workspace.",
  },
  {
    id: "experience",
    section: "experience",
    label: "Experience",
    script:
      "I support one IT function across three companies: Miles Education, MOJO Campus and MilesSOBA. That covers onboarding, Google Workspace, laptops and helpdesk support.",
  },
  {
    id: "projects",
    section: "projects",
    label: "Projects",
    script:
      "These are apps I built with AI-assisted development: the IT Asset and Helpdesk Portal for Miles Education, and the GK Fashions online store.",
  },
  {
    id: "skills",
    section: "skills",
    label: "Skills",
    script:
      "My skills come in four groups: workplace technology, Google Workspace, development and automation, and the AI tools I build with. Play any card to see how it works.",
  },
  {
    id: "services",
    section: "services",
    label: "Services",
    script:
      "Here's what I offer: laptop repairs and upgrades, business websites, Google Workspace setup for growing teams, and my IT asset and helpdesk platform. Pick a service and the contact form is ready for you.",
  },
  {
    id: "product",
    section: "product",
    label: "The platform",
    script:
      "This is my IT asset and helpdesk platform: devices, who has them, and support tickets. Ticks show what works in the demo today. Clocks show what's next.",
  },
  {
    id: "journey",
    section: "journey",
    label: "How I build",
    script:
      "I didn't start as a developer. I saw real problems in IT operations, mapped the workflow, and built the tools with AI-assisted development. The building comes out of the support work.",
  },
  {
    id: "education",
    section: "education",
    label: "Education",
    script:
      "I studied commerce, with a B.Com from Periyar University, after my higher secondary in Hosur. I speak Tamil, Kannada, Telugu and English.",
  },
  {
    id: "certifications",
    section: "certifications",
    label: "Certifications",
    script:
      "My certifications: Google Workspace admin and IT asset management from Udemy, Technical Support Fundamentals by Google, and Replit's Beginner Builder. Click any certificate to see it.",
  },
  {
    id: "contact",
    section: "contact",
    label: "Contact",
    script: "Thanks for stopping by. Email or LinkedIn both reach me. Let's build solutions together.",
  },
];

export type ExplainerStep = { title: string; detail: string };
