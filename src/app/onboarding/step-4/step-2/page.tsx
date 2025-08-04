import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Store, 
  DollarSign, 
  FileText, 
  Package,
  Clock,
  Wrench
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

async function getListings(shopId: string, accessToken: string) {
  const response = await fetch(
    `https://api.etsy.com/v3/application/shops/${shopId}/listings/active?limit=5`,
    {
      headers: {
        'x-api-key': process.env.ETSY_API_KEY!,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(
      `Etsy API Error fetching listings: Status ${response.status}, Body: ${errorBody}`
    );
    throw new Error('Failed to fetch listings');
  }
  return response.json();
}

export default async function OnboardingStep2Page() {
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

  const listings = await getListings(shop.shop_id, accessToken);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-green-100 px-4 py-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Ledgrly</span>
          </div>
          <div className="text-sm text-gray-500">
            Step 2 of 3: Add Product Costs
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
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                2
              </div>
              <span className="ml-3 text-sm font-medium text-blue-600">Add Costs</span>
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

        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <DollarSign className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Great! Your shop is connected
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Now let's add product costs to calculate accurate profit margins and prepare for tax season.
          </p>
          <div className="mt-6 p-4 bg-green-50 rounded-lg inline-flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Connected to {shop.shop_name}</span>
          </div>
        </div>

        {/* Product Costs Section */}
        <Card className="mb-8 border-0 shadow-lg bg-white/60 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-900">Add Product Costs</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Set up cost tracking for accurate profit calculations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {listings.results && listings.results.length > 0 ? (
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Why add product costs?</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-blue-600" />
                      <span>Calculate true profit margins</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>Prepare for tax filing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span>Make better pricing decisions</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  We've found your top products. Add costs for at least one product to continue, or skip for now and add them later.
                </p>

                {listings.results.slice(0, 3).map((listing: any) => (
                  <Card key={listing.listing_id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{listing.title}</h4>
                          <p className="text-sm text-gray-500">
                            Price: ${(listing.price.amount / listing.price.divisor).toFixed(2)}
                            {listing.sku && <span> • SKU: {listing.sku}</span>}
                          </p>
                        </div>
                        {listing.images && listing.images.length > 0 && (
                          <img 
                            src={listing.images[0].url_170x135} 
                            alt={listing.title}
                            className="w-16 h-16 rounded object-cover ml-4"
                          />
                        )}
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <Package className="w-4 h-4 mr-2 text-blue-600" />
                            Material Costs
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                            <Input 
                              type="number" 
                              step="0.01" 
                              placeholder="0.00"
                              className="pl-8"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <Clock className="w-4 h-4 mr-2 text-green-600" />
                            Labor Costs
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                            <Input 
                              type="number" 
                              step="0.01" 
                              placeholder="0.00"
                              className="pl-8"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <Wrench className="w-4 h-4 mr-2 text-orange-600" />
                            Other Costs
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                            <Input 
                              type="number" 
                              step="0.01" 
                              placeholder="0.00"
                              className="pl-8"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Estimated Profit per Unit:</span>
                          <span className="font-semibold text-green-600">
                            ${(listing.price.amount / listing.price.divisor).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Don't see all your products? You can add costs for more products after setup.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Listings Found</h3>
                <p className="text-gray-600 mb-6">
                  Create some listings on Etsy first, then return to add product costs.
                </p>
                <Button asChild>
                  <a 
                    href={`https://www.etsy.com/your/shops/${shop.shop_name}/tools/listings`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Create Listings on Etsy
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cost Tips */}
        <Card className="mb-8 border-0 shadow-sm bg-blue-50/50">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">💡 Cost Tracking Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Material Costs</h4>
                <p className="text-gray-600">Include raw materials, supplies, packaging, and shipping materials.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Labor Costs</h4>
                <p className="text-gray-600">Your time spent creating the product. Consider your desired hourly rate.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Other Costs</h4>
                <p className="text-gray-600">Tools, equipment depreciation, utilities, or any indirect costs.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
          
          <div className="flex space-x-3">
            <Link href="/onboarding/step-3">
              <Button variant="outline">
                Skip for Now
              </Button>
            </Link>
            <Link href="/onboarding/step-3">
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white flex items-center space-x-2">
                <span>Continue Setup</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 