import { LeadsList } from "@/components/dashboard/leads-list"
import { Button } from "@/components/ui/button"
import { Plus, Upload } from "lucide-react"
import Link from "next/link"
import { firebaseAdminDb } from "@/lib/firebase/admin"
import { getServerUser } from "@/lib/firebase/server-auth"
import { serializeFirestoreData } from "@/lib/utils/serialization"

export default async function LeadsPage() {
  const decodedUser = await getServerUser()

  if (!decodedUser) {
    return null
  }

  const userId = decodedUser.uid
  let leads: any[] = []
  let queryError: string | null = null

  try {
    const leadsSnap = await firebaseAdminDb
      .collection("leads")
      .where("user_id", "==", userId)
      .orderBy("created_at", "desc")
      .get()

    const leadsData = leadsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    leads = serializeFirestoreData(leadsData)
  } catch (error: any) {
    console.error("Error fetching leads:", error)
    queryError = error?.message || "Failed to load leads"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Leads</h1>
          <p className="text-muted-foreground">Manage and organize your leads</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard/leads/import">
              <Upload className="mr-2 h-4 w-4" />
              Import CSV
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/leads/generator">
              <Plus className="mr-2 h-4 w-4" />
              Generate Leads
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/leads/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Lead
            </Link>
          </Button>
        </div>
      </div>

      {queryError && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          <p className="font-medium">Error loading leads</p>
          <p className="mt-1 text-xs opacity-80">{queryError}</p>
          {queryError.includes("index") && (
            <p className="mt-2 text-xs text-primary font-medium">
              This query requires a composite index. Check your server logs or Firebase console to create it.
            </p>
          )}
        </div>
      )}

      <LeadsList initialLeads={leads || []} />
    </div>
  )
}
