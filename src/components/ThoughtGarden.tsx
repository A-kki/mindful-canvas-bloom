
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ThoughtGarden = () => {
  const [situation, setSituation] = useState('');
  const [automaticThought, setAutomaticThought] = useState('');
  const [emotion, setEmotion] = useState('');
  const [cognitiveDistortion, setCognitiveDistortion] = useState('');
  const [balancedThought, setBalancedThought] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');

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

  const generateAISuggestion = () => {
    if (!automaticThought.trim()) return;
    
    // Mock AI suggestion based on common CBT reframing techniques
    const suggestions = [
      "Try asking yourself: Is this thought based on facts or feelings? What evidence supports or contradicts this thought?",
      "Consider: What would you tell a good friend who had this same thought? How can you show yourself the same kindness?",
      "Think about: What's the worst, best, and most realistic outcome? Often reality lies somewhere in the middle.",
      "Reflect on: How will this matter in 5 years? Sometimes stepping back helps us see the bigger picture.",
      "Ask yourself: What can I control in this situation? Focus your energy on what's within your power to change."
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setAiSuggestion(randomSuggestion);
  };

  const handleSave = () => {
    console.log('Saving thought entry:', {
      situation,
      automaticThought,
      emotion,
      cognitiveDistortion,
      balancedThought
    });
    // Reset form
    setSituation('');
    setAutomaticThought('');
    setEmotion('');
    setCognitiveDistortion('');
    setBalancedThought('');
    setAiSuggestion('');
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
                  className="mt-3 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-slate-600 dark:to-blue-700 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg text-sm transform hover:scale-105 transition-all duration-300"
                >
                  🤖 Get AI Reframing Suggestion
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
              disabled={!situation || !automaticThought}
            >
              🌱 Save Thought Entry
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
