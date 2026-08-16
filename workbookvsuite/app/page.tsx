import { Header } from "@/components/header";
import { ThemeGallery } from "@/components/theme-gallery/theme-gallery";

export default function Home() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <Header />
      <main><ThemeGallery /></main>
    </div>
  );
}
