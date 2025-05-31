
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
    { id: 'mood', label: 'MoodMate', icon: '😊', component: MoodTracker, gradient: 'from-pink-500 to-purple-500' },
    { id: 'mindful', label: 'MindfulMinutes', icon: '🧘', component: MindfulMinutes, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'vent', label: 'VentSpace', icon: '📝', component: VentSpace, gradient: 'from-purple-500 to-indigo-500' },
    { id: 'thought', label: 'ThoughtGarden', icon: '🌱', component: ThoughtGarden, gradient: 'from-green-500 to-emerald-500' },
    { id: 'schedule', label: 'SereneSchedule', icon: '📅', component: SereneSchedule, gradient: 'from-orange-500 to-red-500' },
    { id: 'yoga', label: 'Yoga Sadhna', icon: '🧘‍♀️', component: YogaSadhna, gradient: 'from-teal-500 to-blue-500' },
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="container mx-auto px-4 py-8">
          <Button 
            onClick={() => setActiveSection('home')}
            className="mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-2xl px-6 py-3 font-bold transform hover:scale-105 transition-all duration-300"
          >
            🏠 Back to Home
          </Button>
          {renderActiveComponent()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-gradient-to-r from-indigo-800/50 to-purple-800/50 border-purple-500/30 backdrop-blur-sm shadow-2xl rounded-3xl">
          <CardContent className="p-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full flex items-center justify-center text-3xl animate-bounce">
                  🌈
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                    MindWell Kids! 
                  </h1>
                  <p className="text-purple-200 text-xl font-medium">Your Magical Wellness Adventure! ✨</p>
                </div>
              </div>
              <Button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-purple-900 rounded-full w-16 h-16 text-2xl font-bold transform hover:scale-110 transition-all duration-300"
              >
                🌙
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Menu */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`bg-gradient-to-br ${item.gradient} hover:scale-110 text-white p-6 h-auto flex flex-col gap-3 transition-all duration-300 backdrop-blur-sm rounded-3xl border-2 border-white/20 shadow-lg hover:shadow-2xl`}
            >
              <span className="text-4xl animate-pulse">{item.icon}</span>
              <span className="text-sm font-bold text-center">{item.label}</span>
            </Button>
          ))}
        </div>

        {/* Main Content - Fun Preview */}
        <div className="mt-12">
          <Card className="bg-gradient-to-br from-purple-800/50 to-pink-800/50 border-purple-500/30 backdrop-blur-sm shadow-2xl rounded-3xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl animate-bounce">😊</span>
                <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                  How Are You Feeling Today? 🎭
                </h2>
              </div>
              
              <div className="grid grid-cols-5 gap-4 mb-6">
                {['😰', '😢', '😐', '😊', '🤩'].map((emoji, index) => (
                  <Card key={index} className="bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border-purple-300/50 border-2 hover:scale-110 transition-all duration-300 cursor-pointer rounded-3xl">
                    <CardContent className="p-6 text-center">
                      <div className="text-5xl mb-2 transform hover:scale-125 transition-transform duration-200">{emoji}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-3xl p-6 mb-6 border-2 border-dashed border-pink-300/50">
                <textarea 
                  placeholder="🌟 Tell me about your day... What made you smile? 🌟"
                  className="w-full bg-transparent text-white placeholder-pink-200 resize-none border-none outline-none text-lg font-medium"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-300/50 border-2 rounded-3xl">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-orange-300 mb-2">🔥 0</div>
                    <div className="text-orange-100 font-medium">Day Streak!</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-300/50 border-2 rounded-3xl">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-cyan-300 mb-2">⭐ 0</div>
                    <div className="text-cyan-100 font-medium">Mood Score</div>
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
