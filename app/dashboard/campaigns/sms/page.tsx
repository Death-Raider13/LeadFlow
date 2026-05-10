import { getServerUser } from "@/lib/firebase/server-auth"
import { firebaseAdminDb } from "@/lib/firebase/admin"
import { serializeFirestoreData } from "@/lib/utils/serialization"
import { CampaignsList } from "@/components/dashboard/campaigns-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function WhatsAppCampaignsPage() {
  const user = await getServerUser()
  if (!user) {
    redirect("/auth/login")
  }

  const campaignsSnap = await firebaseAdminDb
    .collection("campaigns")
    .where("user_id", "==", user.uid)
    .where("type", "==", "sms")
    .orderBy("created_at", "desc")
    .get()
  const campaignsData = campaignsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  const campaigns = serializeFirestoreData(campaignsData)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">WhatsApp Campaigns</h1>
          <p className="text-muted-foreground">Create and manage WhatsApp campaigns</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/campaigns/sms/new">
            <Plus className="mr-2 h-4 w-4" />
            New WhatsApp Campaign
          </Link>
        </Button>
      </div>

      <CampaignsList campaigns={campaigns} type="sms" />
    </div>
  )
}
