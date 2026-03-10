export function MusicRecommendations() {
  return (
    <div className="px-6 py-8 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="h-8 w-56 bg-gray-400 mb-2 flex items-center px-3">
          <span className="text-xs text-gray-600">Music for You</span>
        </div>
        <div className="h-5 w-64 bg-gray-300 flex items-center px-2">
          <span className="text-xs text-gray-500">Based on your mood</span>
        </div>
      </div>

      {/* Current Mood Status */}
      <div className="bg-white border-2 border-gray-400 rounded-lg p-6 mb-6 shadow-sm">
        <div className="h-5 w-32 bg-gray-700 mb-4 flex items-center px-2">
          <span className="text-xs text-white">Current Mood</span>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-400 border-2 border-gray-500"></div>
          <div>
            <div className="h-6 w-24 bg-gray-700 mb-2 flex items-center px-2">
              <span className="text-xs text-gray-200">Calm</span>
            </div>
            <div className="h-4 w-32 bg-gray-300 flex items-center px-2">
              <span className="text-xs text-gray-500">Stress level: 3</span>
            </div>
          </div>
        </div>
        <div className="h-4 w-full bg-gray-200 mb-2 flex items-center px-2">
          <span className="text-xs text-gray-500">Recommended music style</span>
        </div>
        <div className="h-4 w-3/4 bg-gray-200 flex items-center px-2">
          <span className="text-xs text-gray-500">Ambient and relaxing</span>
        </div>
      </div>

      {/* Featured Playlist */}
      <div className="mb-6">
        <div className="h-6 w-48 bg-gray-700 mb-4 flex items-center px-2">
          <span className="text-xs text-white">Featured Playlist</span>
        </div>
        <div className="bg-white border-2 border-gray-400 rounded-lg p-4 shadow-sm">
          <div className="w-full h-40 bg-gray-300 rounded mb-4 border-2 border-gray-400"></div>
          <div className="h-5 w-full bg-gray-700 mb-2 flex items-center px-2">
            <span className="text-xs text-gray-200">Calm Mind Playlist</span>
          </div>
          <div className="h-4 w-3/4 bg-gray-300 mb-3 flex items-center px-2">
            <span className="text-xs text-gray-500">24 songs · 1h 42min</span>
          </div>
          <button className="w-full h-10 bg-gray-700 border-2 border-gray-700 rounded flex items-center justify-center hover:bg-gray-800">
            <span className="text-sm text-gray-200">Play Playlist</span>
          </button>
        </div>
      </div>

      {/* Recommended Songs List */}
      <div className="mb-6">
        <div className="h-6 w-48 bg-gray-700 mb-4 flex items-center px-2">
          <span className="text-xs text-white">Recommended Songs</span>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border-2 border-gray-400 rounded-lg p-4 flex gap-4 items-center shadow-sm hover:bg-gray-50">
              <div className="w-14 h-14 bg-gray-300 rounded border border-gray-400"></div>
              <div className="flex-1">
                <div className="h-4 w-full bg-gray-700 mb-2 flex items-center px-2">
                  <span className="text-xs text-gray-200">Song Title {i}</span>
                </div>
                <div className="h-3 w-2/3 bg-gray-300 flex items-center px-1">
                  <span className="text-xs text-gray-500">Artist Name</span>
                </div>
              </div>
              <button className="w-10 h-10 border-2 border-gray-600 rounded-full flex items-center justify-center hover:bg-gray-100">
                <div className="w-0 h-0 border-l-8 border-l-gray-600 border-y-6 border-y-transparent ml-1"></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Categories */}
      <div>
        <div className="h-6 w-40 bg-gray-700 mb-4 flex items-center px-2">
          <span className="text-xs text-white">Browse by Mood</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {['Relaxing', 'Energizing', 'Focus', 'Sleep'].map((mood) => (
            <button key={mood} className="bg-white border-2 border-gray-400 rounded-lg p-4 text-center hover:bg-gray-50 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-gray-400 mx-auto mb-3 border-2 border-gray-500"></div>
              <div className="h-4 w-full bg-gray-700 mb-1 flex items-center justify-center">
                <span className="text-xs text-gray-200">{mood}</span>
              </div>
              <div className="h-3 w-3/4 bg-gray-300 mx-auto flex items-center justify-center">
                <span className="text-xs text-gray-500">12 songs</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
