import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { createClient } from "@/lib/supabase/server"
import { decryptWithKey, unwrapUserKey } from "@/lib/encryption"

interface TestBody {
  type: "gmail" | "whatsapp"
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TestBody

    if (!body?.type || (body.type !== "gmail" && body.type !== "whatsapp")) {
      return NextResponse.json({ error: "type must be 'gmail' or 'whatsapp'" }, { status: 400 })
    }

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: integration, error } = await supabase
      .from("user_integrations")
      .select("user_key_enc, gmail_address_enc, gmail_app_password_enc, ultramsg_instance_enc, ultramsg_token_enc")
      .eq("user_id", user.id)
      .single()

    if (error || !integration) {
      return NextResponse.json({ error: "Integrations not configured" }, { status: 400 })
    }

    const userKeyBase64 = unwrapUserKey(integration.user_key_enc)

    if (body.type === "gmail") {
      if (!integration.gmail_address_enc || !integration.gmail_app_password_enc) {
        return NextResponse.json({ error: "Gmail credentials not configured" }, { status: 400 })
      }

      const gmailAddress = decryptWithKey(userKeyBase64, integration.gmail_address_enc)
      const gmailAppPassword = decryptWithKey(userKeyBase64, integration.gmail_app_password_enc)

      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: gmailAddress, pass: gmailAppPassword },
        })

        await transporter.verify()

        return NextResponse.json({ success: true, message: "Gmail SMTP connection verified." })
      } catch (err: any) {
        return NextResponse.json(
          { error: err.message || "Failed to verify Gmail SMTP connection" },
          { status: 400 },
        )
      }
    }

    // WhatsApp (UltraMsg) test: we verify that credentials are present and decrypt correctly.
    if (!integration.ultramsg_instance_enc || !integration.ultramsg_token_enc) {
      return NextResponse.json({ error: "WhatsApp (UltraMsg) credentials not configured" }, { status: 400 })
    }

    const instanceId = decryptWithKey(userKeyBase64, integration.ultramsg_instance_enc)
    const token = decryptWithKey(userKeyBase64, integration.ultramsg_token_enc)

    if (!instanceId || !token) {
      return NextResponse.json({ error: "Failed to decrypt UltraMsg credentials" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message:
        "UltraMsg credentials are stored and decrypt correctly. Actual sending still depends on your UltraMsg instance status.",
    })
  } catch (err: any) {
    console.error("Integrations test error:", err)
    return NextResponse.json({ error: err.message ?? "Unexpected error" }, { status: 500 })
  }
}
