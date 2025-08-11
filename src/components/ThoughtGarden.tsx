
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const ThoughtGarden = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [situation, setSituation] = useState('');
  const [automaticThought, setAutomaticThought] = useState('');
  const [emotion, setEmotion] = useState('');
  const [cognitiveDistortion, setCognitiveDistortion] = useState('');
  const [balancedThought, setBalancedThought] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [patternLoading, setPatternLoading] = useState(false);
  const [patternInsights, setPatternInsights] = useState<string>('');

  const distortions = [
    'All-or-Nothing Thinking',
    'Overgeneralization',
    'Mental Filter',
    'Disqualifying the Positive',
    'Jumping to Conclusions',
    'Magnification or Minimization',
    'Emotional Reasoning',
    'Should Statements',
    'Labeling',
    'Personalization'
  ];

const generateAISuggestion = async () => {
  if (!automaticThought.trim()) return;
  try {
    setAiLoading(true);
    const { data, error } = await supabase.functions.invoke('cbt-insights', {
      body: {
        mode: 'coach',
        situation,
        automaticThought,
        emotion,
        distortion: cognitiveDistortion,
      },
    });
    if (error) throw error;
    setAiSuggestion(data?.suggestion || '');
    if (!data?.suggestion) {
      toast({ title: 'AI note', description: 'No suggestion returned. Try again.', duration: 4000 });
    }
  } catch (err: any) {
    console.error('AI coach error:', err);
    toast({ title: 'AI error', description: 'Unable to generate suggestion right now.', duration: 5000 });
  } finally {
    setAiLoading(false);
  }
};

