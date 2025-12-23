import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Users, Mail, MessageSquare } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">New · Email & SMS outreach in one place</span>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            Capture leads. <span className="text-primary">Convert customers.</span>
          </h1>

          {/* Who it's for */}
          <p className="mt-4 text-sm font-medium text-primary/80">
            Built for agencies, SaaS teams, and growing local businesses.
          </p>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl text-pretty">
            LeadFlow helps you collect, organize, and reach out to leads via email and SMS. Stop losing potential
            customers and start growing your business.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <Link href="/auth/sign-up">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent" asChild>
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>2,500+ businesses</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>1M+ emails sent</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>500K+ SMS delivered</span>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 w-full max-w-5xl">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 bg-linear-to-t from-primary/10 via-transparent to-transparent blur-2xl" />
              <div className="relative rounded-xl border border-border bg-card/95 p-2 shadow-2xl backdrop-blur">
                <div className="overflow-hidden rounded-lg border border-border/60 bg-background">
                  <div className="flex items-center gap-2 border-b border-border/60 bg-muted/60 px-4 py-2 text-xs text-muted-foreground">
                    <span className="flex h-2 w-2 rounded-full bg-red-400" />
                    <span className="flex h-2 w-2 rounded-full bg-amber-400" />
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                    <div className="mx-auto max-w-xs truncate text-[11px]">
                      app.leadflow.io · Dashboard overview
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="/modern-crm-dashboard-with-lead-management--analyti.jpg"
                      alt="LeadFlow Dashboard Preview"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
