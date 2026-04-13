import { Trophy, Flame, Target } from 'lucide-react';

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-dark-card p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border flex items-center gap-4 transition-colors">
        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
          <Trophy size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Points</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.points}</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-dark-card p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border flex items-center gap-4 transition-colors">
        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400">
          <Flame size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Current Streak</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.currentStreak} <span className="text-sm font-normal">days</span></p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-dark-card p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border flex items-center gap-4 transition-colors">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
          <Target size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Longest Streak</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.longestStreak} <span className="text-sm font-normal">days</span></p>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
