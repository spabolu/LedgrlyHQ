import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Package, FileText, Settings, Search, Plus, Eye } from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
  const products = [
    {
      id: "PROD-001",
      name: "Handmade Ceramic Mug",
      sku: "MUG-BLUE-001",
      unitsSold: 47,
      revenue: 1174.53,
      cogs: 587.0,
      profit: 587.53,
      profitMargin: 50.0,
      avgPrice: 24.99,
      status: "Active",
    },
    {
      id: "PROD-002",
      name: "Knitted Wool Scarf",
      sku: "SCARF-RED-001",
      unitsSold: 23,
      revenue: 1035.0,
      cogs: 603.75,
      profit: 431.25,
      profitMargin: 41.7,
      avgPrice: 45.0,
      status: "Active",
    },
    {
      id: "PROD-003",
      name: "Custom Wood Sign",
      sku: "SIGN-CUSTOM-001",
      unitsSold: 12,
      revenue: 1079.88,
      cogs: 695.88,
      profit: 384.0,
      profitMargin: 35.6,
      avgPrice: 89.99,
      status: "Active",
    },
    {
      id: "PROD-004",
      name: "Silver Wire Earrings",
      sku: "EARR-SILVER-001",
      unitsSold: 89,
      revenue: 1646.5,
      cogs: 1268.25,
      profit: 378.25,
      profitMargin: 23.0,
      avgPrice: 18.5,
      status: "Active",
    },
    {
      id: "PROD-005",
      name: "Macrame Plant Hanger",
      sku: "HANG-PLANT-001",
      unitsSold: 31,
      revenue: 899.0,
      cogs: 623.1,
      profit: 275.9,
      profitMargin: 30.7,
      avgPrice: 29.0,
      status: "Low Stock",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Ledgrly</span>
            </Link>
          </div>
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
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-blue-100 min-h-screen">
          <nav className="p-6">
            <div className="space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
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
                className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium"
              >
                <Package className="w-5 h-5" />
                <span>Products</span>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <p className="text-gray-600 mt-1">Track performance and profitability by product</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>

          {/* Search */}
          <Card className="border border-blue-100 mb-6">
            <CardContent className="p-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card className="border border-blue-100">
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-600 border-b border-gray-200">
                      <th className="text-left py-3 font-medium">Product</th>
                      <th className="text-center py-3 font-medium">Units Sold</th>
                      <th className="text-right py-3 font-medium">Revenue</th>
                      <th className="text-right py-3 font-medium">COGS</th>
                      <th className="text-right py-3 font-medium">Profit</th>
                      <th className="text-center py-3 font-medium">Margin</th>
                      <th className="text-center py-3 font-medium">Status</th>
                      <th className="text-center py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-900">
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3">
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.sku}</div>
                          </div>
                        </td>
                        <td className="py-3 text-center font-medium">{product.unitsSold}</td>
                        <td className="py-3 text-right font-medium text-green-600">${product.revenue.toFixed(2)}</td>
                        <td className="py-3 text-right text-gray-600">${product.cogs.toFixed(2)}</td>
                        <td className="py-3 text-right font-bold text-green-600">${product.profit.toFixed(2)}</td>
                        <td className="py-3 text-center">
                          <Badge
                            variant="outline"
                            className={
                              product.profitMargin > 40
                                ? "text-green-700 border-green-200"
                                : product.profitMargin > 25
                                  ? "text-yellow-700 border-yellow-200"
                                  : "text-red-700 border-red-200"
                            }
                          >
                            {product.profitMargin.toFixed(1)}%
                          </Badge>
                        </td>
                        <td className="py-3 text-center">
                          <Badge
                            variant={product.status === "Active" ? "default" : "secondary"}
                            className={
                              product.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
                          >
                            {product.status}
                          </Badge>
                        </td>
                        <td className="py-3 text-center">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
} 