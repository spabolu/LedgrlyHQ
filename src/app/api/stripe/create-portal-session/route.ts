import { stripe } from "@/lib/stripe"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import prisma from "@/lib/prisma"

async function getMe(accessToken: string) {
  const response = await fetch("https://api.etsy.com/v3/application/users/me", {
    headers: { "x-api-key": process.env.ETSY_API_KEY!, Authorization: `Bearer ${accessToken}` },
  })
  if (!response.ok) return null
  return response.json()
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("etsy_access_token")?.value
  if (!accessToken) return new NextResponse("Not authenticated", { status: 401 })

  const me = await getMe(accessToken)
  if (!me) return new NextResponse("Could not retrieve user from Etsy", { status: 401 })

  const user = await prisma.user.findUnique({ where: { etsyUserId: me.user_id.toString() } })
  if (!user || !user.stripeCustomerId) return new NextResponse("User not found or is not a Stripe customer", { status: 404 })

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/settings`,
  });

  return NextResponse.json({ url: portalSession.url });
} 