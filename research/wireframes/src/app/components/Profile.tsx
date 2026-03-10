export function Profile() {
  return (
    <div className="px-6 py-8 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="h-8 w-32 bg-gray-400 mb-2 flex items-center px-3">
          <span className="text-xs text-gray-600">Profile</span>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white border-2 border-gray-400 rounded-lg p-6 mb-6 text-center shadow-sm">
        <div className="w-24 h-24 rounded-full bg-gray-400 mx-auto mb-4 border-4 border-gray-500"></div>
        <div className="h-6 w-40 bg-gray-700 mx-auto mb-2 flex items-center justify-center">
          <span className="text-xs text-gray-200">User Name</span>
        </div>
        <div className="h-4 w-48 bg-gray-300 mx-auto mb-4 flex items-center justify-center">
          <span className="text-xs text-gray-500">user@email.com</span>
        </div>
        <button className="h-10 w-32 border-2 border-gray-600 rounded mx-auto hover:bg-gray-50 flex items-center justify-center">
          <span className="text-xs text-gray-600">Edit Profile</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { value: '45', label: 'Check-ins' },
          { value: '12', label: 'Posts' },
          { value: '28', label: 'Followers' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border-2 border-gray-400 rounded-lg p-4 text-center shadow-sm">
            <div className="h-8 w-12 bg-gray-700 mx-auto mb-2 flex items-center justify-center">
              <span className="text-lg font-mono text-gray-200">{stat.value}</span>
            </div>
            <div className="h-3 w-full bg-gray-300 flex items-center justify-center">
              <span className="text-xs text-gray-600">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Overview Chart */}
      <div className="bg-white border-2 border-gray-400 rounded-lg p-6 mb-6 shadow-sm">
        <div className="h-6 w-40 bg-gray-700 mb-4 flex items-center px-2">
          <span className="text-xs text-white">Weekly Overview</span>
        </div>
        <div className="h-48 border-2 border-gray-300 rounded bg-gray-50 flex items-end justify-around p-4 gap-2">
          {[
            { day: 'M', height: 40 },
            { day: 'T', height: 65 },
            { day: 'W', height: 35 },
            { day: 'T', height: 75 },
            { day: 'F', height: 50 },
            { day: 'S', height: 60 },
            { day: 'S', height: 45 },
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              <div
                className="w-full bg-gray-400 rounded-t border-2 border-gray-500"
                style={{ height: `${bar.height}%` }}
              ></div>
              <div className="h-4 w-6 bg-gray-300 flex items-center justify-center">
                <span className="text-xs text-gray-600">{bar.day}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-3">
          <div className="h-3 w-20 bg-gray-300 flex items-center px-1">
            <span className="text-xs text-gray-500">Low stress</span>
          </div>
          <div className="h-3 w-20 bg-gray-300 flex items-center px-1">
            <span className="text-xs text-gray-500">High stress</span>
          </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="bg-white border-2 border-gray-400 rounded-lg overflow-hidden shadow-sm mb-6">
        {[
          { icon: '🔔', label: 'Notifications', hasToggle: true },
          { icon: '🔒', label: 'Privacy & Security' },
          { icon: '🎵', label: 'Music Preferences' },
          { icon: '💾', label: 'Data & Storage' },
          { icon: '❓', label: 'Help & Support' },
          { icon: 'ℹ️', label: 'About' },
        ].map((item, i) => (
          <div
            key={item.label}
            className={`p-4 flex items-center justify-between hover:bg-gray-50 ${
              i !== 5 ? 'border-b-2 border-gray-300' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-gray-400 rounded bg-gray-100 flex items-center justify-center">
                <span className="text-sm">{item.icon}</span>
              </div>
              <div className="h-4 w-32 bg-gray-700 flex items-center px-2">
                <span className="text-xs text-gray-200">{item.label}</span>
              </div>
            </div>
            {item.hasToggle ? (
              <div className="w-12 h-6 border-2 border-gray-400 rounded-full bg-gray-200 relative">
                <div className="w-5 h-5 bg-white border border-gray-400 rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            ) : (
              <div className="text-gray-500">›</div>
            )}
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <button className="w-full h-12 bg-white border-2 border-gray-700 rounded hover:bg-gray-50 flex items-center justify-center">
        <span className="text-sm text-gray-700">Log Out</span>
      </button>
    </div>
  );
}
