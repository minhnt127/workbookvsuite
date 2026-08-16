"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ButtonGroup } from "@/components/ui/button-group";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Kbd } from "@/components/ui/kbd";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { Uploader } from "@/components/ui/uploader";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUp, Bold, CalendarIcon, Check, ChevronsUpDown, FileText, Info, Italic, MoreHorizontal, Plus, Search } from "lucide-react";
import * as React from "react";
import type { ReactNode } from "react";

export type ComponentCategory =
  | "Layout"
  | "Forms"
  | "Overlay & Navigation"
  | "Feedback & Status"
  | "Data Display"
  | "Utility";

export type ComponentExample = {
  id: string;
  title: string;
  description?: string;
  preview: ReactNode;
  code: string;
};

export type ComponentDoc = {
  slug: string;
  name: string;
  description: string;
  category: ComponentCategory;
  importName?: string;
  usage: string;
  preview: ReactNode;
  examples?: ComponentExample[];
  notes?: string[];
};

function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("modern-minimal");
  const options = [
    ["modern-minimal", "Modern Minimal"],
    ["clean-slate", "Clean Slate"],
    ["sage-garden", "Sage Garden"],
  ] as const;
  const label = options.find(([id]) => id === value)?.[1] ?? "Select theme";
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild><Button variant="outline" role="combobox" aria-expanded={open} className="w-56 justify-between">{label}<ChevronsUpDown className="size-4 opacity-50" /></Button></PopoverTrigger>
      <PopoverContent className="w-56 p-0">
        <Command><CommandInput placeholder="Search theme…" /><CommandList><CommandEmpty>No theme found.</CommandEmpty><CommandGroup>{options.map(([id, name]) => <CommandItem key={id} value={name} onSelect={() => { setValue(id); setOpen(false); }}><Check className={value === id ? "opacity-100" : "opacity-0"} />{name}</CommandItem>)}</CommandGroup></CommandList></Command>
      </PopoverContent>
    </Popover>
  );
}

function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 7, 14));
  return (
    <Popover>
      <PopoverTrigger asChild><Button variant="outline" className="w-60 justify-start"><CalendarIcon className="size-4" />{date ? date.toLocaleDateString() : "Pick a date"}</Button></PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={date} onSelect={setDate} /></PopoverContent>
    </Popover>
  );
}

function DataTableDemo() {
  const [descending, setDescending] = React.useState(false);
  const rows = [{ name: "Modern Minimal", status: "Ready", count: 55 }, { name: "Sage Garden", status: "Ready", count: 55 }, { name: "V-Suite Corporate", status: "Draft", count: 55 }];
  const sorted = [...rows].sort((a, b) => descending ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name));
  return <div className="w-full max-w-xl overflow-hidden rounded-lg border"><Table><TableHeader><TableRow><TableHead><Button variant="ghost" size="sm" className="-ml-3" onClick={() => setDescending(!descending)}>Theme ↕</Button></TableHead><TableHead>Status</TableHead><TableHead className="text-right">Components</TableHead></TableRow></TableHeader><TableBody>{sorted.map((row) => <TableRow key={row.name}><TableCell className="font-medium">{row.name}</TableCell><TableCell><Badge variant={row.status === "Ready" ? "secondary" : "outline"}>{row.status}</Badge></TableCell><TableCell className="text-right">{row.count}</TableCell></TableRow>)}</TableBody></Table></div>;
}

function FormDemo() {
  const [submitted, setSubmitted] = React.useState(false);
  return <form className="w-full max-w-sm space-y-4" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><FieldGroup><Field><FieldLabel htmlFor="form-email">Email</FieldLabel><Input id="form-email" type="email" placeholder="you@example.com" required /><FieldDescription>We use this only for the example interaction.</FieldDescription></Field><Field><FieldLabel htmlFor="form-theme">Theme name</FieldLabel><Input id="form-theme" defaultValue="Modern Minimal" /></Field></FieldGroup><Button type="submit">Submit</Button>{submitted && <p className="text-sm text-positive">Form submitted.</p>}</form>;
}

