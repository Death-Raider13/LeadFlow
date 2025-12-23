import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { LeadForm } from "@/components/dashboard/lead-form"

function isValidUUID(str: string) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

export default async function EditLeadPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (id === "new") {
    redirect("/dashboard/leads/new")
  }

  if (!isValidUUID(id)) {
    notFound()
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: lead } = await supabase.from("leads").select("*").eq("id", id).eq("user_id", user.id).single()

  if (!lead) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Lead</h1>
        <p className="text-muted-foreground">Update the lead&apos;s information</p>
      </div>
      <LeadForm lead={lead} userId={user.id} />
    </div>
  )
}
