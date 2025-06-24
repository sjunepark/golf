# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
