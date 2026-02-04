import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wider",
  {
    variants: {
      variant: {
        gold: "bg-brand-gold text-brand-black hover:bg-brand-gold/90 shadow-gold font-semibold",
        outline: "border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black",
        ghost: "text-brand-cream hover:bg-brand-charcoal hover:text-brand-gold",
        dark: "bg-brand-charcoal text-brand-cream hover:bg-brand-charcoal/80 border border-brand-gold/20",
        burgundy: "bg-brand-burgundy text-brand-cream hover:bg-brand-burgundy/90",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-9 px-6 text-xs",
        lg: "h-14 px-12 text-base",
        xl: "h-16 px-16 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
