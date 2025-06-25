# Architecture

This document describes the architecture and structure of the golf documentation site.

## Technology Stack

- **Framework**: Astro 5.x - Static site generator
- **Content**: Markdown/MDX with Astro Content Collections
- **Styling**: Tailwind CSS 4.x
- **Package Manager**: pnpm
- **Build**: Static site generation to `./dist/`

## Project Structure

```text
├── public/                 # Static assets served directly
│   ├── favicon.svg
│   └── fonts/
├── src/
│   ├── assets/            # Processed assets (images, etc.)
│   ├── components/        # Reusable Astro components
│   │   ├── BaseHead.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   └── HeaderLink.astro
│   ├── content/           # Content Collections
│   │   └── blog/          # Blog posts (Markdown/MDX)
│   ├── layouts/           # Page layout templates
│   │   └── BlogPost.astro
│   ├── pages/             # File-based routing
│   │   ├── index.astro    # Homepage
│   │   ├── about.astro    # About page
│   │   ├── blog/          # Blog routes
│   │   └── rss.xml.js     # RSS feed generation
│   ├── styles/
│   │   └── global.css
│   ├── consts.ts          # Global site constants
│   └── content.config.ts  # Content schema definitions
├── astro.config.mjs       # Astro configuration
├── package.json
└── tsconfig.json
```

## Content Management System

### Content Collections

The site uses Astro's Content Collections for type-safe content management:

- **Location**: `src/content/blog/`
- **Schema**: Defined in `src/content.config.ts` using Zod validation
- **Access**: Via Astro's `getCollection()` API

### Content Schema

Blog posts require the following frontmatter:

```yaml
---
title: string # Required
description: string # Required
pubDate: date # Required (coerced to Date)
updatedDate: date # Optional
heroImage: image # Optional (processed by Astro)
---
```

### Content Processing

1. Markdown/MDX files are automatically processed by Astro
2. Frontmatter is validated against the schema
3. Content is made available through the collections API
4. Images are optimized and processed by Astro's image service

## Routing System

Astro uses file-based routing:

- `src/pages/index.astro` → `/`
- `src/pages/about.astro` → `/about`
- `src/pages/blog/index.astro` → `/blog`
- `src/pages/blog/[...slug].astro` → `/blog/[post-slug]`

Dynamic routes use Astro's `getStaticPaths()` to generate pages from content collections.

## Component Architecture

### Layout Components

- **BlogPost.astro**: Main blog post layout with metadata, navigation, and formatting
- **BaseHead.astro**: Common `<head>` content (meta tags, styles, etc.)

### UI Components

- **Header.astro**: Site navigation and branding
- **Footer.astro**: Site footer with links and information
- **HeaderLink.astro**: Navigation link component
- **FormattedDate.astro**: Date formatting utility component

### Styling

- **Global CSS**: `src/styles/global.css`
- **Tailwind CSS**: Utility-first CSS framework
- **Component Styles**: Scoped styles within Astro components

## Build Process

1. **Development**: `pnpm dev` starts dev server at `localhost:4321`
2. **Production Build**: `pnpm build` generates static files to `./dist/`
3. **Preview**: `pnpm preview` serves the production build locally

### Integrations

Configured in `astro.config.mjs`:

- **MDX**: Extended Markdown support with JSX
- **Sitemap**: Automatic sitemap generation
- **RSS**: RSS feed generation via `src/pages/rss.xml.js`

## SEO & Performance Features

- **Lighthouse Score**: 100/100 performance
- **SEO-friendly**: Canonical URLs and OpenGraph metadata
- **Sitemap**: Automatic generation for search engines
- **RSS Feed**: Automatic feed generation for blog posts
- **Image Optimization**: Built-in image processing and optimization

## Configuration

### Site Constants

Global site configuration in `src/consts.ts`:

```typescript
export const SITE_TITLE = "Golf Documentation";
export const SITE_DESCRIPTION = "Your guide to golf";
```

### Astro Configuration

Main configuration in `astro.config.mjs`:

- Site URL configuration
- Integration setup (MDX, sitemap)
- Build and deployment settings
