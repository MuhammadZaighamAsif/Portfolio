# Code Guideline

## Project Structure Overview

```
project-root/
├── public/
│   ├── favicon.ico        # Website favicon
│   ├── placeholder.svg    # Placeholder image for components
│   └── robots.txt         # SEO robots configuration
├── src/
│   ├── components/        # All reusable UI components
│   │   ├── portfolio/     # Portfolio-specific components (Hero, Projects, Skills, etc.)
│   │   └── ui/            # Prebuilt and custom UI components
│   ├── data/              # Static data and content
│   │   └── portfolio.ts   # Portfolio content (skills, projects, experience, etc.)
│   ├── hooks/             # Custom React hooks
│   │   ├── use-mobile.tsx           # Hook to detect mobile viewport
│   │   ├── use-toast.tsx            # Toast notification hook
│   │   ├── useIntersection.ts       # Intersection Observer hook
│   │   ├── useScrollSpy.ts          # Scroll spy navigation hook
│   │   └── useTheme.ts              # Theme management hook
│   ├── lib/               # Utility functions and libraries
│   │   └── utils.ts       # Common utility functions (cn, etc.)
│   ├── pages/             # Application pages
│   │   ├── Index.tsx      # Home/Portfolio page
│   │   └── NotFound.tsx   # 404 Not Found page
│   ├── analytics.ts       # Analytics bootstrapping
│   ├── App.css            # App-level styles
│   ├── App.tsx            # Main app component, sets up providers
│   ├── env.d.ts           # Environment type definitions
│   ├── index.css          # Global styles and Tailwind directives
│   ├── main.tsx           # Entry point for the React app
│   └── router.tsx         # Router configuration
├── components.json        # shadcn/ui components configuration
├── package.json           # Project metadata and dependencies
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── ...                    # Other config files
```

## Directory Responsibilities

