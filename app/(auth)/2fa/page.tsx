import { AuthLayout } from "@/components/auth-layout"
import { TwoFactorForm } from "@/components/two-factor-form"

export default function TwoFactorPage() {
  return (
    <AuthLayout title="Two-factor authentication" subtitle="Enter the code from your authenticator app">
      <TwoFactorForm />
    </AuthLayout>
  )
}
