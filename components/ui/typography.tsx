import { cn } from "@/lib/utils"

export function H1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-shadow-gold uppercase",
        className
      )}
      {...props}
    />
  )
}

export function H2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight uppercase",
        className
      )}
      {...props}
    />
  )
}

export function H3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-display text-2xl md:text-3xl font-semibold tracking-tight uppercase",
        className
      )}
      {...props}
    />
  )
}

export function H4({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn(
        "font-display text-xl md:text-2xl font-semibold tracking-tight uppercase",
        className
      )}
      {...props}
    />
  )
}

export function P({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-base md:text-lg leading-7 text-brand-cream/90", className)}
      {...props}
    />
  )
}

export function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xl md:text-2xl text-brand-gray leading-relaxed", className)}
      {...props}
    />
  )
}

export function Small({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <small
      className={cn("text-sm font-medium leading-none text-brand-gray", className)}
      {...props}
    />
  )
}

export function Muted({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-brand-gray", className)}
      {...props}
    />
  )
}
