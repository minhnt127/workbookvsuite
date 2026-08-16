import { ThemeCustomizer } from "@/components/component-docs/theme-customizer";
import { Header } from "@/components/header";
import { SelectedThemeBar } from "@/components/selected-theme-bar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customize Theme — V-Suite Design System",
  description: "Customize the active V-Suite theme with live component previews.",
};

export default function CustomizeThemePage() {
  return (
    <div className="flex h-svh min-h-0 flex-col overflow-hidden bg-background">
      <Header />
      <main className="min-h-0 flex-1 pb-20">
        <ThemeCustomizer />
      </main>
      <SelectedThemeBar />
    </div>
  );
}
