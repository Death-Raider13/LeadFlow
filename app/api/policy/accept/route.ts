import { NextRequest, NextResponse } from "next/server"
import { getServerUser } from "@/lib/firebase/server-auth"
import { firebaseAdminDb } from "@/lib/firebase/admin"

export async function POST(_request: NextRequest) {
  try {
    const decodedUser = await getServerUser()

    if (!decodedUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = decodedUser.uid

    try {
      const profileRef = firebaseAdminDb.collection("profiles").doc(userId)
      await profileRef.set(
        {
          accepted_policy: true,
          updated_at: new Date().toISOString(),
        },
        { merge: true },
      )
    } catch (error) {
      console.error("Error updating accepted_policy:", error)
      return NextResponse.json({ error: "Failed to accept policy" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("Policy accept error:", err)
    return NextResponse.json({ error: err.message ?? "Unexpected error" }, { status: 500 })
  }
}
