import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Package, FileText, Settings, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Ledgrly</span>
            </Link>
          </div>

          {/* User */}
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/settings">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">S</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Sarah</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Simplified */}
        <aside className="w-64 bg-white border-r border-blue-100 min-h-screen">
          <nav className="p-6">
            <div className="space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/dashboard/transactions"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                <FileText className="w-5 h-5" />
                <span>Transactions</span>
              </Link>
              <Link
                href="/dashboard/products"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                <Package className="w-5 h-5" />
                <span>Products</span>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content - Simplified */}
        <main className="flex-1 p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, Sarah! Here's how your shop is performing.</p>
          </div>

          {/* KPI Cards - Only the most important ones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border border-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Gross Sales (MTD)</p>
                    <p className="text-2xl font-bold text-gray-900">$4,247.50</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">+12.5%</span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Net Profit (MTD)</p>
                    <p className="text-2xl font-bold text-gray-900">$2,355.20</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">+8.3%</span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sales & COGS Chart - Essential for business understanding */}
          <Card className="border border-blue-100 mb-8">
            <CardHeader>
              <CardTitle>6-Month Sales vs COGS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {[
                  { sales: 60, cogs: 35, month: "Jul" },
                  { sales: 75, cogs: 40, month: "Aug" },
                  { sales: 85, cogs: 45, month: "Sep" },
                  { sales: 70, cogs: 38, month: "Oct" },
                  { sales: 90, cogs: 48, month: "Nov" },
                  { sales: 100, cogs: 52, month: "Dec" },
                ].map((data, i) => (
                  <div key={i} className="flex flex-col items-center flex-1">
                    <div className="w-full flex flex-col items-end justify-end h-48 space-y-1">
                      <div
                        className="w-full bg-blue-500 rounded-t-sm"
                        style={{ height: `${(data.sales / 100) * 100}%` }}
                      ></div>
                      <div
                        className="w-full bg-gray-400 rounded-t-sm"
                        style={{ height: `${(data.cogs / 100) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 font-medium">{data.month}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-gray-600">Sales</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                  <span className="text-gray-600">COGS</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Products - Essential business data */}
          <Card className="border border-blue-100">
            <CardHeader>
              <CardTitle>Top 5 Products by Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-600 border-b border-gray-200">
                      <th className="text-left py-3 font-medium">Product</th>
                      <th className="text-right py-3 font-medium">Units Sold</th>
                      <th className="text-right py-3 font-medium">Profit/Unit</th>
                      <th className="text-right py-3 font-medium">Total Profit</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-900">
                    {[
                      { name: "Handmade Ceramic Mug", units: 47, profitPerUnit: 12.5, totalProfit: 587.5 },
                      { name: "Knitted Wool Scarf", units: 23, profitPerUnit: 18.75, totalProfit: 431.25 },
                      { name: "Custom Wood Sign", units: 12, profitPerUnit: 32.0, totalProfit: 384.0 },
                      { name: "Silver Wire Earrings", units: 89, profitPerUnit: 4.25, totalProfit: 378.25 },
                      { name: "Macrame Plant Hanger", units: 31, profitPerUnit: 8.9, totalProfit: 275.9 },
                    ].map((product, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-3 font-medium">{product.name}</td>
                        <td className="text-right py-3">{product.units}</td>
                        <td className="text-right py-3 text-green-600 font-medium">${product.profitPerUnit}</td>
                        <td className="text-right py-3 font-bold">${product.totalProfit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Tax Ready Status - Core value proposition */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <span className="text-sm text-blue-600 font-medium">
              ✓ Tax report ready for Q4 2024 • Schedule C compliant • 1-click export
            </span>
          </div>
        </main>
      </div>
    </div>
  )
}
