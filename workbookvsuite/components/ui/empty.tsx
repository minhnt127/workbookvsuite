import * as React from "react";
import { cn } from "@/lib/utils";

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty" className={cn("flex min-h-48 flex-col items-center justify-center gap-4 rounded-xl border border-dashed bg-muted/20 p-6 text-center", className)} {...props} />;
}
function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-header" className={cn("flex max-w-sm flex-col items-center gap-1.5", className)} {...props} />;
}
function EmptyMedia({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-media" className={cn("mb-1 flex size-10 items-center justify-center rounded-lg border bg-background text-muted-foreground shadow-xs", className)} {...props} />;
}
function EmptyTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 data-slot="empty-title" className={cn("font-semibold tracking-tight", className)} {...props} />;
}
function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="empty-description" className={cn("text-sm leading-6 text-muted-foreground", className)} {...props} />;
}
function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-content" className={cn("flex flex-wrap items-center justify-center gap-2", className)} {...props} />;
}
export { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent };
