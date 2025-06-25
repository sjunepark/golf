# Tailwind CSS v3 vs v4

This document outlines the key differences between Tailwind CSS v3 and v4. Claude Code should reference this guide when working with Tailwind to determine if documentation lookup is needed.

## 1. Configuration & Build Setup

### PostCSS Configuration

```js
// v3
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

// v4
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### Vite Configuration

```js
// v4 - Use dedicated Vite plugin
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

### CSS Imports

```css
/* v3 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* v4 */
@import "tailwindcss";
```

### CLI Commands

```bash
# v3
npx tailwindcss -i input.css -o output.css

# v4
npx @tailwindcss/cli -i input.css -o output.css
```

## 2. Renamed Utilities

### Shadow Utilities

- `shadow-sm` → `shadow-xs`
- `shadow` → `shadow-sm`
- `drop-shadow-sm` → `drop-shadow-xs`
- `drop-shadow` → `drop-shadow-sm`

### Blur Utilities

- `blur-sm` → `blur-xs`
- `blur` → `blur-sm`
- `backdrop-blur-sm` → `backdrop-blur-xs`
- `backdrop-blur` → `backdrop-blur-sm`

### Border Radius

- `rounded-sm` → `rounded-xs`
- `rounded` → `rounded-sm`

### Outline

- `outline-none` → `outline-hidden` (for invisible outline)
- `outline` + `outline-2` → just `outline-2` (implicit solid style)

### Ring

- `ring` → `ring-3` (to maintain 3px width)

## 3. Changed Default Values

### Border Colors

- v3: Default `gray-200`
- v4: Default `currentColor`

```css
/* To restore v3 behavior */
@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-gray-200, currentColor);
  }
}
```

### Ring Defaults

- v3: 3px width, `blue-500` color
- v4: 1px width, `currentColor`

```html
<!-- v3 -->
<button class="focus:ring">
  <!-- v4 equivalent -->
  <button class="focus:ring-3 focus:ring-blue-500"></button>
</button>
```

### Placeholder Text

- v3: `gray-400` color
- v4: Current text color at 50% opacity

### Button Cursor

- v3: `cursor: pointer`
- v4: `cursor: default`

```css
/* To restore v3 behavior */
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

## 4. New Syntax & APIs

### Custom Utilities

```css
/* v3 */
@layer utilities {
  .btn {
    /* styles */
  }
}

/* v4 */
@utility btn {
  /* styles */
}
```

### Container Customization

```css
/* v4 - Config options removed, use @utility */
@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
}
```

### CSS Variables in Arbitrary Values

```html
<!-- v3 -->
<div class="bg-[--brand-color]">
  <!-- v4 -->
  <div class="bg-(--brand-color)"></div>
</div>
```

### Theme Variable Access

```css
/* v4 - Use CSS variables directly */
.my-class {
  background-color: var(--color-red-500);
}

/* For breakpoints in media queries */
@media (width >= theme(--breakpoint-xl)) {
  /* ... */
}
```

### Prefix Syntax

```html
<!-- v4 - Prefixes now at beginning like variants -->
<div class="tw:flex tw:bg-red-500"></div>
```

### JavaScript Config Loading

```css
/* v4 - Must be explicit */
@config "../../tailwind.config.js";
```

## 5. Behavioral Changes

### Gradient Variants

- v3: Variants would reset the entire gradient
- v4: Variants preserve existing values

```html
<!-- v4 - Use via-none to explicitly unset -->
<div
  class="bg-linear-to-r from-red-500 via-orange-400 to-yellow-400 dark:via-none"
></div>
```

### Space Utilities Performance

- Changed selector for better performance
- Consider using `gap` utilities with flex/grid instead

### Variant Stacking Order

- v3: Right-to-left application
- v4: Left-to-right application

```html
<!-- Order matters for direct child selectors -->
<!-- v3 -->
<ul class="first:*:pt-0 last:*:pb-0">
  <!-- v4 -->
  <ul class="*:first:pt-0 *:last:pb-0"></ul>
</ul>
```

## 6. Component Framework Integration

### Using @apply in Separate Files

```vue
<!-- Vue/Svelte/CSS Modules -->
<style>
/* v4 - Need @reference */
@reference "../../app.css";

h1 {
  @apply text-2xl font-bold;
}
</style>
```

### Alternative: Direct CSS Variables

```vue
<style>
/* More performant approach */
h1 {
  color: var(--color-red-500);
  font-size: var(--text-2xl);
}
</style>
```

## Summary

**Check documentation for:**

- Build configuration changes
- The specific renamed utilities listed above
- Custom utility definitions
- Container customization
- CSS variable syntax in arbitrary values
- Component framework integration

**No documentation needed for:**

- Standard utility classes (colors, spacing, typography, etc.)
- Responsive design patterns
- Hover/focus states
- Most component patterns
- Flexbox/Grid utilities
- Animation utilities
- Any utilities not specifically mentioned above
