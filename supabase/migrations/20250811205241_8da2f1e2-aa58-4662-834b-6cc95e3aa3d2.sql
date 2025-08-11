-- Create CBT thought entries table for detailed CBT tracking
create table if not exists public.cbt_thought_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  situation text,
  automatic_thought text not null,
  emotion text,
  distortion text,
  balanced_thought text,
  ai_suggestion text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.cbt_thought_entries enable row level security;

-- Policies for user access control
create policy if not exists "Users can view their own CBT thoughts"
  on public.cbt_thought_entries
  for select
  using (auth.uid() = user_id);

create policy if not exists "Users can insert their own CBT thoughts"
  on public.cbt_thought_entries
  for insert
  with check (auth.uid() = user_id);

create policy if not exists "Users can update their own CBT thoughts"
  on public.cbt_thought_entries
  for update
  using (auth.uid() = user_id);

create policy if not exists "Users can delete their own CBT thoughts"
  on public.cbt_thought_entries
  for delete
  using (auth.uid() = user_id);

-- Trigger to keep updated_at fresh
create trigger update_cbt_thought_entries_updated_at
before update on public.cbt_thought_entries
for each row execute function public.update_updated_at_column();

-- Helpful indexes
create index if not exists idx_cbt_thought_entries_user_created
  on public.cbt_thought_entries (user_id, created_at desc);

create index if not exists idx_cbt_thought_entries_distortion
  on public.cbt_thought_entries (distortion);