const handleSave = async () => {
  if (!user) {
    toast({ title: 'Sign in required', description: 'Please sign in to save your entries.', duration: 5000 });
    return;
  }
  try {
    setSaving(true);
    const { error } = await supabase.from('cbt_thought_entries').insert({
      user_id: user.id,
      situation,
      automatic_thought: automaticThought,
      emotion,
      distortion: cognitiveDistortion,
      balanced_thought: balancedThought,
      ai_suggestion: aiSuggestion,
    });
    if (error) throw error;
    toast({ title: 'Saved', description: 'Your thought entry has been saved.', duration: 4000 });

    // Reset form
    setSituation('');
    setAutomaticThought('');
    setEmotion('');
    setCognitiveDistortion('');
    setBalancedThought('');
    setAiSuggestion('');
  } catch (err: any) {
    console.error('Save error:', err);
    toast({ title: 'Save failed', description: 'Unable to save entry. Please try again.', duration: 5000 });
  } finally {
    setSaving(false);
  }
};

  const analyzePatterns = async () => {
    if (!user) {
      toast({ title: 'Sign in required', description: 'Please sign in to analyze patterns.', duration: 5000 });
      return;
    }
    try {
      setPatternLoading(true);
      const { data: entries, error } = await supabase
        .from('cbt_thought_entries')
        .select('id, automatic_thought, emotion, distortion, balanced_thought, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);
      if (error) throw error;

      const { data, error: fnError } = await supabase.functions.invoke('cbt-insights', {
        body: { mode: 'patterns', entries: entries || [] },
      });
      if (fnError) throw fnError;

      setPatternInsights(data?.summary || '');
      if (!data?.summary) {
        toast({ title: 'AI note', description: 'No insights returned. Try again later.', duration: 4000 });
      }
    } catch (err: any) {
      console.error('Pattern analysis error:', err);
      toast({ title: 'Analysis failed', description: 'Unable to analyze patterns right now.', duration: 5000 });
    } finally {
      setPatternLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-white/90 to-green-100/90 dark:from-slate-800/90 dark:to-blue-950/90 border-green-200/50 dark:border-slate-700/30 backdrop-blur-sm shadow-2xl transition-all duration-500">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-5xl animate-pulse">🌱</span>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-300 dark:to-emerald-300 bg-clip-text text-transparent">
              ThoughtGarden - CBT Thought Tracker 🌿
            </h1>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-800 dark:text-white font-semibold mb-3 text-lg">📍 What happened? (Situation)</label>
              <div className="bg-gradient-to-r from-green-200/30 to-emerald-200/30 dark:from-slate-700/30 dark:to-blue-800/30 rounded-2xl p-6 border-2 border-green-300/30 dark:border-slate-600/30">
                <textarea 
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder="Describe the situation that triggered your thoughts..."
                  className="w-full bg-transparent text-gray-800 dark:text-white placeholder-green-600 dark:placeholder-blue-300 resize-none border-none outline-none text-lg leading-relaxed"
                  rows={3}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-800 dark:text-white font-semibold mb-3 text-lg">💭 What did you think? (Automatic Thought)</label>
              <div className="bg-gradient-to-r from-green-200/30 to-emerald-200/30 dark:from-slate-700/30 dark:to-blue-800/30 rounded-2xl p-6 border-2 border-green-300/30 dark:border-slate-600/30">
                <textarea 
                  value={automaticThought}
                  onChange={(e) => setAutomaticThought(e.target.value)}
                  placeholder="What thoughts went through your mind?"
                  className="w-full bg-transparent text-gray-800 dark:text-white placeholder-green-600 dark:placeholder-blue-300 resize-none border-none outline-none text-lg leading-relaxed"
                  rows={3}
                />
              </div>
{automaticThought && (
                <Button 
                  onClick={generateAISuggestion}
                  disabled={aiLoading}
                  className="mt-3 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-slate-600 dark:to-blue-700 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg text-sm transform hover:scale-105 transition-all duration-300"
                >
                  {aiLoading ? 'Generating…' : '🤖 Get AI Reframing Suggestion'}
                </Button>
              )}
            </div>

            {aiSuggestion && (
              <div className="bg-gradient-to-r from-blue-100/50 to-cyan-100/50 dark:from-slate-600/50 dark:to-blue-700/50 rounded-2xl p-6 border-2 border-blue-300/30 dark:border-slate-500/30">
                <h4 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  🤖 AI Suggestion:
                </h4>
                <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed">{aiSuggestion}</p>
              </div>
            )}

            <div>
              <label className="block text-gray-800 dark:text-white font-semibold mb-3 text-lg">😌 How did you feel? (Emotion & Intensity 1-10)</label>
              <div className="bg-gradient-to-r from-green-200/30 to-emerald-200/30 dark:from-slate-700/30 dark:to-blue-800/30 rounded-2xl p-6 border-2 border-green-300/30 dark:border-slate-600/30">
                <input 
                  type="text"
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value)}
                  placeholder="e.g., Anxious (8/10)"
                  className="w-full bg-transparent text-gray-800 dark:text-white placeholder-green-600 dark:placeholder-blue-300 border-none outline-none text-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-800 dark:text-white font-semibold mb-3 text-lg">🧠 Cognitive Distortion (AI will help identify)</label>
              <Select value={cognitiveDistortion} onValueChange={setCognitiveDistortion}>
                <SelectTrigger className="bg-gradient-to-r from-green-200/30 to-emerald-200/30 dark:from-slate-700/30 dark:to-blue-800/30 border-2 border-green-300/30 dark:border-slate-600/30 text-gray-800 dark:text-white rounded-2xl p-6 text-lg">
                  <SelectValue placeholder="Select if known..." />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border-green-300 dark:border-slate-600 rounded-xl">
                  {distortions.map(distortion => (
                    <SelectItem key={distortion} value={distortion} className="text-gray-800 dark:text-white hover:bg-green-100 dark:hover:bg-slate-700 text-base">
                      {distortion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-gray-800 dark:text-white font-semibold mb-3 text-lg">⚖️ Balanced Thought (Reframe)</label>
              <div className="bg-gradient-to-r from-green-200/30 to-emerald-200/30 dark:from-slate-700/30 dark:to-blue-800/30 rounded-2xl p-6 border-2 border-green-300/30 dark:border-slate-600/30">
                <textarea 
                  value={balancedThought}
                  onChange={(e) => setBalancedThought(e.target.value)}
                  placeholder="How could you think about this situation more balanced?"
                  className="w-full bg-transparent text-gray-800 dark:text-white placeholder-green-600 dark:placeholder-blue-300 resize-none border-none outline-none text-lg leading-relaxed"
                  rows={3}
                />
              </div>
            </div>

            <Button 
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 dark:from-slate-700 dark:to-blue-800 hover:from-green-600 hover:to-emerald-600 dark:hover:from-slate-600 dark:hover:to-blue-700 text-white py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              disabled={!situation || !automaticThought || saving}
            >
              {saving ? 'Saving…' : '🌱 Save Thought Entry'}
            </Button>
          </div>

          <Card className="bg-gradient-to-r from-green-200/30 to-emerald-200/30 dark:from-slate-700/30 dark:to-blue-800/30 border-2 border-green-300/30 dark:border-slate-600/30 mt-8 rounded-3xl">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                📊 Pattern Recognition
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg">Log more thoughts to identify your thinking patterns and track your progress over time...</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <Card className="bg-gradient-to-br from-green-200/30 to-emerald-200/30 dark:from-slate-700/30 dark:to-blue-800/30 border-2 border-green-300/30 dark:border-slate-600/30 rounded-3xl">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">0</div>
                <div className="text-gray-700 dark:text-gray-300 font-medium">Thoughts Logged</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-200/30 to-emerald-200/30 dark:from-slate-700/30 dark:to-blue-800/30 border-2 border-green-300/30 dark:border-slate-600/30 rounded-3xl">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">0</div>
                <div className="text-gray-700 dark:text-gray-300 font-medium">Successful Reframes</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThoughtGarden;
