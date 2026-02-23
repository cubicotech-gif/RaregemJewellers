import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kronos-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-[0.15em] rounded-none",
  {
    variants: {
      variant: {
        gold: "bg-transparent border border-kronos-gold text-kronos-gold hover:bg-kronos-gold hover:text-kronos-black font-semibold",
        filled: "bg-kronos-gold text-kronos-black hover:bg-kronos-gold/90 font-semibold",
        outline: "border border-kronos-gold/40 text-kronos-gold hover:bg-kronos-gold hover:text-kronos-black hover:border-kronos-gold",
        ghost: "text-kronos-muted hover:bg-kronos-brown hover:text-kronos-gold",
        dark: "bg-kronos-brown text-kronos-white hover:bg-kronos-brown/80 border border-kronos-gold/15",
        rose: "bg-kronos-rose text-kronos-white hover:bg-kronos-rose/90 border border-kronos-rose/50",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-9 px-6 text-xs",
        lg: "h-14 px-12 text-base",
        xl: "h-16 px-16 text-base",
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
