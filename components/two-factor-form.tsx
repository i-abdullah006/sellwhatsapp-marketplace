"use client"

import { useState, useRef } from "react"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TwoFactorForm() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    if (value && index < 5) refs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-muted-foreground text-center">
        Enter the 6-digit code from your authenticator app
      </p>

      <div className="flex justify-center gap-2">
        {code.map((digit, i) => (
          <Input
            key={i}
            ref={(el) => { refs.current[i] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="h-12 w-12 text-center text-lg font-bold"
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
          />
        ))}
      </div>

      <Button type="submit" className="w-full" size="lg">
        <Shield className="mr-2 h-4 w-4" /> Verify Code
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Having trouble?{" "}
        <button type="button" className="text-primary hover:underline">
          Use recovery code
        </button>
      </p>
    </form>
  )
}
