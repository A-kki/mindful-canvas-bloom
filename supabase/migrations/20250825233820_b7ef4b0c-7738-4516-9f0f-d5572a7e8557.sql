-- Create PHQ-9 assessments table
CREATE TABLE public.phq9_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  responses JSONB NOT NULL,
  total_score INTEGER NOT NULL,
  severity_level TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create journal entries table
CREATE TABLE public.journal_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  ai_summary TEXT,
  mood_indicators TEXT[],
  insights TEXT[],
  suggestions TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.phq9_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

-- RLS policies for PHQ-9 assessments
CREATE POLICY "Users can view their own PHQ-9 assessments" 
ON public.phq9_assessments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own PHQ-9 assessments" 
ON public.phq9_assessments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own PHQ-9 assessments" 
ON public.phq9_assessments 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS policies for journal entries
CREATE POLICY "Users can view their own journal entries" 
ON public.journal_entries 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own journal entries" 
ON public.journal_entries 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own journal entries" 
ON public.journal_entries 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own journal entries" 
ON public.journal_entries 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_phq9_assessments_user_id ON public.phq9_assessments(user_id);
CREATE INDEX idx_phq9_assessments_created_at ON public.phq9_assessments(created_at);
CREATE INDEX idx_journal_entries_user_id ON public.journal_entries(user_id);
CREATE INDEX idx_journal_entries_created_at ON public.journal_entries(created_at);

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_phq9_assessments_updated_at
  BEFORE UPDATE ON public.phq9_assessments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_journal_entries_updated_at
  BEFORE UPDATE ON public.journal_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();