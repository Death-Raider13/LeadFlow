import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { PLANS } from "@/lib/plans"

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

  // Fallback to referer
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

    const { planId, billingCycle, email } = await request.json()

    const plan = PLANS.find((p) => p.id === planId)
    if (!plan || plan.id === "free") {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }
    const baseUrl = getBaseUrl(request)
    const amount = (billingCycle === "yearly" ? plan.priceYearly : plan.priceMonthly) * 100

    const planCode =
      billingCycle === "yearly" ? plan.paystackPlanCodes?.yearly : plan.paystackPlanCodes?.monthly

    const secretKey = process.env.PAYSTACK_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json({ error: "PAYSTACK_SECRET_KEY is not configured" }, { status: 500 })
    }

    const payload: any = {
      email,
      amount,
      currency: "NGN",
      callback_url: `${baseUrl}/dashboard/billing`,
      metadata: {
        userId: user.id,
        planId: plan.id,
        billingCycle,
      },
    }

    if (planCode) {
      payload.plan = planCode
    }

    const initializeResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!initializeResponse.ok) {
      const errorText = await initializeResponse.text()
      console.error("Paystack initialize error:", errorText)
      return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
    }

    const initializeData = (await initializeResponse.json()) as {
      status: boolean
      message: string
      data?: { authorization_url?: string | null }
    }

    if (!initializeData.status || !initializeData.data?.authorization_url) {
      console.error("Paystack initialize response error:", initializeData)
      return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
    }

    return NextResponse.json({ url: initializeData.data.authorization_url })
  } catch (error) {
    console.error("Paystack checkout error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
