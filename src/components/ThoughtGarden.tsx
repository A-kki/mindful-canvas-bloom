
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
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🌱</span>
            <h1 className="text-3xl font-bold text-white">ThoughtGarden - CBT Thought Tracker</h1>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">What happened? (Situation)</label>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <textarea 
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder="Describe the situation that triggered your thoughts..."
                  className="w-full bg-transparent text-white placeholder-slate-400 resize-none border-none outline-none"
                  rows={3}
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">What did you think? (Automatic Thought)</label>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <textarea 
                  value={automaticThought}
                  onChange={(e) => setAutomaticThought(e.target.value)}
                  placeholder="What thoughts went through your mind?"
                  className="w-full bg-transparent text-white placeholder-slate-400 resize-none border-none outline-none"
                  rows={3}
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">How did you feel? (Emotion & Intensity 1-10)</label>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <input 
                  type="text"
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value)}
                  placeholder="e.g., Anxious (8/10)"
                  className="w-full bg-transparent text-white placeholder-slate-400 border-none outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Cognitive Distortion (AI will help identify)</label>
              <Select value={cognitiveDistortion} onValueChange={setCognitiveDistortion}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select if known..." />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {distortions.map(distortion => (
                    <SelectItem key={distortion} value={distortion} className="text-white">
                      {distortion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Balanced Thought (Reframe)</label>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <textarea 
                  value={balancedThought}
                  onChange={(e) => setBalancedThought(e.target.value)}
                  placeholder="How could you think about this situation more balanced?"
                  className="w-full bg-transparent text-white placeholder-slate-400 resize-none border-none outline-none"
                  rows={3}
                />
              </div>
            </div>

            <Button 
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3"
              disabled={!situation || !automaticThought}
            >
              Save Thought Entry
            </Button>
          </div>

          <Card className="bg-slate-700/30 border-slate-600 mt-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Pattern Recognition</h3>
              <p className="text-slate-300">Log more thoughts to identify your thinking patterns...</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">0</div>
                <div className="text-slate-300">Thoughts Logged</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">0</div>
                <div className="text-slate-300">Successful Reframes</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThoughtGarden;
