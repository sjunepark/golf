# Astro v4 vs v5

This document outlines the key differences between Astro v4 and v5. Claude Code should reference this guide when working with Astro to determine if documentation lookup is needed.

## 1. Removed Features & APIs

### Astro.glob() - REMOVED

```astro
<!-- v4 -->
---
const posts = await Astro.glob('./posts/*.md');
---

<!-- v5 -->
---
const posts = Object.values(
  import.meta.glob('./posts/*.md', { eager: true })
);
---
```

### output: 'hybrid' - REMOVED

```js
// v4
export default defineConfig({
  output: 'hybrid' // REMOVED
});

// v5 - Use 'static' with prerender exports
export default defineConfig({
  output: 'static'
});
```

### functionPerRoute - REMOVED

```js
// v4 - Adapter configuration
setAdapter({
  adapterFeatures: {
    functionPerRoute: true // REMOVED
  }
});

// v5 - This is now the default behavior
```

### @astrojs/lit Integration - REMOVED

```astro
<!-- v5 - Use Lit components via client-side scripts -->
<script>
  import "../components/MyTabs";
</script>

<my-tabs title="These are my tabs">...</my-tabs>
```

## 2. Renamed Components & APIs

### ViewTransitions → ClientRouter

```astro
<!-- v4 -->
---
import { ViewTransitions } from 'astro:transitions';
---
<ViewTransitions />

<!-- v5 -->
---
import { ClientRouter } from 'astro:transitions';
---
<ClientRouter />
```

### Build Hook Changes

```js
// v4
'astro:build:done': ({ routes }) => {
  // routes directly available
}

// v5
let routes;
hooks: {
  'astro:routes:resolved': (params) => {
    routes = params.routes;
  },
  'astro:build:done': ({ assets }) => {
    // Use routes from previous hook
    // Access distURL from assets map
  }
}
```

## 3. Configuration Changes

### Experimental Flags Moved to Stable

```js
// v4
export default defineConfig({
  experimental: {
    directRenderScript: true,    // REMOVED
    globalRoutePriority: true,   // REMOVED
    contentLayer: true,          // REMOVED
    serverIslands: true,         // REMOVED
    contentCollectionsCache: true, // REMOVED
    env: { schema: {...} }       // MOVED
  }
});

// v5
export default defineConfig({
  env: { schema: {...} } // Now at root level
});
```

### Security Default Change

```js
// v5 - security.checkOrigin is now true by default
// Only add this if you need to disable it
export default defineConfig({
  output: "server",
  security: {
    checkOrigin: false
  }
});
```

### Image Endpoint Configuration

```js
// v4
image: {
  endpoint: "./src/image_endpoint.ts"
}

// v5
image: {
  endpoint: {
    route: "/image",
    entrypoint: "./src/image_endpoint.ts"
  }
}
```

## 4. Async Changes

### compiledContent() Now Async

```astro
<!-- v4 -->
---
import * as myPost from "../blog/post.md";
const content = myPost.compiledContent();
---

<!-- v5 -->
---
import * as myPost from "../blog/post.md";
const content = await myPost.compiledContent();
---
```

## 5. Content Collections

### slug → id Migration

```astro
<!-- v4 - Dynamic route using slug -->
// [slug].astro
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}

<!-- v5 - Use id instead -->
// [slug].astro  
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post,
  }));
}
```

## 6. TypeScript Updates

### tsconfig.json Changes

```json
// v4
{
  "extends": "astro/tsconfigs/base"
}

// v5
{
  "extends": "astro/tsconfigs/base",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

### Integration Type Changes

```ts
// v4
import type { RouteData } from 'astro';
function useRoute(route: RouteData) {}

// v5
import type { IntegrationRouteData } from "astro";
function useRoute(route: IntegrationRouteData) {}
```

### distURL Now an Array

```js
// v4
if (route.distURL) {
  if (route.distURL.endsWith('index.html')) {
    // do something
  }
}

// v5
if (route.distURL) {
  for (const url of route.distURL) {
    if (url.endsWith('index.html')) {
      // do something
    }
  }
}
```

## 7. Dev Toolbar Changes

### Integration Definition

```js
// v4 - String-based definition (REMOVED)
addDevToolbarApp('./my-app.js');

