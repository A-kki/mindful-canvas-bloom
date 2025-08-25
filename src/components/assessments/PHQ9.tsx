import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed. Or the opposite being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself"
];

const responseOptions = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "Several days" },
  { value: "2", label: "More than half the days" },
  { value: "3", label: "Nearly every day" }
];

const getScoreInterpretation = (score: number) => {
  if (score <= 4) return { severity: "Minimal", description: "Minimal depression" };
  if (score <= 9) return { severity: "Mild", description: "Mild depression" };
  if (score <= 14) return { severity: "Moderate", description: "Moderate depression" };
  if (score <= 19) return { severity: "Moderately severe", description: "Moderately severe depression" };
  return { severity: "Severe", description: "Severe depression" };
};

export default function PHQ9() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; interpretation: any } | null>(null);

  const handleResponseChange = (questionIndex: number, value: string) => {
    setResponses(prev => ({ ...prev, [questionIndex]: value }));
  };

  const calculateScore = () => {
    return Object.values(responses).reduce((sum, value) => sum + parseInt(value), 0);
  };

  const isComplete = () => {
    return phq9Questions.every((_, index) => responses[index] !== undefined);
  };

  const handleSubmit = async () => {
    if (!isComplete()) {
      toast({
        title: "Incomplete Assessment",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }

    const score = calculateScore();
    const interpretation = getScoreInterpretation(score);
    
    setResult({ score, interpretation });

    if (user) {
      setIsSubmitting(true);
      try {
        const { error } = await supabase
          .from('phq9_assessments')
          .insert({
            user_id: user.id,
            responses,
            total_score: score,
            severity_level: interpretation.severity
          });

        if (error) throw error;

        toast({
          title: "Assessment Saved",
          description: "Your PHQ-9 assessment has been saved successfully.",
        });
      } catch (error) {
        console.error('Error saving assessment:', error);
        toast({
          title: "Save Error",
          description: "There was an error saving your assessment. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReset = () => {
    setResponses({});
    setResult(null);
  };

  if (result) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>PHQ-9 Assessment Results</CardTitle>
          <CardDescription>
            Your assessment is complete. Remember, this is not a diagnosis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-6 bg-muted rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">{result.score}/27</div>
            <div className="text-lg font-semibold">{result.interpretation.severity}</div>
            <div className="text-sm text-muted-foreground">{result.interpretation.description}</div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> This screening tool is not a substitute for professional medical advice, 
              diagnosis, or treatment. If you're experiencing thoughts of self-harm or having a mental health crisis, 
              please contact a healthcare provider immediately or call a crisis helpline.
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Take Again
            </Button>
            {result.score >= 10 && (
              <Button asChild className="flex-1">
                <a href="https://findtreatment.gov" target="_blank" rel="noopener noreferrer">
                  Find Help
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>PHQ-9 Depression Screening</CardTitle>
        <CardDescription>
          Over the last 2 weeks, how often have you been bothered by any of the following problems?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {phq9Questions.map((question, index) => (
          <div key={index} className="space-y-3">
            <Label className="text-sm font-medium leading-relaxed">
              {index + 1}. {question}
            </Label>
            <RadioGroup
              value={responses[index] || ""}
              onValueChange={(value) => handleResponseChange(index, value)}
              className="flex flex-col space-y-2"
            >
              {responseOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`q${index}-${option.value}`} />
                  <Label htmlFor={`q${index}-${option.value}`} className="text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}

        <div className="pt-4 border-t">
          <Button 
            onClick={handleSubmit}
            disabled={!isComplete() || isSubmitting}
            className="w-full"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Calculate Score
          </Button>
        </div>

        {!user && (
          <div className="text-xs text-muted-foreground text-center">
            Sign in to save your assessment results for tracking progress over time.
          </div>
        )}
      </CardContent>
    </Card>
  );
}