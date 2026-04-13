import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import DailyTracker from '../components/DailyTracker';
import StatsCards from '../components/StatsCards';
import Leaderboard from '../components/Leaderboard';
import AddFriend from '../components/AddFriend';
import HistoryCalendar from '../components/HistoryCalendar';
import { LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [stats, setStats] = useState({ points: user.points, currentStreak: user.currentStreak, longestStreak: user.longestStreak });
  const [todayHabit, setTodayHabit] = useState(null);
  const [habits, setHabits] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchDashboardData = async () => {
    try {
      const [habitsRes, todayRes, leaderboardRes] = await Promise.all([
        api.get('/habits'),
        api.get('/habits/today'),
        api.get('/friends/leaderboard')
      ]);
      setHabits(habitsRes.data);
      setTodayHabit(todayRes.data);
      
      const me = leaderboardRes.data.find(u => u.username === user.username);
      if (me) {
        setStats({ points: me.points, currentStreak: me.currentStreak, longestStreak: me.longestStreak });
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [refreshTrigger]);

  const refreshDashboard = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white dark:bg-dark-card shadow-sm sticky top-0 z-40 transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold">
              D
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-green-700">
              Discipline Tracker
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Hi, {user.username}</span>
            <button 
              onClick={logout}
              className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quote */}
          <div className="bg-gradient-to-br from-brand-500 to-green-600 p-6 rounded-2xl text-white shadow-lg">
            <p className="text-lg md:text-xl font-medium italic">"We must all suffer from one of two pains: the pain of discipline or the pain of regret."</p>
            <p className="mt-2 text-brand-100 text-sm">— Jim Rohn</p>
          </div>
          
          <StatsCards stats={stats} />
          
          <DailyTracker todayHabit={todayHabit} onHabitSubmitted={refreshDashboard} />

          <HistoryCalendar habits={habits} />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <AddFriend onFriendAdded={refreshDashboard} />
          <Leaderboard refreshTrigger={refreshTrigger} currentUser={user.username} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
