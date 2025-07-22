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

async function getShopReceipts(shopId: string, accessToken: string) {
  const response = await fetch(
    `https://api.etsy.com/v3/application/shops/${shopId}/receipts?limit=100&was_paid=true`,
    {
      headers: {
        'x-api-key': process.env.ETSY_API_KEY!,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch receipts');
  }
  return response.json();
}

function generateTaxReport(receipts: any[], shopName: string, year: string) {
  const csvRows = [
    ['Date', 'Order ID', 'State/Country', 'Subtotal', 'Tax Collected', 'Total', 'Tax Rate']
  ];

  let totalSales = 0;
  let totalTax = 0;
  const taxByState: { [key: string]: { sales: number, tax: number, count: number } } = {};

  receipts.forEach(receipt => {
    const date = new Date(receipt.created_timestamp * 1000);
    const subtotal = receipt.subtotal?.amount ? receipt.subtotal.amount / receipt.subtotal.divisor : 0;
    const taxAmount = receipt.total_tax_cost?.amount ? receipt.total_tax_cost.amount / receipt.total_tax_cost.divisor : 0;
    const total = receipt.grandtotal?.amount ? receipt.grandtotal.amount / receipt.grandtotal.divisor : subtotal + taxAmount;
    const state = receipt.country_iso === 'US' ? (receipt.state || 'Unknown') : receipt.country_iso;
    const taxRate = subtotal > 0 ? (taxAmount / subtotal) * 100 : 0;

    totalSales += subtotal;
    totalTax += taxAmount;

    // Track by state
    if (!taxByState[state]) {
      taxByState[state] = { sales: 0, tax: 0, count: 0 };
    }
    taxByState[state].sales += subtotal;
    taxByState[state].tax += taxAmount;
    taxByState[state].count += 1;

    csvRows.push([
      date.toISOString().split('T')[0],
      receipt.receipt_id?.toString() || 'N/A',
      state,
      subtotal.toFixed(2),
      taxAmount.toFixed(2),
      total.toFixed(2),
      taxRate.toFixed(2) + '%'
    ]);
  });

  // Add summary section
  csvRows.push([]);
  csvRows.push(['SUMMARY BY STATE/JURISDICTION', '', '', '', '', '', '']);
  csvRows.push(['State/Country', 'Orders', 'Sales', 'Tax Collected', 'Effective Rate', '', '']);
  
  Object.entries(taxByState).forEach(([state, data]) => {
    const effectiveRate = data.sales > 0 ? (data.tax / data.sales) * 100 : 0;
    csvRows.push([
      state,
      data.count.toString(),
      data.sales.toFixed(2),
      data.tax.toFixed(2),
      effectiveRate.toFixed(2) + '%',
      '',
      ''
    ]);
  });

  // Add totals
  csvRows.push([]);
  csvRows.push(['TOTALS', '', '', '', '', '', '']);
  csvRows.push(['Total Sales', '', '', totalSales.toFixed(2), '', '', '']);
  csvRows.push(['Total Tax Collected', '', '', '', totalTax.toFixed(2), '', '']);
  csvRows.push(['Overall Tax Rate', '', '', '', '', '', ((totalTax / totalSales) * 100).toFixed(2) + '%']);

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

    const receipts = await getShopReceipts(shop.shop_id, accessToken);
    const currentYear = new Date().getFullYear().toString();
    
    // Filter receipts for current year
    const yearlyReceipts = (receipts.results || []).filter((receipt: any) => {
      const receiptDate = new Date(receipt.created_timestamp * 1000);
      return receiptDate.getFullYear().toString() === currentYear;
    });
    
    const csv = generateTaxReport(yearlyReceipts, shop.shop_name, currentYear);
    
    const response = new NextResponse(csv);
    response.headers.set('Content-Type', 'text/csv');
    response.headers.set('Content-Disposition', `attachment; filename="${shop.shop_name}_Tax_Report_${currentYear}.csv"`);
    
    return response;
  } catch (error) {
    console.error('Tax export error:', error);
    return NextResponse.json({ error: 'Failed to generate tax export' }, { status: 500 });
  }
} 