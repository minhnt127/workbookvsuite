"use client";

import { AddThemeDialog } from "@/components/add-theme-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Boxes, Palette } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 items-center justify-between gap-3 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-5">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Design System">
            <span className="flex items-center dark:rounded-md dark:bg-white dark:px-1.5 dark:py-1">
              <Image
                src="/design-system-logo.png"
                alt="Design System"
                width={981}
                height={490}
                priority
                className="h-10 w-auto"
              />
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <Button variant={pathname === "/" ? "secondary" : "ghost"} size="sm" asChild>
              <Link href="/"><Palette className="size-4" />Themes</Link>
            </Button>
            <Button variant={pathname.startsWith("/components") ? "secondary" : "ghost"} size="sm" asChild>
              <Link href="/components?component=button"><Boxes className="size-4" />Components</Link>
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle variant="ghost" size="icon" />
          <AddThemeDialog />
        </div>
      </div>
    </header>
  );
}
