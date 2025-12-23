import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { BillingPage } from "@/components/dashboard/billing-page"
import { PLANS } from "@/lib/plans"

interface BillingPageProps {
  searchParams: Promise<{
    reference?: string
    trxref?: string
  }>
}

export default async function BillingDashboardPage({ searchParams }: BillingPageProps) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const resolvedSearchParams = await searchParams
  const reference = resolvedSearchParams.reference || resolvedSearchParams.trxref

  if (reference) {
    const secretKey = process.env.PAYSTACK_SECRET_KEY

    if (secretKey) {
      try {
        const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
          headers: {
            Authorization: `Bearer ${secretKey}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        })

        if (verifyResponse.ok) {
          const verifyData = (await verifyResponse.json()) as any

          if (verifyData.status && verifyData.data?.status === "success") {
            const metadata = verifyData.data.metadata || {}
            const planId = metadata.planId as string | undefined
            const userId = metadata.userId as string | undefined
            const plan = planId ? PLANS.find((p) => p.id === planId) : null

            if (plan && userId === user.id) {
              await supabase
                .from("profiles")
                .update({
                  subscription_plan: planId,
                  stripe_subscription_id: verifyData.data.reference ?? null,
                  email_credits: plan.emailCredits,
                  sms_credits: plan.smsCredits,
                  updated_at: new Date().toISOString(),
                })
                .eq("id", user.id)
            }
          }
        } else {
          console.error("Paystack verify error:", await verifyResponse.text())
        }
      } catch (error) {
        console.error("Error verifying Paystack transaction:", error)
      }
    }

    // Always redirect to a clean URL after handling the reference
    redirect("/dashboard/billing")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return <BillingPage profile={profile} userEmail={user.email || ""} />
}
