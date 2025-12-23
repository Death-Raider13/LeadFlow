import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Mail, MessageSquare, TrendingUp, Plus, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch stats
  const { count: leadsCount } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user?.id)

  const { count: emailCampaigns } = await supabase
    .from("campaigns")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user?.id)
    .eq("type", "email")

  const { count: smsCampaigns } = await supabase
    .from("campaigns")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user?.id)
    .eq("type", "sms")

  const { data: recentLeads } = await supabase
    .from("leads")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })
    .limit(5)

  const stats = [
    { name: "Total Leads", value: leadsCount || 0, icon: Users, change: "+12%" },
    { name: "Email Campaigns", value: emailCampaigns || 0, icon: Mail, change: "+5%" },
    { name: "Whatsapp Campaigns", value: smsCampaigns || 0, icon: MessageSquare, change: "+8%" },
    { name: "Conversion Rate", value: "24%", icon: TrendingUp, change: "+3%" },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/dashboard/leads/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard/campaigns/email/new">
            <Mail className="mr-2 h-4 w-4" />
            New Email Campaign
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard/campaigns/sms/new">
            <MessageSquare className="mr-2 h-4 w-4" />
            New SMS Campaign
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Leads</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/leads">View all</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentLeads && recentLeads.length > 0 ? (
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.email || lead.phone || "No contact"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize
                      ${lead.status === "new" ? "bg-blue-100 text-blue-700" : ""}
                      ${lead.status === "contacted" ? "bg-yellow-100 text-yellow-700" : ""}
                      ${lead.status === "qualified" ? "bg-emerald-100 text-emerald-700" : ""}
                      ${lead.status === "converted" ? "bg-primary/10 text-primary" : ""}
                      ${lead.status === "lost" ? "bg-muted text-muted-foreground" : ""}
                    `}
                    >
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No leads yet</p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/leads/new">Add your first lead</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
