// Narration scripts for the talking 3D guide and skill explainers.
// The hero's own spoken intro lives in HeroSection (it plays over the scene).
// Every line is drawn from verified profile facts. Audio and video are
// AI-generated (neutral AI voice, a 3D character based on Sheshadri's photo)
// and the player labels them as AI.

export type Clip = { id: string; section: string; label: string; script: string };

export const avatarClips: Clip[] = [
  {
    id: "about",
    section: "about",
    label: "About me",
    script:
      "Hi, I'm Sheshadri. I keep workplaces running: people, devices, accounts and tools. Five years at Miles Education, from network support to owning IT assets and Google Workspace.",
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
    id: "contact",
    section: "contact",
    label: "Contact",
    script: "Thanks for stopping by. Email or LinkedIn both reach me. Let's build solutions together.",
  },
];

export type ExplainerStep = { title: string; detail: string };

export const skillExplainers: { group: string; script: string; steps: ExplainerStep[] }[] = [
  {
    group: "Workplace Technology",
    script:
      "A new laptop arrives. I log it in the asset register, set up Windows, and assign it to the employee with its warranty tracked. If it fails, a ticket is raised and I repair or replace it. When someone leaves, I recover it.",
    steps: [
      { title: "Asset logged", detail: "Added to the register with serial, warranty and location" },
      { title: "Device set up", detail: "Windows installed and configured" },
      { title: "Assigned", detail: "Handed to the employee and recorded" },
      { title: "Supported", detail: "Ticket raised, repaired or replaced" },
      { title: "Recovered", detail: "Collected back at offboarding" },
    ],
  },
  {
    group: "Google Workspace",
    script:
      "When someone joins, I create their Google account, add them to the right groups and shared drives, and apply security policies. When they leave, I transfer their data and close their access.",
    steps: [
      { title: "Account created", detail: "User added in Google Admin Console" },
      { title: "Groups and drives", detail: "Right groups and shared drives assigned" },
      { title: "Policies applied", detail: "Security policies and access controls" },
      { title: "Offboarded", detail: "Data transferred, access closed" },
    ],
  },
  {
    group: "Development & Automation",
    script:
      "I start from a real IT problem and design the workflow. Then I build it with a React frontend, an Express API and a PostgreSQL database. GitHub stores the code and Render deploys it.",
    steps: [
      { title: "IT problem", detail: "Seen in day-to-day operations" },
      { title: "Workflow", detail: "Mapped step by step" },
      { title: "Build", detail: "React frontend, Express API, PostgreSQL" },
      { title: "Ship", detail: "Code on GitHub, deployed on Render" },
    ],
  },
  {
    group: "AI Tools",
    script:
      "I describe the problem to AI tools like Replit, review the code they write, test it, and fix what breaks. The AI speeds me up. I make the decisions.",
    steps: [
      { title: "Describe", detail: "Explain the problem to the AI tool" },
      { title: "Review", detail: "Read the code it writes" },
      { title: "Test", detail: "Run it against real cases" },
      { title: "Fix", detail: "Debug what breaks, then ship" },
    ],
  },
];
