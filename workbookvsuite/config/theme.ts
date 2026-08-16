import { ThemeEditorState } from "../types/editor";
import { defaultPresets } from "../utils/theme-presets";

// these are common between light and dark modes
// we can assume that light mode's value will be used for dark mode as well
export const COMMON_STYLES = [
  "font-sans",
  "font-serif",
  "font-mono",
  "radius",
  "shadow-opacity",
  "shadow-blur",
  "shadow-spread",
  "shadow-offset-x",
  "shadow-offset-y",
  "letter-spacing",
  "spacing",
];

export const DEFAULT_FONT_SANS =
  "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";

export const DEFAULT_FONT_SERIF = 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif';

export const DEFAULT_FONT_MONO =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

// Default light theme styles — sourced from the V-Suite design system
export const defaultLightThemeStyles = {
  background: "#ffffff",
  foreground: "#0a0a0a",
  card: "#ffffff",
  "card-foreground": "#0a0a0a",
  popover: "#ffffff",
  "popover-foreground": "#0a0a0a",
  primary: "#6366f1",
  "primary-foreground": "#fafafa",
  secondary: "#eef2ff",
  "secondary-foreground": "#171717",
  muted: "#f3f4f5",
  "muted-foreground": "#67687b",
  accent: "#f3f4f6",
  "accent-foreground": "#171717",
  destructive: "#e7000b",
  "destructive-foreground": "#fafafa",
  "destructive-muted": "#fee2e2",
  positive: "#16a34a",
  "positive-foreground": "#fafafa",
  "positive-muted": "#dcfce7",
  attention: "#f97316",
  "attention-foreground": "#fafafa",
  "attention-muted": "#ffedd5",
  brand: "#ea0029",
  "brand-foreground": "#ffffff",
  border: "#dddfed",
  input: "#dfe4f6",
  ring: "#c7d2fe",
  "ring-offset": "#ffffff",
  "border-selected": "#a5b4fc",
  "chart-1": "#ea580c",
  "chart-2": "#0d9488",
  "chart-3": "#164e63",
  "chart-4": "#fbbf24",
  "chart-5": "#f59e0b",
  sidebar: "#ffffff",
  "sidebar-foreground": "#171717",
  "sidebar-primary": "#171717",
  "sidebar-primary-foreground": "#fafafa",
  "sidebar-accent": "#eef2ff",
  "sidebar-accent-foreground": "#171717",
  "sidebar-border": "#dddfed",
  "sidebar-ring": "#c7d2fe",
  "font-sans": "Inter, sans-serif",
  "font-serif": "Georgia, serif",
  "font-mono": "Geist Mono, monospace",
  radius: "0.625rem",
  "shadow-color": "#000000",
  "shadow-opacity": "0.10",
  "shadow-blur": "3px",
  "shadow-spread": "0px",
  "shadow-offset-x": "0px",
  "shadow-offset-y": "1px",
  "letter-spacing": "0em",
  spacing: "0.25rem",
};

// Default dark theme styles — sourced from the V-Suite design system
export const defaultDarkThemeStyles = {
  ...defaultLightThemeStyles,
  background: "#0a0a0a",
  foreground: "#fafafa",
  card: "#171717",
  "card-foreground": "#fafafa",
  popover: "#262626",
  "popover-foreground": "#fafafa",
  primary: "#e5e5e5",
  "primary-foreground": "#171717",
  secondary: "#262626",
  "secondary-foreground": "#fafafa",
  muted: "#262626",
  "muted-foreground": "#a3a3a3",
  accent: "#404040",
  "accent-foreground": "#fafafa",
  destructive: "#f87171",
  "destructive-foreground": "#fafafa",
  "destructive-muted": "#fee2e2",
  positive: "#4ade80",
  "positive-foreground": "#fafafa",
  "positive-muted": "#dcfce7",
  attention: "#fb923c",
  "attention-foreground": "#fafafa",
  "attention-muted": "#ffedd5",
  brand: "#ef4444",
  "brand-foreground": "#ffffff",
  border: "rgba(255,255,255,0.10)",
  input: "rgba(255,255,255,0.15)",
  ring: "#737373",
  "ring-offset": "#0a0a0a",
  "border-selected": "#ffffff",
  "chart-1": "#1d4ed8",
  "chart-2": "#10b981",
  "chart-3": "#f59e0b",
  "chart-4": "#a855f7",
  "chart-5": "#f43f5e",
  sidebar: "#171717",
  "sidebar-foreground": "#fafafa",
  "sidebar-primary": "#1d4ed8",
  "sidebar-primary-foreground": "#fafafa",
  "sidebar-accent": "#262626",
  "sidebar-accent-foreground": "#fafafa",
  "sidebar-border": "rgba(255,255,255,0.10)",
  "sidebar-ring": "#525252",
};

// Default theme state
const modernMinimalPreset = defaultPresets["modern-minimal"];

export const defaultThemeState: ThemeEditorState = {
  preset: "modern-minimal",
  styles: {
    light: {
      ...defaultLightThemeStyles,
      ...(modernMinimalPreset?.styles.light || {}),
    },
    dark: {
      ...defaultDarkThemeStyles,
      ...(modernMinimalPreset?.styles.light || {}),
      ...(modernMinimalPreset?.styles.dark || {}),
    },
  },
  currentMode:
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  hslAdjustments: {
    hueShift: 0,
    saturationScale: 1,
    lightnessScale: 1,
  },
};
