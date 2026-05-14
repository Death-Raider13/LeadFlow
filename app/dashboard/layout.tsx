import type React from "react"
import { redirect } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { PLANS } from "@/lib/plans"
import { firebaseAdminDb } from "@/lib/firebase/admin"
import { getServerUser } from "@/lib/firebase/server-auth"
import { serializeFirestoreData } from "@/lib/utils/serialization"
import { Timestamp } from "firebase-admin/firestore"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const decodedUser = await getServerUser()

  if (!decodedUser) {
    redirect("/auth/login")
  }

  const user = { id: decodedUser.uid, email: decodedUser.email ?? null }

  const profileSnap = await firebaseAdminDb.collection("profiles").doc(user.id).get()
  const profileData = profileSnap.exists ? profileSnap.data() : null
  const profile = serializeFirestoreData(profileData)

  if (profile && profile.accepted_policy === false) {
    redirect("/policy")
  }

  let leadsUsedThisMonth = 0
  let leadLimit: number | null = null

  if (profile) {
    const plan = PLANS.find((p) => p.id === profile.subscription_plan) || PLANS[0]
    leadLimit = plan.leadLimit

    if (leadLimit !== null) {
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

      try {
        const leadsSnap = await firebaseAdminDb
          .collection("leads")
          .where("user_id", "==", user.id)
          .where("created_at", ">=", Timestamp.fromDate(startOfMonth))
          .where("created_at", "<", Timestamp.fromDate(startOfNextMonth))
          .get()

        leadsUsedThisMonth = leadsSnap.size
      } catch (error) {
        console.error("Error fetching lead usage count:", error)
        leadsUsedThisMonth = 0
      }
    }
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar
        profile={profile}
        leadLimit={leadLimit}
        leadsUsedThisMonth={leadsUsedThisMonth}
      />
      <div className="flex-1 flex flex-col">
        <DashboardHeader user={user} profile={profile} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
