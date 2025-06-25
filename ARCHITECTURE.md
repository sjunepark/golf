# Architecture

This document describes the architecture and structure of the golf documentation site.

## Technology Stack

- **Framework**: Astro 5.x - Static site generator
- **Documentation**: Starlight 0.34.x - Documentation framework
- **Content**: Markdown/MDX with Astro Content Collections
- **Styling**: Tailwind CSS 4.x + Starlight's built-in theming
- **UI Components**: React 19.x + Shadcn UI
- **Package Manager**: pnpm
- **Build**: Static site generation to `./dist/`

## Project Structure

```text
├── public/                 # Static assets served directly
│   ├── favicon.svg
│   └── fonts/
├── src/
│   ├── assets/            # Processed assets (images, etc.)
│   ├── components/        # Reusable components
│   │   ├── Header.astro   # Custom header with navigation
│   │   ├── Footer.astro   # Custom footer
│   │   ├── Sidebar.astro  # Custom sidebar navigation
│   │   ├── theme/         # Theme toggle components
│   │   │   ├── ModeToggleDropdown.tsx
│   │   │   └── ModeToggleSwitch.tsx
│   │   └── ui/            # Shadcn UI components
│   │       ├── button.tsx
│   │       ├── dropdown-menu.tsx
│   │       └── switch.tsx
│   ├── content/           # Starlight Content Collections
│   │   └── docs/          # All documentation content
│   │       ├── index.md   # Homepage (splash template)
│   │       ├── journal/   # Personal golf diary entries
│   │       └── guides/    # Organized golf documentation
│   ├── lib/
│   │   └── utils.ts       # Utility functions
│   ├── styles/
│   │   └── global.css     # Global styles + Tailwind
│   └── content.config.ts  # Starlight schema with extensions
├── astro.config.mjs       # Astro + Starlight configuration
├── components.json        # Shadcn UI configuration
├── package.json
└── tsconfig.json
```

## Content Management System

### Starlight Content Collections

The site uses Starlight's enhanced Content Collections for documentation:

- **Docs Collection**: `src/content/docs/` - All documentation content managed by Starlight
- **Journal**: `src/content/docs/journal/` - Personal diary entries with practice notes
- **Guides**: `src/content/docs/guides/` - Structured documentation and comprehensive guides
- **Schema**: Extended Starlight schema in `src/content.config.ts` with custom fields
- **Access**: Via Starlight's enhanced `getCollection()` API with built-in navigation

### Content Schema

The schema extends Starlight's base schema with custom fields for golf documentation:

**All content** supports Starlight's built-in frontmatter:

- `title` (required)
- `description` (optional)
- `sidebar` (optional) - for navigation customization
- `template` (optional) - 'doc' or 'splash'
- `hero` (optional) - for splash pages

**Extended custom fields**:

```yaml
---
title: string # Required (Starlight)
description: string # Optional (Starlight)
# Custom extensions:
tags: array # Optional (e.g., ["드라이버", "백스윙"])
location: string # Optional (for journal entries)
date: date # Optional (for journal entries)
updatedDate: date # Optional (for guides)
heroImage: string # Optional (for guides)
---
```

### Content Processing

1. Markdown/MDX files are processed by Starlight's enhanced loader
2. Frontmatter is validated against the extended Starlight schema
3. Content is made available through Starlight's navigation system
4. Images are optimized and processed by Astro's image service
5. Automatic sidebar generation from directory structure

## Routing System

Starlight handles routing automatically:

- `src/content/docs/index.md` → `/` (homepage with splash template)
- `src/content/docs/journal/` → `/journal/` (auto-generated section)
- `src/content/docs/guides/` → `/guides/` (auto-generated section)
- Individual files follow Starlight's slug-based routing

Navigation is automatically generated from the content structure and configured in `astro.config.mjs`.

## Component Architecture

### Starlight Integration

- **Built-in Layouts**: Starlight provides `doc` and `splash` templates
- **Automatic Navigation**: Sidebar and navigation generated from content structure
- **Theme System**: Built-in dark/light mode with custom CSS integration

### Custom Components

- **Header.astro**: Custom header with navigation and theme toggle
- **Footer.astro**: Custom footer with site links
- **Sidebar.astro**: Custom sidebar navigation (currently preserved alongside Starlight's)

### React Components

- **ModeToggleDropdown.tsx**: Theme switcher with 3 options (light/dark/system)
- **ModeToggleSwitch.tsx**: Simple light/dark toggle
- **Shadcn UI Components**: Button, dropdown-menu, switch components

### Styling

- **Starlight Theming**: Built-in light/dark mode with CSS custom properties
- **Tailwind CSS 4.x**: Utility-first CSS framework integrated via Vite plugin
- **Global CSS**: `src/styles/global.css` with custom theming variables
- **Component Styles**: Scoped styles within Astro components

## Build Process

1. **Development**: `pnpm dev` starts dev server at `localhost:4321`
2. **Production Build**: `pnpm build` generates static files to `./dist/`
3. **Preview**: `pnpm preview` serves the production build locally

### Integrations

Configured in `astro.config.mjs`:

- **Starlight**: Documentation framework with built-in features
- **React**: For interactive components (theme toggles, UI components)
- **Tailwind CSS**: Via Vite plugin for utility-first styling
- **Fontsource**: For custom typography (Inter font)

## SEO & Performance Features

Starlight provides enhanced SEO and performance out of the box:

- **Lighthouse Score**: Optimized for 100/100 performance
- **SEO-friendly**: Automatic meta tags, canonical URLs, and OpenGraph metadata
- **Sitemap**: Automatic generation for search engines
- **Search**: Built-in search functionality (Pagefind)
- **Image Optimization**: Built-in image processing and optimization
- **Accessibility**: WCAG compliant navigation and content structure

## Configuration

### Starlight Configuration

Main configuration in `astro.config.mjs`:

```javascript
starlight({
  title: "Golf Documentation",
  description: "Your personal golf documentation and improvement tracking",
  social: [{ icon: "github", label: "GitHub", href: "https://github.com" }],
  sidebar: [
    {
      label: "Journal",
      autogenerate: { directory: "journal" },
    },
    {
      label: "Guides",
      autogenerate: { directory: "guides" },
    },
  ],
  customCss: ["./src/styles/global.css"],
});
```

### Extended Schema Configuration

Content schema in `src/content.config.ts`:

```typescript
schema: docsSchema({
  extend: z.object({
    tags: z.array(z.string()).optional(),
    location: z.string().optional(),
    date: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});
```
