@AGENTS.md

# MDR landing — project context

Premium landing page for a fictional drone brand "MDR" (portfolio project):
a Next.js App Router front end with a pre-order and newsletter back end.

## Working rules

- After every change run `npm run lint`, `npx tsc --noEmit` and
  `npm run build`, and fix all errors and warnings.
- The conventions in this file win over the project skills
  (`nextjs-architecture`, `responsive-tailwind`, `styling-tailwind-scss`)
  where they conflict: `src/` layout, API route handlers, react-hook-form +
  zod.
- No new colors or fonts: reuse the tokens below. Mobile-first Tailwind,
  SCSS modules only for complex styles (masks, container queries, keyframes).
- Code style: load and follow the `code-style` skill before writing or
  editing any code, styles or agent files. It has no exceptions and wins over
  the other project skills where they conflict.
- Code and UI copy in English. No code comments (only `.env.example` may have
  them).
- Fictional brand: no real brand logos and no real people's names.
- Every environment variable is optional: without it the app still runs and
  logs the payload to the server console instead of failing. Never hardcode
  secrets.
- No developer notices: nothing addressed to developers is rendered in the UI
  (no "Dev:" notes, no `NODE_ENV` branches in components), API responses do
  not expose which environment variables are set, and the server prints no
  custom warnings such as "X is not set". The console keeps only the fallback
  payload logs (`[mdr] Pre-order (not saved)`, `Subscriber (not saved)`,
  `Confirmation email (not sent)`) and `console.error` for real failures.

## Stack & versions

Next.js 16.3.8 (App Router, Turbopack), React 19, Tailwind v4, TypeScript.
Installed: `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`,
`server-only`, `sass`, `react-hook-form`, `zod` 4, `@hookform/resolvers`,
`resend`, `mongoose` 9 (MongoDB).

## Structure

Folder rule (full text in `code-style` section 2): every component is a
PascalCase folder with a single `index.tsx` plus its own `types.ts`,
`styles.module.scss` and kebab-case helpers. Import by folder:
`@/components/ui/Button`. Nothing that belongs to one component or module
lies outside its folder.

- `src/app/` — `layout.tsx` (Vela Sans via `next/font/local`, `metadata` with
  `metadataBase` / Open Graph / Twitter, `viewport`), `page.tsx` (composition
  only), `globals.css` (Tailwind + tokens), `opengraph-image.tsx` (1200 × 630,
  generated with `next/og`; also used as the Twitter image), `icon.tsx` (32px)
  and `apple-icon.tsx` (180px) built by `createBrandIconResponse`,
  `favicon.ico` (16/32/48, made from the generated icon), `robots.ts`
  (disallows `/api/`), `sitemap.ts`
- `src/types/` — shared domain types, one file per domain: `models.ts`
  (`ModelId`, `ModelSpecs`, `DroneModel`, `ModelsResponse`,
  `ModelImageAvailability`), `preorder.ts` (`PreorderInput` inferred from the
  zod schema, `PreorderField`, `PreorderFieldErrors`, `PreorderResponse`,
  `PreorderConfirmation`), `specs.ts` (`SpecRow`),
  `navigation.ts`, `features.ts`, `testimonials.ts`, `faq.ts`, `images.ts`
  (`ImageSize` for the metadata image files), `footer.ts`
  (`FooterLinkGroup`, `SocialIcon`, `SocialLink`), `newsletter.ts`
  (`NewsletterInput` inferred from the zod schema, `NewsletterResponse`,
  `NewsletterSubscriptionStatus`), `react.ts` (`EffectCleanup` return type
  for `useEffect`). Every component and module
  folder keeps its own types in a local `types.ts`
- `src/components/layout/Header/` — `index.tsx` (server),
  `MobileMenu/index.tsx` (client)
