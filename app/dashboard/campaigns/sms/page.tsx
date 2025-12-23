import { createClient } from "@/lib/supabase/server"
import { CampaignsList } from "@/components/dashboard/campaigns-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function WhatsAppCampaignsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("*")
    .eq("user_id", user?.id)
    .eq("type", "sms")
    .order("created_at", { ascending: false })

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

      <CampaignsList campaigns={campaigns || []} type="sms" />
    </div>
  )
}
