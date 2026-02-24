import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Music, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useApp, getPlaylistRecommendation, type StressLevel, type Mood, type TaskType, type TimeOfDay } from '../context';

const stressOptions: { value: StressLevel; label: string; desc: string; color: string; bg: string; emoji: string }[] = [
  { value: 'low', label: 'Low', desc: 'Mostly at ease', color: 'border-emerald-400 bg-emerald-50 text-emerald-700', bg: 'bg-emerald-500', emoji: '😌' },
  { value: 'medium', label: 'Medium', desc: 'Some tension', color: 'border-amber-400 bg-amber-50 text-amber-700', bg: 'bg-amber-500', emoji: '😐' },
  { value: 'high', label: 'High', desc: 'Quite stressed', color: 'border-rose-400 bg-rose-50 text-rose-700', bg: 'bg-rose-500', emoji: '😰' },
];

const moodOptions: { value: Mood; label: string; emoji: string; color: string }[] = [
  { value: 'anxious', label: 'Anxious', emoji: '😟', color: 'border-amber-300 hover:border-amber-400 hover:bg-amber-50' },
  { value: 'overwhelmed', label: 'Overwhelmed', emoji: '😵', color: 'border-rose-300 hover:border-rose-400 hover:bg-rose-50' },
  { value: 'tired', label: 'Tired', emoji: '😴', color: 'border-slate-300 hover:border-slate-400 hover:bg-slate-50' },
  { value: 'motivated', label: 'Motivated', emoji: '💪', color: 'border-emerald-300 hover:border-emerald-400 hover:bg-emerald-50' },
  { value: 'calm', label: 'Calm', emoji: '😊', color: 'border-teal-300 hover:border-teal-400 hover:bg-teal-50' },
  { value: 'sad', label: 'Sad', emoji: '😢', color: 'border-blue-300 hover:border-blue-400 hover:bg-blue-50' },
];

const taskOptions: { value: TaskType; label: string; emoji: string; desc: string }[] = [
  { value: 'studying', label: 'Studying', emoji: '📚', desc: 'Homework, reading, exams' },
  { value: 'exercising', label: 'Exercising', emoji: '🏃', desc: 'Gym, sports, movement' },
  { value: 'relaxing', label: 'Relaxing', emoji: '🛋️', desc: 'Resting, winding down' },
  { value: 'socializing', label: 'Socializing', emoji: '👥', desc: 'Friends, family, hanging out' },
  { value: 'creative', label: 'Creative Work', emoji: '🎨', desc: 'Art, writing, making things' },
];

const timeOptions: { value: TimeOfDay; label: string; emoji: string; range: string }[] = [
  { value: 'morning', label: 'Morning', emoji: '🌅', range: '6am – 12pm' },
  { value: 'afternoon', label: 'Afternoon', emoji: '☀️', range: '12pm – 5pm' },
  { value: 'evening', label: 'Evening', emoji: '🌆', range: '5pm – 10pm' },
  { value: 'latenight', label: 'Late Night', emoji: '🌙', range: '10pm – 6am' },
];

