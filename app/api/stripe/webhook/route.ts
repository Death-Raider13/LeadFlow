import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { PLANS } from "@/lib/plans"

// Use service role for webhook to bypass RLS
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  const body = await request.text()

  let event: any

  try {
    event = JSON.parse(body)
  } catch (err) {
    console.error("Webhook parsing error:", err)
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  try {
    if (event.event === "charge.success" && event.data?.status === "success") {
      const metadata = event.data.metadata || {}
      const userId = metadata.userId as string | undefined
      const planId = metadata.planId as string | undefined
      const plan = planId ? PLANS.find((p) => p.id === planId) : null

      if (userId && plan) {
        await supabaseAdmin
          .from("profiles")
          .update({
            subscription_plan: planId,
            stripe_subscription_id: event.data.reference ?? null,
            email_credits: plan.emailCredits,
            sms_credits: plan.smsCredits,
            paystack_customer_code: event.data.customer?.customer_code ?? null,
            paystack_subscription_code: event.data.subscription?.subscription_code ?? null,
            paystack_email_token: event.data.subscription?.email_token ?? null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
