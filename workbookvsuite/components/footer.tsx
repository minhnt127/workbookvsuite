import Logo from "@/assets/logo.svg";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto flex flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="space-y-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo className="size-6" />
            <span>V-Suite Theme Studio</span>
          </Link>
          <p className="max-w-xl text-sm text-muted-foreground">
            Open shadcn/ui theme editing with V-Suite semantic tokens and component-level preview.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link className="hover:text-foreground" href="/editor/theme">Editor</Link>
          <Link className="hover:text-foreground" href="/editor/theme?p=components">Components</Link>
          <Link className="hover:text-foreground" href="/#features">Features</Link>
          <Link className="hover:text-foreground" href="/#faq">FAQ</Link>
        </nav>
      </div>
    </footer>
  );
}
