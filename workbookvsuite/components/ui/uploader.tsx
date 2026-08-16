"use client";

import * as React from "react";
import { UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Uploader({ className, accept, multiple = false, onFiles, ...props }: Omit<React.ComponentProps<"div">, "onChange"> & { accept?: string; multiple?: boolean; onFiles?: (files: File[]) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>([]);
  const update = (next: File[]) => { setFiles(next); onFiles?.(next); };
  const handleFiles = (incoming: FileList | null) => incoming && update(Array.from(incoming));
  return (
    <div data-slot="uploader" className={cn("grid w-full max-w-lg gap-3", className)} {...props}>
      <button
        type="button"
        className="flex min-h-36 flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-muted/20 p-6 text-center transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => { event.preventDefault(); handleFiles(event.dataTransfer.files); }}
      >
        <UploadCloud className="size-6 text-muted-foreground" />
        <div><p className="text-sm font-medium">Drop files here or click to browse</p><p className="mt-1 text-xs text-muted-foreground">Uploader inherits border, ring, muted and radius tokens.</p></div>
      </button>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} className="sr-only" onChange={(event) => handleFiles(event.target.files)} />
      {files.length > 0 && <div className="space-y-2">{files.map((file) => <div key={`${file.name}-${file.size}`} className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm"><span className="min-w-0 flex-1 truncate">{file.name}</span><Button variant="ghost" size="icon-xs" onClick={() => update(files.filter((item) => item !== file))}><X /></Button></div>)}</div>}
    </div>
  );
}
export { Uploader };
