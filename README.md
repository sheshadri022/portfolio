# Sheshadri N – Portfolio

A modern, production-ready personal portfolio website for **Sheshadri N**, System Administrator & Google Workspace Administrator at Miles Education Pvt Ltd.

🌐 **Live Site:** [sheshadri-portfolio.onrender.com](https://sheshadri-portfolio.onrender.com)  
💼 **LinkedIn:** [linkedin.com/in/sheshadri-n](https://www.linkedin.com/in/sheshadri-n)  
🐙 **GitHub:** [github.com/sheshadri022](https://github.com/sheshadri022)

---

## Preview

![Portfolio Preview](public/sheshadri.jpeg)

---

## Features

- **Animated Hero Section** — Role typewriter effect, profile photo, stats
- **Interactive Skills Modal** — 5 expertise cards with glassmorphism popups (Google Workspace, L1/L2 Support, IT Asset Lifecycle, Troubleshooting, Enterprise IT)
- **Experience Timeline** — Dual-role vertical timeline (Miles Education Pvt Ltd)
- **Projects Section** — TechOps Portal & Portfolio Website with live demo links
- **Certifications** — Google Workspace, Technical Support Fundamentals, ITAM
- **Education** — B.Com, Higher Secondary (+2), SSLC
- **Contact Form** — Direct email, phone, LinkedIn, and GitHub links
- **Dark / Light Mode Toggle** — Theme-aware design using `next-themes`
- **Fully Responsive** — Mobile, tablet, and desktop layouts
- **Resume Download** — Direct PDF download from hero section

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 6 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Theme | next-themes |
| Fonts | Syne (headings) + Inter (body) |
| Hosting | Render (static site) |
| Version Control | GitHub |

---

## Project Structure

```
artifacts/portfolio/
├── public/
│   ├── sheshadri.jpeg       # Profile photo
│   └── resume.pdf           # Downloadable resume
├── src/
│   ├── components/
│   │   ├── Navbar.tsx        # Fixed navbar with scroll progress bar
│   │   ├── Hero.tsx          # Landing section with stats & photo
│   │   ├── About.tsx         # About me section
│   │   ├── Experience.tsx    # Work experience timeline
│   │   ├── Projects.tsx      # Featured project cards
│   │   ├── Skills.tsx        # Interactive skill cards + modals
│   │   ├── Certifications.tsx
│   │   ├── Education.tsx
│   │   ├── Languages.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css             # Tailwind + CSS variables (dark/light theme)
└── dist/                     # Pre-built output (served by Render)
```

---

## Color Theme

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `345 70% 55%` | Burgundy/wine — buttons, accents, icons |
| Background | `#0d0d0f` | Matte black (dark mode) |
| Card | `#111113` | Glassmorphism cards |
| Font Heading | Syne | Bold display text |
| Font Body | Inter | Readable body copy |

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+

### Install & Run

```bash
# From the workspace root
pnpm install

# Start the portfolio dev server
pnpm --filter @workspace/portfolio run dev
```

The site runs on the port defined by the `PORT` environment variable (default routed through the shared proxy at `/`).

### Build

```bash
pnpm --filter @workspace/portfolio run build
```

---

## Deployment

The site is deployed on **Render** as a static site.

- **Publish directory:** `./dist`
- **Build command:** *(empty — pre-built `dist/` is committed to the repo)*
- **Auto-deploy:** Triggered via Render API on every update

To redeploy manually:
1. Build locally: `pnpm --filter @workspace/portfolio run build`
2. Commit and push `dist/` to GitHub
3. Trigger a new deploy from the Render dashboard or via API

---

## Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | Hero | Name, role rotator, photo, stats, CTA buttons |
| 2 | About | Professional summary and personal intro |
| 3 | Experience | Miles Education – System Admin & IT Support Engineer roles |
| 4 | Projects | TechOps Portal, Portfolio Website |
| 5 | Skills | 5 clickable expertise cards with detailed modals |
| 6 | Certifications | Google Workspace, Technical Support, ITAM |
| 7 | Education | B.Com, +2 Commerce, SSLC |
| 8 | Languages | Tamil, Kannada, Telugu, English |
| 9 | Contact | Email, phone, LinkedIn, GitHub |

---

## Contact

**Sheshadri N**  
📧 sheshadri022@gmail.com  
📞 +91 8190062144  
📍 Bengaluru, Karnataka  
🔗 [LinkedIn](https://www.linkedin.com/in/sheshadri-n) · [GitHub](https://github.com/sheshadri022)

---

*Built with React, Tailwind CSS & Framer Motion*
