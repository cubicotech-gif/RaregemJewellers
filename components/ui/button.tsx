import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-body transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // PRIMARY: Gold/Champagne button
        primary: "bg-champagne text-white font-semibold uppercase tracking-wider hover:bg-antique-gold hover:shadow-elegant-hover",

        // SECONDARY: Outline button
        secondary: "bg-transparent text-champagne border-2 border-champagne font-semibold uppercase tracking-wider hover:bg-champagne hover:text-white hover:shadow-elegant-hover",

        // GHOST: Text-only button
        ghost: "bg-transparent text-warm-gray font-medium hover:text-champagne hover:border-b-2 hover:border-champagne",

        // DARK: For use on dark backgrounds
        dark: "bg-luxury-white text-luxury-black font-semibold uppercase tracking-wider hover:bg-luxury-cream",

        // LINK: Simple link style
        link: "text-champagne underline-offset-4 hover:underline font-medium",
      },
      size: {
        default: "px-12 py-4 text-sm",
        sm: "px-8 py-3 text-xs",
        lg: "px-16 py-5 text-base",
        icon: "h-10 w-10",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        full: "rounded-full",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      radius: "none",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, radius, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, radius, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
