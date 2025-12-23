import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

interface ImportBody {
  leads: Record<string, string>[]
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ImportBody
    if (!body || !Array.isArray(body.leads)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    // Map incoming rows to expected lead fields.
    // Build `name` from common CSV headers: `name`, `full_name`, or `first_name` + `last_name`.
    const rows = body.leads.map((r) => {
      const first = (r.first_name || r.first || "").trim()
      const last = (r.last_name || r.last || "").trim()
      const nameFromParts = [first, last].filter(Boolean).join(" ")
      const name = (r.name || r.full_name || nameFromParts || "").trim() || "Unknown"

      return {
        name,
        email: (r.email || r.email_address || null) as string | null,
        phone: (r.phone || r.mobile || r.phone_number || null) as string | null,
        source: (r.source || r.company || null) as string | null,
        status: ((r.status as any) || "new") as string,
        notes: (r.notes || r.note || null) as string | null,
        user_id: user.id,
      }
    })

    // Insert in batches to avoid huge single inserts
    const chunkSize = 200
    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize)
      const { error } = await supabase.from("leads").insert(chunk)
      if (error) {
        console.error("Insert error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, inserted: rows.length })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Import failed" }, { status: 500 })
  }
}
