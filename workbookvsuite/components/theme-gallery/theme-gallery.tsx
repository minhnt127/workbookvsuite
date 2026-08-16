"use client";

import { ThemePreview } from "@/components/theme-preview";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/editor-store";
import { useSavedThemesStore } from "@/store/saved-themes-store";
import { useThemePresetStore } from "@/store/theme-preset-store";
import type { ThemeStyleProps } from "@/types/theme";
import { getBuiltInThemeStyles } from "@/utils/theme-preset-helper";
import { Bookmark, Check, LayoutGrid, ListFilter, Search, UserRound, Heart, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const curated = [
  ["modern-minimal", "Modern Minimal", ["minimal", "professional"]],
  ["clean-slate", "Clean Slate", ["minimal", "clean"]],
  ["sage-garden", "Sage Garden", ["nature", "soft"]],
  ["violet-bloom", "Violet Bloom", ["colorful", "modern"]],
  ["ocean-breeze", "Ocean Breeze", ["cool", "professional"]],
  ["elegant-luxury", "Elegant Luxury", ["elegant", "premium"]],
  ["amber-minimal", "Amber Minimal", ["warm", "minimal"]],
  ["mocha-mousse", "Mocha Mousse", ["warm", "editorial"]],
  ["amethyst-haze", "Amethyst Haze", ["soft", "colorful"]],
  ["bold-tech", "Bold Tech", ["tech", "bold"]],
  ["pastel-dreams", "Pastel Dreams", ["soft", "pastel"]],
  ["solar-dusk", "Solar Dusk", ["warm", "dark"]],
] as const;

type GalleryCard = {
  id: string;
  name: string;
  tags: readonly string[];
  likes: number;
  source: "system" | "mine";
  styles: ThemeStyleProps;
};

type SourceFilter = "all" | "mine";
type SortOption = "popular" | "recent" | "name";

const sourceMeta: Record<SourceFilter, { label: string; description: string; icon: LucideIcon }> = {
  all: {
    label: "All Themes",
    description: "Khám phá toàn bộ theme hệ thống và theme bạn đã lưu.",
    icon: LayoutGrid,
  },
  mine: {
    label: "My Themes",
    description: "Theme bạn tự tạo và lưu trong trình duyệt này.",
    icon: Bookmark,
  },
};

function ThemeCard({ card, active, onSelect }: { card: GalleryCard; active: boolean; onSelect: () => void }) {
  return (
    <button onClick={onSelect} className="group text-left">
      <div
        className={cn(
          "relative h-44 overflow-hidden rounded-lg border bg-card shadow-xs transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md",
          active && "border-[var(--border-selected)] ring-2 ring-ring/30"
        )}
      >
        <ThemePreview styles={card.styles} name={card.name} />
        <div className="absolute left-2.5 top-2.5 flex max-w-[75%] flex-wrap gap-1">
          {card.source === "mine" && (
            <span className="flex items-center gap-1 rounded-full border bg-background/90 px-2 py-0.5 text-[10px] font-medium backdrop-blur">
              <UserRound className="size-3" /> My theme
            </span>
          )}
          {card.tags
            .filter((tag) => tag !== "my theme")
            .slice(0, 2)
            .map((tag) => (
              <span key={tag} className="rounded-full border bg-background/85 px-2 py-0.5 text-[10px] backdrop-blur">
                {tag}
              </span>
            ))}
        </div>
        {active && (
          <span className="absolute right-2.5 top-2.5 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
            <Check className="size-4" />
          </span>
        )}
      </div>
      <div className="mt-2 flex items-start justify-between gap-3 px-0.5">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{card.name}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {card.source === "mine" ? "My theme" : "Theme Library"}
          </p>
        </div>
        {card.source === "system" && (
          <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
            <Heart className="size-3.5" />
            {card.likes}
          </span>
        )}
      </div>
    </button>
  );
}

export function ThemeGallery() {
  const router = useRouter();
  const applyThemePreset = useEditorStore((state) => state.applyThemePreset);
  const setThemeState = useEditorStore((state) => state.setThemeState);
  const state = useEditorStore((state) => state.themeState);
  const savedThemes = useSavedThemesStore((state) => state.themes);
  const [query, setQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [sort, setSort] = useState<SortOption>("popular");
  const normalized = query.trim().toLowerCase();

  const { mineCards, systemCards } = useMemo(() => {
    const mine: GalleryCard[] = savedThemes.map((theme) => ({
      id: theme.id,
      name: theme.name,
      tags: ["my theme", "custom"],
      likes: 0,
      source: "mine",
      styles: theme.styles[state.currentMode],
    }));

    const system: GalleryCard[] = curated
      .map(([id, name, tags], index) => {
        const preset = getBuiltInThemeStyles(id);
        return preset
          ? {
              id,
              name,
              tags,
              likes: 291 - index * 13,
              source: "system" as const,
              styles: preset.styles[state.currentMode],
            }
          : null;
      })
      .filter(Boolean) as GalleryCard[];

    const filterByQuery = (items: GalleryCard[]) =>
      items.filter(
        (card) =>
          !normalized ||
          card.name.toLowerCase().includes(normalized) ||
          card.tags.some((tag) => tag.toLowerCase().includes(normalized))
      );

    const sortItems = (items: GalleryCard[]) => {
      const next = [...items];
      if (sort === "name") return next.sort((a, b) => a.name.localeCompare(b.name));
      if (sort === "recent") return next.sort((a, b) => (a.source === "mine" ? -1 : b.source === "mine" ? 1 : 0));
      return next.sort((a, b) => b.likes - a.likes);
    };

    return {
      mineCards: sortItems(filterByQuery(mine)),
      systemCards: sortItems(filterByQuery(system)),
    };
  }, [normalized, savedThemes, sort, state.currentMode]);

  const visibleMine = sourceFilter === "all" || sourceFilter === "mine" ? mineCards : [];
  const visibleSystem = sourceFilter === "all" ? systemCards : [];
  const totalVisible = visibleMine.length + visibleSystem.length;

  const selectCard = (card: GalleryCard) => {
    if (card.source === "mine") {
      const theme = savedThemes.find((item) => item.id === card.id);
      if (theme) {
        useThemePresetStore
          .getState()
          .registerPreset(theme.id, { label: theme.name, styles: theme.styles, source: "SAVED" });
        setThemeState({ ...state, styles: theme.styles, preset: theme.id });
      }
      router.push(`/components?saved=${card.id}`);
      return;
    }
    applyThemePreset(card.id);
    router.push(`/components?theme=${card.id}`);
  };

  const renderSection = (title: string, description: string, cards: GalleryCard[]) => {
    if (!cards.length) return null;
    return (
      <section className="space-y-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            <Badge variant="secondary">{cards.length}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-x-5 gap-y-7 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {cards.map((card) => {
            const active = (state.preset || "modern-minimal") === card.id;
            return <ThemeCard key={card.id} card={card} active={active} onSelect={() => selectCard(card)} />;
          })}
        </div>
      </section>
    );
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-6 md:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[190px_minmax(0,1fr)] xl:grid-cols-[210px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="px-1 pb-3">
            <p className="text-sm font-medium text-muted-foreground">Themes</p>
          </div>
          <nav className="space-y-1">
            {(Object.keys(sourceMeta) as SourceFilter[]).map((id) => {
              const Icon = sourceMeta[id].icon;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={sourceFilter === id}
                  onClick={() => setSourceFilter(id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                    sourceFilter === id
                      ? "bg-secondary font-medium text-secondary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-[18px] shrink-0" strokeWidth={1.8} />
                  <span>{sourceMeta[id].label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0">
          <div className="mb-6 space-y-4 border-b pb-5">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">{sourceMeta[sourceFilter].label}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{sourceMeta[sourceFilter].description}</p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative w-full sm:max-w-[460px]">
                <Search className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.8} />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search themes..."
                  className="h-12 rounded-xl border-input bg-white pl-11 shadow-none dark:bg-background"
                />
              </div>

              <Select value={sort} onValueChange={(value) => setSort(value as SortOption)}>
                <SelectTrigger className="h-12 w-full rounded-xl border-input bg-white px-3.5 shadow-none hover:bg-white focus:ring-2 focus:ring-ring/30 dark:bg-background dark:hover:bg-background sm:w-[230px] [&>svg]:size-5">
                  <span className="flex min-w-0 items-center gap-2">
                    <ListFilter className="size-5 shrink-0 text-muted-foreground" strokeWidth={1.8} />
                    <SelectValue placeholder="Popular / All Time" />
                  </span>
                </SelectTrigger>
                <SelectContent align="start" className="rounded-xl border bg-white p-1 shadow-lg dark:bg-popover">
                  <SelectItem value="popular">Popular / All Time</SelectItem>
                  <SelectItem value="recent">Newest</SelectItem>
                  <SelectItem value="name">Name / A–Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {totalVisible === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
              <Search className="mb-3 size-8 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Không tìm thấy theme phù hợp</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">Thử từ khóa khác hoặc chuyển sang nhóm theme khác.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {sourceFilter === "all" ? (
                <>
                  {renderSection("My Themes", "Các theme bạn tự tạo và lưu cục bộ.", visibleMine)}
                  {renderSection("Theme Library", "Các theme hệ thống dùng làm điểm bắt đầu cho component và customizer.", visibleSystem)}
                </>
              ) : (
                renderSection("My Themes", sourceMeta.mine.description, visibleMine)
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
