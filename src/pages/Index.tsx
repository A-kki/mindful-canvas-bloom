
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Sun } from 'lucide-react';
import MoodTracker from '@/components/MoodTracker';
import MindfulMinutes from '@/components/MindfulMinutes';
import VentSpace from '@/components/VentSpace';
import ThoughtGarden from '@/components/ThoughtGarden';
import SereneSchedule from '@/components/SereneSchedule';
import YogaSadhna from '@/components/YogaSadhna';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentQuote, setCurrentQuote] = useState({ text: '', author: '' });

  const quotes = [
    { text: "The greatest revolution of our generation is the discovery that human beings, by changing the inner attitudes of their minds, can change the outer aspects of their lives.", author: "William James" },
    { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { text: "The mind is everything. What you think you become.", author: "Buddha" },
    { text: "You have been critical of yourself for years, and it hasn't worked. Try approving of yourself and see what happens.", author: "Louise Hay" },
    { text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.", author: "Noam Shpancer" },
    { text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.", author: "Unknown" },
    { text: "It's okay to not be okay. It's not okay to stay that way.", author: "Unknown" },
    { text: "Healing takes time, and asking for help is a courageous step.", author: "Mariska Hargitay" },
    { text: "The strongest people are not those who show strength in front of us, but those who win battles we know nothing about.", author: "Unknown" },
    { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Set random quote on component mount
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

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
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <Button 
              onClick={() => setActiveSection('home')}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-2xl px-6 py-3 font-bold transform hover:scale-105 transition-all duration-300"
            >
              🏠 Back to Home
            </Button>
            <Button
              onClick={toggleDarkMode}
              className="bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-800 dark:to-slate-900 hover:from-slate-700 hover:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-800 text-white rounded-full w-12 h-12 text-lg font-bold transform hover:scale-110 transition-all duration-300"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
          {renderActiveComponent()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 text-gray-800 dark:text-white transition-all duration-500">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-gradient-to-r from-white/80 to-purple-100/80 dark:from-slate-800/90 dark:to-blue-900/90 border-purple-200/50 dark:border-slate-700/50 backdrop-blur-sm shadow-2xl rounded-3xl transition-all duration-500">
          <CardContent className="p-8">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-pink-400 dark:from-blue-400 dark:to-indigo-500 rounded-full flex items-center justify-center text-3xl animate-bounce">
                  🌈
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-purple-600 to-pink-600 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
                    MindWell Kids! 
                  </h1>
                  <p className="text-purple-600 dark:text-blue-300 text-xl font-medium">Your Magical Wellness Adventure! ✨</p>
                </div>
              </div>
              
              {/* Features Menu - Top Right */}
              <div className="flex flex-col items-end gap-4">
                <Button
                  onClick={toggleDarkMode}
                  className="bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-800 dark:to-slate-900 hover:from-slate-700 hover:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-800 text-white rounded-full w-16 h-16 text-2xl font-bold transform hover:scale-110 transition-all duration-300"
                >
                  {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  {menuItems.map((item) => (
                    <Button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`bg-gradient-to-br ${item.gradient} dark:from-slate-700 dark:to-slate-800 hover:scale-110 text-white p-4 h-auto flex flex-col gap-2 transition-all duration-300 backdrop-blur-sm rounded-2xl border-2 border-white/20 dark:border-slate-600/50 shadow-lg hover:shadow-2xl w-32`}
                    >
                      <span className="text-2xl animate-pulse">{item.icon}</span>
                      <span className="text-xs font-bold text-center leading-tight">{item.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Quote Section */}
        <div className="mt-8">
          <Card className="bg-gradient-to-br from-white/90 to-yellow-100/90 dark:from-slate-800/90 dark:to-blue-900/90 border-yellow-200/50 dark:border-slate-700/50 backdrop-blur-sm shadow-2xl rounded-3xl transition-all duration-500">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-4xl animate-pulse">💫</span>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-300 dark:to-orange-300 bg-clip-text text-transparent">
                  Today's Inspiration
                </h2>
                <span className="text-4xl animate-pulse">✨</span>
              </div>
              
              <blockquote className="text-xl font-medium italic text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
                "{currentQuote.text}"
              </blockquote>
              
              <p className="text-lg font-semibold text-purple-600 dark:text-blue-300">
                — {currentQuote.author}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Why Mental Health is Important */}
        <div className="mt-8">
          <Card className="bg-gradient-to-br from-white/90 to-green-100/90 dark:from-slate-800/90 dark:to-blue-900/90 border-green-200/50 dark:border-slate-700/50 backdrop-blur-sm shadow-2xl rounded-3xl transition-all duration-500">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl animate-pulse">🧠</span>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-300 dark:to-teal-300 bg-clip-text text-transparent">
                  Why Mental Health Matters 💚
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🌱</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Emotional Growth</h3>
                      <p className="text-gray-600 dark:text-gray-300">Mental wellness helps you understand and manage your emotions, building resilience for life's challenges.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Better Focus</h3>
                      <p className="text-gray-600 dark:text-gray-300">A healthy mind improves concentration, learning abilities, and academic performance.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">👫</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Stronger Relationships</h3>
                      <p className="text-gray-600 dark:text-gray-300">Mental wellness helps you connect better with family, friends, and build meaningful relationships.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🌟</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Life Satisfaction</h3>
                      <p className="text-gray-600 dark:text-gray-300">Taking care of your mental health leads to greater happiness and a more fulfilling life.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Fun Preview */}
        <div className="mt-12">
          <Card className="bg-gradient-to-br from-white/80 to-pink-100/80 dark:from-slate-800/90 dark:to-blue-900/90 border-purple-200/50 dark:border-slate-700/50 backdrop-blur-sm shadow-2xl rounded-3xl transition-all duration-500">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl animate-bounce">😊</span>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-purple-600 to-pink-600 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
                  How Are You Feeling Today? 🎭
                </h2>
              </div>
              
              <div className="grid grid-cols-5 gap-4 mb-6">
                {['😰', '😢', '😐', '😊', '🤩'].map((emoji, index) => (
                  <Card key={index} className="bg-gradient-to-br from-purple-200/50 to-pink-200/50 dark:from-slate-700/50 dark:to-blue-800/50 border-purple-300/50 dark:border-slate-600/50 border-2 hover:scale-110 transition-all duration-300 cursor-pointer rounded-3xl">
                    <CardContent className="p-6 text-center">
                      <div className="text-5xl mb-2 transform hover:scale-125 transition-transform duration-200">{emoji}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-gradient-to-r from-pink-200/50 to-purple-200/50 dark:from-slate-700/50 dark:to-blue-800/50 rounded-3xl p-6 mb-6 border-2 border-dashed border-pink-300/50 dark:border-slate-600/50">
                <textarea 
                  placeholder="🌟 Tell me about your day... What made you smile? 🌟"
                  className="w-full bg-transparent text-gray-700 dark:text-white placeholder-purple-500 dark:placeholder-blue-300 resize-none border-none outline-none text-lg font-medium"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-orange-200/50 to-red-200/50 dark:from-slate-700/50 dark:to-blue-800/50 border-orange-300/50 dark:border-slate-600/50 border-2 rounded-3xl">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">🔥 0</div>
                    <div className="text-orange-600 dark:text-orange-300 font-medium">Day Streak!</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-cyan-200/50 to-blue-200/50 dark:from-slate-700/50 dark:to-blue-800/50 border-cyan-300/50 dark:border-slate-600/50 border-2 rounded-3xl">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">⭐ 0</div>
                    <div className="text-cyan-600 dark:text-cyan-300 font-medium">Mood Score</div>
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
