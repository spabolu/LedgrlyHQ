import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Package, FileText, Settings, Search, Download, Filter } from "lucide-react"
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

async function getShopReceipts(shopId: string, accessToken: string) {
  const receipts = []
  let offset = 0
  const limit = 100
  let hasMore = true
  while (hasMore) {
    const response = await fetch(
      `https://api.etsy.com/v3/application/shops/${shopId}/receipts?limit=${limit}&offset=${offset}&was_paid=true`,
      { headers: { "x-api-key": process.env.ETSY_API_KEY!, Authorization: `Bearer ${accessToken}` } }
    )
    if (!response.ok) throw new Error("Failed to fetch receipts")
    const data = await response.json()
    receipts.push(...(data.results || []))
    if (data.results.length < limit || receipts.length >= 1000) {
      hasMore = false
    } else {
      offset += limit
    }
  }
  return receipts
}

// ========= DATA PROCESSING =========
function processTransactions(receipts: any[]) {
  return receipts.flatMap(r => 
    r.transactions.map((t: any) => ({
      id: t.transaction_id,
      date: new Date(r.created_timestamp * 1000).toISOString(),
      type: "Sale",
      description: t.title,
      amount: t.price.amount / t.price.divisor,
      fees: (t.price.amount / t.price.divisor) * 0.10,
      net: (t.price.amount / t.price.divisor) * 0.90,
      status: r.status === 'completed' ? 'Completed' : 'Shipped',
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function TransactionsPage() {
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

  const receipts = await getShopReceipts(shop.etsyShopId, shop.accessToken)
  const transactions = processTransactions(receipts)

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
                className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium"
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
                <p className="text-gray-600 mt-1">All your sales and expenses in one place</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          <Card className="border border-blue-100 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search transactions..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-blue-100">
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-600 border-b border-gray-200">
                      <th className="text-left py-3 font-medium">Date</th>
                      <th className="text-left py-3 font-medium">Type</th>
                      <th className="text-left py-3 font-medium">Description</th>
                      <th className="text-right py-3 font-medium">Amount</th>
                      <th className="text-right py-3 font-medium">Fees</th>
                      <th className="text-right py-3 font-medium">Net</th>
                      <th className="text-center py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-900">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 text-sm">{new Date(transaction.date).toLocaleDateString()}</td>
                        <td className="py-3">
                          <Badge
                            variant={transaction.type === "Sale" ? "default" : "secondary"}
                            className="bg-green-100 text-green-700"
                          >
                            {transaction.type}
                          </Badge>
                        </td>
                        <td className="py-3 font-medium">{transaction.description}</td>
                        <td className="py-3 text-right font-medium text-green-600">
                          ${transaction.amount.toFixed(2)}
                        </td>
                        <td className="py-3 text-right text-gray-600">
                          ${transaction.fees.toFixed(2)}
                        </td>
                        <td className="py-3 text-right font-bold text-green-600">
                          ${transaction.net.toFixed(2)}
                        </td>
                        <td className="py-3 text-center">
                          <Badge variant="outline" className="text-xs">
                            {transaction.status}
                          </Badge>
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