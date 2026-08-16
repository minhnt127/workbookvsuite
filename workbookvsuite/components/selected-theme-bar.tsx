"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/store/editor-store";
import { useSavedThemesStore } from "@/store/saved-themes-store";
import { defaultPresets } from "@/utils/theme-presets";
import { Palette, RefreshCw } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SaveLocalThemeButton } from "@/components/editor/action-bar/components/save-local-theme-button";

export function SelectedThemeBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const themeState = useEditorStore((state) => state.themeState);
  const savedThemes = useSavedThemesStore((state) => state.themes);
  const presetId = themeState.preset || "modern-minimal";
  const saved = savedThemes.find((theme) => theme.id === presetId);
  const system = defaultPresets[presetId];
  const name = saved?.name || system?.label || "Modern Minimal";
  const styles = themeState.styles[themeState.currentMode];
  const isCustomize = pathname === "/components/customize" || searchParams.get("view") === "customize";

  const openCustomizer = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("view");
    const query = params.toString();
    router.push(`/components/customize${query ? `?${query}` : ""}`);
  };

  const openComponents = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("view");
    if (!params.get("component")) params.set("component", "button");
    router.push(`/components?${params.toString()}`);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-3">
      <div className="pointer-events-auto flex max-w-[calc(100vw-1.5rem)] items-center gap-2 rounded-2xl border bg-background/95 p-2 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <div className="flex min-w-0 items-center gap-2 pl-1.5 pr-1">
          <div className="flex shrink-0 -space-x-1">
            {[styles.primary, styles.secondary, styles.accent].map((color, index) => (
              <span
                key={`${color}-${index}`}
                className="size-5 rounded-full border-2 border-background shadow-xs"
                style={{ background: color }}
              />
            ))}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Theme đang chọn</p>
            <p className="max-w-36 truncate text-sm font-semibold sm:max-w-52">{name}</p>
          </div>
        </div>
        <Separator orientation="vertical" className="mx-0.5 h-7" />
        <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
          <RefreshCw className="size-4" />
          <span className="hidden sm:inline">Đổi Theme</span>
        </Button>
        {isCustomize ? (
          <SaveLocalThemeButton
            label="Lưu và xem component"
            mobileLabel="Lưu & xem"
            onSaved={openComponents}
          />
        ) : (
          <Button size="sm" onClick={openCustomizer}>
            <Palette className="size-4" />
            <span className="hidden sm:inline">Customize theme</span>
            <span className="sm:hidden">Customize</span>
          </Button>
        )}
      </div>
    </div>
  );
}
