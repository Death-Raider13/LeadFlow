"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Users, AlertTriangle, CheckCircle, Send } from "lucide-react"
import type { Campaign, Lead } from "@/lib/types"
import Link from "next/link"

interface Recipient {
  id: string
  lead_id: string
  leads: Lead
}

interface SendCampaignProps {
  campaign: Campaign
  recipients: Recipient[]
  credits: number
  type: "email" | "sms"
}

export function SendCampaign({ campaign, recipients, credits, type }: SendCampaignProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const recipientCount = recipients.length
  const hasEnoughCredits = credits >= recipientCount

  const handleSend = async () => {
    if (!hasEnoughCredits) return

    setIsLoading(true)
    setError(null)

    try {
      const endpoint = type === "email" ? "/api/campaigns/email/send" : "/api/campaigns/sms/send"
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaignId: campaign.id }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || "Failed to send campaign")
        setIsLoading(false)
        return
      }

      setSent(true)
    } catch (err: any) {
      setError(err.message || "Unexpected error while sending campaign")
    } finally {
      setIsLoading(false)
    }
  }

  if (sent) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Campaign Sent!</h2>
          <p className="text-muted-foreground mb-6">
            Your {type} campaign has been sent to {recipientCount} recipients.
          </p>
          <Button asChild>
            <Link href={`/dashboard/campaigns/${type}`}>Back to Campaigns</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Send Campaign</h1>
        <p className="text-muted-foreground">Review and send your {type} campaign</p>
      </div>

      {/* Campaign Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {type === "email" ? <Mail className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
            {campaign.name}
          </CardTitle>
          {campaign.subject && <CardDescription>Subject: {campaign.subject}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted/50 rounded-lg text-sm whitespace-pre-wrap">{campaign.content}</div>
        </CardContent>
      </Card>

      {/* Recipients */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recipients ({recipientCount})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recipients.length > 0 ? (
            <div className="max-h-48 overflow-y-auto space-y-2">
              {recipients.map((r) => (
                <div key={r.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="font-medium">{r.leads.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {type === "email" ? r.leads.email : r.leads.phone}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No recipients selected</p>
          )}
        </CardContent>
      </Card>

      {/* Credits Check */}
      <Card className={hasEnoughCredits ? "border-emerald-200" : "border-destructive"}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {hasEnoughCredits ? (
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-destructive" />
              )}
              <div>
                <p className="font-medium">{hasEnoughCredits ? "Ready to send" : "Insufficient credits"}</p>
                <p className="text-sm text-muted-foreground">
                  Required: {recipientCount} | Available: {credits}
                </p>
              </div>
            </div>
            {!hasEnoughCredits && (
              <Button variant="outline" asChild>
                <Link href="/dashboard/billing">Upgrade Plan</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</p>}

      <div className="flex gap-3">
        <Button onClick={handleSend} disabled={isLoading || !hasEnoughCredits || recipientCount === 0}>
          {isLoading ? (
            "Sending..."
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send to {recipientCount} recipients
            </>
          )}
        </Button>
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
