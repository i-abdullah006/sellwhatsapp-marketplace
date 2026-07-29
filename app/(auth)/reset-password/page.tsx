import { AuthLayout } from "@/components/auth-layout"
import { ResetPasswordForm } from "@/components/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <AuthLayout title="Set new password" subtitle="Enter your new password below">
      <ResetPasswordForm />
    </AuthLayout>
  )
}
