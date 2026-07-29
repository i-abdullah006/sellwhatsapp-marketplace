import Link from "next/link"
import { Gavel, Tag, Clock, TrendingUp, ArrowRight, Eye, Heart, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const stats = [
  { label: "Active Bids", value: 3, icon: Gavel, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30" },
  { label: "Won", value: 12, icon: Tag, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" },
  { label: "Watching", value: 5, icon: Heart, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30" },
  { label: "Total Spent", value: "$8,450", icon: TrendingUp, color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30" },
]

const mockBids = [
  { id: "1", title: "Premium Business WhatsApp", currentBid: 1800, yourBid: 1750, endsAt: "2h 15m", status: "outbid" },
  { id: "2", title: "USA Number + WhatsApp — Verified", currentBid: 950, yourBid: 950, endsAt: "5h 30m", status: "winning" },
  { id: "3", title: "Dual-SIM WhatsApp Bundle", currentBid: 2800, yourBid: 2800, endsAt: "1d 4h", status: "winning" },
]

const mockOrders = [
  { id: "ORD-7842", title: "UK Business WhatsApp", amount: 1800, date: "Jul 25, 2026", status: "In Escrow", escrow: true },
  { id: "ORD-7801", title: "Canada Premium WhatsApp", amount: 950, date: "Jul 20, 2026", status: "Completed", escrow: false },
]

export default function BuyerDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Buyer Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your bids, orders, and watched listings</p>
        </div>
        <Button asChild>
          <Link href="/marketplace">Browse Marketplace <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{typeof stat.value === "number" ? stat.value : stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="bids">
        <TabsList>
          <TabsTrigger value="bids">My Bids</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="watching">Watching</TabsTrigger>
        </TabsList>

        <TabsContent value="bids" className="mt-4 space-y-3">
          {mockBids.map((bid) => (
            <Card key={bid.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="h-14 w-14 rounded-lg bg-muted shrink-0" />
                  <div className="min-w-0">
                    <Link href={`/listing/${bid.id}`} className="font-semibold text-sm hover:text-primary line-clamp-1">
                      {bid.title}
                    </Link>
                    <div className="flex items-center gap-3 mt-1 text-sm">
                      <span className="text-muted-foreground">Your bid: <strong>${bid.yourBid}</strong></span>
                      <span className="text-muted-foreground">Current: <strong>${bid.currentBid}</strong></span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <Badge variant={bid.status === "winning" ? "success" : "destructive"}>
                      {bid.status === "winning" ? "Winning" : "Outbid"}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {bid.endsAt}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/listing/${bid.id}`}>View</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="orders" className="mt-4 space-y-3">
          {mockOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-lg bg-muted shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">{order.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span>{order.id}</span>
                      <span>${order.amount}</span>
                      <span>{order.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={order.escrow ? "info" : "success"}>
                    {order.escrow && <Shield className="h-3 w-3 mr-1" />}
                    {order.status}
                  </Badge>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/checkout/status`}>Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="watching" className="mt-4">
          <div className="text-center py-12 text-muted-foreground">
            <Eye className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No watched listings yet</p>
            <Button variant="link" asChild>
              <Link href="/marketplace">Browse listings</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
