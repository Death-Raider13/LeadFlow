"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [profile, setProfile] = useState<{ full_name: string; company_name: string } | null>(null)

  const [integrationsLoading, setIntegrationsLoading] = useState(false)
  const [integrationsSuccess, setIntegrationsSuccess] = useState(false)
  const [integrationsError, setIntegrationsError] = useState<string | null>(null)
  const [hasWhatsApp, setHasWhatsApp] = useState(false)
  const [hasGmail, setHasGmail] = useState(false)

  const [ultraInstanceId, setUltraInstanceId] = useState("")
  const [ultraToken, setUltraToken] = useState("")
  const [gmailAddress, setGmailAddress] = useState("")
  const [gmailAppPassword, setGmailAppPassword] = useState("")

  const [testingWhatsApp, setTestingWhatsApp] = useState(false)
  const [testingGmail, setTestingGmail] = useState(false)
  const [whatsAppTestMessage, setWhatsAppTestMessage] = useState<string | null>(null)
  const [gmailTestMessage, setGmailTestMessage] = useState<string | null>(null)
  const [whatsAppTestError, setWhatsAppTestError] = useState<string | null>(null)
  const [gmailTestError, setGmailTestError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase.from("profiles").select("full_name, company_name").eq("id", user.id).single()
        setProfile(data)
      }
    }

    const fetchIntegrationsStatus = async () => {
      try {
        setIntegrationsLoading(true)
        setIntegrationsError(null)
        const res = await fetch("/api/integrations/credentials")
        if (!res.ok) {
          return
        }
        const data = await res.json()
        setHasWhatsApp(!!data.hasWhatsApp)
        setHasGmail(!!data.hasGmail)
      } finally {
        setIntegrationsLoading(false)
      }
    }

    fetchProfile()
    fetchIntegrationsStatus()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from("profiles")
        .update({
          full_name: formData.get("full_name") as string,
          company_name: formData.get("company_name") as string,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      setSuccess(true)
    }

    setIsLoading(false)
  }

  const handleIntegrationsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIntegrationsLoading(true)
    setIntegrationsSuccess(false)
    setIntegrationsError(null)

    try {
      const body: any = {}
      if (ultraInstanceId) body.ultramsgInstanceId = ultraInstanceId
      if (ultraToken) body.ultramsgToken = ultraToken
      if (gmailAddress) body.gmailAddress = gmailAddress
      if (gmailAppPassword) body.gmailAppPassword = gmailAppPassword

      const res = await fetch("/api/integrations/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        setIntegrationsError(data.error || "Failed to save credentials")
      } else {
        setIntegrationsSuccess(true)
        setHasWhatsApp(!!(ultraInstanceId && ultraToken))
        setHasGmail(!!(gmailAddress && gmailAppPassword))
        setUltraInstanceId("")
        setUltraToken("")
        setGmailAddress("")
        setGmailAppPassword("")
      }
    } catch (err: any) {
      setIntegrationsError(err.message || "Unexpected error")
    } finally {
      setIntegrationsLoading(false)
    }
  }

  const handleTestWhatsApp = async () => {
    setTestingWhatsApp(true)
    setWhatsAppTestMessage(null)
    setWhatsAppTestError(null)

    try {
      const res = await fetch("/api/integrations/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "whatsapp" }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setWhatsAppTestError(data.error || "Failed to test WhatsApp connection")
      } else {
        setWhatsAppTestMessage(data.message || "WhatsApp credentials look good.")
      }
    } catch (err: any) {
      setWhatsAppTestError(err.message || "Unexpected error while testing WhatsApp")
    } finally {
      setTestingWhatsApp(false)
    }
  }

  const handleTestGmail = async () => {
    setTestingGmail(true)
    setGmailTestMessage(null)
    setGmailTestError(null)

    try {
      const res = await fetch("/api/integrations/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "gmail" }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setGmailTestError(data.error || "Failed to test Gmail connection")
      } else {
        setGmailTestMessage(data.message || "Gmail SMTP connection verified.")
      }
    } catch (err: any) {
      setGmailTestError(err.message || "Unexpected error while testing Gmail")
    } finally {
      setTestingGmail(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input id="full_name" name="full_name" defaultValue={profile?.full_name || ""} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                name="company_name"
                defaultValue={profile?.company_name || ""}
                placeholder="Your company"
              />
            </div>
            {success && (
              <p className="text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg">Profile updated successfully</p>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Messaging &amp; Email Integrations</CardTitle>
          <CardDescription>
            Connect your own UltraMsg WhatsApp and Gmail SMTP accounts. We encrypt everything with a per-user key
            and a master key so only the backend can use these credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>WhatsApp (UltraMsg):</strong> Create an instance in UltraMsg, copy the <strong>Instance ID</strong> and
              <strong> Token</strong>, then paste them below. Messages will be sent from your own WhatsApp number.
            </p>
            <p>
              <strong>Gmail SMTP:</strong> Enable 2FA on your Gmail account, create an <strong>App Password</strong> in your
              Google account security settings, and paste that password here (not your normal login password).
            </p>
          </div>

          <form onSubmit={handleIntegrationsSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ultra_instance">UltraMsg Instance ID</Label>
                <Input
                  id="ultra_instance"
                  value={ultraInstanceId}
                  onChange={(e) => setUltraInstanceId(e.target.value)}
                  placeholder="e.g. instance12345"
                  autoComplete="off"
                />
                <p className="text-xs text-muted-foreground">
                  Status: {integrationsLoading ? "Checking..." : hasWhatsApp ? "Connected" : "Not connected"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ultra_token">UltraMsg Token</Label>
                <Input
                  id="ultra_token"
                  type="password"
                  value={ultraToken}
                  onChange={(e) => setUltraToken(e.target.value)}
                  placeholder="Paste your UltraMsg token"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button type="button" variant="outline" size="sm" onClick={handleTestWhatsApp} disabled={testingWhatsApp}>
                {testingWhatsApp ? "Testing WhatsApp..." : "Test WhatsApp connection"}
              </Button>
              {whatsAppTestError && (
                <p className="text-xs text-destructive bg-destructive/10 p-2 rounded-md">{whatsAppTestError}</p>
              )}
              {whatsAppTestMessage && (
                <p className="text-xs text-emerald-600 bg-emerald-50 p-2 rounded-md">{whatsAppTestMessage}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="gmail_address">Gmail Address</Label>
                <Input
                  id="gmail_address"
                  type="email"
                  value={gmailAddress}
                  onChange={(e) => setGmailAddress(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="off"
                />
                <p className="text-xs text-muted-foreground">
                  Status: {integrationsLoading ? "Checking..." : hasGmail ? "Connected" : "Not connected"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gmail_app_password">Gmail App Password</Label>
                <Input
                  id="gmail_app_password"
                  type="password"
                  value={gmailAppPassword}
                  onChange={(e) => setGmailAppPassword(e.target.value)}
                  placeholder="16-character App Password"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button type="button" variant="outline" size="sm" onClick={handleTestGmail} disabled={testingGmail}>
                {testingGmail ? "Testing Gmail..." : "Test Gmail connection"}
              </Button>
              {gmailTestError && (
                <p className="text-xs text-destructive bg-destructive/10 p-2 rounded-md">{gmailTestError}</p>
              )}
              {gmailTestMessage && (
                <p className="text-xs text-emerald-600 bg-emerald-50 p-2 rounded-md">{gmailTestMessage}</p>
              )}
            </div>

            {integrationsError && (
              <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{integrationsError}</p>
            )}
            {integrationsSuccess && (
              <p className="text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg">
                Integrations saved. We will use your encrypted credentials only from the backend when sending campaigns.
              </p>
            )}

            <Button type="submit" disabled={integrationsLoading}>
              {integrationsLoading ? "Saving..." : "Save Integrations"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
