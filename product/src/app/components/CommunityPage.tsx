import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Bookmark, Play, Filter, Users, Music, TrendingUp } from 'lucide-react';

const playlistImg = "https://images.unsplash.com/photo-1653579658400-5818b7e5b8e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMG11c2ljJTIwcGxheWxpc3QlMjB2aW55bCUyMHJlY29yZHxlbnwxfHx8fDE3NzE5NzYwNjJ8MA&ixlib=rb-4.1.0&q=80&w=400";

type Mood = 'calm' | 'anxious' | 'motivated' | 'tired' | 'overwhelmed' | 'sad';
type Task = 'studying' | 'exercising' | 'relaxing' | 'creative' | 'socializing';

interface Post {
  id: string;
  username: string;
  avatar: string;
  mood: Mood;
  task: Task;
  playlistName: string;
  genre: string;
  description: string;
  tracks: number;
  likes: number;
  saved: boolean;
  liked: boolean;
  timeAgo: string;
  color: string;
}

const moodColors: Record<Mood, string> = {
  calm: 'bg-teal-100 text-teal-700',
  anxious: 'bg-amber-100 text-amber-700',
  motivated: 'bg-emerald-100 text-emerald-700',
  tired: 'bg-slate-100 text-slate-600',
  overwhelmed: 'bg-rose-100 text-rose-700',
  sad: 'bg-blue-100 text-blue-700',
};

const taskColors: Record<Task, string> = {
  studying: 'bg-violet-100 text-violet-700',
  exercising: 'bg-lime-100 text-lime-700',
  relaxing: 'bg-sky-100 text-sky-700',
  creative: 'bg-pink-100 text-pink-700',
  socializing: 'bg-orange-100 text-orange-700',
};

const gradients = [
  'from-violet-500 to-indigo-600',
  'from-teal-500 to-emerald-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-500',
  'from-sky-500 to-blue-600',
  'from-fuchsia-500 to-purple-600',
];

const initialPosts: Post[] = [
  { id: '1', username: 'maya_studies', avatar: 'M', mood: 'anxious', task: 'studying', playlistName: 'Pre-Exam Peace', genre: 'Lo-fi Ambient', description: 'Found this combo perfect for finals week. Keeps me calm without making me sleepy!', tracks: 12, likes: 47, saved: false, liked: false, timeAgo: '2h ago', color: gradients[0] },
  { id: '2', username: 'jordan_runs', avatar: 'J', mood: 'motivated', task: 'exercising', playlistName: 'Morning Momentum', genre: 'Indie Pop', description: 'My go-to morning run playlist. Gets me out of bed every time 🏃', tracks: 18, likes: 91, saved: false, liked: false, timeAgo: '4h ago', color: gradients[1] },
  { id: '3', username: 'sam.creates', avatar: 'S', mood: 'calm', task: 'creative', playlistName: 'Dream & Draw', genre: 'Dream Pop', description: 'Perfect for painting or journaling. Very low-key, very vibe.', tracks: 9, likes: 63, saved: false, liked: false, timeAgo: '6h ago', color: gradients[2] },
  { id: '4', username: 'alex_unwinds', avatar: 'A', mood: 'tired', task: 'relaxing', playlistName: 'Sunday Drift', genre: 'Acoustic Folk', description: 'When you just need to decompress and exist. No demands.', tracks: 14, likes: 38, saved: false, liked: false, timeAgo: '8h ago', color: gradients[3] },
  { id: '5', username: 'priya.work', avatar: 'P', mood: 'overwhelmed', task: 'studying', playlistName: 'Reset & Refocus', genre: 'Ambient Electronic', description: 'When the to-do list is overwhelming, this pulls me back to center.', tracks: 7, likes: 55, saved: false, liked: false, timeAgo: '10h ago', color: gradients[4] },
  { id: '6', username: 'leo_vibes', avatar: 'L', mood: 'motivated', task: 'creative', playlistName: 'Late Night Build', genre: 'Electronic', description: 'My coding/designing playlist. Something about late night + electronic = flow state.', tracks: 21, likes: 82, saved: false, liked: false, timeAgo: '1d ago', color: gradients[5] },
];

