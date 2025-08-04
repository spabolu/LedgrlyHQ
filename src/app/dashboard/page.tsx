import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Package, FileText, Settings, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

// ========= DATA FETCHING =========
async function getMe(accessToken: string) {
  const response = await fetch("https://api.etsy.com/v3/application/users/me", {
    headers: {
      "x-api-key": process.env.ETSY_API_KEY!,
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    if (response.status === 401) return null
    throw new Error("Failed to fetch user profile")
  }
  return response.json()
}

async function getShopReceipts(
  shopId: string,
  accessToken: string,
  minCreated: number
) {
  const receipts = []
  let offset = 0
  const limit = 100
  let hasMore = true

  while (hasMore) {
    const response = await fetch(
      `https://api.etsy.com/v3/application/shops/${shopId}/receipts?limit=${limit}&offset=${offset}&min_created=${minCreated}&was_paid=true`,
      {
        headers: {
          "x-api-key": process.env.ETSY_API_KEY!,
          Authorization: `Bearer ${accessToken}`,
        },
        next: { revalidate: 600 },
      }
    )

    if (!response.ok) throw new Error("Failed to fetch receipts")

    const data = await response.json()
    receipts.push(...(data.results || []))

    if (data.results.length < limit || receipts.length >= 500) {
      hasMore = false
    } else {
      offset += limit
    }
  }
  return receipts
}

// ========= DATA PROCESSING =========
function processDashboardData(receipts: { created_timestamp: number; grandtotal: { amount: number; divisor: number }; transactions: { listing_id: string | number; title: string; quantity: number; price: { amount: number; divisor: number } }[] }[]) {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const mtdReceipts = receipts.filter(r => {
    const d = new Date(r.created_timestamp * 1000)
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear
  })

  const grossSalesMTD = mtdReceipts.reduce((sum, r) => sum + r.grandtotal.amount / r.grandtotal.divisor, 0)
  const estimatedFeesMTD = grossSalesMTD * 0.10
  const netProfitMTD = grossSalesMTD - estimatedFeesMTD

  const sixMonthsAgo = new Date(now)
  sixMonthsAgo.setMonth(now.getMonth() - 5)
  sixMonthsAgo.setDate(1)
  
  const monthlySales: { [key: string]: number } = {}
  const monthLabels: string[] = []

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now)
    d.setMonth(now.getMonth() - i)
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    monthlySales[monthKey] = 0
    monthLabels.push(d.toLocaleString('default', { month: 'short' }))
  }

  receipts.forEach(r => {
    const d = new Date(r.created_timestamp * 1000)
    if (d >= sixMonthsAgo) {
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      if (monthlySales.hasOwnProperty(monthKey)) {
        monthlySales[monthKey] += r.grandtotal.amount / r.grandtotal.divisor
      }
    }
  })

  const chartData = Object.values(monthlySales).map((sales, i) => ({
    month: monthLabels[i],
    sales,
    cogs: sales * 0.45,
  }))
  
  const maxChartValue = Math.max(...chartData.map(d => d.sales)) * 1.1

  const productPerformance: { [key: string]: { name: string, units: number, revenue: number } } = {}
  receipts.forEach(r => {
    r.transactions.forEach((t: { listing_id: string | number; title: string; quantity: number; price: { amount: number; divisor: number } }) => {
      const id = t.listing_id || t.title
      if (!productPerformance[id]) {
        productPerformance[id] = { name: t.title, units: 0, revenue: 0 }
      }
      productPerformance[id].units += t.quantity
      productPerformance[id].revenue += t.price.amount / t.price.divisor
    })
  })

  const topProducts = Object.values(productPerformance)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
    .map(p => {
      const estFees = p.revenue * 0.10
      const estProfit = p.revenue - estFees
      return {
        ...p,
        profit: estProfit,
        profitPerUnit: estProfit / p.units,
      }
    })

  return { grossSalesMTD, netProfitMTD, chartData, maxChartValue, topProducts }
}


export default async function Dashboard() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("etsy_access_token")?.value

  if (!accessToken) {
    redirect("/onboarding")
  }

  const me = await getMe(accessToken)
  if (!me) {
    redirect("/api/auth/logout")
  }

  const user = await prisma.user.findUnique({
    where: { etsyUserId: me.user_id.toString() },
    include: { shop: true },
  })

  if (!user || !user.shop) {
    redirect("/api/auth/logout");
  }

  const shop = user.shop;

  const sixMonthsAgoTimestamp = Math.floor(
    new Date(new Date().setMonth(new Date().getMonth() - 6)).getTime() / 1000
  )
  const receipts = await getShopReceipts(shop.etsyShopId, shop.accessToken, sixMonthsAgoTimestamp)

  const { grossSalesMTD, netProfitMTD, chartData, maxChartValue, topProducts } =
    processDashboardData(receipts)

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

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back, {user.firstName}! Here&apos;s how {shop.shopName} is performing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border border-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Gross Sales (MTD)</p>
                    <p className="text-2xl font-bold text-gray-900">${grossSalesMTD.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <p className="text-xs text-gray-500">Based on {receipts.length > 0 ? 'live' : 'no'} data</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Est. Net Profit (MTD)</p>
                    <p className="text-2xl font-bold text-gray-900">${netProfitMTD.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <p className="text-xs text-gray-500">Pre-COGS. Add product costs for accuracy.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border border-blue-100 mb-8">
            <CardHeader>
              <CardTitle>6-Month Sales vs COGS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {chartData.map((data, i) => (
                  <div key={i} className="flex flex-col items-center flex-1">
                    <div className="w-full flex flex-col items-end justify-end h-48 space-y-1">
                      <div
                        className="w-full bg-blue-500 rounded-t-sm"
                        style={{ height: `${(data.sales / maxChartValue) * 100}%` }}
                      ></div>
                      <div
                        className="w-full bg-gray-400 rounded-t-sm"
                        style={{ height: `${(data.cogs / maxChartValue) * 100}%` }}
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
                  <span className="text-gray-600">Est. COGS (45%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-blue-100">
            <CardHeader>
              <CardTitle>Top 5 Products by Est. Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-600 border-b border-gray-200">
                      <th className="text-left py-3 font-medium">Product</th>
                      <th className="text-right py-3 font-medium">Units Sold</th>
                      <th className="text-right py-3 font-medium">Est. Profit/Unit</th>
                      <th className="text-right py-3 font-medium">Total Est. Profit</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-900">
                    {topProducts.map((product, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-3 font-medium">{product.name}</td>
                        <td className="text-right py-3">{product.units}</td>
                        <td className="text-right py-3 text-green-600 font-medium">${product.profitPerUnit.toFixed(2)}</td>
                        <td className="text-right py-3 font-bold">${product.profit.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

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
