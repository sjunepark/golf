# Sidebar Implementation in Tauri Docs (Starlight/Astro)

This document provides a comprehensive guide on how the Tauri documentation project implements its sidebar using Starlight (an Astro framework). This implementation can serve as a reference for other projects wanting to create similar advanced sidebar functionality.

## Overview

The Tauri docs sidebar implementation features:

- **Hierarchical structure** with collapsible sections
- **Multi-language support** with per-item translations
- **Automatic generation** from directory structure
- **Manual curation** for specific items
- **Date-based sorting** for blog posts
- **Responsive behavior** with custom overrides
- **Enhanced plugins** for additional functionality

## Core Configuration

### 1. Main Sidebar Configuration (`astro.config.mjs`)

The sidebar is configured within the Starlight integration starting at line 148:

```javascript
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import locales from "./locales.json";
import starlightUtils from "@lorenzo_lewis/starlight-utils";

export default defineConfig({
  integrations: [
    starlight({
      plugins: [
        starlightUtils({
          multiSidebar: {
            switcherStyle: "horizontalList",
          },
        }),
        // other plugins...
      ],
      sidebar: [
        {
          label: "Guides",
          translations: {
            "zh-CN": "指引",
            es: "Guías",
          },
          collapsed: true,
          items: [
            // Manual items with translations
            {
              label: "What is Tauri?",
              translations: {
                "zh-CN": "什么是 Tauri？",
                es: "¿Qué es Tauri?",
              },
              link: "/start/",
            },
            // Auto-generated sections
            {
              label: "Core Concepts",
              translations: {
                "zh-CN": "核心概念",
                es: "Conceptos básicos",
              },
              collapsed: true,
              autogenerate: { directory: "concept" },
            },
            // Mixed manual and auto-generated
            {
              label: "Develop",
              collapsed: true,
              items: [
                "develop",
                "develop/configuration-files",
                "develop/calling-rust",
                {
                  label: "Debug",
                  collapsed: true,
                  autogenerate: { directory: "develop/Debug" },
                },
              ],
            },
          ],
        },
        {
          label: "References",
          collapsed: true,
          items: [
            {
              label: "Security",
              collapsed: true,
              autogenerate: { directory: "reference/acl" },
            },
            {
              label: "Rust (docs.rs)",
              link: "https://docs.rs/tauri/~2/",
            },
          ],
        },
        {
          label: "Blog",
          collapsed: true,
          items: [
            {
              label: "All posts",
              link: "/blog/",
            },
            {
              label: "Recent posts",
              collapsed: false,
              // Enhanced autogenerate with date sorting
              autogenerate: {
                directory: "blog",
                sort: "date",
                order: "descending",
              },
            },
          ],
        },
      ],
      locales,
    }),
  ],
});
```

### 2. Internationalization Setup (`locales.json`)

```json
{
  "root": {
    "label": "English",
    "lang": "en"
  },
  "fr": {
    "label": "Français",
    "lang": "fr"
  },
  "es": {
    "label": "Español",
    "lang": "es"
  },
  "zh-cn": {
    "label": "简体中文",
    "lang": "zh-CN"
  },
  "ja": {
    "label": "日本語",
    "lang": "ja"
  }
}
```

## Advanced Features

### 3. Custom Sidebar Component (`src/components/overrides/PageFrame.astro`)

The project overrides the default PageFrame to customize sidebar behavior:

```astro
---
import MobileMenuToggle from "virtual:starlight/components/MobileMenuToggle";
import type { Props } from "@astrojs/starlight/props";
import Sidebar from "@lorenzo_lewis/starlight-utils/components/Sidebar.astro";
const { t } = Astro.locals;
---

<div class="page sl-flex">
  <header class="header"><slot name="header" /></header>
  <nav class="sidebar" aria-label={t("sidebarNav.accessibleLabel")}>
    <MobileMenuToggle {...Astro.props} />
    <div
      id="starlight__sidebar"
      class={Astro.props.entry.slug === "" ||
      Astro.props.locale === Astro.props.entry.slug
        ? "sidebar-pane lp-hide"
        : "sidebar-pane"}
    >
      <div class="sidebar-content sl-flex">
        <Sidebar {...Astro.props} />
      </div>
    </div>
  </nav>
  <div class="main-frame"><slot /></div>
</div>

<style>
  /* Responsive sidebar hiding on homepage */
  @media (min-width: 50rem) {
    .lp-hide {
      display: none;
    }
  }

  /* Custom sidebar styling */
  .sidebar-pane {
    visibility: var(--sl-sidebar-visibility, hidden);
    position: fixed;
    z-index: var(--sl-z-index-menu);
    inset-block: var(--sl-nav-height) 0;
    inset-inline-start: 0;
    width: 100%;
    background-color: var(--sl-color-black);
    overflow-y: auto;
  }
</style>
```

