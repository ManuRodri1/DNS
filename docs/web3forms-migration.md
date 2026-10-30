# DNS 2027 — Web3Forms migration report

Status: implementation complete; production configuration and live delivery remain unverified.

## Public form inventory

| Form | Location | Source metadata | Subject | Code status |
| --- | --- | --- | --- | --- |
| DNS Insider newsletter | Home contact section | `newsletter`, `home_contact` | `DNS 2027 — Newsletter Subscription` | Migrated |
| Speaker application | Speaker modal | `speaker_application`, `speaker_modal` | `DNS 2027 — Speaker Application` | Migrated |
| Sponsor inquiry | Sponsor modal | `sponsor_inquiry`, `sponsor_modal` | `DNS 2027 — Sponsor Inquiry` | Migrated |
| Media / press inquiry | Press contact block | `media_inquiry`, `press` | `DNS 2027 — Media Inquiry` | Migrated |
| DINAMICA II startup application | `/dinamica-ii` four-step form | `dinamica_ii_application`, `/dinamica-ii` | `DINAMICA II — New Application — [Startup Name]` | Migrated; institutional opening gate retained |

The AI Guide form is chat input; speaker/partner API fetches are content reads. Neither sends public form submissions and neither was migrated. The audit found no other public form `onSubmit` handler.

## Implementation

- `lib/web3forms.ts` centralizes browser submission to `https://api.web3forms.com/submit`, request metadata, reply-to handling, timeout, configuration checks, and response validation. It requires both `response.ok` and JSON `success === true`, and reports generic error codes without logging submitted data or the key.
- General HTML forms are submitted as `FormData`. DINAMICA II builds `FormData` from its schema-validated React state so disabled/autofilled fields and all eight jury answers are included.
- The payload includes `access_key`, `subject`, `from_name`, `email`, `name`, `source_form`, `source_page`, `submission_type`, `preferred_language`, `submitted_at`, hCaptcha response, and each form's existing fields. DINAMICA II additionally keeps `founder_name` and `founder_email`; the latter is sent as `email` and `replyto`.
- Every form uses the free Web3Forms hCaptcha site key and requires a verified token before sending. Web3Forms dashboard hCaptcha enforcement still needs to be enabled for the shared Access Key.
- Newsletter confirmation now says the DNS Insider team received the inquiry; it does not claim automatic marketing-list enrollment. Klaviyo's separate site integration was left intact.
- DINAMICA II remains four steps and retains its schema, required fields, manual Successment payment/eligibility review, `Application Received — Pending Verification` state, and the existing Production `DINAMICA_APPLICATIONS_OPEN` authorization gate. Missing Access Key produces a controlled error without clearing answers. No submission API, database record, token, or additional email provider was added.
- Old public API routes remain HTTP 410 compatibility tombstones. Existing Supabase migrations, stored data, and historical documentation are retained.

## Configuration and launch controls

Set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in the authorized Vercel environments. It is intentionally empty in `.env.example`, and no real key was added to source or local configuration. Because this is a public browser key, it is delivered to the browser by design. Missing key prevents a submission and shows an error.

Before opening DINAMICA II submissions, the institution must separately authorize the competition and set `DINAMICA_APPLICATIONS_OPEN=true` in Production. Configuring Web3Forms does not open DINAMICA II. The existing page, Home promotion, and popup controls are unchanged.

The required DINAMICA II acknowledgement now identifies Web3Forms and DNS/Successment manual review. The application has no separate privacy page in the repository; the privacy owner should approve the notice and data-transfer language before live contest applications are accepted.

## Verification matrix

