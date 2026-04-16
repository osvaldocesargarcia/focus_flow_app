# FocusFlow

A task management + Pomodoro focus timer app built as a Frontend Developer technical challenge.

> **GITHUB PAGES URL**  — [https://osvaldocesargarcia.github.io/focus_flow_app/#/](https://osvaldocesargarcia.github.io/focus_flow_app/#/)

> GITHUB - [https://github.com/osvaldocesargarcia/focus_flow_app/tree/main](https://github.com/osvaldocesargarcia/focus_flow_app/tree/main)

![IMG](doc/images/FocusFlow_visual_selection.png)

---

## Overview

FocusFlow combines a full task management board with a Pomodoro timer so you can manage what needs to get done and stay focused while doing it. Start a focus session directly from any task — the timer launches, the task moves to *in-progress*, and its name appears above the countdown ring so you always know what you're working on.

---

## Mandatory Features Checklist

| Requirement | Implementation |
|---|---|
| **Mobile-First** | Layout built mobile-first; bottom nav + slide-up panels on mobile, 3-column grid on desktop |
| **CRUD** | Full create / edit / delete with title, description, priority and status |
| **Filters** | Status filter tabs (All / To Do / In Progress / Done) + live search by title or description |
| **Multilingual** | EN / PT toggle via a built-in `I18nService`; preference persisted to `localStorage` |
| **Dark Mode** | CSS variable cascade with `.dark` class; theme persisted to `localStorage` |
| **Persistence** | Tasks and scratchpad notes survive page refresh via `localStorage` |
| **Angular 18+** | Built on Angular 21 with standalone components and Signals |
| **Tailwind CSS** | Tailwind CSS v4 with `@tailwindcss/postcss` |

---

## Features

- **Task management** — Create, edit, and delete tasks with title, description, priority (high / medium / low) and status (todo / in-progress / done)
- **Task search & filter** — Live search by title or description; filter by status via tab bar
- **Pomodoro timer** — Focus (25 min), short break (5 min) and long break (15 min) modes with an animated SVG progress ring
- **Task → Timer link** — Play button on any task starts the Pomodoro, sets that task as *in-progress*, and shows its name above the timer ring. Only one task can be active at a time
- **Session tracking** — Dot indicators track completed focus sessions (4 per cycle)
- **Spotify integration** — Embedded Spotify player for focus music; audio keeps playing even when the panel is closed on mobile
- **Scratchpad** — Quick notes panel for capturing distracting thoughts mid-session
- **Dark / light mode** — One-click toggle with CSS variable cascade; dark-first design
- **Bilingual UI** — Full EN / PT translation via a custom `I18nService`
- **Browser notifications** — Native alerts when a focus or break session ends
- **Responsive layout** — Three-column desktop view (tasks | timer | music + notes); mobile view with sticky bottom navigation and slide-up panels

---

## Technical Decisions

### Angular Signals (no NgRx, no RxJS)
Signals (introduced in Angular 16, stable in 17+) are the current Angular-recommended primitive for reactive local state. They eliminate zone.js overhead, produce zero boilerplate compared to NgRx, and keep the data flow easy to follow. Every piece of shared state (`tasks`, `filter`, `timer mode`, `language`, `theme`) lives in a signal inside its corresponding service — components inject the service and read the signal directly in the template.

### Standalone components
Every component is standalone (`standalone: true`). No `NgModule` declarations, no barrel files needed just to wire up a module.

### Tailwind CSS v4
Tailwind v4 removes the `tailwind.config.js` file in favour of CSS-first configuration (`@theme` block in `styles.css`). Design tokens (colors, typography) live alongside the global styles — one source of truth, no JS config to maintain.

### Custom i18n (no `@angular/localize`)
`@angular/localize` is designed for build-time locale switching and compiled output per locale. For a runtime toggle between two languages a simple `computed<Translations>()` signal keyed on the active language is faster to build, zero dependency, and covers the requirement exactly.

### `localStorage` for persistence
No backend is in scope. `localStorage` is synchronous, universally available, and sufficient for task data at this scale. The `TaskService` hydrates on construction and writes on every mutation.

---

## Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Angular 21 — standalone + Signals | Current best practice; zero-boilerplate reactivity |
| Styling | Tailwind CSS v4 | CSS-first config; utility-first with design tokens |
| Language | TypeScript (strict) | End-to-end type safety; `any` avoided throughout |
| State | Angular Signals + `localStorage` | Lightweight, built-in, no extra dependencies |
| i18n | Custom `I18nService` | Runtime toggle; two locales only — no build-time tool needed |

---

## Architecture

![IMG](doc/images/FocusFlow_architecture.png)

```
src/app/
├── models/
│   └── task.model.ts          # Task, TaskStatus, TaskPriority types
├── services/
│   ├── task.service.ts        # CRUD, filters, localStorage persistence
│   ├── timer.service.ts       # Pomodoro logic, active task tracking
│   ├── i18n.service.ts        # EN / PT translations, language signal
│   └── theme.service.ts       # Dark / light mode toggle
├── components/
│   ├── timer/                 # SVG ring timer + mode tabs + controls
│   ├── task-list/             # Filter tabs, search bar, task grid
│   ├── task-item/             # Task card — play / edit / delete actions
│   ├── task-form/             # Create / edit modal
│   ├── scratchpad/            # Quick notes panel
│   └── spotify-player/        # Embedded Spotify widget
└── pages/
    ├── home/                  # Landing / marketing page
    └── app-page/              # 3-column desktop layout + mobile bottom nav
```

---

## Design

- **Visual style** — Glassmorphism: translucent cards with backdrop blur over a dark gradient base
- **Color palette** — Purple (`#4278ff`) + Cyan (`#06b6d4`) accents; full light mode variant
- **Typography** — Space Grotesk (headings) + Inter (body)
- **Motion** — SVG ring progress with `cubic-bezier` easing; fade-up entry animations; pulse on active task; slide-up mobile panels
- **Accessibility** — `aria-label`, `aria-pressed`, `aria-hidden` throughout; `:focus-visible` ring; reduced-motion media query respected

![IMG](doc/images/screenshot1.png)
![IMG](doc/images/screenshot3.png)
![IMG](doc/images/screenshot4.png)

---

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
ng serve
# → http://localhost:4200

# Production build
ng build
```
