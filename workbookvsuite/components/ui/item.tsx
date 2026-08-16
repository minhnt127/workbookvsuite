import * as React from "react";
import { cn } from "@/lib/utils";

function Item({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item" className={cn("flex items-center gap-3 rounded-lg border bg-card p-3 text-card-foreground transition-colors hover:bg-accent/50", className)} {...props} />;
}
function ItemMedia({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-media" className={cn("flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground", className)} {...props} />;
}
function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-content" className={cn("min-w-0 flex-1", className)} {...props} />;
}
function ItemTitle({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="item-title" className={cn("truncate text-sm font-medium", className)} {...props} />;
}
function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="item-description" className={cn("truncate text-sm text-muted-foreground", className)} {...props} />;
}
function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-actions" className={cn("ml-auto flex shrink-0 items-center gap-1", className)} {...props} />;
}
export { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions };
