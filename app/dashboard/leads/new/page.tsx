import { redirect } from "next/navigation"
import { LeadForm } from "@/components/dashboard/lead-form"
import { getServerUser } from "@/lib/firebase/server-auth"

export default async function NewLeadPage() {
  const decodedUser = await getServerUser()

  if (!decodedUser) {
    redirect("/auth/login")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Lead</h1>
        <p className="text-muted-foreground">Enter the lead&apos;s information below</p>
      </div>
      <LeadForm userId={decodedUser.uid} />
    </div>
  )
}
