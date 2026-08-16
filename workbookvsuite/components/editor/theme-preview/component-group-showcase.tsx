"use client";

import {
  componentDocs,
  type ComponentCategory,
} from "@/components/component-docs/component-registry";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ComponentGroupShowcase({
  category,
  className,
}: {
  category: ComponentCategory;
  className?: string;
}) {
  const docs = componentDocs.filter((doc) => doc.category === category);

  return (
    <div className={cn("grid grid-cols-1 gap-4 p-4 xl:grid-cols-2", className)}>
      {docs.map((doc) => (
        <section
          key={doc.slug}
          className="group flex min-h-64 min-w-0 flex-col overflow-hidden rounded-xl border bg-card shadow-xs transition-shadow hover:shadow-sm"
        >
          <header className="flex items-start justify-between gap-3 border-b px-4 py-3">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-card-foreground">{doc.name}</h3>
              <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{doc.description}</p>
            </div>
            <Badge variant="outline" className="shrink-0 text-[10px]">
              {doc.slug}
            </Badge>
          </header>
          <div className="flex min-h-48 flex-1 items-center justify-center overflow-auto p-5">
            {doc.preview}
          </div>
        </section>
      ))}
    </div>
  );
}
