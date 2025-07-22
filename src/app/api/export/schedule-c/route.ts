import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

async function getMe(accessToken: string) {
  const response = await fetch('https://api.etsy.com/v3/application/users/me', {
    headers: {
      'x-api-key': process.env.ETSY_API_KEY!,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return null;
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
    return null;
  }

  const data = await response.json();
  if (data && data.results && data.results.length > 0) {
    return data.results[0];
  } else if (data && data.shop_id) {
    return data;
  }
  return null;
}

async function getTransactions(shopId: string, accessToken: string, year?: string) {
  const limit = 100; // Get more transactions for export
  const response = await fetch(
    `https://api.etsy.com/v3/application/shops/${shopId}/transactions?limit=${limit}&includes=Listing`,
    {
      headers: {
        'x-api-key': process.env.ETSY_API_KEY!,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
}

function generateScheduleC(transactions: any[], shopName: string, year: string) {
  const csvRows = [
    ['Date', 'Description', 'Gross Sales', 'Fees', 'Net Income', 'Category']
  ];

  let totalGrossSales = 0;
  let totalFees = 0;

  transactions.forEach(tx => {
    const date = new Date(tx.paid_timestamp * 1000);
    const grossAmount = tx.price.amount / tx.price.divisor;
    const estimatedFee = grossAmount * 0.065; // 6.5% estimated Etsy fees
    const netAmount = grossAmount - estimatedFee;

    totalGrossSales += grossAmount;
    totalFees += estimatedFee;

    csvRows.push([
      date.toISOString().split('T')[0], // Date in YYYY-MM-DD format
      tx.title || 'Product Sale',
      grossAmount.toFixed(2),
      estimatedFee.toFixed(2),
      netAmount.toFixed(2),
      'Product Sales'
    ]);
  });

  // Add summary rows
  csvRows.push([]);
  csvRows.push(['SUMMARY', '', '', '', '', '']);
  csvRows.push(['Total Gross Sales', '', totalGrossSales.toFixed(2), '', '', '']);
  csvRows.push(['Total Fees', '', '', totalFees.toFixed(2), '', '']);
  csvRows.push(['Net Business Income', '', '', '', (totalGrossSales - totalFees).toFixed(2), '']);

  return csvRows.map(row => row.join(',')).join('\n');
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('etsy_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const me = await getMe(accessToken);
    if (!me) {
      return NextResponse.json({ error: 'Failed to fetch user' }, { status: 401 });
    }

    const shop = await getShop(me.user_id, accessToken);
    if (!shop) {
      return NextResponse.json({ error: 'No shop found' }, { status: 404 });
    }

    const transactions = await getTransactions(shop.shop_id, accessToken);
    const currentYear = new Date().getFullYear().toString();
    
    const csv = generateScheduleC(transactions.results || [], shop.shop_name, currentYear);
    
    const response = new NextResponse(csv);
    response.headers.set('Content-Type', 'text/csv');
    response.headers.set('Content-Disposition', `attachment; filename="${shop.shop_name}_Schedule_C_${currentYear}.csv"`);
    
    return response;
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to generate export' }, { status: 500 });
  }
} 