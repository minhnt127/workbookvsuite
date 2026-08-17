import Dashboard from "@/components/examples/dashboard";
import { Badge } from "@/components/ui/badge";

export function ProDashboardPreview() {
  return (
    <div className="overflow-hidden rounded-[22px] border bg-card shadow-sm shadow-black/5 ring-1 ring-border/60">
      <div className="flex items-center justify-between gap-3 border-b bg-card/80 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.18em]">
            Problock
          </Badge>
          <span className="text-sm font-medium text-foreground">Dashboard</span>
        </div>

        <div className="inline-flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Real product preview
        </div>
      </div>

      <div className="bg-muted/15 p-2 md:p-3">
        <div className="overflow-x-auto rounded-[18px] border bg-background">
          <div className="min-w-[1200px]">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
}
