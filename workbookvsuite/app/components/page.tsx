import { ComponentDocs } from "@/components/component-docs/component-docs";
import { Header } from "@/components/header";
import { SelectedThemeBar } from "@/components/selected-theme-bar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components — V-Suite Theme Studio",
  description: "Preview, install and copy themed shadcn/ui component examples.",
};

export default function ComponentsPage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <Header />
      <main className="min-h-0 flex-1 pb-24"><ComponentDocs /></main>
      <SelectedThemeBar />
    </div>
  );
}
