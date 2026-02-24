import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Music, Brain, BarChart3, ArrowRight, Play, ChevronDown, Star, Users, Heart, Shield } from 'lucide-react';

const heroImg = "https://images.unsplash.com/photo-1758612214844-8e3a0ff255c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwaGVhZHBob25lcyUyMHN0dWR5aW5nJTIwY2FsbXxlbnwxfHx8fDE3NzE5NzYwNTl8MA&ixlib=rb-4.1.0&q=80&w=1080";
const meditationImg = "https://images.unsplash.com/photo-1769095207794-02ffab1e2376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG1lZGl0YXRpb24lMjBtaW5kZnVsbmVzcyUyMGNhbG0lMjB0ZWVufGVufDF8fHx8MTc3MTk3NjA2Mnww&ixlib=rb-4.1.0&q=80&w=1080";

export default function LandingPage() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <Brain className="w-6 h-6" />,
      step: '01',
      title: 'Check In',
      desc: 'Tell us how you\'re feeling in 30 seconds — stress level, mood, and what you\'re working on.',
      color: 'from-violet-500 to-indigo-600',
      bg: 'bg-violet-50',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      step: '02',
      title: 'AI Analysis',
      desc: 'Our model cross-references your emotional context, task type, and time of day to understand your needs.',
      color: 'from-indigo-500 to-sky-500',
      bg: 'bg-indigo-50',
    },
    {
      icon: <Music className="w-6 h-6" />,
      step: '03',
      title: 'Your Playlist',
      desc: 'Receive a personally curated playlist designed to support your brain in this exact moment.',
      color: 'from-sky-500 to-teal-500',
      bg: 'bg-sky-50',
    },
  ];

  const benefits = [
    { title: 'Lowers Cortisol', desc: 'Slow-tempo music at 60–80 BPM activates the parasympathetic nervous system, reducing the stress hormone cortisol.', icon: '🧘' },
    { title: 'Improves Focus', desc: 'Ambient and lo-fi music masks background noise and creates a cognitive "flow channel" that supports deep work.', icon: '🎯' },
    { title: 'Emotional Regulation', desc: 'Music activates the limbic system, helping process and regulate difficult emotions in a non-verbal, safe way.', icon: '💜' },
    { title: 'Better Sleep', desc: 'Calming pre-sleep playlists lower heart rate and signal to your brain that it\'s safe to rest.', icon: '🌙' },
  ];

  const stats = [
    { value: '74%', label: 'of students report music reduces their academic stress' },
    { value: '2.3×', label: 'more likely to sustain focus with personalized music' },
    { value: '18%', label: 'average reduction in perceived stress after 4 weeks' },
  ];

  const testimonials = [
    { name: 'Maya, 19', text: 'I didn\'t realize how much my study playlist was working against me. The focused ambient tracks Resonance recommended actually helped me get through finals.', mood: 'Studied Better' },
    { name: 'Jordan, 22', text: 'The mood tracking helped me notice I was always most anxious on Sunday evenings. Now I have a wind-down playlist ready.', mood: 'Pattern Aware' },
    { name: 'Sam, 17', text: 'It\'s like having a friend who knows exactly what you need to hear, but it\'s music instead of advice. No judgment, just vibes.', mood: 'Feels Supported' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Music className="w-4 h-4 text-white" />
            </div>
            <span className="text-slate-900" style={{ fontWeight: 700, fontSize: '1.1rem' }}>Resonance</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">How it works</a>
            <a href="#why-music" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">Why music</a>
            <a href="#students" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">For students</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-slate-600 hover:text-slate-900 text-sm transition-colors px-4 py-2"
            >
              Explore Demo
            </button>
            <button
              onClick={() => navigate('/onboarding')}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-lg shadow-indigo-200"
            >
              Start Check-In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-indigo-50 to-sky-50" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-200/40 to-indigo-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-teal-200/30 to-sky-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-1.5 rounded-full text-sm mb-6" style={{ fontWeight: 500 }}>
              <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
              AI-Powered Stress Awareness
            </div>
            <h1 className="text-slate-900 mb-6" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1 }}>
              Understand Your Stress.{' '}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Regulate Through Music.
              </span>
            </h1>
            <p className="text-slate-600 mb-8" style={{ fontSize: '1.2rem', lineHeight: 1.7 }}>
              Resonance uses AI to analyze your emotional state, current task, and time of day —
              then curates a playlist scientifically designed to help you focus, relax, or energize.
              Built for teenagers and college students who want to feel better, not just be told to.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => navigate('/onboarding')}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-2xl flex items-center gap-2 hover:opacity-90 transition-all shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5"
                style={{ fontWeight: 600, fontSize: '1rem' }}
              >
                Start Check-In
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-white text-slate-700 px-8 py-4 rounded-2xl flex items-center gap-2 hover:bg-slate-50 transition-all border border-slate-200 shadow-sm"
                style={{ fontWeight: 600, fontSize: '1rem' }}
              >
                <Play className="w-4 h-4" />
                Explore Demo
              </button>
            </div>
            <div className="flex items-center gap-6 mt-10">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-slate-900" style={{ fontWeight: 800, fontSize: '1.5rem' }}>{s.value}</div>
                  <div className="text-slate-500 text-xs mt-0.5 max-w-[100px]" style={{ lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-200">
              <img src={heroImg} alt="Student with headphones" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Music className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-slate-900 text-sm" style={{ fontWeight: 600 }}>Focused & Grounded</div>
                      <div className="text-slate-500 text-xs">Lo-fi Hip Hop • For studying</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1 h-5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      <div className="w-1 h-4 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating tags */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2"
            >
              <span className="text-lg">🎯</span>
              <div>
                <div className="text-slate-800 text-xs" style={{ fontWeight: 600 }}>Deep Focus Mode</div>
                <div className="text-slate-500 text-xs">Stress: High • Task: Study</div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2"
            >
              <span className="text-lg">📊</span>
              <div>
                <div className="text-slate-800 text-xs" style={{ fontWeight: 600 }}>Stress -18%</div>
                <div className="text-slate-500 text-xs">This week's trend</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <a href="#how-it-works" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
          <span className="text-xs">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-sm mb-4" style={{ fontWeight: 500 }}>
              Simple & Thoughtful
            </div>
            <h2 className="text-slate-900 mb-4" style={{ fontSize: '2.5rem', fontWeight: 800 }}>How Resonance Works</h2>
            <p className="text-slate-500 max-w-xl mx-auto" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
              Three steps. Thirty seconds. A playlist designed for exactly how you feel right now.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-slate-200 to-transparent z-10 translate-x-4" />
                )}
                <div className={`${step.bg} rounded-3xl p-8 border border-white shadow-sm hover:shadow-md transition-shadow`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                      {step.icon}
                    </div>
                    <span className="text-slate-200" style={{ fontWeight: 800, fontSize: '2rem' }}>{step.step}</span>
                  </div>
                  <h3 className="text-slate-900 mb-3" style={{ fontWeight: 700, fontSize: '1.25rem' }}>{step.title}</h3>
                  <p className="text-slate-600" style={{ lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => navigate('/onboarding')}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-2xl flex items-center gap-2 hover:opacity-90 transition-all shadow-xl shadow-indigo-200"
              style={{ fontWeight: 600 }}
            >
              Try it now — it's free
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Why Music */}
      <section id="why-music" className="py-24 bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-600 px-4 py-1.5 rounded-full text-sm mb-6" style={{ fontWeight: 500 }}>
                Evidence-Based
              </div>
              <h2 className="text-slate-900 mb-6" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2 }}>
                Why music is one of the most powerful stress tools you already have
              </h2>
              <p className="text-slate-600 mb-8" style={{ lineHeight: 1.7, fontSize: '1.05rem' }}>
                Music isn't just entertainment — it's neuroscience. Your brain responds to sound in deeply
                physical ways, affecting heart rate, cortisol levels, and emotional processing. We use this
                science to match music to your specific emotional needs.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-2xl mb-3 block">{b.icon}</span>
                    <h4 className="text-slate-900 mb-1" style={{ fontWeight: 600 }}>{b.title}</h4>
                    <p className="text-slate-500 text-sm" style={{ lineHeight: 1.6 }}>{b.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={meditationImg} alt="Peaceful mindfulness" className="w-full h-[500px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 via-transparent to-transparent rounded-3xl" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 max-w-[220px]">
                <div className="text-3xl mb-2">🎵</div>
                <p className="text-slate-700 text-sm" style={{ fontWeight: 500, lineHeight: 1.5 }}>
                  "Music reaches parts of the brain that language can't."
                </p>
                <p className="text-slate-400 text-xs mt-2">— Neuroscience research</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Students */}
      <section id="students" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-sm mb-4" style={{ fontWeight: 500 }}>
              <Users className="w-3.5 h-3.5" />
              Designed for You
            </div>
            <h2 className="text-slate-900 mb-4" style={{ fontSize: '2.5rem', fontWeight: 800 }}>Built for teens & students</h2>
            <p className="text-slate-500 max-w-xl mx-auto" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
              Resonance is non-clinical, non-judgmental, and never diagnostic. It's a tool for
              self-awareness and emotional support — not a substitute for professional care.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-gradient-to-br from-slate-50 to-violet-50/50 rounded-3xl p-6 border border-slate-100"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4" style={{ lineHeight: 1.7, fontStyle: 'italic' }}>"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 text-sm" style={{ fontWeight: 600 }}>{t.name}</span>
                  <span className="bg-violet-100 text-violet-600 text-xs px-3 py-1 rounded-full" style={{ fontWeight: 500 }}>{t.mood}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Values grid */}
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <Heart className="w-5 h-5" />, title: 'Emotionally Safe', desc: 'No diagnostic labels. No clinical language. Just supportive, human-centered design.', color: 'text-rose-500 bg-rose-50' },
              { icon: <Shield className="w-5 h-5" />, title: 'Private by Design', desc: 'Your stress data is yours. We never sell it, share it, or use it without consent.', color: 'text-indigo-500 bg-indigo-50' },
              { icon: <Brain className="w-5 h-5" />, title: 'Built on Research', desc: 'Every recommendation is grounded in music cognition, stress physiology, and learning science.', color: 'text-teal-500 bg-teal-50' },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-slate-50 rounded-2xl p-5"
              >
                <div className={`w-10 h-10 rounded-xl ${v.color} flex items-center justify-center flex-shrink-0`}>
                  {v.icon}
                </div>
                <div>
                  <h4 className="text-slate-900 mb-1" style={{ fontWeight: 600 }}>{v.title}</h4>
                  <p className="text-slate-500 text-sm" style={{ lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-violet-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-4" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              Ready to understand your stress?
            </h2>
            <p className="text-violet-200 mb-8 max-w-lg mx-auto" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
              It takes 30 seconds. No account required. Just honest check-ins and music that actually helps.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => navigate('/onboarding')}
                className="bg-white text-violet-700 px-8 py-4 rounded-2xl flex items-center gap-2 hover:bg-violet-50 transition-all shadow-xl"
                style={{ fontWeight: 700, fontSize: '1rem' }}
              >
                Start Your Check-In
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-violet-200 border border-violet-400 px-8 py-4 rounded-2xl hover:bg-violet-500/30 transition-all"
                style={{ fontWeight: 600 }}
              >
                View Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <div>
              <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                  <Music className="w-4 h-4 text-white" />
                </div>
                <span className="text-white" style={{ fontWeight: 700 }}>Resonance</span>
              </button>
              <p className="text-sm max-w-xs" style={{ lineHeight: 1.7 }}>
                AI-powered stress awareness and personalized music support for teenagers and college students.
              </p>
              <p className="text-xs mt-3 text-slate-500">
                Not a medical device. Not a substitute for professional mental health care.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {[
                { title: 'Product', links: ['How it works', 'Features', 'Research'] },
                { title: 'Company', links: ['About', 'Blog', 'Careers'] },
                { title: 'Legal', links: ['Privacy Policy', 'Terms of Use', 'HIPAA Notice'] },
              ].map((col, i) => (
                <div key={i}>
                  <h4 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>{col.title}</h4>
                  <ul className="space-y-2">
                    {col.links.map((l, j) => (
                      <li key={j}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs">© 2026 Resonance. All rights reserved.</p>
            <p className="text-xs">If you're in crisis, please reach out to <a href="https://988lifeline.org" className="text-violet-400 hover:text-violet-300" target="_blank" rel="noreferrer">988 Suicide & Crisis Lifeline</a>.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
