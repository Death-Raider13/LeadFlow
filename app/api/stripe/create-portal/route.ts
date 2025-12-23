import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { stripe } from "@/lib/stripe"

function getBaseUrl(request: NextRequest): string {
  // Try origin header first
  const origin = request.headers.get("origin")
  if (origin && origin.startsWith("http")) {
    return origin
  }

  // Try host header with protocol detection
  const host = request.headers.get("host")
  const protocol = request.headers.get("x-forwarded-proto") || "https"
  if (host) {
    return `${protocol}://${host}`
  }

  // Try referer
  const referer = request.headers.get("referer")
  if (referer) {
    const url = new URL(referer)
    return url.origin
  }

  // Last resort fallback
  return "https://localhost:3000"
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile } = await supabase.from("profiles").select("stripe_customer_id").eq("id", user.id).single()

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ error: "No billing account found" }, { status: 400 })
    }

    const baseUrl = getBaseUrl(request)

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${baseUrl}/dashboard/billing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Portal error:", error)
    return NextResponse.json({ error: "Failed to create portal session" }, { status: 500 })
  }
}
