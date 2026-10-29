-- DINAMICA II simplified, manually reviewed application workflow.
-- Preserve all prior application rows and ticket-verification records.

alter table public.dinamica_applications
  alter column ticket_verification_id drop not null,
  alter column ticket_reference drop not null;

alter table public.dinamica_applications
  add column if not exists application_id uuid generated always as (id) stored,
  add column if not exists created_at timestamptz,
  add column if not exists applicant_name text,
  add column if not exists applicant_email text,
  add column if not exists startup_name text,
  add column if not exists ticket_email text,
  add column if not exists ticket_type text,
  add column if not exists ticket_purchase_category text,
  add column if not exists review_notes text,
  add column if not exists reviewed_by text,
  add column if not exists legacy_status text,
  add column if not exists idempotency_key uuid,
  add column if not exists request_fingerprint text,
  add column if not exists notification_status text not null default 'not_configured',
  add column if not exists notification_last_error text,
  add column if not exists notification_attempted_at timestamptz,
  add column if not exists notification_sent_at timestamptz,
  add column if not exists submission_payload jsonb generated always as (payload) stored,
  add column if not exists verification_status text generated always as (status) stored;

alter table public.dinamica_applications
  add column if not exists manual_follow_up_required boolean generated always as (
    nullif(trim(ticket_reference), '') is null or ticket_type = 'unknown_requires_review' or ticket_purchase_category = 'help_locating_confirmation'
  ) stored;

update public.dinamica_applications
set created_at = coalesce(created_at, submitted_at),
    applicant_name = coalesce(applicant_name, payload ->> 'founder_name'),
    applicant_email = coalesce(applicant_email, payload ->> 'founder_email'),
    startup_name = coalesce(startup_name, payload ->> 'startup_legal_name'),
    ticket_email = coalesce(ticket_email, payload ->> 'representative_ticket_email'),
    ticket_type = coalesce(ticket_type, payload ->> 'ticket_type'),
    legacy_status = coalesce(legacy_status, case when status = 'final_submitted' then status end),
    status = case
      when status in ('pending_verification', 'needs_information', 'verified', 'rejected') then status
      else 'pending_verification'
    end;

alter table public.dinamica_applications
  alter column created_at set default now(),
  alter column created_at set not null,
  alter column status set default 'pending_verification';

do $$
declare
  constraint_name text;
begin
  for constraint_name in
    select conname
    from pg_constraint
    where conrelid = 'public.dinamica_applications'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) ilike '%status%'
  loop
    execute format('alter table public.dinamica_applications drop constraint %I', constraint_name);
  end loop;
end;
$$;

alter table public.dinamica_applications
  add constraint dinamica_applications_status_check
    check (status in ('pending_verification', 'needs_information', 'verified', 'rejected')),
  add constraint dinamica_applications_ticket_type_check
    check (ticket_type is null or ticket_type in ('general_admission', 'vip', 'unknown_requires_review', 'legacy_eligible')),
  add constraint dinamica_applications_ticket_purchase_category_check
    check (ticket_purchase_category is null or ticket_purchase_category in ('purchased_dns_2027', 'pre_reschedule_ticket', 'help_locating_confirmation')),
  add constraint dinamica_applications_notification_status_check
    check (notification_status in ('not_configured', 'pending', 'sending', 'sent', 'failed', 'unknown', 'disabled')),
  add constraint dinamica_applications_idempotency_key_unique unique (idempotency_key);

drop index if exists public.dinamica_applications_startup_identity_unique;
create unique index dinamica_applications_startup_identity_unique
  on public.dinamica_applications (
    lower(trim(payload ->> 'startup_legal_name')),
    lower(trim(payload ->> 'incorporation_country'))
  )
  where status in ('pending_verification', 'needs_information', 'verified');

create index if not exists dinamica_applications_status_created_at_idx
  on public.dinamica_applications (status, created_at);

create table if not exists public.dinamica_application_review_events (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.dinamica_applications(id),
  previous_status text not null,
  new_status text not null check (new_status in ('pending_verification', 'needs_information', 'verified', 'rejected')),
  operator_label text not null,
  review_notes text not null,
  created_at timestamptz not null default now()
);

