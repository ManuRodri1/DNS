# DINAMICA II operations

## Launch controls

Set `DINAMICA_PUBLIC_LAUNCH=true` only after JJM and BCIE communications approval. Set `DINAMICA_APPLICATIONS_OPEN=true` only after the application window is approved. Final form access also requires `DINAMICA_PRIVACY_APPROVED=true`, an approved `DINAMICA_PRIVACY_NOTICE_URL`, `DINAMICA_DUPLICATE_POLICY_APPROVED=true`, Supabase server credentials, and `DINAMICA_OPERATOR_TOKEN`. All values default to closed or empty. Preview deployments remain `noindex` and the public sitemap excludes the route until the public launch flag is true.

The home banner component is prepared but intentionally not mounted on the homepage.

## Supabase setup

Apply the generated migration in `supabase/migrations/20261024171157_dinamica_ii_applications.sql` to a dedicated DINAMICA II Supabase project. The existing `NEXT_PUBLIC_SUPABASE_URL` points to the active “Unitipro” project, which contains unrelated invoicing and business tables as well as DNS content; do not use its secret key for this application. Set `DINAMICA_SUPABASE_URL` and a server-only `DINAMICA_SUPABASE_SECRET_KEY` for the isolated project. Never add the key to a `NEXT_PUBLIC_` variable or commit it.

The migration creates separate private tables for one-use ticket verifications, expiring drafts, final-submitted applications, and rate-limit windows. RLS is enabled, public roles have no table grants, and the two RPCs are executable only by `service_role`. The official CSV export reads `final_submitted` rows only. The migration blocks duplicate final submissions with the same normalized legal startup name and incorporation country; confirm that matching rule as part of the duplicate-policy approval before opening applications.

## Ticket verification fallback

There is no Stripe API secret or order lookup integration in this repository. An authorized operator must confirm paid status and DNS 2027 eligibility directly in Stripe before issuing a verification token. Keep `DINAMICA_OPERATOR_TOKEN` at least 32 characters and store it only as a server secret. A verified operator can issue a one-time token with:

```http
POST /api/dinamica-ii/operator/issue-token
Authorization: Bearer <DINAMICA_OPERATOR_TOKEN>
Content-Type: application/json

{
  "ticketReference": "<unique Stripe order or session reference>",
  "representativeEmail": "founder@example.com",
  "ticketType": "general_admission",
  "paymentVerified": true
}
```

The endpoint returns a random token once; it stores only the token hash, binds it to the representative email and ticket reference, and expires it after 72 hours. Share the token with that representative through the approved channel. The token is consumed atomically with final submission and cannot submit twice. Existing eligible tickets may use `ticketType: "legacy_eligible"` after the operator checks the applicable rescheduling policy.

This fallback is an operator-verified workflow. It does not perform live Stripe verification, and the UI must not describe it as automatic Stripe validation.

## Drafts, submissions, and email

Drafts are stored in the private Supabase table for 30 days. The browser stores only a random draft ID and access token in `sessionStorage`; the raw ticket verification token is not included in the draft payload. Drafts are not part of the official queue. Final submissions are validated server-side and inserted as `final_submitted` in one transaction with consumption of the matching ticket verification.

The project has no configured transactional email provider. A successful response shows the immutable application ID and does not claim that an email was sent. Pitch decks are accepted as URLs; private document upload is not configured.

## Pending approvals

- Approve the application privacy notice and retention terms before setting `DINAMICA_PRIVACY_APPROVED=true`.
- Approve the duplicate-application policy before setting `DINAMICA_DUPLICATE_POLICY_APPROVED=true`.
- Review the provided institutional lockup assets with Sacha/Ivanna. The supplied BCIE image is navy on white despite its filename; the European Union JPG contains a baked-in checkerboard.
- Confirm whether DNS 2027 Stripe session/product IDs and the ticket holder identity-matching policy are sufficient for a future direct server-side Stripe integration.
- Provision or designate the isolated DINAMICA II Supabase project and apply the migration before enabling draft persistence or submissions.
- Provide an approved transactional email service before promising email confirmations.
