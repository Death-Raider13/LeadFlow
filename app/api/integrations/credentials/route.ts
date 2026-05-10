import { NextRequest, NextResponse } from "next/server"
import { getServerUser } from "@/lib/firebase/server-auth"
import { firebaseAdminDb } from "@/lib/firebase/admin"
import { Timestamp } from "firebase-admin/firestore"
import { decryptWithKey, encryptWithKey, generateRandomKey, unwrapUserKey, wrapUserKey } from "@/lib/encryption"
import { withValidation, credentialsSchema, ValidatedRequest, getValidatedData } from "@/lib/validation"

export async function GET() {
  try {
    const user = await getServerUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const integrationsSnap = await firebaseAdminDb
      .collection("user_integrations")
      .where("user_id", "==", user.uid)
      .limit(1)
      .get()

    const data = integrationsSnap.docs.length > 0 ? integrationsSnap.docs[0].data() : null

    const hasWhatsApp = !!(data && data.ultramsg_instance_enc && data.ultramsg_token_enc)
    const hasGmail = !!(data && data.gmail_address_enc && data.gmail_app_password_enc)

    return NextResponse.json({ hasWhatsApp, hasGmail })
  } catch (err: any) {
    console.error("Integrations GET error:", err)
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 })
  }
}

export const POST = withValidation(
  async (request: ValidatedRequest) => {
    try {
      const { body } = getValidatedData(request)
      const { ultramsgInstanceId, ultramsgToken, gmailAddress, gmailAppPassword } = body

    const user = await getServerUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user already has integrations
    const integrationsSnap = await firebaseAdminDb
      .collection("user_integrations")
      .where("user_id", "==", user.uid)
      .limit(1)
      .get()

    const existing = integrationsSnap.docs.length > 0 ? integrationsSnap.docs[0].data() : null
    const existingDocId = integrationsSnap.docs.length > 0 ? integrationsSnap.docs[0].id : null

    let userKeyBase64: string
    let wrappedUserKeyPayload: any

    if (existing && existing.user_key_enc) {
      userKeyBase64 = unwrapUserKey(existing.user_key_enc)
      wrappedUserKeyPayload = existing.user_key_enc
    } else {
      userKeyBase64 = generateRandomKey()
      wrappedUserKeyPayload = wrapUserKey(userKeyBase64)
    }

    const payload: any = {
      user_id: user.uid,
      user_key_enc: wrappedUserKeyPayload,
      updated_at: Timestamp.now(),
    }

    if (ultramsgInstanceId) {
      payload.ultramsg_instance_enc = encryptWithKey(userKeyBase64, ultramsgInstanceId)
    }
    if (ultramsgToken) {
      payload.ultramsg_token_enc = encryptWithKey(userKeyBase64, ultramsgToken)
    }
    if (gmailAddress) {
      payload.gmail_address_enc = encryptWithKey(userKeyBase64, gmailAddress)
    }
    if (gmailAppPassword) {
      payload.gmail_app_password_enc = encryptWithKey(userKeyBase64, gmailAppPassword)
    }

    if (!existing) {
      payload.created_at = Timestamp.now()
      // Create new document
      await firebaseAdminDb.collection("user_integrations").add(payload)
    } else {
      // Update existing document
      await firebaseAdminDb.collection("user_integrations").doc(existingDocId!).update(payload)
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("Integrations POST error:", err)
    return NextResponse.json({ error: err.message ?? "Unexpected error" }, { status: 500 })
  }
}, {
  bodySchema: credentialsSchema,
  validateHeaders: true,
})
