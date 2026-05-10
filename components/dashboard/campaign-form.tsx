"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { firebaseAuth, firebaseDb } from "@/lib/firebase/client"
import { collection, query, where, getDocs, setDoc, doc, updateDoc, writeBatch, orderBy } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import type { Campaign, Lead } from "@/lib/types"
import { Users, Mail, MessageSquare } from "lucide-react"

interface CampaignFormProps {
  type: "email" | "sms"
  campaign?: Campaign
  userId: string // Accept userId from server component
}

export function CampaignForm({ type, campaign, userId }: CampaignFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchLeads = async () => {
      let q = query(collection(firebaseDb, "leads"), where("user_id", "==", userId))
      if (type === "email") {
        q = query(q, where("email", "!=", null))
      } else {
        q = query(q, where("phone", "!=", null))
      }
      q = query(q, orderBy("name"))
      const snap = await getDocs(q)
      setLeads(snap.docs.map((d) => ({ id: d.id, ...d.data() })) || [])
    }
    fetchLeads()
  }, [type, userId])

  const toggleLead = (leadId: string) => {
    setSelectedLeads((prev) => (prev.includes(leadId) ? prev.filter((id) => id !== leadId) : [...prev, leadId]))
  }

  const toggleAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(leads.map((lead) => lead.id))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const campaignData = {
      name: formData.get("name") as string,
      type,
      subject: type === "email" ? (formData.get("subject") as string) : null,
      content: formData.get("content") as string,
      status: "draft" as const,
      user_id: userId,
      updated_at: new Date().toISOString(),
    }

    try {
      let campaignId = campaign?.id
      if (campaign) {
        await updateDoc(doc(firebaseDb, "campaigns", campaign.id), campaignData)
      } else {
        campaignId = crypto.randomUUID()
        await setDoc(doc(firebaseDb, "campaigns", campaignId), {
          ...campaignData,
          created_at: new Date().toISOString(),
        })
        // Add recipients
        if (selectedLeads.length > 0) {
          const batch = writeBatch(firebaseDb)
          selectedLeads.forEach((leadId) => {
            const recRef = doc(firebaseDb, "campaign_recipients", crypto.randomUUID())
            batch.set(recRef, {
              campaign_id: campaignId,
              lead_id: leadId,
              status: "pending",
              created_at: new Date().toISOString(),
            })
          })
          await batch.commit()
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to save campaign.")
      setIsLoading(false)
      return
    }

    router.push(`/dashboard/campaigns/${type}`)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {type === "email" ? <Mail className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
            Campaign Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name *</Label>
            <Input
              id="name"
              name="name"
              required
              defaultValue={campaign?.name}
              placeholder="e.g., Summer Sale Announcement"
            />
          </div>

          {type === "email" && (
            <div className="space-y-2">
              <Label htmlFor="subject">Email Subject *</Label>
              <Input
                id="subject"
                name="subject"
                required
                defaultValue={campaign?.subject || ""}
                placeholder="e.g., Don't miss our exclusive offer!"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="content">{type === "email" ? "Email Content" : "Message"} *</Label>
            <Textarea
              id="content"
              name="content"
              required
              defaultValue={campaign?.content}
              placeholder={
                type === "email"
                  ? "Write your email content here..."
                  : "Write your WhatsApp message here..."
              }
              rows={type === "email" ? 10 : 4}
              maxLength={type === "sms" ? 320 : undefined}
            />
            {type === "sms" && (
              <p className="text-xs text-muted-foreground">
                WhatsApp campaigns are sent via UltraMsg using your own WhatsApp account.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {!campaign && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Select Recipients
            </CardTitle>
          </CardHeader>
          <CardContent>
            {leads.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="select-all"
                      checked={selectedLeads.length === leads.length}
                      onCheckedChange={toggleAll}
                    />
                    <Label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                      Select All ({leads.length} leads)
                    </Label>
                  </div>
                  <span className="text-sm text-muted-foreground">{selectedLeads.length} selected</span>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-2">
                  {leads.map((lead) => (
                    <div key={lead.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                      <Checkbox
                        id={lead.id}
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={() => toggleLead(lead.id)}
                      />
                      <Label htmlFor={lead.id} className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{lead.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {type === "email" ? lead.email : lead.phone}
                          </span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Users className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">
                  No leads with {type === "email" ? "email addresses" : "phone numbers"} found.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {error && <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={isLoading || (!campaign && selectedLeads.length === 0)}>
          {isLoading ? "Saving..." : campaign ? "Update Campaign" : "Create Campaign"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
