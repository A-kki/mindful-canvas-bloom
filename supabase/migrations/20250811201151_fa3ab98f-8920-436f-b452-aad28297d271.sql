-- Create likes table for vent posts
CREATE TABLE public.vent_post_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  post_id UUID NOT NULL REFERENCES public.vent_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Create comments table for vent posts
CREATE TABLE public.vent_post_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  post_id UUID NOT NULL REFERENCES public.vent_posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.vent_post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vent_post_comments ENABLE ROW LEVEL SECURITY;

-- RLS policies for likes
CREATE POLICY "Users can view all likes" ON public.vent_post_likes FOR SELECT USING (true);
CREATE POLICY "Users can like posts" ON public.vent_post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike their own likes" ON public.vent_post_likes FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for comments
CREATE POLICY "Users can view all comments" ON public.vent_post_comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON public.vent_post_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments" ON public.vent_post_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON public.vent_post_comments FOR DELETE USING (auth.uid() = user_id);

-- Add trigger for comments updated_at
CREATE TRIGGER update_vent_post_comments_updated_at
BEFORE UPDATE ON public.vent_post_comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();