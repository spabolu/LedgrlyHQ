import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, FileText, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="overflow-x-hidden min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="border-b border-blue-100 px-4 py-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="w-8 h-8 flex items-center justify-center">
              <Image src="/ledgrly.svg" alt="Ledgrly" width={64} height={64} />
            </span>
            <span className="text-xl font-bold text-gray-900">Ledgrly</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              How It Works
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* <Button variant="ghost" className="text-gray-600">
              Login
            </Button> */}
            <Button
              asChild
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
            >
              <Link href="#waitlist">Join Waitlist →</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 relative overflow-hidden">
        {/* Background Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full border-2 border-blue-200 text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 mb-1">
            Coming Soon!
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Finally,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              Bookkeeping
            </span>{" "}
            That Speaks Etsy.
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-1 max-w-3xl mx-auto leading-relaxed">
            Connect your shop, track your expenses, and get tax-ready in minutes
            — no manual spreadsheets or CSV imports required.
          </p>

          <p className="text-blue-600 font-semibold mb-8 text-lg">
            (Built for makers, creators, and craft sellers!)
          </p>

          <Button
            size="lg"
            className="hover:cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-lg mb-4 shadow-lg transform hover:scale-102 transition-all duration-200"
            asChild
          >
            <Link href="#waitlist">JOIN THE WAITLIST →</Link>
          </Button>

          {/* Prominent Disclaimer */}
          <div className="mb-8 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100 max-w-2xl mx-auto">
            <p className="text-sm text-gray-700 font-medium">
              The term &apos;Etsy&apos; is a trademark of Etsy, Inc. This
              application uses the Etsy API but is not endorsed or certified by
              Etsy, Inc.
            </p>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-2 mb-12">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-semibold">K</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-semibold">O</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-white flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-white flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-semibold">D</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 border-2 border-white flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-semibold">T</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-white flex items-center justify-center shadow-sm">
                <span className="text-white text-xs font-semibold">+8</span>
              </div>
            </div>
            <span className="text-gray-600 font-medium ml-1">
              Join +15 handmade sellers on the waitlist!
            </span>
          </div>

          {/* Dashboard Preview */}
          <div className="relative max-w-6xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-blue-100">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-500 ml-4">Dashboard</span>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <div className="text-sm text-gray-600 mb-1">
                      Gross Sales (MTD)
                    </div>
                    <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                      $4,247.50
                    </div>
                    <div className="text-xs text-green-600">↗ +12.5%</div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <div className="text-sm text-gray-600 mb-1">
                      Net Profit (MTD)
                    </div>
                    <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                      $2,355.20
                    </div>
                    <div className="text-xs text-green-600">↗ +8.3%</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="text-sm text-gray-600 mb-1">COGS (MTD)</div>
                    <div className="text-xl font-bold text-gray-900">
                      $1,234.80
                    </div>
                    <div className="text-xs text-blue-600">↗ +5.2%</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="text-sm text-gray-600 mb-1">
                      Total Fees (MTD)
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      $657.50
                    </div>
                    <div className="text-xs text-red-600">↗ +3.1%</div>
                  </div>
                </div>

                {/* Charts Row */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Sales & COGS Trend */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      6-Month Sales vs COGS
                    </h4>
                    <div className="h-32 flex items-end justify-between space-x-1">
                      {[
                        { sales: 60, cogs: 35, month: "Jul" },
                        { sales: 75, cogs: 40, month: "Aug" },
                        { sales: 85, cogs: 45, month: "Sep" },
                        { sales: 70, cogs: 38, month: "Oct" },
                        { sales: 90, cogs: 48, month: "Nov" },
                        { sales: 100, cogs: 52, month: "Dec" },
                      ].map((data, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center flex-1"
                        >
                          <div className="w-full flex flex-col items-end justify-end h-24 space-y-1">
                            <div
                              className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm"
                              style={{ height: `${(data.sales / 100) * 100}%` }}
                            ></div>
                            <div
                              className="w-full bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-sm"
                              style={{ height: `${(data.cogs / 100) * 100}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            {data.month}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-center space-x-4 mt-3 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded"></div>
                        <span className="text-gray-600">Sales</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-300 rounded"></div>
                        <span className="text-gray-600">COGS</span>
                      </div>
                    </div>
                  </div>

                  {/* Fee Breakdown */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Fee Breakdown (MTD)
                    </h4>
                    <div className="flex items-center justify-center mb-3">
                      <div className="relative w-24 h-24">
                        <svg
                          className="w-24 h-24 transform -rotate-90"
                          viewBox="0 0 36 36"
                        >
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="2"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeDasharray="60, 100"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="2"
                            strokeDasharray="25, 100"
                            strokeDashoffset="-60"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#8b5cf6"
                            strokeWidth="2"
                            strokeDasharray="15, 100"
                            strokeDashoffset="-85"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded"></div>
                          <span className="text-gray-600">Transaction</span>
                        </div>
                        <span className="font-semibold">$394.50</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-indigo-500 rounded"></div>
                          <span className="text-gray-600">Processing</span>
                        </div>
                        <span className="font-semibold">$164.25</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-purple-500 rounded"></div>
                          <span className="text-gray-600">Listing</span>
                        </div>
                        <span className="font-semibold">$98.75</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Products Table */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Top 5 Products by Profit
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-gray-600 border-b border-gray-200">
                          <th className="text-left py-2">Product</th>
                          <th className="text-right py-2">Units Sold</th>
                          <th className="text-right py-2">Profit/Unit</th>
                          <th className="text-right py-2">Total Profit</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-900">
                        <tr className="border-b border-gray-100">
                          <td className="py-2">Handmade Ceramic Mug</td>
                          <td className="text-right py-2">47</td>
                          <td className="text-right py-2 text-green-600">
                            $12.50
                          </td>
                          <td className="text-right py-2 font-semibold">
                            $587.50
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2">Knitted Wool Scarf</td>
                          <td className="text-right py-2">23</td>
                          <td className="text-right py-2 text-green-600">
                            $18.75
                          </td>
                          <td className="text-right py-2 font-semibold">
                            $431.25
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2">Custom Wood Sign</td>
                          <td className="text-right py-2">12</td>
                          <td className="text-right py-2 text-green-600">
                            $32.00
                          </td>
                          <td className="text-right py-2 font-semibold">
                            $384.00
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2">Silver Wire Earrings</td>
                          <td className="text-right py-2">89</td>
                          <td className="text-right py-2 text-green-600">
                            $4.25
                          </td>
                          <td className="text-right py-2 font-semibold">
                            $378.25
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2">Macrame Plant Hanger</td>
                          <td className="text-right py-2">31</td>
                          <td className="text-right py-2 text-green-600">
                            $8.90
                          </td>
                          <td className="text-right py-2 font-semibold">
                            $275.90
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Tax Ready Status */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-sm text-blue-600 font-medium">
                    ✓ Tax report ready for Q2 2025 • Schedule C compliant •
                    1-click export
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-16 relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 mb-4">
              Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Stay Tax-Ready
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Designed for handmade and craft sellers, including those on Etsy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Automatic Shop Import
                </h3>
                <p className="text-gray-600">
                  Connect your Etsy shop and automatically import all sales,
                  fees, and transaction data. No manual entry required.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Smart COGS Tracking
                </h3>
                <p className="text-gray-600">
                  Track materials, shipping, and production costs with ease.
                  Know your true profit margins on every item.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Tax-Ready Reports
                </h3>
                <p className="text-gray-600">
                  Generate professional reports for USA tax season in seconds.
                  Schedule C ready, no spreadsheets required.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 py-16 relative">
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 mb-4">
            How It Works
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            From Handmade Shop to Tax-Ready in Minutes
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Connect Your Shop
              </h3>
              <p className="text-gray-600">
                Securely connect your shop with one click. We&apos;ll import all
                your historical data.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Add Your Expenses
              </h3>
              <p className="text-gray-600">
                Snap photos of receipts or manually add expenses. We&apos;ll
                categorize everything automatically.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Get Tax Reports
              </h3>
              <p className="text-gray-600">
                Download professional reports ready for your accountant or tax
                software. Done!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className="px-4 py-16 relative" id="waitlist">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Simplify Your Bookkeeping?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join the waitlist and be the first to know when Ledgrly launches.
            Early access coming soon!
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            {/* <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-3 px-4 py-3 text-lg border-blue-200 focus:border-blue-400 focus:ring-blue-400 bg-white/60"
              required
            /> */}
            <Button
              asChild
              type="submit"
              className="flex-1 px-4 py-5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-lg font-semibold shadow-lg transform hover:scale-102 transition-all duration-200"
            >
              <Link
                href="https://forms.gle/oyB983VmKXCQFikV6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Express Interest
              </Link>
            </Button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-blue-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="w-8 h-8 flex items-center justify-center">
              <Image src="/ledgrly.svg" alt="Ledgrly" width={64} height={64} />
            </span>
            <span className="text-xl font-bold text-gray-900">Ledgrly</span>
          </div>

          <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
            <p>
              {/* <span>&copy; 2025 LedgrlyHQ.</span>{" "} */}
              <span>Made with ❤️ for sellers on Etsy.</span>
            </p>
            <p>
              Etsy is a trademark of Etsy, Inc. This product is unaffiliated and
              not endorsed by Etsy.
            </p>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-600">
            {/* <Link href="/privacy" className="hover:text-gray-900">
              Privacy Policy
            </Link> */}
            {/* <Link href="/terms" className="hover:text-gray-900">
              Terms of Service
            </Link> */}
            <Link
              href="mailto:pelagic-orzo.8c@icloud.com"
              className="hover:text-gray-900"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
