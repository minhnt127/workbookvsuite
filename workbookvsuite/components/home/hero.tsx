"use client";

import { ThemePresetButtons } from "@/components/home/theme-preset-buttons";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editor-store";
import { defaultPresets } from "@/utils/theme-presets";
import { ArrowRight, Boxes, Check } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const presetNames = Object.keys(defaultPresets);

export function Hero() {
  const { themeState, applyThemePreset } = useEditorStore();
  const mode = themeState.currentMode;

  return (
    <section className="relative isolate w-full overflow-hidden bg-background py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="container relative z-20 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 rounded-full border bg-card px-3 py-1 text-sm font-medium text-muted-foreground shadow-xs"
          >
            Open theme editor · shadcn/ui · Tailwind CSS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
          >
            Build a theme, then test it on <span className="text-primary">real components</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            A focused visual editor based on Tweakcn&apos;s workflow, adapted to the V-Suite design
            system. No community feed, no gated theme browsing—just edit, preview and export.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/editor/theme">
              <Button size="lg" className="rounded-full px-7">
                Start customizing
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/editor/theme?p=components">
              <Button size="lg" variant="outline" className="rounded-full px-7">
                <Boxes className="size-4" />
                Preview components
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-9 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-muted-foreground"
          >
            {["Light & dark", "Semantic tokens", "Component catalog", "Tailwind export"].map(
              (item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="grid size-5 place-items-center rounded-full bg-positive/10 text-positive">
                    <Check className="size-3" />
                  </span>
                  {item}
                </span>
              )
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-14 w-full overflow-hidden rounded-2xl border bg-card/70 py-4 shadow-sm"
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Built-in themes
            </p>
            <ThemePresetButtons
              presetNames={presetNames}
              mode={mode}
              themeState={themeState}
              applyThemePreset={applyThemePreset}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