// v5 - Object definition required
addDevToolbarApp({
  id: "my-app",
  name: "My App",
  icon: "<svg>...</svg>",
  entrypoint: "./my-dev-toolbar-app.mjs"
});
```

### Entrypoint File

```js
// v4 - Export id, name, icon from entrypoint
export const id = 'my-app';
export const name = 'My App';
export const icon = '<svg>...</svg>';

// v5 - Only export the app object
export default {
  init() {
    // ...
  }
}
```

## 8. Middleware & Rendering

### app.render() Signature

```js
// v4
const response = await app.render(request, routeData, locals);

// v5
const response = await app.render(request, { routeData, locals });
```

### context.locals Assignment

```js
// v4 - Could overwrite entirely
ctx.locals = {
  one: 1,
  two: 2
}

// v5 - Must append to existing
Object.assign(ctx.locals, {
  one: 1,
  two: 2
});
```

## 9. Static Build Changes

### Dynamic prerender Export - REMOVED

```astro
<!-- v4 - Could use dynamic values -->
export const prerender = import.meta.env.SOME_VAR;

<!-- v5 - Must be static true/false -->
export const prerender = true;
```

For dynamic prerender, use integration hooks:

```js
// astro.config.mjs
export default defineConfig({
  integrations: [{
    name: 'set-prerender',
    hooks: {
      'astro:route:setup': ({ route }) => {
        if (route.component.endsWith('/blog/[slug].astro')) {
          route.prerender = process.env.PRERENDER === 'true';
        }
      }
    }
  }]
});
```

### Manual Param Decoding Required

```astro
<!-- v4 - Automatic decoding -->
export function getStaticPaths() {
  return [
    { params: { id: "%5Bpage%5D" } }
  ]
}

<!-- v5 - Manual decoding required -->
export function getStaticPaths() {
  return [
    { params: { id: decodeURI("%5Bpage%5D") } }
  ]
}
```

## 10. HTML Attribute Changes

### Boolean Attributes

```astro
<!-- v5 - Non-boolean HTML attributes now render string values -->
<p inherit={true}></p>  <!-- Renders: <p inherit="true"></p> -->
<p inherit={false}></p> <!-- Renders: <p inherit="false"></p> -->

<p data-light={true}></p>  <!-- Renders: <p data-light="true"></p> -->
<p data-light={false}></p> <!-- Renders: <p data-light="false"></p> -->
```

### JavaScript Checks

```js
// v4
el.getAttribute('inherit') === ''
el.hasAttribute('data-light')

// v5
el.getAttribute('inherit') === 'false'
el.dataset.light === 'true'
```

## 11. Pagination Base Path

### paginate() URLs Include Base

```astro
<!-- v4 - Manual base path prepending needed -->
const prev = import.meta.env.BASE_URL + page.url.prev;

<!-- v5 - Base automatically included -->
const prev = page.url.prev; // Already includes base
```

## 12. Other Changes

### MDX Renderer Import

```ts
// v4
import mdxRenderer from "astro/jsx/server.js";

// v5
import mdxRenderer from "@astrojs/mdx/server.js";
```

### Sharp as Default Image Service

- Squoosh image service removed
- Sharp is now the default
- Remove any `squooshImageService` configuration

### Preflight CSS Changes

```css
/* v5 defaults that differ from v4 */

/* Placeholders now inherit text color at 50% opacity */
/* To restore v4 gray-400 behavior: */
@layer base {
  input::placeholder,
  textarea::placeholder {
    color: var(--color-gray-400);
  }
}

/* Buttons now have cursor: default */
/* To restore v4 pointer behavior: */
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}

/* Dialog margins reset to 0 */
/* To restore auto margins: */
@layer base {
  dialog {
    margin: auto;
  }
}
```

## Summary

**Check documentation for:**

- Migration from removed APIs (Astro.glob, output: hybrid, etc.)
- Component renames (ViewTransitions → ClientRouter)
- Configuration structure changes
- TypeScript type updates
- Content collection slug → id migration
- Dev toolbar API changes
- HTML attribute rendering changes

**No documentation needed for:**

- Standard page components and layouts
- Routing patterns (except dynamic prerender)
- Component props and slots
- CSS and styling (except Preflight changes)
- Most integrations (except removed ones)
- Static imports and assets
- Data fetching patterns
- Any features not specifically mentioned above
