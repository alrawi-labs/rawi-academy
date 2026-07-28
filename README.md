<div align="center">

# Rawi Academy

**راوي — Learn · Build · Grow**

A bilingual educational platform bringing together four pillars of knowledge — Quran, Technology, Languages, and Science — into a single connected learning path.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![RTL Ready](https://img.shields.io/badge/RTL-Arabic-8059E8?style=flat-square)](#)

</div>

<br>

## Overview

Rawi Academy's landing page is built as a fully right-to-left, Arabic-first experience — not a translated afterthought. Every component, spacing decision, and interaction is designed RTL from the ground up, paired with a self-hosted Arabic typeface family and a brand palette drawn directly from the academy's own logo mark.

<br>

## Getting Started

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000) to view it.

<br>

## Project Structure

```
rawi-academy/
├── app/
│   ├── fonts/                          Self-hosted Thmanyah type family
│   │   ├── thmanyahsans/
│   │   ├── thmanyahserifdisplay/
│   │   └── thmanyahseriftext/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   └── button.tsx          Shared Button component (variant/size/border/icon)
│   │   │   ├── HeroGlassBars.tsx       Ribbon graphic behind the hero
│   │   │   ├── MarqueeStrip.tsx        Trusted-by / stats marquee
│   │   │   ├── Globe.tsx               Rotating globe illustration (Languages card)
│   │   │   ├── CyclingWord.tsx         Word-cycling animated text
│   │   │   └── subjects/               Subject cards for the four pillars
│   │   │       ├── ProgrammingCard.tsx       البرمجة — glass code-editor mockup over photo bg
│   │   │       ├── QuranSunnahCard.tsx       القرآن والسنة — tafsir + memorization mockup over photo bg
│   │   │       ├── LanguagesCard.tsx         اللغات — glass video panel, globe, flashcard stack
│   │   │       ├── MathCard.tsx              الرياضيات — chalkboard, geometry proof, plot, photo bg
│   │   │       ├── FollowCard.tsx            متابعة — weekly progress mockup, brand gradient bg
│   │   │       ├── ChalkboardSteps.tsx       Animated step-by-step algebra solve (glass)
│   │   │       ├── GeometryProofCard.tsx     Animated Pythagorean theorem proof (glass)
│   │   │       ├── MathProblemStack.tsx      Rotating stack of stamped "problem cards"
│   │   │       ├── MathPlot.tsx              Animated function plot disc
│   │   │       ├── BridgeSentence.tsx        Self-drawing SVG line ("basics → hardest problems")
│   │   │       └── LanguageFlashcardStack.tsx Rotating stack of language flashcards
│   │   └── sections/
│   │       ├── Navbar.tsx              Transparent, absolute-positioned navbar
│   │       └── Hero.tsx                Landing hero section
│   ├── globals.css                     Design tokens, theme mapping, font wiring
│   ├── layout.tsx                      Root layout · dir="rtl" · font loading
│   └── page.tsx                        Home page
├── public/
│   └── backgrounds/                    Photo backgrounds used by subject cards (bg-13.png, bg-18.png, bg-19.png …)
├── package.json
└── tsconfig.json
```

<br>

## Design System

### Color Palette

Tokens are defined in `globals.css` under `:root` and mapped into Tailwind via `@theme inline`, so every color is available as a utility class (`bg-primary`, `text-neutral-700`, `hover:bg-primary-hover`, etc.) instead of hardcoded hex values.

**Brand**

| Token | Value | Role |
|:--|:--|:--|
| `--color-primary` | `#8059E8` | Main CTA buttons |
| `--color-primary-hover` | `#6E48E0` | Primary hover state |
| `--color-primary-light` | `#EEEDFE` | Badges, soft backgrounds |
| `--color-primary-alt` | `#533AFD` | Secondary CTA color (nav actions, alt buttons) |
| `--color-primary-alt-hover` | `#4229E0` | Primary-alt hover state |
| `--color-outline-hover` | `#302D8D` | Outline-button hover (text + border) |
| `--color-cta-orange` | `#F26522` | Login / standalone text-action button |
| `--color-cta-orange-bg-hover` | `#FFF4EE` | Hover background for the orange button |

**Neutral scale**

| Token | Value | Role |
|:--|:--|:--|
| `--color-neutral-900` | `#09090B` | Headings, dark text |
| `--color-neutral-700` | `#3F3F52` | Body copy |
| `--color-neutral-500` | `#5F6B85` | Secondary text, labels |
| `--color-neutral-400` | `#7A7F94` | Muted text |
| `--color-neutral-300` | `#B9B4CE` | Dividers, fine details |
| `--color-neutral-200` | `#E4E7ED` | Default border color (applied globally via `@layer base`) |
| `--color-neutral-100` | `#F7F8FC` | Section backgrounds |
| `--color-neutral-0` | `#FFFFFF` | Base surface |

**Accent (hero ribbon gradient)**

