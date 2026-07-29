import { Users, ShoppingBag, DollarSign, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

const stats = [
  { label: "Total Users", value: "2,847", icon: Users },
  { label: "Active Listings", value: "342", icon: ShoppingBag },
  { label: "Total Volume", value: "$156K", icon: DollarSign },
  { label: "Disputes", value: "3", icon: AlertTriangle },
]

const disputes = [
  { id: "DSP-001", user: "TrustedSeller", issue: "Account transfer issue", status: "Open", date: "Jul 28, 2026" },
  { id: "DSP-002", user: "Buyer42", issue: "Payment not released", status: "Pending", date: "Jul 27, 2026" },
]

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Platform overview and management</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="disputes">
        <TabsList>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="disputes" className="mt-4 space-y-3">
          {disputes.map((d) => (
            <Card key={d.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{d.id} — {d.issue}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    User: {d.user} · {d.date}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={d.status === "Open" ? "destructive" : "warning"}>{d.status}</Badge>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="listings" className="mt-4">
          <p className="text-sm text-muted-foreground text-center py-12">Listing management panels</p>
        </TabsContent>
        <TabsContent value="users" className="mt-4">
          <p className="text-sm text-muted-foreground text-center py-12">User management panels</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
