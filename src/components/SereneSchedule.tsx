
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SereneSchedule = () => {
  const [newHabit, setNewHabit] = useState('');
  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning Gratitude', streak: 0 }
  ]);

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, { 
        id: Date.now(), 
        name: newHabit, 
        streak: 0 
      }]);
      setNewHabit('');
    }
  };

  const getDaysInMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const days = [];
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const days = getDaysInMonth();

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">📅</span>
            <h1 className="text-3xl font-bold text-white">SereneSchedule - Habit Tracker</h1>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Add New Habit</h3>
            <div className="flex gap-4">
              <div className="flex-1 bg-slate-700/30 rounded-lg p-4">
                <input 
                  type="text"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  placeholder="e.g., Morning gratitude, 10-minute walk, drink water"
                  className="w-full bg-transparent text-white placeholder-slate-400 border-none outline-none"
                />
              </div>
              <Button 
                onClick={addHabit}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                disabled={!newHabit.trim()}
              >
                Add Habit
              </Button>
            </div>
          </div>

          {habits.map((habit) => (
            <Card key={habit.id} className="bg-slate-700/30 border-slate-600 mb-6">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">{habit.name}</h3>
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-full">
                    <span className="text-white font-semibold">Streak: {habit.streak} days</span>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-slate-300 font-semibold p-2">
                      {day}
                    </div>
                  ))}
                  {days.map((day, index) => (
                    <div key={index} className="aspect-square">
                      {day && (
                        <Button
                          className="w-full h-full bg-slate-600 hover:bg-slate-500 text-white border border-slate-500"
                        >
                          {day}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <span className="text-lg">🔥 <span className="text-cyan-400 font-bold">0 day streak</span></span>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SereneSchedule;
