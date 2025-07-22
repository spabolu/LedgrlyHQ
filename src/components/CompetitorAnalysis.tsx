import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, AlertTriangle, DollarSign } from "lucide-react";

export function CompetitorAnalysis() {
  const competitors = [
    {
      name: "Ledgrly",
      subtitle: "For Etsy Sellers",
      featured: true,
      cost: "$12",
      costNote: "per month",
      setupTime: "5 minutes",
      setupNote: "Connect & go",
      etsyIntegration: {
        icon: Check,
        color: "text-green-500",
        text: "Native Sync",
      },
      taxReports: {
        icon: Check,
        color: "text-green-500",
        text: "Schedule C ready",
      },
      support: {
        icon: Check,
        color: "text-green-500",
        text: "Priority Support",
      },
    },
    {
      name: "CPA Service",
      subtitle: "Human CPA",
      cost: "$350+",
      costNote: "Per tax season",
      setupTime: "2-3 weeks",
      setupNote: "Find & hire",
      etsyIntegration: {
        icon: X,
        color: "text-red-500",
        text: "Manual CSV files",
      },
      taxReports: {
        icon: Check,
        color: "text-green-500",
        text: "Schedule C ready",
      },
      support: {
        icon: DollarSign,
        color: "text-red-500",
        text: "$75-100/hour",
      },
    },
    {
      name: "QuickBooks",
      subtitle: "Simple Start",
      cost: "$38",
      costNote: "Plus setup costs",
      setupTime: "4-8 hours",
      setupNote: "Configure system",
      etsyIntegration: {
        icon: AlertTriangle,
        color: "text-orange-500",
        text: "Addt'l $20/month",
      },
      taxReports: {
        icon: AlertTriangle,
        color: "text-orange-500",
        text: "Needs configuration",
      },
      support: { icon: Check, color: "text-green-500", text: "General help" },
    },
    {
      name: "Spreadsheets",
      subtitle: "DIY Solution",
      cost: "Free*",
      costNote: "*Hidden time costs",
      setupTime: "8+ hours",
      setupNote: "Build formulas",
      etsyIntegration: { icon: X, color: "text-red-500", text: "Manual entry" },
      taxReports: {
        icon: X,
        color: "text-red-500",
        text: "Manual calculations",
      },
      support: { icon: X, color: "text-red-500", text: "You're alone" },
    },
  ];

  return (
    <section className="px-4 py-14 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 mb-4">
            Why Choose Ledgrly?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stop Overpaying for Bookkeeping
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how Ledgrly compares to expensive alternatives for Etsy sellers.
          </p>
        </div>

        {/* Mobile-First Responsive Comparison */}

        {/* Desktop Table View (hidden on mobile) */}
        <div className="hidden lg:block overflow-x-auto mb-6 pt-3">
          <div className="min-w-full bg-white rounded-xl shadow-lg border border-gray-100">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-4 text-left font-semibold text-gray-900 bg-gray-50 rounded-tl-xl">
                    Compare
                  </th>
                  {competitors.map((comp, index) => (
                    <th
                      key={comp.name}
                      className={`p-4 text-center ${
                        comp.featured
                          ? "bg-gradient-to-br from-blue-50 to-indigo-50 relative"
                          : "bg-gray-50"
                      } ${
                        index === competitors.length - 1 ? "rounded-tr-xl" : ""
                      }`}
                    >
                      {comp.featured && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                          BEST VALUE
                        </div>
                      )}
                      <div
                        className={`font-bold ${
                          comp.featured ? "text-blue-600 mt-2" : "text-gray-900"
                        }`}
                      >
                        {comp.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {comp.subtitle}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900 bg-white">
                    <DollarSign className="w-5 h-5 inline mr-2 text-gray-600" />
                    Cost
                  </td>
                  {competitors.map((comp) => (
                    <td
                      key={comp.name}
                      className={`p-4 text-center ${
                        comp.featured
                          ? "bg-gradient-to-br from-blue-50 to-indigo-50"
                          : ""
                      }`}
                    >
                      <div
                        className={`text-2xl font-bold ${
                          comp.name === "Ledgrly"
                            ? "text-green-600"
                            : comp.name === "CPA Service"
                            ? "text-red-600"
                            : comp.name === "QuickBooks"
                            ? "text-orange-600"
                            : "text-gray-600"
                        }`}
                      >
                        {comp.cost}
                      </div>
                      <div className="text-sm text-gray-600">
                        {comp.costNote}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900 bg-white">
                    <Clock className="w-5 h-5 inline mr-2 text-gray-600" />
                    Setup Time
                  </td>
                  {competitors.map((comp) => (
                    <td
                      key={comp.name}
                      className={`p-4 text-center ${
                        comp.featured
                          ? "bg-gradient-to-br from-blue-50 to-indigo-50"
                          : ""
                      }`}
                    >
                      <div
                        className={`text-lg font-bold ${
                          comp.name === "Ledgrly"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {comp.setupTime}
                      </div>
                      <div className="text-sm text-gray-600">
                        {comp.setupNote}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900 bg-white">
                    Etsy Integration
                  </td>
                  {competitors.map((comp) => (
                    <td
                      key={comp.name}
                      className={`p-4 text-center ${
                        comp.featured
                          ? "bg-gradient-to-br from-blue-50 to-indigo-50"
                          : ""
                      }`}
                    >
                      <comp.etsyIntegration.icon
                        className={`w-6 h-6 ${comp.etsyIntegration.color} mx-auto mb-1`}
                      />
                      <div className="text-sm text-gray-600">
                        {comp.etsyIntegration.text}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900 bg-white">
                    Tax-Ready Reports
                  </td>
                  {competitors.map((comp) => (
                    <td
                      key={comp.name}
                      className={`p-4 text-center ${
                        comp.featured
                          ? "bg-gradient-to-br from-blue-50 to-indigo-50"
                          : ""
                      }`}
                    >
                      <comp.taxReports.icon
                        className={`w-6 h-6 ${comp.taxReports.color} mx-auto mb-1`}
                      />
                      <div className="text-sm text-gray-600">
                        {comp.taxReports.text}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900 bg-white rounded-bl-xl">
                    Support
                  </td>
                  {competitors.map((comp, index) => (
                    <td
                      key={comp.name}
                      className={`p-4 text-center ${
                        comp.featured
                          ? "bg-gradient-to-br from-blue-50 to-indigo-50"
                          : ""
                      } ${
                        index === competitors.length - 1 ? "rounded-br-xl" : ""
                      }`}
                    >
                      <comp.support.icon
                        className={`w-6 h-6 ${comp.support.color} mx-auto mb-1`}
                      />
                      <div className="text-sm text-gray-600">
                        {comp.support.text}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View (visible on mobile/tablet) */}
        <div className="lg:hidden mb-6">
          <div className="grid gap-4">
            {competitors.map((comp) => (
              <Card
                key={comp.name}
                className={`${
                  comp.featured
                    ? "border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white relative"
                    : "border border-gray-200"
                }`}
              >
                {comp.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                    BEST VALUE
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3
                      className={`text-xl font-bold ${
                        comp.featured ? "text-blue-600" : "text-gray-900"
                      } mb-1`}
                    >
                      {comp.name}
                    </h3>
                    <p className="text-sm text-gray-600">{comp.subtitle}</p>
                  </div>

                  <div className="space-y-4">
                    {/* Cost */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="font-medium text-gray-900">Cost</span>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-xl font-bold ${
                            comp.name === "Ledgrly"
                              ? "text-green-600"
                              : comp.name === "CPA Service"
                              ? "text-red-600"
                              : comp.name === "QuickBooks"
                              ? "text-orange-600"
                              : "text-gray-600"
                          }`}
                        >
                          {comp.cost}
                        </div>
                        <div className="text-sm text-gray-600">
                          {comp.costNote}
                        </div>
                      </div>
                    </div>

                    {/* Setup Time */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="font-medium text-gray-900">Setup</span>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${
                            comp.name === "Ledgrly"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {comp.setupTime}
                        </div>
                        <div className="text-sm text-gray-600">
                          {comp.setupNote}
                        </div>
                      </div>
                    </div>

                    {/* Etsy Integration */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-900">
                        Etsy Integration
                      </span>
                      <div className="flex items-center">
                        <comp.etsyIntegration.icon
                          className={`w-5 h-5 ${comp.etsyIntegration.color} mr-2`}
                        />
                        <span className="text-sm text-gray-600">
                          {comp.etsyIntegration.text}
                        </span>
                      </div>
                    </div>

                    {/* Tax Reports */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-900">
                        Tax Reports
                      </span>
                      <div className="flex items-center">
                        <comp.taxReports.icon
                          className={`w-5 h-5 ${comp.taxReports.color} mr-2`}
                        />
                        <span className="text-sm text-gray-600">
                          {comp.taxReports.text}
                        </span>
                      </div>
                    </div>

                    {/* Support */}
                    <div className="flex items-center justify-between py-3">
                      <span className="font-medium text-gray-900">Support</span>
                      <div className="flex items-center">
                        <comp.support.icon
                          className={`w-5 h-5 ${comp.support.color} mr-2`}
                        />
                        <span className="text-sm text-gray-600">
                          {comp.support.text}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                10+ Hours
              </div>
              <p className="text-green-700 font-medium text-sm">
                Saved every month
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                $1,000s
              </div>
              <p className="text-blue-700 font-medium text-sm">
                Saved annually
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                5 Min
              </div>
              <p className="text-purple-700 font-medium text-sm">Setup time</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
