import { getServerUser } from "@/lib/firebase/server-auth"
import { firebaseAdminDb } from "@/lib/firebase/admin"
import { redirect, notFound } from "next/navigation"
import { SendCampaign } from "@/components/dashboard/send-campaign"

export default async function SendSMSCampaignPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
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

  // Fetch recipients
  const recipientsSnap = await firebaseAdminDb
    .collection("campaign_recipients")
    .where("campaign_id", "==", id)
    .get()

  const recipients = []
  for (const recipientDoc of recipientsSnap.docs) {
    const recipientData = recipientDoc.data()
    const leadSnap = await firebaseAdminDb.collection("leads").doc(recipientData.lead_id).get()

    if (leadSnap.exists) {
      recipients.push({
        id: recipientDoc.id,
        ...recipientData,
        leads: leadSnap.data(),
      })
    }
  }

  const profileSnap = await firebaseAdminDb.collection("profiles").doc(user.uid).get()
  const profile = profileSnap.exists ? profileSnap.data() : null

  return (
    <div className="max-w-3xl mx-auto">
      <SendCampaign campaign={{ id, ...campaign }} recipients={recipients} credits={profile?.sms_credits || 0} type="sms" />
    </div>
  )
}