- `src/components/layout/Footer/` — `index.tsx` (server, `id="footer"`,
  rendered in `page.tsx` after `<main>`; left: logo, tagline, contact email,
  newsletter; right: `nav` with 3 columns; bottom row: copyright + social
  icons), `FooterColumn/` (title + `ul`), `ModelPreorderLink/` (client text
  link that preselects a model, same behaviour as `ui/PreorderLink`),
  `NewsletterForm/` (client: react-hook-form + zodResolver, `role="status"`
  confirmation for new and duplicate emails, `role="alert"` for errors),
  `SocialLinks/` (generic lucide icons mapped by key — lucide 1.x has no
  brand icons and the project uses no real logos),
  `footer-link-class-names.ts`. Data in `src/data/footer.ts`
- `src/components/providers/MotionProvider/` — `MotionConfig
  reducedMotion="user"` in `layout.tsx` (global prefers-reduced-motion)
- `src/components/ui/` — one folder per component: `Button`
  (`button-class-names.ts` → `getButtonClassNames`, `ButtonVariant` in its
  `types.ts`), `ButtonLink` (variants `accent` | `light` | `outline`, reuses
  `Button/button-class-names`), `Logo`, `Container` (1200px + gutters),
  `SectionHeading` (eyebrow/title/description), `Card` (`bg-glass/40`,
  `border-glass`, `rounded-card`), `Reveal` (client, whileInView fade-up,
  `delaySeconds`, `as="li"`), `CountUp` (client, invisible copy reserves width
  → no CLS; pair with an `sr-only` value), `Tabs` (client, WAI-ARIA tabs,
  roving tabindex, `layoutId` pill indicator; `getTabId` / `getTabPanelId` in
  `Tabs/tab-ids.ts`), `PreorderLink` (client CTA that preselects a model),
  `DronePlaceholder` (outlined title when a drone photo is missing),
  `Accordion` (client, WAI-ARIA accordion: `h3 > button` with
  `aria-expanded` / `aria-controls`, panels `role="region"`, one item open at
  a time and collapsible, ArrowUp/ArrowDown/Home/End move focus between
  headers; ids in `Accordion/accordion-ids.ts`; open/close animated with
  `grid-template-rows` 0fr → 1fr in its `styles.module.scss`, closed panels
  stay in the DOM with `visibility: hidden`, so answers are in the HTML and
  not focusable)
- `src/components/ui/form/` — form primitives: `Field` (label/hint/error;
  `Field/field-ids.ts` → `getFieldHintId`, `getFieldErrorId`,
  `getDescribedByIds`), `Input` (pill), `Textarea` (rounded-card), `Select`
  (native + chevron, option background in its `styles.module.scss`), `Stepper`
  (number input with −/+ and live region, spin buttons hidden in its
  `styles.module.scss`), `HoneypotField` (off-screen `website` input shared
  by both forms), `form-control-class-names.ts` (shared by `Input`,
  `Select`, `Textarea`). Error state = `border-fg` + icon (no red: no new
  colors)
- `src/components/sections/Features/` — `index.tsx`, `FeatureCard/` (lucide
  icons mapped by key; data in `src/data/features.ts`, numbers derived from
  the ultra-light model specs)
- `src/components/sections/Hero/` — `index.tsx` (server, checks which drone
  images exist), `HeroSlider/` (client: state, keyboard, swipe, parallax;
  module with `.hero` container and `.thumbnails`), `HeroStage/` (module with
  `.stage`, `.ellipse`), `HeroHeading/`, `ModelList/`, `SlideControls/`
  (module with `.controls`), `GalleryThumbnails/`
- `src/components/sections/Specs/` — `index.tsx` (server, `getModels()`),
  `SpecsExplorer/` (client: active model state), `ModelPreview/` (image,
  price, "Pre-order now"), `SpecsTable/` (real `<table>`; md+ all columns with
  the active one highlighted, phones only the active column)
