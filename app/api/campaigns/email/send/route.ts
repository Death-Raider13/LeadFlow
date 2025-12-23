import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { createClient } from "@/lib/supabase/server"
import { decryptWithKey, unwrapUserKey } from "@/lib/encryption"

interface SendCampaignBody {
  campaignId: string
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
      .eq("type", "email")
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

    const recipients = (recipientsData || []).filter((r: any) => r.leads && r.leads.email)

    if (recipients.length === 0) {
      return NextResponse.json({ error: "No recipients with email" }, { status: 400 })
    }

    const THROTTLE_LIMIT = 10
    const windowMs = 30 * 60 * 1000
    const windowStart = new Date(Date.now() - windowMs).toISOString()

    const { data: recentCampaigns } = await supabase
      .from("campaigns")
      .select("id")
      .eq("user_id", user.id)
      .eq("type", "email")
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
          error: "Email rate limit reached",
          message: `To protect your account, you can send up to ${THROTTLE_LIMIT} emails every 30 minutes. You have already sent ${recentCount} in the last 30 minutes. Please wait a bit or reduce the number of recipients.`,
        },
        { status: 429 },
      )
    }

    const { data: integration, error: integrationError } = await supabase
      .from("user_integrations")
      .select("user_key_enc, gmail_address_enc, gmail_app_password_enc")
      .eq("user_id", user.id)
      .single()

    if (integrationError || !integration) {
      return NextResponse.json({ error: "Email integration not configured" }, { status: 400 })
    }

    const userKeyBase64 = unwrapUserKey(integration.user_key_enc)
    const gmailAddress = decryptWithKey(userKeyBase64, integration.gmail_address_enc)
    const gmailAppPassword = decryptWithKey(userKeyBase64, integration.gmail_app_password_enc)

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailAddress,
        pass: gmailAppPassword,
      },
    })

    let sent = 0
    let failed = 0
    const errors: { email: string; error: string }[] = []

    for (const r of recipients) {
      const lead = r.leads
      const recipientEmail = lead.email as string
      const recipientName = lead.name || recipientEmail

      const subject = (campaign.subject || "").replace(/{name}/g, recipientName).replace(/{business_name}/g, recipientName)

      const htmlContent = (campaign.content || "").replace(/{name}/g, recipientName).replace(/{business_name}/g, recipientName)

      try {
        await transporter.sendMail({
          from: gmailAddress,
          to: recipientEmail,
          subject,
          html: htmlContent,
        })
        sent++
      } catch (err: any) {
        failed++
        errors.push({ email: recipientEmail, error: err.message || "Failed to send" })
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

    const { data: profile } = await supabase.from("profiles").select("email_credits").eq("id", user.id).single()

    if (profile) {
      const remaining = Math.max(0, (profile.email_credits || 0) - sent)
      await supabase
        .from("profiles")
        .update({ email_credits: remaining, updated_at: now })
        .eq("id", user.id)
    }

    return NextResponse.json({ success: true, sent, failed, errors })
  } catch (err: any) {
    console.error("Email campaign send error:", err)
    return NextResponse.json({ error: err.message ?? "Unexpected error" }, { status: 500 })
  }
}
