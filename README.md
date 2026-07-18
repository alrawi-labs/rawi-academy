<div align="center">

# Rawi Academy

**راوي — Learn · Build · Grow**

A bilingual educational platform bringing together four pillars of knowledge — Quran, Technology, Languages, and Science — into a single connected learning path.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![RTL Ready](https://img.shields.io/badge/RTL-Arabic-5B4FE8?style=flat-square)](#)

</div>

<br>

## Overview

Rawi Academy's landing page is built as a fully right-to-left, Arabic-first experience — not a translated afterthought. Every component, spacing decision, and interaction is designed RTL from the ground up, paired with a self-hosted Arabic typeface family and a brand palette drawn directly from the academy's own logo.

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
│   ├── fonts/                        Self-hosted Thmanyah type family
│   │   ├── thmanyahsans/
│   │   ├── thmanyahserifdisplay/
│   │   └── thmanyahseriftext/
│   ├── src/
│   │   └── components/
│   │       ├── Navbar.tsx            Transparent, sticky-ready navbar
│   │       └── Hero.tsx              Landing hero section
│   ├── globals.css                   Design tokens + font wiring
│   ├── layout.tsx                    Root layout · dir="rtl" · font loading
│   └── page.tsx                      Home page
├── public/                           Static assets
├── package.json
└── tsconfig.json
```

<br>

## Design System

### Color Palette

Derived from the Rawi Academy logo's four-piece gradient mark, rather than a generic template palette.

| Token | Value | Role |
|:--|:--|:--|
| `--background` | `#FFFFFF` | Base surface |
| `--foreground` | `#171717` | Primary text |
| `--border-color` | `#E5EDF5` | Default border on all elements |
| Indigo | `#5B4FE8` | Primary actions, links |
| Violet-blue | `#7C6CFF` | Logo & ribbon gradient |
| Teal | `#22D3B8` | Signature accent |
| Slate | `#3F3F52` | Secondary text |

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

**`Navbar.tsx`**
Fully transparent, `position: absolute` navbar meant to sit over the hero. Rendered once in `layout.tsx` so it persists across every page.

**`Hero.tsx`**
Opening section with a stat line, a two-tone display headline, primary/secondary CTAs, and a trusted-by strip. Includes an SVG ribbon built from the same four shapes as the logo mark — mirrored for RTL flow.

<br>

## Roadmap

- [ ] Remaining landing sections (subjects, testimonials, pricing)
- [ ] Footer
- [ ] Scroll-aware navbar (background/border fade-in past the hero)
- [ ] Mobile layouts for all sections

<br>

<div align="center">

*Built for Rawi Academy — راوي*

</div>