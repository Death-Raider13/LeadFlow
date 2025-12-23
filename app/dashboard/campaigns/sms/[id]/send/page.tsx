import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { SendCampaign } from "@/components/dashboard/send-campaign"

export default async function SendSMSCampaignPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
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

  const { data: recipients } = await supabase.from("campaign_recipients").select("*, leads(*)").eq("campaign_id", id)

  const { data: profile } = await supabase.from("profiles").select("sms_credits").eq("id", user.id).single()

  return (
    <div className="max-w-3xl mx-auto">
      <SendCampaign campaign={campaign} recipients={recipients || []} credits={profile?.sms_credits || 0} type="sms" />
    </div>
  )
}
