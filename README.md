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
│   │   │   ├── Icons/
│   │   │   │   └── GoogleIcon.tsx      Google "G" mark for the Hero's alt sign-in button
│   │   │   ├── HeroGlassBars.tsx       Ribbon graphic behind the hero
│   │   │   ├── MarqueeStrip.tsx        Trusted-by / stats marquee
│   │   │   ├── Globe.tsx               Rotating globe illustration (Languages card)
│   │   │   ├── CyclingWord.tsx         Word-cycling animated text
│   │   │   ├── AbstractRibbonBackground.tsx  Token-driven SVG ribbon bg (alternative to photo bg — not currently wired into any card)
│   │   │   └── courses/                Subject cards for the four pillars
│   │   │       ├── ProgrammingCard.tsx       البرمجة — glass code-editor mockup over photo bg (bg-5.png)
│   │   │       ├── QuranSunnahCard.tsx       القرآن والسنة — solid (non-glass) tafsir + memorization mockup over photo bg (bg-19.png)
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
│   │       ├── Hero.tsx                Landing hero section
│   │       ├── CoursesSection.tsx      Intro paragraph + 2-col grid of the four subject cards
│   │       ├── FAQSection.tsx          Asymmetric FAQ (sticky heading + accordion list)
│   │       └── Footer.tsx              Dark closing section
│   ├── globals.css                     Design tokens, theme mapping, font wiring
│   ├── layout.tsx                      Root layout · dir="rtl" · font loading
│   └── page.tsx                        Home page
├── public/
│   ├── backgrounds/                    Photo backgrounds used by subject cards (bg-5.png, bg-13.png, bg-18.png, bg-19.png …)
│   └── logos/                          Logo marks (navbar, footer)
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
| `--color-orange` | `#F26522` | Login / standalone text-action button |
| `--color-orange-bg-hover` | `#FFF4EE` | Hover background for the orange button |

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

**Accent (logo-derived)**

| Token | Value |
|:--|:--|
| `--color-accent-purple` | `#8946FF` |
| `--color-accent-violet` | `#B88CFF` |
| `--color-accent-blue` | `#5B95FF` |
| `--color-accent-teal` | `#18E5FB` |

> These are reconciled with the logo mark's saturated tones (previously a softer pastel set — see Known Issues for the leftover unused tokens from that earlier version).

### Typography

Self-hosted via `next/font/local` — no external font requests, zero layout shift.

| Family | Role | Utility class |
|:--|:--|:--|
| **Thmanyah Sans** | UI text, buttons, navbar — the site default | *(inherited from `body`)* |
| **Thmanyah Serif Display** | Large headlines (H1 / H2) | `.font-thmanyah-display` |
| **Thmanyah Serif Text** | Long-form body copy | `.font-thmanyah-text` |

