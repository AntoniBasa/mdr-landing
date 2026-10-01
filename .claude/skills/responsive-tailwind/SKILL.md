---
name: responsive-tailwind
description: Responsive layout expert for Tailwind CSS (mobile-first). Use when building sections and components, turning a Figma design into code, and checking that the interface looks correct on phones, tablets and desktop.
---

# Responsive layout expert (Tailwind)

You are a responsive layout expert. Every component you build must look correct
at widths from 360px to 1920px.

## 1. Mobile-first

- Classes without a prefix are the mobile version. The prefixes `sm:`, `md:`,
  `lg:`, `xl:`, `2xl:` add styles **from** that width upwards.
- Build the mobile layout first, then expand it: `flex-col md:flex-row`, not
  the other way round.
- Use `max-*:` variants only in rare cases where anything else is more
  complicated.
- Default Tailwind breakpoints: sm 640, md 768, lg 1024, xl 1280, 2xl 1536. Add
  new breakpoints only through `@theme` in `globals.css`, and only when the
  design requires it.

## 2. When Figma has only a desktop design

If the design has no mobile version, do not invent a design; adapt logically:
columns stack into one, horizontal rows become vertical, the menu becomes a
burger, spacing and font sizes shrink. List in your reply which mobile
decisions you made yourself.

## 3. Container and grid

- A single `Container` component (`mx-auto w-full max-w-7xl px-4 sm:px-6
  lg:px-8` or the values from the design). Do not repeat these classes by hand
  in every section.
- Grids: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`. For an unknown
  number of cards use `grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]`.
- Flex rows that may not fit use `flex-wrap` and `gap`, not margins on the
  children.
- For components that appear in places of different widths, use container
  queries (`@container` on the parent, `@md:` and so on on the children)
  instead of screen breakpoints.

## 4. Sizes and typography

- No fixed block widths (`w-[600px]`). Use `w-full` + `max-w-*`, fractions,
  `min()` / `clamp()`.
- Headings scale: `text-3xl md:text-5xl lg:text-6xl`, or fluidly through
  `clamp()` in theme tokens.
- Line length is limited: `max-w-prose` or `max-w-[60ch]`.
- Long words and links do not break the layout: `break-words`, and `min-w-0`
  on flex children that contain text.
- Section padding shrinks on mobile: `py-12 md:py-20 lg:py-28`.
- First-screen height through `min-h-svh` / `min-h-dvh`, not `h-screen`
  (`100vh` jumps in mobile browsers).

## 5. Images and media

- `next/image` with a correct `sizes` for the grid, for example
  `sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"`.
- Images with `fill` sit inside a parent with `relative` and a set `aspect-*`.
- Different images for mobile and desktop go through `<picture>` /
  `getImageProps`, or `hidden md:block` when the element is decorative.

## 6. Navigation and interaction

- The mobile menu is a burger in a separate small client component. An open
  menu locks background scroll and closes on Escape and on a link click.
- Clickable elements on mobile are at least 44×44px.
- Do not rely on `hover:` alone; touch devices do not have it. Important
  information must not appear only on hover.
- Hide elements with `hidden md:flex` only when the content is really
  duplicated or decorative; do not hide important content on mobile.

## 7. Common mistakes to avoid

- Horizontal scroll on mobile (check absolutely positioned decorative
  elements, `w-screen`, negative margins). Do not cure it with
  `overflow-x-hidden` on `body`; find the cause.
- Text stuck to the screen edges (no `px` on the container).
- Buttons stretched across the whole desktop width, or tiny on mobile.
- Tables and wide blocks without an `overflow-x-auto` wrapper.

## 8. Check before "done"

Check the layout at these widths: **360, 390, 768, 1024, 1280, 1440** px. If
you have browser access, open the page and look; if not, walk through the
classes of every block and check each width mentally. In your reply, briefly
list how the component behaves on mobile, tablet and desktop.
