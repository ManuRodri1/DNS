# DINAMICA II — Form field audit

Audit basis: the prior four-step React form, its application schema, and the current Form UX Simplification brief. “Brief-required” means explicitly listed as required/retained by this brief; it does not independently assert a new program rule.

| Existing or new field(s) | Section | Brief status | Audit decision and current handling | Needed for |
| --- | --- | --- | --- | --- |
| `founder_name` | Founder | Required | Keep required; visible first in the founder group; browser name autocomplete. | Applicant identification, organizer contact |
| `founder_email` | Founder | Required | Keep required; email validation and autocomplete. | Applicant contact |
| `founder_phone` | Founder | Required | Keep required; international format, spaces/punctuation normalized before validation. | WhatsApp/contact |
| `founder_role` | Founder | Required | Keep required; short free-text with role examples. | Team/jury context |
| `founder_origin_country` | Founder | Required | Keep required; country-name autocomplete. | Founder context / eligibility review |
| `founder_residence_country`, `founder_city` | Founder | Required | Keep required; country and city autocomplete. | Contact and founder context |
| `contact_language` | Founder | Required | Keep as select; defaults to the current site language. | Manual follow-up |
| `pitch_language` | Founder | Required | Keep as select; defaults to the current site language. | Presentation planning |
| `ticket_purchase_category` | Ticket | Required | Keep the three requested choices verbatim in meaning. | Manual purchase lookup |
| `ticket_type` | Ticket | Required | Keep General Admission / VIP / Not sure. Not the same as purchase situation. | Ticket verification |
| `representative_ticket_email` | Ticket | Required | Keep required. Add “Same email as my application”; checked state syncs with founder email. | Manual purchase lookup |
| `ticket_reference` | Ticket | Optional | Keep optional; no verification token or code. | Manual purchase lookup when available |
| `ticket_reference_unknown` | Ticket | Conditional | New checkbox lets the applicant explicitly say they do not know the reference. | Manual follow-up |
| `ticket_reference_explanation` | Ticket | Conditional | Show only when reference is unknown or the applicant needs help locating confirmation; require a brief note then. | Manual purchase lookup |
| `ticket_token`, verification codes, operator tokens | Ticket / technical | Obsolete | Removed from the public schema and UI; strict schema rejects extra token fields. | Not needed in applicant flow |
| `cofounders` | Additional information | Optional | Preserve as a collapsed optional textarea. | Optional team context |
| `linkedin_url` | Additional information | Optional | Preserve in the collapsed optional group. | Optional external reference |
| `founder_website` | Founder | Redundant | Remove from public form; `startup_profile_url` already requests the startup's public website/profile. | Duplicate of startup profile |
| `startup_legal_name` | Startup | Required | Keep required. | Legal identity / eligibility review |
| `startup_brand_name` | Startup | Optional | Keep optional. | Identification when brand differs |
| `incorporation_country` | Startup | Required | Keep required. | Legal standing / eligibility review |
| `registration_proof` | Startup | Required | Keep required as a short registration number or proof description. | Manual legal-establishment review |
| `startup_profile_url` | Startup | Required | Keep required; validate public URL. | Startup / product review |
| `founded_year`, `stage`, `sector` | Startup | Required | Keep required with year and stage constraints. | Eligibility / maturity context |
| `operation_countries`, `headquarters_country` | Startup | Required | Keep required; one short comma-separated operations field and one headquarters country. | Market and eligibility context |
| `team_size` | Startup | Required | Keep required; minimum one, no invented revenue or customer thresholds. | Team / jury context |
| `company_description` | Startup | Required | Keep one short sentence, 300-character cap. | Startup summary |
| Dominican connection choices | Startup | Required | Keep the three eligible connections and require at least one. | Eligibility |
| One explanation per selected connection | Startup | Conditional | Replace the single always-visible explanation with a short required explanation shown only for each selected connection. | Manual eligibility review |
| `connection_evidence_url` | Startup | Optional | Keep as one optional supporting link, shown only after a qualifying connection is selected. | Optional manual evidence |
| `diaspora`, `nomad` flags | Startup | Redundant / not an eligibility shortcut | Remove from public fields. Founder origin/residence remain; eligibility relies on the actual startup connection. | Not required for startup eligibility |
| Customer problem and product answer | Jury | Required · 500 chars | Keep as question 1. | Jury: product/problem |
| Innovation answer | Jury | Required · 500 chars | Keep as question 2. | Jury: innovation |
| Export markets and route to customers | Jury | Required · 700 chars | Keep as question 3. | Jury: export potential |
| Demand evidence answer | Jury | Required · 500 chars | Keep as question 4. | Jury: demand |
| Scale and 12-month milestones | Jury | Required · 500 chars | Keep as question 5. | Jury: scalability |
| Impact answer | Jury | Required · 400 chars | Keep as question 6. | Jury: digitalization, sustainability, or inclusion |
| Founding-team capacity answer | Jury | Required · 400 chars | Keep as question 7. | Jury: team |
| Prize-use answer | Jury | Required · 500 chars | Keep as question 8. | Jury: proposed use of award |
| `pitch_deck_url` | Jury | Required | Keep required and validate URL; no upload or attachment. | Jury review |
| `demo_url`, `external_reference` | Additional information | Optional | Keep in the collapsed optional group. | Optional product / reference context |
| `customer_count_range`, `monthly_revenue_range`, `active_export_customers`, `expected_market_entry` | Additional information | Optional | Keep optional and move out of the blocking core. No revenue or customer minimum is imposed. | Optional metrics / planning context |
| `prior_funding`, `conflicts` | Additional information | Optional | Keep optional in the collapsed group. | Optional disclosure / review context |
| Accuracy, authority, judging, no-guarantee, award conditions, contact, privacy declarations | Review & Submit | Required | Preserve as separate checkboxes; none is pre-checked. | Required applicant declarations |
| `marketing_opt_in` | Review & Submit | Optional | Preserve separately, unchecked by default. | Optional marketing consent |
| Draft IDs, idempotency tokens, receipt IDs, Supabase state, ticket verification state | Technical / previous flow | Obsolete | Excluded from the public payload and UI. Old public API routes are compatibility tombstones returning 410. | Not needed for direct Formspree delivery |

## Reduction summary

- Preserve the requested founder, ticket, startup, connection, jury, pitch-deck, declaration, and privacy fields.
- Remove duplicated founder website and non-eligibility diaspora/nomad flags from the public form.
- Make all auxiliary metrics and links optional and visually collapsed. The required eight jury answers and mandatory pitch-deck link remain in the core flow.
- Replace Supabase draft/save, verification, and API submission fields with one in-memory four-step application and one direct Formspree request.
