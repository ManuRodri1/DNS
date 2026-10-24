# DINAMICA II Startup Prize — DNS 2027

Technical implementation report · 24 October 2026

## Delivery status

- Work is on `feature/dinamica-ii-2027` in the existing `C:\Proyectos\DNS` checkout.
- Local preview: `http://localhost:3000/dinamica-ii` when running `npm run dev`.
- Public production access, application submission and indexing remain gated by server-side configuration.
- No production deployment was made. The Supabase migration was prepared but not applied.

## Page and content

The bilingual English/Spanish page uses the existing DNS header, footer, fonts and coral accent. Its bespoke photo-led sequence presents the prize first, followed by the DINAMICA II institutional lockup, eligibility, process, judging weights, application entry point, FAQ and partner CTA. Copy includes the Dominican market connection requirement, the one valid paid DNS ticket condition, ticket-purchase disclaimer, five judging criteria, prize amounts, finalist limit, and disclosed reinvestment/reporting condition.

The hero uses an existing Cloudinary event photo cropped to remove the old date and venue. The five institutional image URLs were checked and return HTTP 200. BCIE’s supplied logo has a navy mark on white; the EU JPEG has a checkerboard baked into the image. Those two are shown on a light surface; the EU asset still needs Sacha/Ivanna’s brand-owner approval.

The initial route does not appear in the sitemap and is disallowed in robots until `DINAMICA_PUBLIC_LAUNCH=true`. It has `noindex` metadata by default and returns not found in production before launch. The homepage banner component is mounted after `AttendeeSegments` and before `Tickets`, but remains disabled by `DINAMICA_HOME_PROMOTION_ENABLED=false` until communications approval. The normal DNS header and footer navigation were not changed.

## Application and data handling

The application has four bilingual steps: founder and ticket; startup and Dominican connection; exportability and assessment; representations and submission. It includes autosaved private drafts, server validation, required consent checkboxes, a one-time ticket token flow, ticket verification before final submission, a timestamped reference after successful submission, and an operator-only CSV export. The optional marketing opt-in is separate and unchecked by default. The form accepts a pitch-deck URL and does not upload or store pitch-deck files.

Applications use a dedicated Supabase project configuration, never the current DNS business database credentials:

- `DINAMICA_SUPABASE_URL`
- `DINAMICA_SUPABASE_SECRET_KEY`
- `DINAMICA_OPERATOR_TOKEN`
- `DINAMICA_PRIVACY_NOTICE_URL`
- `DINAMICA_PUBLIC_LAUNCH`
- `DINAMICA_APPLICATIONS_OPEN`
- `DINAMICA_PRIVACY_APPROVED`
- `DINAMICA_DUPLICATE_POLICY_APPROVED`

The `.env.example` documents these settings. Launch, form, privacy and duplicate-policy flags default to false. The submission form remains closed until these approvals and dedicated database settings are present.

No Stripe secret is configured and no ticket API integration exists in the workspace. As an operational fallback, DNS staff verify paid-ticket status directly in Stripe, then issue a short-lived token through a protected operator endpoint. The app validates and consumes that token once. This flow is operator-verified, not automatic Stripe verification. No real ticket verification or live application submission was performed.

The migration creates private application and draft tables, a hashed token store, rate-limit state and an atomic submit RPC. Tables are restricted to server-side service access; application rows contain founder/company contact details and must not be exposed to anonymous or authenticated browser clients. The receipt reports the actual database submission timestamp in America/Santo_Domingo time. No email provider is configured, so the receipt explicitly says there is no confirmation email.

