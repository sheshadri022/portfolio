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

## Deployment (Render)

`render.yaml` defines a static site: `npm install && npm run build`, publish `./dist`, SPA rewrite to `/index.html`. `dist/` is not committed; Render builds it.

## Environment variables

| Name | Required | Purpose |
|------|----------|---------|
| `VITE_ASK_ENDPOINT` | No | URL of a server-side Ask endpoint. Leave unset to use local answers. |
