import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Package, FileText, Settings, Search, Download, Filter } from "lucide-react"
import Link from "next/link"

export default function TransactionsPage() {
  const transactions = [
    {
      id: "TXN-001",
      date: "2024-01-15",
      type: "Sale",
      description: "Handmade Ceramic Mug - Blue",
      amount: 24.99,
      fees: 2.5,
      net: 22.49,
      status: "Completed",
    },
    {
      id: "TXN-002",
      date: "2024-01-14",
      type: "Sale",
      description: "Knitted Wool Scarf - Red",
      amount: 45.0,
      fees: 4.5,
      net: 40.5,
      status: "Completed",
    },
    {
      id: "TXN-003",
      date: "2024-01-14",
      type: "Expense",
      description: "Ceramic Clay - 5lb bag",
      amount: -15.99,
      fees: 0,
      net: -15.99,
      status: "Recorded",
    },
    {
      id: "TXN-004",
      date: "2024-01-13",
      type: "Sale",
      description: "Custom Wood Sign - Family Name",
      amount: 89.99,
      fees: 8.99,
      net: 81.0,
      status: "Completed",
    },
    {
      id: "TXN-005",
      date: "2024-01-12",
      type: "Sale",
      description: "Silver Wire Earrings - Set of 3",
      amount: 18.5,
      fees: 1.85,
      net: 16.65,
      status: "Completed",
    },
    {
      id: "TXN-006",
      date: "2024-01-11",
      type: "Expense",
      description: "Shipping Supplies - Bubble Mailers",
      amount: -24.99,
      fees: 0,
      net: -24.99,
      status: "Recorded",
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
          {/* Page Header */}
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

          {/* Filters */}
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

          {/* Transactions Table */}
          <Card className="border border-blue-100">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
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
                            className={
                              transaction.type === "Sale" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }
                          >
                            {transaction.type}
                          </Badge>
                        </td>
                        <td className="py-3 font-medium">{transaction.description}</td>
                        <td className="py-3 text-right font-medium">
                          <span className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                            ${Math.abs(transaction.amount).toFixed(2)}
                          </span>
                        </td>
                        <td className="py-3 text-right text-gray-600">
                          {transaction.fees > 0 ? `$${transaction.fees.toFixed(2)}` : "-"}
                        </td>
                        <td className="py-3 text-right font-bold">
                          <span className={transaction.net > 0 ? "text-green-600" : "text-red-600"}>
                            ${Math.abs(transaction.net).toFixed(2)}
                          </span>
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