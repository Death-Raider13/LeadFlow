import { getServerUser } from "@/lib/firebase/server-auth"
import { firebaseAdminDb } from "@/lib/firebase/admin"
import { redirect, notFound } from "next/navigation"
import { CampaignForm } from "@/components/dashboard/campaign-form"

export default async function EditWhatsAppCampaignPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (id === "new") {
    redirect("/dashboard/campaigns/sms/new")
  }

  const user = await getServerUser()
  if (!user) {
    redirect("/auth/login")
  }

  const campaignSnap = await firebaseAdminDb.collection("campaigns").doc(id).get()

  if (!campaignSnap.exists) {
    notFound()
  }

  const campaign = campaignSnap.data()
  if (campaign.user_id !== user.uid || campaign.type !== "sms") {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit WhatsApp Campaign</h1>
        <p className="text-muted-foreground">Update your WhatsApp campaign</p>
      </div>
      <CampaignForm type="sms" campaign={{ id, ...campaign }} userId={user.uid} />
    </div>
  )
}
