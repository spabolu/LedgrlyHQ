import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_URL));

  // Clear cookies
  response.cookies.delete('etsy_access_token');
  response.cookies.delete('etsy_refresh_token');

  return response;
} 