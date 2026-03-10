export function Home() {
  return (
    <div className="px-6 py-8 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="h-8 w-32 bg-gray-300 mb-2"></div>
        <div className="h-6 w-48 bg-gray-200"></div>
      </div>

      {/* Daily Check-in Card */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
        <div className="h-6 w-40 bg-gray-800 mb-4"></div>
        <div className="h-4 w-full bg-gray-200 mb-2"></div>
        <div className="h-4 w-3/4 bg-gray-200 mb-6"></div>

        {/* Stress Level */}
        <div className="mb-6">
          <div className="h-5 w-32 bg-gray-800 mb-3"></div>
          <div className="flex gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="flex-1 h-10 border-2 border-gray-300 rounded flex items-center justify-center text-gray-600"
              >
                {num}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <div className="h-3 w-16 bg-gray-300"></div>
            <div className="h-3 w-16 bg-gray-300"></div>
          </div>
        </div>

        {/* Mood Selection */}
        <div className="mb-6">
          <div className="h-5 w-32 bg-gray-800 mb-3"></div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="border-2 border-gray-300 rounded-lg p-3 flex flex-col items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <div className="h-3 w-16 bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button className="w-full h-12 bg-gray-800 text-white border-2 border-gray-800 rounded">
          <div className="h-4 w-20 bg-gray-300 mx-auto"></div>
        </button>
      </div>

      {/* Today's Insights Card */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
        <div className="h-6 w-40 bg-gray-800 mb-4"></div>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 border-2 border-gray-300 rounded mt-1"></div>
            <div className="flex-1">
              <div className="h-4 w-full bg-gray-200 mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-200"></div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 border-2 border-gray-300 rounded mt-1"></div>
            <div className="flex-1">
              <div className="h-4 w-full bg-gray-200 mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
          <div className="h-8 w-12 bg-gray-800 mb-2"></div>
          <div className="h-4 w-24 bg-gray-200"></div>
        </div>
        <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
          <div className="h-8 w-12 bg-gray-800 mb-2"></div>
          <div className="h-4 w-24 bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
