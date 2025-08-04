import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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
  const cookieStore = cookies();
  const accessToken = cookieStore.get("etsy_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const me = await getMe(accessToken);
    if (!me) {
      return NextResponse.json({ error: "Failed to fetch user" }, { status: 401 });
    }

    const shop = await getShop(me.user_id, accessToken);
    
    return NextResponse.json({ me, shop });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json({ error: "Failed to fetch settings data" }, { status: 500 });
  }
} 