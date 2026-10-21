-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Replace YOUR_EMAIL@gmail.com with the email of your developer account.

create table public.events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  visitor_id text check (char_length(visitor_id) <= 64),
  type text not null check (type in ('visit','quiz_start','quiz_submit','answer')),
  quiz_id text check (char_length(quiz_id) <= 64),
  question_idx int check (question_idx between 0 and 200),
  correct boolean,
  score int check (score between 0 and 200),
  total int check (total between 0 and 200)
);

alter table public.events enable row level security;

-- Anyone visiting the site can ADD events (but cannot read them).
create policy "public can insert events" on public.events
  for insert to anon with check (true);

-- Only the developer account can READ events.
create policy "developer can read events" on public.events
  for select to authenticated
  using ((auth.jwt() ->> 'email') = 'YOUR_EMAIL@gmail.com');
