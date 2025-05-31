
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
      <Card className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 border-purple-500/30 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="text-5xl animate-bounce">📝</div>
            <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              VentSpace - My Secret Diary! 🌈
            </h1>
          </div>

          <div className="mb-8">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-6 mb-4 border-2 border-dashed border-purple-300/50">
              <textarea 
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="✨ Write your thoughts here... This is your magical safe space! ✨"
                className="w-full bg-transparent text-white placeholder-purple-200 resize-none border-none outline-none text-lg leading-relaxed font-medium"
                rows={12}
              />
            </div>

            <div className="flex items-center space-x-3 mb-6">
              <Checkbox 
                id="share-anonymous"
                checked={shareAnonymously}
                onCheckedChange={(checked) => setShareAnonymously(checked === true)}
                className="border-purple-300 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500 rounded-lg w-5 h-5"
              />
              <label htmlFor="share-anonymous" className="text-purple-200 font-medium text-lg">
                🤝 Share anonymously for friendship support
              </label>
            </div>

            <Button 
              onClick={handleSaveEntry}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              disabled={!journalEntry.trim()}
            >
              🌟 Save My Entry! 🌟
            </Button>
          </div>

          <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-cyan-300/50 border-2 rounded-3xl">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                🤖 Mood Detective AI 🔍
              </h3>
              <div className="mb-4">
                <textarea 
                  value={analysisText}
                  onChange={(e) => setAnalysisText(e.target.value)}
                  placeholder="🎭 Write something and let me guess how you're feeling..."
                  className="w-full bg-cyan-500/10 text-white placeholder-cyan-200 resize-none border-2 border-cyan-300/30 rounded-2xl p-4 outline-none text-lg"
                  rows={4}
                />
              </div>
              <Button 
                onClick={handleAnalysis}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-lg font-bold py-3 rounded-2xl transform hover:scale-105 transition-all duration-300"
                disabled={!analysisText.trim()}
              >
                🎯 Analyze My Feelings!
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-300/50 border-2 rounded-3xl">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-yellow-300 mb-2">0</div>
                <div className="text-yellow-100 text-lg font-medium">📖 My Stories</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-300/50 border-2 rounded-3xl">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-green-300 mb-2">0</div>
                <div className="text-green-100 text-lg font-medium">💝 Friend Hearts</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VentSpace;
