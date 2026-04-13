import { useState } from 'react';
import api from '../utils/api';
import { Check, CheckCircle2, Circle } from 'lucide-react';

const DailyTracker = ({ todayHabit, onHabitSubmitted }) => {
  const [avoidedInstagram, setAvoidedInstagram] = useState(false);
  const [avoidedDistractions, setAvoidedDistractions] = useState(false);
  const [avoidedJunkFood, setAvoidedJunkFood] = useState(false);
  const [didWorkout, setDidWorkout] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/habits', {
        avoidedInstagram,
        avoidedDistractingContent: avoidedDistractions,
        avoidedJunkFood,
        didWorkout
      });
      onHabitSubmitted();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (todayHabit) {
    return (
      <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border transition-colors">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="text-brand-500" size={28} />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Daily Check-in Complete!</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">You earned <span className="font-bold text-brand-600 dark:text-brand-400">+{todayHabit.pointsEarned} points</span> today.</p>
        
        <div className="space-y-2 opacity-70">
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            {todayHabit.avoidedInstagram ? <CheckCircle2 size={16} className="text-brand-500" /> : <Circle size={16} />} 
            Avoided Instagram
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            {todayHabit.avoidedDistractingContent ? <CheckCircle2 size={16} className="text-brand-500" /> : <Circle size={16} />} 
            Avoided Distracting Content
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            {todayHabit.avoidedJunkFood ? <CheckCircle2 size={16} className="text-brand-500" /> : <Circle size={16} />} 
            Avoided Junk Food
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            {todayHabit.didWorkout ? <CheckCircle2 size={16} className="text-brand-500" /> : <Circle size={16} />} 
            Did a Workout
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border transition-colors">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Today's Discipline</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          <label className="flex items-center p-3 border border-gray-200 dark:border-dark-border rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
            <input 
              type="checkbox" 
              className="w-5 h-5 text-brand-500 rounded border-gray-300 focus:ring-brand-500"
              checked={avoidedInstagram}
              onChange={(e) => setAvoidedInstagram(e.target.checked)}
            />
            <span className="ml-3 text-gray-700 dark:text-gray-200 font-medium">I avoided Instagram</span>
            <span className="ml-auto text-xs font-bold text-brand-500 bg-brand-50 dark:bg-brand-900/30 px-2 py-1 rounded-full">+5 pts</span>
          </label>
          
          <label className="flex items-center p-3 border border-gray-200 dark:border-dark-border rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
            <input 
              type="checkbox" 
              className="w-5 h-5 text-brand-500 rounded border-gray-300 focus:ring-brand-500"
              checked={avoidedDistractions}
              onChange={(e) => setAvoidedDistractions(e.target.checked)}
            />
            <span className="ml-3 text-gray-700 dark:text-gray-200 font-medium">I avoided Distracting Content</span>
            <span className="ml-auto text-xs font-bold text-brand-500 bg-brand-50 dark:bg-brand-900/30 px-2 py-1 rounded-full">+10 pts (Combo)</span>
          </label>
          
          <label className="flex items-center p-3 border border-gray-200 dark:border-dark-border rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
            <input 
              type="checkbox" 
              className="w-5 h-5 text-brand-500 rounded border-gray-300 focus:ring-brand-500"
              checked={avoidedJunkFood}
              onChange={(e) => setAvoidedJunkFood(e.target.checked)}
            />
            <span className="ml-3 text-gray-700 dark:text-gray-200 font-medium">I avoided Junk Food</span>
            <span className="ml-auto text-xs font-bold text-brand-500 bg-brand-50 dark:bg-brand-900/30 px-2 py-1 rounded-full">+20 pts (Max)</span>
          </label>
          
          <label className="flex items-center p-3 border border-gray-200 dark:border-dark-border rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
            <input 
              type="checkbox" 
              className="w-5 h-5 text-brand-500 rounded border-gray-300 focus:ring-brand-500"
              checked={didWorkout}
              onChange={(e) => setDidWorkout(e.target.checked)}
            />
            <span className="ml-3 text-gray-700 dark:text-gray-200 font-medium">I did a Workout</span>
            <span className="ml-auto text-xs font-bold text-brand-500 bg-brand-50 dark:bg-brand-900/30 px-2 py-1 rounded-full">+30 pts</span>
          </label>
        </div>
        
        <button 
          type="submit" 
          disabled={submitting}
          className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
        >
          {submitting ? 'Submitting...' : <><Check size={20} /> Submit Daily Check-in</>}
        </button>
      </form>
    </div>
  );
};

export default DailyTracker;
