import { NavBar } from "./NavBar";
import { SectionLabel } from "./SectionLabel";
import {
  Users,
  FileSearch,
  Target,
  Lightbulb,
  Layers,
  FlaskConical,
  TrendingUp,
  Quote,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  MessageSquare,
  Music,
  Brain,
  HeartPulse,
  LineChart,
  Sparkles,
  UsersRound,
  ExternalLink,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────

const surveyFindings = [
  { stat: "n = 37", desc: "college students (convenience sample) took part in our mixed-methods evaluation of Resonance" },
  { stat: "0–10", desc: "Likert scale used to capture both baseline stress levels and perceived helpfulness of the platform" },
  { stat: "70%", desc: "rated Resonance between 6 and 10 out of 10 for helping them manage stress" },
  { stat: "Academic", desc: "stress — deadlines and coursework — was the most frequently cited source of everyday pressure" },
];

const userNeeds = [
  {
    icon: <Music className="w-4 h-4" />,
    need: "Personalised Music",
    desc: "Recommendations that match their current mood and task — not just a generic playlist",
  },
  {
    icon: <LineChart className="w-4 h-4" />,
    need: "Stress Visibility",
    desc: "A way to see their own stress patterns over time and connect them to their daily activities",
  },
  {
    icon: <HeartPulse className="w-4 h-4" />,
    need: "Low-Barrier Check-ins",
    desc: "Stress tracking that feels quick and natural, not clinical or intrusive",
  },
  {
    icon: <UsersRound className="w-4 h-4" />,
    need: "Community & Belonging",
    desc: "A space to share music, discover what others with similar stress patterns are listening to",
  },
];

const researchGoals = [
  {
    goal: "Validate the mood–music connection",
    metric: "User-reported mood shift after listening",
    target: "Positive shift in ≥ 70% of sessions",
    color: "violet",
  },
  {
    goal: "Assess stress input usability",
    metric: "Task completion rate for check-in flow",
    target: "≥ 85% without assistance",
    color: "blue",
  },
  {
    goal: "Measure recommendation relevance",
    metric: "Playlist acceptance rate",
    target: "≥ 65% of suggestions kept/played",
    color: "emerald",
  },
  {
    goal: "Evaluate stress dashboard clarity",
    metric: "Comprehension & self-awareness score",
    target: "SUS ≥ 75 on visualisation screens",
    color: "amber",
  },
];

const prototypeFeatures = [
  "Self-reported stress check-in (level, mood, task type, time of day)",
  "AI mood classifier that maps inputs to music features (relaxation, focus, regulation)",
  "Personalised playlist recommendations from existing music libraries",
  "Visual stress dashboard — trends over time, activity correlations",
  "Community tab to share and discover mood-tagged playlists",
];

const testingInsights = [
  {
    theme: "Check-in flow",
    quote: "[P03] \u201cIt only took me like 20 seconds — I thought it would feel like a chore but it didn\u2019t.\u201d",
    finding: "Most participants completed the stress check-in without guidance. Emoji-based mood selectors were preferred over sliders.",
    sentiment: "positive",
  },
  {
    theme: "Music relevance",
    quote: "[P11] \u201cThe songs it picked actually matched how I was feeling, which was kind of surprising.\u201d",
    finding: "Participants reported that the mood-based playlists often aligned with their current emotional context and study tasks.",
    sentiment: "positive",
  },
  {
    theme: "Stress visualisation",
    quote: "[P19] \u201cI didn\u2019t realise I was always most stressed on Wednesday afternoons until I saw the graph.\u201d",
    finding: "The dashboard created genuine \u201caha\u201d moments, but some users found the correlation view confusing on first pass — labels need clearer context.",
    sentiment: "neutral",
  },
  {
    theme: "Community feature",
    quote: "[P27] \u201cI\u2019m not sure I\u2019d share my stress level publicly — but sharing playlists feels fine.\u201d",
    finding: "Privacy concerns around stress data are a barrier to community adoption. Separating playlist-sharing from stress data surfacing may improve comfort.",
    sentiment: "negative",
  },
];

const impactMetrics = [
  {
    label: "Participants rating Resonance 6–10/10 for stress support",
    before: "—",
    after: "70%",
    delta: "Target met",
    positive: true,
  },
  {
    label: "Participants already using music as a coping strategy",
    before: "—",
    after: "Most",
    delta: "Confirms music as a natural entry point",
    positive: true,
  },
  {
    label: "Participants who struggled to find the right music on their own",
    before: "—",
    after: "Many",
    delta: "Opportunity for contextual recommendations",
    positive: true,
  },
  {
    label: "Perceived clarity of stress trends in dashboard",
    before: "—",
    after: "Mixed",
    delta: "Requires iteration on labels and explanations",
    positive: false,
  },
];

const nextSteps = [
  "Refine stress visualisation labels and add contextual tooltips based on comprehension findings",
  "Re-design community feature with privacy-first defaults — separate playlist sharing from personal stress data",
  "Complete remaining 4 user testing sessions and re-analyse themes",
  "Finalise AI recommendation logic and prepare for deployment (Week 10)",
];

// ─── Component ─────────────────────────────────────────────────────────────

export function ResearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {/* ── Hero / Overview ────────────────────────────────────────── */}
      <section
        id="overview"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f0a1e 0%, #1a0f3c 35%, #0d1f35 100%)",
        }}
      >
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1758612214844-8e3a0ff255c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlciUyMGhlYWRwaG9uZXMlMjBtdXNpYyUyMHN0cmVzcyUyMHJlbGllZnxlbnwxfHx8fDE3NzI3MzgwMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080)`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />

        {/* Decorative orbs */}
        <div className="absolute top-24 right-16 w-80 h-80 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #818cf8, transparent)" }} />
        <div className="absolute bottom-24 left-16 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #34d399, transparent)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5" style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }} />

        <div className="relative max-w-6xl mx-auto px-6 py-32 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-400/30 bg-violet-500/10 text-violet-300 text-xs tracking-widest uppercase mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Research in Progress — Spring 2026
            </div>

            <h1 className="text-white mb-6" style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)", fontWeight: 700, lineHeight: 1.1 }}>
              AI-Powered Music for{" "}
              <span style={{ color: "#a78bfa" }}>Teen Stress Relief</span>
            </h1>

            <p className="text-violet-100/70 mb-10 max-w-2xl" style={{ fontSize: "1.075rem", lineHeight: 1.8 }}>
              Teenagers and college students experience high, persistent stress, while many existing mental-health resources feel inaccessible or reactive. This project
              aims to develop and evaluate Resonance — a web-based, AI-powered platform that uses self-reported emotional data to generate personalised music
              recommendations and visualise stress patterns over time.
            </p>

            <div className="flex flex-wrap gap-8">
              {[
                { label: "Target Users", value: "Teens & College Students" },
                { label: "Research Phase", value: "Prototype Testing" },
                { label: "Methods", value: "Survey · Interview · UT" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-violet-400 text-xs tracking-widest uppercase mb-1">{item.label}</p>
                  <p className="text-white" style={{ fontWeight: 600 }}>{item.value}</p>
                </div>
              ))}
            </div>

            <a
              href="https://resonance-inf172-31.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-xl bg-violet-500/20 border border-violet-400/40 text-violet-200 hover:bg-violet-500/30 hover:text-white transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Try the product app
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-violet-300/50">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-violet-400/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Research Methodology + Initial User Research ─────────── */}
      <section id="methodology" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel number="01" label="Research Methodologies" color="violet" />
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: 700 }}>
                Research Methodologies
              </h2>
              <p className="text-violet-600 mb-5" style={{ fontWeight: 500 }}>
                Initial User Research &amp; User Needs
              </p>
              <p className="text-muted-foreground mb-10" style={{ lineHeight: 1.8 }}>
                We conducted a mixed-methods study with 37 college students (convenience sample), combining an online survey with follow-up interviews and prototype
                testing. Our goal was to understand how they experience academic stress, how they already use music to cope, and how an AI-assisted tool like Resonance
                could fit into their routines.
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: <BarChart3 className="w-5 h-5" />,
                    title: "Online Survey (n = 37)",
                    detail: "Captured baseline stress (0–10 scale), music habits, and perceived usefulness of AI-generated playlists.",
                    color: "bg-violet-50 text-violet-600",
                  },
                  {
                    icon: <Users className="w-5 h-5" />,
                    title: "Interviews & Prototype Sessions",
                    detail: "A subset of participants completed semi-structured interviews and walked through the interactive prototype.",
                    color: "bg-blue-50 text-blue-600",
                  },
                  {
                    icon: <FileSearch className="w-5 h-5" />,
                    title: "Synthesis & Coding",
                    detail: "Survey responses and interview notes were coded into themes, user needs, and design requirements.",
                    color: "bg-emerald-50 text-emerald-600",
                  },
                ].map((m) => (
                  <div key={m.title} className="flex gap-4 p-5 rounded-2xl border border-border hover:border-violet-200 hover:shadow-sm transition-all">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${m.color}`}>
                      {m.icon}
                    </div>
                    <div>
                      <h4 className="mb-1">{m.title}</h4>
                      <p className="text-sm text-muted-foreground">{m.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Survey findings */}
            <div>
              <h3 className="mb-6 text-muted-foreground" style={{ fontWeight: 500 }}>Key Survey Findings</h3>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {surveyFindings.map((f) => (
                  <div key={f.stat} className="p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100">
                    <div className="text-violet-700 mb-2" style={{ fontSize: "1.875rem", fontWeight: 700 }}>{f.stat}</div>
                    <p className="text-sm text-muted-foreground" style={{ lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="mb-5 text-muted-foreground" style={{ fontWeight: 500 }}>Identified User Needs</h3>
              <div className="space-y-3">
                {userNeeds.map((n) => (
                  <div key={n.need} className="flex gap-4 p-4 rounded-xl bg-muted/40 hover:bg-accent transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center text-violet-600 flex-shrink-0">
                      {n.icon}
                    </div>
                    <div>
                      <span className="text-sm" style={{ fontWeight: 600 }}>{n.need} — </span>
                      <span className="text-sm text-muted-foreground">{n.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem Statement ──────────────────────────────────────── */}
      <section id="problem" className="py-28 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 80% 20%, #0891b2 0%, transparent 40%)" }} />

        <div className="relative max-w-6xl mx-auto px-6">
          <SectionLabel number="02" label="Problem Statement" color="violet" />

          <div className="max-w-4xl">
            <h2 className="text-white mb-3" style={{ fontSize: "2rem", fontWeight: 700 }}>
              Problem Statement
            </h2>
            <p className="text-violet-300 mb-8" style={{ fontWeight: 500 }}>
              Research Question
            </p>
            <div className="flex gap-4 items-start mb-8">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Quote className="w-5 h-5 text-violet-400" />
              </div>
              <blockquote className="text-white/90" style={{ fontSize: "clamp(1.2rem, 2.75vw, 1.65rem)", lineHeight: 1.7, fontWeight: 400 }}>
                Teenagers and college students are experiencing stress levels well above what they consider healthy — yet existing mental-health resources are often inaccessible, stigmatised, or reactive rather than preventative, leaving young people without effective everyday coping strategies.
              </blockquote>
            </div>

            {/* Stat callout */}
            <div className="grid grid-cols-3 gap-4 mb-14">
              {[
                { label: "Teen avg. stress", value: "5.8/10", note: "APA, 2014" },
                { label: "Adult avg. stress", value: "5.1/10", note: "Above teens" },
                { label: "What teens consider healthy", value: "3.9/10", note: "The gap we're closing" },
              ].map((s) => (
                <div key={s.label} className="p-5 rounded-2xl border border-white/10 bg-white/5 text-center">
                  <div className="text-violet-300 mb-1" style={{ fontSize: "1.75rem", fontWeight: 700 }}>{s.value}</div>
                  <p className="text-white/70 text-sm mb-1">{s.label}</p>
                  <p className="text-white/30 text-xs">{s.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
              <h3 className="text-white mb-4" style={{ fontWeight: 600 }}>Why Music?</h3>
              <p className="text-white/60" style={{ lineHeight: 1.8 }}>
                Music is already deeply embedded in teens' daily routines. Research shows music interventions significantly reduce both physiological and psychological stress markers (de Witte et al., 2020) — making it a natural, non-clinical entry point for stress support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Research Goals ─────────────────────────────────────────── */}
      <section id="goals" className="py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel number="03" label="Research Goals" color="blue" />
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: 700 }}>
                Research Goals
              </h2>
              <p className="text-blue-600 mb-5" style={{ fontWeight: 500 }}>
                Outcomes We Wanted to Measure Based on Our Initial User Research Findings
              </p>
              <p className="text-muted-foreground mb-8" style={{ lineHeight: 1.8 }}>
                Based on our initial survey findings and interview themes, we defined four measurable outcomes to evaluate whether our platform actually helps teens and college students manage their stress through music — and whether they can use it without friction.
              </p>

              <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 mb-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-800" style={{ lineHeight: 1.7 }}>
                    Every goal maps directly to a user need from our research — we didn't define success in a vacuum. Each metric is grounded in what students told us matters to them.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "Does listening to AI-recommended music actually shift how users feel?",
                  "Can users complete a stress check-in quickly and without confusion?",
                  "Do the playlist suggestions feel relevant to users' emotional state and task?",
                  "Does the stress dashboard help users understand their own patterns?",
                ].map((insight, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{insight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {researchGoals.map((g, i) => {
                const colorBg: Record<string, string> = {
                  violet: "border-l-violet-500 bg-white",
                  blue: "border-l-blue-500 bg-white",
                  emerald: "border-l-emerald-500 bg-white",
                  amber: "border-l-amber-500 bg-white",
                };
                const colorText: Record<string, string> = {
                  violet: "text-violet-600",
                  blue: "text-blue-600",
                  emerald: "text-emerald-600",
                  amber: "text-amber-600",
                };
                const colorPill: Record<string, string> = {
                  violet: "bg-violet-50 text-violet-700",
                  blue: "bg-blue-50 text-blue-700",
                  emerald: "bg-emerald-50 text-emerald-700",
                  amber: "bg-amber-50 text-amber-700",
                };
                return (
                  <div key={g.goal} className={`p-6 rounded-2xl border border-border border-l-4 ${colorBg[g.color]} shadow-sm`}>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs tracking-widest uppercase mb-2 ${colorText[g.color]}`}>Goal {i + 1}</div>
                        <h4 className="mb-2">{g.goal}</h4>
                        <p className="text-sm text-muted-foreground">
                          <span style={{ fontWeight: 500 }}>Metric: </span>{g.metric}
                        </p>
                      </div>
                      <div className={`text-xs px-3 py-1.5 rounded-full flex-shrink-0 ${colorPill[g.color]}`} style={{ fontWeight: 500 }}>
                        {g.target}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Prototype ──────────────────────────────────────────────── */}
      <section id="prototype" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel number="04" label="Prototype" color="emerald" />
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="mb-5" style={{ fontSize: "2rem", fontWeight: 700 }}>
                Prototype
              </h2>
              <p className="text-muted-foreground mb-6" style={{ lineHeight: 1.8 }}>
                We built a mid-to-high fidelity web-based prototype in Figma covering the three core product flows: stress check-in, AI music recommendation, and stress pattern visualisation. The prototype is accessible cross-device — no download required.
              </p>

              <div className="space-y-3 mb-8">
                {prototypeFeatures.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>

              {/* Gap analysis callout */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-emerald-800" style={{ lineHeight: 1.7 }}>
                    Unlike existing tools (Endel, BetterSleep, PersonalAIs), our platform combines self-reported stress data, longitudinal visualisation, and a community layer in one experience — built specifically for teens and college students.
                  </p>
                </div>
              </div>
            </div>

            <div>
              {/* Main image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl mb-4">
                <img
                  src="https://images.unsplash.com/photo-1551817958-795f9440ce4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTcG90aWZ5JTIwbXVzaWMlMjBzdHJlYW1pbmclMjBhcHB8ZW58MXx8fHwxNzcyNzM4NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Spotify music app"
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Feature stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <Brain className="w-4 h-4" />, value: "3", label: "Core flows", color: "bg-violet-50 text-violet-600" },
                  { icon: <Music className="w-4 h-4" />, value: "AI", label: "Mood classifier", color: "bg-emerald-50 text-emerald-600" },
                  { icon: <LineChart className="w-4 h-4" />, value: "Live", label: "Stress dashboard", color: "bg-blue-50 text-blue-600" },
                ].map((s) => (
                  <div key={s.label} className="p-4 rounded-xl border border-border bg-slate-50 text-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 ${s.color}`}>
                      {s.icon}
                    </div>
                    <div className="mb-0.5" style={{ fontWeight: 700 }}>{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Wireframes (172) ───────────────────────────────────────── */}
      <section id="wireframes" className="py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel number="05" label="Wireframes" color="violet" />
          <div className="space-y-10">
            <div>
              <h2 className="mb-5" style={{ fontSize: "2rem", fontWeight: 700 }}>
                Wireframes
              </h2>
              <p className="text-muted-foreground mb-6" style={{ lineHeight: 1.8 }}>
                Early wireframes that explore the information architecture, layout, and key flows behind this research project. These mockups show how the experience
                for stress check-ins, AI music recommendations, and dashboards comes together on screen.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Below is an embedded view of the key wireframes used to explore the layout and flows for Resonance.
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="rounded-3xl overflow-hidden border border-violet-200 bg-white shadow-sm">
                <div className="aspect-[16/10] bg-slate-100">
                  <iframe
                    title="Wireframes – embedded mockups"
                    src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
                      "https://www.figma.com/design/UBjTYzb6uEIWxk2tmS2QVw/172-Wireframes"
                    )}`}
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── User Testing ───────────────────────────────────────────── */}
      <section id="user-testing" className="py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel number="06" label="User Testing with Prototype" color="amber" />
          <div className="mb-12">
            <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: 700 }}>
              User Testing with Prototype
            </h2>
            <p className="text-amber-600 mb-5" style={{ fontWeight: 500 }}>
              Research Insights from Our Current Interviews
            </p>
            <p className="text-muted-foreground max-w-2xl" style={{ lineHeight: 1.8 }}>
              After the survey, participants were invited to take part in moderated usability sessions with the Resonance prototype. In these sessions, they completed
              stress check-ins, explored mood-based playlists, and reflected on how well the recommendations and visualisations supported their real academic stress.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-14">
            {testingInsights.map((insight) => {
              const sentimentStyle: Record<string, string> = {
                positive: "border-t-emerald-400",
                neutral: "border-t-amber-400",
                negative: "border-t-rose-400",
              };
              const sentimentBadge: Record<string, string> = {
                positive: "bg-emerald-100 text-emerald-700",
                neutral: "bg-amber-100 text-amber-700",
                negative: "bg-rose-100 text-rose-600",
              };
              const sentimentLabel: Record<string, string> = {
                positive: "Positive signal",
                neutral: "Mixed",
                negative: "Pain point",
              };

              return (
                <div key={insight.theme} className={`bg-white rounded-2xl border border-border border-t-4 ${sentimentStyle[insight.sentiment]} p-6 shadow-sm`}>
                  <div className="flex items-start justify-between mb-4 gap-3 flex-wrap">
                    <h4>{insight.theme}</h4>
                    <span className={`text-xs px-2.5 py-1 rounded-full flex-shrink-0 ${sentimentBadge[insight.sentiment]}`}>
                      {sentimentLabel[insight.sentiment]}
                    </span>
                  </div>
                  <blockquote className="text-sm text-muted-foreground mb-4 italic border-l-2 border-border pl-4" style={{ lineHeight: 1.7 }}>
                    {insight.quote}
                  </blockquote>
                  <p className="text-sm" style={{ lineHeight: 1.7 }}>
                    <span style={{ fontWeight: 600 }}>Finding: </span>
                    <span className="text-muted-foreground">{insight.finding}</span>
                  </p>
                </div>
              );
            })}
          </div>

          {/* (Sessions status visual removed as requested) */}
        </div>
      </section>

      {/* ── Impact ─────────────────────────────────────────────────── */}
      <section id="impact" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel number="07" label="Impact" color="indigo" />
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="mb-5" style={{ fontSize: "2rem", fontWeight: 700 }}>
                Impact
              </h2>
              <p className="text-muted-foreground mb-8" style={{ lineHeight: 1.8 }}>
                Thirty-seven participants reported frequent academic stress and commonly used music as a coping strategy, yet many struggled to find tracks that matched
                their emotional context. During prototype testing, 70% rated Resonance between 6 and 10 out of 10 in its ability to help them manage stress.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {impactMetrics.map((m) => (
                  <div key={m.label} className="p-5 rounded-2xl border border-border bg-slate-50 hover:bg-accent transition-colors">
                    <p className="text-xs text-muted-foreground mb-3 tracking-wide">{m.label}</p>
                    <p className="mb-3" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{m.after}</p>
                    <div className="pt-3 border-t border-border flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-sm text-emerald-600" style={{ fontWeight: 600 }}>{m.delta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div
                className="rounded-3xl p-8 mb-6 text-white relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
              >
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white, transparent)", transform: "translate(30%, -30%)" }} />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-white">Broader Impact</h3>
                </div>
                <p className="text-white/80 mb-6" style={{ lineHeight: 1.8, fontSize: "0.9375rem" }}>
                  These findings suggest that integrating AI-driven music curation with simple stress tracking can provide young adults with a low-barrier, non-clinical
                  tool that encourages self-awareness and proactive coping habits. Future work will refine the dashboard visuals and explore longer-term use of Resonance
                  beyond this initial study.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: "75%" }} />
                  </div>
                  <span className="text-white text-sm" style={{ fontWeight: 600 }}>3 / 4</span>
                </div>
                <p className="text-white/50 text-xs mt-1">Success metrics met so far</p>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-slate-50">
                <h4 className="mb-5 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-indigo-500" />
                  Next Steps
                </h4>
                <div className="space-y-3">
                  {nextSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5" style={{ fontWeight: 600 }}>
                        {i + 1}
                      </div>
                      <p className="text-sm text-muted-foreground" style={{ lineHeight: 1.6 }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product ─────────────────────────────────────────────────── */}
      <section id="product" className="py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel number="08" label="Product" color="violet" />
          <div className="max-w-2xl">
            <h2 className="mb-5" style={{ fontSize: "2rem", fontWeight: 700 }}>
              Try Resonance
            </h2>
            <p className="text-muted-foreground mb-8" style={{ lineHeight: 1.8 }}>
              The interactive web app is available to try. Use the link below to open the product in a new tab.
            </p>
            <a
              href="https://resonance-inf172-31.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open product app
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-10 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span>AI Music & Stress Research · Spring 2026</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://resonance-inf172-31.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-800 underline underline-offset-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Product app
            </a>
            <span>Research ongoing — last updated March 5, 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}