import { getServerUser } from "@/lib/firebase/server-auth"
import { firebaseAdminDb } from "@/lib/firebase/admin"
import { redirect, notFound } from "next/navigation"
import { CampaignForm } from "@/components/dashboard/campaign-form"

export default async function EditEmailCampaignPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (id === "new") {
    redirect("/dashboard/campaigns/email/new")
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
  if (campaign.user_id !== user.uid || campaign.type !== "email") {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Email Campaign</h1>
        <p className="text-muted-foreground">Update your email campaign</p>
      </div>
      <CampaignForm type="email" campaign={{ id, ...campaign }} userId={user.uid} />
    </div>
  )
}
