"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, Menu, X, ShoppingBag, User, Bell, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const navLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#categories", label: "Categories" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span>SellWhatsappUsername</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:text-foreground hover:bg-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search listings..."
              className="pl-9 h-9 bg-muted/50 border-transparent focus:bg-background"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/dashboard/buyer">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/buyer">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-accent"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 pb-4 pt-2 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search listings..." className="pl-9 h-9 bg-muted/50" />
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" variant="outline" className="flex-1" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
