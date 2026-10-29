# DINAMICA II — Form UX simplification and direct Formspree

Implementation update · 28 October 2026

## Current public form

- The applicant flow remains four steps, now titled **About You & Your Ticket**, **About Your Startup**, **Tell Us About Your Idea**, and **Review & Submit** (with Spanish equivalents).
- The form posts once, directly from React to a dedicated Formspree ID in `NEXT_PUBLIC_DINAMICA_FORMSPREE_FORM_ID`. It uses no Next.js submission API, Supabase drafts, ticket verification, operator tokens, or attachments.
- The ID is not configured in this repo. The previous hardcoded contact-form candidate has been removed from DINAMICA II configuration. `lib/form-config.ts` remains unchanged for unrelated public forms.
- The form remains visible in local/protected preview while submission is disabled. Production remains gated on the dedicated Formspree form and recipient, privacy notice and approval, duplicate-policy approval, application window, coordinated launch flags, and Jonathan's launch authorization.
- A received confirmation is shown only after a successful Formspree response. No fake confirmation ID or claim of an automatic applicant email is generated. HTTP 429, provider errors, and network failures leave the answers in the active React session.
- Public submit, draft, draft retrieval, and notification-resend API routes now return HTTP 410. Existing migrations, data, and protected operator functionality are retained; no database operation was run.
- The following sections are the **historical record of the prior Supabase-backed workflow**. They are retained to document existing files and data, but they are superseded for public form behavior by this update.

## Historical implementation report — Supabase-backed workflow

## Scope and working-tree protection

- The task began on `main` with the previous DINAMICA II launch-readiness changes still modified and several new files untracked. I did not reset, clean, switch branches, push, or deploy.
- Saved the tracked pre-change work as `artifacts/dinamica-ii/pre-simplified-workflow-baseline.patch`. The prior untracked files remain in place. The sample CSV was updated to the new export shape; the old fictional sample remains as a separate legacy fixture.
- The work remains an uncommitted working-tree change on `main`. `feature/dinamica-ii-2027` was not modified.
- No production campaign flags were enabled.

## Implementation

- Removed participant ticket verification from the UI and submit API. The old `/verify-ticket` and `/operator/issue-token` routes return HTTP 410. Existing verification records remain in the database for historical reference; no new participant tokens are issued or required.
- Kept the four existing form sections and added ticket ownership category, ticket type, required ticket purchase email, optional purchase reference, and an explanation when no reference is available. The database computes `manual_follow_up_required` for missing references, unknown ticket types, or ticket-location requests.
- Changed application submission to validate and persist first as `pending_verification`. Applications and review history remain private under RLS; only the server-side operator endpoint can set `needs_information`, `verified`, `rejected`, or another supported review status. Each review records time, operator label, notes, and a review event. `verified` is the only status exported to the official evaluation queue.
- Added a client UUID idempotency key and a database uniqueness constraint so an interrupted same-session retry returns the original application. The existing startup identity duplicate index continues to prevent concurrent pending/active duplicate applications.
- Added a Formspree server-side summary notification after database persistence. It sends only the requested identification and ticket summary, never the full application. It is disabled by default and additionally requires privacy approval. Definite HTTP failures are stored as `failed`; uncertain network results are `unknown`. Operators can retry only through the bearer-protected endpoint after checking the Formspree dashboard. No Formspree submission was sent.
- Reworked operator CSV export to require `?status=pending` or `?status=verified`, with separate files, application/review/ticket columns, review payload fields, no credentials/tokens, and formula escaping. Added fictional pending and verified fixtures.
- Added bilingual Application Received copy with a copyable ID and made clear that receipt is pending review. The existing page and FAQ now describe manual review. Added the requested manual confirmation templates and operator steps to `docs/dinamica-ii-operations.md`.
- Added a forward migration, created through the Supabase CLI. It preserves previous rows and stores old `final_submitted` in `legacy_status` while moving those applications to `pending_verification`; the prior flow lacked the separate manual eligibility decision required here. No database migration was applied.
- Staging form access remains separate from production launch flags. Formspree has its own disabled-by-default control. The official landing, Home banner, popup, and form are not enabled in Production.
- Fixed the global announcement selection: an allowed local/protected Preview displays the DINAMICA II popup, while Production keeps the currently authorized event notice until the coordinated launch gate passes. The new modal uses its own session-storage key and no second global popup is mounted.
- Split `DINAMICA_FORM_VISIBLE` from `DINAMICA_FORM_SUBMISSION_ENABLED`. Local and allowed Preview can render and validate all four sections; with submissions disabled, the final action is disabled, no draft or application API request is made, and the page explains that values are not saved. Production submission requires `VERCEL_ENV=production` and its production launch approvals. Preview submission requires separate preview-only flags and `DINAMICA_PREVIEW_SUPABASE_*` credentials; Preview/local server helpers never select production DINAMICA secrets.
- Updated the DINAMICA responsive breakpoint at 1024px and added an anchor offset for the application section so the sticky DNS header does not cover the section heading on direct links.