const similarUsers = [
  { name: 'priya.work', match: '94%', mood: 'overwhelmed', color: 'from-violet-500 to-purple-600' },
  { name: 'maya_studies', match: '88%', mood: 'anxious', color: 'from-indigo-500 to-blue-600' },
  { name: 'sam.creates', match: '82%', mood: 'calm', color: 'from-teal-500 to-emerald-600' },
];

const moods: Mood[] = ['calm', 'anxious', 'motivated', 'tired', 'overwhelmed', 'sad'];
const tasks: Task[] = ['studying', 'exercising', 'relaxing', 'creative', 'socializing'];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [filterMood, setFilterMood] = useState<Mood | ''>('');
  const [filterTask, setFilterTask] = useState<Task | ''>('');
  const [showFilters, setShowFilters] = useState(false);

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id
      ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked }
      : p
    ));
  };

  const handleSave = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, saved: !p.saved } : p));
  };

  const filtered = posts.filter(p => {
    if (filterMood && p.mood !== filterMood) return false;
    if (filterTask && p.task !== filterTask) return false;
    return true;
  });

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-50 to-violet-50/10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-slate-900" style={{ fontSize: '2rem', fontWeight: 800 }}>Community</h1>
          <p className="text-slate-500 mt-1">Discover what others are listening to</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm transition-all ${showFilters ? 'bg-violet-50 border-violet-200 text-violet-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
          style={{ fontWeight: 500 }}
        >
          <Filter className="w-4 h-4" />
          Filter
          {(filterMood || filterTask) && <span className="w-2 h-2 bg-violet-500 rounded-full" />}
        </button>
      </motion.div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-slate-600 text-sm mb-3" style={{ fontWeight: 600 }}>Filter by Mood</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilterMood('')}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all ${!filterMood ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    style={{ fontWeight: 500 }}
                  >
                    All
                  </button>
                  {moods.map(m => (
                    <button
                      key={m}
                      onClick={() => setFilterMood(filterMood === m ? '' : m)}
                      className={`px-3 py-1.5 rounded-full text-xs capitalize transition-all ${filterMood === m ? moodColors[m] + ' ring-2 ring-offset-1' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                      style={{ fontWeight: 500 }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-slate-600 text-sm mb-3" style={{ fontWeight: 600 }}>Filter by Task</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilterTask('')}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all ${!filterTask ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    style={{ fontWeight: 500 }}
                  >
                    All
                  </button>
                  {tasks.map(t => (
                    <button
                      key={t}
                      onClick={() => setFilterTask(filterTask === t ? '' : t)}
                      className={`px-3 py-1.5 rounded-full text-xs capitalize transition-all ${filterTask === t ? taskColors[t] + ' ring-2 ring-offset-1' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                      style={{ fontWeight: 500 }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-12 gap-6">
        {/* Feed */}
        <div className="col-span-8">
          {/* Stats bar */}
          <div className="flex items-center gap-6 mb-5 bg-white rounded-2xl px-5 py-3 border border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Users className="w-4 h-4" />
              <span><strong className="text-slate-800">1,247</strong> students sharing</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Music className="w-4 h-4" />
              <span><strong className="text-slate-800">3,891</strong> playlists shared</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span><strong className="text-slate-800">Lo-fi Ambient</strong> trending today</span>
            </div>
          </div>

          <div className="space-y-4">
            {filtered.length === 0 && (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-100">
                <p className="text-slate-400">No playlists match these filters. Try removing a filter.</p>
              </div>
            )}
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className={`bg-gradient-to-r ${post.color} p-5`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center text-white" style={{ fontWeight: 700, fontSize: '1rem' }}>
                        {post.avatar}
                      </div>
                      <div>
                        <p className="text-white" style={{ fontWeight: 600 }}>@{post.username}</p>
                        <p className="text-white/70 text-xs">{post.timeAgo}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full capitalize" style={{ fontWeight: 500 }}>{post.mood}</span>
                      <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full capitalize" style={{ fontWeight: 500 }}>{post.task}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-slate-900 mb-1" style={{ fontWeight: 700, fontSize: '1.05rem' }}>{post.playlistName}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-slate-400 text-xs">{post.genre}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-400 text-xs">{post.tracks} tracks</span>
                      </div>
                      <p className="text-slate-600 text-sm" style={{ lineHeight: 1.6 }}>{post.description}</p>
                    </div>
                    <button className="w-10 h-10 bg-white rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors flex-shrink-0 shadow-sm">
                      <Play className="w-4 h-4 text-slate-600 ml-0.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-50">
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${post.liked ? 'bg-rose-50 text-rose-500' : 'text-slate-400 hover:text-rose-400 hover:bg-rose-50'}`}
                      style={{ fontWeight: 500 }}
                    >
                      <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                      {post.likes}
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => handleSave(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${post.saved ? 'bg-violet-50 text-violet-600' : 'text-slate-400 hover:text-violet-500 hover:bg-violet-50'}`}
                      style={{ fontWeight: 500 }}
                    >
                      <Bookmark className={`w-4 h-4 ${post.saved ? 'fill-current' : ''}`} />
                      {post.saved ? 'Saved' : 'Save'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-5">
          {/* Similar Users */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm"
          >
            <h3 className="text-slate-900 mb-4" style={{ fontWeight: 700 }}>Users Similar to You</h3>
            <p className="text-slate-400 text-xs mb-4">Based on your stress patterns and music preferences</p>
            <div className="space-y-3">
              {similarUsers.map((u, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${u.color} flex items-center justify-center text-white flex-shrink-0`} style={{ fontWeight: 700 }}>
                    {u.name[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 text-sm truncate" style={{ fontWeight: 600 }}>@{u.name}</p>
                    <p className="text-slate-400 text-xs capitalize">{u.mood} · {u.match} match</p>
                  </div>
                  <button className="text-violet-600 text-xs bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-full transition-colors flex-shrink-0" style={{ fontWeight: 500 }}>
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trending Genres */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm"
          >
            <h3 className="text-slate-900 mb-4" style={{ fontWeight: 700 }}>Trending This Week</h3>
            <div className="space-y-3">
              {[
                { genre: 'Lo-fi Ambient', count: '2.4k shares', change: '+12%', color: 'bg-violet-500' },
                { genre: 'Acoustic Folk', count: '1.8k shares', change: '+8%', color: 'bg-teal-500' },
                { genre: 'Dream Pop', count: '1.1k shares', change: '+21%', color: 'bg-pink-500' },
                { genre: 'Indie Electronic', count: '934 shares', change: '+5%', color: 'bg-indigo-500' },
              ].map((g, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 text-slate-400 text-xs flex-shrink-0" style={{ fontWeight: 700 }}>
                    {i + 1}
                  </div>
                  <div className={`w-2 h-8 rounded-full flex-shrink-0 ${g.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 text-sm truncate" style={{ fontWeight: 600 }}>{g.genre}</p>
                    <p className="text-slate-400 text-xs">{g.count}</p>
                  </div>
                  <span className="text-emerald-500 text-xs flex-shrink-0" style={{ fontWeight: 600 }}>{g.change}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Community Guidelines */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-3xl p-5 border border-violet-100"
          >
            <p className="text-violet-800 text-sm" style={{ fontWeight: 600, lineHeight: 1.6 }}>
              💜 Community Guidelines
            </p>
            <p className="text-violet-600 text-xs mt-2" style={{ lineHeight: 1.6 }}>
              Resonance is a supportive, non-judgmental space. Be kind, share openly, and remember — music is support, not a substitute for professional care.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
