import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Info, X, Plus, TrendingUp, TrendingDown, Minus, Music2 } from 'lucide-react';
import { useApp, stressBgColors, moodColors } from '../context';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

function WhyModal({ onClose, playlist }: { onClose: () => void; playlist: any }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-slate-900 mb-1" style={{ fontWeight: 700, fontSize: '1.25rem' }}>Why this playlist?</h3>
              <p className="text-slate-500 text-sm">Here's how Resonance chose "{playlist?.title}"</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
              <X className="w-4 h-4 text-slate-600" />
            </button>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-5 mb-6">
            <p className="text-slate-700" style={{ lineHeight: 1.7 }}>{playlist?.reasoning}</p>
          </div>

          <h4 className="text-slate-700 mb-3 text-sm" style={{ fontWeight: 600 }}>Factors considered:</h4>
          <div className="space-y-2">
            {[
              { label: 'Stress Input', value: playlist?.mood === 'Focused' || playlist?.mood === 'Energized' ? 'Higher stress detected' : 'Moderate stress level', icon: '🧠' },
              { label: 'Task Type', value: `Optimized for ${playlist?.task}`, icon: '🎯' },
              { label: 'Mood Detected', value: `${playlist?.mood} state`, icon: '💜' },
              { label: 'Pattern Trends', value: 'Evening study stress pattern noted', icon: '📊' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                <span className="text-lg">{f.icon}</span>
                <div>
                  <span className="text-slate-500 text-xs">{f.label}</span>
                  <div className="text-slate-800 text-sm" style={{ fontWeight: 500 }}>{f.value}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
            style={{ fontWeight: 600 }}
          >
            Got it
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function DashboardHome() {
  const navigate = useNavigate();
  const { userData } = useApp();
  const [playing, setPlaying] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const checkIns = userData.checkIns;
  const lastCheckIn = checkIns[checkIns.length - 1];
  const playlist = userData.playlist;

  // Get time of day greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Recent stress data for sparkline
  const sparkData = checkIns.slice(-7).map((c, i) => ({
    day: i,
    value: c.stressLevel === 'high' ? 3 : c.stressLevel === 'medium' ? 2 : 1,
  }));

  const stressTrend = () => {
    if (sparkData.length < 2) return 'same';
    const last = sparkData[sparkData.length - 1].value;
    const prev = sparkData[sparkData.length - 2].value;
    if (last > prev) return 'up';
    if (last < prev) return 'down';
    return 'same';
  };

  const trend = stressTrend();

  // Default playlist if no check-in done
  const displayPlaylist = playlist || {
    title: 'Focused & Grounded',
    description: 'Steady lo-fi beats to keep you in the zone',
    mood: 'Focused',
    task: 'Studying',
    genre: 'Lo-fi Hip Hop',
    color: 'from-violet-500 to-indigo-600',
    tracks: ['Nujabes – Feather', 'J Dilla – Donuts', 'Lofi Girl – Study Beats', 'Tomppabeats – Harbor', 'Idealism – Childhood'],
    reasoning: 'Medium stress during studying responds well to lo-fi hip hop — steady beats at 70–90 BPM create a rhythmic background that helps maintain focus without overstimulation.',
  };

  const stressLabel = lastCheckIn?.stressLevel
    ? lastCheckIn.stressLevel.charAt(0).toUpperCase() + lastCheckIn.stressLevel.slice(1)
    : 'Medium';

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-50 to-violet-50/20">
      {showWhy && <WhyModal onClose={() => setShowWhy(false)} playlist={displayPlaylist} />}

      {/* Header */}
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-slate-500 text-sm mb-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          <h1 className="text-slate-900" style={{ fontSize: '2rem', fontWeight: 800 }}>{greeting}, {userData.username} 👋</h1>
        </motion.div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Stress Level Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-500 text-sm" style={{ fontWeight: 500 }}>Today's Stress Level</p>
            {trend === 'up' && <div className="flex items-center gap-1 text-rose-500 text-xs bg-rose-50 px-2 py-1 rounded-full"><TrendingUp className="w-3 h-3" /><span style={{ fontWeight: 600 }}>Rising</span></div>}
            {trend === 'down' && <div className="flex items-center gap-1 text-emerald-500 text-xs bg-emerald-50 px-2 py-1 rounded-full"><TrendingDown className="w-3 h-3" /><span style={{ fontWeight: 600 }}>Easing</span></div>}
            {trend === 'same' && <div className="flex items-center gap-1 text-slate-400 text-xs bg-slate-50 px-2 py-1 rounded-full"><Minus className="w-3 h-3" /><span style={{ fontWeight: 600 }}>Steady</span></div>}
          </div>

          <div className="flex items-end gap-4 mb-4">
            <span className={`text-3xl px-3 py-1 rounded-xl ${stressBgColors[lastCheckIn?.stressLevel || 'medium']}`} style={{ fontWeight: 800 }}>{stressLabel}</span>
            {lastCheckIn?.mood && (
              <span className={`text-sm px-3 py-1 rounded-full capitalize ${moodColors[lastCheckIn.mood]}`} style={{ fontWeight: 500 }}>{lastCheckIn.mood}</span>
            )}
          </div>

          {/* Sparkline */}
          <div className="h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparkData}>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const labels = ['', 'Low', 'Medium', 'High'];
                    return (
                      <div className="bg-white border border-slate-100 shadow-md rounded-lg px-2 py-1 text-xs text-slate-700">
                        {labels[payload[0].value as number]}
                      </div>
                    );
                  }}
                />
                <Line type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-slate-400 text-xs mt-1">7-day stress trend</p>
        </motion.div>

        {/* Playlist Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
        >
          <div className={`bg-gradient-to-r ${displayPlaylist.color} p-6 text-white`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm mb-1" style={{ fontWeight: 500 }}>AI Recommended Playlist</p>
                <h2 className="text-white mb-1" style={{ fontSize: '1.6rem', fontWeight: 800 }}>{displayPlaylist.title}</h2>
                <p className="text-white/80 text-sm">{displayPlaylist.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full" style={{ fontWeight: 500 }}>{displayPlaylist.mood}</span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full" style={{ fontWeight: 500 }}>{displayPlaylist.task}</span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full" style={{ fontWeight: 500 }}>{displayPlaylist.genre}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={() => setPlaying(!playing)}
                  className="w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all hover:scale-105 backdrop-blur border border-white/20"
                >
                  {playing ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-0.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-700 text-sm" style={{ fontWeight: 600 }}>Track List</h3>
              <button
                onClick={() => setShowWhy(true)}
                className="flex items-center gap-1.5 text-violet-600 text-sm hover:text-violet-700 transition-colors bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-full"
                style={{ fontWeight: 500 }}
              >
                <Info className="w-3.5 h-3.5" />
                Why this playlist?
              </button>
            </div>

            <div className="space-y-2">
              {displayPlaylist.tracks.map((track, i) => (
                <motion.button
                  key={i}
                  whileHover={{ x: 4 }}
                  onClick={() => { setCurrentTrack(i); setPlaying(true); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${currentTrack === i && playing ? 'bg-violet-50' : 'hover:bg-slate-50'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${currentTrack === i && playing ? 'bg-gradient-to-br from-violet-500 to-indigo-600' : 'bg-slate-100'}`}>
                    {currentTrack === i && playing ? (
                      <div className="flex items-end gap-0.5 h-4">
                        {[...Array(3)].map((_, j) => (
                          <motion.div
                            key={j}
                            animate={{ height: [2, 12, 2] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: j * 0.2 }}
                            className="w-0.5 bg-white rounded-full"
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs" style={{ fontWeight: 600 }}>{i + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm truncate ${currentTrack === i && playing ? 'text-violet-700' : 'text-slate-700'}`} style={{ fontWeight: 500 }}>{track}</div>
                  </div>
                  <Music2 className="w-4 h-4 text-slate-300 flex-shrink-0" />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
        >
          <h3 className="text-slate-700 mb-4" style={{ fontWeight: 600 }}>Recent Check-Ins</h3>
          <div className="space-y-3">
            {checkIns.slice(-3).reverse().map((c, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <div className={`w-2 h-8 rounded-full ${c.stressLevel === 'high' ? 'bg-rose-400' : c.stressLevel === 'medium' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-800 text-sm capitalize" style={{ fontWeight: 500 }}>{c.mood}</span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="text-slate-400 text-xs capitalize">{c.task}</span>
                  </div>
                  <p className="text-slate-400 text-xs">{c.date}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full capitalize ${stressBgColors[c.stressLevel || 'medium']}`} style={{ fontWeight: 600 }}>{c.stressLevel}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="col-span-4 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200"
        >
          <h3 className="text-white/90 mb-2" style={{ fontWeight: 600 }}>AI Insight</h3>
          <p className="text-white/80 text-sm mb-4" style={{ lineHeight: 1.7 }}>
            You tend to experience higher stress during <strong className="text-white">evening study sessions</strong>. Focused ambient playlists have helped reduce your stress by <strong className="text-white">18%</strong> over the past week.
          </p>
          <button
            onClick={() => navigate('/dashboard/insights')}
            className="bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-2 rounded-xl transition-colors border border-white/20"
            style={{ fontWeight: 500 }}
          >
            View full insights →
          </button>
        </motion.div>

        {/* Track Check-In CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-3 shadow-lg shadow-emerald-200">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-slate-900 mb-1" style={{ fontWeight: 700 }}>Track Your Stress</h3>
          <p className="text-slate-500 text-sm mb-4" style={{ lineHeight: 1.6 }}>How are you feeling right now? A quick check-in keeps your insights accurate.</p>
          <button
            onClick={() => navigate('/onboarding')}
            className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-md shadow-emerald-200"
            style={{ fontWeight: 600 }}
          >
            Start Quick Check-In
          </button>
        </motion.div>
      </div>
    </div>
  );
}
