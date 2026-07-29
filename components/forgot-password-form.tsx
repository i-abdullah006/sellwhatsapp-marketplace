"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="text-center space-y-4">
        <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto" />
        <div>
          <h3 className="font-semibold">Check your email</h3>
          <p className="text-sm text-muted-foreground mt-1">
            We&apos;ve sent a password reset link to <strong>{email}</strong>
          </p>
        </div>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/login"><ArrowLeft className="mr-2 h-4 w-4" /> Back to login</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="email" type="email" placeholder="you@example.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg">Send Reset Link</Button>

      <p className="text-center text-sm">
        <Link href="/login" className="text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
          <ArrowLeft className="h-3 w-3" /> Back to login
        </Link>
      </p>
    </form>
  )
}
