import { Separator } from "@/components/ui/separator";
import { useAIThemeGenerationCore } from "@/hooks/use-ai-theme-generation-core";
import { useEditorStore } from "@/store/editor-store";
import { CodeButton } from "./code-button";
import { ImportButton } from "./import-button";
import { MoreOptions } from "./more-options";
import { ResetButton } from "./reset-button";
import { SaveLocalThemeButton } from "./save-local-theme-button";
import { ThemeToggle } from "./theme-toggle";
import { UndoRedoButtons } from "./undo-redo-buttons";

interface ActionBarButtonsProps {
  onImportClick: () => void;
  onCodeClick: () => void;
}

export function ActionBarButtons({ onImportClick, onCodeClick }: ActionBarButtonsProps) {
  const { resetToCurrentPreset, hasUnsavedChanges } = useEditorStore();
  const { isGeneratingTheme } = useAIThemeGenerationCore();

  return (
    <div className="flex items-center gap-1">
      <MoreOptions disabled={isGeneratingTheme} />
      <Separator orientation="vertical" className="mx-1 h-8" />
      <ThemeToggle />
      <Separator orientation="vertical" className="mx-1 h-8" />
      <UndoRedoButtons disabled={isGeneratingTheme} />
      <Separator orientation="vertical" className="mx-1 h-8" />
      <ResetButton
        onClick={resetToCurrentPreset}
        disabled={!hasUnsavedChanges() || isGeneratingTheme}
      />
      <div className="hidden items-center gap-1 md:flex">
        <ImportButton onClick={onImportClick} disabled={isGeneratingTheme} />
      </div>
      <Separator orientation="vertical" className="mx-1 h-8" />
      <SaveLocalThemeButton />
      <CodeButton onClick={onCodeClick} disabled={isGeneratingTheme} />
    </div>
  );
}