| Form | Fictional live submission | Provider JSON | Mailbox / subject / Reply-To | Validation, retry, duplicate guard | ES/EN and mobile |
| --- | --- | --- | --- | --- | --- |
| Home newsletter | Not sent: no Access Key configured; real recipient not authorized for test | Shared helper unit coverage; no live provider response | Not verified | Existing required name/email; synchronous lock and retry state implemented | Code is bilingual; visual mobile QA pending |
| Speaker application | Not sent: no Access Key configured; real recipient not authorized for test | Shared helper unit coverage; no live provider response | Not verified | Existing required fields; synchronous lock and retry state implemented | Code is bilingual; visual mobile QA pending |
| Sponsor inquiry | Not sent: no Access Key configured; real recipient not authorized for test | Shared helper unit coverage; no live provider response | Not verified | Existing required fields; synchronous lock and retry state implemented | Code is bilingual; visual mobile QA pending |
| Press contact | Not sent: no Access Key configured; real recipient not authorized for test | Shared helper unit coverage; no live provider response | Not verified | Existing required fields; synchronous lock and retry state implemented | Code is bilingual; visual mobile QA pending |
| DINAMICA II | Not sent: Access Key absent and institutional opening is not authorized | Synthetic tests confirm the complete payload and reject `success: false` | Not verified | Schema, required acknowledgements, re-entry lock, retained answers, and fresh captcha on retry implemented | Four-step ES/EN code retained; visual mobile QA pending |

No submission was sent to Web3Forms, and no email receipt, provider-side field acceptance, subject, or Reply-To could be verified. Web3Forms API success, when later observed, must not be treated as inbox delivery confirmation. The account owner must verify one authorized test in the configured institutional inbox before production use.

## Technical checks

- Production build: passed (`next build`). Existing Supabase and AI Guide environment warnings appeared during static generation; unrelated content fetches also failed because the local environment has placeholder Supabase configuration.
- ESLint on changed TS/TSX files: passed with one existing `no-img-element` warning in `components/contact.tsx`.
- Repository TypeScript: blocked by 18 errors in existing UI components (`sponsor-cta.tsx`, `components/ui/*`) and missing `react-day-picker`; no migration files appear in the diagnostics.
- Repository ESLint: 31 errors and 14 warnings across unrelated existing files. Changed-file lint had zero errors.
- Existing DINAMICA II workflow tests: 7 passing after migration, including complete payload, `success: false`, HTTP 429/500, missing key, invalid JSON, and network failure handling.
- `git diff --check`: passed.

## Files changed

- Shared client and hCaptcha UI: `lib/web3forms.ts`, `components/forms/web3forms-captcha.tsx`.
- Removed obsolete client modules: `lib/form-config.ts`, `lib/dinamica-ii/formspree.ts`.
- General forms: `components/contact.tsx`, `components/sponsor-modal.tsx`, `components/press/press-contact-block.tsx`.
- DINAMICA II: `lib/dinamica-ii/web3forms.ts`, `lib/dinamica-ii/config.ts`, `components/dinamica-ii/startup-application-form.tsx`.
- Environment and retired route compatibility: `.env.example`, `app/api/dinamica-ii/submit/route.ts`, `app/api/dinamica-ii/operator/resend-notification/route.ts`.
- Dependency and test: `package.json`, `package-lock.json`, `tests/dinamica-ii-workflow.test.ts`.
- Operations and reporting: `docs/web3forms-migration.md`, `docs/dinamica-ii-operations.md`, `docs/dinamica-ii-field-audit.md`, `docs/dinamica-ii-technical-report.md`.

## Pending before production

1. Add the valid key to the authorized Vercel environments; never paste it into this repository.
2. In Web3Forms, enable hCaptcha for this Access Key and confirm the configured institutional recipient and domain restrictions available on the account plan.
3. Obtain privacy-owner approval for the DINAMICA II disclosure and third-party transfer.
4. Obtain explicit institutional authorization before setting the DINAMICA II opening flag.
5. With the authorized recipient's approval, run one fictional submission per form and verify all fields, subject, Reply-To, and actual mailbox receipt. Then exercise failure, double-click, language, and mobile checks.

No push or deployment was performed.
