import { NextRequest, NextResponse } from 'next/server';

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
    const response = await fetch('https://api.etsy.com/v3/public/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.ETSY_API_KEY!,
        redirect_uri: `${process.env.NEXT_PUBLIC_URL}/api/auth/etsy/callback`,
        code: code,
        code_verifier: codeVerifier,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Etsy API Error:', data);
      return NextResponse.json({ error: data.error_description || 'Failed to fetch access token' }, { status: response.status });
    }

    const { access_token, refresh_token, expires_in } = data;

    const cookieAttributes = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax' as const,
    };

    const responseToClient = NextResponse.redirect(new URL('/onboarding/step-2', req.url));
    responseToClient.cookies.set('etsy_access_token', access_token, { ...cookieAttributes, maxAge: expires_in });
    responseToClient.cookies.set('etsy_refresh_token', refresh_token, { ...cookieAttributes, maxAge: 60 * 60 * 24 * 90 }); // 90 days

    // Clean up used cookies
    responseToClient.cookies.delete('etsy_oauth_state');
    responseToClient.cookies.delete('etsy_oauth_code_verifier');

    return responseToClient;
  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 