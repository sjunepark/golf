import type { StarlightUserConfig } from "@astrojs/starlight/types";
import { group } from "./config/sidebar";

/**
 * Starlight sidebar configuration object for the golf documentation site.
 *
 * - Top-level groups become main navigation sections
 * - Use the `group()` utility function to define groups with labels from our
 *   `src/content/nav/*.ts` files for future internationalization support
 */
export const sidebar = [
  // Home/Getting Started
  {
    label: "Getting Started",
    link: "/",
  },

  // Practice Journal
  group("journal", {
    collapsed: false,
    items: [
      {
        label: "Recent Entries",
        autogenerate: {
          directory: "journal",
          collapsed: false,
        },
      },
    ],
  }),

  // Golf Guides
  group("guides", {
    collapsed: false,
    items: [
      group("guides.fundamentals", {
        collapsed: false,
        autogenerate: {
          directory: "guides/fundamentals",
        },
      }),
      group("guides.technique", {
        collapsed: false,
        items: [
          group("guides.technique.driving", {
            collapsed: false,
            autogenerate: {
              directory: "guides/technique/driving",
            },
          }),
          group("guides.technique.iron", {
            collapsed: false,
            autogenerate: {
              directory: "guides/technique/iron",
            },
          }),
          group("guides.technique.approach", {
            collapsed: false,
            autogenerate: {
              directory: "guides/technique/approach",
            },
          }),
          group("guides.technique.putting", {
            collapsed: false,
            autogenerate: {
              directory: "guides/technique/putting",
            },
          }),
        ],
      }),
    ],
  }),

  // Reference Materials
  group("reference", {
    collapsed: false,
    autogenerate: {
      directory: "reference",
    },
  }),
] satisfies StarlightUserConfig["sidebar"];
