import { Users, Mail, MessageSquare, BarChart3, Tags, Upload, Zap, Shield } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Smart Lead Capture",
    description:
      "Create beautiful forms and landing pages to capture leads from anywhere. Embed them on your website or share direct links.",
  },
  {
    icon: Mail,
    title: "Email Campaigns",
    description:
      "Design and send personalized email campaigns to your leads. Track opens, clicks, and conversions in real-time.",
  },
  {
    icon: MessageSquare,
    title: "SMS Outreach",
    description:
      "Reach leads instantly with SMS messages. Perfect for time-sensitive offers and appointment reminders.",
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    description:
      "Get insights into your lead pipeline. See which campaigns perform best and optimize your outreach strategy.",
  },
  {
    icon: Tags,
    title: "Lead Tagging & Scoring",
    description: "Organize leads with custom tags and scores. Focus on the most promising prospects automatically.",
  },
  {
    icon: Upload,
    title: "Easy Import/Export",
    description: "Import existing leads from CSV files or export your data anytime. Your leads, your control.",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Set up automated sequences to nurture leads without lifting a finger. Save time, close more deals.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Your data is protected with bank-grade encryption. GDPR compliant with full audit trails.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Everything you need to grow</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            LeadFlow combines lead management, email marketing, and SMS outreach in one powerful platform.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
