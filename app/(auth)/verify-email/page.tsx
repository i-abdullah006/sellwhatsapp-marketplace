import { AuthLayout } from "@/components/auth-layout"
import { VerifyEmailForm } from "@/components/verify-email-form"

export default function VerifyEmailPage() {
  return (
    <AuthLayout title="Verify your email" subtitle="Check your inbox for the verification code">
      <VerifyEmailForm />
    </AuthLayout>
  )
}
