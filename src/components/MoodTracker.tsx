
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodNote, setMoodNote] = useState('');

  const moods = [
    { emoji: '😰', label: 'Worried', value: 1, color: 'from-red-400 to-red-600', darkColor: 'dark:from-red-600 dark:to-red-800' },
    { emoji: '😢', label: 'Sad', value: 2, color: 'from-blue-400 to-blue-600', darkColor: 'dark:from-blue-700 dark:to-blue-900' },
    { emoji: '😐', label: 'Okay', value: 3, color: 'from-gray-400 to-gray-600', darkColor: 'dark:from-slate-600 dark:to-slate-800' },
    { emoji: '😊', label: 'Happy', value: 4, color: 'from-yellow-400 to-yellow-600', darkColor: 'dark:from-yellow-600 dark:to-yellow-800' },
    { emoji: '🤩', label: 'Amazing!', value: 5, color: 'from-green-400 to-green-600', darkColor: 'dark:from-green-600 dark:to-green-800' },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-white/90 to-purple-100/90 dark:from-slate-800/90 dark:to-blue-950/90 border-purple-200/50 dark:border-slate-700/30 backdrop-blur-sm shadow-2xl transition-all duration-500">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="text-6xl animate-pulse">😊</div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-purple-600 to-pink-600 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
              MoodMate - How I Feel Today! 🌈
            </h1>
          </div>
          
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              🎭 Pick your mood superhero! 🦸‍♀️
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {moods.map((mood) => (
                <Card 
                  key={mood.value}
                  className={`bg-gradient-to-br ${mood.color} ${mood.darkColor} hover:scale-110 transition-all duration-300 cursor-pointer transform ${
                    selectedMood === mood.value ? 'ring-4 ring-purple-400 dark:ring-blue-400 scale-110 shadow-2xl' : 'hover:shadow-lg'
                  } rounded-3xl border-2 border-white/20 dark:border-slate-600/20`}
                  onClick={() => setSelectedMood(mood.value)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-3 transform hover:scale-125 transition-transform duration-200">
                      {mood.emoji}
                    </div>
                    <div className="text-white text-sm font-bold">{mood.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              💭 Tell me more! (if you want to)
            </h3>
            <div className="bg-gradient-to-r from-pink-200/50 to-purple-200/50 dark:from-slate-700/50 dark:to-blue-800/50 rounded-3xl p-6 border-2 border-dashed border-pink-300/50 dark:border-slate-600/50">
              <textarea 
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                placeholder="🌟 What made you feel this way today? Share your adventure! 🌟"
                className="w-full bg-transparent text-gray-700 dark:text-white placeholder-purple-500 dark:placeholder-blue-300 resize-none border-none outline-none text-lg font-medium"
                rows={4}
              />
            </div>
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 dark:from-slate-700 dark:to-blue-800 hover:from-pink-600 hover:to-purple-600 dark:hover:from-slate-600 dark:hover:to-blue-700 text-white py-4 text-xl font-bold rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            disabled={!selectedMood}
          >
            ✨ Save My Mood Magic! ✨
          </Button>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <Card className="bg-gradient-to-br from-orange-200/50 to-red-200/50 dark:from-slate-700/50 dark:to-blue-800/50 border-orange-300/50 dark:border-slate-600/50 border-2 rounded-3xl">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2">🔥 0</div>
                <div className="text-orange-600 dark:text-orange-300 text-lg font-medium">Day Streak!</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-cyan-200/50 to-blue-200/50 dark:from-slate-700/50 dark:to-blue-800/50 border-cyan-300/50 dark:border-slate-600/50 border-2 rounded-3xl">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">⭐ 0</div>
                <div className="text-cyan-600 dark:text-cyan-300 text-lg font-medium">Mood Score</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;
