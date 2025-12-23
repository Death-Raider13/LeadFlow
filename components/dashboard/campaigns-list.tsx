"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Send,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react"
import type { Campaign } from "@/lib/types"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface CampaignsListProps {
  campaigns: Campaign[]
  type: "email" | "sms"
}

export function CampaignsList({ campaigns: initialCampaigns, type }: CampaignsListProps) {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(null)
  const { toast } = useToast()

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    const { error } = await supabase.from("campaigns").delete().eq("id", id)

    if (error) {
      toast({
        variant: "destructive",
        title: "Could not delete campaign",
        description: "Please try again in a moment.",
      })
      return
    }

    setCampaigns(campaigns.filter((c) => c.id !== id))
    toast({
      title: "Campaign deleted",
      description: "Your campaign has been removed.",
    })
  }

  const getStatusIcon = (status: Campaign["status"]) => {
    switch (status) {
      case "draft":
        return <FileText className="h-4 w-4" />
      case "scheduled":
        return <Clock className="h-4 w-4" />
      case "sent":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "draft":
        return "bg-muted text-muted-foreground"
      case "scheduled":
        return "bg-yellow-100 text-yellow-700"
      case "sent":
        return "bg-emerald-100 text-emerald-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
    }
  }

  return (
    <div className="space-y-4">
      {campaigns.length > 0 ? (
        <div className="grid gap-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg ${type === "email" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}
                    >
                      {type === "email" ? <Mail className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
                    </div>
                    <div>
                      <h3 className="font-semibold">{campaign.name}</h3>
                      {campaign.subject && <p className="text-sm text-muted-foreground">Subject: {campaign.subject}</p>}
                      <p className="text-xs text-muted-foreground mt-1">
                        Created {new Date(campaign.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(campaign.status)}`}
                    >
                      {getStatusIcon(campaign.status)}
                      {campaign.status}
                    </span>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/campaigns/${type}/${campaign.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        {campaign.status === "draft" && (
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/campaigns/${type}/${campaign.id}/send`}>
                              <Send className="mr-2 h-4 w-4" />
                              Send Campaign
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => setCampaignToDelete(campaign)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            {type === "email" ? (
              <Mail className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            ) : (
              <MessageSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            )}
            <p className="text-muted-foreground mb-4">No {type} campaigns yet</p>
            <Button asChild>
              <Link href={`/dashboard/campaigns/${type}/new`}>Create your first campaign</Link>
            </Button>
          </CardContent>
        </Card>
      )}
      <Dialog open={!!campaignToDelete} onOpenChange={(open) => !open && setCampaignToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete campaign?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. This will permanently delete
            {" "}
            <span className="font-medium">{campaignToDelete?.name}</span> and all of its data.
          </p>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setCampaignToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={async () => {
                if (!campaignToDelete) return
                await handleDelete(campaignToDelete.id)
                setCampaignToDelete(null)
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
