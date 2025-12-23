export interface Plan {
  id: string
  name: string
  description: string
  priceMonthly: number
  priceYearly: number
  features: string[]
  emailCredits: number
  smsCredits: number
  leadLimit: number | null
  paystackPlanCodes?: {
    monthly?: string
    yearly?: string
  }
  highlighted?: boolean
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for getting started",
    priceMonthly: 0,
    priceYearly: 0,
    emailCredits: 50,
    smsCredits: 20,
    leadLimit: 100,
    features: [
      "Up to 100 leads/month",
      "50 emails/month",
      "20 WhatsApp messages/month",
      "Basic analytics",
      "Lead capture forms",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    description: "For growing businesses",
    // NGN 5,000/month, yearly with ~20% discount (12 * 5000 * 0.8 = 48,000)
    priceMonthly: 5000,
    priceYearly: 48000,
    emailCredits: 300,
    smsCredits: 150,
    leadLimit: 1000,
    paystackPlanCodes: {
      monthly: "PLN_0qpdsze9g1wyx8n", // replace with your real Paystack plan code
      yearly: "PLN_zom6by8dep9kce3", // replace with your real Paystack plan code
    },
    features: [
      "Up to 1,000 leads/month",
      "300 emails/month",
      "150 WhatsApp messages/month",
      "Advanced analytics",
      "CSV import/export",
      "Email templates",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For scaling teams",
    // NGN 10,000/month, yearly with ~20% discount (12 * 10000 * 0.8 = 96,000)
    priceMonthly: 10000,
    priceYearly: 96000,
    emailCredits: 500,
    smsCredits: 500,
    leadLimit: null,
    paystackPlanCodes: {
      monthly: "PLN_wzel3treojqbl04", // replace with your real Paystack plan code
      yearly: "PLN_1ezppnexsor12t2", // replace with your real Paystack plan code
    },
    highlighted: true,
    features: [
      "Unlimited leads generation",
      "500 emails/month",
      "500 WhatsApp messages/month",
      "Priority support",
      "Custom branding",
      "API access",
      "Team collaboration",
    ],
  },
]
