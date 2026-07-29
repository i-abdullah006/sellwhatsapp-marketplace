import { AuthLayout } from "@/components/auth-layout"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account to continue">
      <LoginForm />
    </AuthLayout>
  )
}
