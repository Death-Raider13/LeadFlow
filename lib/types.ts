export interface Lead {
  id: string
  user_id: string
  name: string
  email: string | null
  phone: string | null
  source: string | null
  status: "new" | "contacted" | "qualified" | "converted" | "lost"
  tags: string[]
  notes: string | null
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Campaign {
  id: string
  user_id: string
  name: string
  type: "email" | "sms"
  subject: string | null
  content: string
  status: "draft" | "scheduled" | "sent" | "cancelled"
  scheduled_at: string | null
  sent_at: string | null
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  full_name: string | null
  company_name: string | null
  subscription_plan: "free" | "starter" | "pro" | "enterprise"
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  email_credits: number
  sms_credits: number
  accepted_policy?: boolean | null
  paystack_customer_code?: string | null
  paystack_subscription_code?: string | null
  paystack_email_token?: string | null
  created_at: string
  updated_at: string
}

export interface CampaignRecipient {
  id: string
  campaign_id: string
  lead_id: string
  status: "pending" | "sent" | "delivered" | "opened" | "clicked" | "failed"
  sent_at: string | null
  opened_at: string | null
  clicked_at: string | null
  created_at: string
}