alter table public.dinamica_application_review_events enable row level security;
revoke all on public.dinamica_application_review_events from anon, authenticated;
grant all on public.dinamica_application_review_events to service_role;

create or replace function public.dinamica_receive_application(
  p_idempotency_key uuid,
  p_request_fingerprint text,
  p_applicant_name text,
  p_applicant_email text,
  p_startup_name text,
  p_ticket_email text,
  p_ticket_reference text,
  p_ticket_type text,
  p_ticket_purchase_category text,
  p_payload jsonb
) returns table (application_id uuid, created_at timestamptz, inserted boolean)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  new_application_id uuid;
  submission_time timestamptz;
begin
  insert into public.dinamica_applications as app (
    status, ticket_verification_id, ticket_reference, payload, submitted_at, created_at,
    applicant_name, applicant_email, startup_name, ticket_email, ticket_type,
    ticket_purchase_category, idempotency_key, request_fingerprint, notification_status
  ) values (
    'pending_verification', null, nullif(trim(p_ticket_reference), ''), p_payload, now(), now(),
    trim(p_applicant_name), lower(trim(p_applicant_email)), trim(p_startup_name),
    lower(trim(p_ticket_email)), p_ticket_type, p_ticket_purchase_category,
    p_idempotency_key, p_request_fingerprint, 'pending'
  ) on conflict (idempotency_key) do nothing
  returning app.id, app.created_at
    into new_application_id, submission_time;

  if new_application_id is not null then
    return query select new_application_id, submission_time, true;
    return;
  end if;

  select app.id, app.created_at
    into new_application_id, submission_time
    from public.dinamica_applications as app
    where app.idempotency_key = p_idempotency_key
      and app.request_fingerprint = p_request_fingerprint;

  if new_application_id is not null then
    return query select new_application_id, submission_time, false;
    return;
  end if;

  if exists (select 1 from public.dinamica_applications as app where app.idempotency_key = p_idempotency_key) then
    raise exception 'idempotency_key_conflict' using errcode = 'P0001';
  end if;

  raise exception 'application_already_received' using errcode = 'P0001';
exception
  when unique_violation then
    raise exception 'application_already_received' using errcode = 'P0001';
end;
$$;

create or replace function public.dinamica_review_application(
  p_application_id uuid,
  p_new_status text,
  p_operator_label text,
  p_review_notes text
) returns table (application_id uuid, previous_status text, new_status text, reviewed_at timestamptz)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  old_status text;
  review_time timestamptz := now();
begin
  if p_new_status not in ('pending_verification', 'needs_information', 'verified', 'rejected') then
    raise exception 'invalid_review_status' using errcode = 'P0001';
  end if;

  select app.status into old_status
    from public.dinamica_applications as app
    where app.id = p_application_id
    for update;
  if old_status is null then
    raise exception 'application_not_found' using errcode = 'P0001';
  end if;
  if old_status = p_new_status then
    raise exception 'review_status_unchanged' using errcode = 'P0001';
  end if;

  update public.dinamica_applications
    set status = p_new_status,
        reviewed_by = trim(p_operator_label),
        reviewed_at = review_time,
        review_notes = trim(p_review_notes),
        reviewer_notes = trim(p_review_notes)
    where id = p_application_id;

  insert into public.dinamica_application_review_events (
    application_id, previous_status, new_status, operator_label, review_notes, created_at
  ) values (
    p_application_id, old_status, p_new_status, trim(p_operator_label), trim(p_review_notes), review_time
  );

  return query select p_application_id, old_status, p_new_status, review_time;
end;
$$;

revoke all on function public.dinamica_receive_application(uuid, text, text, text, text, text, text, text, text, jsonb) from public, anon, authenticated;
revoke all on function public.dinamica_review_application(uuid, text, text, text) from public, anon, authenticated;
grant execute on function public.dinamica_receive_application(uuid, text, text, text, text, text, text, text, text, jsonb) to service_role;
grant execute on function public.dinamica_review_application(uuid, text, text, text) to service_role;

