import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  CheckCircle, 
  ArrowRight, 
  Store, 
  DollarSign, 
  FileText, 
  Users, 
  TrendingUp,
  Shield
} from 'lucide-react';

async function getMe(accessToken: string) {
  const response = await fetch('https://api.etsy.com/v3/application/users/me', {
    headers: {
      'x-api-key': process.env.ETSY_API_KEY!,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      return null;
    }
    throw new Error('Failed to fetch user');
  }

  return response.json();
}

async function getShop(userId: number, accessToken: string) {
  const response = await fetch(
    `https://api.etsy.com/v3/application/users/${userId}/shops`,
    {
      headers: {
        'x-api-key': process.env.ETSY_API_KEY!,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      return null;
    }
    throw new Error('Failed to fetch shop');
  }

  const data = await response.json();
  if (data && data.results && data.results.length > 0) {
    return data.results[0];
  } else if (data && data.shop_id) {
    return data;
  }
  return null;
}

export default async function OnboardingPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('etsy_access_token')?.value;
  
  // Check if user is already authenticated
  let shop = null;
  if (accessToken) {
    try {
      const me = await getMe(accessToken);
      if (me) {
        shop = await getShop(me.user_id, accessToken);
        // If user already has a shop connected, redirect to dashboard
        if (shop) {
          redirect('/dashboard');
        }
      }
    } catch (error) {
      // If there's an error, continue with onboarding
      console.error('Error checking auth status:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b border-blue-100 px-4 py-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Ledgrly</span>
          </div>
          <div className="text-sm text-gray-500">
            Step 1 of 3: Connect Your Shop
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                1
              </div>
              <span className="ml-3 text-sm font-medium text-blue-600">Connect Shop</span>
            </div>
            <div className="w-16 h-1 bg-gray-200 rounded"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-semibold">
                2
              </div>
              <span className="ml-3 text-sm font-medium text-gray-400">Add Costs</span>
            </div>
            <div className="w-16 h-1 bg-gray-200 rounded"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-semibold">
                3
              </div>
              <span className="ml-3 text-sm font-medium text-gray-400">Complete Setup</span>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Store className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Ledgrly!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let's get your Etsy bookkeeping set up in just 3 simple steps. 
            We'll connect your shop, add your product costs, and get you tax-ready.
          </p>
        </div>

        {/* Step 1: Connect Shop */}
        <Card className="mb-8 border-0 shadow-lg bg-white/60 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Connect Your Etsy Shop</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Securely connect your Etsy shop to start importing your sales data
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Secure OAuth connection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Automatic data sync</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Trusted by 1000+ sellers</span>
                </div>
              </div>
            </div>
            
            <Link href="/api/auth/etsy/connect">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold">
                <Store className="w-5 h-5 mr-2" />
                Connect to Etsy
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <p className="text-sm text-gray-500 mt-4">
              We'll redirect you to Etsy to authorize the connection. Your credentials are never stored.
            </p>
          </CardContent>
        </Card>

        {/* Preview of Next Steps */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm bg-white/40">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Step 2: Add Product Costs</CardTitle>
                  <CardDescription>Set up accurate COGS tracking</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Add material, labor, and other costs for each product to calculate accurate profit margins and prepare for tax filing.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/40">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Step 3: Complete Setup</CardTitle>
                  <CardDescription>Review and finalize your account</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Review your tax settings, generate your first report, and learn about Ledgrly's powerful features.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Questions? Contact us at{' '}
            <a href="mailto:support@ledgrly.com" className="text-blue-600 hover:underline">
              support@ledgrly.com
            </a>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Etsy is a trademark of Etsy, Inc. This application uses the Etsy API but is not endorsed by Etsy, Inc.
          </p>
        </div>
      </main>
    </div>
  );
} 