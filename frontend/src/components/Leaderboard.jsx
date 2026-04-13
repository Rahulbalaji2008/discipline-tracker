import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Medal } from 'lucide-react';
import clsx from 'clsx';

const Leaderboard = ({ refreshTrigger, currentUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get('/friends/leaderboard');
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load leaderboard");
      }
    };
    fetchLeaderboard();
  }, [refreshTrigger]);

  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border transition-colors">
      <div className="flex items-center gap-2 mb-6">
        <Medal className="text-brand-500" size={24} />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Leaderboard</h2>
      </div>

      <div className="space-y-3">
        {users.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">No data available.</p>
        ) : (
          users.map((u, index) => (
            <div 
              key={u._id} 
              className={clsx(
                "flex items-center justify-between p-3 rounded-xl border transition-colors",
                u.isMe 
                  ? "bg-brand-50 border-brand-200 dark:bg-brand-900/20 dark:border-brand-800/50" 
                  : "bg-gray-50 border-gray-100 dark:bg-slate-800/50 dark:border-dark-border"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                  index === 0 ? "bg-yellow-100 text-yellow-700" :
                  index === 1 ? "bg-gray-200 text-gray-700" :
                  index === 2 ? "bg-amber-100 text-amber-700" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300"
                )}>
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {u.username} {u.isMe && <span className="text-xs text-brand-600 dark:text-brand-400 font-normal ml-1">(You)</span>}
                  </p>
                  <p className="text-xs text-brand-500 font-medium">🔥 {u.currentStreak} streak</p>
                </div>
              </div>
              <div className="font-bold text-gray-800 dark:text-white">
                {u.points} <span className="text-xs font-normal text-gray-500 dark:text-gray-400">pts</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
