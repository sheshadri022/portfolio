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

## Look: Template 07, Aura Glow

Dark theme (near-black ink) with a magenta-to-violet glow and an ice-cyan accent; display font Anton, body font Inter. Colours live as tokens in `src/index.css`.

## Hero, ID card, skills table and proud moments

- Hero: a 3D Sheshadri at his desk in a dark room with code on the monitors. "I'M SHESHADRI" is set huge *behind* him: the scene, the name and a transparent cut-out of him are stacked (`public/assets/aura/`), with a pink and violet aura breathing behind the name. "Click to interact" crossfades to a lip-synced clip of the same shot (`aura/intro.webm|mp4`) with his spoken intro and live captions.
- About: a flipping ID card on a lanyard (front: photo, name, title; back: what he does and how to reach him).
- Skills & Expertise: seven skill cards (`src/data/skills.ts`). Clicking a card opens a panel that explains the skill: a short summary, a step-by-step "How it works" narrated by an AI voice, and everything the skill covers.
- Proud moments: milestones and certifications on one track that moves sideways as you scroll (swipe on phones).

## Talking avatar and skill explainers

- Point at a menu item (or a section heading once voice is on) and Sheshadri's avatar explains that section. "Click to interact" in the hero, or the speaker button in the navbar, turns the voice on. Browsers block sound until the visitor clicks once, so before that clips play muted with captions.
- Poses: `public/assets/avatars/` holds his avatar set (about, developer, seated, mobile, profile, greeting, presenting, interactive, talking). Real-photo poses are used in About, Experience, Developer journey, Projects, Skills and Contact; the floating 3D guide changes its ring colour by section.
- Clips: `public/assets/avatar/*.webm|mp4` (about, experience, projects, skills, contact), lip-synced on a 3D character based on his photo with a neutral AI voice (Higgsfield: Seed Audio voice "Julian", Wan 2.7). Scripts live in `src/data/voice.ts`; change a script there and regenerate its clip.
- Skills: each card's panel plays a step-by-step explainer timed to an AI voice-over in `public/assets/voice/*.mp3`.
- Everything loads only when played, and the site labels the voice and animation as AI.

## Deployment (Render)

Render static site. Build command: `npm install && npm run build`. Publish directory: `./dist`. SPA rewrite to `/index.html` (`public/_redirects`). `dist/` is not committed; Render builds it on every push to `main`.

## Environment variables

| Name | Required | Purpose |
|------|----------|---------|
| `VITE_ASK_ENDPOINT` | No | URL of a server-side Ask endpoint. Leave unset to use local answers. |
