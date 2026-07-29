"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ShoppingBag, Store, Wallet, MessageSquare,
  Settings, Shield, ChevronLeft, Menu, X, Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navItems = [
  { href: "/dashboard/buyer", label: "Buyer Dashboard", icon: ShoppingBag },
  { href: "/dashboard/seller", label: "Seller Dashboard", icon: Store },
  { href: "/dashboard/wallet", label: "Wallet", icon: Wallet },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/admin", label: "Admin", icon: Shield },
  { href: "/dashboard/settings/security", label: "Settings", icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-[80vh]">
      {/* Mobile toggle */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b">
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
        <span className="font-semibold text-sm">Dashboard</span>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/buyer"><Bell className="h-5 w-5" /></Link>
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute left-0 top-0 h-full w-64 bg-background border-r p-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold">Dashboard</span>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <SidebarNav pathname={pathname} onClick={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-60 shrink-0 border-r min-h-[80vh]">
          <div className="sticky top-16 p-4">
            <SidebarNav pathname={pathname} />
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarNav({ pathname, onClick }: { pathname: string; onClick?: () => void }) {
  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClick}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            pathname === item.href || (item.href !== "/dashboard/buyer" && pathname.startsWith(item.href))
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
      <Separator className="my-3" />
      <Link
        href="/"
        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Site
      </Link>
    </nav>
  )
}
