# Sashen Matheesha — SIGNAL

> An immersive portfolio experience: from browser to silicon.

Cinematic single-page portfolio showcasing projects across full-stack web development, machine learning, cryptography, and embedded systems — built as one continuous scrolling journey with a living "signal field" animation system.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Scroll | Lenis smooth scroll + GSAP ScrollTrigger |
| Motion | Framer Motion (springs, split-text, shared layout) |
| Signature FX | Canvas 2D particle signal field |
| Fonts | Space Grotesk (display) · Geist Sans · Geist Mono |
| Deployment | Vercel |

## The Experience

- **Cinematic preloader** — monogram, phase words (BROWSER → MODELS → CIPHERS → SILICON), charged signal line
- **Signal field** — a persistent particle constellation behind every scene; it evolves with scroll progress, leans away from the cursor, and energizes with scroll velocity
- **Letter-by-letter hero** — giant display type with idle breathing, rotating role ticker, spring CTAs
- **Velocity marquee** — typographic current that accelerates and reverses with your scrolling
- **About scene** — parallax portrait with scanline sweep, mask reveals, layered fact cards
- **Journey timeline** — connecting line that grows as you travel, with a glowing pulse riding it
- **Arsenal** — four tilting domain modules (Web / Neural / Cipher / Silicon) with pointer spotlights and count-up stats
- **Works exhibition** — featured projects as full-width exhibits: outlined titles that fill on hover, sheen sweeps, cascading tech stacks, plus a tilt-card archive
- **Transmit** — floating glass contact form (opens Gmail compose — nothing stored), copy-email, availability pulse
- **Finale** — closing-title watermark and a conic-glow orb that loops you back to the top
- **Cursor system** — instant dot, spring-lagged ring, ghost trail, and a labelled VIEW disc over projects
- **Accessible** — semantic regions, keyboard focus states, `prefers-reduced-motion` honoured everywhere

## Getting Started

```bash
npm install
npm run dev     # → http://localhost:3000
npm run build   # production build
```

## Project Structure

```
app/
  layout.tsx            # Fonts (Space Grotesk / Geist) + metadata
  page.tsx              # Assembles the journey
  globals.css           # Design tokens, HUD/glass/grain utilities

components/
  nav.tsx               # Floating glass nav — magnetic links, hide on scroll
  icons.tsx
  experience/
    signal-field.tsx    # Signature canvas animation system
    smooth-scroll.tsx   # Lenis wired into GSAP's ticker
    preloader.tsx       # Cinematic entry sequence
    cursor.tsx          # Multi-state custom cursor
    magnetic.tsx        # Magnetic hover wrapper
    reveal.tsx          # SplitText / Reveal / MaskReveal primitives
  sections/
    hero.tsx  signal-strip.tsx  about.tsx  journey.tsx
    arsenal.tsx  works.tsx  transmit.tsx  finale.tsx

lib/
  data.ts               # ALL content — edit here to update the site
  utils.ts

public/
  profile.jpg
  Sashen_Matheesha_CV.pdf
```

## Customisation

All content lives in `lib/data.ts` — update projects, skills, education, and personal info there without touching any component.

## Deploy

Import the repo on [vercel.com](https://vercel.com) and set the project **Root Directory** to `portfolio-website`. No environment variables required.

---

Built with Next.js · GSAP · Lenis · Framer Motion · Tailwind CSS
