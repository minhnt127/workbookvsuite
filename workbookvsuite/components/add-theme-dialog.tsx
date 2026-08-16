"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useEditorStore } from "@/store/editor-store";
import { useSavedThemesStore } from "@/store/saved-themes-store";
import { useThemePresetStore } from "@/store/theme-preset-store";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Public "Thêm theme" action.
 * A click immediately creates a user-owned Clay Studio theme, then opens Customize.
 * Keeping the exported component name avoids changing existing header imports.
 */
export function AddThemeDialog() {
  const router = useRouter();
  const applyThemePreset = useEditorStore((state) => state.applyThemePreset);
  const saveTheme = useSavedThemesStore((state) => state.saveTheme);

  const handleCreate = () => {
    // Clay Studio starts from tweakcn's claymorphism token set, then becomes
    // an independent local theme in My Themes.
    applyThemePreset("claymorphism");

    const nextState = useEditorStore.getState().themeState;
    const existingNames = new Set(useSavedThemesStore.getState().themes.map((theme) => theme.name));
    const baseName = "Clay Studio";
    let nextName = baseName;
    let suffix = 2;
    while (existingNames.has(nextName)) {
      nextName = `${baseName} ${suffix}`;
      suffix += 1;
    }

    const saved = saveTheme(nextName, nextState.styles);
    useThemePresetStore
      .getState()
      .registerPreset(saved.id, { label: saved.name, styles: saved.styles, source: "SAVED" });

    // Make the new My Theme the active theme immediately.
    useEditorStore.getState().setThemeState({
      ...useEditorStore.getState().themeState,
      preset: saved.id,
      styles: saved.styles,
    });

    toast({
      title: "Đã thêm Clay Studio",
      description: `“${saved.name}” đã được lưu vào My Themes và sẵn sàng customize.`,
    });

    router.push(`/components/customize?saved=${saved.id}`);
  };

  return (
    <Button size="sm" onClick={handleCreate}>
      <Plus className="size-5" />
      Thêm theme
    </Button>
  );
}
