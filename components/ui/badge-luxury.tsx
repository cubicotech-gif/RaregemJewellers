import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-3 py-1 text-xs font-semibold transition-all duration-300 uppercase tracking-[0.15em] rounded-none",
  {
    variants: {
      variant: {
        gold: "bg-kronos-gold/10 text-kronos-gold border-kronos-gold/30",
        rose: "bg-kronos-rose/10 text-kronos-rose border-kronos-rose/30",
        outline: "text-kronos-white border-kronos-gold/20",
        gem: "bg-kronos-gold text-kronos-black border-kronos-gold font-bold",
        sapphire: "bg-kronos-sapphire/20 text-[#4A90D9] border-kronos-sapphire/30",
        emerald: "bg-kronos-emerald/20 text-[#4ADE80] border-kronos-emerald/30",
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
