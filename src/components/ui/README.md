# UI primitives

Shared building blocks used by the app shell and section components.

| File | Purpose |
| --- | --- |
| `toast.tsx`, `toaster.tsx` | Radix toast primitives + container (driven by `@/hooks/use-toast`) |
| `sonner.tsx` | Sonner toaster, used for the "achievement" toasts (`@/lib/achievement`) |
| `tooltip.tsx` | Radix tooltip primitives and `TooltipProvider` (mounted in `App.tsx`) |
| `ReactBitsText.tsx` | Animated section headings (respects `prefers-reduced-motion`) |
| `DriftWall.tsx` | Decorative, `aria-hidden` background wall for the certificates section |

The portfolio sections style themselves with the CSS custom properties and utility classes in `src/index.css`.
This folder follows shadcn/ui conventions, so new primitives can be added with `npx shadcn@latest add <component>`.
