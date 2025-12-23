import { UserPlus, Database, Send, TrendingUp } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Capture Leads",
    description: "Create custom forms or import existing leads. Connect your website, landing pages, or social media.",
  },
  {
    step: "02",
    icon: Database,
    title: "Organize & Segment",
    description: "Tag, score, and segment your leads automatically. Keep your pipeline clean and actionable.",
  },
  {
    step: "03",
    icon: Send,
    title: "Send Campaigns",
    description: "Reach out via email or SMS. Use templates or create custom messages. Schedule for the perfect time.",
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Track & Optimize",
    description: "Monitor opens, clicks, and conversions. A/B test your campaigns and continuously improve.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">How LeadFlow works</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From capture to conversion in four simple steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-border -translate-x-1/2 z-0" />
              )}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>
                <span className="mb-2 text-sm font-bold text-primary">{step.step}</span>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
