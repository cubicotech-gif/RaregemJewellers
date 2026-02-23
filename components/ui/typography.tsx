import { cn } from "@/lib/utils"

export function H1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "font-display text-[3.5rem] font-bold leading-[1.05] tracking-tight text-shadow-gold",
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
        "font-display text-[2.5rem] font-semibold leading-[1.15] tracking-tight",
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
        "font-display text-[1.75rem] font-medium leading-[1.3] tracking-tight",
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
        "font-display text-xl md:text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

export function P({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-base leading-7 text-kronos-white/90 font-sans", className)}
      {...props}
    />
  )
}

export function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-lg md:text-xl text-kronos-muted leading-relaxed font-sans", className)}
      {...props}
    />
  )
}

export function Small({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <small
      className={cn("text-sm font-medium leading-none text-kronos-muted font-sans", className)}
      {...props}
    />
  )
}

export function Muted({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-kronos-muted font-sans", className)}
      {...props}
    />
  )
}

export function Label({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("text-xs font-semibold uppercase tracking-[0.2em] text-kronos-gold font-sans", className)}
      {...props}
    />
  )
}
