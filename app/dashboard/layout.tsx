import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { PLANS } from "@/lib/plans"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

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
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
      const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString()

      const { count } = await supabase
        .from("leads")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", startOfMonth)
        .lt("created_at", startOfNextMonth)

      leadsUsedThisMonth = count || 0
    }
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar
        user={user}
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
