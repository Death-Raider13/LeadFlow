import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { CampaignForm } from "@/components/dashboard/campaign-form"

export default async function NewEmailCampaignPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Email Campaign</h1>
        <p className="text-muted-foreground">Compose and schedule your email campaign</p>
      </div>
      <CampaignForm type="email" userId={user.id} />
    </div>
  )
}
