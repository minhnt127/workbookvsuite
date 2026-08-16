"use client";

import { AlertCircle, Sparkle } from "lucide-react";
import React from "react";

import { ChatInterface } from "@/components/editor/ai/chat-interface";
import { ColorsTabContent } from "@/components/editor/colors-tab-content";
import ControlSection from "@/components/editor/control-section";
import { FontPicker } from "@/components/editor/font-picker";
import HslAdjustmentControls from "@/components/editor/hsl-adjustment-controls";
import ShadowControl from "@/components/editor/shadow-control";
import { SliderWithInput } from "@/components/editor/slider-with-input";
import ThemePresetSelect from "@/components/editor/theme-preset-select";
import TabsTriggerPill from "@/components/editor/theme-preview/tabs-trigger-pill";
import { HorizontalScrollArea } from "@/components/horizontal-scroll-area";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { COMMON_STYLES, defaultThemeState } from "@/config/theme";
import { useAIThemeGenerationCore } from "@/hooks/use-ai-theme-generation-core";
import { useControlsTabFromUrl, type ControlTab } from "@/hooks/use-controls-tab-from-url";
import { useEditorStore } from "@/store/editor-store";
import { type FontInfo } from "@/types/fonts";
import { ThemeStyles, ThemeStyleProps } from "@/types/theme";
import { buildFontFamily } from "@/utils/fonts";
import { getAppliedThemeFont } from "@/utils/theme-fonts";

interface ThemeControlPanelProps {
  styles: ThemeStyles;
  currentMode: "light" | "dark";
  onChange: (styles: ThemeStyles) => void;
  /** Compact public workbench used by Components → Customize Theme. */
  customizerMode?: boolean;
}

