"use client";

import ThemeControlPanel from "@/components/editor/theme-control-panel";
import ThemePreviewPanel from "@/components/editor/theme-preview-panel";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEditorStore } from "@/store/editor-store";
import { useSavedThemesStore } from "@/store/saved-themes-store";
import { useThemePresetStore } from "@/store/theme-preset-store";
import type { ThemeStyles } from "@/types/theme";
import { Sliders } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { OpenThemeActionBar } from "./open-theme-action-bar";

/**
 * Public, auth-free theme workbench used from Components → Customize Theme.
 * It reuses tweakcn's production ThemeControlPanel + ThemePreviewPanel, but it
 * intentionally avoids the original account/share dialog provider so the page
 * works as an open design-system tool without sign-in or backend configuration.
 */
export function ThemeCustomizer() {
  const themeState = useEditorStore((state) => state.themeState);
  const setThemeState = useEditorStore((state) => state.setThemeState);
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const savedId = searchParams.get("saved");
  const savedThemes = useSavedThemesStore((state) => state.themes);

  const handleStyleChange = React.useCallback(
    (styles: ThemeStyles) => {
      const previous = useEditorStore.getState().themeState;
      setThemeState({ ...previous, styles });
    },
    [setThemeState]
  );

  React.useEffect(() => {
    if (!savedId || themeState.preset === savedId) return;
    const saved = savedThemes.find((theme) => theme.id === savedId);
    if (!saved) return;

    useThemePresetStore
      .getState()
      .registerPreset(saved.id, { label: saved.name, styles: saved.styles, source: "SAVED" });
    setThemeState({ ...useEditorStore.getState().themeState, preset: saved.id, styles: saved.styles });
  }, [savedId, savedThemes, setThemeState, themeState.preset]);

  const styles = themeState.styles;

  if (isMobile) {
    return (
      <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-background">
        <OpenThemeActionBar />
        <Tabs defaultValue="controls" className="flex min-h-0 flex-1 flex-col">
          <TabsList className="w-full shrink-0 rounded-none border-b">
            <TabsTrigger value="controls" className="flex-1"><Sliders className="mr-2 size-4" /> Controls</TabsTrigger>
            <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="controls" className="mt-0 min-h-0 flex-1">
            <ThemeControlPanel styles={styles} onChange={handleStyleChange} currentMode={themeState.currentMode} customizerMode />
          </TabsContent>
          <TabsContent value="preview" className="mt-0 min-h-0 flex-1">
            <ThemePreviewPanel styles={styles} currentMode={themeState.currentMode} customizerMode />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="relative isolate h-full min-h-0 w-full overflow-hidden bg-background">
      <ResizablePanelGroup orientation="horizontal" className="h-full min-h-0">
        <ResizablePanel defaultSize="30%" minSize="27%" maxSize="36%" className="z-10">
          <div className="flex h-full min-h-0 flex-col overflow-hidden bg-background">
            <ThemeControlPanel styles={styles} onChange={handleStyleChange} currentMode={themeState.currentMode} customizerMode />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="70%">
          <div className="flex h-full min-h-0 flex-col bg-background">
            <OpenThemeActionBar />
            <ThemePreviewPanel styles={styles} currentMode={themeState.currentMode} customizerMode />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
