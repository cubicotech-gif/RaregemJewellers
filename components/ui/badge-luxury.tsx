import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-luxury uppercase tracking-wider",
  {
    variants: {
      variant: {
        gold: "bg-brand-gold/20 text-brand-gold border-brand-gold/50",
        burgundy: "bg-brand-burgundy/20 text-brand-burgundy border-brand-burgundy/50",
        outline: "text-brand-cream border-brand-gold/30",
        gem: "bg-gradient-gold text-brand-black border-brand-gold",
      },
    },
    defaultVariants: {
      variant: "gold",
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
