"use client"

import { useState } from "react"
import {
  Search, SlidersHorizontal, Grid3X3, List, ArrowUpDown, X,
  Gavel, Tag, Shield, Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ListingCard } from "@/components/listing-card"
import { cn } from "@/lib/utils"
import { ScrollReveal } from "@/components/scroll-reveal"

const categories = [
  "All", "Business", "Aged Accounts", "Regional", "Premium", "Bundles", "Verified"
]

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "ending-soon", label: "Ending Soon" },
  { value: "popular", label: "Most Popular" },
]

const mockListings = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  title: [
    "Premium Business WhatsApp — 5 Years Old",
    "USA Number + WhatsApp — Verified Account",
    "Old WhatsApp Number — 2018 Registered",
    "Dual-SIM WhatsApp Bundle — Save Big",
    "UK Business WhatsApp — Low Usage",
    "Canada Premium WhatsApp — Clean History",
    "Australia Aged WhatsApp — Ready to Use",
    "EU Business WhatsApp — Multi-Language",
    "Asia Regional WhatsApp — High Trust Score",
    "Middle East WhatsApp — Business Ready",
    "South America WhatsApp — Aged & Verified",
    "Africa Premium WhatsApp — Low Risk",
  ][i],
  price: [2500, 1200, 800, 3500, 1800, 950, 1500, 2200, 600, 1700, 1100, 2900][i],
  type: (i % 3 === 0 ? "AUCTION" : i % 3 === 1 ? "FIXED_PRICE" : "BOTH") as "AUCTION" | "FIXED_PRICE" | "BOTH",
  currentBid: i % 3 === 0 ? [1800, 650, 2800, 1400][i % 4] : undefined,
  startingBid: i % 3 === 0 ? [500, 200, 1000, 300][i % 4] : undefined,
  images: [{ url: "/placeholder.svg" }],
  endsAt: i % 3 === 0 ? new Date(Date.now() + (i + 1) * 3600000).toISOString() : null,
  category: { name: categories[1 + (i % (categories.length - 1))] },
  seller: { name: `Seller${i + 1}` },
}))

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [listingType, setListingType] = useState<string[]>([])

  const toggleFilter = (filter: string) => {
    setListingType(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter])
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Browse {mockListings.length}+ listings — auctions, fixed price, and more
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
          {/* View toggle */}
          <div className="hidden sm:flex items-center border rounded-lg p-0.5">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-20 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search listings..." className="pl-9" />
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors",
                      activeCategory === cat
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Listing Type */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Listing Type</h3>
              <div className="space-y-2">
                {[
                  { value: "auction", label: "Auction", icon: Gavel },
                  { value: "fixed", label: "Buy Now", icon: Tag },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => toggleFilter(opt.value)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
                      listingType.includes(opt.value)
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <opt.icon className="h-4 w-4" />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Price Range</h3>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  className="h-8 text-sm"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                />
                <span className="text-muted-foreground text-sm">—</span>
                <Input
                  type="number"
                  placeholder="Max"
                  className="h-8 text-sm"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                />
              </div>
            </div>

            <Separator />

            {/* Trust filters */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Trust & Safety</h3>
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input type="checkbox" className="rounded border-input" />
                <Shield className="h-4 w-4" /> Escrow only
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer mt-2">
                <input type="checkbox" className="rounded border-input" />
                <Star className="h-4 w-4" /> Verified sellers only
              </label>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Sort + active filters bar */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {/* Active filters */}
            {listingType.map((f) => (
              <Badge key={f} variant="secondary" className="gap-1 cursor-pointer" onClick={() => toggleFilter(f)}>
                {f === "auction" ? "Auction" : "Buy Now"}
                <X className="h-3 w-3" />
              </Badge>
            ))}
            {activeCategory !== "All" && (
              <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setActiveCategory("All")}>
                {activeCategory} <X className="h-3 w-3" />
              </Badge>
            )}
            <div className="ml-auto flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm bg-transparent border-none focus:ring-0 text-muted-foreground cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category quick nav — mobile */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-2 -mx-4 px-4 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium border transition-colors shrink-0",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              : "space-y-4"
          )}>
            {mockListings.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 60} direction="up">
                <ListingCard {...item} view={viewMode} />
              </ScrollReveal>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-10 pt-6 border-t">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="secondary" size="sm" className="min-w-[2.5rem]">1</Button>
            <Button variant="ghost" size="sm" className="min-w-[2.5rem]">2</Button>
            <Button variant="ghost" size="sm" className="min-w-[2.5rem]">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>

      {/* Mobile filter sheet */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background p-6 overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowMobileFilters(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            {/* Duplicate filters for mobile */}
            <div className="space-y-6">
              {categories.map((cat) => (
                <button key={cat} onClick={() => { setActiveCategory(cat); setShowMobileFilters(false) }}
                  className={cn("block w-full text-left px-3 py-1.5 rounded-md text-sm", activeCategory === cat ? "bg-primary/10 text-primary" : "")}>
                  {cat}
                </button>
              ))}
              <Separator />
              <div>
                <h3 className="font-semibold text-sm mb-2">Listing Type</h3>
                {[{ value: "auction", label: "Auction" }, { value: "fixed", label: "Buy Now" }].map(o => (
                  <button key={o.value} onClick={() => toggleFilter(o.value)}
                    className={cn("block w-full text-left px-3 py-1.5 rounded-md text-sm", listingType.includes(o.value) ? "bg-primary/10 text-primary" : "")}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
