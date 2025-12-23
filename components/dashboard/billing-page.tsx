"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PLANS } from "@/lib/plans"
import { Check, CreditCard, Mail, MessageSquare, Zap } from "lucide-react"
import type { Profile } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface BillingPageProps {
  profile: Profile | null
  userEmail: string
}

export function BillingPage({ profile, userEmail }: BillingPageProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [isCanceling, setIsCanceling] = useState(false)
  const { toast } = useToast()

  const currentPlan = PLANS.find((p) => p.id === profile?.subscription_plan) || PLANS[0]

  const hasActiveSubscription = Boolean(profile?.paystack_subscription_code)

  const handleSubscribe = async (planId: string) => {
    if (planId === "free") return

    setIsLoading(planId)

    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          billingCycle,
          email: userEmail,
        }),
      })

      if (!response.ok) {
        setIsLoading(null)
        toast({
          variant: "destructive",
          title: "Unable to start checkout",
          description: "Please try again in a moment.",
        })
        return
      }

      const { url, error } = await response.json()

      if (error) {
        console.error(error)
        setIsLoading(null)
        toast({
          variant: "destructive",
          title: "Billing error",
          description: "Something went wrong while creating your checkout session.",
        })
        return
      }

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error(error)
      setIsLoading(null)
      toast({
        variant: "destructive",
        title: "Network error",
        description: "We couldn't reach the billing service. Please check your connection and try again.",
      })
    }
  }

  const handleCancelSubscription = async () => {
    if (!hasActiveSubscription) return

    setIsCanceling(true)

    try {
      const response = await fetch("/api/paystack/cancel-subscription", {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        toast({
          variant: "destructive",
          title: "Unable to cancel subscription",
          description: data.error || "Please try again in a moment.",
        })
        setIsCanceling(false)
        return
      }

      toast({
        title: "Subscription cancelled",
        description: "Your plan has been downgraded to Free.",
      })

      window.location.reload()
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Network error",
        description: "We couldn't reach the billing service. Please check your connection and try again.",
      })
    } finally {
      setIsCanceling(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground">Manage your subscription and billing</p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
              <p className="text-muted-foreground">{currentPlan.description}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">
                ₦{currentPlan.priceMonthly.toLocaleString()}
                <span className="text-base font-normal text-muted-foreground">/month</span>
              </p>
            </div>
          </div>

          {/* Credits */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{profile?.email_credits || 0}</p>
                <p className="text-sm text-muted-foreground">Email credits remaining</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <MessageSquare className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{profile?.sms_credits || 0}</p>
                <p className="text-sm text-muted-foreground">WhatsApp credits remaining</p>
              </div>
            </div>
          </div>

          {hasActiveSubscription && currentPlan.id !== "free" && (
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Your {currentPlan.name} plan renews automatically via Paystack until you cancel.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelSubscription}
                disabled={isCanceling}
              >
                {isCanceling ? "Cancelling..." : "Cancel subscription"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upgrade Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Upgrade Your Plan</CardTitle>
          <CardDescription>Choose a plan that fits your needs</CardDescription>

          {/* Billing Toggle */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 p-1">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                billingCycle === "monthly" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                billingCycle === "yearly" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Yearly
              <span className="ml-1.5 text-xs text-emerald-600">Save 20%</span>
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((plan) => {
              const isCurrentPlan = plan.id === profile?.subscription_plan
              const price = billingCycle === "yearly" ? Math.round(plan.priceYearly / 12) : plan.priceMonthly

              return (
                <div
                  key={plan.id}
                  className={cn(
                    "relative rounded-xl border p-5 flex flex-col",
                    plan.highlighted ? "border-primary shadow-lg ring-1 ring-primary" : "border-border",
                    isCurrentPlan && "bg-primary/5",
                  )}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="font-semibold">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{plan.description}</p>
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl font-bold">₦{price.toLocaleString()}</span>
                    <span className="text-muted-foreground text-sm">/mo</span>
                    {billingCycle === "yearly" && plan.priceMonthly > 0 && (
                      <p className="text-xs text-muted-foreground">₦{plan.priceYearly.toLocaleString()}/year</p>
                    )}
                  </div>

                  <ul className="mb-4 space-y-2 flex-1 text-sm">
                    <li className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-primary" />
                      {plan.emailCredits.toLocaleString()} emails/mo
                    </li>
                    <li className="flex items-center gap-2">
                      <MessageSquare className="h-3.5 w-3.5 text-primary" />
                      {plan.smsCredits.toLocaleString()} WhatsApp msgs/mo
                    </li>
                    {plan.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={isCurrentPlan ? "outline" : plan.highlighted ? "default" : "outline"}
                    disabled={isCurrentPlan || isLoading === plan.id}
                    onClick={() => handleSubscribe(plan.id)}
                    className="w-full"
                  >
                    {isLoading === plan.id
                      ? "Loading..."
                      : isCurrentPlan
                        ? "Current Plan"
                        : plan.id === "free"
                          ? "Downgrade"
                          : "Upgrade"}
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      {false && profile?.stripe_subscription_id && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => handleManageBilling()}>
              Manage Payment Method
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )

  async function handleManageBilling() {
    try {
      const response = await fetch("/api/stripe/create-portal", {
        method: "POST",
      })
      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Unable to open billing portal",
          description: "Please try again in a moment.",
        })
        return
      }

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      } else {
        toast({
          variant: "destructive",
          title: "Billing portal error",
          description: "We couldn't get a billing portal link. Please contact support.",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Network error",
        description: "We couldn't reach the billing service. Please check your connection and try again.",
      })
    }
  }
}
