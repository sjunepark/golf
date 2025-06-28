# Astro Image Storage Best Practices Guide

## Quick Reference

### Image Optimization Rules

- **Optimized**: Any image in `src/` when imported via ESM or relative paths
- **Not Optimized**: Images in `public/` or referenced by absolute paths
- **Components**: Use `<Image />` from `astro:assets` for optimization

### Storage Strategies

#### Co-location (High Cohesion)

```text
src/content/golf/
├── course-reviews/
│   ├── pebble-beach/
│   │   ├── index.md
│   │   ├── hero.jpg        # Specific to this review
│   │   └── hole-shots/
│   └── augusta/
│       ├── index.md
│       └── course-map.jpg
```

#### Centralized (Easy Reuse)

```text
src/
├── assets/
│   ├── shared/             # Site-wide images
│   └── golf/              # Reusable golf images
└── content/golf/          # Markdown files only
```

#### Hybrid (Recommended)

```text
src/
├── assets/
│   ├── shared/            # Logos, icons, site branding
│   └── golf/             # Reusable golf content
└── content/golf/
    ├── course-reviews/
    │   └── pebble-beach/
    │       ├── index.md
    │       └── hero.jpg   # Specific to this review
```

## Implementation Examples

### Content Collections Setup

```typescript
// src/content/config.ts
import { defineCollection, z } from "astro:content";

const golfCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.enum(["course-review", "equipment", "tips"]),
      coverImage: image().optional(),
      coverAlt: z.string().optional(),
      publishDate: z.date(),
    }),
});

export const collections = {
  golf: golfCollection,
};
```

### Using Images in Markdown

```markdown
---
title: "Pebble Beach Golf Links Review"
coverImage: ./hero.jpg
coverAlt: "Pebble Beach 18th hole ocean view"
category: "course-review"
publishDate: 2024-01-15
---

# Pebble Beach Golf Links

![Course overview](./hero.jpg) <!-- Co-located -->
![Golf equipment](../../assets/golf/clubs.jpg) <!-- Shared asset -->
![Site logo](../../assets/shared/logo.png) <!-- Site-wide -->
```

### Using Images in Astro Components

```astro
---
import { Image } from "astro:assets";
import { getCollection } from "astro:content";

// Get content with images
const golfPosts = await getCollection("golf");

// Import shared images
import siteLogo from "../assets/shared/logo.png";
---

{
  golfPosts.map((post) => (
    <article>
      {post.data.coverImage && (
        <Image
          src={post.data.coverImage}
          alt={post.data.coverAlt || post.data.title}
          width={800}
          height={400}
        />
      )}
      <h2>{post.data.title}</h2>
    </article>
  ))
}

<Image src={siteLogo} alt="Site logo" />
```

### Dynamic Routing for Nested Content

```astro
---
// src/pages/golf/[...slug].astro
import { getCollection } from "astro:content";
import { Image } from "astro:assets";

export async function getStaticPaths() {
  const golfPosts = await getCollection("golf");

  return golfPosts.map((post) => ({
    params: { slug: post.slug }, // "course-reviews/pebble-beach"
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<article>
  {
    post.data.coverImage && (
      <Image
        src={post.data.coverImage}
        alt={post.data.coverAlt}
        class="hero-image"
      />
    )
  }

  <h1>{post.data.title}</h1>
  <Content />
</article>
```

## Advanced Patterns

### Filtering Nested Collections

```astro
---
// Get only course reviews
const courseReviews = await getCollection("golf", ({ id }) => {
  return id.startsWith("course-reviews/");
});

// Get by category
const equipmentGuides = await getCollection("golf", ({ data }) => {
  return data.category === "equipment";
});

// Get recent posts
const recentPosts = await getCollection("golf", ({ data }) => {
  return data.publishDate > new Date("2024-01-01");
});
---
```

### Custom Image Component

```astro
---
// src/components/OptimizedImage.astro
import { Image } from "astro:assets";

const { src, alt, class: className, ...attrs } = Astro.props;
---

<Image
  src={src}
  alt={alt}
  class={`optimized-image ${className || ""}`}
  loading="lazy"
  decoding="async"
  {...attrs}
/>

<style>
  .optimized-image {
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
</style>
```

### Responsive Images Configuration

```javascript
// astro.config.mjs
export default defineConfig({
  image: {
    // Global settings for all images
    experimentalLayout: "constrained",
    domains: ["example.com"], // Allow external domains
  },
  experimental: {
    responsiveImages: true,
  },
});
```

## Migration Checklist

### From Flat Structure

- [ ] Create `src/content/config.ts` with collections
- [ ] Organize content into logical folders
- [ ] Move images from `public/` to `src/assets/` or co-locate
- [ ] Update image references in markdown
- [ ] Update page routing to handle nested slugs
- [ ] Test image optimization is working

### Folder Structure Migration

```text
# Before
src/content/blog/
├── post-1.md
├── post-2.md
└── post-3.md

# After
src/content/golf/
├── course-reviews/
│   ├── post-1/
│   │   ├── index.md
│   │   └── images/
│   └── post-2.md
├── equipment/
│   └── post-3.md
```

## Performance Tips

1. **Use `<Image />` component** for automatic optimization
2. **Co-locate frequently used images** with content
3. **Centralize shared assets** to avoid duplication
4. **Enable responsive images** in config for modern browsers
5. **Use appropriate image formats** (WebP/AVIF when possible)
6. **Set explicit dimensions** to prevent layout shift

## Common Gotchas

- **ESM imports required**: Images must be imported, not just referenced by path
- **Alt text mandatory**: `<Image />` component requires `alt` attribute
- **Build vs runtime**: Local images processed at build time, remote at runtime
- **Public folder bypass**: Images in `public/` skip all optimization
- **Relative paths**: Must be correct relative to the markdown file location

## File Organization Decision Tree

```text
Is the image used across multiple pages?
├── Yes → Store in src/assets/shared/ or src/assets/[category]/
└── No → Is it specific to one piece of content?
    ├── Yes → Co-locate with the content
    └── No → Consider if it belongs in public/ (favicons, etc.)
```
