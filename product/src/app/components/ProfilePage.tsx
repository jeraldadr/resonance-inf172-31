import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Shield, Download, ChevronRight, CheckCircle2, LogOut } from 'lucide-react';
import { useApp, stressBgColors, moodColors } from '../context';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { userData } = useApp();
  const [privacyOn, setPrivacyOn] = useState(true);
  const [shareData, setShareData] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [downloaded, setDownloaded] = useState(false);

  const checkIns = userData.checkIns;

  // Stats
  const totalCheckIns = checkIns.length;
  const moodCounts: Record<string, number> = {};
  const taskCounts: Record<string, number> = {};
  const stressCounts: Record<string, number> = { low: 0, medium: 0, high: 0 };

  checkIns.forEach(c => {
    if (c.mood) moodCounts[c.mood] = (moodCounts[c.mood] || 0) + 1;
    if (c.task) taskCounts[c.task] = (taskCounts[c.task] || 0) + 1;
    if (c.stressLevel) stressCounts[c.stressLevel] = (stressCounts[c.stressLevel] || 0) + 1;
  });

  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'calm';
  const topTask = Object.entries(taskCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'studying';

  const weekCheckIns = checkIns.slice(-7);
  const avgStress = weekCheckIns.length > 0
    ? (weekCheckIns.reduce((sum, c) => sum + (c.stressLevel === 'high' ? 3 : c.stressLevel === 'medium' ? 2 : 1), 0) / weekCheckIns.length).toFixed(1)
    : '2.0';

  const handleDownload = () => {
    const report = {
      generated: new Date().toISOString(),
      user: userData.username,
      totalCheckIns,
      weeklyAvgStress: avgStress,
      topMood,
      topTask,
      recentCheckIns: checkIns.slice(-7),
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resonance-stress-report.json';
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-violet-500' : 'bg-slate-200'}`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5.5 left-0.5' : 'left-0.5'}`}
        style={{ transform: value ? 'translateX(22px)' : 'translateX(0px)' }}
      />
    </button>
  );

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-50 to-violet-50/10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-slate-900" style={{ fontSize: '2rem', fontWeight: 800 }}>Profile</h1>
        <p className="text-slate-500 mt-1">Your wellbeing summary & preferences</p>
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-4 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200"
        >
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-3 border-2 border-white/30" style={{ fontSize: '2rem', fontWeight: 800 }}>
              {userData.username[0]}
            </div>
            <h2 className="text-white" style={{ fontWeight: 800, fontSize: '1.4rem' }}>{userData.username}</h2>
            <p className="text-violet-200 text-sm">Resonance Member</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Check-ins', value: totalCheckIns },
              { label: 'This Week', value: weekCheckIns.length },
              { label: 'Low Stress Days', value: stressCounts.low },
              { label: 'Playlists Played', value: 18 },
            ].map((s, i) => (
              <div key={i} className="bg-white/15 rounded-2xl p-3 text-center border border-white/10">
                <div className="text-white" style={{ fontWeight: 800, fontSize: '1.4rem' }}>{s.value}</div>
                <div className="text-violet-200 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/onboarding')}
            className="w-full mt-5 bg-white/20 hover:bg-white/30 text-white border border-white/20 py-3 rounded-xl text-sm transition-all"
            style={{ fontWeight: 600 }}
          >
            + Start Check-In
          </button>
        </motion.div>

        {/* Right Column */}
        <div className="col-span-8 space-y-5">
          {/* Weekly Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
          >
            <h3 className="text-slate-900 mb-5" style={{ fontWeight: 700, fontSize: '1.1rem' }}>Weekly Stress Summary</h3>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Avg Stress', value: `${avgStress} / 3`, sub: 'This week', color: 'text-amber-600' },
                { label: 'Common Mood', value: topMood, sub: 'Most frequent', color: 'text-violet-600' },
                { label: 'Top Activity', value: topTask, sub: 'Most tracked', color: 'text-indigo-600' },
                { label: 'Fav. Genre', value: 'Lo-fi', sub: 'Most played', color: 'text-teal-600' },
              ].map((s, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-slate-400 text-xs mb-1" style={{ fontWeight: 500 }}>{s.label}</p>
                  <p className={`capitalize ${s.color}`} style={{ fontWeight: 700, fontSize: '1.1rem' }}>{s.value}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Mood Breakdown */}
            <h4 className="text-slate-700 text-sm mb-3" style={{ fontWeight: 600 }}>Mood Breakdown</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(moodCounts).sort((a, b) => b[1] - a[1]).map(([mood, count]) => (
                <div key={mood} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm capitalize ${moodColors[mood] || 'bg-slate-100 text-slate-600'}`} style={{ fontWeight: 500 }}>
                  <span>{mood}</span>
                  <span className="opacity-60 text-xs">× {count}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stress Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
          >
            <h3 className="text-slate-900 mb-5" style={{ fontWeight: 700, fontSize: '1.1rem' }}>Stress Distribution</h3>
            <div className="space-y-3">
              {[
                { label: 'Low Stress', count: stressCounts.low, color: 'bg-emerald-400', bg: stressBgColors.low },
                { label: 'Medium Stress', count: stressCounts.medium, color: 'bg-amber-400', bg: stressBgColors.medium },
                { label: 'High Stress', count: stressCounts.high, color: 'bg-rose-400', bg: stressBgColors.high },
              ].map(s => {
                const pct = totalCheckIns > 0 ? Math.round((s.count / totalCheckIns) * 100) : 0;
                return (
                  <div key={s.label} className="flex items-center gap-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full flex-shrink-0 ${s.bg}`} style={{ fontWeight: 600, minWidth: 100, textAlign: 'center' }}>{s.label}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`h-2.5 rounded-full ${s.color}`}
                      />
                    </div>
                    <span className="text-slate-600 text-sm flex-shrink-0 w-12 text-right" style={{ fontWeight: 600 }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Privacy & Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
          >
            <h3 className="text-slate-900 mb-5" style={{ fontWeight: 700, fontSize: '1.1rem' }}>
              <Shield className="w-4 h-4 inline mr-2 text-violet-500" />
              Privacy & Settings
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Private Profile', sub: 'Your stress data and check-ins are visible only to you', value: privacyOn, onChange: setPrivacyOn },
                { label: 'Share Anonymized Data', sub: 'Help improve Resonance by sharing anonymized stress patterns', value: shareData, onChange: setShareData },
                { label: 'Check-In Reminders', sub: 'Get daily nudges to track your stress level', value: notifications, onChange: setNotifications },
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div className="flex-1 mr-4">
                    <p className="text-slate-800 text-sm" style={{ fontWeight: 600 }}>{setting.label}</p>
                    <p className="text-slate-400 text-xs mt-0.5" style={{ lineHeight: 1.5 }}>{setting.sub}</p>
                  </div>
                  <Toggle value={setting.value} onChange={setting.onChange} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            <button
              onClick={handleDownload}
              className={`flex items-center gap-3 p-5 rounded-2xl border transition-all text-left ${downloaded ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${downloaded ? 'bg-emerald-500' : 'bg-gradient-to-br from-violet-500 to-indigo-600'}`}>
                {downloaded ? <CheckCircle2 className="w-5 h-5 text-white" /> : <Download className="w-5 h-5 text-white" />}
              </div>
              <div>
                <p className={`text-sm ${downloaded ? 'text-emerald-700' : 'text-slate-800'}`} style={{ fontWeight: 600 }}>
                  {downloaded ? 'Downloaded!' : 'Download Report'}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">Export your stress data as JSON</p>
              </div>
            </button>

            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-5 border border-violet-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🆘</span>
                <p className="text-violet-800 text-sm" style={{ fontWeight: 700 }}>Need Support?</p>
              </div>
              <p className="text-violet-600 text-xs mb-3" style={{ lineHeight: 1.6 }}>
                Resonance is not a crisis tool. If you're struggling, please reach out to a professional.
              </p>
              <a
                href="https://988lifeline.org"
                target="_blank"
                rel="noreferrer"
                className="text-violet-700 text-xs flex items-center gap-1 hover:gap-2 transition-all"
                style={{ fontWeight: 600 }}
              >
                988 Crisis Lifeline <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
