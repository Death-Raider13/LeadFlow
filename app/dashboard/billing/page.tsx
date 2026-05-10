import { redirect } from "next/navigation"
import { BillingPage } from "@/components/dashboard/billing-page"
import { PLANS } from "@/lib/plans"
import { getServerUser } from "@/lib/firebase/server-auth"
import { firebaseAdminDb } from "@/lib/firebase/admin"

interface BillingPageProps {
  searchParams: Promise<{
    reference?: string
    trxref?: string
  }>
}

export default async function BillingDashboardPage({ searchParams }: BillingPageProps) {
  const decodedUser = await getServerUser()

  if (!decodedUser) {
    redirect("/auth/login")
  }

  const userId = decodedUser.uid
  const userEmail = decodedUser.email || ""

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
            const userIdFromMeta = metadata.userId as string | undefined
            const plan = planId ? PLANS.find((p) => p.id === planId) : null

            if (plan && userIdFromMeta === userId) {
              const profileRef = firebaseAdminDb.collection("profiles").doc(userId)
              await profileRef.set(
                {
                  subscription_plan: planId,
                  stripe_subscription_id: verifyData.data.reference ?? null,
                  email_credits: plan.emailCredits,
                  sms_credits: plan.smsCredits,
                  updated_at: new Date().toISOString(),
                },
                { merge: true },
              )
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

  const profileSnap = await firebaseAdminDb.collection("profiles").doc(userId).get()
  const profile = profileSnap.exists ? profileSnap.data() : null

  return <BillingPage profile={profile} userEmail={userEmail} />
}
