"use client";

import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, ChevronDown, Copy, ExternalLink, MousePointer2, Palette, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { componentCategories, componentDocs, getComponentDoc } from "./component-registry";
import { useSavedThemesStore } from "@/store/saved-themes-store";
import { useEditorStore } from "@/store/editor-store";
import { useThemePresetStore } from "@/store/theme-preset-store";
import { ExportDesignSystemButton } from "./export-design-system-button";

function CodePanel({ code }: { code: string }) {
  const lines = code.split("\n");
  return (
    <div className="relative overflow-hidden rounded-xl border bg-muted/20">
      <div className="flex h-10 items-center justify-between border-b px-3">
        <span className="font-mono text-xs text-muted-foreground">tsx</span>
        <CopyButton textToCopy={code} className="size-7" />
      </div>
      <ScrollArea className="max-h-[420px] w-full">
        <pre className="min-w-max p-4 text-sm leading-6">
          <code className="font-mono">
            {lines.map((line, index) => (
              <span key={`${index}-${line}`} className="grid grid-cols-[2.25rem_1fr] gap-3">
                <span className="select-none text-right text-muted-foreground/50">{index + 1}</span>
                <span>{line || " "}</span>
              </span>
            ))}
          </code>
        </pre>
      </ScrollArea>
    </div>
  );
}


function InteractivePreview({ children }: { children: ReactNode }) {
  const [interaction, setInteraction] = useState("Idle");

  return (
    <div
      className="relative flex w-full items-center justify-center"
      onPointerEnter={() => setInteraction("Hover")}
      onPointerLeave={() => setInteraction("Idle")}
      onPointerDown={() => setInteraction("Pressed")}
      onPointerUp={() => setInteraction("Hover")}
      onFocusCapture={() => setInteraction("Focus visible")}
      onBlurCapture={() => setInteraction("Idle")}
    >
      <div className="absolute right-0 top-0 flex items-center gap-1.5 rounded-full border bg-background/90 px-2 py-1 text-[11px] font-medium text-muted-foreground shadow-xs backdrop-blur">
        <MousePointer2 className="size-3" />
        {interaction}
      </div>
      {children}
    </div>
  );
}

