"use client";

import Logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";

interface HeaderProps {
  isScrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const navbarItems = [
  { label: "Editor", href: "/editor/theme" },
  { label: "Components", href: "/components" },
  { label: "Saved Themes", href: "/saved-themes" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
];

export function Header({ isScrolled, mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) return;

    e.preventDefault();
    const element = document.getElementById(href.slice(1));
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-lg",
        isScrolled ? "border-b bg-background/90 shadow-xs" : "bg-transparent"
      )}
    >
      <div className="container relative mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Logo className="size-6" />
          <span>V-Suite</span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
          {navbarItems.map((item, i) => (
            <motion.a
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.08 + i * 0.04 }}
              href={item.href}
              onClick={handleScrollToSection}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle variant="ghost" size="icon" />
          <Link href="/editor/theme">
            <Button className="rounded-full">
              Open editor
              <ChevronRight className="size-4" />
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle variant="ghost" size="icon" />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-x-0 top-16 border-b bg-background/95 backdrop-blur-lg md:hidden"
        >
          <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navbarItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  handleScrollToSection(e);
                  setMobileMenuOpen(false);
                }}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
