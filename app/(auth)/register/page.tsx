import { AuthLayout } from "@/components/auth-layout"
import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
  return (
    <AuthLayout title="Create an account" subtitle="Join the trusted marketplace for WhatsApp accounts">
      <RegisterForm />
    </AuthLayout>
  )
}
