"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useEditorStore } from "@/store/editor-store";
import { useSavedThemesStore } from "@/store/saved-themes-store";
import type { ThemeStyleProps } from "@/types/theme";
import { defaultPresets } from "@/utils/theme-presets";
import { componentCategories, componentDocs } from "./component-registry";
import { Check, Copy, Download, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

const TOKEN_ORDER: (keyof ThemeStyleProps)[] = [
  "background", "foreground", "card", "card-foreground", "popover", "popover-foreground",
  "primary", "primary-foreground", "secondary", "secondary-foreground", "muted", "muted-foreground",
  "accent", "accent-foreground", "destructive", "destructive-foreground", "destructive-muted",
  "positive", "positive-foreground", "positive-muted", "attention", "attention-foreground", "attention-muted",
  "brand", "brand-foreground", "border", "border-selected", "input", "ring", "ring-offset",
  "chart-1", "chart-2", "chart-3", "chart-4", "chart-5",
  "sidebar", "sidebar-foreground", "sidebar-primary", "sidebar-primary-foreground", "sidebar-accent",
  "sidebar-accent-foreground", "sidebar-border", "sidebar-ring",
];

function cssVariables(styles: ThemeStyleProps) {
  return TOKEN_ORDER.map((key) => {
    const value = styles[key];
    return value ? `  --${key}: ${value};` : null;
  }).filter(Boolean).join("\n");
}

function componentInventory() {
  return componentCategories.map((category) => {
    const names = componentDocs.filter((item) => item.category === category).map((item) => `\`${item.name}\``).join(" · ");
    return `### ${category}\n${names}`;
  }).join("\n\n");
}

function buildDesignSystemMarkdown(name: string, light: ThemeStyleProps, dark: ThemeStyleProps) {
  const shared = light;
  return `# ${name} — V-Suite Design System\n\n` +
`> AI-ready design-system context exported from V-Suite Theme Studio. Paste this file into Claude, ChatGPT, Cursor, Windsurf, v0, Gemini, Lovable or another coding assistant before asking it to build UI.\n\n` +
`## Implementation stack\n\n- React / Next.js\n- shadcn/ui primitives\n- Radix/Base UI interactions where used by shadcn\n- Tailwind CSS with semantic CSS variables\n- lucide-react icons\n\n` +
`## Rules for AI coding\n\n1. Reuse the listed shadcn/ui components before creating new primitives.\n2. Never hard-code theme colors in component markup. Use semantic tokens such as \`bg-background\`, \`text-foreground\`, \`bg-primary\`, \`text-muted-foreground\`, \`border-border\`, \`ring-ring\`.\n3. Preserve component interactions and accessibility states: hover, focus-visible, pressed, checked, open/closed, disabled, invalid and keyboard behavior.\n4. Components must work in both light and dark mode.\n5. Use the exported radius, spacing, typography and shadow values consistently.\n6. Icons should come from \`lucide-react\`.\n7. Prefer composition over one-off custom CSS.\n\n` +
`## Theme\n\n### Light\n\n\`\`\`css\n:root {\n${cssVariables(light)}\n  --radius: ${shared.radius};\n  --spacing: ${shared.spacing || "0.25rem"};\n  --font-sans: ${shared["font-sans"]};\n  --font-serif: ${shared["font-serif"]};\n  --font-mono: ${shared["font-mono"]};\n  --letter-spacing: ${shared["letter-spacing"]};\n}\n\`\`\`\n\n` +
`### Dark\n\n\`\`\`css\n.dark {\n${cssVariables(dark)}\n}\n\`\`\`\n\n` +
`## Geometry & typography\n\n- Sans: \`${shared["font-sans"]}\`\n- Serif: \`${shared["font-serif"]}\`\n- Mono: \`${shared["font-mono"]}\`\n- Radius: \`${shared.radius}\`\n- Spacing unit: \`${shared.spacing || "0.25rem"}\`\n- Letter spacing: \`${shared["letter-spacing"]}\`\n- Shadow: color \`${shared["shadow-color"]}\`, opacity \`${shared["shadow-opacity"]}\`, blur \`${shared["shadow-blur"]}\`, spread \`${shared["shadow-spread"]}\`, offset \`${shared["shadow-offset-x"]} ${shared["shadow-offset-y"]}\`\n\n` +
`## Component inventory\n\n${componentInventory()}\n\n` +
`## shadcn usage convention\n\nInstall a primitive only when it is not already present:\n\n\`\`\`bash\npnpm dlx shadcn@latest add button input select dialog table tabs\n\`\`\`\n\nImport from the project component layer:\n\n\`\`\`tsx\nimport { Button } from "@/components/ui/button"\nimport { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"\n\`\`\`\n\n` +
`## Prompt starter\n\nBuild the requested interface using the **${name}** V-Suite Design System above. Treat these tokens and component conventions as the source of truth. Reuse shadcn/ui components, preserve their real interaction/accessibility states, and do not invent a parallel visual language. Make the result responsive and test both light and dark mode.\n`;
}

export function ExportDesignSystemButton({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<"design" | "prompt" | null>(null);
  const themeState = useEditorStore((state) => state.themeState);
  const savedThemes = useSavedThemesStore((state) => state.themes);

  const presetId = themeState.preset || "modern-minimal";
  const saved = savedThemes.find((theme) => theme.id === presetId);
  const system = defaultPresets[presetId];
  const themeName = saved?.name || system?.label || "Modern Minimal";

  const markdown = useMemo(
    () => buildDesignSystemMarkdown(themeName, themeState.styles.light, themeState.styles.dark),
    [themeName, themeState.styles.dark, themeState.styles.light]
  );

  const aiPrompt = useMemo(() => `Use the attached/exported “${themeName} — V-Suite Design System” as the source of truth for this task. Build with React/Next.js, shadcn/ui, Tailwind semantic tokens and lucide-react. Reuse existing components before creating new ones. Preserve hover, focus-visible, pressed, open/closed, checked, disabled, invalid and keyboard interactions. Do not hard-code colors or spacing that already exist in the design-system tokens. Support both light and dark mode.`, [themeName]);

  const copyText = async (kind: "design" | "prompt", value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(kind);
    toast({ title: kind === "design" ? "Design System copied" : "AI prompt copied", description: "Ready to paste into your AI coding tool." });
    window.setTimeout(() => setCopied(null), 1600);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${themeName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "v-suite-theme"}-design-system.md`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    toast({ title: "Design System exported", description: "The .md file is ready for Claude, ChatGPT, Cursor, v0 and other AI tools." });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="gap-2">
          <Sparkles className="size-4" />
          <span className={compact ? "hidden xl:inline" : "hidden sm:inline"}>Export Design System</span>
          <span className={compact ? "xl:hidden" : "sm:hidden"}>Export</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle>Export Design System</DialogTitle>
          <DialogDescription>
            Export <strong className="font-medium text-foreground">{themeName}</strong> as AI-ready context for vibe coding without losing the theme tokens or shadcn interaction conventions.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="design-system" className="min-h-0">
          <div className="border-b px-6 pt-3">
            <TabsList className="h-9 bg-transparent p-0">
              <TabsTrigger value="design-system" className="rounded-none border-b-2 border-transparent px-0 pr-6 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none">Design System.md</TabsTrigger>
              <TabsTrigger value="prompt" className="rounded-none border-b-2 border-transparent px-0 pr-6 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none">AI prompt</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="design-system" className="m-0">
            <div className="flex items-center justify-between gap-3 border-b bg-muted/20 px-6 py-3">
              <p className="text-xs text-muted-foreground">Full tokens, typography, geometry, component inventory and AI implementation rules.</p>
              <Button variant="outline" size="sm" onClick={() => copyText("design", markdown)}>
                {copied === "design" ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
              </Button>
            </div>
            <ScrollArea className="h-[390px]">
              <pre className="whitespace-pre-wrap break-words p-6 font-mono text-xs leading-6"><code>{markdown}</code></pre>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="prompt" className="m-0">
            <div className="p-6">
              <div className="rounded-xl border bg-muted/20 p-4 text-sm leading-7">{aiPrompt}</div>
              <Button variant="outline" className="mt-4" onClick={() => copyText("prompt", aiPrompt)}>
                {copied === "prompt" ? <Check className="size-4" /> : <Copy className="size-4" />} Copy prompt
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter className="border-t px-6 py-4 sm:justify-between">
          <p className="text-xs text-muted-foreground">Recommended: attach the .md file to your AI chat, then paste the prompt starter.</p>
          <Button onClick={downloadMarkdown}><Download className="size-4" /> Download .md</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
