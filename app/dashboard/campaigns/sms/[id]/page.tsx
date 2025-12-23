import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { CampaignForm } from "@/components/dashboard/campaign-form"

function isValidUUID(str: string) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

export default async function EditWhatsAppCampaignPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (id === "new") {
    redirect("/dashboard/campaigns/sms/new")
  }

  if (!isValidUUID(id)) {
    notFound()
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: campaign } = await supabase
    .from("campaigns")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .eq("type", "sms")
    .single()

  if (!campaign) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit WhatsApp Campaign</h1>
        <p className="text-muted-foreground">Update your WhatsApp campaign</p>
      </div>
      <CampaignForm type="sms" campaign={campaign} userId={user.id} />
    </div>
  )
}
