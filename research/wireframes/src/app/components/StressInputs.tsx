export function StressInputs() {
  return (
    <div className="px-6 py-8 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-gray-400 mb-2 flex items-center px-3">
          <span className="text-xs text-gray-600">Stress Check-In</span>
        </div>
        <div className="h-5 w-64 bg-gray-300 flex items-center px-2">
          <span className="text-xs text-gray-500">Track your daily stress</span>
        </div>
      </div>

      {/* Daily Check-in Card */}
      <div className="bg-white border-2 border-gray-400 rounded-lg p-6 mb-6 shadow-sm">
        <div className="h-6 w-40 bg-gray-700 mb-1 flex items-center px-2">
          <span className="text-xs text-gray-300">Daily Check-in</span>
        </div>
        <div className="h-4 w-full bg-gray-200 mb-1 flex items-center px-2">
          <span className="text-xs text-gray-400">How are you feeling today?</span>
        </div>
        <div className="h-4 w-3/4 bg-gray-200 mb-6 flex items-center px-2">
          <span className="text-xs text-gray-400">Rate your stress level</span>
        </div>

        {/* Stress Level Scale */}
        <div className="mb-6">
          <div className="h-5 w-32 bg-gray-700 mb-3 flex items-center px-2">
            <span className="text-xs text-white">Stress Level</span>
          </div>
          <div className="flex gap-3">
            {['Low', 'Medium', 'High'].map((level) => (
              <div
                key={level}
                className="flex-1 h-14 border-2 border-gray-400 rounded bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm text-gray-600">{level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Selection Grid */}
        <div className="mb-6">
          <div className="h-5 w-40 bg-gray-700 mb-3 flex items-center px-2">
            <span className="text-xs text-white">Current Mood</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {['Happy', 'Sad', 'Angry', 'Calm', 'Anxious', 'Tired'].map((mood) => (
              <div
                key={mood}
                className="border-2 border-gray-400 rounded-lg p-3 flex flex-col items-center gap-2 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gray-300 border border-gray-400"></div>
                <div className="h-3 w-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-500">{mood}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Activity */}
        <div className="mb-6">
          <div className="h-5 w-40 bg-gray-700 mb-3 flex items-center px-2">
            <span className="text-xs text-white">Current Activity</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['Studying', 'Exercising', 'Relaxing', 'Socializing', 'Creative Work'].map((activity) => (
              <div
                key={activity}
                className="border-2 border-gray-400 rounded-lg p-3 flex items-center gap-3 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded bg-gray-300 border border-gray-400"></div>
                <div className="h-3 flex-1 bg-gray-200 flex items-center px-2">
                  <span className="text-xs text-gray-500">{activity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes Textarea */}
        <div className="mb-6">
          <div className="h-5 w-24 bg-gray-700 mb-2 flex items-center px-2">
            <span className="text-xs text-white">Notes</span>
          </div>
          <div className="h-24 w-full border-2 border-gray-400 rounded bg-gray-50 p-2">
            <div className="h-3 w-3/4 bg-gray-200 mb-1"></div>
            <div className="h-3 w-full bg-gray-200 mb-1"></div>
            <div className="h-3 w-2/3 bg-gray-200"></div>
          </div>
        </div>

        {/* Submit Button */}
        <button className="w-full h-12 bg-gray-700 text-white border-2 border-gray-700 rounded hover:bg-gray-800 transition-colors flex items-center justify-center">
          <span className="text-sm text-gray-200">Submit Check-in</span>
        </button>
      </div>

      {/* Recent Check-ins Card */}
      <div className="bg-white border-2 border-gray-400 rounded-lg p-6 shadow-sm">
        <div className="h-6 w-40 bg-gray-700 mb-4 flex items-center px-2">
          <span className="text-xs text-white">Recent Check-ins</span>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 pb-3 border-b-2 border-gray-200 last:border-b-0 last:pb-0">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-4 w-16 bg-gray-700 flex items-center px-2">
                    <span className="text-xs text-gray-200">Today</span>
                  </div>
                  <div className="h-4 w-16 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">Medium</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-300 border border-gray-400"></div>
                  <div className="h-3 w-16 bg-gray-300 flex items-center px-1">
                    <span className="text-xs text-gray-500">Calm</span>
                  </div>
                  <div className="h-3 w-20 bg-gray-200 flex items-center px-1">
                    <span className="text-xs text-gray-400">Studying</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
