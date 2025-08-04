import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Package, FileText, Settings, Search, Plus, Eye } from "lucide-react"
import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

// ========= DATA FETCHING =========
async function getMe(accessToken: string) {
  const response = await fetch("https://api.etsy.com/v3/application/users/me", {
    headers: { "x-api-key": process.env.ETSY_API_KEY!, Authorization: `Bearer ${accessToken}` },
  })
  if (!response.ok) return null
  return response.json()
}

async function getActiveListingsWithStats(shopId: string, accessToken: string) {
  const listings = []
  let offset = 0
  const limit = 100
  let hasMore = true

  while (hasMore) {
    const response = await fetch(
      `https://api.etsy.com/v3/application/shops/${shopId}/listings/active?limit=${limit}&offset=${offset}&includes=Images`,
      { headers: { "x-api-key": process.env.ETSY_API_KEY!, Authorization: `Bearer ${accessToken}` } }
    )
    if (!response.ok) throw new Error("Failed to fetch listings")
    const data = await response.json()
    listings.push(...(data.results || []))
    if (data.results.length < limit) {
      hasMore = false
    } else {
      offset += limit
    }
  }

  const receipts = []
  let receiptsOffset = 0
  const receiptsLimit = 100
  let receiptsHasMore = true

  while (receiptsHasMore) {
    const receiptsResponse = await fetch(
      `https://api.etsy.com/v3/application/shops/${shopId}/receipts?limit=${receiptsLimit}&offset=${receiptsOffset}&was_paid=true`,
      { headers: { "x-api-key": process.env.ETSY_API_KEY!, Authorization: `Bearer ${accessToken}` } }
    )
    if (!receiptsResponse.ok) throw new Error("Failed to fetch receipts for stats")
    
    const receiptsData = await receiptsResponse.json()
    receipts.push(...(receiptsData.results || []))
    
    if (receiptsData.results.length < receiptsLimit) {
      receiptsHasMore = false
    } else {
      receiptsOffset += receiptsLimit
    }
  }

  const stats: { [key: string]: { unitsSold: number; revenue: number } } = {}

  receipts.forEach((r: any) => {
    r.transactions.forEach((t: any) => {
      if (!stats[t.listing_id]) {
        stats[t.listing_id] = { unitsSold: 0, revenue: 0 }
      }
      stats[t.listing_id].unitsSold += t.quantity
      stats[t.listing_id].revenue += t.price.amount / t.price.divisor
    })
  })

  return listings.map((l: any) => ({
    ...l,
    stats: stats[l.listing_id] || { unitsSold: 0, revenue: 0 },
  }))
}

// ========= DATA PROCESSING =========
function processProducts(listings: any[]) {
  return listings.map(l => {
    const revenue = l.stats.revenue
    const cogs = revenue * 0.45
    const profit = revenue - cogs - (revenue * 0.10)
    const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0
    
    return {
      id: l.listing_id,
      name: l.title,
      sku: l.sku?.[0] || 'N/A',
      unitsSold: l.stats.unitsSold,
      revenue,
      cogs,
      profit,
      profitMargin,
      status: l.state === 'active' ? 'Active' : 'Inactive',
    }
  }).sort((a, b) => b.profit - a.profit);
}

export default async function ProductsPage() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("etsy_access_token")?.value
  if (!accessToken) redirect("/onboarding")

  const me = await getMe(accessToken)
  if (!me) redirect("/api/auth/logout")

  const user = await prisma.user.findUnique({
    where: { etsyUserId: me.user_id.toString() },
    include: { shop: true },
  })
  if (!user || !user.shop) redirect("/api/auth/logout");
  
  const shop = user.shop;

  const listingsWithStats = await getActiveListingsWithStats(shop.etsyShopId, shop.accessToken)
  const products = processProducts(listingsWithStats)

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
                <span className="text-white text-sm font-semibold">{user.firstName?.[0] || 'S'}</span>
              </div>
              <span className="text-sm font-medium text-gray-700">{user.firstName || 'Sarah'}</span>
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

          <Card className="border border-blue-100 mb-6">
            <CardContent className="p-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>
            </CardContent>
          </Card>

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
                      <th className="text-right py-3 font-medium">Est. COGS</th>
                      <th className="text-right py-3 font-medium">Est. Profit</th>
                      <th className="text-center py-3 font-medium">Est. Margin</th>
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
                            className="bg-green-100 text-green-700"
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