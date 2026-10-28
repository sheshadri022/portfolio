// Narration scripts for the talking 3D guide. Skill explainers live in skills.ts.
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
