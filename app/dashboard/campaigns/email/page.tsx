import { getServerUser } from "@/lib/firebase/server-auth"
import { firebaseAdminDb } from "@/lib/firebase/admin"
import { serializeFirestoreData } from "@/lib/utils/serialization"
import { CampaignsList } from "@/components/dashboard/campaigns-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function EmailCampaignsPage() {
  const user = await getServerUser()
  if (!user) {
    redirect("/auth/login")
  }

  let campaigns: any[] = []
  let queryError: string | null = null

  try {
    const campaignsSnap = await firebaseAdminDb
      .collection("campaigns")
      .where("user_id", "==", user.uid)
      .where("type", "==", "email")
      .orderBy("created_at", "desc")
      .get()
    const campaignsData = campaignsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    campaigns = serializeFirestoreData(campaignsData)
  } catch (error: any) {
    console.error("Failed to fetch email campaigns:", error)
    queryError = error?.message || "Failed to load campaigns"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Email Campaigns</h1>
          <p className="text-muted-foreground">Create and manage email campaigns</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/campaigns/email/new">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Link>
        </Button>
      </div>

      {queryError && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          <p className="font-medium">Error loading campaigns</p>
          <p className="mt-1 text-xs opacity-80">{queryError}</p>
        </div>
      )}

      <CampaignsList campaigns={campaigns} type="email" />
    </div>
  )
}
