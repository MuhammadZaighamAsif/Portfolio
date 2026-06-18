# UI Components

This folder contains only the shadcn/ui components actually used by the portfolio app.

## Components Kept (5 files):

### Toast System
- **toast.tsx** - Toast primitives from Radix UI (Toast, ToastProvider, ToastViewport, etc.)
- **toaster.tsx** - Toast container component that renders toast notifications
- **use-toast.ts** - Re-export of the toast hook from `@/hooks/use-toast`

### Other Components
- **sonner.tsx** - Alternative toast library (Sonner) used in App.tsx
- **tooltip.tsx** - Tooltip primitives and TooltipProvider used in App.tsx

## Why Only These?

The portfolio components (Hero, Skills, Projects, Experience, etc.) use **custom CSS classes** defined in `index.css` rather than shadcn/ui components. They don't import any UI components directly.

Only `App.tsx` uses UI components:
- `Toaster` from toaster.tsx
- `Sonner` from sonner.tsx  
- `TooltipProvider` from tooltip.tsx

## Removed Components (13 files):

The following components were removed as they are not used anywhere in the app:
- accordion.tsx
- alert-dialog.tsx
- alert.tsx
- button.tsx
- card.tsx
- dialog.tsx
- dropdown-menu.tsx
- input.tsx
- label.tsx
- popover.tsx
- scroll-area.tsx
- select.tsx
- tabs.tsx

## Adding New Components

If you need to add shadcn/ui components in the future, use:
```bash
npx shadcn@latest add [component-name]
```

This will add the component to this folder while keeping your existing components intact.
