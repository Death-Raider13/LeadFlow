import { NextResponse, type NextRequest } from "next/server"
import { getServerUser } from "@/lib/firebase/server-auth"
import { firebaseAdminDb } from "@/lib/firebase/admin"
import { Timestamp } from "firebase-admin/firestore"

interface ImportBody {
  leads: Record<string, string>[]
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ImportBody
    if (!body || !Array.isArray(body.leads)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    const user = await getServerUser()
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
        user_id: user.uid,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      }
    })

    // Insert in batches to avoid huge single inserts
    const chunkSize = 200
    const leadsRef = firebaseAdminDb.collection("leads")

    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize)
      const batch = firebaseAdminDb.batch()

      chunk.forEach((lead) => {
        const docRef = leadsRef.doc() // Auto-generate ID
        batch.set(docRef, lead)
      })

      try {
        await batch.commit()
      } catch (error) {
        console.error("Insert error:", error)
        return NextResponse.json({ error: "Failed to import leads" }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, inserted: rows.length })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Import failed" }, { status: 500 })
  }
}
