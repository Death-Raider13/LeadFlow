import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 md:py-32 bg-primary">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-primary-foreground">
          Ready to supercharge your lead generation?
        </h2>
        <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
          Join over 2,500 businesses already using LeadFlow. Start your free trial today — no credit card required and
          you can cancel anytime.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" variant="secondary" className="h-12 px-8 text-base" asChild>
            <Link href="/auth/sign-up">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            asChild
          >
            <Link href="#pricing">View Pricing</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
