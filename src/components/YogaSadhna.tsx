
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Square } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const YogaSadhna = () => {
  const [selectedYoga, setSelectedYoga] = useState('pranayama');
  const [duration, setDuration] = useState([5]); // Default 5 minutes
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const yogaTypes = [
    { 
      id: 'pranayama', 
      name: 'Pranayama (Breathing)', 
      description: 'Close right nostril, inhale through left. Close left, exhale through right. Repeat.',
      icon: '🫁',
      color: 'from-pink-500 to-rose-500'
    },
    { 
      id: 'gentle', 
      name: 'Gentle Yoga Flow', 
      description: 'Slow, mindful movements connecting breath and body.',
      icon: '🧘‍♀️',
      color: 'from-purple-500 to-indigo-500'
    },
    { 
      id: 'restorative', 
      name: 'Restorative Poses', 
      description: 'Deep relaxation poses held for extended periods.',
      icon: '🌸',
      color: 'from-green-500 to-teal-500'
    },
    { 
      id: 'nidra', 
      name: 'Yoga Nidra', 
      description: 'Guided body scan meditation for deep relaxation.',
      icon: '🌙',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const currentYoga = yogaTypes.find(yoga => yoga.id === selectedYoga);

  // Timer effect
  useEffect(() => {
    if (isActive && !isPaused && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            // Time's up - play ticking sound and show notification
            playTickingSound();
            toast({
              title: "Session Complete! 🧘‍♀️",
              description: "Your yoga session has ended. Great work!",
            });
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, timeRemaining, toast]);

  const playTickingSound = () => {
    // Create a simple ticking sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create multiple beeps for a ticking effect
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      }, i * 200);
    }
  };

  const startSession = () => {
    setTimeRemaining(duration[0] * 60); // Convert minutes to seconds
    setIsActive(true);
    setIsPaused(false);
    toast({
      title: "Session Started",
      description: `Starting ${currentYoga?.name} for ${duration[0]} minutes`,
    });
  };

  const pauseSession = () => {
    setIsPaused(!isPaused);
  };

  const stopSession = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeRemaining(0);
    toast({
      title: "Session Stopped",
      description: "Your yoga session has been ended",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🧘‍♀️</span>
            <h1 className="text-3xl font-bold text-white">Yoga Sadhna</h1>
          </div>

          <div className="mb-8">
            <label className="block text-white font-semibold mb-4">Choose your practice:</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {yogaTypes.map((yoga) => (
                <Card 
                  key={yoga.id}
                  className={`cursor-pointer transition-all ${
                    selectedYoga === yoga.id 
                      ? 'ring-2 ring-cyan-400 bg-slate-600/50' 
                      : 'bg-slate-700/30 hover:bg-slate-600/30'
                  } border-slate-600`}
                  onClick={() => setSelectedYoga(yoga.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{yoga.icon}</span>
                      <h3 className="text-lg font-semibold text-white">{yoga.name}</h3>
                    </div>
                    <p className="text-slate-300 text-sm">{yoga.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Duration Setting */}
          <Card className="bg-slate-700/30 border-slate-600 mb-6">
            <CardContent className="p-6">
              <label className="block text-white font-semibold mb-4">Session Duration: {duration[0]} minutes</label>
              <Slider
                value={duration}
                onValueChange={setDuration}
                max={60}
                min={1}
                step={1}
                className="w-full"
                disabled={isActive}
              />
              <div className="flex justify-between text-slate-400 text-sm mt-2">
                <span>1 min</span>
                <span>30 min</span>
                <span>60 min</span>
              </div>
            </CardContent>
          </Card>

          {currentYoga && (
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-8 text-center">
                <div className={`w-32 h-32 mx-auto mb-6 bg-gradient-to-r ${currentYoga.color} rounded-full flex items-center justify-center`}>
                  <span className="text-5xl">{currentYoga.icon}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4">{currentYoga.name}</h2>
                <p className="text-slate-300 mb-6 text-lg">{currentYoga.description}</p>
                
                <div className="text-6xl font-bold text-white mb-6">
                  {isActive ? formatTime(timeRemaining) : formatTime(duration[0] * 60)}
                </div>

                <div className="flex justify-center gap-4">
                  {!isActive ? (
                    <Button 
                      onClick={startSession}
                      className={`px-8 py-3 text-white bg-gradient-to-r ${currentYoga.color} hover:opacity-90 transition-opacity`}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Session
                    </Button>
                  ) : (
                    <>
                      <Button 
                        onClick={pauseSession}
                        className="px-6 py-3 text-white bg-slate-600 hover:bg-slate-500 transition-colors"
                      >
                        {isPaused ? <Play className="w-5 h-5 mr-2" /> : <Pause className="w-5 h-5 mr-2" />}
                        {isPaused ? 'Resume' : 'Pause'}
                      </Button>
                      <Button 
                        onClick={stopSession}
                        className="px-6 py-3 text-white bg-red-600 hover:bg-red-500 transition-colors"
                      >
                        <Square className="w-5 h-5 mr-2" />
                        Stop
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4 mt-8">
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

export default YogaSadhna;