- `src/components/sections/Testimonials/` — `index.tsx` (server),
  `TestimonialCard/` (stars with sr-only rating,
  figure/blockquote/figcaption, initials avatar), `TestimonialsSlider/`
  (client: native scroll-snap slider below lg with dot buttons, active dot
  computed from scroll position; 3-column grid on lg+; scrollbar hidden in its
  `styles.module.scss`). Revealed as one block — per-card `Reveal` would stay
  hidden off-screen inside the horizontal scroller. Data in
  `src/data/testimonials.ts`
- `src/components/sections/Preorder/` — `index.tsx` (server, `id="preorder"`,
  left: heading/perks/Unsplash image, right: form card), `types.ts`
  (`PreorderReceipt`, shared by both sub-components), `PreorderForm/` (client:
  react-hook-form + zodResolver, model synced from
  `useSyncExternalStore(subscribePreorderModel…)`, select writes back via
  `setPreorderModel`, honeypot read from the submit event, server `fieldErrors` →
  `setError`), `PreorderSuccess/` (focuses heading)
- `src/components/sections/Faq/` — `index.tsx` (server, `id="faq"`; left:
  heading + outline "Contact us" → `#footer`, right: `Accordion` with the
  first item open; 12-column grid on lg+). Data in `src/data/faq.ts`
  (`FaqItem` in `src/types/faq.ts`)
- `src/app/api/models/route.ts` — GET /api/models (`force-static`)
- `src/app/api/preorders/route.ts` — POST: rate limit (5/10 min per IP) →
  JSON → honeypot (fake 200 so bots do not learn to skip the field) →
  `preorderSchema` (422 + fieldErrors) → `savePreorderRecord` (MongoDB) or
  console log → email via
  `after()` so the user does not wait on Resend. Response type
  `PreorderResponse`
- `src/app/api/newsletter/route.ts` — POST: rate limit (5/10 min per IP) →
  JSON → honeypot (fake 201) → `newsletterSchema` (422 + message) →
  `saveSubscriberRecord`: `saved` → 201, `duplicate` → 200 with
  `status: "already-subscribed"`, `not-configured` → console log + 201; database error → 500. Response type `NewsletterResponse`
- `src/lib/` — folders only, one per module:
  - `class-names/merge-class-names.ts` — `mergeClassNames` built on
    `extendTailwindMerge`
  - `models/models.ts` — server-only `getModels()` (shared by the API route
    and Server Components — Next docs: don't fetch own Route Handlers from
    Server Components, the build has no server) and
    `getModelImageAvailability`
  - `public-assets/public-assets.ts` — `checkPublicAssetExists` (server-only)
  - `preorder-selection/preorder-selection.ts` (+ `types.ts`) — pre-order
    model selection: stored in `?model=<id>` (shareable, works without JS via
    `?model=x#preorder` links), `getPreorderHref`, `getPreorderModel` /
    `getServerPreorderModel` / `subscribePreorderModel` (for
    `useSyncExternalStore` in the form), `selectPreorderModel` (replaceState +
    notify + scroll/focus `#preorder`), `PREORDER_ANCHOR`
  - `validation/preorder.ts` — shared zod schema + limits,
    `preorderFieldNames`; `validation/newsletter.ts` — `newsletterSchema`
    (email trimmed and lowercased, so duplicates match regardless of case),
    `EMAIL_MAX_LENGTH`
  - `honeypot/honeypot.ts` — `HONEYPOT_FIELD` (kept out of the zod schemas on
    purpose), `isHoneypotFilled` (routes), `readHoneypotValue` (forms, reads
    the submit event)
  - `server/environment/environment.ts` (`readOptionalEnvironmentVariable`:
    trimmed value, or `undefined` when missing or empty), `server/database/database.ts`
    (`connectToDatabase()` → `false` when `MONGODB_URI` is missing, otherwise
    awaits one cached `mongoose.connect` promise; 5s server selection timeout
    so a dead database answers 500 quickly),
    `server/preorder-records/preorder-records.ts` + `types.ts` (Mongoose model
    `PreOrder` → collection `preorders`; `savePreorderRecord` returns the
    ObjectId string, or `null` when the database is not configured;
    `PreorderRecord`), `server/subscriber-records/subscriber-records.ts` +
    `types.ts` (Mongoose model `Subscriber`, unique `email` → collection
    `subscribers`; `saveSubscriberRecord` returns `saved` | `duplicate` |
    `not-configured`, awaits `Model.init()` first so the unique index exists
    before the first insert, duplicate = Mongo error code 11000),
    `server/email/email.ts` + `types.ts` (Resend confirmation, `RESEND_FROM`
    optional, default sender works without a verified domain),
    `server/rate-limit/rate-limit.ts` + `types.ts` (`createRateLimiter`,
    `getClientIpAddress`; in-memory and per server instance, so best-effort
    on serverless), `server/site-url/site-url.ts` (`getSiteUrl`: `SITE_URL` →
    `VERCEL_PROJECT_PRODUCTION_URL` → `http://localhost:3000`; used by
    `metadataBase`, robots and sitemap), `server/brand-images/brand-images.tsx`
    + `types.ts` (`next/og` helpers: `brandColors` mirroring the tokens,
    `readBrandFont`, `readPublicImageDataUrl`, `createBrandIconResponse`)