function SidebarDemo() {
  return <div className="h-64 w-full max-w-md overflow-hidden rounded-xl border"><SidebarProvider defaultOpen><Sidebar collapsible="none" className="relative h-full w-56 border-r"><SidebarContent><SidebarGroup><SidebarGroupLabel>Workspace</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>{["Overview","Components","Themes"].map((item, index) => <SidebarMenuItem key={item}><SidebarMenuButton isActive={index === 1}><span>{item}</span></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarGroupContent></SidebarGroup></SidebarContent></Sidebar></SidebarProvider></div>;
}

const registry: ComponentDoc[] = [
  {
    slug: "accordion",
    name: "Accordion",
    description: "A vertically stacked set of interactive headings that each reveal a section of content.",
    category: "Layout",
    usage: `import {\n  Accordion,\n  AccordionContent,\n  AccordionItem,\n  AccordionTrigger,\n} from "@/components/ui/accordion"\n\nexport function AccordionDemo() {\n  return (\n    <Accordion type="single" collapsible className="w-full">\n      <AccordionItem value="item-1">\n        <AccordionTrigger>Is it accessible?</AccordionTrigger>\n        <AccordionContent>Yes. It follows the WAI-ARIA pattern.</AccordionContent>\n      </AccordionItem>\n    </Accordion>\n  )\n}`,
    preview: (
      <Accordion type="single" collapsible className="w-full max-w-md">
        <AccordionItem value="item-1"><AccordionTrigger>Is it accessible?</AccordionTrigger><AccordionContent>Yes. It follows the WAI-ARIA pattern.</AccordionContent></AccordionItem>
        <AccordionItem value="item-2"><AccordionTrigger>Can I customize it?</AccordionTrigger><AccordionContent>Yes. All visual states inherit the active theme tokens.</AccordionContent></AccordionItem>
      </Accordion>
    ),
  },
  {
    slug: "alert",
    name: "Alert",
    description: "Displays a callout for user attention without interrupting the current task.",
    category: "Feedback & Status",
    usage: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"\nimport { Info } from "lucide-react"\n\nexport function AlertDemo() {\n  return (\n    <Alert>\n      <Info />\n      <AlertTitle>Heads up!</AlertTitle>\n      <AlertDescription>Your theme is ready to preview.</AlertDescription>\n    </Alert>\n  )\n}`,
    preview: <Alert className="max-w-lg"><Info /><AlertTitle>Heads up!</AlertTitle><AlertDescription>Your theme is ready to preview on the full component library.</AlertDescription></Alert>,
  },
  {
    slug: "alert-dialog",
    name: "Alert Dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
    category: "Overlay & Navigation",
    usage: `import {\n  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,\n  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,\n  AlertDialogTitle, AlertDialogTrigger,\n} from "@/components/ui/alert-dialog"\n\nexport function AlertDialogDemo() {\n  return (\n    <AlertDialog>\n      <AlertDialogTrigger asChild><Button variant="outline">Delete theme</Button></AlertDialogTrigger>\n      <AlertDialogContent>...</AlertDialogContent>\n    </AlertDialog>\n  )\n}`,
    preview: (
      <AlertDialog>
        <AlertDialogTrigger asChild><Button variant="outline">Delete theme</Button></AlertDialogTrigger>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete this theme?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction>Continue</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
      </AlertDialog>
    ),
  },
  { slug: "aspect-ratio", name: "Aspect Ratio", description: "Displays content within a desired ratio.", category: "Layout", usage: `import { AspectRatio } from "@/components/ui/aspect-ratio"`, preview: <div className="w-full max-w-md overflow-hidden rounded-xl border"><AspectRatio ratio={16 / 9}><div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">16:9 themed surface</div></AspectRatio></div> },
  { slug: "avatar", name: "Avatar", description: "An image element with a fallback for representing a user.", category: "Data Display", usage: `import { Avatar, AvatarFallback } from "@/components/ui/avatar"\n\n<Avatar><AvatarFallback>VS</AvatarFallback></Avatar>`, preview: <div className="flex items-center gap-3"><Avatar className="size-12"><AvatarFallback>VS</AvatarFallback></Avatar><div><p className="font-medium">V-Suite</p><p className="text-sm text-muted-foreground">Design system</p></div></div> },
  { slug: "badge", name: "Badge", description: "Displays a badge or compact status label.", category: "Data Display", usage: `import { Badge } from "@/components/ui/badge"\n\n<Badge>Default</Badge>\n<Badge variant="secondary">Secondary</Badge>`, preview: <div className="flex flex-wrap gap-2"><Badge>Default</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="outline">Outline</Badge><Badge variant="destructive">Destructive</Badge><Badge className="bg-positive text-positive-foreground">Positive</Badge><Badge className="bg-attention text-attention-foreground">Attention</Badge></div>, examples: [{ id: "variants", title: "Variants & semantic status", description: "Status colors use V-Suite semantic tokens instead of hard-coded palette values.", preview: <div className="flex flex-wrap gap-2"><Badge>Default</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="outline">Outline</Badge><Badge variant="destructive">Destructive</Badge><Badge variant="ghost">Ghost</Badge><Badge className="bg-positive text-positive-foreground">Positive</Badge><Badge className="bg-attention text-attention-foreground">Attention</Badge><Badge className="bg-brand text-brand-foreground">Brand</Badge></div>, code: `<Badge>Default</Badge>\n<Badge variant="secondary">Secondary</Badge>\n<Badge variant="destructive">Destructive</Badge>` }] },
  { slug: "breadcrumb", name: "Breadcrumb", description: "Displays the path to the current resource using a hierarchy of links.", category: "Overlay & Navigation", usage: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"`, preview: <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#">Themes</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator/><BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator/><BreadcrumbItem><BreadcrumbPage>Button</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb> },
  {
    slug: "button",
    name: "Button",
    description: "Displays a button or a component that looks like a button.",
    category: "Forms",
    usage: `import { ArrowUp } from "lucide-react"\nimport { Button } from "@/components/ui/button"\n\nexport function ButtonDemo() {\n  return (\n    <div className="flex gap-2">\n      <Button>Button</Button>\n      <Button size="icon" variant="outline"><ArrowUp /></Button>\n    </div>\n  )\n}`,
    preview: <div className="flex flex-wrap items-center gap-2"><Button>Button</Button><Button variant="outline">Outline</Button><Button variant="secondary">Secondary</Button><Button size="icon" variant="outline"><ArrowUp /></Button></div>,
    examples: [
      { id: "variants", title: "Variants", description: "All production variants from the V-Suite/shadcn Button primitive. Hover and focus states are interactive.", preview: <div className="flex flex-wrap items-center gap-2"><Button>Default</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button><Button variant="destructive">Destructive</Button><Button variant="link">Link</Button><Button variant="accent">Accent</Button></div>, code: `<Button>Default</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="destructive">Destructive</Button>\n<Button variant="link">Link</Button>` },
      { id: "sizes", title: "Sizes", description: "Size tokens and icon-only button states.", preview: <div className="flex flex-wrap items-center gap-2"><Button size="xs">XS</Button><Button size="sm">Small</Button><Button>Default</Button><Button size="lg">Large</Button><Button size="icon"><ArrowUp /></Button><Button size="icon-sm" variant="outline"><ArrowUp /></Button></div>, code: `<Button size="xs">XS</Button>\n<Button size="sm">Small</Button>\n<Button>Default</Button>\n<Button size="lg">Large</Button>\n<Button size="icon"><ArrowUp /></Button>` },
      { id: "states", title: "States", description: "Disabled, loading, focus and invalid styling use semantic ring/destructive tokens from the active theme.", preview: <div className="flex flex-wrap items-center gap-2"><Button disabled>Disabled</Button><Button disabled><Spinner />Loading</Button><Button aria-invalid="true" variant="outline">Invalid</Button><Button className="ring-[3px] ring-ring/50">Focus visible</Button></div>, code: `<Button disabled>Disabled</Button>\n<Button disabled><Spinner />Loading</Button>\n<Button aria-invalid="true" variant="outline">Invalid</Button>` },
      { id: "button-group", title: "Button Group", description: "Grouped actions preserve border, radius and focus stacking interactions.", preview: <ButtonGroup><Button variant="outline">Day</Button><Button variant="outline">Week</Button><Button variant="outline">Month</Button></ButtonGroup>, code: `<ButtonGroup>\n  <Button variant="outline">Day</Button>\n  <Button variant="outline">Week</Button>\n  <Button variant="outline">Month</Button>\n</ButtonGroup>` },
    ],
    notes: ["Default", "Hover", "Focus visible", "Disabled", "Loading", "Outline", "Secondary", "Ghost", "Destructive", "Link", "Icon", "Button Group"],
  },
  { slug: "button-group", name: "Button Group", description: "Groups related buttons while preserving shared borders, radius and keyboard focus states.", category: "Forms", usage: `import { ButtonGroup } from "@/components/ui/button-group"\nimport { Button } from "@/components/ui/button"`, preview: <ButtonGroup><Button variant="outline">Previous</Button><Button variant="outline">Today</Button><Button variant="outline">Next</Button></ButtonGroup>, notes: ["Horizontal", "Vertical", "Focus stacking", "Disabled children"] },
  { slug: "calendar", name: "Calendar", description: "A date field component that allows users to enter and edit dates.", category: "Forms", usage: `import { Calendar } from "@/components/ui/calendar"\n\n<Calendar mode="single" className="rounded-md border" />`, preview: <Calendar mode="single" className="rounded-md border" /> },
  { slug: "card", name: "Card", description: "Displays a card with header, content and footer regions.", category: "Layout", usage: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"`, preview: <Card className="w-full max-w-sm"><CardHeader><CardTitle>Theme preview</CardTitle><CardDescription>Use cards to test surfaces, borders and typography.</CardDescription></CardHeader><CardContent><div className="rounded-lg bg-muted p-4 text-sm">Semantic surfaces inherit the active theme.</div></CardContent><CardFooter className="justify-end gap-2"><Button variant="outline">Cancel</Button><Button>Save</Button></CardFooter></Card> },
  { slug: "carousel", name: "Carousel", description: "A carousel with motion and swipe gestures.", category: "Layout", usage: `import { Carousel } from "@/components/ui/carousel"`, preview: <Carousel className="w-full max-w-xs"><CarouselContent>{[1,2,3].map((item)=><CarouselItem key={item}><div className="flex aspect-square items-center justify-center rounded-xl border bg-card text-4xl font-semibold">{item}</div></CarouselItem>)}</CarouselContent><CarouselPrevious/><CarouselNext/></Carousel> },
  { slug: "chart", name: "Chart", description: "Composable chart primitives themed with semantic chart tokens.", category: "Data Display", usage: `import { ChartContainer } from "@/components/ui/chart"`, preview: <div className="grid w-full max-w-md grid-cols-5 items-end gap-3 rounded-lg border p-4">{[38,68,45,82,58].map((h,i)=><div key={i} className="rounded-md bg-[var(--chart-1)]" style={{height:`${h}px`, opacity: 0.55 + i*0.08}} />)}</div> },
  { slug: "checkbox", name: "Checkbox", description: "A control that allows the user to toggle between checked and unchecked.", category: "Forms", usage: `import { Checkbox } from "@/components/ui/checkbox"\nimport { Label } from "@/components/ui/label"`, preview: <div className="flex items-center gap-2"><Checkbox id="docs-checkbox" defaultChecked/><Label htmlFor="docs-checkbox">Accept terms and conditions</Label></div>, examples: [{ id: "states", title: "States", description: "Unchecked, checked and disabled states are the actual Radix interaction states.", preview: <div className="grid gap-3"><div className="flex items-center gap-2"><Checkbox id="cb-u"/><Label htmlFor="cb-u">Unchecked</Label></div><div className="flex items-center gap-2"><Checkbox id="cb-c" defaultChecked/><Label htmlFor="cb-c">Checked</Label></div><div className="flex items-center gap-2"><Checkbox id="cb-d" disabled/><Label htmlFor="cb-d">Disabled</Label></div><div className="flex items-center gap-2"><Checkbox id="cb-dc" defaultChecked disabled/><Label htmlFor="cb-dc">Disabled checked</Label></div></div>, code: `<Checkbox />\n<Checkbox defaultChecked />\n<Checkbox disabled />\n<Checkbox defaultChecked disabled />` }], notes: ["Unchecked", "Checked", "Focus visible", "Disabled"] },
  { slug: "collapsible", name: "Collapsible", description: "An interactive component which expands and collapses a panel.", category: "Layout", usage: `import { Collapsible } from "@/components/ui/collapsible"`, preview: <Collapsible className="w-full max-w-md space-y-2"><div className="flex items-center justify-between"><p className="text-sm font-medium">3 theme tokens</p><CollapsibleTrigger asChild><Button variant="ghost" size="sm">Toggle</Button></CollapsibleTrigger></div><CollapsibleContent className="space-y-2"><div className="rounded-md border px-3 py-2 text-sm">Primary</div><div className="rounded-md border px-3 py-2 text-sm">Secondary</div><div className="rounded-md border px-3 py-2 text-sm">Accent</div></CollapsibleContent></Collapsible> },
  { slug: "combobox", name: "Combobox", description: "Autocomplete input and command-style option picker.", category: "Forms", usage: `import { Command } from "@/components/ui/command"\nimport { Popover } from "@/components/ui/popover"`, preview: <ComboboxDemo /> },
  { slug: "command", name: "Command", description: "Fast, composable command menu for search and actions.", category: "Utility", usage: `import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command"`, preview: <Command className="w-full max-w-md rounded-lg border shadow-xs"><CommandInput placeholder="Type a command or search…"/><CommandList><CommandEmpty>No results found.</CommandEmpty><CommandGroup heading="Themes"><CommandItem>Modern Minimal</CommandItem><CommandItem>Sage Garden</CommandItem><CommandItem>Clean Slate</CommandItem></CommandGroup></CommandList></Command> },
  { slug: "context-menu", name: "Context Menu", description: "Displays a menu located at the pointer, triggered by a right click.", category: "Overlay & Navigation", usage: `import { ContextMenu } from "@/components/ui/context-menu"`, preview: <ContextMenu><ContextMenuTrigger className="flex h-40 w-full max-w-md items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">Right click this area</ContextMenuTrigger><ContextMenuContent><ContextMenuItem>Customize theme</ContextMenuItem><ContextMenuItem>Duplicate</ContextMenuItem><ContextMenuSeparator/><ContextMenuItem className="text-destructive">Delete</ContextMenuItem></ContextMenuContent></ContextMenu> },
  { slug: "data-table", name: "Data Table", description: "A data table built with TanStack Table and shadcn primitives.", category: "Data Display", usage: `import { Table } from "@/components/ui/table"`, preview: <DataTableDemo /> },
  { slug: "date-picker", name: "Date Picker", description: "A date picker composed from Popover and Calendar.", category: "Forms", usage: `import { Calendar } from "@/components/ui/calendar"\nimport { Popover } from "@/components/ui/popover"`, preview: <DatePickerDemo /> },
  { slug: "dialog", name: "Dialog", description: "A window overlaid on either the primary window or another dialog window.", category: "Overlay & Navigation", usage: `import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"`, preview: <Dialog><DialogTrigger asChild><Button variant="outline">Open dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Edit theme name</DialogTitle><DialogDescription>Make changes and save when you are done.</DialogDescription></DialogHeader><Input defaultValue="Growth"/><DialogFooter><Button>Save changes</Button></DialogFooter></DialogContent></Dialog> },
  { slug: "drawer", name: "Drawer", description: "A drawer component for mobile-first layered interfaces.", category: "Overlay & Navigation", usage: `import { Drawer } from "@/components/ui/drawer"`, preview: <Drawer><DrawerTrigger asChild><Button variant="outline">Open drawer</Button></DrawerTrigger><DrawerContent><DrawerHeader><DrawerTitle>Customize theme</DrawerTitle><DrawerDescription>Drawer inherits the current card, border and typography tokens.</DrawerDescription></DrawerHeader><DrawerFooter><Button>Continue</Button><DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose></DrawerFooter></DrawerContent></Drawer> },
  { slug: "dropdown-menu", name: "Dropdown Menu", description: "Displays a menu to the user, triggered by a button.", category: "Overlay & Navigation", usage: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"`, preview: <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Options <MoreHorizontal /></Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>Theme actions</DropdownMenuLabel><DropdownMenuSeparator/><DropdownMenuItem>Edit</DropdownMenuItem><DropdownMenuItem>Duplicate</DropdownMenuItem><DropdownMenuItem>Export CSS</DropdownMenuItem></DropdownMenuContent></DropdownMenu> },
  { slug: "form", name: "Form", description: "Building forms with React Hook Form and Zod.", category: "Forms", usage: `import { Form } from "@/components/ui/form"`, preview: <FormDemo /> },
  { slug: "field", name: "Field", description: "Composes label, control, description and validation feedback into a consistent form field.", category: "Forms", usage: `import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"`, preview: <Field className="w-full max-w-sm"><FieldLabel htmlFor="field-name">Theme name</FieldLabel><Input id="field-name" defaultValue="Modern Minimal"/><FieldDescription>Shown below the control using muted-foreground.</FieldDescription></Field> },
  { slug: "hover-card", name: "Hover Card", description: "For sighted users to preview content available behind a link.", category: "Overlay & Navigation", usage: `import { HoverCard } from "@/components/ui/hover-card"`, preview: <HoverCard><HoverCardTrigger asChild><Button variant="link">@v-suite</Button></HoverCardTrigger><HoverCardContent className="w-80"><div className="flex gap-3"><Avatar><AvatarFallback>VS</AvatarFallback></Avatar><div><p className="font-semibold">V-Suite</p><p className="text-sm text-muted-foreground">Theme-aware shadcn components.</p></div></div></HoverCardContent></HoverCard> },
  { slug: "input", name: "Input", description: "Displays a form input field or a component that looks like an input field.", category: "Forms", usage: `import { Input } from "@/components/ui/input"\n\n<Input type="email" placeholder="Email" />`, preview: <div className="grid w-full max-w-sm gap-2"><Label htmlFor="docs-email">Email</Label><Input id="docs-email" type="email" placeholder="name@company.com"/></div>, examples: [{ id: "states", title: "States", description: "Border, input, ring, destructive and muted tokens come from the active theme.", preview: <div className="grid w-full max-w-sm gap-3"><Input placeholder="Default"/><Input defaultValue="Filled value"/><Input disabled placeholder="Disabled"/><Input aria-invalid="true" defaultValue="Invalid value"/><Input className="border-ring ring-[3px] ring-ring/50" defaultValue="Focus visible"/></div>, code: `<Input placeholder="Default" />\n<Input defaultValue="Filled value" />\n<Input disabled />\n<Input aria-invalid="true" />` }, { id: "types", title: "Common input types", preview: <div className="grid w-full max-w-sm gap-3"><Input type="email" placeholder="Email"/><Input type="password" defaultValue="secret123"/><Input type="file"/></div>, code: `<Input type="email" />\n<Input type="password" />\n<Input type="file" />` }], notes: ["Default", "Focus visible", "Filled", "Disabled", "Invalid"] },
  { slug: "input-group", name: "Input Group", description: "Combines an input with leading or trailing add-ons inside one themed control surface.", category: "Forms", usage: `import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"`, preview: <InputGroup className="max-w-sm"><InputGroupAddon>https://</InputGroupAddon><InputGroupInput defaultValue="v-suite.dev"/><InputGroupAddon>.com</InputGroupAddon></InputGroup> },
  { slug: "input-otp", name: "Input OTP", description: "Accessible one-time password input component.", category: "Forms", usage: `import { InputOTP } from "@/components/ui/input-otp"`, preview: <InputOTP maxLength={6}><InputOTPGroup><InputOTPSlot index={0}/><InputOTPSlot index={1}/><InputOTPSlot index={2}/></InputOTPGroup><InputOTPSeparator/><InputOTPGroup><InputOTPSlot index={3}/><InputOTPSlot index={4}/><InputOTPSlot index={5}/></InputOTPGroup></InputOTP> },
  { slug: "label", name: "Label", description: "Renders an accessible label associated with a form control.", category: "Forms", usage: `import { Label } from "@/components/ui/label"\n\n<Label htmlFor="email">Email</Label>`, preview: <div className="grid w-full max-w-sm gap-2"><Label htmlFor="label-email">Email</Label><Input id="label-email" placeholder="name@example.com"/></div> },
  { slug: "menubar", name: "Menubar", description: "A visually persistent menu common in desktop applications.", category: "Overlay & Navigation", usage: `import { Menubar } from "@/components/ui/menubar"`, preview: <Menubar><MenubarMenu><MenubarTrigger>Theme</MenubarTrigger><MenubarContent><MenubarItem>New theme <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem><MenubarItem>Save <MenubarShortcut>⌘S</MenubarShortcut></MenubarItem><MenubarSeparator/><MenubarItem>Export CSS</MenubarItem></MenubarContent></MenubarMenu><MenubarMenu><MenubarTrigger>View</MenubarTrigger><MenubarContent><MenubarItem>Components</MenubarItem><MenubarItem>Customize</MenubarItem></MenubarContent></MenubarMenu></Menubar> },
  { slug: "navigation-menu", name: "Navigation Menu", description: "A collection of links for navigating websites.", category: "Overlay & Navigation", usage: `import { NavigationMenu } from "@/components/ui/navigation-menu"`, preview: <NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuLink href="#" className="inline-flex h-9 items-center rounded-md px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground">Themes</NavigationMenuLink></NavigationMenuItem><NavigationMenuItem><NavigationMenuTrigger>Components</NavigationMenuTrigger><NavigationMenuContent><div className="grid w-72 gap-1 p-2"><NavigationMenuLink href="#" className="rounded-md p-2 text-sm hover:bg-accent">Button</NavigationMenuLink><NavigationMenuLink href="#" className="rounded-md p-2 text-sm hover:bg-accent">Input</NavigationMenuLink><NavigationMenuLink href="#" className="rounded-md p-2 text-sm hover:bg-accent">Dialog</NavigationMenuLink></div></NavigationMenuContent></NavigationMenuItem></NavigationMenuList></NavigationMenu> },
  { slug: "pagination", name: "Pagination", description: "Pagination with page navigation, next and previous links.", category: "Overlay & Navigation", usage: `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"`, preview: <Pagination><PaginationContent><PaginationItem><PaginationPrevious href="#"/></PaginationItem><PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem><PaginationItem><PaginationNext href="#"/></PaginationItem></PaginationContent></Pagination> },
  { slug: "popover", name: "Popover", description: "Displays rich content in a portal, triggered by a button.", category: "Overlay & Navigation", usage: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"`, preview: <Popover><PopoverTrigger asChild><Button variant="outline">Open popover</Button></PopoverTrigger><PopoverContent className="w-72"><div className="space-y-2"><h4 className="font-medium">Theme settings</h4><p className="text-sm text-muted-foreground">Quick settings can live inside a themed popover.</p></div></PopoverContent></Popover> },
  { slug: "empty", name: "Empty", description: "An empty-state layout for no-results, first-use and unavailable-content states.", category: "Feedback & Status", usage: `import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty"`, preview: <Empty className="w-full max-w-lg"><EmptyHeader><EmptyMedia><Search className="size-4"/></EmptyMedia><EmptyTitle>No themes found</EmptyTitle><EmptyDescription>Try another keyword or create a new theme.</EmptyDescription></EmptyHeader><EmptyContent><Button><Plus/>Thêm theme</Button><Button variant="outline">Clear filters</Button></EmptyContent></Empty> },
  { slug: "progress", name: "Progress", description: "Displays an indicator showing the completion progress of a task.", category: "Feedback & Status", usage: `import { Progress } from "@/components/ui/progress"\n\n<Progress value={64} />`, preview: <div className="w-full max-w-md space-y-2"><div className="flex justify-between text-sm"><span>Theme coverage</span><span className="text-muted-foreground">64%</span></div><Progress value={64}/></div> },
  { slug: "radio-group", name: "Radio Group", description: "A set of checkable buttons where only one option can be checked.", category: "Forms", usage: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`, preview: <RadioGroup defaultValue="comfortable"><div className="flex items-center gap-2"><RadioGroupItem id="r1" value="default"/><Label htmlFor="r1">Default</Label></div><div className="flex items-center gap-2"><RadioGroupItem id="r2" value="comfortable"/><Label htmlFor="r2">Comfortable</Label></div><div className="flex items-center gap-2"><RadioGroupItem id="r3" value="compact"/><Label htmlFor="r3">Compact</Label></div></RadioGroup> },
  { slug: "resizable", name: "Resizable", description: "Accessible resizable panel groups and layouts.", category: "Layout", usage: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"`, preview: <ResizablePanelGroup orientation="horizontal" className="h-56 w-full max-w-lg overflow-hidden rounded-xl border"><ResizablePanel defaultSize="40%"><div className="flex h-full items-center justify-center bg-muted/30 text-sm">Controls</div></ResizablePanel><ResizableHandle withHandle/><ResizablePanel defaultSize="60%"><div className="flex h-full items-center justify-center text-sm">Preview</div></ResizablePanel></ResizablePanelGroup> },
  { slug: "scroll-area", name: "Scroll Area", description: "Augments native scroll functionality for custom styled scrollbars.", category: "Layout", usage: `import { ScrollArea } from "@/components/ui/scroll-area"`, preview: <ScrollArea className="h-56 w-full max-w-sm rounded-xl border"><div className="p-4"><h4 className="mb-3 text-sm font-medium">Components</h4>{Array.from({length:16},(_,i)=><div key={i} className="border-b py-2 text-sm last:border-0">Component {i+1}</div>)}</div></ScrollArea> },
  { slug: "select", name: "Select", description: "Displays a list of options for the user to pick from.", category: "Forms", usage: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"`, preview: <Select defaultValue="modern"><SelectTrigger className="w-[220px]"><SelectValue placeholder="Select theme"/></SelectTrigger><SelectContent><SelectItem value="modern">Modern Minimal</SelectItem><SelectItem value="sage">Sage Garden</SelectItem><SelectItem value="slate">Clean Slate</SelectItem></SelectContent></Select>, examples: [ { id: "states", title: "States", preview: <div className="flex flex-col gap-3"><Select defaultValue="modern"><SelectTrigger className="w-56"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="modern">Modern Minimal</SelectItem><SelectItem value="sage">Sage Garden</SelectItem></SelectContent></Select><Select disabled><SelectTrigger className="w-56"><SelectValue placeholder="Disabled"/></SelectTrigger></Select></div>, code: `<Select>...</Select>
<Select disabled>...</Select>` } ], notes: ["Closed", "Open", "Focused", "Selected", "Disabled"] },
  { slug: "separator", name: "Separator", description: "Visually or semantically separates content.", category: "Layout", usage: `import { Separator } from "@/components/ui/separator"\n\n<Separator />`, preview: <div className="w-full max-w-md"><div className="space-y-1"><h4 className="font-medium">V-Suite</h4><p className="text-sm text-muted-foreground">Theme Studio</p></div><Separator className="my-4"/><div className="flex h-5 items-center gap-4 text-sm"><span>Editor</span><Separator orientation="vertical"/><span>Components</span><Separator orientation="vertical"/><span>Themes</span></div></div> },
  { slug: "sheet", name: "Sheet", description: "Extends Dialog to display content that complements the main content of the screen.", category: "Overlay & Navigation", usage: `import { Sheet } from "@/components/ui/sheet"`, preview: <Sheet><SheetTrigger asChild><Button variant="outline">Open sheet</Button></SheetTrigger><SheetContent><SheetHeader><SheetTitle>Theme settings</SheetTitle><SheetDescription>Change properties without leaving the current component.</SheetDescription></SheetHeader><div className="grid gap-4 py-6"><Field><FieldLabel>Theme name</FieldLabel><Input defaultValue="Modern Minimal"/></Field></div><SheetFooter><Button>Save changes</Button></SheetFooter></SheetContent></Sheet> },
  { slug: "sidebar", name: "Sidebar", description: "A composable, themeable and customizable sidebar component.", category: "Layout", usage: `import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"`, preview: <SidebarDemo /> },
  { slug: "skeleton", name: "Skeleton", description: "Use to show a placeholder while content is loading.", category: "Feedback & Status", usage: `import { Skeleton } from "@/components/ui/skeleton"`, preview: <div className="flex items-center gap-3"><Skeleton className="size-12 rounded-full"/><div className="space-y-2"><Skeleton className="h-4 w-[220px]"/><Skeleton className="h-4 w-[160px]"/></div></div> },
  { slug: "slider", name: "Slider", description: "An input where the user selects a value from within a given range.", category: "Forms", usage: `import { Slider } from "@/components/ui/slider"\n\n<Slider defaultValue={[50]} max={100} step={1} />`, preview: <div className="w-full max-w-md space-y-2"><div className="flex justify-between text-sm"><Label>Radius scale</Label><span className="text-muted-foreground">62%</span></div><Slider defaultValue={[62]} max={100}/></div> },
  { slug: "sonner", name: "Sonner", description: "An opinionated toast component for React.", category: "Feedback & Status", usage: `import { toast } from "sonner"\n\n<Button onClick={() => toast("Theme saved")}>Show toast</Button>`, preview: <Button variant="outline" onClick={() => toast.success("Theme saved")}>Show toast</Button> },
  { slug: "spinner", name: "Spinner", description: "A compact loading indicator that inherits the current foreground color.", category: "Feedback & Status", usage: `import { Spinner } from "@/components/ui/spinner"\n\n<Spinner />`, preview: <div className="flex items-center gap-6"><Spinner/><Spinner className="size-5 text-primary"/><Button disabled><Spinner/>Saving</Button></div> },
  { slug: "switch", name: "Switch", description: "A control that allows the user to toggle between checked and unchecked.", category: "Forms", usage: `import { Switch } from "@/components/ui/switch"\n\n<Switch defaultChecked />`, preview: <div className="flex items-center gap-3"><Switch id="docs-switch" defaultChecked/><Label htmlFor="docs-switch">Use dark mode</Label></div>, examples: [{ id: "states", title: "States", preview: <div className="grid gap-3"><div className="flex items-center gap-3"><Switch id="sw-off"/><Label htmlFor="sw-off">Off</Label></div><div className="flex items-center gap-3"><Switch id="sw-on" defaultChecked/><Label htmlFor="sw-on">On</Label></div><div className="flex items-center gap-3"><Switch id="sw-disabled" disabled/><Label htmlFor="sw-disabled">Disabled</Label></div></div>, code: `<Switch />\n<Switch defaultChecked />\n<Switch disabled />` }], notes: ["Off", "On", "Focus visible", "Disabled"] },
  { slug: "table", name: "Table", description: "A responsive table component for displaying structured data.", category: "Data Display", usage: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"`, preview: <div className="w-full max-w-xl rounded-lg border"><Table><TableHeader><TableRow><TableHead>Theme</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Components</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell className="font-medium">Growth</TableCell><TableCell><Badge className="bg-positive text-positive-foreground">Ready</Badge></TableCell><TableCell className="text-right">55</TableCell></TableRow><TableRow><TableCell className="font-medium">Dark Growth</TableCell><TableCell><Badge variant="secondary">Draft</Badge></TableCell><TableCell className="text-right">55</TableCell></TableRow></TableBody></Table></div> },
  { slug: "tabs", name: "Tabs", description: "A set of layered sections of content that display one panel at a time.", category: "Layout", usage: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`, preview: <Tabs defaultValue="preview" className="w-full max-w-md"><TabsList><TabsTrigger value="preview">Preview</TabsTrigger><TabsTrigger value="code">Code</TabsTrigger></TabsList><TabsContent value="preview" className="rounded-lg border p-4 text-sm">Preview the active theme here.</TabsContent><TabsContent value="code" className="rounded-lg border p-4 font-mono text-sm">&lt;Button /&gt;</TabsContent></Tabs>, examples: [ { id: "default", title: "Default", preview: <Tabs defaultValue="one" className="w-full max-w-md"><TabsList><TabsTrigger value="one">Overview</TabsTrigger><TabsTrigger value="two">Tokens</TabsTrigger><TabsTrigger value="three" disabled>Disabled</TabsTrigger></TabsList><TabsContent value="one" className="rounded-lg border p-4">Overview content</TabsContent><TabsContent value="two" className="rounded-lg border p-4">Token content</TabsContent></Tabs>, code: `<Tabs defaultValue="one">...</Tabs>` }, { id: "line", title: "Line variant", preview: <Tabs defaultValue="one" className="w-full max-w-md"><TabsList variant="line"><TabsTrigger value="one">Overview</TabsTrigger><TabsTrigger value="two">Components</TabsTrigger></TabsList><TabsContent value="one" className="p-4">Overview content</TabsContent><TabsContent value="two" className="p-4">Components content</TabsContent></Tabs>, code: `<TabsList variant="line">...</TabsList>` } ], notes: ["Inactive", "Active", "Focus visible", "Disabled", "Horizontal", "Vertical"] },
  { slug: "textarea", name: "Textarea", description: "Displays a multi-line text input field.", category: "Forms", usage: `import { Textarea } from "@/components/ui/textarea"\n\n<Textarea placeholder="Type your message here." />`, preview: <div className="grid w-full max-w-sm gap-2"><Label htmlFor="docs-message">Message</Label><Textarea id="docs-message" placeholder="Describe your theme…"/></div> },
  { slug: "toggle", name: "Toggle", description: "A two-state button that can be either on or off.", category: "Forms", usage: `import { Toggle } from "@/components/ui/toggle"\n\n<Toggle aria-label="Toggle italic"><Italic /></Toggle>`, preview: <div className="flex gap-2"><Toggle aria-label="Bold"><Bold/></Toggle><Toggle aria-label="Italic" defaultPressed><Italic/></Toggle></div> },
  { slug: "toggle-group", name: "Toggle Group", description: "A set of two-state buttons that can be toggled on or off.", category: "Forms", usage: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`, preview: <ToggleGroup type="multiple" variant="outline" defaultValue={["bold"]}><ToggleGroupItem value="bold"><Bold/></ToggleGroupItem><ToggleGroupItem value="italic"><Italic/></ToggleGroupItem><ToggleGroupItem value="check"><Check/></ToggleGroupItem></ToggleGroup> },
  { slug: "tooltip", name: "Tooltip", description: "A popup that displays information related to an element when it receives focus or hover.", category: "Overlay & Navigation", usage: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"`, preview: <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger><TooltipContent>Theme-aware tooltip</TooltipContent></Tooltip></TooltipProvider> },
  { slug: "kbd", name: "Kbd", description: "Displays a keyboard key or shortcut with themed muted, border and typography tokens.", category: "Data Display", usage: `import { Kbd } from "@/components/ui/kbd"`, preview: <div className="flex items-center gap-2 text-sm"><Kbd>⌘</Kbd><Kbd>K</Kbd><span className="text-muted-foreground">Open command menu</span></div> },
  { slug: "item", name: "Item", description: "A compact content row with media, text and actions for lists and settings.", category: "Utility", usage: `import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@/components/ui/item"`, preview: <Item className="w-full max-w-md"><ItemMedia><FileText className="size-4"/></ItemMedia><ItemContent><ItemTitle>Modern Minimal</ItemTitle><ItemDescription>System theme · 55 components</ItemDescription></ItemContent><ItemActions><Button variant="ghost" size="icon-sm"><MoreHorizontal/></Button></ItemActions></Item> },
  { slug: "uploader", name: "Uploader", description: "A composed file uploader pattern for application forms.", category: "Utility", usage: `// Composed from Input, Button, Progress and drag/drop behavior.`, preview: <Uploader /> },
];

const stateContracts: Record<string, string[]> = {
  accordion: ["Collapsed", "Expanded", "Focus visible", "Disabled item"],
  alert: ["Default", "Destructive"],
  "alert-dialog": ["Closed", "Open", "Focus trapped", "Cancel", "Confirm"],
  "aspect-ratio": ["Responsive ratio"],
  avatar: ["Image", "Fallback"],
  badge: ["Default", "Secondary", "Outline", "Destructive", "Ghost", "Link"],
  breadcrumb: ["Link", "Current page", "Separator"],
  button: ["Default", "Hover", "Focus visible", "Disabled", "Loading"],
  "button-group": ["Horizontal", "Vertical", "Focus stacking", "Disabled child"],
  calendar: ["Default", "Today", "Selected", "Outside month", "Disabled", "Range"],
  card: ["Header", "Content", "Footer"],
  carousel: ["Previous", "Next", "Edge disabled", "Swipe/drag"],
  chart: ["Themed series", "Tooltip/legend composition"],
  checkbox: ["Unchecked", "Checked", "Focus visible", "Disabled"],
  collapsible: ["Closed", "Open"],
  combobox: ["Closed", "Open", "Search", "Selected", "Empty"],
  command: ["Idle", "Search", "Highlighted item", "Keyboard navigation", "Empty"],
  "context-menu": ["Closed", "Open", "Highlighted item", "Disabled item", "Submenu"],
  "data-table": ["Default", "Sort", "Row hover", "Selection", "Pagination composition"],
  "date-picker": ["Closed", "Open", "Selected date", "Keyboard navigation"],
  dialog: ["Closed", "Open", "Focus trapped", "Escape dismiss"],
  drawer: ["Closed", "Open", "Drag gesture", "Dismiss"],
  "dropdown-menu": ["Closed", "Open", "Highlighted item", "Disabled item", "Submenu"],
  form: ["Idle", "Valid", "Invalid", "Submitting"],
  field: ["Default", "Description", "Error", "Disabled control"],
  "hover-card": ["Closed", "Open on hover", "Open on focus"],
  input: ["Default", "Filled", "Focus visible", "Disabled", "Invalid"],
  "input-group": ["Default", "Focus within", "Disabled control", "Invalid"],
  "input-otp": ["Empty", "Filled", "Active slot", "Disabled"],
  label: ["Default", "Associated control", "Disabled peer"],
  menubar: ["Closed", "Open", "Highlighted item", "Keyboard navigation"],
  "navigation-menu": ["Closed", "Open", "Active link", "Focus visible"],
  pagination: ["Default", "Current page", "Previous/Next", "Disabled boundary"],
  popover: ["Closed", "Open", "Focus managed", "Outside dismiss"],
  empty: ["Default", "With actions"],
  progress: ["Empty", "Intermediate", "Complete"],
  "radio-group": ["Unselected", "Selected", "Focus visible", "Disabled"],
  resizable: ["Idle", "Handle hover", "Dragging", "Keyboard resize"],
  "scroll-area": ["Idle", "Scrollable", "Scrollbar hover", "Scrollbar drag"],
  select: ["Closed", "Open", "Selected", "Focus visible", "Disabled"],
  separator: ["Horizontal", "Vertical"],
  sheet: ["Closed", "Open", "Focus trapped", "Left/Right/Top/Bottom"],
  sidebar: ["Expanded", "Collapsed", "Active item", "Hover item", "Mobile sheet"],
  skeleton: ["Loading"],
  slider: ["Minimum", "Intermediate", "Maximum", "Focus visible", "Disabled"],
  sonner: ["Default", "Success", "Info", "Warning", "Error", "Loading"],
  spinner: ["Default", "Inherited color", "Size variants"],
  switch: ["Off", "On", "Focus visible", "Disabled"],
  table: ["Header", "Row", "Row hover", "Selected row", "Cell"],
  tabs: ["Inactive", "Active", "Focus visible", "Disabled", "Horizontal", "Vertical"],
  textarea: ["Default", "Filled", "Focus visible", "Disabled", "Invalid"],
  toggle: ["Off", "On", "Hover", "Focus visible", "Disabled"],
  "toggle-group": ["Single", "Multiple", "Unselected", "Selected", "Disabled"],
  tooltip: ["Closed", "Open on hover", "Open on focus", "Keyboard accessible"],
  kbd: ["Single key", "Shortcut group"],
  item: ["Default", "Hover", "With actions"],
  uploader: ["Idle", "Drag over", "Files selected", "Remove file"],
};

export const componentDocs = registry.map((doc) => ({
  ...doc,
  notes: doc.notes ?? stateContracts[doc.slug],
}));

export const componentCategories: ComponentCategory[] = [
  "Layout",
  "Forms",
  "Overlay & Navigation",
  "Feedback & Status",
  "Data Display",
  "Utility",
];

export function getComponentDoc(slug?: string | null) {
  return componentDocs.find((item) => item.slug === slug) ?? componentDocs.find((item) => item.slug === "button")!;
}
