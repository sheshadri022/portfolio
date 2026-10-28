# Sheshadri N – Portfolio

Personal portfolio of **Sheshadri N**, Workplace Technology Specialist at Miles Education Pvt Ltd.

Live: [snscloud.in](https://snscloud.in) · LinkedIn: [sheshadri-n](https://www.linkedin.com/in/sheshadri-n) · GitHub: [sheshadri022](https://github.com/sheshadri022)

## Stack

React 19, TypeScript, Vite 7, Tailwind CSS 4, Framer Motion, Lucide icons. Fonts are self-hosted through Fontsource (Syne, Inter, Caveat). Static site on Render, built from GitHub.

## Structure

```
src/
  data/profile.ts          every fact on the site (single source of truth)
  lib/ask.ts               Ask Sheshadri answer providers (local now, API-ready)
  context/VirtualHuman.tsx virtual human state: idle, greeting, explaining, projects, skills, contact
  hooks/useActiveSection.ts section tracking for the navbar and virtual human
  components/
    HeroSection, VirtualHuman, AskSheshadri, VirtualHumanDock
    AboutSection, EntityStrip, ExperienceTimeline
    FeaturedProjects, ProjectCaseStudy, DeveloperJourney, SkillsGrid
    Certifications, Education, ContactSection, Footer
    ResponsiveNavbar, AnimatedBackground, ResponsiveImage, SectionHeading
public/assets/
  profile/   photo variants (full, hero, about, avatar, mobile) in AVIF + WebP
  logos/     Miles Education, MOJO Campus, AgencyM, MilesSOBA
  projects/  TechOps public demo screenshots (sample data only)
  certs/     certificate images
```

To change content, edit `src/data/profile.ts`. Only verified facts go there.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
npm run preview  # serves dist/
```

## Ask Sheshadri and AI

Out of the box, answers come from `src/data/profile.ts` with no network calls. To connect a real model later:

1. Deploy a small server endpoint (Render web service or Supabase Edge Function) that accepts `POST { question }` and returns `{ text, links? }`. Keep the model API key there.
2. Set `VITE_ASK_ENDPOINT` to that URL in Render's environment settings and redeploy.

The browser only ever calls that endpoint. No API key is shipped in the frontend. If the endpoint fails, the local answers are used.

## Look: Template 02, Night Studio 3D

Deep navy theme with magenta as the main accent and cyan for status and data; display font Syne (800), body font Inter. Colours live as tokens in `src/index.css`.

## Services and product

- Services I Provide (`src/data/services.ts`): Laptop Repair & Upgrade Services, Business Website Development, IT Asset & Helpdesk SaaS and Google Workspace & IT Setup. Each card's button jumps to Contact with "What do you need?" already picked.
- Product block (`#product`): the IT Asset & Helpdesk platform. "IT Asset & Helpdesk SaaS" is a working name, set once in `PRODUCT_NAME`. Module items are marked available only where the public demo's code has them (techops-demo-portal); everything else, and the SaaS roadmap (multi-company, plans, roles, customer onboarding), is shown as planned.
- Laptop repairs carry the note "Hardware repairs are subject to inspection, parts availability and device condition." No manufacturer authorisation is claimed.

## Hero, ID card, skills and certifications

- Hero: a 3D Sheshadri waves from beside his desk in a navy studio (`public/assets/night/`), with "Hello! I'm Sheshadri", the rotating titles and the CTAs on the left. A speech bubble by his head ("Hi! Want the 30-second tour?") or "Click to interact" crossfades to a lip-synced clip of the same shot (`night/intro.webm|mp4`) with his spoken intro and live captions. The bubble sits on a stage sized like the picture, so it stays next to his head at every screen size.
- About: a flipping ID card on a lanyard (front: photo, name, title; back: what he does and how to reach him).
- Skills & Expertise: seven skill cards (`src/data/skills.ts`). Clicking a card opens a panel that explains the skill: a short summary, a step-by-step "How it works" narrated by an AI voice, and everything the skill covers.
- Certifications: a card grid with the certificate image (click to view it full size), platform, Verify link, what it covers, date and hours.

## Talking avatar and skill explainers

- Point at a menu item (or a section heading once voice is on) and Sheshadri's avatar explains that section. "Click to interact" in the hero, or the speaker button in the navbar, turns the voice on. Browsers block sound until the visitor clicks once, so before that clips play muted with captions.
- Poses: `public/assets/avatars/` holds his avatar set (id-front, seated, developer, interactive). Real-photo poses are used in About (ID card), Experience, Developer journey and Skills; the floating 3D guide changes its ring colour by section.
- Clips: `public/assets/avatar/*.webm|mp4` (about, experience, projects, skills, contact), lip-synced on a 3D character based on his photo with a neutral AI voice (Higgsfield: Seed Audio voice "Julian", Wan 2.7). Scripts live in `src/data/voice.ts`; change a script there and regenerate its clip.
- Skills: each card's panel plays a step-by-step explainer timed to an AI voice-over in `public/assets/voice/*.mp3`.
- Everything loads only when played, and the site labels the voice and animation as AI.

## Deployment (Render)

Render static site. Build command: `npm install && npm run build`. Publish directory: `./dist`. SPA rewrite to `/index.html` (`public/_redirects`). `dist/` is not committed; Render builds it on every push to `main`.

## Environment variables

| Name | Required | Purpose |
|------|----------|---------|
| `VITE_ASK_ENDPOINT` | No | URL of a server-side Ask endpoint. Leave unset to use local answers. |