- `src/data/models.ts` — single source of model data: ids `heavy` |
  `ultra-light` | `superfast`, `shortName`, `specs` (maxSpeedKmh,
  flightTimeMin, rangeKm, camera, weightG, priceUsd), `galleryCount`,
  `defaultModelId`, `modelIds`, `isModelId`, `findModelById` (throws on an
  unknown id), `findModelInList` (falls back to the first model)
- `src/data/specs.ts` — `specRows` (label + formatter), `formatPrice`
- `src/data/site.ts` — `SITE_NAME`, `SITE_TITLE`, `SITE_DESCRIPTION` and the
  social image copy
- `src/data/footer.ts` — `CONTACT_EMAIL` (`hello@mdr.example`),
  `FOOTER_TAGLINE`, `COPYRIGHT_NOTICE`, `compareModelsLink`,
  `footerLinkGroups` (Company, Support; the Products column is built from
  `models`), `socialLinks`
- `src/data/navigation.ts` — `mainNavigationLinks` (anchors `#specs`,
  `#features`, `#footer`), `heroGalleryThumbnails`
- `src/styles/` — SCSS partials loaded by name (`sassOptions.loadPaths` =
  `src/styles`): `_breakpoints.scss` (`$breakpoint-small|medium|large|
  extra-large|double-extra-large` mirroring Tailwind, `@use "breakpoints" as
  *`), `_landscape-stage.scss` (`landscape-stage` mixin shared by the hero
  modules, `@use "landscape-stage" as *`)
- `src/fonts/` — Vela Sans 300/400/500/800 as woff2 (used by
  `next/font/local`), plus Light and ExtraBold as ttf for `next/og` (satori
  cannot read woff2)
- `public/drones/ultra-light.png` (from Figma); `heavy.png` and
  `superfast.png` are missing on purpose → styled placeholder is rendered
- `public/hero/` — `thumb-1.jpg`, `thumb-2.jpg`, `ellipse.svg`
- `docs/screenshots/` — README screenshots, kept out of `public/` so they are
  not deployed: `desktop.png` (hero, 1440 × 900), `mobile.png` (hero,
  390 × 844 at 2x), `features.png`, `specs.png`, `preorder.png` (1440 × 900).
  Retake them after visual changes to these sections

## Design tokens (`@theme static` in `src/app/globals.css`, no tailwind.config)

- Colors: `bg` #000, `fg` #fff, `muted` white/50, `subtle` white/20,
  `glass` white/10, `accent` #2649e5, `accent-hover` #3a5bf0,
  `control` #d9d9d9
- Text: `display` 64px, `title` 48px (section h2), `stat` 56px (big numbers),
  `lead` 20px, `nav` 16px, `button` 14px; `tracking-logo`, `tracking-eyebrow`
  (uppercase labels). Font: Vela Sans (`font-sans`, h2 uses `font-light`)
