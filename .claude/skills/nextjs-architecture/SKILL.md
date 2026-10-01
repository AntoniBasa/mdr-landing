---
name: nextjs-architecture
description: Next.js App Router expert. Use when creating pages, layouts, components and forms, when working with data, metadata and project structure, so the architecture follows the official Next.js documentation and components are split correctly.
---

# Next.js architecture expert

You are a senior Next.js (App Router) + TypeScript developer. Write code the
way the official documentation recommends, with a clean structure and correctly
separated components. Code style (naming, typing, comments, syntax) is defined
by the `code-style` skill, which wins wherever the two overlap.

## 0. Documentation first

- Read `AGENTS.md` in the project root and follow it.
- The Next.js API changes between versions. If you are not sure an API, prop or
  file convention is current, check the documentation for the installed version
  (see `package.json`) instead of relying on memory.

## 1. Project structure

```
app/
  layout.tsx          root layout: fonts, metadata, <html>/<body>
  page.tsx            only composes the page from sections
  globals.css         Tailwind + theme tokens
  not-found.tsx
components/
  ui/                 reusable base components, one folder each:
    Button/             index.tsx, types.ts, button-class-names.ts
    form/Input/         index.tsx, types.ts
  layout/
    Header/             index.tsx
      MobileMenu/       index.tsx, types.ts
  sections/
    Hero/               index.tsx (the section)
      HeroSlider/       index.tsx, types.ts, styles.module.scss
lib/                  utilities, server code, zod schemas; one folder per module
content/              copy, card arrays, navigation: data kept apart from markup
types/                shared types
public/               static files
```

- Every component is a PascalCase folder with a single `index.tsx`; its
  types, styles and helpers live in that folder. The full rules are in
  section 2 of the `code-style` skill.
- `page.tsx` contains composition only: `<Hero /> <Features /> ...`, no long
  markup.
- A component needed by a single section lives in a subfolder of that
  section: `components/sections/Pricing/PricingCard/index.tsx`.
- Import through the `@/` alias, never `../`. `./` is only for files in the
  same folder and for a component's own subfolders (`./HeroSlider`).

## 2. Splitting into components

- One component, one responsibility. A file over ~150 lines or with more than
  one logical block gets split.
- Repeated markup (cards, list items) becomes a separate component plus a data
  array plus `.map()` with a correct `key`.
- Base elements (button, container, section heading) are never copy-pasted;
  use `components/ui`.
- PascalCase for components and component folders, one component per folder
  in `index.tsx`. Named
  exports for components; a default export only where Next.js requires it
  (`page`, `layout`, `error`, `not-found` and so on).
- Props are typed with a named `<ComponentName>Props` type that lives in the
  component folder's `types.ts`. `any` is forbidden. Wrappers accept
  `children: ReactNode`; buttons and links extend native attributes
  (`ComponentProps<"button">`).
- Copy and data are not hardcoded in section JSX; they live in the data folder.

## 3. Server and Client Components

- Everything is a Server Component by default.
- `"use client"` only on leaf components that really need state, effects,
  event handlers or a browser API.
- Never make a whole section or page a client component for the sake of one
  button. Move the interactive part into a small client component (for example
  `MobileMenuToggle`) and keep the section on the server.
- Pass server content into client components through `children` or props, not
  by importing it inside the client file.
- Secrets and server logic never reach client components.

## 4. Data and forms

- Fetch data in Server Components (async components), not through `useEffect`.
- Forms use Server Actions (`lib/actions/*.ts` with `"use server"`), server
  validation with zod and form state through `useActionState`. Client
  validation is an addition, not a replacement.
- Secrets live only in `.env.local` and only on the server. Only
  `NEXT_PUBLIC_*` variables reach the client, and only when necessary.

## 5. Metadata, SEO and semantics

- `export const metadata` (or `generateMetadata`) in `layout.tsx` / `page.tsx`:
  title, description, Open Graph, `metadataBase`.
- One `<h1>` per page, heading levels without gaps.
- Semantics: `header`, `nav`, `main`, `section` with a heading, `footer`;
  `button` for actions, `Link` / `a` for navigation.

## 6. Assets and performance

- Images only through `next/image` with `width` / `height` or `fill` + `sizes`.
  Load the first-screen (LCP) image with priority; check the current prop in the
  documentation of the installed version.
- Fonts through `next/font` in the root layout, connected with a CSS variable.
- Internal links through `next/link`.
- Heavy client components that are not needed immediately go through
  `next/dynamic`.

## 7. Special files

Use App Router conventions where they fit: `loading.tsx`, `error.tsx` (client),
`not-found.tsx`.

## 8. Working from a Figma design

- Get the design context from a link to a specific frame, then map it to the
  existing components and tokens. Reuse, do not create duplicates.
- Colors, fonts, radii and shadows from the design go into theme tokens, not
  hardcoded into components.
- Build large screens section by section, one at a time.

## 9. Before saying "done"

- `npm run lint` has no errors.
- `npx tsc --noEmit` has no errors.
- `npm run build` passes.
- No `any`, unused imports, `console.log` or commented-out code.
- Briefly describe which components you created and why each one is a server
  or a client component.
