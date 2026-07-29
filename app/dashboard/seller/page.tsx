import Link from "next/link"
import { Store, Tag, TrendingUp, DollarSign, Plus, Eye, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const stats = [
  { label: "Active Listings", value: 8, icon: Tag, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30" },
  { label: "Total Sales", value: "$24,500", icon: DollarSign, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" },
  { label: "Pending Orders", value: 2, icon: Clock, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30" },
  { label: "Rating", value: "4.9", icon: TrendingUp, color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30" },
]

const mockListings = [
  { id: "s1", title: "Premium Business WhatsApp — 5 Years Old", price: 2500, type: "AUCTION", views: 342, bids: 12, status: "Active" },
  { id: "s2", title: "USA Number + WhatsApp — Verified", price: 1200, type: "FIXED_PRICE", views: 189, bids: 0, status: "Active" },
  { id: "s3", title: "Old WhatsApp — 2018 Registered", price: 800, type: "AUCTION", views: 156, bids: 8, status: "Ending Soon" },
  { id: "s4", title: "Dual-SIM Bundle", price: 3500, type: "BOTH", views: 278, bids: 15, status: "Active" },
]

export default function SellerDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Seller Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your listings, orders, and sales</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/seller/new"><Plus className="mr-2 h-4 w-4" /> New Listing</Link>
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
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="listings">
        <TabsList>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="offers">Offers Received</TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="mt-4 space-y-3">
          {mockListings.map((item) => (
            <Card key={item.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="h-14 w-14 rounded-lg bg-muted shrink-0" />
                  <div className="min-w-0">
                    <Link href={`/listing/${item.id}`} className="font-semibold text-sm hover:text-primary line-clamp-1">
                      {item.title}
                    </Link>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span>${item.price}</span>
                      <span><Eye className="h-3 w-3 inline mr-1" />{item.views}</span>
                      {item.bids > 0 && <span>{item.bids} bids</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant={item.status === "Ending Soon" ? "warning" : "success"}>{item.status}</Badge>
                  <Badge variant="outline">{item.type === "AUCTION" ? "Auction" : item.type === "FIXED_PRICE" ? "Fixed" : "Both"}</Badge>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/listing/${item.id}`}>View</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="orders" className="mt-4">
          <div className="text-center py-12 text-muted-foreground">
            <Store className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Recent orders will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="offers" className="mt-4">
          <div className="text-center py-12 text-muted-foreground">
            <p>No pending offers</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
