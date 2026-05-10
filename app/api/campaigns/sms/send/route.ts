import { NextRequest, NextResponse } from "next/server"
import { getServerUser } from "@/lib/firebase/server-auth"
import { firebaseAdminDb } from "@/lib/firebase/admin"
import { Timestamp } from "firebase-admin/firestore"
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

    const user = await getServerUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch campaign from Firestore
    const campaignSnap = await firebaseAdminDb.collection("campaigns").doc(campaignId).get()

    if (!campaignSnap.exists) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    const campaign = campaignSnap.data() as any

    // Verify campaign belongs to user and is SMS type
    if (campaign?.user_id !== user.uid || campaign?.type !== "sms") {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    // Fetch campaign recipients with leads data
    const recipientsSnap = await firebaseAdminDb
      .collection("campaign_recipients")
      .where("campaign_id", "==", campaignId)
      .get()

    const recipients = []
    for (const recipientDoc of recipientsSnap.docs) {
      const recipientData = recipientDoc.data() as any
      const leadSnap = await firebaseAdminDb.collection("leads").doc(recipientData.lead_id).get()

      if (leadSnap.exists) {
        const leadData = leadSnap.data() as any
        if (leadData?.phone) {
          recipients.push({
            id: recipientDoc.id,
            ...recipientData,
            leads: leadData,
          })
        }
      }
    }

    if (recipients.length === 0) {
      return NextResponse.json({ error: "No recipients with phone numbers" }, { status: 400 })
    }

    // Throttle check: count SMS sent in last 30 minutes
    const THROTTLE_LIMIT = 10
    const windowMs = 30 * 60 * 1000
    const windowStart = new Date(Date.now() - windowMs)

    const recentCampaignsSnap = await firebaseAdminDb
      .collection("campaigns")
      .where("user_id", "==", user.uid)
      .where("type", "==", "sms")
      .where("sent_at", ">=", Timestamp.fromDate(windowStart))
      .get()

    let recentCount = 0
    if (recentCampaignsSnap.docs.length > 0) {
      const recentCampaignIds = recentCampaignsSnap.docs.map((doc) => doc.id)

      const recentRecipientsSnap = await firebaseAdminDb
        .collection("campaign_recipients")
        .where("campaign_id", "in", recentCampaignIds)
        .where("sent_at", ">=", Timestamp.fromDate(windowStart))
        .get()
      recentCount = recentRecipientsSnap.docs.length
    }

    if (recentCount + recipients.length > THROTTLE_LIMIT) {
      return NextResponse.json(
        {
          error: "WhatsApp rate limit reached",
          message: `To protect your number, you can send up to ${THROTTLE_LIMIT} WhatsApp messages every 30 minutes. You have already sent ${recentCount} in the last 30 minutes. Please wait a bit or reduce the number of recipients.`,
        },
        { status: 429 },
      )
    }

    // Fetch user integration for WhatsApp credentials
    const integrationsSnap = await firebaseAdminDb
      .collection("user_integrations")
      .where("user_id", "==", user.uid)
      .get()

    if (integrationsSnap.docs.length === 0) {
      return NextResponse.json({ error: "WhatsApp integration not configured" }, { status: 400 })
    }

    const integration = integrationsSnap.docs[0].data()

    const userKeyBase64 = unwrapUserKey(integration.user_key_enc)
    const instanceId = decryptWithKey(userKeyBase64, integration.ultramsg_instance_enc)
    const token = decryptWithKey(userKeyBase64, integration.ultramsg_token_enc)

    let sent = 0
    let failed = 0
    const errors: { phone: string; error: string }[] = []

    for (const r of recipients) {
      const lead = r.leads as any
      const recipientPhone = lead?.phone as string
      const recipientName = lead?.name || recipientPhone

      const message = (campaign?.content || "").replace(/{name}/g, recipientName).replace(/{business_name}/g, recipientName)

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

    const now = Timestamp.now()

    // Update campaign status
    await firebaseAdminDb.collection("campaigns").doc(campaignId).update({
      status: "sent",
      sent_at: now,
      updated_at: now,
    })

    // Batch update all campaign_recipients
    const batch = firebaseAdminDb.batch()
    for (const recipient of recipients) {
      batch.update(firebaseAdminDb.collection("campaign_recipients").doc(recipient.id), {
        status: "sent",
        sent_at: now,
      })
    }
    await batch.commit()

    // Update user profile credits
    const profileSnap = await firebaseAdminDb.collection("profiles").doc(user.uid).get()

    if (profileSnap.exists) {
      const profile = profileSnap.data() as any
      const remaining = Math.max(0, (profile?.sms_credits || 0) - sent)
      await firebaseAdminDb.collection("profiles").doc(user.uid).update({
        sms_credits: remaining,
        updated_at: now,
      })
    }

    return NextResponse.json({ success: true, sent, failed, errors })
  } catch (err: any) {
    console.error("SMS/WhatsApp campaign send error:", err)
    return NextResponse.json({ error: err.message ?? "Unexpected error" }, { status: 500 })
  }
}
