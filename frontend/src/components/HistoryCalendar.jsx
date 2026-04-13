import { CalendarDays, Check, X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays, parseISO } from 'date-fns';

const HistoryCalendar = ({ habits }) => {
  // Generate last 7 days including today
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = subDays(new Date(), 6 - i);
    d.setHours(0, 0, 0, 0);
    return format(d, 'yyyy-MM-dd');
  });

  const chartData = last7Days.map(dateStr => {
    const habit = habits.find(h => h.date === dateStr);
    return {
      name: format(parseISO(dateStr), 'EEE'),
      points: habit ? habit.pointsEarned : 0,
      completed: habit ? (habit.avoidedInstagram || habit.avoidedDistractingContent || habit.avoidedJunkFood) : false
    };
  });

  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border transition-colors">
      <div className="flex items-center gap-2 mb-6">
        <CalendarDays className="text-brand-500" size={24} />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">7-Day History & Performance</h2>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Consistency</h3>
        <div className="flex justify-between items-center gap-2 px-2">
          {chartData.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm transition-transform hover:scale-110 ${day.completed ? 'bg-brand-500' : 'bg-gray-200 dark:bg-slate-700'}`}
              >
                {day.completed ? <Check size={16} /> : <X size={16} className="text-gray-400 dark:text-gray-500" />}
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{day.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Points Trend</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ stroke: '#22c55e', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area 
                type="monotone" 
                dataKey="points" 
                stroke="#22c55e" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorPoints)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HistoryCalendar;
