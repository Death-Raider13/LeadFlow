"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Zap, LayoutDashboard, Users, Mail, MessageSquare, BarChart3, Settings, CreditCard } from "lucide-react"
import type { User } from "@supabase/supabase-js"
import type { Profile } from "@/lib/types"

interface SidebarProps {
  user: User
  profile: Profile | null
  leadLimit?: number | null
  leadsUsedThisMonth?: number
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/dashboard/leads", icon: Users },
  { name: "Email Campaigns", href: "/dashboard/campaigns/email", icon: Mail },
  { name: "Whatsapp Campaigns", href: "/dashboard/campaigns/sms", icon: MessageSquare },
]

const bottomNav = [
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar({ profile, leadLimit, leadsUsedThisMonth }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/icon and favicon/icons.png" 
            alt="LeadFlow Logo" 
            width={36} 
            height={36}
            className="rounded-lg"
          />
          <span className="text-xl font-bold">LeadFlow</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        {/* Credits Display */}
        <div className="mb-4 p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground mb-2">Credits remaining (this month)</p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                Emails
              </span>
              <span className="font-medium">{profile?.email_credits ?? 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <MessageSquare className="h-3.5 w-3.5" />
                WhatsApp
              </span>
              <span className="font-medium">{profile?.sms_credits ?? 0}</span>
            </div>
          </div>
        </div>

        <div className="mb-4 p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground mb-2">Leads this month</p>
          {leadLimit === null || leadLimit === undefined ? (
            <p className="text-sm font-medium">
              {leadsUsedThisMonth ?? 0} generated &middot; Unlimited on your plan
            </p>
          ) : (
            <p className="text-sm font-medium">
              {(leadsUsedThisMonth ?? 0).toLocaleString()} / {leadLimit.toLocaleString()} leads
            </p>
          )}
        </div>

        {bottomNav.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
