export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-blue-100 min-h-screen p-6">
          <div className="space-y-2">
            <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-full h-10 bg-gray-100 rounded animate-pulse"></div>
            <div className="w-full h-10 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <div className="w-48 h-8 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="w-64 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="p-6 bg-white rounded-lg border border-blue-100">
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="w-24 h-8 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="p-6 bg-white rounded-lg border border-blue-100 mb-8">
            <div className="w-40 h-6 bg-gray-300 rounded animate-pulse mb-4"></div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-1 h-full bg-gray-200 rounded-t-sm animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="p-6 bg-white rounded-lg border border-blue-100">
            <div className="w-48 h-6 bg-gray-300 rounded animate-pulse mb-4"></div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-8 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 