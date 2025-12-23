import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "LeadFlow transformed how we handle leads. We've increased our conversion rate by 40% in just 3 months.",
    author: "Sarah Chen",
    role: "Head of Sales, TechCorp",
    avatar: "/professional-woman-headshot.png",
    metric: "+40% conversion rate",
    since: "Customer since 2022",
  },
  {
    quote: "The SMS feature alone has paid for itself 10x over. Our appointment show-up rate went from 60% to 90%.",
    author: "Marcus Johnson",
    role: "Owner, Elite Fitness",
    avatar: "/professional-man-headshot.png",
    metric: "+30% more show-ups",
    since: "Customer since 2021",
  },
  {
    quote: "Finally, a CRM that doesn't require a PhD to use. My whole team was up and running in a day.",
    author: "Emily Rodriguez",
    role: "Marketing Director, Bloom Agency",
    avatar: "/professional-woman-marketing-headshot.png",
    metric: "Team onboarded in 1 day",
    since: "Customer since 2023",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Loved by businesses everywhere</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of companies using LeadFlow to grow their business.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="rounded-2xl border border-border bg-card p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
              {testimonial.metric && (
                <p className="text-xs font-medium text-primary mb-4">{testimonial.metric}</p>
              )}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  {testimonial.since && (
                    <p className="text-xs text-muted-foreground/80 mt-0.5">{testimonial.since}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