const aiMessages = [
  'Reading your emotional context…',
  'Analyzing stress patterns…',
  'Matching music to your mood…',
  'Curating your playlist…',
  'Almost ready…',
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { setCurrentCheckIn, setPlaylist, addCheckIn, userData } = useApp();

  const [step, setStep] = useState(1);
  const [stress, setStress] = useState<StressLevel>('');
  const [mood, setMood] = useState<Mood>('');
  const [task, setTask] = useState<TaskType>('');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('');
  const [reflection, setReflection] = useState('');
  const [aiMsgIdx, setAiMsgIdx] = useState(0);

  useEffect(() => {
    if (step === 3) {
      const interval = setInterval(() => {
        setAiMsgIdx(prev => {
          if (prev < aiMessages.length - 1) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 700);
      const timer = setTimeout(() => {
        const now = new Date();
        const id = Date.now().toString();
        const checkIn = {
          id,
          date: now.toISOString().split('T')[0],
          stressLevel: stress,
          mood,
          task,
          timeOfDay,
          reflection,
        };
        addCheckIn(checkIn);
        const playlist = getPlaylistRecommendation(stress, mood, task, timeOfDay);
        setPlaylist(playlist);
        navigate('/dashboard');
      }, 4000);
      return () => { clearInterval(interval); clearTimeout(timer); };
    }
  }, [step]);

  const canAdvanceStep1 = stress && mood && task;
  const canAdvanceStep2 = timeOfDay;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-sky-50 flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 h-16 border-b border-white/60 bg-white/40 backdrop-blur">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Music className="w-4 h-4 text-white" />
          </div>
          <span className="text-slate-900" style={{ fontWeight: 700, fontSize: '1.1rem' }}>Resonance</span>
        </button>
        {step < 3 && (
          <div className="flex items-center gap-2">
            {[1, 2].map(s => (
              <div key={s} className={`h-1.5 rounded-full transition-all ${s <= step ? 'bg-violet-500 w-8' : 'bg-slate-200 w-5'}`} />
            ))}
          </div>
        )}
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl"
            >
              <div className="text-center mb-8">
                <span className="text-xs text-violet-500 bg-violet-100 px-3 py-1 rounded-full" style={{ fontWeight: 600 }}>STEP 1 OF 2</span>
                <h2 className="text-slate-900 mt-3 mb-2" style={{ fontSize: '2rem', fontWeight: 800 }}>How are you feeling right now?</h2>
                <p className="text-slate-500">Be honest — there's no wrong answer here.</p>
              </div>

              {/* Stress Level */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-4">
                <h3 className="text-slate-700 mb-4" style={{ fontWeight: 600 }}>Stress Level</h3>
                <div className="grid grid-cols-3 gap-3">
                  {stressOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setStress(opt.value)}
                      className={`p-4 rounded-2xl border-2 text-center transition-all hover:-translate-y-0.5 ${stress === opt.value ? opt.color + ' border-opacity-100 shadow-md' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                    >
                      <span className="text-3xl block mb-1">{opt.emoji}</span>
                      <span className="block text-sm" style={{ fontWeight: 700 }}>{opt.label}</span>
                      <span className="text-xs text-slate-500 block mt-0.5">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-4">
                <h3 className="text-slate-700 mb-4" style={{ fontWeight: 600 }}>Current Mood</h3>
                <div className="grid grid-cols-3 gap-3">
                  {moodOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setMood(opt.value)}
                      className={`p-3 rounded-2xl border-2 text-center transition-all hover:-translate-y-0.5 ${mood === opt.value ? 'border-violet-400 bg-violet-50 shadow-md' : `border-slate-200 bg-white ${opt.color}`}`}
                    >
                      <span className="text-2xl block mb-1">{opt.emoji}</span>
                      <span className="text-sm" style={{ fontWeight: mood === opt.value ? 700 : 500 }}>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Task */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
                <h3 className="text-slate-700 mb-4" style={{ fontWeight: 600 }}>What are you doing?</h3>
                <div className="grid grid-cols-5 gap-2">
                  {taskOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setTask(opt.value)}
                      className={`p-3 rounded-2xl border-2 text-center transition-all hover:-translate-y-0.5 ${task === opt.value ? 'border-indigo-400 bg-indigo-50 shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                    >
                      <span className="text-2xl block mb-1">{opt.emoji}</span>
                      <span className="text-xs block" style={{ fontWeight: task === opt.value ? 700 : 500, lineHeight: 1.3 }}>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => canAdvanceStep1 && setStep(2)}
                disabled={!canAdvanceStep1}
                className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all ${canAdvanceStep1 ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl shadow-indigo-200 hover:opacity-90' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                style={{ fontWeight: 600, fontSize: '1rem' }}
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl"
            >
              <div className="text-center mb-8">
                <span className="text-xs text-violet-500 bg-violet-100 px-3 py-1 rounded-full" style={{ fontWeight: 600 }}>STEP 2 OF 2</span>
                <h2 className="text-slate-900 mt-3 mb-2" style={{ fontSize: '2rem', fontWeight: 800 }}>A little more context</h2>
                <p className="text-slate-500">This helps us fine-tune your recommendation.</p>
              </div>

              {/* Time of day */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-4">
                <h3 className="text-slate-700 mb-4" style={{ fontWeight: 600 }}>Time of Day</h3>
                <div className="grid grid-cols-4 gap-3">
                  {timeOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setTimeOfDay(opt.value)}
                      className={`p-4 rounded-2xl border-2 text-center transition-all hover:-translate-y-0.5 ${timeOfDay === opt.value ? 'border-violet-400 bg-violet-50 shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                    >
                      <span className="text-3xl block mb-1">{opt.emoji}</span>
                      <span className="text-sm block" style={{ fontWeight: 600 }}>{opt.label}</span>
                      <span className="text-xs text-slate-400 block mt-0.5">{opt.range}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reflection */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
                <h3 className="text-slate-700 mb-1" style={{ fontWeight: 600 }}>Optional reflection</h3>
                <p className="text-slate-400 text-sm mb-4">Anything specific on your mind? (totally optional)</p>
                <textarea
                  value={reflection}
                  onChange={e => setReflection(e.target.value)}
                  placeholder="e.g., Big exam tomorrow, feeling behind on my project…"
                  className="w-full border border-slate-200 rounded-2xl p-4 resize-none text-slate-700 placeholder-slate-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                  rows={3}
                  style={{ fontSize: '0.95rem' }}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-none bg-white border border-slate-200 text-slate-600 px-6 py-4 rounded-2xl flex items-center gap-2 hover:bg-slate-50 transition-all"
                  style={{ fontWeight: 600 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  onClick={() => canAdvanceStep2 && setStep(3)}
                  disabled={!canAdvanceStep2}
                  className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all ${canAdvanceStep2 ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl shadow-indigo-200 hover:opacity-90' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                  style={{ fontWeight: 600, fontSize: '1rem' }}
                >
                  Analyze My Mood
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3 - AI Processing */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md text-center"
            >
              {/* Animated orb */}
              <div className="relative flex items-center justify-center mb-8">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="absolute w-40 h-40 bg-gradient-to-br from-violet-300 to-indigo-400 rounded-full blur-2xl"
                />
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut', delay: 0.25 }}
                  className="absolute w-28 h-28 bg-gradient-to-br from-violet-400 to-indigo-500 rounded-full blur-xl"
                />
                <div className="relative w-20 h-20 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-300">
                  <Music className="w-9 h-9 text-white" />
                </div>
              </div>

              {/* Animated sound bars */}
              <div className="flex items-end justify-center gap-1 mb-6 h-8">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, Math.random() * 28 + 8, 4] }}
                    transition={{ repeat: Infinity, duration: 0.8 + Math.random() * 0.6, delay: i * 0.1, ease: 'easeInOut' }}
                    className="w-1.5 bg-gradient-to-t from-violet-500 to-indigo-400 rounded-full"
                    style={{ minHeight: 4 }}
                  />
                ))}
              </div>

              <h2 className="text-slate-900 mb-3" style={{ fontSize: '1.75rem', fontWeight: 800 }}>Crafting your playlist…</h2>

              <div className="h-6 mb-6">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={aiMsgIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="text-violet-600"
                    style={{ fontWeight: 500 }}
                  >
                    {aiMessages[aiMsgIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Context chips */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-sm" style={{ fontWeight: 500 }}>
                  Stress: {stress}
                </span>
                <span className="bg-violet-100 text-violet-600 px-3 py-1.5 rounded-full text-sm capitalize" style={{ fontWeight: 500 }}>
                  {mood}
                </span>
                <span className="bg-indigo-100 text-indigo-600 px-3 py-1.5 rounded-full text-sm capitalize" style={{ fontWeight: 500 }}>
                  {task}
                </span>
                <span className="bg-sky-100 text-sky-600 px-3 py-1.5 rounded-full text-sm capitalize" style={{ fontWeight: 500 }}>
                  {timeOfDay}
                </span>
              </div>

              <p className="text-slate-400 text-sm mt-6">Redirecting to your dashboard…</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
