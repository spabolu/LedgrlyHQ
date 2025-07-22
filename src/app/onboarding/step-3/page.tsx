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
  ArrowLeft,
  Star,
  FileText, 
  Building2,
  BarChart3,
  Download,
  Calendar,
  Zap,
  Target
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

export default async function OnboardingStep3Page() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('etsy_access_token')?.value;

  if (!accessToken) {
    redirect('/onboarding');
  }

  const me = await getMe(accessToken);
  if (!me) {
    redirect('/onboarding');
  }

  const shop = await getShop(me.user_id, accessToken);
  if (!shop) {
    redirect('/onboarding');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-purple-100 px-4 py-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Ledgrly</span>
          </div>
          <div className="text-sm text-gray-500">
            Step 3 of 3: Complete Setup
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="ml-3 text-sm font-medium text-green-600">Connect Shop</span>
            </div>
            <div className="w-16 h-1 bg-green-200 rounded"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="ml-3 text-sm font-medium text-green-600">Add Costs</span>
            </div>
            <div className="w-16 h-1 bg-green-200 rounded"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                3
              </div>
              <span className="ml-3 text-sm font-medium text-blue-600">Complete Setup</span>
            </div>
          </div>
        </div>

        {/* Completion Celebration */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Star className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 You're all set!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Congratulations! Your Ledgrly account is ready. You can now track profits, 
            manage expenses, and stay tax-ready all year long.
          </p>
        </div>

        {/* Setup Summary */}
        <Card className="mb-8 border-0 shadow-lg bg-white/60 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-900">Setup Complete</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Here's what you've accomplished
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Shop Connected</h3>
                <p className="text-sm text-gray-600">
                  {shop.shop_name} is synced and ready to import transactions automatically.
                </p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Costs Configured</h3>
                <p className="text-sm text-gray-600">
                  Product costs are set up for accurate profit calculations and tax reporting.
                </p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Tax Ready</h3>
                <p className="text-sm text-gray-600">
                  Schedule C exports and tax summaries are ready for filing season.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Get Started with These Actions</CardTitle>
            <CardDescription>
              Here are some key features to explore in your new dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/dashboard">
                <Card className="cursor-pointer hover:shadow-md transition-shadow border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">View Dashboard</h4>
                        <p className="text-sm text-gray-600">See your profit metrics and recent transactions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/api/export/schedule-c" download>
                <Card className="cursor-pointer hover:shadow-md transition-shadow border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Download className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Download Schedule C</h4>
                        <p className="text-sm text-gray-600">Export your tax-ready financial report</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/tax">
                <Card className="cursor-pointer hover:shadow-md transition-shadow border-orange-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Check Sales Tax</h4>
                        <p className="text-sm text-gray-600">Review tax collection by state and jurisdiction</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/products">
                <Card className="cursor-pointer hover:shadow-md transition-shadow border-purple-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Manage Product Costs</h4>
                        <p className="text-sm text-gray-600">Add costs for more products or update existing ones</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Pro Tips */}
        <Card className="mb-8 border-0 shadow-sm bg-yellow-50/50">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span>Pro Tips for Success</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <Calendar className="w-3 h-3 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Set up monthly reviews</h4>
                  <p className="text-sm text-gray-600">Check your dashboard monthly to track profit trends and update product costs as needed.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <FileText className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Export reports quarterly</h4>
                  <p className="text-sm text-gray-600">Download your Schedule C and tax reports every quarter to stay prepared for tax season.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                  <Target className="w-3 h-3 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Keep costs updated</h4>
                  <p className="text-sm text-gray-600">Update product costs when material prices change to maintain accurate profit calculations.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/onboarding/step-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Step 2</span>
            </Button>
          </Link>
          
          <Link href="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold flex items-center space-x-2">
              <span>Go to Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Support */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">
            Need help getting started? We're here to support you.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <a 
              href="mailto:support@ledgrly.com" 
              className="text-blue-600 hover:underline text-sm"
            >
              Contact Support
            </a>
            <span className="text-gray-400">•</span>
                                  <Link href="/dashboard/settings" className="text-blue-600 hover:underline text-sm">
              Account Settings
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 