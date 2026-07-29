import Link from "next/link"
import { ArrowRight, Shield, Gavel, Search, Star, Clock, Users, TrendingUp, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ListingCard } from "@/components/listing-card"
import { ScrollReveal } from "@/components/scroll-reveal"

const mockFeatured = [
  { id: "1", title: "Premium Business WhatsApp — 5 Years Old", price: 2500, type: "AUCTION" as const, currentBid: 1800, startingBid: 500, images: [{ url: "/placeholder.svg" }], endsAt: new Date(Date.now() + 7200000).toISOString(), category: { name: "Business" }, seller: { name: "TrustedSeller" } },
  { id: "2", title: "USA Number + WhatsApp — Verified", price: 1200, type: "FIXED_PRICE" as const, images: [{ url: "/placeholder.svg" }], category: { name: "Regional" }, seller: { name: "USAccounts" } },
  { id: "3", title: "Old WhatsApp Number — 2018 Registered", price: 800, type: "AUCTION" as const, currentBid: 650, startingBid: 200, images: [{ url: "/placeholder.svg" }], endsAt: new Date(Date.now() + 36000000).toISOString(), category: { name: "Aged" }, seller: { name: "VintageLine" } },
  { id: "4", title: "Dual-SIM WhatsApp Bundle", price: 3500, type: "BOTH" as const, currentBid: 2800, startingBid: 1000, images: [{ url: "/placeholder.svg" }], endsAt: new Date(Date.now() + 1800000).toISOString(), category: { name: "Bundle" }, seller: { name: "BundleKing" } },
]

const steps = [
  { icon: Search, title: "Browse & Find", desc: "Search listings or browse categories to find the perfect WhatsApp account for your needs." },
  { icon: Gavel, title: "Bid or Buy", desc: "Place a bid in an auction or use Buy Now for instant purchase at a fixed price." },
  { icon: Shield, title: "Escrow Protected", desc: "Payment is held securely in escrow until the account transfer is verified complete." },
  { icon: CheckCircle, title: "Transfer & Release", desc: "Once you confirm receipt, funds are released to the seller. Safe for everyone." },
]

const categories = [
  { name: "Business", icon: TrendingUp, count: 245 },
  { name: "Aged Accounts", icon: Clock, count: 189 },
  { name: "Regional", icon: Users, count: 156 },
  { name: "Premium", icon: Star, count: 98 },
  { name: "Bundles", icon: Gavel, count: 67 },
  { name: "Verified", icon: Shield, count: 134 },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal direction="down" delay={0}>
              <Badge variant="secondary" className="mb-4 gap-1.5 text-sm px-4 py-1.5 animate-pulse">
                <Shield className="h-3.5 w-3.5" /> Escrow Protected Marketplace
              </Badge>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={100}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Buy & Sell{" "}
                <span className="text-primary">WhatsApp</span>{" "}
                Accounts Safely
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                The trusted marketplace for WhatsApp accounts. Secure escrow payments, verified sellers, and a fair auction system — all in one place.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={300}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="xl" asChild className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
                  <Link href="/marketplace">
                    Browse Marketplace
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline" asChild className="hover:bg-primary/5">
                  <Link href="/register">Start Selling</Link>
                </Button>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={400}>
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                {[
                  { icon: Shield, label: "100% Escrow" },
                  { icon: Users, label: "10K+ Users" },
                  { icon: Star, label: "Verified Sellers" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <item.icon className="h-4 w-4 text-primary" /> {item.label}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured Listings</h2>
                <p className="mt-2 text-muted-foreground">Hot auctions and top picks ending soon</p>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/marketplace">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockFeatured.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 100}>
                <ListingCard {...item} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">How It Works</h2>
              <p className="mt-2 text-muted-foreground">Simple, secure, transparent — four steps to your new WhatsApp account</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 150} direction="up">
                <div className="relative text-center group">
                  <div className="mx-auto h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-7 -right-4 text-muted-foreground/40">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Browse Categories</h2>
              <p className="mt-2 text-muted-foreground">Find exactly what you need from our curated categories</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.name} delay={i * 80} direction="up">
                <Link href={`/marketplace?category=${cat.name}`}>
                  <Card className="group hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1.5 text-center">
                    <CardContent className="p-6">
                      <cat.icon className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-125 transition-transform duration-300" />
                      <h3 className="font-semibold text-sm">{cat.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{cat.count} listings</p>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <Shield className="h-12 w-12 mx-auto text-primary mb-4" />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Buy & Sell with Confidence</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Every transaction is protected by our escrow system. Funds are held securely until you confirm the account transfer is complete and verified.
            </p>
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { title: "Secure Escrow", desc: "Payment held until transfer confirmed" },
              { title: "Verified Sellers", desc: "Identity-verified sellers you can trust" },
              { title: "Dispute Resolution", desc: "Fair mediation if anything goes wrong" },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 150} direction="up">
                <div className="p-6 rounded-xl border bg-card hover:shadow-md hover:border-primary/20 transition-all duration-300">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none" duration={800}>
            <div className="rounded-2xl bg-primary p-8 sm:p-12 text-primary-foreground text-center shadow-xl shadow-primary/20">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Ready to Get Started?</h2>
              <p className="mt-3 text-primary-foreground/80 max-w-lg mx-auto">
                Join thousands of users buying and selling WhatsApp accounts safely on our platform.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" variant="secondary" asChild className="hover:scale-105 transition-transform">
                  <Link href="/marketplace">Browse Marketplace</Link>
                </Button>
                <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-200 hover:scale-105" asChild>
                  <Link href="/register">Create Account</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
