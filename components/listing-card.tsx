"use client"

import Link from "next/link"
import { Clock, Gavel, Tag, Shield, Star, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ListingCardProps {
  id: string
  title: string
  whatsappUser?: string | null
  price?: number | null
  currentBid?: number | null
  startingBid?: number | null
  type: "AUCTION" | "FIXED_PRICE" | "BOTH"
  images: { url: string }[]
  endsAt?: string | null
  category?: { name: string } | null
  seller?: { name: string; avatar?: string | null } | null
  view?: "grid" | "list"
}

export function ListingCard({
  id,
  title,
  price,
  currentBid,
  startingBid,
  type,
  images,
  endsAt,
  category,
  seller,
  view = "grid",
}: ListingCardProps) {
  const isAuction = type === "AUCTION" || type === "BOTH"
  const isFixedPrice = type === "FIXED_PRICE" || type === "BOTH"
  const displayPrice = currentBid ?? price ?? startingBid
  const heroImage = images[0]?.url ?? "/placeholder.svg"
  const timeLeft = endsAt ? getTimeLeft(endsAt) : null
  const isEnding = timeLeft && timeLeft.hours < 6

  if (view === "list") {
    return (
      <Link href={`/listing/${id}`}>
        <Card className="group overflow-hidden hover:shadow-md transition-all duration-200 hover:border-primary/30">
          <CardContent className="p-0">
            <div className="flex">
              <div className="w-48 h-36 shrink-0 bg-muted overflow-hidden">
                <img
                  src={heroImage}
                  alt={title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {category && <Badge variant="secondary" className="text-xs">{category.name}</Badge>}
                    {isAuction && (
                      <Badge variant="info" className="text-xs gap-1">
                        <Gavel className="h-3 w-3" /> Auction
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
                  {seller && (
                    <p className="text-xs text-muted-foreground mt-1">by {seller.name}</p>
                  )}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold">${displayPrice?.toLocaleString()}</span>
                    {isAuction && timeLeft && (
                      <span className={cn("text-xs font-medium", isEnding ? "text-destructive" : "text-muted-foreground")}>
                        <Clock className="h-3 w-3 inline mr-0.5" />
                        {timeLeft.label}
                      </span>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    View
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/listing/${id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-primary/30">
        <div className="relative aspect-[4/3] bg-muted overflow-hidden">
          <img
            src={heroImage}
            alt={title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Badges overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {isAuction && (
              <Badge variant="info" className="gap-1 shadow-sm">
                <Gavel className="h-3 w-3" /> Auction
              </Badge>
            )}
            {isFixedPrice && !isAuction && (
              <Badge variant="success" className="gap-1 shadow-sm">
                <Tag className="h-3 w-3" /> Buy Now
              </Badge>
            )}
          </div>
          {/* Escrow badge */}
          <Badge variant="secondary" className="absolute top-3 right-3 gap-1 bg-background/80 backdrop-blur-sm shadow-sm">
            <Shield className="h-3 w-3" /> Escrow
          </Badge>
          {/* Time badge */}
          {isAuction && timeLeft && (
            <Badge
              variant={isEnding ? "destructive" : "secondary"}
              className={cn(
                "absolute bottom-3 left-3 gap-1 shadow-sm",
                !isEnding && "bg-background/80 backdrop-blur-sm"
              )}
            >
              <Clock className="h-3 w-3" />
              {timeLeft.label}
            </Badge>
          )}
          {/* View count */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            <Eye className="h-3 w-3" />
          </div>
        </div>
        <CardContent className="p-4">
          {category && (
            <p className="text-xs text-muted-foreground mb-1">{category.name}</p>
          )}
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-lg font-bold text-foreground">
              ${displayPrice?.toLocaleString()}
            </span>
            {currentBid && <span className="text-xs text-muted-foreground">current bid</span>}
          </div>
          {seller && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                {seller.name?.[0] ?? "S"}
              </div>
              <span className="text-xs text-muted-foreground">{seller.name}</span>
              <Star className="h-3 w-3 text-amber-500 ml-auto" />
              <span className="text-xs font-medium">4.9</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

function getTimeLeft(endsAt: string): { label: string; hours: number } | null {
  const diff = new Date(endsAt).getTime() - Date.now()
  if (diff <= 0) return null
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const days = Math.floor(hours / 24)
  if (days > 0) return { label: `${days}d ${hours % 24}h`, hours }
  if (hours > 0) return { label: `${hours}h ${minutes}m`, hours }
  return { label: `${minutes}m`, hours: 0 }
}
