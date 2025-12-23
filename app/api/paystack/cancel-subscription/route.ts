import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { PLANS } from "@/lib/plans"

export async function POST(_request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("paystack_subscription_code, paystack_email_token")
      .eq("id", user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    if (!profile.paystack_subscription_code || !profile.paystack_email_token) {
      return NextResponse.json({ error: "No active Paystack subscription to cancel" }, { status: 400 })
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json({ error: "PAYSTACK_SECRET_KEY is not configured" }, { status: 500 })
    }

    const disableResponse = await fetch("https://api.paystack.co/subscription/disable", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: profile.paystack_subscription_code,
        token: profile.paystack_email_token,
      }),
    })

    const disableData = (await disableResponse.json()) as any

    if (!disableResponse.ok || !disableData.status) {
      console.error("Paystack subscription disable error:", disableData)
      return NextResponse.json({ error: "Failed to cancel Paystack subscription" }, { status: 500 })
    }

    const freePlan = PLANS.find((p) => p.id === "free") || PLANS[0]

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        subscription_plan: "free",
        paystack_subscription_code: null,
        paystack_email_token: null,
        email_credits: freePlan.emailCredits,
        sms_credits: freePlan.smsCredits,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (updateError) {
      console.error("Error updating profile after subscription cancel:", updateError)
      return NextResponse.json({ error: "Subscription cancelled on Paystack, but failed to update profile" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Cancel subscription error:", error)
    return NextResponse.json({ error: error.message ?? "Unexpected error" }, { status: 500 })
  }
}
