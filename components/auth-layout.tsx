import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: React.ReactNode
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl">
            <ShoppingBag className="h-6 w-6 text-primary" />
            SellWhatsappUsername
          </Link>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
