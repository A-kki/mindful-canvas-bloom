
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MindfulMinutes = () => {
  const [selectedExercise, setSelectedExercise] = useState('breathing');
  const [duration, setDuration] = useState(2);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  const exercises = [
    { id: 'breathing', name: 'Breathing Exercise', instruction: 'Focus on your breath. Breathe in slowly, hold, then breathe out.' },
    { id: 'bodyMScan', name: 'Body Scan', instruction: 'Start from your toes and slowly scan up through your body.' },
    { id: 'mindfulness', name: 'Mindfulness', instruction: 'Notice your thoughts without judgment. Let them pass like clouds.' }
  ];

  const durations = [1, 2, 5, 10, 15, 20];

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
  };

  const currentExercise = exercises.find(ex => ex.id === selectedExercise);

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🧘</span>
            <h1 className="text-3xl font-bold text-white">MindfulMinutes - Guided Meditation</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-white font-semibold mb-2">Exercise Type</label>
              <Select value={selectedExercise} onValueChange={setSelectedExercise}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {exercises.map(exercise => (
                    <SelectItem key={exercise.id} value={exercise.id} className="text-white">
                      {exercise.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Duration</label>
              <Select value={duration.toString()} onValueChange={(value) => setDuration(parseInt(value))}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {durations.map(dur => (
                    <SelectItem key={dur} value={dur.toString()} className="text-white">
                      {dur} Minutes
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="text-8xl font-bold text-white mb-4">
              {formatTime(timeLeft)}
            </div>
            
            <div className="w-64 h-64 mx-auto mb-6 bg-slate-700/30 rounded-full flex items-center justify-center relative overflow-hidden">
              <div className={`absolute inset-0 rounded-full border-4 border-cyan-400 ${isActive ? 'animate-pulse' : ''}`}></div>
              <div className="text-center text-white p-8">
                <div className="text-lg font-semibold mb-2">{currentExercise?.name}</div>
                <div className="text-sm">{currentExercise?.instruction}</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button 
                onClick={handleStart}
                className={`px-8 py-3 text-white ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'}`}
              >
                {isActive ? 'Pause' : 'Start Meditation'}
              </Button>
              <Button 
                onClick={handleReset}
                className="px-8 py-3 bg-slate-600 hover:bg-slate-500 text-white"
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">0</div>
                <div className="text-slate-300">Day Streak</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">0</div>
                <div className="text-slate-300">Total Minutes</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MindfulMinutes;
