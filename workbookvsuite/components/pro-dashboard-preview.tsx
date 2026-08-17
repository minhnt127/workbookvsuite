"use client";

import Dashboard from "@/components/examples/dashboard";
import ApplicationDemo from "@/components/examples/application";
import MarketingDemo from "@/components/examples/marketing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const views = [
  { key: "dashboard", label: "Dashboard" },
  { key: "application", label: "Application" },
  { key: "marketing", label: "Marketing" },
] as const;

export function ProDashboardPreview() {
  const [activeView, setActiveView] = useState<(typeof views)[number]["key"]>("dashboard");

  const previewMap = {
    dashboard: <Dashboard />,
    application: <ApplicationDemo />,
    marketing: <MarketingDemo />,
  } as const;

  return (
    <div className="overflow-hidden rounded-[22px] border bg-card shadow-sm shadow-black/5 ring-1 ring-border/60">
      <div className="flex flex-col gap-3 border-b bg-card/80 px-4 py-3 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.18em]">
            Problock
          </Badge>
          <span className="text-sm font-medium text-foreground">Product preview</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {views.map((view) => (
            <Button
              key={view.key}
              type="button"
              variant={activeView === view.key ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "rounded-full px-3 text-xs",
                activeView === view.key && "shadow-xs"
              )}
              onClick={() => setActiveView(view.key)}
            >
              {view.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-muted/15 p-2 md:p-3">
        <div className="overflow-x-auto rounded-[18px] border bg-background">
          <div
            className={cn(
              activeView === "marketing" ? "min-w-[1300px]" : "min-w-[1200px]"
            )}
          >
            {previewMap[activeView]}
          </div>
        </div>
      </div>
    </div>
  );
}