The current DNS Supabase project is named “Unitipro” and is not wired to this feature. Its catalog reported `public.press_items` with RLS disabled. That unrelated table was not modified. Review the [Supabase Row Level Security guide](https://supabase.com/docs/guides/database/postgres/row-level-security) before any public access is enabled.

## Configuration required before launch

1. Create or designate a separate Supabase project for DINAMICA II, then apply `supabase/migrations/20261024171157_dinamica_ii_applications.sql` there and verify policies, RPC execution and retention.
2. Add a paid ticket verification integration or approve the documented manual Stripe verification procedure and train authorized operators.
3. Approve and publish the privacy notice, review the duplicate-matching rule in the operations guide, and set both approval flags.
4. Add production environment variables in the deployment environment, then test with a real paid ticket and approved operators before opening applications.
5. Set `DINAMICA_APPLICATIONS_OPEN=true` only when DNS is ready to accept and review submissions. Set `DINAMICA_PUBLIC_LAUNCH=true` only when the page is ready for public indexing.
6. Approve or replace the supplied EU logo asset. Do not claim confirmation email until a provider is configured and tested.

## Quality checks

- `npm run build`: passed after stopping the overlapping dev server; Next.js compiled the route and all six API handlers.
- `npm run lint`: repository-wide run fails on pre-existing unused imports/variables, unescaped quotes and other lint errors outside the DINAMICA II files. Existing warnings also include raw `<img>` usage.
- `npx tsc --noEmit`: reports 18 existing errors in seven unrelated files (`components/sponsor-cta.tsx`, `components/ui/*`, and other shared UI); no diagnostic references a DINAMICA II file.
- Visual review: desktop plus 320, 375, 414, 768 and 1440 CSS-pixel viewports. Measured document width stays within viewport at all five sizes. Hero amount was reduced at mobile widths after review to avoid clipping.
- Accessibility implementation includes native field labels, fieldset/legend grouping, inline required-field errors, `aria-invalid`, keyboard-visible focus, semantic headings, and reduced-motion overrides.
- Page/form event hooks call `window.gtag` when it exists, with no form or founder data in event parameters. The current layout does not load Google Analytics, so no analytics event was sent or verified.
- Hallmark custom/bespoke route and review are logged in `.hallmark/log.json`. The official `sloplint` executable was not available, so Hallmark checks were reviewed manually. The EU image’s baked checkerboard remains the only brand-asset exception pending approval.
- No real submissions, paid-ticket lookups, outbound confirmation emails, migration application or production deployment were performed.

## Changed files

## Visual polish iteration — 2026-10-24

This follow-up is a visual refinement of the existing `/dinamica-ii` route. It retains the approved copy, DNS brand palette and typography, photo, route, bilingual content, shared footer and all application/ticket/backend behavior. No deployment was made.

- The shared header now has a route-specific solid-dark treatment on `/dinamica-ii`: black background, white DNS logo/navigation, and sticky in-flow positioning. The Home page retains its original fixed, scroll-aware header behavior.
- The hero keeps the supplied event photo and approved prize/copy, improves the horizontal contrast gradient and amount scaling, and adjusts mobile spacing. The assistant overlap with the legal note at 390px was addressed.
- Updated the EU image to the user-supplied Cloudinary JPEG. It loaded successfully on the page; the image was also visually checked at 3840×2160 and has a clean white background. Institutional logo order remains BCIE, Global Gateway, EU, German Cooperation, KfW.
- Eligibility, the five process steps, jury weights, pre-opening application block, FAQ, partnership section and final CTA received spacing and hierarchy refinements. FAQ remains native `<details>/<summary>` with keyboard support and visible focus. The shared global footer was retained without altering its links or credits.
- Hallmark audit recorded 0 critical, 3 major and 2 minor findings before implementation. Its responsive review covered 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 CSS-pixel widths; none showed horizontal overflow. EN/ES switching and keyboard FAQ expansion were also manually checked. Home header behavior was checked independently.
- Rendered screenshots: [1440 viewport](../artifacts/dinamica-ii/dinamica-ii-1440.png), [1440 full page](../artifacts/dinamica-ii/dinamica-ii-1440-full.png), [390 viewport](../artifacts/dinamica-ii/dinamica-ii-390.png), [390 full page](../artifacts/dinamica-ii/dinamica-ii-390-full.png).
- The shared mobile menu's accessible controls and close/backdrop handlers were inspected in source. Its open/close interaction was not confirmed in the browser: the available in-app viewport override did not resize its fixed 987px viewport. Existing CTAs were checked for preserved destinations; the paid-ticket Stripe link was not activated.
- `npm run lint` still fails on pre-existing repo-wide errors outside this page. Targeted ESLint on `components/header.tsx` and `app/dinamica-ii/dinamica-ii-client.tsx` exits 0 with two existing `<img>` performance warnings in the shared header and no errors. `npx tsc --noEmit` still reports 18 errors in unrelated shared UI files; none points to DINAMICA II or the edited shared header. `sloplint` is not installed. The final `next build` attempt initialized but stalled at “Creating an optimized production build” with no further output and was interrupted, so this iteration does not claim a successful build; the earlier build result above belongs to the prior implementation pass.
- No application submission, ticket verification, Stripe operation, database change or production deployment was performed.

Files changed in this visual pass:

- `components/header.tsx`
- `app/dinamica-ii/dinamica-ii.css`
- `lib/dinamica-ii/config.ts`
- `.hallmark/log.json`
- `docs/dinamica-ii-technical-report.md`
- Four screenshots under `artifacts/dinamica-ii/` listed above.

## Visual polish iteration 3 — 2026-10-24

This iteration restores the shared DNS header behavior and adds responsive art direction and motion to the existing route. Approved content, URLs, language switching, application state, ticket verification, Stripe links, analytics hooks, backend routes and footer links remain unchanged.

- `components/header.tsx` no longer forces `/dinamica-ii` into a separate solid-black header. It uses the shared IntersectionObserver behavior again: transparent hero with white logo/navigation, white capsule with dark navigation over marked light sections, and fixed positioning throughout. The Home route keeps its existing behavior.
- The hero keeps the original Cloudinary photograph and copy while using separate wide, laptop and mobile crops. The image wash, `clamp()` amount scale, mobile stacking and full viewport hero prevent QR dominance, text clipping and header overlap across 320, 375, 390, 430, 768, 1280, 1366, 1440 and 1920 CSS-pixel viewports.
- Hero elements use a staggered reveal; sections, logos, process rows and jury rows use a short opacity/translate reveal. FAQ state, CTA focus/hover and jury transitions remain subtle, with explicit `prefers-reduced-motion` overrides and no count-up, parallax, rotation or infinite animation.
- `DinamicaIIHomepageBanner` is mounted after `AttendeeSegments` and before `Tickets`. It contains the approved EN/ES promotion copy and `/dinamica-ii` CTA, but is hidden by default through `DINAMICA_HOME_PROMOTION_ENABLED=false`. A staging run with the flag enabled confirmed the copy and placement without changing the Tickets section.
- `DINAMICA_ASSETS.heroWide`, `heroLaptop` and `heroMobile` are the new art-directed crops. The EU asset remains the supplied Cloudinary JPG and stays in the institutional order BCIE, Global Gateway, EU, German Cooperation, KfW.
- Hallmark audit was completed and logged in `.hallmark/log.json` with the existing DNS palette/type preserved. The audit records the shared dynamic header, crop strategy, motion limits, responsive checks and feature-flag gate. The official `sloplint` executable is not installed; manual rendered review was used.
- Current screenshots: [1440 hero](../artifacts/dinamica-ii/iter3-1440-hero.png), [1440 full page](../artifacts/dinamica-ii/iter3-1440-full.png), [390 hero](../artifacts/dinamica-ii/iter3-390-hero.png), and [390 full page](../artifacts/dinamica-ii/iter3-390-full.png). The staging promotion was also reviewed with the flag enabled on port 3004; that temporary server was stopped afterward.
- `npm run build` passes after the hero and header changes. Targeted ESLint exits 0 with only the two existing shared-header `<img>` warnings. `npx tsc --noEmit` still reports 18 unrelated shared UI errors and none points to the edited DINAMICA II files or header. No deployment was made.

## Original implementation changed files

- `.env.example`
- `.hallmark/preflight.json`
- `.hallmark/log.json`
- `app/robots.ts`
- `app/sitemap.ts`
- `app/dinamica-ii/page.tsx`
- `app/dinamica-ii/dinamica-ii-client.tsx`
- `app/dinamica-ii/dinamica-ii.css`
- `components/dinamica-ii/startup-application-form.tsx`
- `components/dinamica-ii/homepage-banner.tsx`
- `lib/dinamica-ii/config.ts`
- `lib/dinamica-ii/application-schema.ts`
- `lib/dinamica-ii/supabase-server.ts`
- `app/api/dinamica-ii/verify-ticket/route.ts`
- `app/api/dinamica-ii/submit/route.ts`
- `app/api/dinamica-ii/draft/route.ts`
- `app/api/dinamica-ii/draft/[id]/route.ts`
- `app/api/dinamica-ii/operator/issue-token/route.ts`
- `app/api/dinamica-ii/operator/export/route.ts`
- `supabase/migrations/20261024171157_dinamica_ii_applications.sql`
- `docs/dinamica-ii-operations.md`
- `docs/dinamica-ii-technical-report.md`
