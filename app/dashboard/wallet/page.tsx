import { Wallet, ArrowUpRight, ArrowDownLeft, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const transactions = [
  { id: "TXN-001", type: "deposit", amount: 500, date: "Jul 28, 2026", status: "Completed" },
  { id: "TXN-002", type: "withdrawal", amount: -250, date: "Jul 25, 2026", status: "Completed" },
  { id: "TXN-003", type: "escrow_release", amount: 1800, date: "Jul 22, 2026", status: "Completed" },
  { id: "TXN-004", type: "purchase", amount: -950, date: "Jul 20, 2026", status: "In Escrow" },
]

export default function WalletPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Wallet</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your balance and transactions</p>
        </div>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-foreground/80">Available Balance</p>
              <p className="text-3xl font-bold mt-1">$3,250.00</p>
              <p className="text-sm text-primary-foreground/80 mt-1">$1,800.00 in escrow</p>
            </div>
            <Wallet className="h-12 w-12 opacity-50" />
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="secondary" size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add Funds
            </Button>
            <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowUpRight className="mr-2 h-4 w-4" /> Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <div>
        <h2 className="font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-2">
          {transactions.map((txn) => (
            <Card key={txn.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                    txn.amount > 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  }`}>
                    {txn.amount > 0 ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm capitalize">{txn.type.replace("_", " ")}</p>
                    <p className="text-xs text-muted-foreground">{txn.id} · {txn.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${txn.amount > 0 ? "text-emerald-600" : ""}`}>
                    {txn.amount > 0 ? "+" : ""}${Math.abs(txn.amount).toLocaleString()}
                  </p>
                  <Badge variant={txn.status === "Completed" ? "success" : "info"} className="text-xs">
                    {txn.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
