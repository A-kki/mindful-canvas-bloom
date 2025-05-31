
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const VentSpace = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const [shareAnonymously, setShareAnonymously] = useState(false);
  const [analysisText, setAnalysisText] = useState('');

  const handleSaveEntry = () => {
    console.log('Saving journal entry:', { journalEntry, shareAnonymously });
    // Here you would typically save to a database
    setJournalEntry('');
  };

  const handleAnalysis = () => {
    if (analysisText.trim()) {
      console.log('Running AI analysis on:', analysisText);
      // Here you would typically call an AI service
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">📝</span>
            <h1 className="text-3xl font-bold text-white">VentSpace - Anonymous Journaling</h1>
          </div>

          <div className="mb-8">
            <div className="bg-slate-700/30 rounded-lg p-6 mb-4">
              <textarea 
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="Write your thoughts freely... This is your safe space."
                className="w-full bg-transparent text-white placeholder-slate-400 resize-none border-none outline-none text-lg leading-relaxed"
                rows={12}
              />
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <Checkbox 
                id="share-anonymous"
                checked={shareAnonymously}
                onCheckedChange={setShareAnonymously}
                className="border-slate-400"
              />
              <label htmlFor="share-anonymous" className="text-slate-300">
                Share anonymously for community support
              </label>
            </div>

            <Button 
              onClick={handleSaveEntry}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3"
              disabled={!journalEntry.trim()}
            >
              Save Entry
            </Button>
          </div>

          <Card className="bg-slate-700/30 border-slate-600">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">AI Tone Analysis</h3>
              <div className="mb-4">
                <textarea 
                  value={analysisText}
                  onChange={(e) => setAnalysisText(e.target.value)}
                  placeholder="Write something to get AI-powered emotional insights..."
                  className="w-full bg-slate-600/30 text-white placeholder-slate-400 resize-none border border-slate-500 rounded-lg p-4 outline-none"
                  rows={4}
                />
              </div>
              <Button 
                onClick={handleAnalysis}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                disabled={!analysisText.trim()}
              >
                Analyze Emotional Tone
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">0</div>
                <div className="text-slate-300">Journal Entries</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">0</div>
                <div className="text-slate-300">Support Reactions</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VentSpace;
