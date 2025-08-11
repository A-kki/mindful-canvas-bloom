-- Ensure table exists
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

-- Recreate policies in an idempotent way
DROP POLICY IF EXISTS "Users can view their own CBT thoughts" ON public.cbt_thought_entries;
CREATE POLICY "Users can view their own CBT thoughts"
  ON public.cbt_thought_entries
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own CBT thoughts" ON public.cbt_thought_entries;
CREATE POLICY "Users can insert their own CBT thoughts"
  ON public.cbt_thought_entries
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own CBT thoughts" ON public.cbt_thought_entries;
CREATE POLICY "Users can update their own CBT thoughts"
  ON public.cbt_thought_entries
  FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own CBT thoughts" ON public.cbt_thought_entries;
CREATE POLICY "Users can delete their own CBT thoughts"
  ON public.cbt_thought_entries
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger to keep updated_at fresh (idempotent)
DROP TRIGGER IF EXISTS update_cbt_thought_entries_updated_at ON public.cbt_thought_entries;
CREATE TRIGGER update_cbt_thought_entries_updated_at
BEFORE UPDATE ON public.cbt_thought_entries
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_cbt_thought_entries_user_created
  ON public.cbt_thought_entries (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_cbt_thought_entries_distortion
  ON public.cbt_thought_entries (distortion);
