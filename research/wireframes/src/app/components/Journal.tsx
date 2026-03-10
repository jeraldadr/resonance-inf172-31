export function Journal() {
  return (
    <div className="px-6 py-8 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <div className="h-8 w-32 bg-gray-300 mb-2"></div>
          <div className="h-6 w-48 bg-gray-200"></div>
        </div>
        <button className="w-12 h-12 border-2 border-gray-800 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-gray-800"></div>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {['All', 'This Week', 'This Month', 'Favorites'].map((tab) => (
          <button
            key={tab}
            className="px-4 py-2 border-2 border-gray-300 rounded-full whitespace-nowrap"
          >
            <div className="h-4 w-16 bg-gray-200"></div>
          </button>
        ))}
      </div>

      {/* Journal Entries */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white border-2 border-gray-300 rounded-lg p-5">
            {/* Entry Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="h-5 w-32 bg-gray-800 mb-2"></div>
                <div className="h-3 w-24 bg-gray-200"></div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              </div>
            </div>

            {/* Entry Content */}
            <div className="mb-3">
              <div className="h-4 w-full bg-gray-200 mb-2"></div>
              <div className="h-4 w-full bg-gray-200 mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200"></div>
            </div>

            {/* Entry Footer */}
            <div className="flex items-center gap-3 pt-3 border-t-2 border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                <div className="h-3 w-12 bg-gray-300"></div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3].map((tag) => (
                  <div key={tag} className="h-6 w-16 bg-gray-200 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-gray-800 border-2 border-gray-800 rounded-full shadow-lg flex items-center justify-center">
        <div className="w-6 h-6 bg-white"></div>
      </button>
    </div>
  );
}
