# AGENTS.md

Single-package Next.js 16 (App Router) app. Not a monorepo — no workspace config, no test suite, no CI.

## Commands

- Dev server: `npm run dev` (Turbopack)
- Lint: `npm run lint` — **currently fails on pre-existing errors** in generated shadcn code (`src/components/ui/carousel.tsx`, `src/hooks/use-mobile.ts`, rule `react-hooks/set-state-in-effect`) plus an unused `Image` import warning in `src/app/page.tsx`. Don't assume you broke it; only fix them if asked.
- Typecheck: no script exists — run `npx tsc --noEmit` (passes on a clean tree).
- No test runner is configured. Don't invent `npm test`.
- Verification order when changing code: `npx tsc --noEmit` → `npm run lint` → `npm run build`.

## Architecture

- App Router lives entirely under `src/app/` (`page.tsx` is the homepage; `layout.tsx` sets the root layout and metadata). UI code is `src/components/`, hooks in `src/hooks/`, helpers in `src/lib/`.
- Path alias: `@/*` → `./src/*` (tsconfig `paths`).
- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler` (Babel React Compiler). `cacheComponents: true` changes caching/Dynamic IO semantics — check the Next 16 docs before assuming fetch/`use cache` behavior.

## shadcn / UI conventions

- shadcn is configured via `components.json`: style `base-nova`, **primitives are `@base-ui/react`, not Radix** — don't swap in Radix imports.
- Add components with `npx shadcn add <name>`; hand-editing generated files under `src/components/ui/` will be overwritten.
- `cn` is imported from the `cn` package directly (`import { cn } from "cn"`); `src/lib/utils.ts` only re-exports it. Follow whichever pattern neighboring files use.
- Tailwind v4 (CSS-first, no `tailwind.config`); theme tokens are in `src/app/globals.css`. New colors/styles go there, not in a config file.

## Git

- Tree is currently dirty (new `src/components/`, `src/hooks/`, `src/lib/` untracked; `package.json`/`src/app/*` modified). Commit the `AGENTS.md` marker block below with your work rather than deleting it.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
