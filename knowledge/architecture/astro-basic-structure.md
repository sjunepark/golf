# Basic Astro Project Structure

This document describes the minimal structure of a basic Astro project, as observed from the `astro-blank` template.

## Minimal File Structure

A basic Astro project requires only these essential files:

```text
├── public/
│   └── favicon.svg          # Static favicon
├── src/
│   └── pages/
│       └── index.astro      # Homepage (required)
├── astro.config.mjs         # Astro configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Core Files

### src/pages/index.astro

The minimal homepage structure:

```astro
---
// Empty frontmatter
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>Astro</title>
  </head>
  <body>
    <h1>Astro</h1>
  </body>
</html>
```

### astro.config.mjs

Minimal configuration:

```ts
// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({});
```

### package.json

Essential dependencies and scripts:

```json
{
  "name": "project-name",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^5.10.1"
  }
}
```

## What a Basic Project Does NOT Need

- Content collections (`src/content/`)
- Layouts (`src/layouts/`)
- Components (`src/components/`)
- Global styles (`src/styles/`)
- Site constants (`src/consts.ts`)
- Content configuration (`src/content.config.ts`)
- MDX integration
- Sitemap integration
- RSS feed generation
- Complex routing structures
- Blog functionality

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

## Key Characteristics

1. **File-based routing**: Only requires `src/pages/index.astro`
2. **No preprocessing**: HTML, CSS, and JS work out of the box
3. **TypeScript ready**: Works with `.astro` files by default
4. **Static generation**: Builds to static HTML by default
5. **Zero configuration**: Works with empty `astro.config.mjs`

This minimal structure is perfect for simple static sites that don't require complex content management or blogging features.
