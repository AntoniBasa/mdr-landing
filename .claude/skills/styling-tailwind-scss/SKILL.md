---
name: styling-tailwind-scss
description: Styling rules for the project - Tailwind CSS for ordinary styles, CSS Modules in SCSS (*.module.scss) for complex selectors, animations and bulky styles. Use for any layout work and whenever component styles are added or changed.
---

# Styling: Tailwind + SCSS Modules

The project has two styling tools, each with its own area of responsibility.
The goal is clean, readable JSX without walls of classes and without hacks in
className strings. Syntax simplicity rules come from the `code-style` skill,
which wins wherever the two overlap.

## 1. When to use Tailwind

Tailwind is the main tool. Use it for:

- spacing, sizes, flex / grid layout;
- colors, typography, radii and shadows from theme tokens;
- simple states: `hover:`, `focus-visible:`, `active:`, `disabled:`;
- responsiveness through breakpoints (`md:`, `lg:`);
- simple component variants (primary / secondary buttons).

## 2. When to move styles into `*.module.scss`

Move styles into a module inside the component folder
(`Hero/index.tsx` → `Hero/styles.module.scss`) when at least one of these applies:

- **Complex selectors**: `:nth-child()`, `:has()`, `:not()`, the combinators
  `>`, `+`, `~`, styling nested elements you do not control directly (content
  from a CMS or markdown).
- **Pseudo-elements with logic**: decorative `::before` / `::after` with
  positioning, gradients, masks.
- **Animations**: `@keyframes`, multi-step transitions, `animation-delay` for
  staggered appearance.
- **Non-standard properties**: `clip-path`, `mask`, complex multi-layer
  `background`, combined `backdrop-filter`.
- **Arbitrary values and variants**: any arbitrary variant such as
  `[&>li]:...`, or more than two bracketed values in one className
  (`w-[347px]`, `bg-[url(...)]`), is a signal to move the styling into a
  module.
- **Length**: when one element has more than ~12–15 classes that cannot be
  reasonably shortened, move the complex part into a module.
- **Styling third-party components** (sliders, libraries) through
  `:global(...)` inside a module.

## 3. How to combine them

- One element can mix both: layout and spacing through Tailwind, the complex
  part through a module:
  ```tsx
  import styles from "./styles.module.scss";

  <section className={mergeClassNames("relative py-16 md:py-24", styles.hero)}>
  ```
- Join classes with the `mergeClassNames` helper from
  `lib/class-names/merge-class-names.ts` (clsx + tailwind-merge). Do not build className
  with template strings and conditions.
- In modules use theme tokens through the CSS variables Tailwind generates
  (`var(--color-accent)`, `var(--spacing)`, `var(--radius-card)` and so on),
  not hardcoded colors and sizes. This keeps the design consistent.
- Breakpoints in modules must match the Tailwind breakpoints. They are defined
  once as variables in `styles/_breakpoints.scss` (`$breakpoint-small`,
  `$breakpoint-medium`, `$breakpoint-large`, ...); write
  `@media (min-width: $breakpoint-medium)` and do not invent other widths.
- Do not use `@apply` inside `.module.scss`: Tailwind v4 is not designed to be
  processed together with preprocessors. When you need a token, take the CSS
  variable.
- `app/globals.css` stays plain CSS (Tailwind + `@theme`); do not convert it to
  SCSS.

## 4. Rules for SCSS modules

- One module per component, always named `styles.module.scss`, inside the
  component folder next to `index.tsx`. A module is never shared between
  components: each component styles its own elements in its own module.
- Class names in camelCase (`styles.cardGrid`), named by meaning, not by look
  (`.featuredCard`, not `.blueBox`).
- Nesting at most two levels deep.
- No global styles from modules, except a deliberate `:global()` for
  third-party libraries.
- No `!important`.
- Variables and mixins used by more than one module live in `styles/_*.scss`
  and are loaded with `@use` (`@use "breakpoints" as *`,
  `@use "landscape-stage" as *`).

## 5. Accessibility and motion

- Interactive elements always have a visible `focus-visible` state.
- Animations respect `prefers-reduced-motion`: in modules through
  `@media (prefers-reduced-motion: reduce)`, in Tailwind through
  `motion-safe:` / `motion-reduce:`.
- Animate `transform` and `opacity`, not `width` / `height` / `top`.

## 6. Checklist

- No className strings several screens long in JSX.
- No duplicated class sets; repetition is turned into a component.
- All colors, radii and fonts come from tokens, nothing is hardcoded.
- Every `.module.scss` is justified by one of the points in section 2.
