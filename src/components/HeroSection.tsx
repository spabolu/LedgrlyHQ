import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="relative py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  Finally,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                    Bookkeeping
                  </span>{" "}
                  That Speaks Etsy.
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Connect your shop, track your expenses, and get tax-ready in
                  minutes — no manual spreadsheets or CSV imports required.
                </p>

                <p className="text-blue-600 font-semibold mb-8 text-lg">
                  (Built for small business owners!)
                </p>

                <div className="flex justify-center lg:justify-start">
                  <Button
                    size="default"
                    className="hover:cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-lg mb-4 shadow-lg transform hover:scale-102 transition-all duration-200"
                    asChild
                  >
                    <Link href="#waitlist">SEE DEMO</Link>
                  </Button>
                </div>

                {/* Social Proof */}
                <div className="flex flex-col items-center lg:items-start space-y-2 mt-2 mb-4">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white flex items-center justify-center shadow-sm">
                      <span className="text-white text-sm font-semibold">
                        K
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white flex items-center justify-center shadow-sm">
                      <span className="text-white text-sm font-semibold">
                        O
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-white flex items-center justify-center shadow-sm">
                      <span className="text-white text-sm font-semibold">
                        P
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-white flex items-center justify-center shadow-sm">
                      <span className="text-white text-sm font-semibold">
                        +3
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-600 font-medium">
                    Trusted by many Etsy sellers!
                  </span>
                </div>
                {/* Prominent Disclaimer */}
                <div className="p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100 max-w-2xl mx-auto lg:mx-0">
                  <p className="text-sm text-gray-700 font-medium text-center lg:text-left">
                    The term &apos;Etsy&apos; is a trademark of Etsy, Inc. This
                    application uses the Etsy API but is not endorsed or
                    certified by Etsy, Inc.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 relative lg:mt-0 lg:col-span-6">
              <div className="relative max-w-6xl mx-auto">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-blue-100">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-500 ml-4">
                        Dashboard
                      </span>
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
                        <div className="text-xs text-green-600">↗ +12.3%</div>
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
                        <div className="text-sm text-gray-600 mb-1">
                          COGS (MTD)
                        </div>
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
                                  style={{
                                    height: `${(data.sales / 100) * 100}%`,
                                  }}
                                ></div>
                                <div
                                  className="w-full bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-sm"
                                  style={{
                                    height: `${(data.cogs / 100) * 100}%`,
                                  }}
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
                                strokeWidth="3"
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
                              <td className="py-2">Rustic Wood Frame</td>
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
          </div>
        </div>
      </div>
    </section>
  );
} 