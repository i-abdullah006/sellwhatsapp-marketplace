"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft, Gavel, Tag, Shield, Star, Clock, Eye, Share2, Heart,
  MessageCircle, CheckCircle, ChevronLeft, ChevronRight,
  User, Calendar, Award
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [bidAmount, setBidAmount] = useState("")
  const [offerAmount, setOfferAmount] = useState("")
  const [offerMessage, setOfferMessage] = useState("")
  const [activeTab, setActiveTab] = useState("bid")

  // Mock data
  const listing = {
    id: params.id,
    title: "Premium Business WhatsApp — 5 Years Old",
    description: "Aged WhatsApp business account with 5+ years of activity. Clean history, no bans, ready for immediate use. Includes full ownership transfer with all verification documents. This account has been maintained professionally and has a strong trust score.",
    whatsappUser: "+1 (555) 123-4567",
    price: 2500,
    currentBid: 1800,
    startingBid: 500,
    bidCount: 12,
    type: "AUCTION",
    status: "ACTIVE",
    endsAt: new Date(Date.now() + 7200000).toISOString(),
    views: 342,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    images: [
      { url: "/placeholder.svg", alt: "Main screenshot" },
      { url: "/placeholder.svg", alt: "Account details" },
      { url: "/placeholder.svg", alt: "Verification proof" },
      { url: "/placeholder.svg", alt: "Activity history" },
    ],
    category: { id: "1", name: "Business" },
    seller: {
      id: "seller-1",
      name: "TrustedSeller",
      avatar: null,
      rating: 4.9,
      reviewCount: 156,
      verified: true,
      memberSince: "2023",
      responseRate: "98%",
      responseTime: "< 1 hour",
    },
    escrowStatus: "Available",
  }

  const timeLeft = getTimeLeft(listing.endsAt)
  const isEnding = timeLeft && timeLeft.hours < 6
  const minBid = (listing.currentBid ?? listing.startingBid ?? 0) + 50
  const formattedPrice = (listing.currentBid ?? listing.price)?.toLocaleString()

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/marketplace" className="hover:text-foreground transition-colors flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Marketplace
        </Link>
        <span>/</span>
        <Link href={`/marketplace?category=${listing.category.name}`} className="hover:text-foreground transition-colors">
          {listing.category.name}
        </Link>
        <span>/</span>
        <span className="text-foreground truncate max-w-[200px]">{listing.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Images */}
        <div className="lg:col-span-2 space-y-4">
          {/* Main Image */}
          <div className="relative aspect-[4/3] bg-muted rounded-xl overflow-hidden">
            <img
              src={listing.images[currentImage].url}
              alt={listing.images[currentImage].alt}
              className="h-full w-full object-cover"
            />
            {/* Nav arrows */}
            <button
              onClick={() => setCurrentImage((prev) => prev > 0 ? prev - 1 : listing.images.length - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-background transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentImage((prev) => (prev + 1) % listing.images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-background transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            {/* Escrow badge */}
            <Badge variant="secondary" className="absolute top-3 left-3 gap-1 bg-background/80 backdrop-blur-sm">
              <Shield className="h-3.5 w-3.5" /> Escrow Protected
            </Badge>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2">
            {listing.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={cn(
                  "h-16 w-16 rounded-lg overflow-hidden border-2 transition-colors",
                  i === currentImage ? "border-primary" : "border-transparent hover:border-muted-foreground/30"
                )}
              >
                <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          {/* Tabs: Description, Bids, Reviews */}
          <Tabs defaultValue="description" className="mt-8">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="bids">Bid History ({listing.bidCount})</TabsTrigger>
              <TabsTrigger value="reviews">Seller Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p>{listing.description}</p>
                <h4 className="text-foreground font-semibold mt-4">WhatsApp Account Details</h4>
                <ul>
                  <li>Account: {listing.whatsappUser}</li>
                  <li>Registration Year: 2019</li>
                  <li>Account Status: Active & Verified</li>
                  <li>Transfer: Full ownership with documents</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="bids" className="mt-4">
              <div className="space-y-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                        B{i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium">Bidder{i + 1}</p>
                        <p className="text-xs text-muted-foreground">{i * 12}m ago</p>
                      </div>
                    </div>
                    <span className="font-semibold">${(1800 - i * 150).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-4">
                {[5, 4, 5].map((rating, i) => (
                  <div key={i} className="p-4 rounded-lg border">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Buyer{i + 1}</p>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }, (_, j) => (
                            <Star key={j} className={cn("h-3 w-3", j < rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30")} />
                          ))}
                        </div>
                      </div>
                      <span className="ml-auto text-xs text-muted-foreground">{i + 1}w ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {["Great seller! Smooth transfer and good communication.", "Account exactly as described. Would buy again.", "Professional seller, quick escrow release."][i]}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: Actions Panel */}
        <div className="space-y-4">
          {/* Price & Status Card */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="info" className="gap-1"><Gavel className="h-3 w-3" /> Auction</Badge>
                {listing.type === "BOTH" && <Badge variant="success" className="gap-1"><Tag className="h-3 w-3" /> Buy Now</Badge>}
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Current Bid</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">${formattedPrice}</span>
                  <span className="text-sm text-muted-foreground">USD</span>
                </div>
              </div>

              {/* Time remaining */}
              {timeLeft && (
                <div className={cn(
                  "flex items-center gap-2 p-3 rounded-lg text-sm",
                  isEnding ? "bg-destructive/10 text-destructive" : "bg-muted"
                )}>
                  <Clock className="h-4 w-4 shrink-0" />
                  <span className="font-medium">
                    {isEnding ? "Ending soon! " : ""}{timeLeft.label} remaining
                  </span>
                </div>
              )}

              {/* Bid/Offer Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="bid" className="flex-1">Place Bid</TabsTrigger>
                  <TabsTrigger value="offer" className="flex-1">Make Offer</TabsTrigger>
                </TabsList>

                <TabsContent value="bid" className="space-y-3 mt-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Min bid: ${minBid.toLocaleString()}</label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                      <Input
                        type="number"
                        placeholder={minBid.toString()}
                        className="pl-7"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    <Gavel className="mr-2 h-4 w-4" /> Place Bid
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    By placing a bid, you agree to the terms. Payment is held in escrow.
                  </p>
                </TabsContent>

                <TabsContent value="offer" className="space-y-3 mt-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Your offer</label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        className="pl-7"
                        value={offerAmount}
                        onChange={(e) => setOfferAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <Textarea
                    placeholder="Add a message to the seller (optional)"
                    className="min-h-[60px] text-sm"
                    value={offerMessage}
                    onChange={(e) => setOfferMessage(e.target.value)}
                  />
                  <Button className="w-full" size="lg" variant="outline">
                    <MessageCircle className="mr-2 h-4 w-4" /> Send Offer
                  </Button>
                </TabsContent>
              </Tabs>

              {/* Buy Now button */}
              {listing.type === "BOTH" && (
                <Button className="w-full" size="lg" variant="secondary">
                  <Tag className="mr-2 h-4 w-4" /> Buy Now — ${listing.price?.toLocaleString()}
                </Button>
              )}

              {/* Action buttons */}
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="flex-1">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="flex-1">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Seller Card */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold">{listing.seller.name}</p>
                    {listing.seller.verified && (
                      <Badge variant="success" className="h-4 px-1 gap-0.5">
                        <CheckCircle className="h-2.5 w-2.5" />
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-medium">{listing.seller.rating}</span>
                    <span className="text-muted-foreground">({listing.seller.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Since {listing.seller.memberSince}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  <span>{listing.seller.responseRate} response</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{listing.seller.responseTime}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-4 w-4" />
                  <span>Top rated</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" size="sm">
                  <MessageCircle className="mr-2 h-4 w-4" /> Contact
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Trust & Escrow */}
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900">
            <CardContent className="p-4 flex items-start gap-3">
              <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm text-emerald-800 dark:text-emerald-300">Escrow Protected</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                  Payment is held securely by SellWhatsappUsername until you confirm successful account transfer. Your money is safe.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{listing.views} views</span>
            </div>
            <span>Listed {formatDate(listing.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function getTimeLeft(endsAt: string): { label: string; hours: number } | null {
  const diff = new Date(endsAt).getTime() - Date.now()
  if (diff <= 0) return null
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const days = Math.floor(hours / 24)
  if (days > 0) return { label: `${days}d ${hours % 24}h ${minutes}m`, hours }
  if (hours > 0) return { label: `${hours}h ${minutes}m`, hours }
  return { label: `${minutes}m`, hours: 0 }
}

function formatDate(date: string): string {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "Today"
  if (days === 1) return "Yesterday"
  return `${days} days ago`
}
