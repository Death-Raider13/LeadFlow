import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { decryptWithKey, unwrapUserKey } from "@/lib/encryption"

interface SendCampaignBody {
  campaignId: string
}

async function sendUltraMsgMessage(phone: string, message: string, instanceId: string, token: string) {
  const cleanPhone = phone.replace(/[^0-9+]/g, "")
  const response = await fetch(`https://api.ultramsg.com/${instanceId}/messages/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, to: cleanPhone, body: message }),
  })

  const data = await response.json()
  return data
}

export async function POST(request: NextRequest) {
  try {
    const { campaignId } = (await request.json()) as SendCampaignBody

    if (!campaignId) {
      return NextResponse.json({ error: "campaignId is required" }, { status: 400 })
    }

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: campaign, error: campaignError } = await supabase
      .from("campaigns")
      .select("*")
      .eq("id", campaignId)
      .eq("user_id", user.id)
      .eq("type", "sms")
      .single()

    if (campaignError || !campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    const { data: recipientsData, error: recipientsError } = await supabase
      .from("campaign_recipients")
      .select("*, leads(*)")
      .eq("campaign_id", campaignId)

    if (recipientsError) {
      console.error("Error fetching recipients:", recipientsError)
      return NextResponse.json({ error: "Failed to load recipients" }, { status: 500 })
    }

    const recipients = (recipientsData || []).filter((r: any) => r.leads && r.leads.phone)

    if (recipients.length === 0) {
      return NextResponse.json({ error: "No recipients with phone numbers" }, { status: 400 })
    }

    const THROTTLE_LIMIT = 10
    const windowMs = 30 * 60 * 1000
    const windowStart = new Date(Date.now() - windowMs).toISOString()

    const { data: recentCampaigns } = await supabase
      .from("campaigns")
      .select("id")
      .eq("user_id", user.id)
      .eq("type", "sms")
      .gte("sent_at", windowStart)

    let recentCount = 0
    if (recentCampaigns && recentCampaigns.length > 0) {
      const campaignIds = recentCampaigns.map((c) => c.id)
      const { data: recentRecipients } = await supabase
        .from("campaign_recipients")
        .select("id")
        .in("campaign_id", campaignIds)
        .gte("sent_at", windowStart)

      recentCount = recentRecipients?.length || 0
    }

    if (recentCount + recipients.length > THROTTLE_LIMIT) {
      return NextResponse.json(
        {
          error: "WhatsApp rate limit reached",
          message: `To protect your number, you can send up to ${THROTTLE_LIMIT} WhatsApp messages every 30 minutes. You have already sent ${recentCount} in the last 30 minutes. Please wait a bit or reduce the number of recipients.",
        },
        { status: 429 },
      )
    }

    const { data: integration, error: integrationError } = await supabase
      .from("user_integrations")
      .select("user_key_enc, ultramsg_instance_enc, ultramsg_token_enc")
      .eq("user_id", user.id)
      .single()

    if (integrationError || !integration) {
      return NextResponse.json({ error: "WhatsApp integration not configured" }, { status: 400 })
    }

    const userKeyBase64 = unwrapUserKey(integration.user_key_enc)
    const instanceId = decryptWithKey(userKeyBase64, integration.ultramsg_instance_enc)
    const token = decryptWithKey(userKeyBase64, integration.ultramsg_token_enc)

    let sent = 0
    let failed = 0
    const errors: { phone: string; error: string }[] = []

    for (const r of recipients) {
      const lead = r.leads
      const recipientPhone = lead.phone as string
      const recipientName = lead.name || recipientPhone

      const message = (campaign.content || "").replace(/{name}/g, recipientName).replace(/{business_name}/g, recipientName)

      try {
        const result = await sendUltraMsgMessage(recipientPhone, message, instanceId, token)
        if (result.sent || result.id || result.success) {
          sent++
        } else {
          failed++
          errors.push({ phone: recipientPhone, error: JSON.stringify(result) })
        }
      } catch (err: any) {
        failed++
        errors.push({ phone: recipientPhone, error: err.message || "Failed to send" })
      }

      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))
    }

    const now = new Date().toISOString()

    await supabase
      .from("campaigns")
      .update({ status: "sent", sent_at: now, updated_at: now })
      .eq("id", campaignId)
      .eq("user_id", user.id)

    await supabase
      .from("campaign_recipients")
      .update({ status: "sent", sent_at: now })
      .eq("campaign_id", campaignId)

    const { data: profile } = await supabase.from("profiles").select("sms_credits").eq("id", user.id).single()

    if (profile) {
      const remaining = Math.max(0, (profile.sms_credits || 0) - sent)
      await supabase
        .from("profiles")
        .update({ sms_credits: remaining, updated_at: now })
        .eq("id", user.id)
    }

    return NextResponse.json({ success: true, sent, failed, errors })
  } catch (err: any) {
    console.error("SMS/WhatsApp campaign send error:", err)
    return NextResponse.json({ error: err.message ?? "Unexpected error" }, { status: 500 })
  }
}
