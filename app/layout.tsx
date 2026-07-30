import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"

export const metadata: Metadata = {
  title: "SellWhatsappUsername — Buy & Sell WhatsApp Accounts Safely",
  description: "The trusted marketplace for buying and selling WhatsApp accounts with escrow protection.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}