- **public/**: Static files served directly. Place images, icons, and robots.txt here.
- **src/components/**: All UI components.
  - **portfolio/**: Portfolio-specific components (Hero, Navbar, Projects, Skills, Experience, Education, Certificates, Contact, Footer).
  - **ui/**: Reusable UI components from shadcn/ui (buttons, cards, inputs, dialogs, etc.).
- **src/data/**: Static data and content for the portfolio (skills, projects, experience, certifications, etc.).
- **src/hooks/**: Custom React hooks. Each file should export a single hook focused on one responsibility.
- **src/lib/**: Utility functions and libraries that are not React components or hooks.
- **src/pages/**: All route-level pages (Index, NotFound, etc.).
- **src/App.tsx**: Sets up global providers (QueryClient, Tooltip, Toaster, Router).
- **src/router.tsx**: Sets up routing configuration.
- **src/main.tsx**: Application entry point.
- **src/analytics.ts**: Analytics initialization logic.

**Important:**
Whenever a new module (such as a component, hook, or utility) or a new page is added or removed, this document **must be updated immediately** to reflect the changes. Keeping this documentation up to date ensures that all collaborators have a clear understanding of the current project structure and its intended organization.

## How to Add New Code

### 1. Adding a New Page

- **Create a subdirectory under `src/pages/` for each new page if it has multiple files.**
- Example: For a "Dashboard" page, create `src/pages/dashboard/index.tsx`.
- **For simple single-file pages, place the file directly in `src/pages/`.**
- **Register the new route in `src/router.tsx` with a semantic name.**
- Example:
```tsx
import Dashboard from "./pages/dashboard";

// In routers array:
{
  path: "/dashboard",
  element: <Dashboard />,
}
```

### 2. Adding a New Component

- **Determine if the component is portfolio-specific or reusable:**
  - **Portfolio-specific**: Place in `src/components/portfolio/`.
  - **Reusable UI component**: Place in `src/components/ui/`.
- **Use PascalCase for component filenames** (e.g., `MyComponent.tsx`).
- **Export the component as a named or default export.**
- **If adding a shadcn/ui component**, use the CLI or manually add it to `src/components/ui/`.

Example:
```tsx
// src/components/portfolio/NewSection.tsx
export const NewSection = () => {
  return <div>New Section</div>;
};
```

### 3. Adding a New Hook

- **Place the hook in `src/hooks/`.**
- **Use camelCase with the `use` prefix** (e.g., `useMyHook.ts`).
- **Each hook should be in its own file and export a single hook function.**

Example:
```tsx
// src/hooks/useMyHook.ts
import { useState, useEffect } from 'react';

export const useMyHook = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Hook logic
  }, []);
  
  return data;
};
```

### 4. Adding Utility Functions

- **Place utilities in `src/lib/`.**
- **Use descriptive filenames** (e.g., `formatters.ts`, `validators.ts`).
- **Export functions as named exports.**

Example:
```tsx
// src/lib/formatters.ts
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};
```

### 5. Adding Data

- **Place static data in `src/data/`.**
- **Use TypeScript for type safety.**
- **Export data as named constants.**

Example:
```tsx
// src/data/portfolio.ts
export const skills = [
  { name: "React", level: "Advanced" },
  { name: "TypeScript", level: "Advanced" },
];
```

## Coding Standards

### TypeScript

- **Use TypeScript for all new files.**
- **Define explicit types for props, state, and function returns.**
- **Avoid `any` type; use `unknown` if type is truly unknown.**
- **Use interfaces for object shapes and types for unions/primitives.**

Example:
```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};
```

### React Components

- **Use functional components with hooks.**
- **Prefer named exports for components unless there's a specific reason for default export.**
- **Use arrow functions for component definitions.**
- **Keep components focused and single-purpose.**

Example:
```tsx
export const MyComponent = () => {
  const [state, setState] = useState(false);
  
  return <div onClick={() => setState(!state)}>{state ? 'On' : 'Off'}</div>;
};
```

### Styling

- **Use Tailwind CSS for styling.**
- **Use the `cn()` utility from `src/lib/utils.ts` to merge class names.**
- **Follow shadcn/ui patterns for component styling.**

Example:
```tsx
import { cn } from "@/lib/utils";

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className={cn("rounded-lg border bg-card p-6", className)}>
      {children}
    </div>
  );
};
```

### Imports

- **Use path aliases with `@/` prefix for src imports.**
- **Group imports: React, third-party, components, hooks, utils, types.**
- **Use named imports whenever possible.**

Example:
```tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `MyComponent.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useMyHook.ts`)
- **Utilities**: camelCase (e.g., `utils.ts`, `formatters.ts`)
- **Pages**: PascalCase (e.g., `Index.tsx`, `NotFound.tsx`)
- **Data**: camelCase (e.g., `portfolio.ts`)
- **Types/Interfaces**: PascalCase in `.d.ts` files or inline with code

## Git Commit Messages

- **Use conventional commits format:**
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `style:` for formatting changes
  - `refactor:` for code refactoring
  - `test:` for adding tests
  - `chore:` for maintenance tasks

Example:
```
feat: add contact form validation
fix: resolve navbar responsive layout issue
docs: update README with setup instructions
```

## Testing (Future)

- **Place test files next to the source files with `.test.tsx` or `.test.ts` extension.**
- **Use descriptive test names that explain what is being tested.**
- **Follow Arrange-Act-Assert pattern.**

## Performance Considerations

- **Use React.memo() for expensive components that receive the same props frequently.**
- **Use useMemo() and useCallback() to prevent unnecessary re-renders.**
- **Lazy load routes and heavy components using React.lazy() and Suspense.**
- **Optimize images (use WebP format when possible).**
- **Use intersection observer for lazy loading images and components.**

## Accessibility

- **Use semantic HTML elements.**
- **Provide alt text for images.**
- **Ensure keyboard navigation works.**
- **Use ARIA attributes when necessary.**
- **Maintain sufficient color contrast ratios.**
- **Test with screen readers.**

## Environment Variables

- **Store environment variables in `.env` file (not committed).**
- **Use `.env.example` as a template (committed).**
- **Access variables via `import.meta.env.VITE_*` prefix.**
- **Define types for environment variables in `src/env.d.ts`.**

Example:
```typescript
// src/env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## Common Patterns

### Loading States

```tsx
const [isLoading, setIsLoading] = useState(false);

if (isLoading) {
  return <Skeleton />;
}

return <Content />;
```

### Error Handling

```tsx
const [error, setError] = useState<string | null>(null);

if (error) {
  return <Alert variant="destructive">{error}</Alert>;
}
```

### Forms

```tsx
import { useForm } from "react-hook-form";

const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = (data) => {
  // Handle form submission
};

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register("email", { required: true })} />
    {errors.email && <span>This field is required</span>}
  </form>
);
```

## shadcn/ui Components

This project uses shadcn/ui components. To add new components:

```bash
npx shadcn@latest add <component-name>
```

Available components are in `src/components/ui/`. Always check if a component exists before creating a new one.

## Build and Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## Troubleshooting

### Common Issues

1. **Import errors**: Ensure path aliases are correct (`@/` points to `src/`)
2. **TypeScript errors**: Check `tsconfig.json` configuration
3. **Styling not applying**: Verify Tailwind CSS is properly configured
4. **Build failures**: Clear node_modules and reinstall dependencies

### Debugging Tips

- Use React DevTools for component debugging
- Use browser DevTools for network and performance profiling
- Check console for warnings and errors
- Use TypeScript's type checking to catch errors early

## Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
