import React, { createContext, useContext, useState, useEffect } from 'react';

export type StressLevel = 'low' | 'medium' | 'high' | '';
export type Mood = 'anxious' | 'overwhelmed' | 'tired' | 'motivated' | 'calm' | 'sad' | '';
export type TaskType = 'studying' | 'exercising' | 'relaxing' | 'socializing' | 'creative' | '';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'latenight' | '';

export interface CheckIn {
  id: string;
  date: string;
  stressLevel: StressLevel;
  mood: Mood;
  task: TaskType;
  timeOfDay: TimeOfDay;
  reflection: string;
}

export interface PlaylistRec {
  title: string;
  description: string;
  mood: string;
  task: string;
  genre: string;
  color: string;
  tracks: string[];
  reasoning: string;
}

interface UserData {
  checkIns: CheckIn[];
  currentCheckIn: Partial<CheckIn>;
  playlist: PlaylistRec | null;
  username: string;
}

interface AppContextType {
  userData: UserData;
  setCurrentCheckIn: (data: Partial<CheckIn>) => void;
  addCheckIn: (checkIn: CheckIn) => void;
  setPlaylist: (playlist: PlaylistRec) => void;
  clearCurrentCheckIn: () => void;
}

const defaultData: UserData = {
  checkIns: [
    { id: '1', date: '2026-02-17', stressLevel: 'high', mood: 'anxious', task: 'studying', timeOfDay: 'evening', reflection: 'Lots of exams coming up' },
    { id: '2', date: '2026-02-18', stressLevel: 'medium', mood: 'tired', task: 'studying', timeOfDay: 'afternoon', reflection: '' },
    { id: '3', date: '2026-02-19', stressLevel: 'medium', mood: 'calm', task: 'relaxing', timeOfDay: 'evening', reflection: 'Needed a break' },
    { id: '4', date: '2026-02-20', stressLevel: 'low', mood: 'motivated', task: 'exercising', timeOfDay: 'morning', reflection: 'Feeling good today' },
    { id: '5', date: '2026-02-21', stressLevel: 'high', mood: 'overwhelmed', task: 'studying', timeOfDay: 'latenight', reflection: 'Project due tomorrow' },
    { id: '6', date: '2026-02-22', stressLevel: 'medium', mood: 'tired', task: 'studying', timeOfDay: 'afternoon', reflection: '' },
    { id: '7', date: '2026-02-23', stressLevel: 'low', mood: 'calm', task: 'creative', timeOfDay: 'morning', reflection: 'Painted for fun' },
  ],
  currentCheckIn: {},
  playlist: null,
  username: 'Alex',
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData>(() => {
    try {
      const stored = localStorage.getItem('resonance_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultData, ...parsed };
      }
    } catch {}
    return defaultData;
  });

  useEffect(() => {
    try {
      localStorage.setItem('resonance_data', JSON.stringify(userData));
    } catch {}
  }, [userData]);

  const setCurrentCheckIn = (data: Partial<CheckIn>) => {
    setUserData(prev => ({ ...prev, currentCheckIn: { ...prev.currentCheckIn, ...data } }));
  };

  const addCheckIn = (checkIn: CheckIn) => {
    setUserData(prev => ({
      ...prev,
      checkIns: [...prev.checkIns, checkIn],
      currentCheckIn: {},
    }));
  };

  const setPlaylist = (playlist: PlaylistRec) => {
    setUserData(prev => ({ ...prev, playlist }));
  };

  const clearCurrentCheckIn = () => {
    setUserData(prev => ({ ...prev, currentCheckIn: {} }));
  };

  return (
    <AppContext.Provider value={{ userData, setCurrentCheckIn, addCheckIn, setPlaylist, clearCurrentCheckIn }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

// AI playlist recommendation logic
export function getPlaylistRecommendation(
  stress: StressLevel,
  mood: Mood,
  task: TaskType,
  timeOfDay: TimeOfDay
): PlaylistRec {
  const key = `${stress}-${task}`;

  const playlists: Record<string, PlaylistRec> = {
    'high-studying': {
      title: 'Deep Focus',
      description: 'Ambient soundscapes to cut through noise and anchor your attention',
      mood: 'Focused',
      task: 'Studying',
      genre: 'Lo-fi Ambient',
      color: 'from-indigo-500 to-violet-600',
      tracks: ['Brian Eno – Music For Airports', 'Nils Frahm – Says', 'Max Richter – On the Nature of Daylight', 'Tycho – Dive', 'Jon Hopkins – Immunity'],
      reasoning: 'High stress during studying benefits from slow-tempo ambient music that masks distracting noise without demanding your attention. These tracks have tempos between 60–80 BPM shown to lower cortisol and promote alpha brain waves.'
    },
    'high-relaxing': {
      title: 'Peaceful Drift',
      description: 'Soft instrumentals to guide you back to stillness',
      mood: 'Calming',
      task: 'Relaxing',
      genre: 'Calm Instrumental',
      color: 'from-sky-400 to-teal-500',
      tracks: ['Ludovico Einaudi – Una Mattina', 'Ólafur Arnalds – Near Light', 'Max Richter – Sleep', 'Nils Frahm – All Melody', 'Hammock – Meanwhile'],
      reasoning: 'When stress is high and the goal is rest, slow melodic instrumentals activate the parasympathetic nervous system. These tracks feature minimal lyrics and low BPM to encourage genuine relaxation.'
    },
    'high-exercising': {
      title: 'Power Through',
      description: 'Driving rhythms to channel tension into momentum',
      mood: 'Energized',
      task: 'Exercising',
      genre: 'High-energy Electronic',
      color: 'from-orange-500 to-rose-600',
      tracks: ['Disclosure – Latch', 'The Prodigy – Breathe', 'Daft Punk – Harder Better Faster', 'Chemical Brothers – Hey Boy Hey Girl', 'Justice – D.A.N.C.E.'],
      reasoning: 'High stress can be metabolized through physical activity. High-BPM electronic tracks (130–145 BPM) help redirect nervous energy into productive movement and increase endorphin release during exercise.'
    },
    'high-socializing': {
      title: 'Ease In',
      description: 'Warm, approachable sounds to open up socially',
      mood: 'Warm',
      task: 'Socializing',
      genre: 'Indie Pop',
      color: 'from-amber-400 to-orange-500',
      tracks: ['Vampire Weekend – A-Punk', 'Foster the People – Pumped Up Kicks', 'Phoenix – 1901', 'MGMT – Electric Feel', 'Cut Copy – Need You Now'],
      reasoning: 'Social anxiety benefits from familiar, upbeat indie sounds with moderate tempo. These tracks create a comfortable social atmosphere without being overstimulating.'
    },
    'high-creative': {
      title: 'Flow State',
      description: 'Textured ambient layers to unlock creative depth',
      mood: 'Inspired',
      task: 'Creative Work',
      genre: 'Ambient Electronic',
      color: 'from-purple-500 to-pink-600',
      tracks: ['Boards of Canada – Music Has the Right to Children', 'Four Tet – Rounds', 'Aphex Twin – Selected Ambient Works', 'Grouper – Dragging a Dead Deer', 'Washed Out – Feel It All Around'],
      reasoning: 'High-stress creative work needs music that reduces mental noise without being distracting. These ambient-electronic tracks create a psychological container that quiets the inner critic.'
    },
    'medium-studying': {
      title: 'Focused & Grounded',
      description: 'Steady lo-fi beats to keep you in the zone',
      mood: 'Focused',
      task: 'Studying',
      genre: 'Lo-fi Hip Hop',
      color: 'from-violet-500 to-indigo-600',
      tracks: ['Nujabes – Feather', 'J Dilla – Donuts', 'Lofi Girl – Study Beats', 'Tomppabeats – Harbor', 'Idealism – Childhood'],
      reasoning: 'Medium stress during studying responds well to lo-fi hip hop — steady beats at 70–90 BPM create a rhythmic background that helps maintain focus without overstimulation.'
    },
    'medium-exercising': {
      title: 'Steady Beat',
      description: 'Upbeat rhythms to keep your energy consistent',
      mood: 'Energized',
      task: 'Exercising',
      genre: 'Dance / Pop',
      color: 'from-emerald-500 to-teal-600',
      tracks: ['Dua Lipa – Physical', 'Calvin Harris – Feel So Close', 'Stromae – Alors On Danse', 'Clean Bandit – Rockabye', 'Years & Years – King'],
      reasoning: 'At medium stress, moderately upbeat music (115–128 BPM) supports consistent exercise performance and mood elevation without overstimulating the nervous system.'
    },
    'medium-relaxing': {
      title: 'Soft Landing',
      description: 'Gentle acoustic sounds for unwinding without zoning out',
      mood: 'Gentle',
      task: 'Relaxing',
      genre: 'Acoustic / Folk',
      color: 'from-teal-400 to-emerald-500',
      tracks: ['Nick Drake – Pink Moon', 'Iron & Wine – Naked As We Came', 'Jose Gonzalez – Heartbeats', 'Sufjan Stevens – Death with Dignity', 'Fleet Foxes – White Winter Hymnal'],
      reasoning: 'Medium stress during rest benefits from warm acoustic music — subtle melodies and gentle vocals help the mind slow down without falling into lethargy.'
    },
    'medium-creative': {
      title: 'Creative Flow',
      description: 'Indie sounds to fuel imagination and expression',
      mood: 'Inspired',
      task: 'Creative Work',
      genre: 'Indie / Alternative',
      color: 'from-pink-500 to-rose-500',
      tracks: ['Bon Iver – Skinny Love', 'Radiohead – Daydreaming', 'Sigur Rós – Hoppípolla', 'Sufjan Stevens – Chicago', 'Arcade Fire – Rebellion'],
      reasoning: 'Medium stress and creativity pair well with emotionally evocative indie music. These tracks activate the default mode network — the brain region associated with imagination and creative insight.'
    },
    'medium-socializing': {
      title: 'Good Vibes',
      description: 'Feel-good tracks to set a relaxed social tone',
      mood: 'Warm',
      task: 'Socializing',
      genre: 'Feel-good Pop',
      color: 'from-yellow-400 to-amber-500',
      tracks: ['Jack Johnson – Better Together', 'Ben Harper – Steal My Kisses', 'Jason Mraz – I\'m Yours', 'John Mayer – Waiting on the World to Change', 'Colbie Caillat – Bubbly'],
      reasoning: 'Social settings at medium stress benefit from warm, acoustic-pop sounds with positive lyrical themes. These tracks encourage openness and comfortable conversation.'
    },
    'low-studying': {
      title: 'Light Focus',
      description: 'Breezy instrumentals for an easy, productive session',
      mood: 'Focused',
      task: 'Studying',
      genre: 'Instrumental Pop',
      color: 'from-blue-400 to-sky-500',
      tracks: ['Explosions in the Sky – Your Hand in Mine', 'Hammock – Maybe They Will Sing for Us Tomorrow', 'Khruangbin – A Calf Born in Winter', 'GoGo Penguin – Hopopono', 'GoGo Penguin – Raven'],
      reasoning: 'Low stress while studying is ideal — keep it that way with gentle instrumental music that maintains mild engagement without increasing tension or inducing drowsiness.'
    },
    'low-exercising': {
      title: 'Energy Boost',
      description: 'Fresh and uplifting tracks to elevate your workout',
      mood: 'Energized',
      task: 'Exercising',
      genre: 'Upbeat Pop',
      color: 'from-lime-500 to-emerald-500',
      tracks: ['Lizzo – Good as Hell', 'Harry Styles – Watermelon Sugar', 'Doja Cat – Say So', 'Dua Lipa – Levitating', 'Olivia Rodrigo – good 4 u'],
      reasoning: 'When stress is low, energetic pop music enhances exercise enjoyment and motivation. High-BPM tracks with positive lyrics reinforce your already-positive state.'
    },
    'low-relaxing': {
      title: 'Tranquil Space',
      description: 'Serene soundscapes to deepen your rest',
      mood: 'Peaceful',
      task: 'Relaxing',
      genre: 'Nature / Ambient',
      color: 'from-cyan-400 to-blue-500',
      tracks: ['Brian Eno – An Ending (Ascent)', 'Stars of the Lid – Tired Leaves', 'Grouper – Vapor Trails', 'William Basinski – Disintegration Loops', 'Eluvium – Indoor Swimming at the Space Station'],
      reasoning: 'Low stress and relaxation is an opportunity for deep restorative rest. Pure ambient music without rhythm or melody allows the mind to fully disengage.'
    },
    'low-creative': {
      title: 'Inspiring Indie',
      description: 'Playful, genre-bending sounds to spark new ideas',
      mood: 'Inspired',
      task: 'Creative Work',
      genre: 'Indie / Dream Pop',
      color: 'from-fuchsia-500 to-purple-600',
      tracks: ['Beach House – Space Song', 'Tame Impala – Let It Happen', 'Alvvays – Archie, Marry Me', 'Alex G – Treehouse', 'Car Seat Headrest – Fill in the Blank'],
      reasoning: 'Low stress is the ideal state for creative exploration. Dreamy, layered indie tracks stimulate divergent thinking and create the psychological safety needed for bold creative choices.'
    },
    'low-socializing': {
      title: 'Social Spark',
      description: 'Fun, familiar tracks to set the mood',
      mood: 'Joyful',
      task: 'Socializing',
      genre: 'Pop / Dance',
      color: 'from-rose-400 to-pink-500',
      tracks: ['Daft Punk – Get Lucky', 'Pharrell Williams – Happy', 'Bruno Mars – Uptown Funk', 'Mark Ronson – Feel Right', 'Justin Timberlake – Can\'t Stop the Feeling'],
      reasoning: 'Social activities at low stress thrive with familiar, feel-good pop that everyone recognizes. These tracks encourage movement, conversation, and shared joy.'
    },
  };

  const fallbackKey = `medium-studying`;
  return playlists[key] || playlists[fallbackKey];
}

export const moodColors: Record<string, string> = {
  anxious: 'bg-amber-100 text-amber-700',
  overwhelmed: 'bg-rose-100 text-rose-700',
  tired: 'bg-slate-100 text-slate-600',
  motivated: 'bg-emerald-100 text-emerald-700',
  calm: 'bg-teal-100 text-teal-700',
  sad: 'bg-blue-100 text-blue-700',
};

export const stressColors: Record<string, string> = {
  low: 'text-emerald-600',
  medium: 'text-amber-600',
  high: 'text-rose-600',
};

export const stressBgColors: Record<string, string> = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700',
};
