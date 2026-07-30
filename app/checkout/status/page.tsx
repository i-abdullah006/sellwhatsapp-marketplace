"use client"

import Link from "next/link"
import { CheckCircle, Loader2, XCircle, ArrowRight, Shield, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function CheckoutStatusPage() {
  // Mock: in a real app, this would come from query params or an API call
  const status = "success" as string

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <Card>
          <CardContent className="p-8">
            {status === "success" && (
              <div className="text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto" />
                <div>
                  <h1 className="text-2xl font-bold">Payment Successful!</h1>
                  <p className="text-muted-foreground mt-1">
                    Your payment has been processed and is now held in escrow.
                  </p>
                </div>

                <Card className="bg-muted/50">
                  <CardContent className="p-4 text-left space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Order ID</span>
                      <span className="font-mono font-medium">#ORD-2026-7842</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-semibold">$2,500.00 USD</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Listing</span>
                      <span>Premium Business WhatsApp</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <Badge variant="success">In Escrow</Badge>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-lg p-4 text-left">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-emerald-800 dark:text-emerald-300">Escrow Protection Active</p>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                        Your payment is held securely by SellWhatsappUsername. The seller will now transfer the account. Once you confirm receipt, funds will be released.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button size="lg" asChild>
                    <Link href="/dashboard/buyer">
                      View Order <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/api/invoice/ORD-2026-7842">
                      <Receipt className="mr-2 h-4 w-4" /> Download Invoice
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {status === "processing" && (
              <div className="text-center space-y-4">
                <Loader2 className="h-16 w-16 text-primary mx-auto animate-spin" />
                <div>
                  <h1 className="text-2xl font-bold">Processing Payment</h1>
                  <p className="text-muted-foreground mt-1">
                    Please wait while we process your payment...
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  This should only take a moment. Do not close this page.
                </p>
              </div>
            )}

            {status === "failed" && (
              <div className="text-center space-y-4">
                <XCircle className="h-16 w-16 text-destructive mx-auto" />
                <div>
                  <h1 className="text-2xl font-bold">Payment Failed</h1>
                  <p className="text-muted-foreground mt-1">
                    Something went wrong with your payment. Please try again.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="lg">
                    Try Again
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/dashboard/buyer">Go to Dashboard</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
