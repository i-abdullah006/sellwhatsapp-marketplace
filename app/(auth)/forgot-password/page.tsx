import { AuthLayout } from "@/components/auth-layout"
import { ForgotPasswordForm } from "@/components/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title="Reset your password" subtitle="Enter your email and we'll send you a reset link">
      <ForgotPasswordForm />
    </AuthLayout>
  )
}