- Radius: `thumb` 6px, `card` 24px, `pill`
- Section rhythm: `py-24 md:py-32 lg:py-40`; card surface = `bg-glass/40`
  (no separate surface color)
- Spacing: `gutter` 40px, `control` 62px, `thumb` 79px
- Container: `max-w-page` 1200px

## Gotchas

- Any new custom `text-*`, `rounded-*`, `tracking-*` token must also be added
  to `extendTailwindMerge` in `src/lib/class-names/merge-class-names.ts`,
  otherwise `mergeClassNames` drops it as a conflict (e.g. `text-button` vs `text-fg`).
- `@theme static` is required so tokens used only in SCSS are emitted.
- `@source not "../../.claude"` in `globals.css` is required: otherwise
  Tailwind scans skill markdown and the build fails.
- `next/image`: `priority` is deprecated. The hero image uses
  `loading="eager"` + `fetchPriority="high"` (the Next docs prefer it over
  `preload`, and the two must not be combined). `remotePatterns` for
  `images.unsplash.com` is already configured.
- Metadata image files (`icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`)
  export `size`, `contentType`, `alt` and the default from the single export
  list; the build picks them up. They are prerendered at build time, so they
  may read `src/fonts` and `public` from disk.
- `next/og` (satori): every element with more than one child needs
  `display: "flex"`, colors are literal values (no CSS variables), fonts must
  be ttf/otf/woff.
- New font weights: convert ttf to woff2 with fontTools + brotli
  (`font.flavor = "woff2"`).
- Hero switches layout by aspect ratio, not width: container query
  `(min-aspect-ratio: 1/1) and (min-width: 48rem)` in
  `src/styles/_landscape-stage.scss` (`landscape-stage` mixin); the container
  is `.hero` in `Hero/HeroSlider/styles.module.scss`. The stage keeps the 1440 × 900 Figma frame ratio,
  so the ellipse and controls are positioned as fractions of 1440 and 900.
- The outline button uses `px-[23px] py-[11px]`: the 1px border replaces 1px
  of padding so outline and filled buttons have the same size.
- Exports: one `export { ... }` (or `export type { ... }`) at the end of every
  file. Route segment config (`dynamic` in `src/app/api/models/route.ts`) must
  stay `export const` — from a list the build fails with "It mustn't be
  reexported" — so it sits at the end of the file, right above the export list.
  `metadata` + default export work as `export { metadata, RootLayout as default }`.
- `/hero/ellipse.svg` is rendered with `next/image` and `unoptimized` (no
  `<img>`, so no eslint-disable comment is needed).
- Mongoose: no migrations and no generate step — collections and indexes are
  created on first use (`autoIndex`). Models are registered as
  `mongoose.models[name] ?? mongoose.model(name, schema)` because several
  route bundles (and dev hot reload) evaluate the module more than once.
  Import the default export (`import mongoose from "mongoose"`); Next
  externalizes the package on the server by default. Zod stays the only
  validation layer, Mongoose schemas only describe the stored shape.
- Local check of the database path: `mongod --dbpath <dir> --port 27123`, then
  `MONGODB_URI="mongodb://127.0.0.1:27123/mdr-test" npx next start -p 3123`.
- In-memory rate limit persists while `next start` runs: restart the server
  between repeated manual form tests (limit 5 per 10 min). Each route has its
  own limiter.
- The newsletter `role="status"` container is always rendered (empty until a
  confirmation arrives) so screen readers announce the message.
- Accordion panel padding lives on a wrapper inside `.panelContent`: padding
  on the `overflow: hidden` grid child itself would stay visible at `0fr`.
  The CSS transition has its own `prefers-reduced-motion` rule because
  `MotionProvider` only covers framer-motion.
- `react-hooks/refs` lint flags refs used inside `handleSubmit(submitPreorder)`;
  read extra form values from the submit event instead.
- Drone image availability is checked at build time → rebuild after adding
  images to `public/drones/`.