| Token | Value |
|:--|:--|
| `--color-accent-teal` | `#5EEAD4` |
| `--color-accent-orange` | `#FDBA74` |
| `--color-accent-purple` | `#A78BFA` |
| `--color-accent-pink` | `#F0A8E0` |

> The logo mark itself uses more saturated tones than the current UI accents (deep violet `#8946FF`, light violet `#B88CFF`, blue `#5B95FF`, turquoise `#18E5FB`). The accent tokens above are a softened, pastel derivation used for the hero ribbon and background flourishes — not a 1:1 match to the logo. Worth reconciling if full brand consistency with the logo is a goal later.

### Typography

Self-hosted via `next/font/local` — no external font requests, zero layout shift.

| Family | Role | Utility class |
|:--|:--|:--|
| **Thmanyah Sans** | UI text, buttons, navbar — the site default | *(inherited from `body`)* |
| **Thmanyah Serif Display** | Large headlines (H1 / H2) | `.font-thmanyah-display` |
| **Thmanyah Serif Text** | Long-form body copy | `.font-thmanyah-text` |

> Licensed by Thmanyah, sourced from [font.thmanyah.com](https://font.thmanyah.com). See the accompanying `LICENSE.pdf` before any extended commercial use.

<br>

## Direction & Language

The entire project is RTL by default — `dir="rtl"` and `lang="ar"` are set once at the `<html>` level in `app/layout.tsx`. Every component that follows should be built RTL-first: element order, arrow direction, and spacing all flow right-to-left, not mirrored after the fact.

<br>

## Components

**`Button` (`src/components/ui/button.tsx`)**
Shared button/link component used across the site instead of one-off `<a>`/`<button>` markup. Props:
- `variant`: `"primary"` · `"primary-alt"` · `"outline"` · `"orange"`
- `size`: `"sm"` · `"md"` · `"lg"`
- `border`: overrides each variant's default border behavior
- `icon` / `iconPosition`: custom icon, defaults to a leading arrow on `primary` / `primary-alt`
- `fullWidth`: stretches to 100% width
- `href`: renders an `<a>` when present, a `<button>` otherwise

**`Navbar.tsx`**
Fully transparent, `position: absolute` navbar meant to sit over the hero, built with the shared `Button` component for its actions. Rendered once in `layout.tsx` so it persists across every page.

**`Hero.tsx`**
Opening section with a stat line, a two-tone display headline, primary/alt CTAs (via `Button`), and a trusted-by marquee strip. Includes an SVG ribbon built from the same four shapes as the logo mark.

### Subject Cards (`src/components/subjects/`)

Each of the four pillars gets a dedicated, visually distinct card. All share the same outer shell — `bg-white`, `border-[#E4E7ED]`, `rounded-lg`, `shadow-sm`, a title row with an `Expand` icon button — but differ inside based on which background treatment they use:

| Card | Background | Notable pieces |
|:--|:--|:--|
| `ProgrammingCard` | Photo (`bg-19.png`) | Glass code-editor window (macOS dots, syntax highlighting, `Tab` hint), glass "مسار البرمجة" progress panel |
| `QuranSunnahCard` | Photo (`bg-13.png`) | Tafsir mockup window, phone-frame memorization mockup with radial progress |
| `LanguagesCard` | Photo (`bg-18.png`), extends into the title area | `Globe`, `LanguageFlashcardStack`, glass video-call panel with `CyclingWord` headline |
| `MathCard` | Photo (`bg-18.png`), extends into the title area | `ChalkboardSteps`, `GeometryProofCard`, `MathPlot`, `BridgeSentence`, guide-line/grain SVG overlays |
| `FollowCard` | Brand gradient (mint → blue → violet → orchid → coral → orange) | Weekly progress ring + 7-day bar chart mockup |

**Glassmorphism pattern** — used for any panel that floats over a photo or gradient background (`ChalkboardSteps`, `GeometryProofCard`, the code editor and progress panel in `ProgrammingCard`, the video panel in `LanguagesCard`):
```
bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_30px_60px_-20px_rgba(20,16,40,0.25)]
```
with a diagonal glare layer (`linear-gradient(115deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 30%, transparent 55%)`) and inner sections stepped down in opacity (`/30` → `/15` → `/85` depending on role) for header bars, content areas, and footer strips.

**Photo backgrounds** live in `public/backgrounds/` and are applied via `bg-cover bg-center` + `backgroundImage`. When a card's title should read as part of the photo rather than sit on a separate white strip, the background is set on the *outermost* card container instead of the inner content wrapper.

<br>

## Roadmap

- [x] Subject cards (Programming, Quran & Sunnah, Languages, Math, Follow)
- [ ] Remaining landing sections (testimonials, pricing)
- [ ] Footer
- [ ] Scroll-aware navbar (background/border fade-in past the hero)
- [ ] Mobile layouts for all sections
- [ ] Reconcile accent palette with the exact logo gradient tones

<br>

<div align="center">

*Built for Rawi Academy — راوي*

</div>