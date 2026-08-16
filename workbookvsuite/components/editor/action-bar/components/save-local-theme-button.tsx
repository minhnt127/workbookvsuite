"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useEditorStore } from "@/store/editor-store";
import { useSavedThemesStore } from "@/store/saved-themes-store";
import { useThemePresetStore } from "@/store/theme-preset-store";
import { BookmarkPlus } from "lucide-react";
import type { ComponentProps } from "react";
import { useEffect, useMemo, useState } from "react";

type SaveLocalThemeButtonProps = {
  label?: string;
  mobileLabel?: string;
  onSaved?: () => void;
  variant?: ComponentProps<typeof Button>["variant"];
  className?: string;
};

export function SaveLocalThemeButton({
  label = "Lưu theme",
  mobileLabel = "Lưu",
  onSaved,
  variant = "default",
  className,
}: SaveLocalThemeButtonProps = {}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const themeState = useEditorStore((state) => state.themeState);
  const styles = themeState.styles;
  const setThemeState = useEditorStore((state) => state.setThemeState);
  const saveThemeCheckpoint = useEditorStore((state) => state.saveThemeCheckpoint);
  const savedThemes = useSavedThemesStore((state) => state.themes);
  const saveTheme = useSavedThemesStore((state) => state.saveTheme);
  const updateTheme = useSavedThemesStore((state) => state.updateTheme);
  const currentSaved = savedThemes.find((theme) => theme.id === themeState.preset);
  const presets = useThemePresetStore((state) => state.presets);
  const suggestedName = useMemo(() => {
    if (currentSaved) return currentSaved.name;
    const activeName = themeState.preset ? presets[themeState.preset]?.label : undefined;
    return `${activeName || "Modern Minimal"} Custom`;
  }, [currentSaved, presets, themeState.preset]);

  useEffect(() => {
    if (open) setName(currentSaved?.name || suggestedName);
  }, [open, currentSaved?.name, suggestedName]);

  const handleSave = () => {
    const finalName = (name || suggestedName).trim() || "Untitled Theme";
    if (currentSaved) {
      updateTheme(currentSaved.id, { name: finalName, styles });
      useThemePresetStore.getState().registerPreset(currentSaved.id, { label: finalName, styles, source: "SAVED" });
      setThemeState({ ...themeState, preset: currentSaved.id });
      saveThemeCheckpoint();
      toast({ title: "Đã lưu theme", description: `“${finalName}” đã được cập nhật trong My Themes.` });
    } else {
      const saved = saveTheme(finalName, styles);
      useThemePresetStore.getState().registerPreset(saved.id, { label: saved.name, styles: saved.styles, source: "SAVED" });
      setThemeState({ ...themeState, preset: saved.id });
      saveThemeCheckpoint();
      toast({ title: "Đã lưu theme", description: `“${saved.name}” đã được thêm vào My Themes.` });
    }
    setName("");
    setOpen(false);
    onSaved?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant={variant} className={className}>
          <BookmarkPlus className="size-4" />
          <span className="hidden sm:inline">{label}</span>
          <span className="sm:hidden">{mobileLabel}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Lưu theme</DialogTitle>
          <DialogDescription>Lưu theme Light/Dark hiện tại vào My Themes để có thể mở và chỉnh lại sau.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-2">
          <Label htmlFor="local-theme-name">Tên theme</Label>
          <Input id="local-theme-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ví dụ: Ocean Breeze Custom" autoFocus />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
          <Button onClick={handleSave}>Lưu vào My Themes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
