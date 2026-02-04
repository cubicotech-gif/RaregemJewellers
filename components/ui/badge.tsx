import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center font-body font-semibold text-xs uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // GOLD/CHAMPAGNE BADGE
        champagne: "bg-champagne text-white px-3 py-1 rounded-full",

        // ROSE GOLD BADGE
        "rose-gold": "bg-rose-gold text-white px-3 py-1 rounded-full",

        // OUTLINE BADGE
        outline: "bg-transparent text-champagne border border-champagne px-3 py-1 rounded-full",

        // STOCK STATUS BADGES
        "in-stock": "bg-green-100 text-green-800 px-3 py-1 rounded-full",
        "low-stock": "bg-orange-100 text-orange-800 px-3 py-1 rounded-full",
        "sold-out": "bg-red-100 text-red-800 px-3 py-1 rounded-full",

        // SECONDARY (subtle)
        secondary: "bg-luxury-beige text-luxury-black px-3 py-1 rounded-full",

        // DARK (for light backgrounds)
        dark: "bg-luxury-black text-luxury-white px-3 py-1 rounded-full",
      },
    },
    defaultVariants: {
      variant: "champagne",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
