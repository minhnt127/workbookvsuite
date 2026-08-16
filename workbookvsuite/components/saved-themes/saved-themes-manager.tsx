"use client";

import { ThemePreview } from "@/components/theme-preview";
import { AddThemeDialog } from "@/components/add-theme-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useEditorStore } from "@/store/editor-store";
import { SavedTheme, useSavedThemesStore } from "@/store/saved-themes-store";
import { Copy, Edit3, MoreHorizontal, Palette, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function SavedThemesManager() {
  const router = useRouter();
  const themes = useSavedThemesStore((state) => state.themes);
  const updateTheme = useSavedThemesStore((state) => state.updateTheme);
  const duplicateTheme = useSavedThemesStore((state) => state.duplicateTheme);
  const deleteTheme = useSavedThemesStore((state) => state.deleteTheme);
  const setThemeState = useEditorStore((state) => state.setThemeState);
  const currentMode = useEditorStore((state) => state.themeState.currentMode);
  const currentThemeState = useEditorStore((state) => state.themeState);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("updated");
  const [renameTheme, setRenameTheme] = useState<SavedTheme | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [deleteCandidate, setDeleteCandidate] = useState<SavedTheme | null>(null);

  useEffect(() => setMounted(true), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const items = themes.filter((theme) => !q || theme.name.toLowerCase().includes(q));
    return [...items].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "created") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [themes, query, sort]);

  const openWorkspace = (theme: SavedTheme) => {
    setThemeState({ ...currentThemeState, styles: theme.styles, preset: theme.id });
    router.push(`/components?saved=${theme.id}`);
  };

  const handleDuplicate = (id: string) => {
    const duplicated = duplicateTheme(id);
    if (duplicated) toast({ title: "Theme duplicated", description: `Created “${duplicated.name}”.` });
  };

  if (!mounted) {
    return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[1,2,3].map((n)=><div key={n} className="h-64 animate-pulse rounded-xl border bg-muted/40" />)}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2"><Badge variant="secondary">Local workspace</Badge><Badge variant="outline">{themes.length} saved</Badge></div>
          <h1 className="text-3xl font-semibold tracking-tight">Saved Themes</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">Manage themes you saved from the editor. They stay in this browser and do not require an account.</p>
        </div>
        <AddThemeDialog />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/><Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search saved themes…" className="pl-9"/></div>
        <Select value={sort} onValueChange={setSort}><SelectTrigger className="w-full sm:w-[180px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="updated">Recently updated</SelectItem><SelectItem value="created">Recently created</SelectItem><SelectItem value="name">Name A–Z</SelectItem></SelectContent></Select>
      </div>

      {themes.length === 0 ? (
        <Card className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
          <div className="mb-5 rounded-full bg-primary/10 p-4"><Palette className="size-9 text-primary" /></div>
          <h2 className="text-xl font-semibold">No saved themes yet</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">Use <strong className="text-foreground">Thêm theme</strong> to create a theme, then customize it from the Components workspace.</p>
          <div className="mt-5"><AddThemeDialog /></div>
        </Card>
      ) : filtered.length === 0 ? (
        <Card className="p-12 text-center"><Search className="mx-auto mb-3 size-8 text-muted-foreground"/><p className="font-medium">No theme matches “{query}”</p></Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((theme) => (
            <Card key={theme.id} className="group overflow-hidden p-0 transition-shadow hover:shadow-md">
              <button type="button" onClick={()=>openWorkspace(theme)} className="block h-40 w-full overflow-hidden border-b bg-muted text-left">
                <ThemePreview styles={theme.styles[currentMode]} name={theme.name} className="transition-transform duration-300 group-hover:scale-[1.02]" />
              </button>
              <div className="flex items-start justify-between gap-3 p-4">
                <div className="min-w-0"><h3 className="truncate font-semibold">{theme.name}</h3><p className="mt-1 text-xs text-muted-foreground">Updated {new Date(theme.updatedAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</p></div>
                <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="-mr-2 size-8"><MoreHorizontal className="size-4"/></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-44"><DropdownMenuItem onClick={()=>openWorkspace(theme)}><Edit3 className="size-4"/>Open components</DropdownMenuItem><DropdownMenuItem onClick={()=>{setRenameTheme(theme);setRenameValue(theme.name)}}><Edit3 className="size-4"/>Rename</DropdownMenuItem><DropdownMenuItem onClick={()=>handleDuplicate(theme.id)}><Copy className="size-4"/>Duplicate</DropdownMenuItem><DropdownMenuSeparator/><DropdownMenuItem className="text-destructive focus:text-destructive" onClick={()=>setDeleteCandidate(theme)}><Trash2 className="size-4"/>Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
              </div>
              <div className="grid grid-cols-6 gap-1 px-4 pb-4">
                {[theme.styles[currentMode].primary, theme.styles[currentMode].secondary, theme.styles[currentMode].accent, theme.styles[currentMode].positive, theme.styles[currentMode].attention, theme.styles[currentMode].brand].map((color, i)=><div key={i} className="h-3 rounded-full border" style={{background: color || "transparent"}} />)}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!renameTheme} onOpenChange={(open)=>!open&&setRenameTheme(null)}>
        <DialogContent className="sm:max-w-md"><DialogHeader><DialogTitle>Rename theme</DialogTitle><DialogDescription>Change the name shown in your saved themes library.</DialogDescription></DialogHeader><div className="space-y-2 py-2"><Label htmlFor="rename-theme">Theme name</Label><Input id="rename-theme" value={renameValue} onChange={(e)=>setRenameValue(e.target.value)} /></div><DialogFooter><Button variant="outline" onClick={()=>setRenameTheme(null)}>Cancel</Button><Button onClick={()=>{if(renameTheme){updateTheme(renameTheme.id,{name:renameValue.trim()||renameTheme.name});setRenameTheme(null);toast({title:"Theme renamed"})}}}>Save</Button></DialogFooter></DialogContent>
      </Dialog>

      <Dialog open={!!deleteCandidate} onOpenChange={(open)=>!open&&setDeleteCandidate(null)}>
        <DialogContent className="sm:max-w-md"><DialogHeader><DialogTitle>Delete “{deleteCandidate?.name}”?</DialogTitle><DialogDescription>This removes the theme from this browser. This action cannot be undone.</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={()=>setDeleteCandidate(null)}>Cancel</Button><Button variant="destructive" onClick={()=>{if(deleteCandidate){deleteTheme(deleteCandidate.id);setDeleteCandidate(null);toast({title:"Theme deleted"})}}}>Delete theme</Button></DialogFooter></DialogContent>
      </Dialog>
    </div>
  );
}
