export function Community() {
  return (
    <div className="px-6 py-8 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <div className="h-8 w-40 bg-gray-400 mb-2 flex items-center px-3">
            <span className="text-xs text-gray-600">Community</span>
          </div>
          <div className="h-5 w-56 bg-gray-300 flex items-center px-2">
            <span className="text-xs text-gray-500">Share and connect</span>
          </div>
        </div>
        <button className="w-12 h-12 border-2 border-gray-700 rounded-lg flex items-center justify-center bg-white hover:bg-gray-50">
          <div className="text-2xl text-gray-700">+</div>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['All Posts', 'Following', 'Popular', 'My Posts'].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 border-2 rounded-full whitespace-nowrap ${
              i === 0
                ? 'border-gray-700 bg-gray-700'
                : 'border-gray-400 bg-white hover:bg-gray-50'
            }`}
          >
            <span className={`text-xs ${i === 0 ? 'text-white' : 'text-gray-600'}`}>
              {tab}
            </span>
          </button>
        ))}
      </div>

      {/* Community Posts */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border-2 border-gray-400 rounded-lg p-5 shadow-sm">
            {/* Post Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-gray-500"></div>
                <div>
                  <div className="h-4 w-28 bg-gray-700 mb-1 flex items-center px-2">
                    <span className="text-xs text-gray-200">Username</span>
                  </div>
                  <div className="h-3 w-20 bg-gray-300 flex items-center px-1">
                    <span className="text-xs text-gray-500">2h ago</span>
                  </div>
                </div>
              </div>
              <button className="w-6 h-6 flex items-center justify-center text-gray-500">
                ⋮
              </button>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <div className="h-4 w-full bg-gray-300 mb-2 flex items-center px-2">
                <span className="text-xs text-gray-600">Post content line 1</span>
              </div>
              <div className="h-4 w-full bg-gray-300 mb-2 flex items-center px-2">
                <span className="text-xs text-gray-600">Post content line 2</span>
              </div>
              <div className="h-4 w-3/4 bg-gray-300 flex items-center px-2">
                <span className="text-xs text-gray-600">Post content line 3</span>
              </div>
            </div>

            {/* Mood Tag */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-200 border border-gray-400 rounded-full">
                <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                <span className="text-xs text-gray-600">Feeling calm</span>
              </div>
            </div>

            {/* Post Footer */}
            <div className="flex items-center gap-4 pt-3 border-t-2 border-gray-300">
              <button className="flex items-center gap-2 hover:opacity-70">
                <div className="w-5 h-5 border-2 border-gray-500 rounded bg-gray-100"></div>
                <div className="h-3 w-8 bg-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-600">24</span>
                </div>
              </button>
              <button className="flex items-center gap-2 hover:opacity-70">
                <div className="w-5 h-5 border-2 border-gray-500 rounded-full bg-gray-100"></div>
                <div className="h-3 w-8 bg-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-600">12</span>
                </div>
              </button>
              <button className="flex items-center gap-2 ml-auto hover:opacity-70">
                <div className="w-5 h-5 border-2 border-gray-500 bg-gray-100"></div>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-gray-700 border-2 border-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
        <span className="text-2xl text-white">+</span>
      </button>
    </div>
  );
}
