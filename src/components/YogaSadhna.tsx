
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const YogaSadhna = () => {
  const [selectedYoga, setSelectedYoga] = useState('pranayama');

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

          {currentYoga && (
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-8 text-center">
                <div className={`w-32 h-32 mx-auto mb-6 bg-gradient-to-r ${currentYoga.color} rounded-full flex items-center justify-center`}>
                  <span className="text-5xl">{currentYoga.icon}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4">{currentYoga.name}</h2>
                <p className="text-slate-300 mb-6 text-lg">{currentYoga.description}</p>
                
                <div className="text-6xl font-bold text-white mb-6">
                  01:00
                </div>

                <Button 
                  className={`px-8 py-3 text-white bg-gradient-to-r ${currentYoga.color} hover:opacity-90 transition-opacity`}
                >
                  Start Session
                </Button>
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
