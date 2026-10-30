# DINAMICA II operations

## Current public workflow — direct Web3Forms

This section is the source of truth for the public `/dinamica-ii` application. The later Supabase and operator notes document retained legacy infrastructure only.

1. Applicants complete four steps in the browser. Required ticket details and the eight published jury answers are included in one submission; optional metrics and supporting details do not block it.
2. The React form validates the complete payload and posts it directly to `https://api.web3forms.com/submit`. It includes all validated application fields, including the eight jury answers, legal acknowledgements, and submission timestamp. No Next.js API, Supabase draft, ticket verification request, operator token, or file upload is used by the public flow.
3. The site displays **Application Received — Pending Verification / Solicitud recibida — Pendiente de verificación** only when HTTP succeeds and Web3Forms returns JSON `success: true`. It creates no confirmation number and does not claim that an automatic email was sent to the participant.
4. Successment manually reviews ticket payment and startup eligibility. A ticket or received application does not guarantee finalist selection.

DINAMICA II uses the shared browser client in `lib/web3forms.ts`, with `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. The founder's email is sent as both `email` and `replyto`, and the subject includes the startup name. A successful provider response confirms acceptance by the email service, not delivery to a specific inbox.

### Staging and release controls

Use a Vercel Preview deployment protected by Deployment Protection to review the full form. Preview submissions are always disabled. Production submissions are controlled by `DINAMICA_APPLICATIONS_OPEN`. Keep it `false` until the organizer authorizes public applications. Setting it to `true` opens submissions only in Production; it does not approve the competition launch or replace other institutional approvals.

The competition page and announcement are visible in Production for review, even while applications are closed. The Home promotion and search indexing retain separate controls. Set `DINAMICA_APPLICATIONS_OPEN=true` in Production only after institutional authorization. The form schema validates every application before sending. The form discloses that the application is transmitted through Web3Forms to DNS and Successment for manual review. Confirm the approved privacy notice and Web3Forms account configuration before accepting live submissions.

When the application window is closed, the form remains viewable in Production and local/protected preview, but the final submit action is disabled. Local form values remain only in React memory for the active page session; they are not saved to browser storage or a database.

### Retired public endpoints and retained data

The public `/api/dinamica-ii/submit`, `/draft`, `/draft/[id]`, `/verify-ticket`, and operator notification-resend routes return HTTP 410. The React form does not call them. Existing Supabase migrations, stored rows, and other protected operator APIs are retained for historical data and are not prerequisites for the new public form. No table, migration, or application record is deleted by this change.

### Legacy Supabase setup and data protection

### Supabase setup and data protection

Apply `supabase/migrations/20261024171157_dinamica_ii_applications.sql` followed by the simplified workflow migration in `supabase/migrations/` to an isolated DINAMICA II project. Do not use the connected `Unitipro` project; its schema and migration history are for a different product. The other connected project is inactive and its schema was not available. Do not put any secret or service-role key in a `NEXT_PUBLIC_` variable or browser bundle.

The migration preserves prior rows. Old `final_submitted` records move to `pending_verification`, with their former status saved in `legacy_status`, because the old flow did not record the separate manual eligibility decision required by this workflow. Existing ticket-verification rows remain for audit/history; the participant verification and token issuance routes now return HTTP 410. `application_id`, `verification_status`, and `submission_payload` expose the requested concepts while preserving the existing `id`, `status`, and `payload` columns.

The application table and review-event table have RLS enabled and no `anon` or `authenticated` grants. The public API cannot write a review state. The server uses the secret key; the operator review endpoint additionally requires the bearer value configured in `DINAMICA_OPERATOR_TOKEN`. The endpoint records an operator label, time, status change, and required review notes. The bearer token is a shared secret in this implementation, so use a controlled DNS vault and do not share it beyond the authorized operator group.

Idempotency prevents a double click or same-session retry from creating another application or sending a second first-attempt notification. A second application for the same normalized startup legal name and incorporation country is also prevented while the first is pending, needs information, or verified; this preserves the existing duplicate rule and still requires JJM approval. Ticket reference remains unique when supplied. A rejected application can be re-submitted under the current index behavior; confirm that policy before production.

### Historical server-side email notifications — retired

The prior server-side notification workflow depended on Supabase persistence and is no longer part of the public application. `/api/dinamica-ii/submit` and `/operator/resend-notification` return HTTP 410. The current React form sends the complete application directly to Web3Forms only after the production release gates pass.

### Retained protected operator API reference

The routes below are legacy administrative APIs, separate from the current public email-delivery workflow. They are not exposed as an applicant panel and require the existing operator authorization.

Obtain `DINAMICA_OPERATOR_TOKEN` through the DNS secret manager. Never put it in the browser, an email, a spreadsheet, or a command-history log. The API records the operator label supplied in the request; the bearer token controls access.

Review an application using the application ID from the pending export and a note documenting the manual decision:

```http
POST /api/dinamica-ii/operator/review
Authorization: Bearer <DINAMICA_OPERATOR_TOKEN>
Content-Type: application/json

