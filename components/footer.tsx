import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
  marketplace: {
    title: "Marketplace",
    links: [
      { href: "/marketplace", label: "Browse Listings" },
      { href: "/marketplace?type=auction", label: "Auctions" },
      { href: "/marketplace?type=fixed", label: "Buy Now" },
      { href: "/#categories", label: "Categories" },
    ],
  },
  account: {
    title: "Account",
    links: [
      { href: "/dashboard/buyer", label: "Dashboard" },
      { href: "/dashboard/seller", label: "Sell" },
      { href: "/dashboard/wallet", label: "Wallet" },
      { href: "/dashboard/messages", label: "Messages" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { href: "/#how-it-works", label: "How It Works" },
      { href: "/#faq", label: "FAQ" },
      { href: "/#contact", label: "Contact Us" },
    ],
  },
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <ShoppingBag className="h-5 w-5 text-primary" />
              SellWhatsApp
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              The trusted marketplace for buying and selling WhatsApp accounts with escrow protection.
            </p>
          </div>

          {/* Link groups */}
          {Object.values(footerLinks).map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-sm mb-3">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SellWhatsApp. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
