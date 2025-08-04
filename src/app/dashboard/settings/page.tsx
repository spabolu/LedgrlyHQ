"use client" // Add this at the top

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { BarChart3, Package, FileText, Settings, Check, AlertCircle, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
import { syncEtsyData } from "./actions"

// Note: We are keeping the page as a server component and wrapping the interactive parts
// in a client component to use hooks. For simplicity in this step, we'll make the page a client component.

export default function SettingsPage() {
  const [me, setMe] = useState<any>(null)
  const [shop, setShop] = useState<any>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    // Fetch initial data on the client side
    async function fetchData() {
      const res = await fetch('/api/get-settings-data') // We will create this API route
      const data = await res.json()
      setMe(data.me)
      setShop(data.shop)
    }
    fetchData()
  }, [])

  const handleSync = () => {
    startTransition(() => {
      syncEtsyData()
    })
  }

  const handleManageSubscription = async () => {
    const response = await fetch('/api/stripe/create-portal-session', {
      method: 'POST',
    });
    const { url } = await response.json();
    window.location.href = url;
  };
  
  if (!me) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading settings...
      </div>
    )
  }

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
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">{me.first_name?.[0] || 'S'}</span>
              </div>
              <span className="text-sm font-medium text-gray-700">{me.first_name || 'Sarah'}</span>
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
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account and shop connections</p>
          </div>

          <div className="space-y-6">
            <Card className="border border-blue-100">
                <CardHeader>
                    <CardTitle>Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleManageSubscription}>Manage Subscription</Button>
                </CardContent>
            </Card>
            {shop && (
              <Card className="border border-blue-100">
                <CardHeader>
                  <CardTitle>Shop Connection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">E</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{shop.shop_name}</div>
                        <div className="text-sm text-gray-600">Connected to Etsy</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-700">
                        <Check className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                      <Button variant="outline" size="sm" asChild>
                        <a href={shop.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Shop
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={handleSync} disabled={isPending}>
                      {isPending ? "Syncing..." : "Sync Now"}
                    </Button>
                    <Link href="/api/auth/logout">
                      <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                        Disconnect
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border border-blue-100">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value={me.first_name || ''} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={me.last_name || ''} readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={me.primary_email || ''} readOnly />
                </div>
                <p className="text-xs text-gray-500">Profile information is synced from your Etsy account and cannot be edited here.</p>
              </CardContent>
            </Card>

            <Card className="border border-blue-100">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-gray-600">Receive updates about your sales and expenses</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-red-200">
              <CardHeader>
                <CardTitle className="text-red-700">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-red-700">Delete Account</div>
                      <div className="text-sm text-red-600">Permanently delete your account and all data</div>
                    </div>
                    <Link href="/api/auth/logout">
                      <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                        Delete Account
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 