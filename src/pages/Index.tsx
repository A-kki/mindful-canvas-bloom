
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MoodTracker from '@/components/MoodTracker';
import MindfulMinutes from '@/components/MindfulMinutes';
import VentSpace from '@/components/VentSpace';
import ThoughtGarden from '@/components/ThoughtGarden';
import SereneSchedule from '@/components/SereneSchedule';
import YogaSadhna from '@/components/YogaSadhna';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const menuItems = [
    { id: 'mood', label: 'MoodMate', icon: '😊', component: MoodTracker },
    { id: 'mindful', label: 'MindfulMinutes', icon: '🧘', component: MindfulMinutes },
    { id: 'vent', label: 'VentSpace', icon: '📝', component: VentSpace },
    { id: 'thought', label: 'ThoughtGarden', icon: '🌱', component: ThoughtGarden },
    { id: 'schedule', label: 'SereneSchedule', icon: '📅', component: SereneSchedule },
    { id: 'yoga', label: 'Yoga Sadhna', icon: '🧘‍♀️', component: YogaSadhna },
  ];

  const renderActiveComponent = () => {
    const activeItem = menuItems.find(item => item.id === activeSection);
    if (activeItem && activeItem.component) {
      const Component = activeItem.component;
      return <Component />;
    }
    return null;
  };

  if (activeSection !== 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <Button 
            onClick={() => setActiveSection('home')}
            className="mb-6 bg-slate-700 hover:bg-slate-600 text-white"
          >
            ← Back to Home
          </Button>
          {renderActiveComponent()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-orange-400 rounded-full flex items-center justify-center">
                  💭
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">MindWell</h1>
                  <p className="text-slate-300 text-lg">Your Complete Mental Wellness Companion</p>
                </div>
              </div>
              <Button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="bg-slate-700 hover:bg-slate-600 text-white rounded-full w-12 h-12"
              >
                🌙
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Menu */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="bg-slate-700/50 hover:bg-slate-600 text-white p-6 h-auto flex flex-col gap-2 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Button>
          ))}
        </div>

        {/* Main Content - MoodMate Preview */}
        <div className="mt-12">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">😊</span>
                <h2 className="text-2xl font-bold text-white">MoodMate - Daily Mood Tracker</h2>
              </div>
              
              <div className="grid grid-cols-5 gap-4 mb-6">
                {['😨', '😔', '😐', '😊', '😄'].map((emoji, index) => (
                  <Card key={index} className="bg-slate-700/50 border-slate-600 hover:bg-slate-600/50 transition-colors cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-2">{emoji}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-slate-700/30 rounded-lg p-4 mb-6">
                <textarea 
                  placeholder="How are you feeling today? Share your thoughts..."
                  className="w-full bg-transparent text-white placeholder-slate-400 resize-none border-none outline-none"
                  rows={3}
                />
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
                    <div className="text-slate-300">Avg Mood</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
