import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, Legend
} from 'recharts';

const stressValueMap: Record<string, number> = { low: 1, medium: 2, high: 3 };

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const taskColors: Record<string, string> = {
  studying: '#7c3aed',
  exercising: '#10b981',
  relaxing: '#06b6d4',
  socializing: '#f59e0b',
  creative: '#ec4899',
};

const heatmapColors = ['#f1f5f9', '#ddd6fe', '#c4b5fd', '#a78bfa', '#7c3aed'];

export default function InsightsPage() {
  const { userData } = useApp();
  const [activeMetric, setActiveMetric] = useState<'stress' | 'mood'>('stress');

  const checkIns = userData.checkIns;

  // Weekly stress line data
  const weeklyData = dayLabels.map((day, i) => {
    const ci = checkIns[i];
    return {
      day,
      stress: ci ? stressValueMap[ci.stressLevel] ?? 2 : 0,
      date: ci?.date || '',
    };
  });

  // Stress by task bar data
  const taskStress: Record<string, { total: number; count: number }> = {};
  checkIns.forEach(c => {
    if (!c.task) return;
    if (!taskStress[c.task]) taskStress[c.task] = { total: 0, count: 0 };
    taskStress[c.task].total += stressValueMap[c.stressLevel] || 0;
    taskStress[c.task].count += 1;
  });

  const barData = Object.entries(taskStress).map(([task, val]) => ({
    task: task.charAt(0).toUpperCase() + task.slice(1),
    key: task,
    avg: parseFloat((val.total / val.count).toFixed(2)),
  }));

  // Heatmap data: time of day x day of week
  const times = ['Morning', 'Afternoon', 'Evening', 'Late Night'];
  const timeMap: Record<string, string> = {
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    latenight: 'Late Night',
  };

  const heatmapData: Record<string, Record<string, number>> = {};
  times.forEach(t => {
    heatmapData[t] = {};
    dayLabels.forEach(d => { heatmapData[t][d] = 0; });
  });

  checkIns.forEach((c, i) => {
    const day = dayLabels[i % 7];
    const time = timeMap[c.timeOfDay] || 'Evening';
    if (!heatmapData[time]) heatmapData[time] = {};
    heatmapData[time][day] = stressValueMap[c.stressLevel] || 1;
  });

  const getHeatColor = (val: number) => heatmapColors[Math.min(Math.floor(val * 1.5), 4)];

  const stressLabels = ['', 'Low', 'Medium', 'High'];

  const insights = [
    { text: 'You experience higher stress during evening study sessions — consider shifting heavy work to the afternoon.', icon: '📚', tag: 'Study Pattern' },
    { text: 'Focused ambient playlists have reduced your perceived stress by 18% over the past 7 check-ins.', icon: '🎵', tag: 'Music Impact' },
    { text: 'Your lowest stress days correlate with morning exercise — even a 15-min walk makes a difference.', icon: '🏃', tag: 'Exercise Effect' },
    { text: 'You\'ve checked in 7 times this week. Users who check in daily report 2× better stress regulation.', icon: '✅', tag: 'Habit Streak' },
  ];

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-50 to-violet-50/10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-slate-900" style={{ fontSize: '2rem', fontWeight: 800 }}>Insights</h1>
        <p className="text-slate-500 mt-1">Your stress patterns over time</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Avg Stress This Week', value: '2.1 / 3', sub: '↓ from 2.4 last week', good: true, icon: '🧠' },
          { label: 'Most Common Mood', value: 'Tired', sub: '3 of 7 check-ins', icon: '😴' },
          { label: 'Best Task for You', value: 'Creative Work', sub: 'Lowest avg stress', good: true, icon: '🎨' },
          { label: 'Stress-Free Days', value: '2 / 7', sub: 'This week', icon: '✨' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
          >
            <span className="text-2xl mb-2 block">{s.icon}</span>
            <p className="text-slate-500 text-xs mb-1" style={{ fontWeight: 500 }}>{s.label}</p>
            <p className="text-slate-900" style={{ fontWeight: 700, fontSize: '1.2rem' }}>{s.value}</p>
            <p className={`text-xs mt-0.5 ${s.good ? 'text-emerald-500' : 'text-slate-400'}`} style={{ fontWeight: 500 }}>{s.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-slate-900" style={{ fontWeight: 700, fontSize: '1.1rem' }}>Stress Over Time</h2>
              <p className="text-slate-400 text-sm">Your 7-day stress journey</p>
            </div>
            <div className="flex gap-2">
              {['stress'].map(m => (
                <span key={m} className="bg-violet-100 text-violet-700 text-xs px-3 py-1.5 rounded-full" style={{ fontWeight: 600 }}>This Week</span>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weeklyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 3]} ticks={[1, 2, 3]} tickFormatter={v => stressLabels[v] || ''} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="bg-white border border-slate-100 shadow-xl rounded-xl px-4 py-3">
                      <p className="text-slate-500 text-xs mb-1">{label}</p>
                      <p className="text-slate-800 text-sm" style={{ fontWeight: 700 }}>{stressLabels[payload[0].value as number] || 'N/A'}</p>
                    </div>
                  );
                }}
              />
              <defs>
                <linearGradient id="stressGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="stress"
                stroke="url(#stressGradient)"
                strokeWidth={3}
                dot={{ fill: '#7c3aed', strokeWidth: 2, r: 5, stroke: '#fff' }}
                activeDot={{ r: 7, fill: '#7c3aed' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pattern Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-3"
        >
          <h2 className="text-slate-900 mb-2" style={{ fontWeight: 700, fontSize: '1.1rem' }}>Pattern Insights</h2>
          {insights.map((insight, i) => (
            <div key={i} className="bg-gradient-to-br from-violet-50 to-indigo-50/50 rounded-2xl p-4 border border-violet-100/50">
              <div className="flex items-center gap-2 mb-1.5">
                <span>{insight.icon}</span>
                <span className="text-violet-600 text-xs" style={{ fontWeight: 600 }}>{insight.tag}</span>
              </div>
              <p className="text-slate-600 text-sm" style={{ lineHeight: 1.6 }}>{insight.text}</p>
            </div>
          ))}
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
        >
          <h2 className="text-slate-900 mb-1" style={{ fontWeight: 700, fontSize: '1.1rem' }}>Stress by Activity</h2>
          <p className="text-slate-400 text-sm mb-6">Average stress level by task type</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="task" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 3]} ticks={[1, 2, 3]} tickFormatter={v => stressLabels[v] || ''} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="bg-white border border-slate-100 shadow-xl rounded-xl px-4 py-3">
                      <p className="text-slate-500 text-xs mb-1">{label}</p>
                      <p className="text-slate-800 text-sm" style={{ fontWeight: 700 }}>{stressLabels[Math.round(payload[0].value as number)] || 'N/A'}</p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="avg" radius={[8, 8, 0, 0]}>
                {barData.map((entry, i) => (
                  <Cell key={i} fill={taskColors[entry.key] || '#7c3aed'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-3">
            {barData.map((d, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: taskColors[d.key] || '#7c3aed' }} />
                <span className="text-slate-500 text-xs">{d.task}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="col-span-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
        >
          <h2 className="text-slate-900 mb-1" style={{ fontWeight: 700, fontSize: '1.1rem' }}>Stress Heatmap</h2>
          <p className="text-slate-400 text-sm mb-6">Stress intensity by time of day and day of week</p>
          <div className="overflow-x-auto">
            <div className="min-w-[360px]">
              {/* Header row */}
              <div className="flex gap-1.5 mb-1.5 pl-24">
                {dayLabels.map(d => (
                  <div key={d} className="flex-1 text-center text-slate-400 text-xs" style={{ fontWeight: 500 }}>{d}</div>
                ))}
              </div>
              {times.map(time => (
                <div key={time} className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-24 text-slate-500 text-xs text-right pr-3 flex-shrink-0" style={{ fontWeight: 500 }}>{time}</div>
                  {dayLabels.map(day => {
                    const val = heatmapData[time]?.[day] || 0;
                    return (
                      <div
                        key={day}
                        className="flex-1 h-9 rounded-lg flex items-center justify-center relative group cursor-default transition-transform hover:scale-110"
                        style={{ backgroundColor: getHeatColor(val) }}
                        title={`${time} / ${day}: ${stressLabels[val] || 'None'}`}
                      >
                        {val > 0 && (
                          <span className="text-violet-700 text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontWeight: 700 }}>
                            {stressLabels[val]?.[0]}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-slate-400 text-xs">Low</span>
            {heatmapColors.map((c, i) => (
              <div key={i} className="flex-1 h-2 rounded-full" style={{ backgroundColor: c }} />
            ))}
            <span className="text-slate-400 text-xs">High</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
