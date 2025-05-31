
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodNote, setMoodNote] = useState('');

  const moods = [
    { emoji: '😨', label: 'Anxious', value: 1 },
    { emoji: '😔', label: 'Sad', value: 2 },
    { emoji: '😐', label: 'Neutral', value: 3 },
    { emoji: '😊', label: 'Happy', value: 4 },
    { emoji: '😄', label: 'Excited', value: 5 },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">😊</span>
            <h1 className="text-3xl font-bold text-white">MoodMate - Daily Mood Tracker</h1>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">How are you feeling today?</h3>
            <div className="grid grid-cols-5 gap-4">
              {moods.map((mood) => (
                <Card 
                  key={mood.value}
                  className={`bg-slate-700/50 border-slate-600 hover:bg-slate-600/50 transition-all cursor-pointer ${
                    selectedMood === mood.value ? 'ring-2 ring-cyan-400 bg-cyan-400/20' : ''
                  }`}
                  onClick={() => setSelectedMood(mood.value)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-2">{mood.emoji}</div>
                    <div className="text-white text-sm">{mood.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">Share your thoughts (optional)</h3>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <textarea 
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                placeholder="How are you feeling today? Share your thoughts..."
                className="w-full bg-transparent text-white placeholder-slate-400 resize-none border-none outline-none"
                rows={4}
              />
            </div>
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3"
            disabled={!selectedMood}
          >
            Save Mood Entry
          </Button>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">0</div>
                <div className="text-slate-300">Day Streak</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">0</div>
                <div className="text-slate-300">Avg Mood</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;
