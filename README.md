# Fable 5 — Interactive Field Guide

An interactive website that explains Claude Fable 5: what it can do, how to
use it effectively, ways to build income on it, and creative use cases.

## Tech stack

- **React 19 + TypeScript** (strict) on **Vite 6**
- **Tailwind CSS v4** for styling, with a custom design-token theme
- **Framer Motion** — scroll-linked progress bar, spring counters, reveal
  animations, animated tabs/accordion/quiz transitions
- **Three.js via @react-three/fiber** — the hero's mouse-reactive spiral
  galaxy of 4,200 additive-blended particles

## Develop

```sh
npm install
npm run dev      # local dev server with HMR
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

## What's inside

- **Hero** — WebGL particle galaxy with parallax, spring-animated stat counters
- **Capabilities** — what Fable 5 is actually good at
- **Under the Hood** — tabbed deep-dive: always-on thinking, an interactive
  effort dial, the new tokenizer, safety/refusal handling, and a live cost calculator
- **Playbook** — 8 effectiveness habits with copy-paste prompt snippets
- **Earn** — six business models with honest difficulty ratings and unit-economics guidance
- **Create** — creative use cases unlocked by 1M context, sub-agents, and memory
- **Quiz** — 5-question knowledge check

Model facts (pricing, context window, API behavior) reflect Anthropic
documentation as of mid-2026 — verify before building on them.
