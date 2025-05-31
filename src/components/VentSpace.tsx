
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const VentSpace = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const [shareAnonymously, setShareAnonymously] = useState(false);
  const [analysisText, setAnalysisText] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSaveEntry = () => {
    console.log('Saving journal entry:', { journalEntry, shareAnonymously });
    // Here you would typically save to a database
    setJournalEntry('');
  };

  const handleAnalysis = async () => {
    if (!analysisText.trim()) return;
    
    setIsAnalyzing(true);
    try {
      // Simulate AI analysis (in real app, you'd call an AI service)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI response based on text sentiment
      const positiveWords = ['happy', 'joy', 'great', 'wonderful', 'love', 'excited', 'amazing'];
      const negativeWords = ['sad', 'angry', 'upset', 'worried', 'anxious', 'stressed', 'bad'];
      
      const text = analysisText.toLowerCase();
      const hasPositive = positiveWords.some(word => text.includes(word));
      const hasNegative = negativeWords.some(word => text.includes(word));
      
      let analysis = '';
      if (hasPositive && !hasNegative) {
        analysis = '😊 I sense positive emotions! You seem to be feeling happy and optimistic. This is wonderful! Keep nurturing these positive feelings.';
      } else if (hasNegative && !hasPositive) {
        analysis = '💙 I detect some challenging emotions. It\'s okay to feel this way - your feelings are valid. Consider talking to someone you trust or trying some relaxation techniques.';
      } else if (hasPositive && hasNegative) {
        analysis = '🌈 You seem to have mixed emotions - both positive and challenging feelings. This is completely normal! Life has ups and downs, and you\'re processing them beautifully.';
      } else {
        analysis = '🤔 I sense neutral emotions. You might be feeling calm or reflective. This is a good time for self-reflection and planning ahead.';
      }
      
      setAiAnalysis(analysis);
    } catch (error) {
      setAiAnalysis('🤖 Sorry, I had trouble analyzing your text. Please try again!');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-white/90 to-purple-100/90 dark:from-slate-800/90 dark:to-blue-950/90 border-purple-200/50 dark:border-slate-700/30 backdrop-blur-sm shadow-2xl transition-all duration-500">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="text-5xl animate-bounce">📝</div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-purple-600 to-pink-600 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
              VentSpace - My Secret Diary! 🌈
            </h1>
          </div>

          <div className="mb-8">
            <div className="bg-gradient-to-r from-purple-200/50 to-pink-200/50 dark:from-slate-700/50 dark:to-blue-800/50 rounded-3xl p-6 mb-4 border-2 border-dashed border-purple-300/50 dark:border-slate-600/50">
              <textarea 
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="✨ Write your thoughts here... This is your magical safe space! ✨"
                className="w-full bg-transparent text-gray-700 dark:text-white placeholder-purple-500 dark:placeholder-blue-300 resize-none border-none outline-none text-lg leading-relaxed font-medium"
                rows={12}
              />
            </div>

            <div className="flex items-center space-x-3 mb-6">
              <Checkbox 
                id="share-anonymous"
                checked={shareAnonymously}
                onCheckedChange={(checked) => setShareAnonymously(checked === true)}
                className="border-purple-400 dark:border-blue-400 data-[state=checked]:bg-purple-500 dark:data-[state=checked]:bg-blue-600 data-[state=checked]:border-purple-500 dark:data-[state=checked]:border-blue-600 rounded-lg w-5 h-5"
              />
              <label htmlFor="share-anonymous" className="text-purple-600 dark:text-blue-300 font-medium text-lg">
                🤝 Share anonymously for friendship support
              </label>
            </div>

            <Button 
              onClick={handleSaveEntry}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 dark:from-slate-700 dark:to-blue-800 hover:from-purple-600 hover:to-pink-600 dark:hover:from-slate-600 dark:hover:to-blue-700 text-white py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              disabled={!journalEntry.trim()}
            >
              🌟 Save My Entry! 🌟
            </Button>
          </div>

          <Card className="bg-gradient-to-r from-blue-200/50 to-cyan-200/50 dark:from-slate-700/50 dark:to-blue-800/50 border-cyan-300/50 dark:border-slate-600/50 border-2 rounded-3xl">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                🤖 AI Mood Detective 🔍
              </h3>
              <div className="mb-4">
                <textarea 
                  value={analysisText}
                  onChange={(e) => setAnalysisText(e.target.value)}
                  placeholder="🎭 Write something and let me guess how you're feeling..."
                  className="w-full bg-cyan-100/30 dark:bg-slate-800/30 text-gray-700 dark:text-white placeholder-cyan-600 dark:placeholder-blue-300 resize-none border-2 border-cyan-300/30 dark:border-slate-600/30 rounded-2xl p-4 outline-none text-lg"
                  rows={4}
                />
              </div>
              <Button 
                onClick={handleAnalysis}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-slate-600 dark:to-blue-700 hover:from-cyan-600 hover:to-blue-600 dark:hover:from-slate-500 dark:hover:to-blue-600 text-white text-lg font-bold py-3 rounded-2xl transform hover:scale-105 transition-all duration-300"
                disabled={!analysisText.trim() || isAnalyzing}
              >
                {isAnalyzing ? '🔄 Analyzing...' : '🎯 Analyze My Feelings!'}
              </Button>
              
              {aiAnalysis && (
                <div className="mt-4 p-4 bg-gradient-to-r from-green-100/50 to-blue-100/50 dark:from-slate-600/50 dark:to-blue-700/50 rounded-2xl border border-green-300/30 dark:border-slate-500/30">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">🎭 AI Analysis:</h4>
                  <p className="text-gray-700 dark:text-gray-200">{aiAnalysis}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <Card className="bg-gradient-to-br from-yellow-200/50 to-orange-200/50 dark:from-slate-700/50 dark:to-blue-800/50 border-yellow-300/50 dark:border-slate-600/50 border-2 rounded-3xl">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">0</div>
                <div className="text-yellow-600 dark:text-yellow-300 text-lg font-medium">📖 My Stories</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-200/50 to-emerald-200/50 dark:from-slate-700/50 dark:to-blue-800/50 border-green-300/50 dark:border-slate-600/50 border-2 rounded-3xl">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">0</div>
                <div className="text-green-600 dark:text-green-300 text-lg font-medium">💝 Friend Hearts</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VentSpace;
