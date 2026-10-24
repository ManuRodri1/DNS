create table if not exists public.dinamica_ticket_verifications (
  id uuid primary key default gen_random_uuid(),
  ticket_reference text not null unique,
  representative_email text not null,
  ticket_type text not null check (ticket_type in ('general_admission', 'vip', 'legacy_eligible')),
  payment_verified_at timestamptz not null,
  verification_token_hash text not null unique,
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.dinamica_application_drafts (
  id uuid primary key default gen_random_uuid(),
  access_token_hash text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '30 days')
);

create table if not exists public.dinamica_applications (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'final_submitted' check (status = 'final_submitted'),
  ticket_verification_id uuid not null unique references public.dinamica_ticket_verifications(id),
  ticket_reference text not null unique,
  payload jsonb not null,
  submitted_at timestamptz not null default now(),
  reviewer_notes text,
  reviewer_scores jsonb not null default '{}'::jsonb,
  reviewed_at timestamptz
);

create unique index if not exists dinamica_applications_startup_identity_unique
  on public.dinamica_applications (
    lower(trim(payload ->> 'startup_legal_name')),
    lower(trim(payload ->> 'incorporation_country'))
  )
  where status = 'final_submitted';

create table if not exists public.dinamica_api_rate_limits (
  key_hash text primary key,
  window_started_at timestamptz not null,
  hits integer not null check (hits > 0),
  updated_at timestamptz not null default now()
);

alter table public.dinamica_ticket_verifications enable row level security;
alter table public.dinamica_application_drafts enable row level security;
alter table public.dinamica_applications enable row level security;
alter table public.dinamica_api_rate_limits enable row level security;

revoke all on public.dinamica_ticket_verifications from anon, authenticated;
revoke all on public.dinamica_application_drafts from anon, authenticated;
revoke all on public.dinamica_applications from anon, authenticated;
revoke all on public.dinamica_api_rate_limits from anon, authenticated;
grant all on public.dinamica_ticket_verifications to service_role;
grant all on public.dinamica_application_drafts to service_role;
grant all on public.dinamica_applications to service_role;
grant all on public.dinamica_api_rate_limits to service_role;

create or replace function public.dinamica_take_rate_limit(
  p_key_hash text,
  p_max_hits integer,
  p_window_seconds integer
) returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  current_hits integer;
  current_window timestamptz;
begin
  insert into public.dinamica_api_rate_limits as limits (key_hash, window_started_at, hits)
  values (p_key_hash, now(), 1)
  on conflict (key_hash) do update set
    window_started_at = case
      when limits.window_started_at + make_interval(secs => p_window_seconds) <= now() then now()
      else limits.window_started_at
    end,
    hits = case
      when limits.window_started_at + make_interval(secs => p_window_seconds) <= now() then 1
      else limits.hits + 1
    end,
    updated_at = now()
  returning hits, window_started_at into current_hits, current_window;

  return current_hits <= p_max_hits and current_window + make_interval(secs => p_window_seconds) > now();
end;
$$;

create or replace function public.dinamica_submit_application(
  p_ticket_reference text,
  p_representative_email text,
  p_token_hash text,
  p_payload jsonb,
  p_draft_id uuid default null
) returns table (application_id uuid, submitted_at timestamptz)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  verification_id uuid;
  new_application_id uuid;
  submission_time timestamptz;
begin
  update public.dinamica_ticket_verifications as ticket
  set consumed_at = now()
  where ticket.ticket_reference = p_ticket_reference
    and ticket.representative_email = lower(trim(p_representative_email))
    and ticket.verification_token_hash = p_token_hash
    and ticket.expires_at > now()
    and ticket.consumed_at is null
  returning ticket.id into verification_id;

  if verification_id is null then
    raise exception 'ticket_not_verified' using errcode = 'P0001';
  end if;

  begin
    insert into public.dinamica_applications as app (ticket_verification_id, ticket_reference, payload)
    values (verification_id, p_ticket_reference, p_payload)
    returning app.id, app.submitted_at
      into new_application_id, submission_time;
  exception when unique_violation then
    raise exception 'application_already_submitted' using errcode = 'P0001';
  end;

  if p_draft_id is not null then
    delete from public.dinamica_application_drafts where id = p_draft_id;
  end if;

  return query select new_application_id, submission_time;
end;
$$;

revoke all on function public.dinamica_take_rate_limit(text, integer, integer) from public, anon, authenticated;
revoke all on function public.dinamica_submit_application(text, text, text, jsonb, uuid) from public, anon, authenticated;
grant execute on function public.dinamica_take_rate_limit(text, integer, integer) to service_role;
grant execute on function public.dinamica_submit_application(text, text, text, jsonb, uuid) to service_role;