> Licensed by Thmanyah, sourced from [font.thmanyah.com](https://font.thmanyah.com). See the accompanying `LICENSE.pdf` before any extended commercial use.

> Font sizes are currently set as one-off `text-[Npx]` values per component. A semantic scale (`text-hero`, `text-h2`, `text-h3`, `text-lead`, `text-body`, `text-caption`, `text-micro`) is planned — see Roadmap.

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
Opening section with a stat line, a two-tone display headline, primary/outline CTAs (via `Button`, the outline variant paired with `GoogleIcon`), and a trusted-by marquee strip. Includes an SVG ribbon (`HeroGlassBars`) built from the same four shapes as the logo mark.

**`CoursesSection.tsx`**
Intro paragraph (two-tone, bold lead-in + muted continuation) followed by a 2-column grid of the four subject cards.

**`FAQSection.tsx`**
Asymmetric two-column layout instead of a centered accordion: a sticky heading block on one side, an accordion list on the other. Question badges reuse the Arabic verse-marker motif from `QuranSunnahCard` (Arabic-Indic numerals in a circular badge) instead of a generic plus/chevron icon. Answers reveal with a self-drawing underline (`scaleX` from the trailing edge) on open.

**`Footer.tsx`**
Dark (`neutral-900`) closing section, intentionally breaking from the light theme used everywhere else. Asymmetric top row (logo + tagline vs. a single CTA), four link columns, and custom inline SVG social icons (`lucide-react` no longer ships brand/logo icons, so Instagram/Twitter/YouTube are hand-drawn minimal outlines using `currentColor`).

### Subject Cards (`src/components/courses/`)

Each of the four pillars gets a dedicated, visually distinct card. Card shells share `rounded-lg`, `shadow-sm`, and a title row with an `Expand` icon button, but differ in background treatment and whether the floating panels are glass or solid:

| Card | Background | Panel style | Notable pieces |
|:--|:--|:--|:--|
| `ProgrammingCard` | Photo (`bg-5.png`) | Glass (`bg-white/40 backdrop-blur-xl`) | Glass code-editor window (macOS dots, syntax highlighting, `Tab` hint), glass "مسار البرمجة" progress panel |
| `QuranSunnahCard` | Photo (`bg-19.png`) | Solid (`bg-neutral-0`) | Tafsir mockup window, phone-frame memorization mockup with radial progress |
| `LanguagesCard` | Photo (`bg-18.png`), extends into the title area | Glass | `Globe`, `LanguageFlashcardStack`, glass video-call panel with `CyclingWord` headline |
| `MathCard` | Photo (`bg-18.png`), extends into the title area | Glass | `ChalkboardSteps`, `GeometryProofCard`, `MathPlot`, `BridgeSentence`, guide-line/grain SVG overlays |
| `FollowCard` | Brand gradient (mint → blue → violet → orchid → coral → orange) | Solid | Weekly progress ring + 7-day bar chart mockup |

**Glassmorphism pattern** — used for any panel that floats over a photo or gradient background (`ChalkboardSteps`, `GeometryProofCard`, the code editor and progress panel in `ProgrammingCard`, the video panel in `LanguagesCard`):
```
bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_30px_60px_-20px_rgba(20,16,40,0.25)]
```
with a diagonal glare layer (`linear-gradient(115deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 30%, transparent 55%)`) and inner sections stepped down in opacity (`/30` → `/15` → `/85` depending on role) for header bars, content areas, and footer strips.

**Photo backgrounds** live in `public/backgrounds/` and are applied via `bg-cover bg-center` + `backgroundImage`. When a card's title should read as part of the photo rather than sit on a separate white strip, the background is set on the *outermost* card container instead of the inner content wrapper.

**`AbstractRibbonBackground`** — a token-driven SVG alternative to photo backgrounds (diagonal ribbon bands built from `--color-accent-*` gradients + a subtle framer-motion drift), built to remove reliance on stock photography. Not currently used by any card — `ProgrammingCard` reverted to a photo background (`bg-5.png`).

<br>

## Known Issues / Cleanup

- `--color-accent-orange` and `--color-accent-pink` still exist in `:root` but were never mapped into `@theme inline` — dead tokens from the pre-reconciliation palette, safe to remove.
- New `--visual-*` tokens (`--color--visual-teal/orange/purple/pink`) have a naming typo (double dash: `--color--visual-*` instead of `--color-visual-*`) and aren't yet mapped into `@theme inline`. Pending a follow-up pass.
- Off-palette hardcoded hex values with no matching token: `#FD9120`, `#C23B82`, `#F386C4`, `#6E6584`, `#8B87A3` (all in `ProgrammingCard`), `#22C1A0` (in `QuranSunnahCard`). Decision pending on whether to formalize these as tokens.

<br>

## Roadmap

- [x] Subject cards (Programming, Quran & Sunnah, Languages, Math, Follow)
- [x] Courses section (intro + grid)
- [x] FAQ section
- [x] Footer
- [ ] Remaining landing sections (testimonials, pricing)
- [ ] Scroll-aware navbar (background/border fade-in past the hero)
- [ ] Mobile layouts for all sections
- [ ] Fix naming + wire `--visual-*` tokens into `@theme inline`
- [ ] Tokenize the font-size scale (`text-hero`, `text-h2`, `text-h3`, …)
- [ ] Resolve off-palette hex values in `ProgrammingCard` / `QuranSunnahCard`
- [ ] Decide `FollowCard` background direction (keep gradient vs. switch to `AbstractRibbonBackground`)
- [ ] Remove unused `accent-orange` / `accent-pink` tokens

<br>

<div align="center">

*Built for Rawi Academy — راوي*

</div>