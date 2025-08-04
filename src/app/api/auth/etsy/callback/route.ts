import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function getMe(accessToken: string) {
  const response = await fetch("https://api.etsy.com/v3/application/users/me", {
    headers: { "x-api-key": process.env.ETSY_API_KEY!, Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) return null;
  return response.json();
}

async function getShop(userId: number, accessToken: string) {
  const response = await fetch(`https://api.etsy.com/v3/application/users/${userId}/shops`, {
    headers: { "x-api-key": process.env.ETSY_API_KEY!, Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) return null;
  const data = await response.json();
  if (data?.results?.length > 0) return data.results[0];
  if (data?.shop_id) return data;
  return null;
}


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const storedState = req.cookies.get('etsy_oauth_state')?.value;
  const codeVerifier = req.cookies.get('etsy_oauth_code_verifier')?.value;

  if (!state || state !== storedState) {
    return NextResponse.json({ error: 'State mismatch' }, { status: 400 });
  }

  if (!code || !codeVerifier) {
    return NextResponse.json({ error: 'Missing code or verifier' }, { status: 400 });
  }

  try {
    const tokenResponse = await fetch('https://api.etsy.com/v3/public/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.ETSY_API_KEY!,
        redirect_uri: `${process.env.NEXT_PUBLIC_URL}/api/auth/etsy/callback`,
        code: code,
        code_verifier: codeVerifier,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) {
      return NextResponse.json({ error: tokenData.error_description || 'Failed to fetch access token' }, { status: tokenResponse.status });
    }

    const { access_token, refresh_token, expires_in } = tokenData;
    const tokenExpiresAt = new Date(Date.now() + expires_in * 1000);

    const me = await getMe(access_token);
    if (!me) {
      return NextResponse.json({ error: 'Failed to fetch user from Etsy' }, { status: 500 });
    }
    
    const shop = await getShop(me.user_id, access_token);
    if (!shop) {
      return NextResponse.json({ error: 'No Etsy shop found for this user' }, { status: 404 });
    }
    
    const user = await prisma.user.upsert({
      where: { etsyUserId: me.user_id.toString() },
      update: {
        email: me.primary_email,
        firstName: me.first_name,
        lastName: me.last_name,
      },
      create: {
        etsyUserId: me.user_id.toString(),
        email: me.primary_email,
        firstName: me.first_name,
        lastName: me.last_name,
      },
    });

    await prisma.shop.upsert({
      where: { etsyShopId: shop.shop_id.toString() },
      update: {
        shopName: shop.shop_name,
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpiresAt: tokenExpiresAt,
      },
      create: {
        etsyShopId: shop.shop_id.toString(),
        shopName: shop.shop_name,
        userId: user.id,
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpiresAt: tokenExpiresAt,
      },
    });

    const cookieAttributes = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax' as const,
    };

    const responseToClient = NextResponse.redirect(new URL('/onboarding/step-2', req.url));
    responseToClient.cookies.set('etsy_access_token', access_token, { ...cookieAttributes, maxAge: expires_in });
    responseToClient.cookies.set('etsy_refresh_token', refresh_token, { ...cookieAttributes, maxAge: 60 * 60 * 24 * 90 });

    responseToClient.cookies.delete('etsy_oauth_state');
    responseToClient.cookies.delete('etsy_oauth_code_verifier');

    return responseToClient;
  } catch (error) {
    console.error('Callback Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 