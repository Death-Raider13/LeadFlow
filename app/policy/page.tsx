"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PolicyPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAccept = async () => {
    setIsSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/policy/accept", { method: "POST" })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setError(data.error || "Failed to record your agreement. Please try again.")
        setIsSubmitting(false)
        return
      }
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Unexpected error. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="max-w-2xl w-full shadow-lg">
        <CardHeader>
          <CardTitle>Responsible Use &amp; Anti-Spam Policy</CardTitle>
          <CardDescription>
            To use LeadFlow you must agree to use messaging responsibly and avoid spam. This helps protect your accounts
            and your leads.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            LeadFlow is a tool for reaching out to leads in a targeted and respectful way. It must not be used for
            sending bulk unsolicited messages, harassment, or any kind of abusive or illegal activity.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>No spam:</strong> You will not send mass unsolicited messages or repeatedly contact people who have
              not shown interest in your product or service.
            </li>
            <li>
              <strong>Respect limits:</strong> You will respect the sending limits shown in your plan and avoid rapid,
              high-volume campaigns that could cause your WhatsApp number or email account to be flagged or blocked.
            </li>
            <li>
              <strong>Legal compliance:</strong> You are responsible for complying with all applicable laws and
              regulations related to privacy, data protection, and electronic communications in your country and in the
              countries of your recipients.
            </li>
            <li>
              <strong>Your responsibility:</strong> LeadFlow provides tools for managing and contacting leads, but you
              are fully responsible for the content of your messages and for how often and to whom you send them.
            </li>
            <li>
              <strong>Limited liability:</strong> If your WhatsApp number, email account, or any third-party service
              (such as Gmail or UltraMsg) blocks, limits, or bans your account because of how you use LeadFlow, we are
              not responsible and will not be liable for any resulting loss, damages, or complaints.
            </li>
          </ul>
          <p>
            By clicking &quot;I Agree&quot; below, you confirm that you understand these rules and accept that misuse of the
            platform may result in the suspension of your access and/or your own accounts being restricted by external
            providers.
          </p>
          {error && <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg mt-2">{error}</p>}
          <div className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => router.push("/auth/logout")}>Log out</Button>
            <Button onClick={handleAccept} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "I Agree"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
