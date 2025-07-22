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
    `https://api.etsy.com/v3/application/shops/${shopId}/listings/active?limit=50`,
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

export default async function ProductsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('etsy_access_token')?.value;

  if (!accessToken) {
    redirect('/');
  }

  const me = await getMe(accessToken);
  if (!me) {
    redirect('/api/auth/logout');
  }

  const shop = await getShop(me.user_id, accessToken);
  if (!shop) {
    redirect('/api/auth/logout');
  }

  const listings = await getListings(shop.shop_id, accessToken);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">← Dashboard</Button>
          </Link>
          <h1 className="text-xl font-semibold">Product Costs</h1>
        </div>
        <div className="ml-auto">
          <Link href="/api/auth/logout">
            <Button variant="outline" size="sm">Logout</Button>
          </Link>
        </div>
      </header>
      
      <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Add Product Costs</h2>
            <p className="text-muted-foreground">
              Set cost per unit for accurate profit calculations and COGS tracking
            </p>
          </div>
          <Button>Save All Changes</Button>
        </div>

        {listings.results && listings.results.length > 0 ? (
          <div className="space-y-4">
            {listings.results.map((listing: any) => (
              <Card key={listing.listing_id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{listing.title}</CardTitle>
                      <CardDescription>
                        SKU: {listing.sku || 'No SKU'} • Price: ${(listing.price.amount / listing.price.divisor).toFixed(2)}
                      </CardDescription>
                    </div>
                    {listing.images && listing.images.length > 0 && (
                      <img 
                        src={listing.images[0].url_170x135} 
                        alt={listing.title}
                        className="w-16 h-16 rounded object-cover ml-4"
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Material Cost per Unit
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="0.00"
                          className="pl-8"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Labor Cost per Unit
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="0.00"
                          className="pl-8"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Other Costs per Unit
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="0.00"
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center text-sm">
                      <span>Total COGS per Unit:</span>
                      <span className="font-semibold">$0.00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span>Estimated Profit per Unit:</span>
                      <span className="font-semibold text-green-600">
                        ${(listing.price.amount / listing.price.divisor).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-lg font-semibold mb-2">No Active Listings</h3>
              <p className="text-muted-foreground text-center max-w-md">
                You don't have any active listings in your Etsy shop. 
                Create some listings on Etsy to start tracking product costs.
              </p>
              <Button className="mt-4" asChild>
                <a 
                  href={`https://www.etsy.com/your/shops/${shop.shop_name}/tools/listings`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Create Listings on Etsy
                </a>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💡 Cost Tracking Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Material Costs:</strong> Include raw materials, supplies, packaging, and shipping materials.
              </div>
              <div>
                <strong>Labor Costs:</strong> Your time spent creating the product. Consider your desired hourly rate.
              </div>
              <div>
                <strong>Other Costs:</strong> Tools, equipment depreciation, utilities, or any indirect costs.
              </div>
              <div className="text-muted-foreground">
                💡 Accurate COGS tracking helps you price products correctly and maximize profits while staying compliant for tax reporting.
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 