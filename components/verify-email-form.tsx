"use client"

import { useState } from "react"
import { MailCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VerifyEmailForm() {
  const [resent, setResent] = useState(false)

  return (
    <div className="text-center space-y-4">
      <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
        <MailCheck className="h-8 w-8 text-primary" />
      </div>
      <p className="text-sm text-muted-foreground">
        We sent a verification email to your inbox. Please check and click the link to verify your account.
      </p>
      <p className="text-xs text-muted-foreground">
        Didn&apos;t receive it? Check your spam folder or
      </p>
      <Button
        variant="outline"
        className="w-full"
        disabled={resent}
        onClick={() => setResent(true)}
      >
        {resent ? "Email Resent" : "Resend Verification Email"}
      </Button>
    </div>
  )
}
