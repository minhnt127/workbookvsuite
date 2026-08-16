"use client";

import { ComponentDocs } from "@/components/component-docs/component-docs";
import { ThemeEditorPreviewProps } from "@/types/theme";

interface ComponentsShowcaseProps {
  styles: ThemeEditorPreviewProps["styles"];
  currentMode: ThemeEditorPreviewProps["currentMode"];
}

export default function ComponentsShowcase({ styles, currentMode }: ComponentsShowcaseProps) {
  if (!styles || !styles[currentMode]) return null;
  return <ComponentDocs embedded />;
}