function InstallCommand({ slug }: { slug: string }) {
  const [manager, setManager] = useState("pnpm");
  const commandMap: Record<string, string> = {
    pnpm: `pnpm dlx shadcn@latest add ${slug}`,
    npm: `npx shadcn@latest add ${slug}`,
    yarn: `yarn dlx shadcn@latest add ${slug}`,
    bun: `bunx --bun shadcn@latest add ${slug}`,
  };
  const command = commandMap[manager];

  return (
    <div className="overflow-hidden rounded-xl border bg-muted/20">
      <div className="flex items-center justify-between border-b px-2 py-1.5">
        <Tabs value={manager} onValueChange={setManager}>
          <TabsList className="h-8 bg-transparent p-0">
            {Object.keys(commandMap).map((item) => (
              <TabsTrigger key={item} value={item} className="h-7 px-2.5 text-xs data-[state=active]:bg-background data-[state=active]:shadow-xs">
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <CopyButton textToCopy={command} className="size-7" />
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-sm"><code>{command}</code></pre>
    </div>
  );
}

function ComponentSidebar({ activeSlug, activeView, onSelect }: { activeSlug: string; activeView: string; onSelect: (slug: string) => void }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();

  return (
    <aside className="hidden h-full min-h-0 w-[210px] shrink-0 border-r bg-background lg:flex lg:flex-col">
      <div className="border-b p-3">
        <p className="mb-2 px-1 text-xs font-medium text-muted-foreground">Components</p>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" className="h-8 pl-8 text-xs" />
        </div>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-5 p-3 pb-8">
          {componentCategories.map((category) => {
            const items = componentDocs.filter((item) => item.category === category && (!normalized || item.name.toLowerCase().includes(normalized)));
            if (!items.length) return null;
            return (
              <div key={category}>
                <p className="mb-1 px-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">{category}</p>
                <div className="space-y-0.5">
                  {items.map((item) => (
                    <button
                      type="button"
                      key={item.slug}
                      onClick={() => onSelect(item.slug)}
                      className={cn(
                        "flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                        activeView !== "customize" && activeSlug === item.slug && "bg-accent font-medium text-accent-foreground"
                      )}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}

function RightToc({ notes, examples }: { notes?: string[]; examples?: { id: string; title: string }[] }) {
  return (
    <aside className="hidden w-[180px] shrink-0 2xl:block">
      <div className="sticky top-0 space-y-5 py-5 pl-5">
        <div>
          <p className="mb-3 text-xs font-medium text-muted-foreground">On This Page</p>
          <nav className="space-y-2 text-xs">
            <a href="#installation" className="block font-medium hover:text-primary">Installation</a>
            <a href="#usage" className="block text-muted-foreground hover:text-foreground">Usage</a>
            <a href="#preview" className="block text-muted-foreground hover:text-foreground">Preview</a>
            {examples?.map((example) => <a key={example.id} href={`#example-${example.id}`} className="block text-muted-foreground hover:text-foreground">{example.title}</a>)}
            {!examples?.length && notes?.map((note) => <a key={note} href="#variants" className="block text-muted-foreground hover:text-foreground">{note}</a>)}
          </nav>
        </div>
        <div className="rounded-xl border bg-muted/20 p-4">
          <p className="text-sm font-semibold">Built for your theme</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">Every example on this page inherits the theme currently active in V-Suite Theme Studio.</p>
        </div>
      </div>
    </aside>
  );
}

export function ComponentDocs({ embedded = false }: { embedded?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams.get("component") || "button";
  const activeView = "components";
  const savedId = searchParams.get("saved");
  const savedThemes = useSavedThemesStore((state) => state.themes);
  const themeState = useEditorStore((state) => state.themeState);
  const setThemeState = useEditorStore((state) => state.setThemeState);
  const [activeSlug, setActiveSlug] = useState(initial);
  const doc = useMemo(() => getComponentDoc(activeSlug), [activeSlug]);
  const index = componentDocs.findIndex((item) => item.slug === doc.slug);
  const previous = index > 0 ? componentDocs[index - 1] : null;
  const next = index < componentDocs.length - 1 ? componentDocs[index + 1] : null;

  useEffect(() => {
    if (!savedId || themeState.preset === savedId) return;
    const saved = savedThemes.find((item) => item.id === savedId);
    if (saved) {
      useThemePresetStore.getState().registerPreset(saved.id, { label: saved.name, styles: saved.styles, source: "SAVED" });
      setThemeState({ ...themeState, styles: saved.styles, preset: saved.id });
    }
  }, [savedId, savedThemes, setThemeState, themeState]);

  const selectComponent = (slug: string) => {
    setActiveSlug(slug);
    const params = new URLSearchParams(searchParams.toString());
    params.set("component", slug);
    params.delete("view");
    router.replace(`${embedded ? "/editor/theme" : "/components"}?${params.toString()}`, { scroll: false });
  };

  const pageCode = `# ${doc.name}\n\n${doc.description}\n\nInstallation\n${`pnpm dlx shadcn@latest add ${doc.slug}`}\n\nUsage\n${doc.usage}`;

  return (
    <div className={cn("flex min-h-0 w-full bg-background text-foreground", embedded ? "h-full" : "min-h-[calc(100svh-3.5rem)]")}>
      <ComponentSidebar activeSlug={doc.slug} activeView={activeView} onSelect={selectComponent} />

      <ScrollArea className="min-h-0 min-w-0 flex-1">
        <div className="mx-auto flex w-full max-w-[1100px] gap-6 px-5 py-5 md:px-8 lg:py-7">
          <main className="min-w-0 flex-1">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-2 lg:hidden">
                  <Badge variant="secondary">Components</Badge>
                  <Badge variant="outline">{doc.category}</Badge>
                </div>
                <h1 className="text-3xl font-semibold tracking-tight">{doc.name}</h1>
                <p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">{doc.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button variant="ghost" size="sm" className="hidden gap-2 lg:inline-flex" asChild>
                  <a href={`https://ui.shadcn.com/docs/components/radix/${doc.slug}`} target="_blank" rel="noreferrer">
                    shadcn/ui <ExternalLink className="size-3.5" />
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="hidden gap-2 lg:inline-flex" onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete("view");
                  const query = params.toString();
                  router.push(`/components/customize${query ? `?${query}` : ""}`);
                }}>
                  <Palette className="size-4" /> Customize theme
                </Button>
                <ExportDesignSystemButton />
                <Button variant="secondary" size="sm" className="hidden gap-2 xl:inline-flex" onClick={() => navigator.clipboard?.writeText(pageCode)}>
                  <Copy className="size-4" /> Copy Page <ChevronDown className="size-3.5" />
                </Button>
                <Button variant="secondary" size="icon" className="size-9" disabled={!previous} onClick={() => previous && selectComponent(previous.slug)}><ArrowLeft className="size-4" /></Button>
                <Button variant="secondary" size="icon" className="size-9" disabled={!next} onClick={() => next && selectComponent(next.slug)}><ArrowRight className="size-4" /></Button>
              </div>
            </div>

            <section id="preview" className="scroll-mt-6">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="mb-4 h-10 bg-transparent p-0">
                  <TabsTrigger value="preview" className="rounded-none border-b-2 border-transparent px-0 pr-6 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none">Preview</TabsTrigger>
                  <TabsTrigger value="code" className="rounded-none border-b-2 border-transparent px-0 pr-6 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="m-0">
                  <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <MousePointer2 className="size-3.5" /> Hover, focus, click, type and open controls directly. The primitive keeps its real shadcn/Radix interaction behavior while inheriting the active V-Suite theme.
                  </div>
                  <div className="relative flex min-h-[340px] items-center justify-center rounded-2xl border bg-card p-6 shadow-xs md:min-h-[390px] md:p-10">
                    <InteractivePreview>{doc.preview}</InteractivePreview>
                  </div>
                </TabsContent>
                <TabsContent value="code" className="m-0"><CodePanel code={doc.usage} /></TabsContent>
              </Tabs>
            </section>

            <section id="installation" className="mt-12 scroll-mt-6">
              <h2 className="text-xl font-semibold tracking-tight">Installation</h2>
              <Separator className="my-4" />
              <Tabs defaultValue="command">
                <TabsList className="mb-4 h-9 bg-transparent p-0">
                  <TabsTrigger value="command" className="rounded-none border-b-2 border-transparent px-0 pr-6 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none">Command</TabsTrigger>
                  <TabsTrigger value="manual" className="rounded-none border-b-2 border-transparent px-0 pr-6 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none">Manual</TabsTrigger>
                </TabsList>
                <TabsContent value="command" className="m-0"><InstallCommand slug={doc.slug} /></TabsContent>
                <TabsContent value="manual" className="m-0"><CodePanel code={`// Copy the ${doc.name} primitive into components/ui/${doc.slug}.tsx\n// Then import it from your application using the usage example below.`} /></TabsContent>
              </Tabs>
            </section>

            <section id="usage" className="mt-12 scroll-mt-6">
              <h2 className="text-xl font-semibold tracking-tight">Usage</h2>
              <Separator className="my-4" />
              <CodePanel code={doc.usage} />
            </section>

            {doc.examples?.length ? (
              <section id="states" className="mt-12 pb-10">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold tracking-tight">States & interactions</h2>
                  <p className="mt-1 text-sm text-muted-foreground">These examples use the production V-Suite/shadcn primitives, so hover, focus, pressed, open/closed, disabled and validation behavior all inherit the active theme.</p>
                </div>
                <div className="space-y-10">
                  {doc.examples.map((example) => (
                    <article key={example.id} id={`example-${example.id}`} className="scroll-mt-20">
                      <div className="mb-3">
                        <h3 className="text-base font-semibold">{example.title}</h3>
                        {example.description && <p className="mt-1 text-sm leading-6 text-muted-foreground">{example.description}</p>}
                      </div>
                      <Tabs defaultValue="preview" className="w-full">
                        <TabsList className="mb-3 h-9 bg-transparent p-0">
                          <TabsTrigger value="preview" className="rounded-none border-b-2 border-transparent px-0 pr-5 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none">Preview</TabsTrigger>
                          <TabsTrigger value="code" className="rounded-none border-b-2 border-transparent px-0 pr-5 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none">Code</TabsTrigger>
                        </TabsList>
                        <TabsContent value="preview" className="m-0"><div className="flex min-h-48 items-center justify-center rounded-xl border bg-card p-6"><InteractivePreview>{example.preview}</InteractivePreview></div></TabsContent>
                        <TabsContent value="code" className="m-0"><CodePanel code={example.code} /></TabsContent>
                      </Tabs>
                    </article>
                  ))}
                </div>
              </section>
            ) : doc.notes?.length ? (
              <section id="variants" className="mt-12 scroll-mt-6 pb-10">
                <h2 className="text-xl font-semibold tracking-tight">Supported states</h2>
                <Separator className="my-4" />
                <div className="flex flex-wrap gap-2">{doc.notes.map((note) => <Badge key={note} variant="outline">{note}</Badge>)}</div>
              </section>
            ) : <div className="h-10" />}
          </main>
          <RightToc notes={doc.notes} examples={doc.examples} />
        </div>
      </ScrollArea>
    </div>
  );
}
