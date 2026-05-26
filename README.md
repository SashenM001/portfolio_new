# Sashen Matheesha — Portfolio

Personal portfolio website showcasing projects across full-stack web development, machine learning, cryptography, and embedded systems.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Components | shadcn/ui + Radix UI |
| Theming | next-themes (dark / light toggle) |
| Fonts | Geist Sans / Geist Mono |
| Deployment | Vercel |

## Features

- **Custom cursor** — animated blue dot with trailing ring
- **Scroll progress bar** — gradient line at the top of the viewport
- **Animated hero** — typewriter role switcher, 3D-tilt photo, spinning gradient ring
- **Scroll-triggered sections** — every section fades in on scroll using `useInView`
- **Projects grid** — filterable by category (Web Dev / ML AI / Security / Embedded) with hover glow
- **Skills explorer** — tabbed categories with animated pill tags
- **Dark / light toggle** — persistent theme via `next-themes`
- **CV download** — one-click PDF from the navbar
- **Fully responsive** — mobile drawer nav, adaptive grid layouts

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start
```

## Project Structure

```
app/
  layout.tsx          # Root layout with ThemeProvider + metadata
  page.tsx            # Assembles all sections
  globals.css         # CSS variables, dot-grid, glow utilities

components/
  navbar.tsx          # Fixed nav with scroll-blur, theme toggle, CV download
  custom-cursor.tsx   # Blue dot cursor with spring physics
  scroll-progress.tsx # Gradient scroll indicator bar
  footer.tsx
  icons.tsx           # Custom GitHub SVG icon
  sections/
    hero-section.tsx
    about-section.tsx
    skills-section.tsx
    projects-section.tsx
    contact-section.tsx

lib/
  data.ts             # All content — projects, skills, education, experience
  utils.ts            # cn() helper

public/
  profile.jpg
  Sashen_Matheesha_CV.pdf
```

## Customisation

All content lives in `lib/data.ts` — update projects, skills, education, and personal info there without touching any component.

## Deploy

Push to GitHub and import the repo on [vercel.com](https://vercel.com). No environment variables required.

---

Built with Next.js · Framer Motion · Tailwind CSS
