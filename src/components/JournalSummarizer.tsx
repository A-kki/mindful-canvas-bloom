import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, BookOpen, Brain, Save } from "lucide-react";

export default function JournalSummarizer() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [entry, setEntry] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [analysis, setAnalysis] = useState<{
    summary: string;
    mood_indicators: string[];
    insights: string[];
    suggestions: string[];
  } | null>(null);

  const handleAnalyze = async () => {
    if (!entry.trim()) {
      toast({
        title: "Empty Entry",
        description: "Please write something in your journal before analyzing.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('mood-insights', {
        body: { 
          content: entry,
          type: 'journal_analysis'
        }
      });

      if (error) throw error;

      setAnalysis(data);
      toast({
        title: "Analysis Complete",
        description: "Your journal entry has been analyzed successfully.",
      });
    } catch (error) {
      console.error('Error analyzing entry:', error);
      toast({
        title: "Analysis Error",
        description: "There was an error analyzing your entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your journal entries.",
        variant: "destructive",
      });
      return;
    }

    if (!entry.trim()) {
      toast({
        title: "Empty Entry",
        description: "Please write something before saving.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('journal_entries')
        .insert({
          user_id: user.id,
          content: entry,
          ai_summary: analysis?.summary || null,
          mood_indicators: analysis?.mood_indicators || null,
          insights: analysis?.insights || null,
          suggestions: analysis?.suggestions || null
        });

      if (error) throw error;

      toast({
        title: "Entry Saved",
        description: "Your journal entry has been saved successfully.",
      });
      
      // Clear the form after saving
      setEntry("");
      setAnalysis(null);
    } catch (error) {
      console.error('Error saving entry:', error);
      toast({
        title: "Save Error",
        description: "There was an error saving your entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Write Your Journal Entry
          </CardTitle>
          <CardDescription>
            Express your thoughts and feelings freely. AI will help you understand patterns and provide insights.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="How are you feeling today? What's on your mind? Write about anything - your thoughts, emotions, experiences, or concerns..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="min-h-[200px] resize-none"
          />
          
          <div className="flex gap-2">
            <Button 
              onClick={handleAnalyze}
              disabled={!entry.trim() || isAnalyzing}
              variant="outline"
              className="flex-1"
            >
              {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Brain className="mr-2 h-4 w-4" />
              Analyze with AI
            </Button>
            
            <Button
              onClick={handleSave}
              disabled={!entry.trim() || isSaving}
              className="flex-1"
            >
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Save Entry
            </Button>
          </div>

          {!user && (
            <div className="text-xs text-muted-foreground text-center">
              Sign in to save your journal entries and track your progress over time.
            </div>
          )}
        </CardContent>
      </Card>

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Analysis & Insights
            </CardTitle>
            <CardDescription>
              Based on your journal entry, here's what the AI observed:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Summary</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {analysis.summary}
              </p>
            </div>

            {analysis.mood_indicators && analysis.mood_indicators.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Mood Indicators</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.mood_indicators.map((indicator, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                    >
                      {indicator}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {analysis.insights && analysis.insights.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Key Insights</h3>
                <ul className="space-y-1">
                  {analysis.insights.map((insight, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.suggestions && analysis.suggestions.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Suggestions</h3>
                <ul className="space-y-1">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-xs text-amber-800">
                <strong>Disclaimer:</strong> This AI analysis is for reflection and self-awareness purposes only. 
                It is not a substitute for professional mental health advice, diagnosis, or treatment. 
                If you're experiencing a mental health crisis, please contact a healthcare provider immediately.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}