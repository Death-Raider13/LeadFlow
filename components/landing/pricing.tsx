"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { PLANS } from "@/lib/plans"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="py-20 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Simple, transparent pricing</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business. Upgrade or downgrade anytime.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-4 rounded-full border border-border bg-card p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                !annual ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                annual ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Annual
              <span className="ml-2 text-xs opacity-75">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-2xl border bg-card p-6 flex flex-col",
                plan.highlighted ? "border-primary shadow-xl ring-1 ring-primary" : "border-border",
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">
                  ${annual ? Math.round(plan.priceYearly / 12) : plan.priceMonthly}
                </span>
                <span className="text-muted-foreground">/month</span>
                {annual && plan.priceMonthly > 0 && (
                  <p className="mt-1 text-sm text-muted-foreground">Billed ${plan.priceYearly}/year</p>
                )}
              </div>

              <ul className="mb-8 space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild variant={plan.highlighted ? "default" : "outline"} className="w-full">
                <Link href="/auth/sign-up">{plan.id === "free" ? "Get Started" : "Start Free Trial"}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
