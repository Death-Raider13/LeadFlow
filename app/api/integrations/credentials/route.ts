import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { decryptWithKey, encryptWithKey, generateRandomKey, unwrapUserKey, wrapUserKey } from "@/lib/encryption"

interface CredentialsBody {
  ultramsgInstanceId?: string
  ultramsgToken?: string
  gmailAddress?: string
  gmailAppPassword?: string
}

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("user_integrations")
      .select("ultramsg_instance_enc, ultramsg_token_enc, gmail_address_enc, gmail_app_password_enc")
      .eq("user_id", user.id)
      .single()

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching user_integrations:", error)
      return NextResponse.json({ error: "Failed to load integration status" }, { status: 500 })
    }

    const hasWhatsApp = !!(data && data.ultramsg_instance_enc && data.ultramsg_token_enc)
    const hasGmail = !!(data && data.gmail_address_enc && data.gmail_app_password_enc)

    return NextResponse.json({ hasWhatsApp, hasGmail })
  } catch (err: any) {
    console.error("Integrations GET error:", err)
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CredentialsBody
    const { ultramsgInstanceId, ultramsgToken, gmailAddress, gmailAppPassword } = body

    if (!ultramsgInstanceId && !ultramsgToken && !gmailAddress && !gmailAppPassword) {
      return NextResponse.json({ error: "No credentials provided" }, { status: 400 })
    }

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: existing } = await supabase
      .from("user_integrations")
      .select("user_key_enc, ultramsg_instance_enc, ultramsg_token_enc, gmail_address_enc, gmail_app_password_enc")
      .eq("user_id", user.id)
      .maybeSingle()

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
      user_id: user.id,
      user_key_enc: wrappedUserKeyPayload,
      updated_at: new Date().toISOString(),
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
      payload.created_at = new Date().toISOString()
    }

    const { error } = await supabase.from("user_integrations").upsert(payload, { onConflict: "user_id" })

    if (error) {
      console.error("Error saving user_integrations:", error)
      return NextResponse.json({ error: "Failed to save credentials" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("Integrations POST error:", err)
    return NextResponse.json({ error: err.message ?? "Unexpected error" }, { status: 500 })
  }
}