{
  "applicationId": "<application UUID>",
  "status": "verified",
  "operatorLabel": "<authorized operator name>",
  "reviewNotes": "<ticket payment and eligibility review notes>"
}
```

Allowed statuses are `pending_verification`, `needs_information`, `verified`, and `rejected`. Use `verified` only after payment, ticket eligibility, and startup eligibility have all been reviewed. Do not accept applicant claims as proof of payment. The review endpoint writes both the current review fields and an event in the private review history.

Download the two CSVs separately with operator authorization:

- `GET /api/dinamica-ii/operator/export?status=pending` includes `pending_verification` and `needs_information`.
- `GET /api/dinamica-ii/operator/export?status=verified` includes only applications in the official evaluation queue.

Rejected records are retained in Supabase but omitted from these two exports. Both files contain clear administrative fields and the application information needed for review. They exclude credentials, draft tokens, and verification tokens, and escape spreadsheet formulas.

Notification retries through this legacy operator endpoint are disabled (HTTP 410). The public application makes one direct Web3Forms request and does not use this API.

### Manual confirmation email templates

**A. Application Received / Solicitud recibida** — the confirmation appears on the website only after Supabase stores the application. No email is sent for this step.

English:

```text
Application Received

Thank you for submitting your DINAMICA II startup application.

Your information has been received and is pending ticket verification and eligibility review by the Digital Nomad Summit team.

Your reference number: [APPLICATION_ID]

An official confirmation will be provided after the review process is completed.

Submitting an application does not guarantee selection as a finalist.
```

Español:

```text
Solicitud recibida

Gracias por enviar tu solicitud para participar en DINAMICA II.

Hemos recibido tu información y está pendiente de verificación de entrada y revisión de elegibilidad por parte del equipo de Digital Nomad Summit.

Tu número de referencia: [APPLICATION_ID]

Recibirás una confirmación oficial una vez que se complete el proceso de revisión.

Enviar una solicitud no garantiza la selección como finalista.
```

**B. Application Verified / Inscripción confirmada para evaluación** — send manually after an operator sets the status to `verified`.

English:

```text
Subject: DINAMICA II — Application Verification Confirmed

Hello [NAME],

Your DINAMICA II application has been verified by the Digital Nomad Summit team.

Your application reference is [APPLICATION_ID].

Your application is now eligible to proceed to the competition evaluation process.

Please note that verification does not guarantee selection as a finalist.

Thank you,
Digital Nomad Summit Santo Domingo
```

Español:

```text
Asunto: DINAMICA II — Verificación de solicitud confirmada

Hola [NAME]:

El equipo de Digital Nomad Summit ha verificado tu solicitud de DINAMICA II.

Tu número de referencia es [APPLICATION_ID].

Tu solicitud puede continuar al proceso de evaluación del concurso.

Recuerda que esta verificación no garantiza la selección como finalista.

Gracias,
Digital Nomad Summit Santo Domingo
```

Use the institutional sender account selected by DNS. Do not report an email as sent until the operator sends it.

### Four-section form

- **A — Founder & ticket:** founder details, ticket ownership category, ticket type, required purchase email, optional purchase reference and explanation when it is missing. No token, card, banking, password, or Stripe login fields.
- **B — Startup & Dominican connection:** legal and brand names, formation, stage, sector, operations, team, description, and evidence of the Dominican connection.
- **C — Exportability & jury assessment:** all eight prompts retain their 500/500/700/500/500/400/400/500 character limits. Pitch-deck URL stays required; revenue stays optional. No file-upload infrastructure is added.
- **D — Representations & submission:** the participant acknowledges that submission is not confirmation, DNS will review ticket payment and eligibility, and purchase does not guarantee finalist selection. Marketing remains optional and unchecked.

The public copy shows the pending-review distinction in English and Spanish. Drafts remain private and separate from applications; the public form never submits participant verification tokens.

### Identity and design

The supplied 1600 × 545 institutional lockup remains one proportional image at `public/dinamica-ii-institutional-lockup.png`. Do not crop, recolor, filter, or separate the marks. The existing four-step form layout, header, footer, and landing sections are retained.

## Remaining launch prerequisites

- JJM approval of the simplified operating proposal, four-section form, and coordinated launch.
- An isolated DINAMICA II staging Supabase project; the connected projects are not suitable staging targets.
- Apply and verify the migration, private access, backups, and authorized operator credentials against that staging project.
- Approve the privacy notice, retention terms, evaluator access description, and duplicate-submission policy.
- Confirm the Web3Forms account recipient is the DNS team and the privacy notice covers this external processor before accepting live submissions.
- Confirm ticket operators, Stripe Dashboard access, valid DNS 2027 ticket types, and the rescheduled-ticket eligibility policy.
- Confirm operator identity/audit requirements and store individual access secrets safely.
- Complete protected-preview tests with fictitious data, including draft restore, idempotency, review transitions, notification failure/retry, unauthorized status change, and separate CSV outputs.
- Complete desktop, tablet, and mobile interaction QA and save actual screenshots.
- Approve the beneficiary quotation, speaker name, and title if the institutional announcement uses them.
- Configure and verify Vercel Deployment Protection before sharing a preview URL.
