import { redirect } from "next/navigation"
import { getServerUser } from "@/lib/firebase/server-auth"
import { CampaignForm } from "@/components/dashboard/campaign-form"

export default async function NewWhatsAppCampaignPage() {
  const user = await getServerUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create WhatsApp Campaign</h1>
        <p className="text-muted-foreground">Compose and schedule your WhatsApp campaign</p>
      </div>
      <CampaignForm type="sms" userId={user.uid} />
    </div>
  )
}
