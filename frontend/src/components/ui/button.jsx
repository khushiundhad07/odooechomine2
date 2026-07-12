import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border-2 border-[#101828] text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20C968] disabled:pointer-events-none disabled:opacity-50 active:translate-x-px active:translate-y-px [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#101828] text-white shadow-[3px_3px_0_rgba(16,24,40,0.76)] hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_rgba(16,24,40,0.76)]",
        destructive:
          "bg-[#F04438] text-white shadow-[3px_3px_0_rgba(16,24,40,0.72)] hover:bg-[#F04438]/90",
        outline:
          "bg-white text-[#101828] shadow-[3px_3px_0_rgba(16,24,40,0.68)] hover:bg-[#F8FAFC]",
        secondary:
          "bg-[#F8FAFC] text-[#101828] shadow-[2px_2px_0_rgba(16,24,40,0.42)] hover:bg-white",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
