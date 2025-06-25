# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CRITICAL: Always Use Latest Documentation

**MANDATORY**: For every task involving Tailwind, Astro, or React, you MUST use the Context7 MCP tool to fetch the most recent documentation.

- **Tailwind CSS**: You probably have knowledge on v3, but this library uses v4. **ALWAYS** check [@./knowledge/frameworks/tailwind-v3-vs-v4.md](./knowledge/frameworks/tailwind-v3-vs-v4.md)
- **Astro**: You probably have knowledge on v4, but this library uses v5. **ALWAYS** check [@./knowledge/frameworks/astro-v4-vs-v5.md](./knowledge/frameworks/astro-v4-vs-v5.md)
- **React**: You probably have knowledge on v18, but this library uses v19. **ALWAYS** check [@./knowledge/frameworks/react-v18-vs-v19.md](./knowledge/frameworks/react-v18-vs-v19.md)

**WARNING**: If you skip fetching recent documentation, you MUST inform the user in ALL CAPS, including the specific reason why you didn't fetch it.

## Project Overview

This is a golf documentation site built with Astro, using the blog starter template. The site features:

- Static site generation with Astro 5.x
- Content management through Astro's Content Collections
- Blog posts written in Markdown/MDX
- Tailwind CSS for styling
- Shadcn UI components
- RSS feed and sitemap generation

## Architecture

For detailed architecture information, see [@ARCHITECTURE.md](ARCHITECTURE.md).

## Development Guidelines

### Modern Frontend Dependencies

Modern frontend technologies evolve rapidly. Always verify current documentation for:

- **Tailwind CSS v4**: Recently released - check latest docs for breaking changes and new features
- **Astro v5**: Recently released - verify API changes and new patterns
- **React 19**: Recently released - check for new features and compatibility

### UI Development Approach

- **Primary UI Library**: Shadcn UI for component foundation
- **Design System**: Tailwind Plus (formerly Tailwind UI) for design patterns and layouts
- **Additional Tools**: v0 for rapid UI prototyping when needed

### CRITICAL: Headless UI to Shadcn UI Refactoring

**Tailwind Plus code samples use Headless UI, but this project uses Shadcn UI instead.**

- **Never use Headless UI components** - all interactive components must use Shadcn UI
- **High Priority Task**: Converting Headless UI to Shadcn UI when implementing Tailwind Plus designs
- **Implementation Strategy**: Preserve Tailwind Plus styling while using Shadcn component structure

### Color Theming System

**CRITICAL: Always use CSS variables, never hardcoded color utility classes.**

This ensures consistent theming and proper dark mode support. All colors are defined in `src/styles/global.css`.

#### Core Principles

1. **Use semantic variables**: `bg-primary`, `text-foreground`, `border-border`
2. **Never hardcode colors**: Avoid `bg-blue-500`, `text-gray-900`, etc.
3. **Check both themes**: Test light and dark modes
4. **Use proper pairs**: `bg-primary text-primary-foreground`

#### Common Variable Mappings

Check [@.src/styles/global.css](./src/styles/global.css) for the full list of variables.

- **Primary colors**: `primary`, `primary-foreground`
- **Backgrounds**: `background`, `muted`, `card`
- **Text**: `foreground`, `muted-foreground`
- **Interactive**: `border`, `input`, `ring`
- **States**: `destructive`, `accent`

#### Tailwind Plus Conversion

Replace fixed colors with semantic variables, for example:

- `bg-indigo-600` → `bg-primary`

### Design References

- Design reference files should be stored in the `knowledge/` directory
- When design guidance is needed, request specific Tailwind Plus references
- Tailwind Plus provides both component and layout examples - utilize both

## Security Considerations

**CRITICAL**: AI-generated code often overlooks security best practices. Always review code for security issues.

- **Input Validation**: Validate and sanitize all user inputs
- **Authentication & Authorization**: Implement proper access controls
- **Data Exposure**: Never expose sensitive data in client-side code or logs
- **XSS Prevention**: Sanitize content that will be rendered in HTML
- **Dependency Security**: Regularly audit and update dependencies
- **Environment Variables**: Keep secrets out of code - use environment variables properly

**When in doubt about security, research best practices or consult security resources before implementation.**

## Development Commands

All commands use pnpm as the package manager. Development server runs on `localhost:4321`.

## Content Creation

To add new golf-related content:

1. Create `.md` or `.mdx` files in `src/content/blog/`
2. Include required frontmatter fields
3. Content automatically appears in blog index and RSS feed
4. Images should be placed in `src/assets/` and referenced in frontmatter

## Site Configuration

Update site metadata in:

- `src/consts.ts` for site title and description
- `astro.config.mjs` for site URL and integrations