### 4. Enhanced Autogeneration with Date Sorting

The project applies a custom patch to Starlight to enable date-based sorting for blog posts:

**Patch file:** `patches/@astrojs__starlight@0.29.2.patch`

Key additions:

- New schema options for `sort` and `order` in autogenerate configuration
- Custom sorting handler for date-based ordering
- Support for ascending/descending order

```typescript
// Schema enhancement
sort: z.enum(['date']).optional(),
order: z.enum(['ascending','descending']).optional()

// Sorting implementation
const sortHandler = (kind: 'date', order: 'ascending' | 'descending') => {
  if (kind === 'date') {
    if (order === 'ascending')
      return (docA: Route, docB: Route) => docA.entry.data.date! > docB.entry.data.date! ? 1 : -1
    return (docA: Route, docB: Route) => docA.entry.data.date! < docB.entry.data.date! ? 1 : -1
  }
}
```

## Sidebar Structure Patterns

### 1. Manual Items

For explicit control over links and labels:

```javascript
{
  label: 'What is Tauri?',
  translations: {
    'zh-CN': '什么是 Tauri？',
    es: '¿Qué es Tauri?',
  },
  link: '/start/',
}
```

### 2. Auto-generated Sections

For directory-based navigation:

```javascript
{
  label: 'Core Concepts',
  collapsed: true,
  autogenerate: { directory: 'concept' },
}
```

### 3. Enhanced Auto-generation with Sorting

For chronological content like blogs:

```javascript
{
  label: 'Recent posts',
  collapsed: false,
  autogenerate: {
    directory: 'blog',
    sort: 'date',
    order: 'descending'
  },
}
```

### 4. Mixed Manual and Auto-generated

Combining explicit items with generated ones:

```javascript
{
  label: 'Develop',
  collapsed: true,
  items: [
    'develop',
    'develop/configuration-files',
    {
      label: 'Debug',
      collapsed: true,
      autogenerate: { directory: 'develop/Debug' },
    },
  ],
}
```

### 5. External Links

Direct links to external resources:

```javascript
{
  label: 'Rust (docs.rs)',
  link: 'https://docs.rs/tauri/~2/',
}
```

## Required Dependencies

```json
{
  "dependencies": {
    "@astrojs/starlight": "^0.29.2",
    "@lorenzo_lewis/starlight-utils": "latest",
    "starlight-blog": "latest"
  }
}
```

## Key Implementation Features

### Multi-language Support

- Each sidebar item can have `translations` object
- Translations reference locale keys from `locales.json`
- Automatic fallback to default label if translation missing

### Responsive Behavior

- Custom CSS classes for mobile/desktop visibility
- Homepage-specific sidebar hiding (`lp-hide` class)
- Mobile menu toggle integration

### Plugin Integration

- `starlightUtils` for enhanced sidebar functionality
- `multiSidebar` with horizontal list switcher style
- Blog plugin integration for post management

### Performance Optimizations

- Collapsed sections by default to reduce initial render
- Lazy loading of auto-generated content
- Efficient date sorting implementation

## Best Practices

1. **Structure Organization**: Use collapsed sections for better UX
2. **Translation Management**: Keep translations consistent across all items
3. **Auto-generation**: Prefer auto-generation for file system-based navigation
4. **Manual Curation**: Use manual items for important entry points
5. **External Links**: Clearly separate internal and external navigation
6. **Responsive Design**: Test sidebar behavior across different screen sizes

This implementation provides a robust, scalable sidebar solution that balances automatic generation with manual control, supports multiple languages, and offers advanced features like date-based sorting for dynamic content.
