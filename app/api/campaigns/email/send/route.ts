import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { getServerUser } from "@/lib/firebase/server-auth"
import { firebaseAdminDb } from "@/lib/firebase/admin"
import { Timestamp } from "firebase-admin/firestore"
import { decryptWithKey, unwrapUserKey } from "@/lib/encryption"
import { withValidation, sendCampaignSchema, ValidatedRequest, getValidatedData } from "@/lib/validation"

export const POST = withValidation(
  async (request: ValidatedRequest) => {
    try {
      const { body } = getValidatedData(request)
      const { campaignId } = body

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

    // Verify campaign belongs to user and is email type
    if (campaign?.user_id !== user.uid || campaign?.type !== "email") {
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
        if (leadData?.email) {
          recipients.push({
            id: recipientDoc.id,
            ...recipientData,
            leads: leadData,
          })
        }
      }
    }

    if (recipients.length === 0) {
      return NextResponse.json({ error: "No recipients with email" }, { status: 400 })
    }

    // Throttle check: count emails sent in last 30 minutes
    const THROTTLE_LIMIT = 10
    const windowMs = 30 * 60 * 1000
    const windowStart = new Date(Date.now() - windowMs)

    const recentCampaignsSnap = await firebaseAdminDb
      .collection("campaigns")
      .where("user_id", "==", user.uid)
      .where("type", "==", "email")
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
          error: "Email rate limit reached",
          message: `To protect your account, you can send up to ${THROTTLE_LIMIT} emails every 30 minutes. You have already sent ${recentCount} in the last 30 minutes. Please wait a bit or reduce the number of recipients.`,
        },
        { status: 429 },
      )
    }

    // Fetch user integration for Gmail credentials
    const integrationsSnap = await firebaseAdminDb
      .collection("user_integrations")
      .where("user_id", "==", user.uid)
      .get()

    if (integrationsSnap.docs.length === 0) {
      return NextResponse.json({ error: "Email integration not configured" }, { status: 400 })
    }

    const integration = integrationsSnap.docs[0].data()

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
      const lead = r.leads as any
      const recipientEmail = lead?.email as string
      const recipientName = lead?.name || recipientEmail

      const subject = (campaign?.subject || "").replace(/{name}/g, recipientName).replace(/{business_name}/g, recipientName)

      const htmlContent = (campaign?.content || "").replace(/{name}/g, recipientName).replace(/{business_name}/g, recipientName)

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
      const remaining = Math.max(0, (profile?.email_credits || 0) - sent)
      await firebaseAdminDb.collection("profiles").doc(user.uid).update({
        email_credits: remaining,
        updated_at: now,
      })
    }

    return NextResponse.json({ success: true, sent, failed, errors })
  } catch (err: any) {
    console.error("Email campaign send error:", err)
    return NextResponse.json({ error: err.message ?? "Unexpected error" }, { status: 500 })
  }
}, {
  bodySchema: sendCampaignSchema,
  validateHeaders: true,
})
