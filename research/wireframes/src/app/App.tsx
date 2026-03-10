import { useState } from 'react';
import { StressInputs } from './components/StressInputs';
import { MusicRecommendations } from './components/MusicRecommendations';
import { Community } from './components/Community';
import { Profile } from './components/Profile';

export default function App() {
  const [activeTab, setActiveTab] = useState('stress');

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {activeTab === 'stress' && <StressInputs />}
        {activeTab === 'music' && <MusicRecommendations />}
        {activeTab === 'community' && <Community />}
        {activeTab === 'profile' && <Profile />}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-300 px-4 py-3">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('stress')}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeTab === 'stress' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <div className="w-6 h-6 border-2 border-current rounded"></div>
            <span className="text-xs">Stress Inputs</span>
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeTab === 'music' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <div className="w-6 h-6 border-2 border-current rounded-full"></div>
            <span className="text-xs">Music</span>
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeTab === 'community' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <div className="w-6 h-6 border-2 border-current"></div>
            <span className="text-xs">Community</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeTab === 'profile' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <div className="w-6 h-6 border-2 border-current rounded-full"></div>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}