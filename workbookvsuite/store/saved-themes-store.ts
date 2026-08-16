import type { ThemeStyles } from "@/types/theme";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SavedTheme = {
  id: string;
  name: string;
  styles: ThemeStyles;
  createdAt: string;
  updatedAt: string;
};

type SavedThemesStore = {
  themes: SavedTheme[];
  saveTheme: (name: string, styles: ThemeStyles) => SavedTheme;
  updateTheme: (id: string, patch: Partial<Pick<SavedTheme, "name" | "styles">>) => void;
  duplicateTheme: (id: string) => SavedTheme | null;
  deleteTheme: (id: string) => void;
};

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `theme_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export const useSavedThemesStore = create<SavedThemesStore>()(
  persist(
    (set, get) => ({
      themes: [],
      saveTheme: (name, styles) => {
        const now = new Date().toISOString();
        const theme: SavedTheme = {
          id: makeId(),
          name: name.trim() || "Untitled Theme",
          styles,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ themes: [theme, ...state.themes] }));
        return theme;
      },
      updateTheme: (id, patch) => {
        set((state) => ({
          themes: state.themes.map((theme) =>
            theme.id === id
              ? { ...theme, ...patch, updatedAt: new Date().toISOString() }
              : theme
          ),
        }));
      },
      duplicateTheme: (id) => {
        const source = get().themes.find((theme) => theme.id === id);
        if (!source) return null;
        const now = new Date().toISOString();
        const duplicate: SavedTheme = {
          ...source,
          id: makeId(),
          name: `${source.name} Copy`,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ themes: [duplicate, ...state.themes] }));
        return duplicate;
      },
      deleteTheme: (id) => set((state) => ({ themes: state.themes.filter((theme) => theme.id !== id) })),
    }),
    { name: "v-suite-saved-themes" }
  )
);
