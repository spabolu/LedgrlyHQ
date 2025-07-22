import { NextRequest, NextResponse } from 'next/server';
import pkce from 'pkce-challenge';

export async function GET(req: NextRequest) {
  const { code_challenge, code_verifier } = await pkce();

  const state = Math.random().toString(36).substring(7);

  const cookieAttributes = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 15, // 15 minutes
    sameSite: 'lax' as const,
  };

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.ETSY_API_KEY!,
    redirect_uri: `${process.env.NEXT_PUBLIC_URL}/api/auth/etsy/callback`,
    scope: 'email_r transactions_r shops_r',
    state: state,
    code_challenge: code_challenge,
    code_challenge_method: 'S256',
  });

  const etsyAuthUrl = `https://www.etsy.com/oauth/connect?${params.toString()}`;

  const response = NextResponse.redirect(etsyAuthUrl);

  response.cookies.set('etsy_oauth_state', state, cookieAttributes);
  response.cookies.set('etsy_oauth_code_verifier', code_verifier, cookieAttributes);

  return response;
} 