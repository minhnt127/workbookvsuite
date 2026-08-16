"use client";

import { CodePanelDialog } from "@/components/editor/code-panel-dialog";
import CssImportDialog from "@/components/editor/css-import-dialog";
import { ResetButton } from "@/components/editor/action-bar/components/reset-button";
import { ThemeToggle } from "@/components/editor/action-bar/components/theme-toggle";
import { UndoRedoButtons } from "@/components/editor/action-bar/components/undo-redo-buttons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useEditorStore } from "@/store/editor-store";
import { parseCssInput } from "@/utils/parse-css-input";
import { Braces, FileUp } from "lucide-react";
import { useState } from "react";
import { ExportDesignSystemButton } from "./export-design-system-button";

/**
 * Auth-free action bar for the public Components → Customize Theme workspace.
 * Keeping this independent from tweakcn's account/share DialogActionsProvider
 * prevents the public customizer from failing when no auth/backend is configured.
 */
export function OpenThemeActionBar() {
  const [importOpen, setImportOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const themeState = useEditorStore((state) => state.themeState);
  const setThemeState = useEditorStore((state) => state.setThemeState);
  const resetToCurrentPreset = useEditorStore((state) => state.resetToCurrentPreset);
  const hasUnsavedChanges = useEditorStore((state) => state.hasUnsavedChanges);

  const handleImport = (css: string) => {
    const { lightColors, darkColors } = parseCssInput(css);
    setThemeState({
      ...themeState,
      styles: {
        light: { ...themeState.styles.light, ...lightColors },
        dark: { ...themeState.styles.dark, ...darkColors },
      },
    });
    toast({ title: "CSS imported", description: "The imported tokens are now applied to this theme." });
  };

  return (
    <>
      <div className="flex min-h-14 shrink-0 items-center justify-end gap-1 overflow-x-auto border-b bg-background px-3 md:px-4">
        <ThemeToggle />
        <Separator orientation="vertical" className="mx-1 h-8" />
        <UndoRedoButtons />
        <Separator orientation="vertical" className="mx-1 h-8" />
        <ResetButton onClick={resetToCurrentPreset} disabled={!hasUnsavedChanges()} />
        <Button variant="ghost" size="sm" onClick={() => setImportOpen(true)} className="gap-2">
          <FileUp className="size-5" />
          <span>Import</span>
        </Button>
        <Button variant="outline" size="sm" onClick={() => setCodeOpen(true)}><Braces className="size-4" /><span className="hidden md:inline">Code</span></Button>
        <ExportDesignSystemButton compact />
      </div>
      <CssImportDialog open={importOpen} onOpenChange={setImportOpen} onImport={handleImport} />
      <CodePanelDialog open={codeOpen} onOpenChange={setCodeOpen} themeEditorState={themeState} />
    </>
  );
}