const ThemeControlPanel = ({ styles, currentMode, onChange, customizerMode = false }: ThemeControlPanelProps) => {
  const { themeState } = useEditorStore();
  const { tab, handleSetTab } = useControlsTabFromUrl();
  const { isGeneratingTheme } = useAIThemeGenerationCore();

  const currentStyles = React.useMemo(
    () => ({
      ...defaultThemeState.styles[currentMode],
      ...styles?.[currentMode],
    }),
    [currentMode, styles]
  );

  const updateStyle = React.useCallback(
    <K extends keyof typeof currentStyles>(key: K, value: (typeof currentStyles)[K]) => {
      // apply common styles to both light and dark modes
      if (COMMON_STYLES.includes(key)) {
        onChange({
          ...styles,
          light: { ...styles.light, [key]: value },
          dark: { ...styles.dark, [key]: value },
        });
        return;
      }

      onChange({
        ...styles,
        [currentMode]: {
          ...currentStyles,
          [key]: value,
        },
      });
    },
    [onChange, styles, currentMode, currentStyles]
  );

  const updateStyles = React.useCallback(
    (updates: Partial<ThemeStyleProps>) => {
      onChange({
        ...styles,
        [currentMode]: {
          ...currentStyles,
          ...updates,
        },
      });
    },
    [onChange, styles, currentMode, currentStyles]
  );

  // Ensure we have valid styles for the current mode
  if (!currentStyles) {
    return null; // Or some fallback UI
  }

  const radius = parseFloat(currentStyles.radius.replace("rem", ""));

  return (
    <>
      {!customizerMode && (
        <div className="border-b">
          <ThemePresetSelect className="h-14 rounded-none" disabled={isGeneratingTheme} />
        </div>
      )}
      <div className="flex min-h-0 flex-1 flex-col space-y-4">
        <Tabs
          value={tab}
          onValueChange={(v) => handleSetTab(v as ControlTab)}
          className="flex min-h-0 w-full flex-1 flex-col"
        >
          <HorizontalScrollArea className={customizerMode ? "mt-3 mb-2 px-4" : "mt-2 mb-1 px-4"}>
            <TabsList className="bg-background text-muted-foreground inline-flex w-fit items-center justify-center rounded-full px-0">
              <TabsTriggerPill value="colors">Colors</TabsTriggerPill>
              <TabsTriggerPill value="typography">Typography</TabsTriggerPill>
              <TabsTriggerPill value="other">Other</TabsTriggerPill>
              <TabsTriggerPill
                value="ai"
                className={
                  customizerMode
                    ? "gap-1"
                    : "data-[state=active]:[--effect:var(--secondary-foreground)] data-[state=active]:[--foreground:var(--muted-foreground)] data-[state=active]:[--muted-foreground:var(--effect)]"
                }
              >
                <Sparkle className="size-3.5 text-current" />
                {customizerMode ? (
                  <span>Generate</span>
                ) : (
                  <span className="animate-text via-foreground from-muted-foreground to-muted-foreground flex items-center gap-1 bg-gradient-to-r from-50% via-60% to-100% bg-[200%_auto] bg-clip-text text-sm text-transparent">
                    Generate
                  </span>
                )}
              </TabsTriggerPill>
            </TabsList>
          </HorizontalScrollArea>

          <TabsContent value="colors" className="mt-1 size-full overflow-hidden">
            <ColorsTabContent currentStyles={currentStyles} updateStyle={updateStyle} updateStyles={updateStyles} customizerMode={customizerMode} />
          </TabsContent>

          <TabsContent value="typography" className="mt-1 size-full overflow-hidden">
            <ScrollArea className="h-full px-4">
              <div className="text-muted-foreground mb-2 flex items-center gap-2 text-[11px]">
                <AlertCircle className="size-3.5 shrink-0" />
                <p>
                  Custom fonts require embedding.{" "}
                  <a
                    href="https://tailwindcss.com/docs/font-family"
                    target="_blank"
                    className="text-foreground/70 hover:text-foreground underline underline-offset-2 transition-colors"
                  >
                    Learn more
                  </a>
                </p>
              </div>

              <ControlSection title="Font Family" expanded>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="font-sans" className="text-muted-foreground w-16 shrink-0 text-[11px] font-medium">
                      Sans-Serif
                    </Label>
                    <div className="min-w-0 flex-1">
                      <FontPicker
                        value={getAppliedThemeFont(themeState, "font-sans") || undefined}
                        category="sans-serif"
                        className={customizerMode ? "h-9 rounded-full bg-white px-4 dark:bg-background" : undefined}
                        placeholder="Sans-serif font..."
                        onSelect={(font: FontInfo) => {
                          const fontFamily = buildFontFamily(font.family, font.category);
                          updateStyle("font-sans", fontFamily);
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="font-serif" className="text-muted-foreground w-16 shrink-0 text-[11px] font-medium">
                      Serif
                    </Label>
                    <div className="min-w-0 flex-1">
                      <FontPicker
                        value={getAppliedThemeFont(themeState, "font-serif") || undefined}
                        category="serif"
                        className={customizerMode ? "h-9 rounded-full bg-white px-4 dark:bg-background" : undefined}
                        placeholder="Serif font..."
                        onSelect={(font: FontInfo) => {
                          const fontFamily = buildFontFamily(font.family, font.category);
                          updateStyle("font-serif", fontFamily);
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="font-mono" className="text-muted-foreground w-16 shrink-0 text-[11px] font-medium">
                      Mono
                    </Label>
                    <div className="min-w-0 flex-1">
                      <FontPicker
                        value={getAppliedThemeFont(themeState, "font-mono") || undefined}
                        category="monospace"
                        className={customizerMode ? "h-9 rounded-full bg-white px-4 dark:bg-background" : undefined}
                        placeholder="Monospace font..."
                        onSelect={(font: FontInfo) => {
                          const fontFamily = buildFontFamily(font.family, font.category);
                          updateStyle("font-mono", fontFamily);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </ControlSection>

              {!customizerMode && (
                <ControlSection title="Type Scale" expanded>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      ["Body / Base", "16px / 24px"],
                      ["Small", "14px / 20px"],
                      ["Heading / 2XL", "24px / 32px"],
                      ["Display / 4XL", "36px / 40px"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-xl border bg-muted/20 px-3 py-2">
                        <p className="text-xs font-medium text-foreground">{label}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </ControlSection>
              )}

              <ControlSection title="Letter Spacing" expanded>
                <SliderWithInput
                  value={parseFloat(currentStyles["letter-spacing"]?.replace("em", ""))}
                  onChange={(value) => updateStyle("letter-spacing", `${value}em`)}
                  min={-0.5}
                  max={0.5}
                  step={0.025}
                  unit="em"
                  label="Tracking"
                />
              </ControlSection>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="other" className="mt-1 size-full overflow-hidden">
            <ScrollArea className="h-full px-4">
              <ControlSection title="HSL Adjustments" expanded>
                <HslAdjustmentControls />
              </ControlSection>

              <ControlSection title="Radius" expanded>
                <SliderWithInput
                  value={radius}
                  onChange={(value) => updateStyle("radius", `${value}rem`)}
                  min={0}
                  max={5}
                  step={0.025}
                  unit="rem"
                  label="Radius"
                />
              </ControlSection>

              <ControlSection title="Spacing" expanded={customizerMode}>
                <SliderWithInput
                  value={parseFloat(currentStyles?.spacing?.replace("rem", "") || "0")}
                  onChange={(value) => updateStyle("spacing", `${value}rem`)}
                  min={0.15}
                  max={0.35}
                  step={0.01}
                  unit="rem"
                  label="Spacing"
                />
              </ControlSection>

              <ControlSection title="Shadow" expanded={customizerMode}>
                <ShadowControl
                  shadowColor={currentStyles["shadow-color"]}
                  shadowOpacity={parseFloat(currentStyles["shadow-opacity"])}
                  shadowBlur={parseFloat(currentStyles["shadow-blur"]?.replace("px", ""))}
                  shadowSpread={parseFloat(currentStyles["shadow-spread"]?.replace("px", ""))}
                  shadowOffsetX={parseFloat(currentStyles["shadow-offset-x"]?.replace("px", ""))}
                  shadowOffsetY={parseFloat(currentStyles["shadow-offset-y"]?.replace("px", ""))}
                  onChange={(key, value) => {
                    if (key === "shadow-color") {
                      updateStyle(key, value as string);
                    } else if (key === "shadow-opacity") {
                      updateStyle(key, value.toString());
                    } else {
                      updateStyle(key as keyof ThemeStyleProps, `${value}px`);
                    }
                  }}
                />
              </ControlSection>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="ai" className="mt-1 size-full overflow-hidden">
            <ChatInterface />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ThemeControlPanel;
