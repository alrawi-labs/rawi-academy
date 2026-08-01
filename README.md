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
│   │   │   ├── CyclingWord.tsx         Word-cycling animated text
│   │   │   ├── MarqueeStrip.tsx        Trusted-by / stats marquee
│   │   │   ├── worldLandPoints.ts      Coordinate data feeding the Globe component
│   │   │   ├── 3D/
│   │   │   │   ├── Globe.tsx                Rotating globe illustration (Languages card)
│   │   │   │   └── HeroGlassBars.tsx        Ribbon graphic behind the hero
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx          Shared Button component (variant/size/border/icon)
│   │   │   │   └── NavLink.tsx         Shared nav link (plain / chevron / dropdown panel)
│   │   │   ├── layout/
│   │   │   │   ├── SectionContainer.tsx  Content-width wrapper (max-w-7xl + horizontal padding)
│   │   │   │   └── SectionLede.tsx       Section intro block (lead + sub + body, all optional)
│   │   │   ├── Icons/
│   │   │   │   └── GoogleIcon.tsx      Google "G" mark for the Hero's alt sign-in button
│   │   │   ├── courses/                Subject cards for the four pillars
│   │   │   │   ├── CardHeader.tsx            Shared title row (subject name + accented Expand button); color variant per subject, size variant per card width
│   │   │   │   ├── ProgrammingCard.tsx       البرمجة — glass code-editor mockup over photo bg (bg-5.png)
│   │   │   │   ├── QuranSunnahCard.tsx       القرآن والسنة — solid (non-glass) tafsir + memorization mockup over photo bg (bg-19.png)
│   │   │   │   ├── LanguagesCard.tsx         اللغات — glass video panel, globe, flashcard stack
│   │   │   │   ├── MathCard.tsx              الرياضيات — chalkboard, geometry proof, plot, photo bg
│   │   │   │   ├── ChalkboardSteps.tsx       Animated step-by-step algebra solve (glass)
│   │   │   │   ├── GeometryProofCard.tsx     Animated Pythagorean theorem proof (glass)
│   │   │   │   ├── MathPlot.tsx              Animated function plot disc
│   │   │   │   ├── BridgeSentence.tsx        Self-drawing SVG line ("basics → hardest problems")
│   │   │   │   └── LanguageFlashcardStack.tsx Rotating stack of language flashcards
│   │   │   └── Experiences/             ⚠️ TODO: add short description per component
│   │   │       ├── AgeCard.tsx
│   │   │       ├── AIModelsCard.tsx
│   │   │       ├── FeatureCard.tsx
│   │   │       └── FollowCard.tsx            متابعة — weekly progress mockup, brand gradient bg
│   │   └── sections/
│   │       ├── Navbar.tsx              Transparent, absolute-positioned navbar
│   │       ├── Hero.tsx                Landing hero section
│   │       ├── Courses.tsx             SectionContainer + SectionLede intro + 2-col grid of the four subject cards
│   │       ├── FAQSection.tsx          Asymmetric FAQ (sticky heading + accordion list)
│   │       ├── Footer.tsx              Dark closing section (responsive as of Aug 2026)
│   │       ├── ExperiencesSection.tsx      ⚠️ TODO: add description
│   │       ├── ExploreTracksSection.tsx    ⚠️ TODO: add description
│   │       ├── FinalCTASection.tsx         ⚠️ TODO: add description
│   │       ├── HowToStartSection.tsx       ⚠️ TODO: add description
│   │       ├── LogoRiseSection.tsx         ⚠️ TODO: add description
│   │       ├── StartWithWhatMatters.tsx    ⚠️ TODO: add description
│   │       ├── TeamSection.tsx             ⚠️ TODO: add description
│   │       ├── VisionSection.tsx           ⚠️ TODO: add description
│   │       └── WhyRawiSection.tsx          ⚠️ TODO: add description
│   ├── globals.css                     Design tokens, theme mapping, font wiring
│   ├── layout.tsx                      Root layout · dir="rtl" · font loading
│   └── page.tsx                        Home page
├── public/
│   ├── backgrounds/                    Photo backgrounds used by subject cards (bg-5.png, bg-13.png, bg-18.png, bg-19.png …)
│   └── logos/                          Logo marks (navbar, footer)
├── package.json
└── tsconfig.json
```

> **Note:** several sections and the `Experiences/` components are new since the last structural pass and don't have written descriptions yet — see the ⚠️ markers above. Send over a one-liner for each and this doc can be filled in properly.

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

**Subject accent colors** — each of the four pillars has a fixed identity color, applied via `CardHeader`'s `color` prop using plain Tailwind palette classes (not yet formalized as design tokens):

| Subject | Color |
|:--|:--|
| القرآن والسنة (Quran & Sunnah) | teal |
| البرمجة (Programming) | purple |
| الرياضيات (Math) | orange |
| اللغات (Languages) | pink |

### Typography

Self-hosted via `next/font/local` — no external font requests, zero layout shift.

| Family | Role | Utility class |
|:--|:--|:--|
| **Thmanyah Sans** | UI text, buttons, navbar — the site default | *(inherited from `body`)* |
| **Thmanyah Serif Display** | Large headlines (H1 / H2) | `.font-thmanyah-display` |
| **Thmanyah Serif Text** | Long-form body copy | `.font-thmanyah-text` |

> Licensed by Thmanyah, sourced from [font.thmanyah.com](https://font.thmanyah.com). See the accompanying `LICENSE.pdf` before any extended commercial use.

> Font sizes are being migrated to a semantic scale (`text-hero`, `text-h2`, `text-h3`, `text-h3-sm`, `text-h2-sm`, `text-lead`, `text-body`, `text-caption`, `text-micro`) — already in use via `SectionLede`, `Button`, `CardHeader`, and the wide subject cards (`text-h2-sm`, 26px). Remaining components still use one-off `text-[Npx]` values pending migration (see Roadmap).

<br>

## Direction & Language

The entire project is RTL by default — `dir="rtl"` and `lang="ar"` are set once at the `<html>` level in `app/layout.tsx`. Every component that follows should be built RTL-first: element order, arrow direction, and spacing all flow right-to-left, not mirrored after the fact.

<br>

## Components

**`Button` (`src/components/ui/Button.tsx`)**
Shared button/link component used across the site instead of one-off `<a>`/`<button>` markup. Renders as an `<a>` when `href` is passed, a `<button>` otherwise — no separate `as` prop needed. Props:
- `variant`: `"primary"` · `"primary-alt"` · `"outline"` · `"orange"`
- `size`: `"sm"` · `"md"` · `"lg"`
- `border`: overrides each variant's default border behavior
- `icon` / `iconPosition`: custom icon, defaults to a leading chevron on `primary` / `primary-alt`
- `fullWidth`: stretches to 100% width
- `href`: renders an `<a>` when present, a `<button>` otherwise

**`NavLink` (`src/components/ui/NavLink.tsx`)**
Shared navigation link used in both the navbar and footer. Handles three states out of the box: a plain link, a link with a rotating chevron, and a link with a glassmorphic dropdown panel (`items` prop). Colors are controlled entirely via `context` (`"navbar"` | `"footer"`) — never passed manually through `className`, keeping navbar/footer link styling centralized.

**`SectionLede` (`src/components/ui/SectionLede.tsx`)**
Reusable section intro block combining an emphasized `lead` statement, a muted `sub` line, and an optional separate `body` paragraph. All three props are optional and render independently — e.g. passing only `body` renders just the body paragraph with no lead/sub block at all.

**`SectionContainer` (`src/components/layout/SectionContainer.tsx`)**
Reusable content-width wrapper (`max-w-7xl mx-auto px-10`) used inside top-level `<section>` elements. Centralizes horizontal constraint only — background color, vertical spacing (`pt-*`), and `dir` are left on the parent `<section>` so each section can vary independently without fighting the container.

**`CardHeader` (`src/components/courses/CardHeader.tsx`)**
Shared title row used at the top of every subject card in `Courses.tsx`, pairing the subject name with an accented "expand details" icon button. Props:
- `color`: `"teal"` · `"purple"` · `"orange"` · `"pink"` — fixed 1:1 mapping to subject (see Subject Cards table)
- `size`: `"sm"` (narrow cards — `px-8 pt-8 pb-2`, `text-h3`) · `"lg"` (wide, `col-span-2` cards — `px-10 pt-4 pb-0`, `text-h2-sm`)

Colors are controlled entirely via `color` — never passed manually through `className` — so each subject's accent stays consistent everywhere its header appears.

**`Navbar.tsx`**
Fully transparent, `position: absolute` navbar meant to sit over the hero, built with the shared `Button` and `NavLink` components. Rendered once in `layout.tsx` so it persists across every page.

**`Hero.tsx`**
Opening section with a stat line, a two-tone display headline, primary/outline CTAs (via `Button`, the outline variant paired with `GoogleIcon`), and a trusted-by marquee strip. Includes an SVG ribbon (`HeroGlassBars`) built from the same four shapes as the logo mark.

**`Courses.tsx`**
`SectionContainer` wrapping a `SectionLede` intro (two-tone, bold lead-in + muted continuation) followed by a 2-column grid of the four subject cards.

**`FAQSection.tsx`**
Asymmetric two-column layout instead of a centered accordion: a sticky heading block on one side, an accordion list on the other. Question badges reuse the Arabic verse-marker motif from `QuranSunnahCard` (Arabic-Indic numerals in a circular badge) instead of a generic plus/chevron icon. Answers reveal with a self-drawing underline (`scaleX` from the trailing edge) on open.

**`Footer.tsx`**
Dark (`neutral-900`) closing section, intentionally breaking from the light theme used everywhere else. Asymmetric top row (logo + tagline vs. a single CTA), four link columns built with `NavLink` (`context="footer"`), and custom inline SVG social icons (`lucide-react` no longer ships brand/logo icons, so Instagram/Twitter/YouTube are hand-drawn minimal outlines using `currentColor`). Responsive breakpoints added (mobile padding/gap scaling, stacked CTA, adaptive link grid).

**New sections pending documentation** — `ExperiencesSection.tsx`, `ExploreTracksSection.tsx`, `FinalCTASection.tsx`, `HowToStartSection.tsx`, `LogoRiseSection.tsx`, `StartWithWhatMatters.tsx`, `TeamSection.tsx`, `VisionSection.tsx`, `WhyRawiSection.tsx`, `WorthLearningHero.tsx`, and the `Experiences/` components (`AgeCard`, `AIModelsCard`, `FeatureCard`). Add a one-line description for each here once confirmed.

### Subject Cards (`src/components/courses/`)

Each of the four pillars gets a dedicated, visually distinct card, sharing the `CardHeader` component for its title row. Cards differ in background treatment and whether the floating panels are glass or solid:

| Card | Accent color | Background | Panel style | Notable pieces |
|:--|:--|:--|:--|:--|
| `QuranSunnahCard` | teal | Photo (`bg-19.png`) | Solid (`bg-neutral-0`) | `BrowserMockup` (tafsir window, local) + `PhoneMockup` (memorization view with radial progress ring, local) |
| `ProgrammingCard` | purple | Photo (`bg-5.png`) | Glass (`bg-white/40 backdrop-blur-xl`) | `CodeEditorMockup` (local; glass editor window, macOS dots, syntax highlighting, `Tab` hint) + `ProgressPanel` (local; "مسار البرمجة" progress + activity chart) |
| `MathCard` | orange | Photo (`bg-24.png`), extends into the title area | Glass | `ChalkboardSteps`, `GeometryProofCard`, `MathPlot`, `BridgeSentence` (all shared), plus `DecorativeOverlays` (local; grain texture, golden-ratio guide lines, corner ring, warm glow, ground shadow) |
| `LanguagesCard` | pink | Photo (`bg-25.png`), extends into the title area | Glass | `Globe`, `LanguageFlashcardStack` (shared), plus `VideoPanel` (local; glass live-class window with floating badges) and `CyclingHeadline` (local; animated word headline over the globe) |
| `FollowCard` | — | Brand gradient (mint → blue → violet → orchid → coral → orange) | Solid | Weekly progress ring + 7-day bar chart mockup |

**Glassmorphism pattern** — used for any panel that floats over a photo or gradient background (`ChalkboardSteps`, `GeometryProofCard`, `CodeEditorMockup`/`ProgressPanel` in `ProgrammingCard`, `VideoPanel` in `LanguagesCard`):
```
bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_30px_60px_-20px_rgba(20,16,40,0.25)]
```
with a diagonal glare layer (`linear-gradient(115deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 30%, transparent 55%)`) and inner sections stepped down in opacity (`/30` → `/15` → `/85` depending on role) for header bars, content areas, and footer strips.

**Photo backgrounds** live in `public/backgrounds/` and are applied via `bg-cover bg-center` + `backgroundImage`. When a card's title should read as part of the photo rather than sit on a separate white strip, the background is set on the *outermost* card container instead of the inner content wrapper.

**Local sub-components** — every subject card breaks its JSX into small, file-local functions purely for readability (e.g. `BrowserMockup` / `PhoneMockup` in `QuranSunnahCard.tsx`, `CodeEditorMockup` / `ProgressPanel` in `ProgrammingCard.tsx`, `VideoPanel` / `CyclingHeadline` in `LanguagesCard.tsx`, `DecorativeOverlays` in `MathCard.tsx`). These stay local as long as they're only used within that one card; if a future card needs the same mockup, it should be extracted into its own file under `components/ui/` rather than duplicated.

<br>

## Known Issues / Cleanup

- `--color-accent-orange` and `--color-accent-pink` still exist in `:root` but were never mapped into `@theme inline` — dead tokens from the pre-reconciliation palette, safe to remove.
- New `--visual-*` tokens (`--color--visual-teal/orange/purple/pink`) have a naming typo (double dash: `--color--visual-*` instead of `--color-visual-*`) and aren't yet mapped into `@theme inline`. Pending a follow-up pass.
- Off-palette hardcoded hex values with no matching token: `#FD9120`, `#C23B82`, `#F386C4`, `#6E6584`, `#8B87A3` (all in `ProgrammingCard`), `#22C1A0` (in `QuranSunnahCard`), `#8059E8` used directly as an SVG `stroke` in `MathCard`'s guide lines/ring (Tailwind color classes don't apply to SVG `stroke` attributes, so this one is expected to stay as a raw value or move to `var(--color-primary)`). Decision pending on whether to formalize the rest as tokens.
- `CardHeader`'s four subject accent colors (teal/purple/orange/pink) currently use plain Tailwind palette classes (`teal-400`, `purple-400`, etc.), not project design tokens — consider formalizing once the `--visual-*` token naming is fixed.
- `MathCard` has an empty, content-less floating `div` (positioned like `LanguagesCard`'s `CyclingHeadline`, `right-[8%]`) — unclear whether it's an intentional placeholder or a leftover from an earlier draft.
- `AbstractRibbonBackground.tsx` and `MathProblemStack.tsx`, previously documented here, no longer appear in the source tree — confirm whether they were intentionally removed or need to be re-added.
- Several new sections (`ExperiencesSection`, `ExploreTracksSection`, `FinalCTASection`, `HowToStartSection`, `LogoRiseSection`, `StartWithWhatMatters`, `TeamSection`, `VisionSection`, `WhyRawiSection`, `WorthLearningHero`) and the `Experiences/` components exist in the tree but aren't documented above yet.

<br>

## Roadmap

- [x] Subject cards (Programming, Quran & Sunnah, Languages, Math, Follow)
- [x] Courses section (intro + grid)
- [x] FAQ section
- [x] Footer
- [x] Footer responsive breakpoints (mobile/tablet)
- [x] Shared `SectionContainer` / `SectionLede` components for section intros
- [x] Shared `CardHeader` component with per-subject color + size variants
- [x] Split all four subject cards into local sub-components for readability
- [ ] Document new sections (`ExperiencesSection`, `ExploreTracksSection`, `FinalCTASection`, `HowToStartSection`, `LogoRiseSection`, `StartWithWhatMatters`, `TeamSection`, `VisionSection`, `WhyRawiSection`, `WorthLearningHero`) and `Experiences/` components
- [ ] Scroll-aware navbar (background/border fade-in past the hero)
- [ ] Mobile layouts for remaining sections (Footer done; others pending)
- [ ] Fix naming + wire `--visual-*` tokens into `@theme inline`
- [ ] Finish migrating remaining components off one-off `text-[Npx]` values onto the semantic font-size scale
- [ ] Resolve off-palette hex values in `ProgrammingCard` / `QuranSunnahCard` / `MathCard`
- [ ] Decide `FollowCard` background direction (keep gradient vs. switch to alternative)
- [ ] Remove unused `accent-orange` / `accent-pink` tokens
- [ ] Resolve the empty placeholder `div` in `MathCard` (remove or give it content like `LanguagesCard`'s `CyclingHeadline`)
- [ ] Formalize `CardHeader`'s subject accent colors as design tokens
- [ ] Confirm removal of `AbstractRibbonBackground.tsx` / `MathProblemStack.tsx` and clean up any lingering references

<br>

<div align="center">

*Built for Rawi Academy — راوي*

</div>