## Supabase and Formspree status

- Local migration and RLS definitions were inspected. No approved isolated DNS staging credentials are configured in this working tree. The local `.env.local` only sets `DINAMICA_HOME_PROMOTION_ENABLED`; there is no `.env.development.local`. In the connected Supabase account, there is no identifiable DNS staging database: the active project has an unrelated business-application schema, and the other project is inactive/unavailable. No Supabase DDL or data writes were made. A separate DINAMICA II staging project and preview credentials are still required.
- The candidate Formspree endpoint `https://formspree.io/f/mvzeyakd` follows the documented Formspree JSON/AJAX submission shape. The DNS account owner, configured recipients, account plan, and legal/privacy approval for transferring applicant name/email and ticket metadata to Formspree could not be confirmed. Notifications remain off until DNS confirms these. No notification or personal data was sent.
- The application will not claim receipt if Supabase fails. If storage succeeds and Formspree fails, the application stays stored and the response still shows the reference ID. Duplicate browser retries do not resend the first notification.
- All new manual review/API functionality is staged in source only; no real ticket, Stripe, or application operation was performed.

## Verification performed and limits

- `npx eslint` on all changed TS/TSX files: passed.
- `npm run build`: not yet rerun for this simplified workflow implementation.
- Repository-wide lint and TypeScript had existing unrelated failures in the prior baseline; those checks will be rerun to distinguish any new DINAMICA II diagnostics.
- `git diff --check`: not yet rerun for the final changes.
- The only Supabase migrations available in this checkout are the original DINAMICA II migration and the new local migration. No suitable staging project was available to run migration queries or verify live RLS/RPC behavior.
- No draft-save/restore, Supabase receive/review, Formspree send/failure/retry, duplicate submission, unauthorized update, or operator export integration scenario was run against a database. Formspree was not contacted.
- No real-data test was performed. The pending/verified CSVs use fictional `example.invalid` identities and test data only; they are format examples, not real endpoint exports.
- No new screenshots or desktop/tablet/mobile viewport checks have been produced for this version. Previous visual checks from the earlier launch-readiness work do not cover the changed application workflow.
- Hallmark's design guidance was applied manually in the earlier launch-readiness work. The Hallmark CLI remains unavailable, so there is no CLI audit log for this workflow update.

## Remaining blockers before protected staging QA

- Provision and identify the isolated DINAMICA II Supabase staging project, set server-only credentials, apply the migrations, and run read/query checks for the new RPCs, RLS, status handling, and non-public access.
- Configure Vercel Deployment Protection before sharing a preview URL; no protected remote preview URL is available.
- Confirm duplicate-application policy and approve the notice, data retention, evaluator access, and the Formspree processor/recipient. The Formspree enable flag remains off.
- Run the requested fictional end-to-end cases against staging: draft create/restore, receipt and idempotency, manual review, Formspree failure and safe retry, unauthorized review rejection, and pending/verified CSV separation.
- Capture saved responsive screenshots at 1440, 1366, 768, 390, and 375 px and verify keyboard, bilingual copy, form error handling, and application receipt.
- Confirm manual operator identity/audit policy and provide the approved institutional sender account for manual verified emails.
- JJM approval is required before enabling public launch flags. No production deployment was made.

## Files changed

- `.env.example`
- `app/api/dinamica-ii/submit/route.ts`
- `app/api/dinamica-ii/verify-ticket/route.ts`
- `app/api/dinamica-ii/operator/export/route.ts`
- `app/api/dinamica-ii/operator/issue-token/route.ts`
- `app/api/dinamica-ii/operator/review/route.ts`
- `app/api/dinamica-ii/operator/resend-notification/route.ts`
- `app/dinamica-ii/dinamica-ii-client.tsx`
- `components/dinamica-ii/startup-application-form.tsx`
- `docs/dinamica-ii-operations.md`
- `docs/dinamica-ii-technical-report.md`
- `lib/dinamica-ii/application-schema.ts`
- `lib/dinamica-ii/config.ts`
- `lib/dinamica-ii/formspree.ts`
- `supabase/migrations/20261028214403_dinamica_ii_simplified_manual_review.sql`
- `artifacts/dinamica-ii/dinamica-ii-sample-export-fixture.csv`
- `artifacts/dinamica-ii/dinamica-ii-verified-sample-export-fixture.csv`
- `artifacts/dinamica-ii/pre-simplified-workflow-baseline.patch`
