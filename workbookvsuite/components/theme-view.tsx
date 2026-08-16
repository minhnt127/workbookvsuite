"use client";

import { CodeButton } from "@/components/editor/action-bar/components/code-button";
import { CodePanelDialog } from "@/components/editor/code-panel-dialog";
import ThemePreviewPanel from "@/components/editor/theme-preview-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { DialogActionsProvider } from "@/hooks/use-dialog-actions";
import { useEditorStore } from "@/store/editor-store";
import type { Theme } from "@/types/theme";
import { Edit, Moon, Share2, Sun } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ThemeViewProps {
  theme: Theme | null;
}

export default function ThemeView({ theme }: ThemeViewProps) {
  const { themeState, setThemeState, saveThemeCheckpoint, restoreThemeCheckpoint } =
    useEditorStore();
  const router = useRouter();
  const currentMode = themeState.currentMode;
  const [codePanelOpen, setCodePanelOpen] = useState(false);

  useEffect(() => {
    if (!theme) return;
    saveThemeCheckpoint();
    setThemeState({ ...themeState, styles: theme.styles });
    return () => restoreThemeCheckpoint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, saveThemeCheckpoint, setThemeState, restoreThemeCheckpoint]);

  if (!theme) notFound();

  const toggleTheme = () => {
    setThemeState({
      ...themeState,
      currentMode: currentMode === "light" ? "dark" : "light",
    });
  };

  const handleOpenInEditor = () => {
    setThemeState({ ...themeState, styles: theme.styles });
    saveThemeCheckpoint();
    router.push("/editor/theme?p=components");
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast({ title: "Theme URL copied to clipboard" });
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Theme preview</Badge>
            <Badge variant="outline">Components included</Badge>
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{theme.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Preview this theme across the component catalog, application examples and color tokens.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {currentMode === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <CodeButton variant="outline" size="default" onClick={() => setCodePanelOpen(true)} />
          <Button variant="outline" size="default" onClick={handleShare}>
            <Share2 className="size-4" />
            Share
          </Button>
          <Button size="default" onClick={handleOpenInEditor}>
            <Edit className="size-4" />
            Open in editor
          </Button>
        </div>
      </div>

      <DialogActionsProvider>
        <div className="-m-4 mt-6 flex h-[min(80svh,900px)] flex-col">
          <ThemePreviewPanel
            styles={theme.styles}
            currentMode={currentMode}
            themeId={theme.id}
            themeName={theme.name}
          />
        </div>
        <CodePanelDialog
          open={codePanelOpen}
          onOpenChange={setCodePanelOpen}
          themeEditorState={themeState}
          themeId={theme.id}
        />
      </DialogActionsProvider>
    </>
  );
}
