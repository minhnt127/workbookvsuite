# Design System — Shadcn Custom V-Suite

> Nguồn: [Figma – Shadcn Custom V-Suite](https://www.figma.com/design/hW713FCLahpFjDNl2XqeNp/Shadcn--Custom-V-Suite-)
> Tài liệu này được trích xuất trực tiếp từ **Figma Variables** (design tokens thật của file, không phải suy đoán) để dev/AI (Claude) dùng làm nguồn chân lý khi code UI.

---

## 1. Tech Stack & Convention

- **Component library:** [shadcn/ui](https://ui.shadcn.com) (React + Radix + Tailwind)
- **Styling:** Tailwind CSS, dùng CSS variables cho theming (`--base-*`)
- **Font:** `Inter` (sans, mặc định), `Georgia` (serif), `Geist Mono` (mono)
- **Theme modes:** Light / Dark (đã có sẵn 2 mode trong Figma: `Light - Growth`, `Dark - Growth`, cộng thêm biến thể `Light - Mutisite`)
- **Naming convention token:** `base/{token}` cho màu semantic, `spacing/{n}`, `radius/{size}`, `text/{size}/font-size|line-height`, `font-weight/{name}`

**Nguyên tắc cho dev & AI khi code:** luôn dùng token/biến bên dưới thay vì hard-code hex, px. Khi vibe code với Claude, dán thẳng phần "CSS Variables" và "Tailwind mapping" ở mục 3 vào prompt hoặc file cấu hình dự án để Claude bám sát đúng theme.

---

## 2. Color Tokens (Semantic)

Toàn bộ màu lấy trực tiếp từ Figma Variables (collection **Mode**), đã resolve về hex cho cả 2 theme.

| Token | Light | Dark | Dùng cho |
|---|---|---|---|
| `background` | `#ffffff` | `#0a0a0a` | Nền trang |
| `foreground` | `#0a0a0a` | `#fafafa` | Chữ chính |
| `card` | `#ffffff` | `#171717` | Nền card |
| `card-foreground` | `#0a0a0a` | `#fafafa` | Chữ trong card |
| `popover` | `#ffffff` | `#262626` | Nền popover |
| `popover-foreground` | `#0a0a0a` | `#fafafa` | Chữ trong popover |
| `primary` | `#6366f1` | `#e5e5e5` | Nút/hành động chính |
| `primary-foreground` | `#fafafa` | `#171717` | Chữ trên nền primary |
| `secondary` | `#eef2ff` | `#262626` | Hành động phụ |
| `secondary-foreground` | `#171717` | `#fafafa` | Chữ trên nền secondary |
| `muted` | `#f3f4f5` | `#262626` | Nền mờ/nhạt |
| `muted-foreground` | `#67687b` | `#a3a3a3` | Chữ phụ, placeholder |
| `accent` | `#f3f4f6` | `#404040` | Hover/accent state |
| `accent-foreground` | `#171717` | `#fafafa` | Chữ trên accent |
| `destructive` | `#e7000b` | `#f87171` | Hành động nguy hiểm/xoá |
| `destructive-foreground` | `#fafafa` | `#fafafa` | Chữ trên destructive |
| `destructive-muted` | `#fee2e2` | `#fee2e2` | Nền cảnh báo nhẹ (destructive) |
| `positive` | `#16a34a` | `#4ade80` | Trạng thái thành công |
| `positive-foreground` | `#fafafa` | `#fafafa` | Chữ trên positive |
| `positive-muted` | `#dcfce7` | `#dcfce7` | Nền success nhẹ |
| `attention` | `#f97316` | `#fb923c` | Trạng thái cảnh báo |
| `attention-foreground` | `#fafafa` | `#fafafa` | Chữ trên attention |
| `attention-muted` | `#ffedd5` | `#ffedd5` | Nền warning nhẹ |
| `brand` | `#ea0029` | `#ef4444` | Màu thương hiệu |
| `brand-foreground` | `#ffffff` | `#ffffff` | Chữ trên brand |
| `border` | `#dddfed` | `#ffffff/10%` | Viền mặc định |
| `input` | `#dfe4f6` | `#ffffff/15%` | Viền input |
| `ring` | `#c7d2fe` | `#737373` | Focus ring |
| `ring-offset` | `#ffffff` | `#0a0a0a` | Ring offset background |
| `border-selected` | `#a5b4fc` | `#ffffff` | Viền khi item được chọn |
| `chart-1` … `chart-5` | `#ea580c #0d9488 #164e63 #fbbf24 #f59e0b` | `#1d4ed8 #10b981 #f59e0b #a855f7 #f43f5e` | Bảng màu biểu đồ |
| `sidebar` | `#ffffff` | `#171717` | Nền sidebar |
| `sidebar-foreground` | `#171717` | `#fafafa` | Chữ sidebar |
| `sidebar-primary` | `#171717` | `#1d4ed8` | Item active trong sidebar |
| `sidebar-primary-foreground` | `#fafafa` | `#fafafa` | Chữ item active |
| `sidebar-accent` | `#eef2ff` | `#262626` | Hover item sidebar |
| `sidebar-accent-foreground` | `#171717` | `#fafafa` | Chữ hover item |
| `sidebar-border` | `#dddfed` | `#ffffff/10%` | Viền sidebar |
| `sidebar-ring` | `#c7d2fe` | `#525252` | Focus ring trong sidebar |

### CSS Variables (dán thẳng vào `globals.css`)

```css
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --card: #ffffff;
  --card-foreground: #0a0a0a;
  --popover: #ffffff;
  --popover-foreground: #0a0a0a;
  --primary: #6366f1;
  --primary-foreground: #fafafa;
  --secondary: #eef2ff;
  --secondary-foreground: #171717;
  --muted: #f3f4f5;
  --muted-foreground: #67687b;
  --accent: #f3f4f6;
  --accent-foreground: #171717;
  --destructive: #e7000b;
  --destructive-foreground: #fafafa;
  --positive: #16a34a;
  --positive-foreground: #fafafa;
  --attention: #f97316;
  --attention-foreground: #fafafa;
  --brand: #ea0029;
  --brand-foreground: #ffffff;
  --border: #dddfed;
  --input: #dfe4f6;
  --ring: #c7d2fe;
  --chart-1: #ea580c;
  --chart-2: #0d9488;
  --chart-3: #164e63;
  --chart-4: #fbbf24;
  --chart-5: #f59e0b;
  --sidebar: #ffffff;
  --sidebar-foreground: #171717;
  --sidebar-primary: #171717;
  --sidebar-primary-foreground: #fafafa;
  --sidebar-accent: #eef2ff;
  --sidebar-accent-foreground: #171717;
  --sidebar-border: #dddfed;
  --sidebar-ring: #c7d2fe;
  --radius: 0.625rem; /* = radius/lg, 10px */
}

.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --card: #171717;
  --card-foreground: #fafafa;
  --popover: #262626;
  --popover-foreground: #fafafa;
  --primary: #e5e5e5;
  --primary-foreground: #171717;
  --secondary: #262626;
  --secondary-foreground: #fafafa;
  --muted: #262626;
  --muted-foreground: #a3a3a3;
  --accent: #404040;
  --accent-foreground: #fafafa;
  --destructive: #f87171;
  --destructive-foreground: #fafafa;
  --positive: #4ade80;
  --positive-foreground: #fafafa;
  --attention: #fb923c;
  --attention-foreground: #fafafa;
  --brand: #ef4444;
  --brand-foreground: #ffffff;
  --border: rgba(255,255,255,0.10);
  --input: rgba(255,255,255,0.15);
  --ring: #737373;
  --chart-1: #1d4ed8;
  --chart-2: #10b981;
  --chart-3: #f59e0b;
  --chart-4: #a855f7;
  --chart-5: #f43f5e;
  --sidebar: #171717;
  --sidebar-foreground: #fafafa;
  --sidebar-primary: #1d4ed8;
  --sidebar-primary-foreground: #fafafa;
  --sidebar-accent: #262626;
  --sidebar-accent-foreground: #fafafa;
  --sidebar-border: rgba(255,255,255,0.10);
  --sidebar-ring: #525252;
}
```

---

## 3. Typography

| Token | Giá trị |
|---|---|
| `font-sans` | `Inter` (mặc định toàn bộ UI) |
| `font-serif` | `Georgia` |
| `font-mono` | `Geist Mono` |

### Type scale (font-size / line-height)

| Size | font-size | line-height |
|---|---|---|
| `xs` | 12px | 16px |
| `sm` | 14px | 20px |
| `base` | 16px | 24px |
| `lg` | 18px | 28px |
| `xl` | 20px | 28px |
| `2xl` | 24px | 32px |
| `3xl` | 30px | 36px |
| `4xl` | 36px | 40px |
| `5xl` | 48px | 48px |
| `6xl` | 60px | 60px |
| `7xl` | 72px | 72px |
| `8xl` | 96px | 96px |
| `9xl` | 128px | 128px |

### Font weight

`thin 100` · `extralight 200` · `light 300` · `normal 400` · `medium 500` · `semibold 600` · `bold 700` · `extrabold 800` · `black 900`

> Convention mặc định trong file: body text dùng `normal 400`, label/nav item dùng `medium 500`, heading/tên component dùng `semibold 600`.

---

## 4. Spacing Scale

Chuẩn Tailwind spacing (1 unit = 4px), toàn bộ padding/gap/margin trong file dùng thang này:

`0, px(1), 0.5(2), 1(4), 1.5(6), 2(8), 2.5(10), 3(12), 3.5(14), 4(16), 5(20), 6(24), 7(28), 8(32), 9(36), 10(40), 11(44), 12(48), 14(56), 16(64), 20(80), 24(96), 28(112), 32(128), 36(144), 40(160), 44(176), 48(192), 52(208), 56(224), 60(240), 64(256), 72(288), 80(320), 96(384)` — đơn vị px

---

## 5. Radius Scale

| Token | Giá trị | CSS var gợi ý |
|---|---|---|
| `xs` | 2px | `calc(var(--radius) - 8px)` |
| `sm` | 6px | `calc(var(--radius) - 4px)` |
| `md` | 8px | `calc(var(--radius) - 2px)` |
| `lg` | 10px | `var(--radius)` ← **mặc định component** |
| `xl` | 14px | `calc(var(--radius) + 4px)` |
| `2xl` | 16px | — |
| `3xl` | 24px | — |
| `4xl` | 32px | — |

---

## 6. Shadow (Elevation)

Theo chuẩn Tailwind mặc định: `shadow-2xs`, `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl` — màu bóng dùng `black` với alpha tăng dần theo cấp độ (5%–25%).

---

## 7. Breakpoints & Container

| Breakpoint | Giá trị |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

Container sizes: `3xs 256 · 2xs 288 · xs 320 · sm 384 · md 448 · lg 512 · xl 576 · 2xl 672 · 3xl 768 · 4xl 896 · 5xl 1024 · 6xl 1152 · 7xl 1280` (px)

---

## 8. Component Inventory (đã có sẵn trong Figma)

File có **55 component gốc** shadcn/ui + **3 nhóm Blocks dựng sẵn**. Build UI mới nên **tái sử dụng component/block có sẵn** trước khi tạo mới.

### Layout & Structure
`Accordion` · `Aspect Ratio` · `Card` · `Carousel` · `Collapsible` · `Resizable` · `Scroll Area` · `Separator` · `Sidebar` · `Tabs`

### Forms & Input
`Button` · `Button Group` · `Checkbox` · `Combobox` · `Field` · `Form` · `Input` · `Input Group` · `Input OTP` · `Label` · `Radio Group` · `Select` · `Slider` · `Switch` · `Textarea` · `Toggle` · `Toggle Group` · `Date Picker` · `Calendar`

### Overlay & Navigation
`Alert Dialog` · `Context Menu` · `Dialog` · `Drawer` · `Dropdown Menu` · `Hover Card` · `Menubar` · `Navigation Menu` · `Popover` · `Sheet` · `Tooltip` · `Breadcrumb` · `Pagination`

### Feedback & Status
`Alert` · `Empty` · `Progress` · `Skeleton` · `Sonner` (toast) · `Spinner`

### Data Display
`Avatar` · `Badge` · `Chart` · `Data Table` · `Table` · `Kbd`

### Utility
`Command` · `Item` · `Uploader` · nhóm **Utility Components** (20 sub-item hỗ trợ khác)

> Component có ký hiệu 🟢 trong Figma = đã hoàn thiện/production-ready. 🔵 = biến thể bổ sung. Component không đánh dấu = cơ bản, ổn định.

Docs tham chiếu chính thức cho từng component: `https://ui.shadcn.com/docs/components/{ten-component-kebab-case}` (ví dụ Sidebar → https://ui.shadcn.com/docs/components/sidebar)

### Blocks dựng sẵn (composed từ component ở trên)

| Nhóm | Số lượng | Ghi chú |
|---|---|---|
| Blocks (Official) | 86 | Block chuẩn shadcn (dashboard, login, sidebar layouts...) |
| Pro Blocks (Application) | 100 | Block cho app nội bộ/dashboard nâng cao |
| Pro Blocks (Landing Page) | 169 | Block cho trang marketing/landing |

---

## 9. Hướng dẫn khi "vibe code" với Claude

1. **Luôn cấu hình theme trước khi code component** — dán nguyên khối CSS Variables ở mục 2 vào `globals.css`/`theme.css` của project, và bảng token ở mục 3–7 vào `tailwind.config` (hoặc file token tương ứng nếu dùng Tailwind v4 `@theme`).
2. **Không hard-code hex/px** — luôn tham chiếu token (`bg-background`, `text-muted-foreground`, `rounded-lg`, `gap-2`...).
3. **Ưu tiên component/block có sẵn trong danh sách mục 8** trước khi yêu cầu Claude tạo mới từ đầu — tránh trùng lặp, đảm bảo đồng bộ style.
4. **Khi paste 1 frame Figma cụ thể cho Claude code**, luôn kèm theo: (a) tên component gần nhất trong danh sách mục 8, (b) đoạn CSS variables liên quan, (c) link docs shadcn nếu có — Claude sẽ bám sát convention thay vì đoán.
5. **Dark mode**: mọi component phải test cả 2 theme (`class="dark"` toggle ở `<html>`), vì toàn bộ token đã có giá trị dark tương ứng ở mục 2.
6. **Icon**: dùng bộ icon `lucide-react` (chuẩn shadcn) — file Figma đặt tên icon theo convention `Icon / {LucideIconName}` (vd: `Icon / ChevronRight`, `Icon / SquareTerminal`), map thẳng 1-1 sang tên icon Lucide.

---

*File này được tạo tự động từ Figma Variables + cấu trúc trang thực tế của file "Shadcn - Custom V-Suite". Nếu file Figma cập nhật token, chạy lại quy trình trích xuất để đồng bộ.*
