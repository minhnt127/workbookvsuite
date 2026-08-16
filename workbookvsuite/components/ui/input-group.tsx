import * as React from "react";
import { cn } from "@/lib/utils";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "flex h-9 w-full min-w-0 items-center rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:ring-destructive/20 dark:bg-input/30",
        className
      )}
      {...props}
    />
  );
}
function InputGroupInput({ className, ...props }: React.ComponentProps<"input">) {
  return <input data-slot="input-group-input" className={cn("h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />;
}
function InputGroupAddon({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="input-group-addon" className={cn("flex h-full shrink-0 items-center gap-1 px-3 text-sm text-muted-foreground", className)} {...props} />;
}
export { InputGroup, InputGroupInput, InputGroupAddon };
