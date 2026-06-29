# EduTrack

A mobile-first learning and quiz app for competitive exam preparation, built with SolidJS 2 + Capacitor 8.

## Features

- **Home Dashboard** — Overall stats, daily goal tracker, XP/level system, streak tracking, subject search
- **Course Browser** — Expandable unit/lesson trees with completion tracking per subject
- **Lesson Reader** — Full text reader with scroll-based progress bar, mark-as-read, daily goal sync
- **Quiz Engine** — Multi-step flow: intro screen → interactive questions → results with animated ring chart, grade/message, retry with best-score tracking, fallback question generator
- **Statistics** — Per-subject completion %, average quiz score, unit breakdown
- **Global Progress** — All subjects aggregated, today's activity, streak history
- **Subject Upload** — Create subjects manually or from pre-built templates (Medieval History, Indian Polity)

## Tech Stack

| Layer | Tech |
|---|---|
| UI | SolidJS 2 beta |
| Mobile | Capacitor 8 (Android APK built) |
| Build | Vite + vite-plus |
| CSS | Tailwind CSS v4 |
| Icons | Custom inline SVG (20 icons) |
| Routing | Custom hash-based SPA router |
| Persistence | localStorage |
| Types | TypeScript strict |

## Getting Started

```bash
pnpm install
pnpm dev
```

## Build Android APK

```bash
pnpm build:android
```

## Pages

- `/` — Dashboard
- `/learn` — Subject catalog
- `/course/:subjectId` — Unit/lesson tree
- `/lesson/:subjectId/:lessonId` — Lesson reader
- `/quiz/:subjectId/:lessonId` — Quiz engine
- `/stats/:subjectId` — Per-subject stats
- `/progress` — Global progress
- `/upload` — Create subjects

## Included Content

- Ancient History (1 unit, 9 lessons including 2 practice sheets with 24 questions each)
- Medieval History (template)
- Indian Polity (template)
