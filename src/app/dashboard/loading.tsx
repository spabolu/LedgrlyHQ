export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Ledgrly</h1>
              </div>
              <div className="hidden md:block">
                <div className="text-sm text-gray-500">
                  <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-28 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white border-0 shadow-sm rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="w-24 h-8 bg-gray-300 rounded animate-pulse mb-2"></div>
                  <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-2 space-y-8">
            {/* Recent Transactions Loading */}
            <div className="bg-white border-0 shadow-sm rounded-lg">
              <div className="border-b border-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="w-40 h-6 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="p-0">
                <div className="overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {['Date', 'Transaction', 'Category', 'Amount'].map((header, i) => (
                          <th key={i} className="px-6 py-4 text-left">
                            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...Array(5)].map((_, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4">
                            <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                            <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mb-1 ml-auto"></div>
                            <div className="w-10 h-3 bg-gray-200 rounded animate-pulse ml-auto"></div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Expense Breakdown Loading */}
            <div className="bg-white border-0 shadow-sm rounded-lg">
              <div className="border-b border-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="w-36 h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="text-right">
                        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                        <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Loading */}
          <div className="space-y-8">
            {/* Tax Preparation Loading */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-sm rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-orange-300 rounded-full animate-pulse"></div>
                <div>
                  <div className="w-24 h-5 bg-orange-300 rounded animate-pulse mb-1"></div>
                  <div className="w-16 h-4 bg-orange-300 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="w-40 h-4 bg-orange-300 rounded animate-pulse mb-1"></div>
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div className="bg-orange-400 h-2 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="w-full h-4 bg-orange-300 rounded animate-pulse"></div>
                <div className="w-full h-10 bg-orange-400 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Monthly Report Loading */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-sm rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-300 rounded-full animate-pulse"></div>
                <div>
                  <div className="w-28 h-5 bg-blue-300 rounded animate-pulse mb-1"></div>
                  <div className="w-20 h-4 bg-blue-300 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="w-full h-4 bg-blue-300 rounded animate-pulse"></div>
                <div className="w-full h-10 bg-blue-400 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Integration Status Loading */}
            <div className="bg-white border-0 shadow-sm rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div>
                  <div className="w-24 h-5 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="w-18 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-18 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-28 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-full h-8 bg-gray-200 rounded animate-pulse mt-4"></div>
              </div>
            </div>

            {/* Quick Actions Loading */}
            <div className="bg-white border-0 shadow-sm rounded-lg p-6">
              <div className="w-24 h-5 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-full h-8 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 